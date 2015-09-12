class AddOrderToCoursePart < ActiveRecord::Migration
  def change
    add_column :course_parts, :order, :int
  end
end
