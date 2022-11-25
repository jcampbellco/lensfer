class Upload < ApplicationRecord
  include SoftDeletable

  has_one :user

  scope :short_id, ->(short_id) { where(id: short_id) }
  scope :confirmed, -> { where(status: 'confirmed' )}
  scope :not_deleted, -> { where(deleted_at: nil) }

  jsonb_accessor :stats, views: [:integer, default: 0]

  def public_filename
    "#{id.split('-').first}.#{filename.split('.').last}"
  end

  def url
    S3Adapter.client.presigned_request(key, :get_object, expires_in: S3Adapter::MAX_EXPIRES_IN)
  end
end