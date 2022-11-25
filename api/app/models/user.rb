class User < ApplicationRecord

  has_many :uploads, class_name: 'Upload'

  def active?
    status == 'active'
  end
end