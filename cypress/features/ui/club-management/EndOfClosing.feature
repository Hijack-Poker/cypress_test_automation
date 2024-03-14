Feature: Club Management - Ledger | Cash Adjustment
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

  Scenario: Verify that clicking the Cancel button in the “End of Day Closing” modal will close the modal

  Scenario: Verify that clicking the Close Out button in the “End of Day Closing” modal will display another modal with “Cash On Hand” field which will allow the user to input a numeric value

  Scenario: Verify that user is able to click the “End of Day Closing” button and will display the correct modal

  Scenario: Verify that user is able to clockout successfully the employee of that specific club

  Scenario: Verify that user is only able to clockout one employee at a time

  Scenario: Verify that when all employees are successfully clockout, the “End of Day Closing” modal will display a Cancel button

  Scenario: Verify that when all employees are successfully clockout, the “End of Day Closing” modal will display a Close Out button

  Scenario: Verify that when all employees are successfully clockout, the “End of Day Closing” modal will display “All employees have already clocked out. Proceed closing out?”

  Scenario: Verify that “End of Day Closing” label is displaying in the modal when clicking the End of Day Closing button