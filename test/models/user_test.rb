require 'test_helper'

class UserTest < ActiveSupport::TestCase
   
  test "Should not be nil" do
    test = User.new(email: "testtest@test.fr", password: "testtest", password_confirmation:"testtest")
    assert_not_nil test
   end

  test "Should be false" do
    test = User.new(password: "testtestFAUX", password_confirmation:"testtest")
    assert_not test.save
   end
  
end
