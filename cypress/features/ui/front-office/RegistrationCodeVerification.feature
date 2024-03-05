Feature: Front Office - Registration Code Verification
  #Author: Anthony Mansueto 02/26/2024
  #Modified by: Anthony Mansueto 03/01/2024 - manual review

  #-------------------------------------
  # JIRA ticket: EN-2992
  #-------------------------------------

  @smoke @testUser
  Scenario: Verify that the input field on the Code Verification Page only accepts 6-digit numbers, and attempts to enter more or fewer digits are blocked or restricted.
    Given I go to Registration Form modal in Descope page
    Then "Registration form" modal should be displayed in Descope
    When I populate the Registration form fields with these values
    | Field               | Value                  |
    | Unique Display Name | QAAUTO                 |
    | First Name          | QAAUTO Test First Name |
    | Last Name           | QAAUTO Test Last Name  |
    | Phone               | 3239991159             |
    | Password            | Password123!           |
    | Confirm Password    | Password123!           |
    And I click on "Submit registration" button in Descope page
    Then "Verification" modal should be displayed in Descope
    When I enter 6-digit OTP "123" in Descope Verification modal
    And I click on "Submit" button in Descope page
    Then Error message should be displayed in "OTP Verification field" with message "Must be a 6 digits number"

  @smoke @testUser 
  Scenario: Verify that when the user submits an invalid 6-digit code (e.g., incorrect code or expired code), the system displays a relevant error message.
    Given I go to Registration Form modal in Descope page
    Then "Registration form" modal should be displayed in Descope
    When I populate the Registration form fields with these values
    | Field               | Value                  |
    | Unique Display Name | QAAUTO                 |
    | First Name          | QAAUTO Test First Name |
    | Last Name           | QAAUTO Test Last Name  |
    | Phone               | 3239991159             |
    | Password            | Password123!           |
    | Confirm Password    | Password123!           |
    And I click on "Submit registration" button in Descope page
    Then "Verification" modal should be displayed in Descope
    When I use API to Generate OTP via "SMS" for "test user registration"
    And I enter generated OTP for test users in Descope Verification modal
    And I use API to Generate OTP via "SMS" for "test user registration"
    And I click on "Submit" button in Descope page
    Then Error message should be displayed in "OTP Verification modal" with message "Failed to verify SMS code"
    When I enter 6-digit OTP "123456" in Descope Verification modal
    And I click on "Submit" button in Descope page
    Then Error message should be displayed in "OTP Verification modal" with message "Failed to verify SMS code"

  @smoke @testUser
  Scenario: Verify that when the user successfully enters the correct 6-digit verification code, the system redirects them to the club house selection page, confirming their account verification.
    Given I go to Registration Form modal in Descope page
    Then "Registration form" modal should be displayed in Descope
    When I populate the Registration form fields with these values
    | Field               | Value                  |
    | Unique Display Name | QAAUTO                 |
    | First Name          | QAAUTO Test First Name |
    | Last Name           | QAAUTO Test Last Name  |
    | Phone               | 3239991159             |
    | Password            | Password123!           |
    | Confirm Password    | Password123!           |
    And I click on "Submit registration" button in Descope page
    Then "Verification" modal should be displayed in Descope
    When I use API to Generate OTP via "SMS" for "test user registration"
    When I enter generated OTP for test users in Descope Verification modal
    And I click on "Submit" button in Descope page
    And I click on "Im Ready" button in Descope page
    Then "Front Office Cardhouse" page should be displayed
    
