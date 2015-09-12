class AddTemplateToCourseParts < ActiveRecord::Migration
  def change
    add_column :course_parts, :template, :string
  end
end
