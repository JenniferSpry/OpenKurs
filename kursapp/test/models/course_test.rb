require 'test_helper'

class CourseTest < ActiveSupport::TestCase

  def setup
    @user = users(:anna)
    # This code is not idiomatically correct.
    #@course = Course.new(title: "Lorem ipsum", user_id: @user.id)
    @course = @user.courses.build(title: "Lorem ipsum")
  end

  test "should be valid" do
    assert @course.valid?
  end

  test "user id should be present" do
    @course.user_id = nil
    assert_not @course.valid?
  end

  test "title should be present " do
    @course.title = "   "
    assert_not @course.valid?
  end

  test "title should be at most 100 characters" do
    @course.title = "a" * 101
    assert_not @course.valid?
  end
end
