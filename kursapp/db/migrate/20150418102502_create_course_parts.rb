class CreateCourseParts < ActiveRecord::Migration
  def change
    create_table :course_parts do |t|
      t.string :title
      t.references :course, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
