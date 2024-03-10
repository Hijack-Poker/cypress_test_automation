Feature: Front Office - Registration Verify Your Email
  #Author: Anthony Mansueto 02/20/2024

  #-------------------------------------
  # JIRA ticket: EN-2849
  #-------------------------------------

  @smoke @testUser
  Scenario: Verify user Registers with valid email (not correspond to any registered user) and valid code is entered, the system allows the user to proceed to the next step.
    Given I navigate to "Front Office Login" page
    When I click on "Register Now with Email" button in Descope page
    Then "Verify Your Email" modal should be displayed in Descope
    When I enter valid Email in Verify Your Email page
    Then "Verification" modal should be displayed in Descope
    When I use API to generate OTP via "Email" for "test user registration" then enter in Descope Verification modal
    And I click on "Submit" button in Descope page
    Then "Registration form" modal should be displayed in Descope

  @testUser
  Scenario: Verify that when an invalid code is entered, the system prevents the user from proceeding to the next step.
    Given I navigate to "Front Office Login" page
    When I click on "Register Now with Email" button in Descope page
    Then "Verify Your Email" modal should be displayed in Descope
    When I enter valid Email in Verify Your Email page
    Then "Verification" modal should be displayed in Descope
    When I enter 6-digit OTP "123456" in Descope Verification modal
    And I click on "Submit" button in Descope page
    Then Error message should be displayed in "OTP Verification modal" with message "Failed to verify email code"

  @testUser
  Scenario: Verify that when an email address is entered in an incorrect format (e.g., missing "@" or domain), the system displays a validation error message.
    Given I navigate to "Front Office Login" page
    When I click on "Register Now with Email" button in Descope page
    Then "Verify Your Email" modal should be displayed in Descope
    When I enter "invalidemail.com" in Email textbox on Verify Your Email modal
    Then Error message should be displayed in "Verify Your Email modal" with message "Must be a valid email"

  @smoke @testUser
  Scenario: Verify that when the email input corresponds to an already registered user, the system directs the user to either the clubhouse selection or enter lobby page.
    Given I navigate to "Front Office Login" page
    When I click on "Register Now with Email" button in Descope page
    Then "Verify Your Email" modal should be displayed in Descope
    When I enter "amansueto+descopetestuser1@oppy.tech" in Email textbox on Verify Your Email modal
    Then "Verification" modal should be displayed in Descope
    When I use API to generate OTP via "Email" for "test user 1" then enter in Descope Verification modal
    And I click on "Submit" button in Descope page
    Then "Front Office Cardhouse" page should be displayed