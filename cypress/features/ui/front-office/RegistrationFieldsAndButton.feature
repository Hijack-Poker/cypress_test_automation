Feature: Front Office - Registration Fields and Buttons Validation
  #Author: Anthony Mansueto 02/22/2024

  #-------------------------------------
  # JIRA ticket: EN-2990
  #-------------------------------------

  @smoke @testUser
  Scenario: Verify user should be able to see and fill in the Unique Display Name, FirstName, LastName, Phone, Password, ConfirmPassword field on the registration page.
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
    Then The Registration form fields is displayed with these values
    | QAAUTO                 |
    | QAAUTO Test First Name |
    | QAAUTO Test Last Name  |
    | 3239991159             |
    | Password123!           |
    | Password123!           |

  @smoke @testUser
  Scenario: Verify that when the user successfully completes the registration by clicking the "Submit" button with all required fields filled correctly, it redirects the user to a 6-digit verification code page for further authentication.
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

  @smoke @testUser
  Scenario: Verify that when the user clicks the "Submit" button with one or more required fields left empty, it displays a pop-up error message stating "Please fill out this field."
    Given I go to Registration Form modal in Descope page
    Then "Registration form" modal should be displayed in Descope
    When I click on "Submit registration" button in Descope page
    Then Error message should be displayed in "Registration form field" with message "Please fill out this field."

  @smoke @testUser
  Scenario: Verify that when the user clicks the "Submit" button with specific validation errors (e.g., password strength,phone number format, etc.), it displays a relevant error message for the specific validation issue.
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
    And I edit the Registration form field "Confirm Password" with value "notmatch"
    And I click on "Submit registration" button in Descope page
    Then Error message should be displayed in "Registration form field" with message "Please match the requested format"
    When I edit the Registration form field "Phone" with value "11"
    And I click on "Submit registration" button in Descope page
    Then Error message should be displayed in "Registration form field" with message "Please enter a valid phone"
    When I edit the Registration form field "Phone" with value "3239991159"
    And I edit the Registration form field "Password" with value "PASSWORD123"
    And I edit the Registration form field "Confirm Password" with value "PASSWORD123"
    And I click on "Submit registration" button in Descope page
    Then Error message should be displayed in "Registration form modal" with message "Password must contain at least one lowercase character"
    When I edit the Registration form field "Password" with value "password123"
    And I edit the Registration form field "Confirm Password" with value "password123"
    And I click on "Submit registration" button in Descope page
    Then Error message should be displayed in "Registration form modal" with message "Password must contain at least one uppercase character"
    When I edit the Registration form field "Password" with value "Pass123"
    And I edit the Registration form field "Confirm Password" with value "Pass123"
    And I click on "Submit registration" button in Descope page
    Then Error message should be displayed in "Registration form modal" with message "Password must contain at least 8 characters"
    When I edit the Registration form field "Password" with value "Password"
    And I edit the Registration form field "Confirm Password" with value "Password"
    And I click on "Submit registration" button in Descope page
    Then Error message should be displayed in "Registration form modal" with message "Password must contain at least one number"

    #Bug ticket: EN-3070
    @smoke @bugfix
    Scenario: Verify that the Unique Display Name, First Name and Last Name fields enforces a maximum character limit, and the system displays a validation error message when the limit is exceeded.
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
    And I edit the Registration form field "Last Name" with value "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    And I click on "Submit registration" button in Descope page
    Then Error message should be displayed in "Registration form field" with message "TBD"
    When I edit the Registration form field "First Name" with value "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    And I click on "Submit registration" button in Descope page
    Then Error message should be displayed in "Registration form field" with message "TBD"
    When I edit the Registration form field "Unique Display Name" with value "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    And I click on "Submit registration" button in Descope page
    Then Error message should be displayed in "Registration form field" with message "TBD"