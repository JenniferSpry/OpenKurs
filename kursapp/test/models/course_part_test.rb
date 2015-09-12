require 'test_helper'

class CoursePartTest < ActiveSupport::TestCase

  def setup
    @course = courses(:calculus)
    @part = @course.course_parts.build(title: "Lorem ipsum", template: "<div>foo</div>")
  end

  test "should be valid" do
    assert @part.valid?
  end

  test "course id should be present" do
    @part.course_id = nil
    assert_not @part.valid?
  end

  test "title should be present" do
    @part.title = "   "
    assert_not @part.valid?
  end

  test "title should be at most 100 characters" do
    @part.title = "a" * 101
    assert_not @part.valid?
  end

  test "new courseparts should be the last in order" do
    @course = courses(:algebra)
    part = @course.course_parts.build(title: "Lorem ipsum", template: "<div>foo</div>")
    part.save
    assert_equal 4, part.order, "Part order is " + part.order.to_s
  end

end
