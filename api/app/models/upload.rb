class Upload < ApplicationRecord
  include SoftDeletable

  has_one :user
end