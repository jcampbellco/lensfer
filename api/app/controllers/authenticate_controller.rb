class AuthenticateController < ApplicationController
  def create
    code = params[:code]

    path = Rails.root.join('storage', 'client_secrets.json')

    require 'google/api_client/client_secrets'
    require 'google/apis/people_v1'

    client_secrets = Google::APIClient::ClientSecrets.load(path)
    auth_client = client_secrets.to_authorization
    auth_client.update!(
      :scope => 'email, profile',
      :redirect_uri => 'http://localhost:3000')

    auth_client.code = code
    auth_client.fetch_access_token!
    auth_client.client_secret = nil

    service = Google::Apis::PeopleV1::PeopleServiceService.new
    service.authorization = auth_client

    person = service.get_person(
      'people/me',
      person_fields: 'emailAddresses,names,photos',
    )

    name = person.names.find { |name| name.metadata.primary == true }.display_name
    email = person.email_addresses.find { |email| email.metadata.primary == true }.value
    icon_path = person.photos.find { |photo| photo.metadata.primary == true }.url

    @user = User.find_by(email: email)
    unless @user.present?
      @user = User.create(
        email: email,
        name: name,
        icon_path: icon_path,
        status: :inactive,
      )
    end

    unless @user.active?
      render json: { message: "Your account is not activated." }, status: :unauthorized and return
    end

    @auth = JsonWebToken.encode({ user_id: @user.id })
  end

  def dev_token
    @user = User.find_by(email: params[:email])
    @auth = JsonWebToken.encode({ user_id: @user.id })
    render 'authenticate/create'
  end
end