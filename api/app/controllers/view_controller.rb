class ViewController < ApplicationController
  def show
    begin
      upload = Upload.not_deleted.find_by_sql(["SELECT * FROM uploads WHERE id::text like(?)", "#{params[:id]}%" ]).sole
    end

    render :json => { message: 'Not found' }, status: 404 and return unless upload.present?

    upload.views += 1
    upload.save(touch: false)

    redirect_to upload.url[:url], :allow_other_host => true
  end
end