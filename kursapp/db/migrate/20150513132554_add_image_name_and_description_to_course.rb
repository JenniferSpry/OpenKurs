class AddImageNameAndDescriptionToCourse < ActiveRecord::Migration
  def change
    add_column :courses, :image_name, :string
    add_column :courses, :description, :text
  end
end
