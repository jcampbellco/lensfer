module PaginateParams
  extend ActiveSupport::Concern

  def paginate_params
    params.permit(:page, :per_page)
  end
end