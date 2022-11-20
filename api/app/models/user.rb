class User < ApplicationRecord

  has_many :uploads

  def active?
    status == 'active'
  end
end