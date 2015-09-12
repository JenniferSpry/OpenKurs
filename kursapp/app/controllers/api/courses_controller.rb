class Api::CoursesController < ApplicationController

  before_filter :authenticate_user!, only: [:create, :update, :destroy]
  before_filter :ensure_admin!, only: [:create, :update, :destroy]

  def index
    @courses = Course.all
  end

  def show
    @course = Course.find(params[:id])
  end

  def create
    @course = Course.new(course_params.merge(user_id: current_user.id))
    @course.save
    render 'show', status: 201
  end

  def update
    @course = Course.find(params[:id])
    @course.update_attributes(course_params)
    render 'show', status: 201
  end

  # and restore order
  def destroy
    course = Course.find(params[:id])
    order = course.order
    course.destroy
    Course.all.each do |course|
      if course.order > order
        course.order = course.order - 1
        course.save
      end
    end
    head :no_content
  end

  private
  def course_params
    params.require(:course).permit(:id, :title, :user_id, :image_name, :description, :order)
  end

  def ensure_admin!
    unless current_user.admin?
      sign_out current_user

      redirect_to root_path

      return false
    end
  end

end
