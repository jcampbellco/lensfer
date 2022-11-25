module PaginateParams
  extend ActiveSupport::Concern

  def paginate_params
    new_params = params.transform_keys do |key|
      key.underscore.to_s
    end

    new_params.permit(:page, :per_page)
  end
end