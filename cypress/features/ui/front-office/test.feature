Feature: Front Office - Login Logout

  @smoke
  Scenario: test
    When I use API to Generate OTP via "Email" for test user
    Then log test
    # I use API to Generate OTP via "Email" for test user