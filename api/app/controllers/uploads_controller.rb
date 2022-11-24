class UploadsController < AuthenticatedController
  before_action :set_upload, only: [:confirm]
  def index
    @uploads = current_user.uploads
  end

  def confirm
    @upload.status = :confirmed
    @upload.save!
    render 'uploads/show'
  end

  def create
    upload_params = params.permit(:size, :mimetype, :filename)
    upload_params[:size] = upload_params[:size].to_i
    upload_params[:user_id] = current_user.id
    upload_params[:key] = "#{current_user.id}/#{Time.now.to_i}_#{upload_params[:filename]}"
    upload_params[:status] = 'pending'

    @upload = Upload.create(upload_params)
    @context = S3Adapter.client.presigned_request(upload_params[:key], :put_object)
  end

  def set_upload
    @upload = Upload.find(params[:upload_id])
  end
end