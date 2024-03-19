Feature: Club Management - Ledger | End Of Closing
  #Author: Alfe Niño Laña 03/14/2024

  #----------------------------------
  # JIRA ticket: EN-3193
  #----------------------------------

  Scenario: Verify that a data is inserted in the table when an employee is clockout
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    Then The data in the table should be "End of Day Closing"

  Scenario: Verify that all clockin employees are displaying in the “End of Day Closing” modal with Clockout button next to the name
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "End Of Day Closing" button in the Ledger
    Then The text "All employees have already clocked out. Proceed closing out?" should be displayed on modal

  Scenario: Verify that clicking again the Close Out button after inputting in the “Cash On Hand” field will successfully submit the close out data and will insert new data in the table
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "End Of Day Closing" button in the Ledger
    And I click "Close Out" button in the Ledger
    And I input "10" in the Cash on Hand
    And I click "Close Out" button in the Ledger

  Scenario: Verify that clicking outside the End of Day Closing modal will close the modal
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "End Of Day Closing" button in the Ledger
    And I click outside the modal
    Then The End of Closing modal should not displayed

  Scenario: Verify that clicking the Cancel button in the “End of Day Closing” modal will close the modal
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "End Of Day Closing" button in the Ledger
    And I click "Cancel" button in the Ledger
    Then The End of Closing modal should not displayed

  Scenario: Verify that clicking the Close Out button in the “End of Day Closing” modal will display another modal with “Cash On Hand” field which will allow the user to input a numeric value
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "End Of Day Closing" button in the Ledger
    And I click "CLOSE OUT" button in the Ledger
    Then The "Cash On Hand" textbox should be displayed in modal

  Scenario: Verify that user is able to click the “End of Day Closing” button and will display the correct modal
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "End Of Day Closing" button in the Ledger
    Then The header "End of Day Closing" should be displayed in the modal

  Scenario: Verify that when all employees are successfully clockout, the “End of Day Closing” modal will display a Cancel button
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "End Of Day Closing" button in the Ledger
    Then The "CANCEL" button in the modal should be displayed

  Scenario: Verify that when all employees are successfully clockout, the “End of Day Closing” modal will display a Close Out button
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "End Of Day Closing" button in the Ledger
    Then The "CLOSE OUT" button in the modal should be displayed

  Scenario: Verify that when all employees are successfully clockout, the “End of Day Closing” modal will display “All employees have already clocked out. Proceed closing out?”
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "End Of Day Closing" button in the Ledger
    Then The text "All employees have already clocked out. Proceed closing out?" should be displayed on modal

  Scenario: Verify that “End of Day Closing” label is displaying in the modal when clicking the End of Day Closing button
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "End Of Day Closing" button in the Ledger
    Then The "End Of Day Closing" field in the modal should be displayed