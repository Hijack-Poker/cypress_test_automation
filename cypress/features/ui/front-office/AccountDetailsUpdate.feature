Feature: Front Office - Account Details Update
  #Author: Anthony Mansueto 02/09/2024

  #-------------------------------------
  # JIRA ticket: EN-2910
  #-------------------------------------

  @smoke
  Scenario: Verify that player can successfully edit their account details
    Given I login to Front Office via Auth Descope UI
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
    Given I login to Front Office via Auth Descope UI
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
    Given I login to Front Office via Auth Descope UI
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
  Scenario:Verify that player can successfully change their cardhouse
    Given I login to Front Office via Auth Descope UI
    When I navigate to "Front Office Profile" page
    Then "Front Office Profile" page should be displayed
    When I click on Change Club link in Account Profile page
    And I set a new Club in the Cardhouse Selection page
    And I navigate to "Front Office Profile" page
    Then New Club is displayed in the Club Selection field in Account Profile page