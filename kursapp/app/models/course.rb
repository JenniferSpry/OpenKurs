class Course < ActiveRecord::Base
  has_many :course_parts
  belongs_to :user

  validates :user_id, presence: true
  validates :title, presence: true, length: { maximum: 100 }

  before_save :add_order_if_not_present

  protected

    def add_order_if_not_present
      if order.nil?
        last = (Course.all.maximum("order") || -1 ) + 1
        self.order = last
      end
    end
end
