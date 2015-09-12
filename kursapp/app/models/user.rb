class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :username, presence: true, length: { maximum: 100 }

  has_many :courses
  has_many :user_done_course_parts, dependent: :destroy
  has_many :course_parts, through: :user_done_course_parts

  # def as_json(options = {})
  #   super(options.merge())
  # end
end
