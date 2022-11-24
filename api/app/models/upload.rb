class Upload < ApplicationRecord
  include SoftDeletable

  has_one :user

  def url
    S3Adapter.client.presigned_request(key, :get_object)
  end
end