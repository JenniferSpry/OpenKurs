class UserDoneCoursePart < ActiveRecord::Base
  belongs_to :user
  belongs_to :course_part

  validates :course_part_id, presence: true, uniqueness: { scope: :user_id }
  validates :user_id, presence: true
end
