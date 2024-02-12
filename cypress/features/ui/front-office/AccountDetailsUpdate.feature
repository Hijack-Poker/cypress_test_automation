Feature: Front Office - Account Details Update
  #Author: Anthony Mansueto 02/09/2024

  #-------------------------------------
  # JIRA ticket: EN-2910
  #-------------------------------------

  # @smoke
  # Scenario: Verify that player can successfully edit their account details
  #   Given I navigate to "Front Office Login" page
  #   When I am login to Auth Descope via UI
  #   And I click on "Avatar button" in "Navigation bar" of "Front Office"
  #   And I click on "Account button" in "Navigation bar" of "Front Office"
  #   Then "Front Office Profile" page should be displayed
  #   When I edit the Account Details fields with these values
  #   | Field         | Value                  |
  #   | Display Name  | QAAUTO                 |
  #   | First Name    | QAAUTO Test First Name |
  #   | Last Name     | QAAUTO Test Last Name  |
  #   | Address       | QAAUTO Test Address    |
  #   Then The Account Details fields is displayed with these values
  #   | QAAUTO                 |
  #   | QAAUTO Test First Name |
  #   | QAAUTO Test Last Name  |
  #   | QAAUTO Test Address    |

  Scenarios: Verify that player can successfully remove/add phone number
    Given I navigate to "Front Office Login" page
    When I am login to Auth Descope via UI
    And I click on "Avatar button" in "Navigation bar" of "Front Office"
    And I click on "Account button" in "Navigation bar" of "Front Office"
    Then "Front Office Profile" page should be displayed 
    When I click on "Change Phone button" in "Account Settings Page" of "Front Office"
    And I add phone number "" in the Verify Your Phone modal
    Then Phone number "" is displayed in the Verify Your Phone modal
    When I remove phone number "" in the Verify Your Phone modal
    Then Phone number "" is not displayed in the Verify Your Phone modal

  # @smoke
  # Scenario:Verify that error message appears when inputting blank/invalid characters in the required fields
    
  # @smoke
  # Scenario:Verify that player can successfully change their cardhouse

