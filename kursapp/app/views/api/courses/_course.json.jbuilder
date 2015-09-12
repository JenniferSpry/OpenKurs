json.(course, :id, :title, :image_name, :description, :order)
json.user course.user if current_user && current_user.admin?

json.courseparts course.course_parts.order(order: :asc) do |part|
  json.id part.id
  json.title part.title
  json.order part.order
  if current_user
    json.doneByUser part.done_by_user(current_user)
  end
end
