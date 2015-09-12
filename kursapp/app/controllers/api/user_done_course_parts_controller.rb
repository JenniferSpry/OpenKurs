class Api::UserDoneCoursePartsController < ApplicationController

  before_filter :authenticate_user!

  def create
    @done = UserDoneCoursePart.find_or_initialize_by(user_done_course_part_params.merge(user_id: current_user.id))
    @done.save
    head :no_content
  end

  private
  def user_done_course_part_params
    params.require(:user_done_course_part).permit(:course_part_id)
  end
end
