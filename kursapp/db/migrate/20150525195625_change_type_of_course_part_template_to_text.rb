class ChangeTypeOfCoursePartTemplateToText < ActiveRecord::Migration
  def change
    change_column :course_parts, :template, :text
  end
end
