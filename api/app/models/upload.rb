class Upload < ApplicationRecord
  include SoftDeletable

  has_one :user

  def url
    S3Adapter.client.presigned_request(key, :get_object, expires_in: S3Adapter::MAX_EXPIRES_IN)
  end
end