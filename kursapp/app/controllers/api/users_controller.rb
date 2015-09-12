class Api::UsersController < ApplicationController

  def index
    @users = User.all
  end

  def done
    done = UserDoneCoursePart.where(user_id: params[:id]).size
    parts = CoursePart.all.size
    @percent = (done * 100) / parts
  end
end
