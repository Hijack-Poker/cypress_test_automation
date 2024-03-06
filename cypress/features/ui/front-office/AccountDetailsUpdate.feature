Feature: Front Office - Account Details Update
  #Author: Anthony Mansueto 02/09/2024
  #Modified by: Anthony Mansueto 03/01/2024 - Added blocked scenarios

  #-------------------------------------
  # JIRA ticket: EN-2910/EN-2991/EN-2967
  #-------------------------------------
  
  @smoke 
  Scenario: Verify that player can successfully edit their account details
    Given I login to Front Office via Auth Descope API
    And I use API to update Custom Attribute "displayNameDateCh" of "amansueto+qaautoplayer@oppy.tech" user with value ""
    When I navigate to "Front Office Profile" page
    Then "Front Office Profile" page should be displayed
    When I edit the Account Details fields with these values
    | Field         | Value                  |
    | Display Name  | QAAUTO                 |
    | First Name    | QAAUTO Test First Name |
    | Last Name     | QAAUTO Test Last Name  |
    | Address       | QAAUTO Test Address    |
    Then The Account Details fields is displayed with these values
    | QAAUTO                 |
    | QAAUTO Test First Name |
    | QAAUTO Test Last Name  |
    | QAAUTO Test Address    |

  @smoke
  Scenario: Verify that error message appears when inputting blank characters in the required fields
    Given I login to Front Office via Auth Descope API
    When I navigate to "Front Office Profile" page
    Then "Front Office Profile" page should be displayed
    When I set the following Account Details fields to "empty"
    | Display Name  |
    | First Name    |
    | Last Name     |
    And I click on "Save" button for "Display Name" field
    Then The "Error Message modal" of "Front Office" is displayed with message "Display Name should not be empty!"
    When I click on "Save" button for "First Name" field
    Then The "Error Message modal" of "Front Office" is displayed with message "First Name should not be empty!"
    When I click on "Save" button for "Last Name" field
    Then The "Error Message modal" of "Front Office" is displayed with message "Last Name should not be empty!"

  @smoke
  Scenario: Verify that error message appears when inputting invalid characters in the required fields
    Given I login to Front Office via Auth Descope API
    When I navigate to "Front Office Profile" page
    Then "Front Office Profile" page should be displayed
    When I set the following Account Details fields to "invalid"
    | Display Name  |
    | First Name    |
    | Last Name     |
    | Address       | 
    And I click on "Save" button for "Display Name" field
    Then The "Error Message modal" of "Front Office" is displayed with message "Display Name should contain only letters, spaces, and numbers."
    When I click on "Save" button for "First Name" field
    Then The "Error Message modal" of "Front Office" is displayed with message "First Name should contain only letters and '~'."
    When I click on "Save" button for "Last Name" field
    Then The "Error Message modal" of "Front Office" is displayed with message "Last Name should contain only letters and '~'." 
    When I click on "Save" button for "Address" field
    Then The "Error Message modal" of "Front Office" is displayed with message "Address should contain only letters, spaces, and numbers."
  
  @smoke
  Scenario: Verify that player can successfully change their cardhouse
    Given I login to Front Office via Auth Descope API
    When I navigate to "Front Office Profile" page
    Then "Front Office Profile" page should be displayed
    When I click on Change Club link in Account Profile page
    And I set a new Club in the Cardhouse Selection page
    And I navigate to "Front Office Profile" page
    Then New Club is displayed in the Club Selection field in Account Profile page

  @smoke @testUser
  Scenario: Verify that player can successfully change phone number
    Given I am logged in as "test user 1" in Front Office
    When I navigate to "Front Office Profile" page
    Then "Front Office Profile" page should be displayed
    When I click on Change Phone in Account Profile page
    Then The "Verify Your Phone modal" of "Front Office" is displayed
    And "Enter your phone number" label is displayed in Verify Your Phone modal
    When I enter phone number in Verify Your Phone modal
    Then "Enter your code" label is displayed in Verify Your Phone modal
    When I use API to Generate OTP via "SMS" for "test user 1" then enter in "Verify Your Phone modal"
    And I click on "Submit Code button" in "common" of "Front Office"
    Then "Phone successfully enrolled!" label is displayed in Verify Your Phone modal
    And I click on "Finish button" in "common" of "Front Office"

  @smoke 
  Scenario: Verify user is only allowed to change display name once per day
    Given I login to Front Office via Auth Descope API
    And I use API to update Custom Attribute "displayNameDateCh" of "amansueto+qaautoplayer@oppy.tech" user with value ""
    When I navigate to "Front Office Profile" page
    Then "Front Office Profile" page should be displayed
    When I edit the Account Details Display Name with "QAAUTO1"
    And I edit the Account Details Display Name with "QAAUTO2"
    Then The "Message modal" of "Front Office" is displayed with message "You can update your display name once a day. Thank you!!"