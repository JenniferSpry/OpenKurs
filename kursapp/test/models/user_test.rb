require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(username: "Example User", email: "user@example.de", password: 'foobar123')
  end

  test "should be valid" do
    assert @user.valid?
  end

  test "email addresses should be unique" do
    duplicate_user = @user.dup
    @user.save
    assert_not duplicate_user.valid?
  end

  # current_user?
  # test "non admins should not be able to create courses" do
  #   @user.save
  #   course_count_before = Course.count;
  #   @user.courses.create!(title: "Lorem ipsum")
  #   course_count_after = Course.count;
  #   assert course_count_before == course_count_after
  # end

  # test "associated courses should not be destroyed" do
  #   @user.save
  #   @user.courses.create!(title: "Lorem ipsum")
  #   assert_not @user.destroy
  # end
end
