class Api::CoursePartsController < ApplicationController

  before_filter :authenticate_user!, only: [:create]

  def index
    course = Course.find(params[:course_id])
    @courseparts = course.course_parts
  end

  def create
    course = Course.find(params[:course_id])
    @coursepart = course.course_parts.build(course_part_params)
    @coursepart.save
    render 'show', status: 201
  end

  def show
    @coursepart = CoursePart.find_by(id: params[:id])
  end

  def update
    coursepart = CoursePart.find_by(id: params[:id])
    coursepart.update_attributes(course_part_params)
    head :no_content
  end

  # and restore order
  def destroy
    @coursepart = CoursePart.find_by(id: params[:id])
    order = @coursepart.order
    course = Course.find(@coursepart.course_id)
    @coursepart.destroy
    course.course_parts.each do |part|
      if part.order > order
        part.order = part.order - 1
        part.save
      end
    end
    head :no_content
  end


  private
  def course_part_params
    params.require(:course_part).permit(:title, :template, :order)
  end
end
