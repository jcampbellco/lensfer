class ViewController < ApplicationController
  def show

    begin
      upload = Upload.not_deleted.find_by_sql(["SELECT * FROM uploads WHERE id::text like(?)", "#{params[:id]}%" ]).sole
    rescue Enumerable::SoleItemExpectedError
      render :json => { message: 'Not found' }, status: 404 and return
    end

    redirect_to upload.url[:url], :allow_other_host => true
  end
end