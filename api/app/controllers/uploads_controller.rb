class UploadsController < AuthenticatedController
  before_action :set_upload, only: [:confirm, :destroy]

  include PaginateParams

  def index
    @uploads = current_user
                 .uploads
                 .not_deleted
                 .confirmed
                 .paginate(page: paginate_params[:page], per_page: paginate_params[:per_page])
                 .order(created_at: :desc)
  end

  def confirm
    @upload.status = :confirmed
    @upload.save!

    render 'uploads/show'
  end

  def destroy
    render :json => {}, status: :unauthorized and return unless @upload.user.id == current_user.id

    @upload.update({ status: 'deleted', deleted_at: Time.now })

    render :json => { message: 'Deleted' }
  end

  def create
    upload_params = params.permit(:size, :mimetype, :filename)
    ext = upload_params[:filename].split('.').last
    upload_params[:id] = Random.uuid
    upload_params[:size] = upload_params[:size].to_i
    upload_params[:user_id] = current_user.id
    upload_params[:key] = "#{current_user.id}/#{upload_params[:id]}.#{ext}"
    upload_params[:status] = 'pending'

    @upload = Upload.create(upload_params)
    @context = S3Adapter.client.presigned_request(upload_params[:key], :put_object)
  end

  private

  def set_upload
    puts params
    @upload = Upload.find(params[:upload_id] || params[:id])
  end
end