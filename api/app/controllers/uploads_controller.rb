class UploadsController < AuthenticatedController
  def index
    @uploads = current_user.uploads
  end

  def create

  end
end