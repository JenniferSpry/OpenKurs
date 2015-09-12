class CreateUserDoneCourseParts < ActiveRecord::Migration
  def change
    create_table :user_done_course_parts do |t|
      t.integer :user_id
      t.integer :course_part_id

      t.timestamps null: false
    end
    add_index :user_done_course_parts, :user_id
    add_index :user_done_course_parts, :course_part_id
    add_index :user_done_course_parts, [:user_id, :course_part_id], unique: true
  end
end
