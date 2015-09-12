class CoursePart < ActiveRecord::Base
  belongs_to :course
  has_many :user_done_course_parts, dependent: :destroy
  has_many :users, through: :user_done_course_parts

  validates :course_id, presence: true
  validates :title, presence: true, length: { maximum: 100 }

  before_save :add_order_if_not_present

  attr_accessor :done_by_user

  def done_by_user(current_user)
    if !current_user.nil?
      self.done_by_user = UserDoneCoursePart.where(user_id: current_user.id, course_part_id: self.id).exists?(conditions = :none)
    end
  end

  protected

    def add_order_if_not_present
      if order.nil?
        course = Course.find(self.course_id)
        last = (course.course_parts.maximum("order") || -1 ) + 1
        self.order = last
      end
    end

end
