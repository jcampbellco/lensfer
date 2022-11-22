class AuthenticatedController < ApplicationController
  before_action :require_authorization

  protected

  def initialize
    super
    @errors = ActiveModel::Errors.new(self)
  end

  def current_user
    @user ||= User.find(decoded_auth_token[:user_id]) if decoded_auth_token
  end

  def require_authorization
    render json: { error: 'Unauthorized' }, status: :unauthorized unless http_auth_header.present? and current_user.present?
  end

  def decoded_auth_token
    @decoded_auth_token ||= JsonWebToken.decode(http_auth_header)
  end

  def http_auth_header
    if request.headers['HTTP_AUTHORIZATION'].present?
      return request.headers['HTTP_AUTHORIZATION'].split(' ').last
    end
    nil
  end
end