Feature: Club Management - Ledger | Clock In Employee
  #Author: Alfe Niño Laña 03/19/2024

  #----------------------------------
  # JIRA ticket: EN-3206
  #----------------------------------

  Scenario: Verify that "Add An Employee" option will display in the dropdown menu when attempting to clockin an employee but no employee is added in the club yet
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "CLOCK IN EMPLOYEE" button in the Ledger
    And I click the Employee selection bar
    Then The list of employees should be displayed

  Scenario: Verify that already clockin employee will no longer display in the employee dropdown menu
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "CLOCK IN EMPLOYEE" button in the Ledger
    And I click the Employee selection bar
    And I select "Julie" in the employee selection
    Then The list of employees should not be displayed

  Scenario: Verify that appropriate error message is displaying when attempting to clockin an employee when current deposit amount is zero
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "CLOCK IN EMPLOYEE" button in the Ledger
    And I click the Employee selection bar
    And I select "Julie" in the employee selection
    And I click "CLOCK IN EMPLOYEE" button in the Ledger
    Then The error message "Transaction amount cannot be less than or equal to 0.00." should be displayed in the modal

  Scenario: Verify that appropriate error message is displaying when attempting to transact an amount which is greater than the total club balance
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "CLOCK IN EMPLOYEE" button in the Ledger
    And I click the Employee selection bar
    And I select "Julie" in the employee selection
    And I input "100000" in the Transaction amount
    And I click "CLOCK IN EMPLOYEE" button in the Ledger
    Then The error message "Cannot clock-in employee. The total cash float already exceeds the total club balance." should be displayed in the modal

  Scenario: Verify that clicking the "Add An Employee" option in the dropdown menu will redirect the user to the Create User page

  Scenario: Verify that clicking the Cancel button inside the “Employee Clock In” modal will close the modal
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "CLOCK IN EMPLOYEE" button in the Ledger
    And I click "Cancel" button in the Ledger
    Then The Employee Clock In modal should not displayed

  Scenario: Verify that clicking the “Clock In Employee” button while fields are empty will display the appropriate error message below the required fields
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "CLOCK IN EMPLOYEE" button in the Ledger
    And I click "Cancel" button in the Ledger
    Then The Employee Clock In modal should not displayed

  Scenario: Verify that correct information/fields are displaying in the “Employee Clock In” modal
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "CLOCK IN EMPLOYEE" button in the Ledger
    Then The Employee textbox should be displayed in the modal
    And The transaction amount should be displayed in the modal
    And The total cash float should be displayed in the modal

  Scenario: Verify that correct new data is inserted in the table after an employee is clocked in
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "CLOCK IN EMPLOYEE" button in the Ledger
    And I select "Julie" in the employee selection
    And I input "100" in the Transaction amount
    And I click "CLOCK IN EMPLOYEE" button in the Ledger
    Then The new transaction should be displayed in the table

  Scenario: Verify that only numeric value is accepted in the “Transaction Amount” field
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "CLOCK IN EMPLOYEE" button in the Ledger
    And I select "Julie" in the employee selection
    And I input "aBcDz" in the Transaction amount
    Then The Transaction amount should be zero

  Scenario: Verify that success popup message is displaying after an employee is clocked in
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "CLOCK IN EMPLOYEE" button in the Ledger
    And I select "Julie" in the employee selection
    And I input "100" in the Transaction amount
    And I click "CLOCK IN EMPLOYEE" button in the Ledger
    Then The "Success" popup message should be displayed

  Scenario: Verify that Total Cash Float is displaying correct club balance

  Scenario: Verify that Total Cash Float value will display in green color when amount is valid
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "CLOCK IN EMPLOYEE" button in the Ledger
    And I select "Julie" in the employee selection
    Then The Total Cash Float should be green

  Scenario: Verify that Total Cash Float value will display in red color when amount is invalid
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "CLOCK IN EMPLOYEE" button in the Ledger
    And I click the Employee selection bar
    And I select "Julie" in the employee selection
    And I input "100000" in the Transaction amount
    Then The Total Cash Float should be red

  Scenario: Verify that user is able to click the “Clock In Employee” button and will display the correct modal
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "CLOCK IN EMPLOYEE" button in the Ledger
    Then The Employee Clock In modal should not displayed

  Scenario: Verify that user is able to input a numeric value in the “Transaction Amount” field
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "CLOCK IN EMPLOYEE" button in the Ledger
    And I input "100" in the Transaction amount
    Then The amount "100" should be displayed in the Transaction amount

  Scenario: Verify that user is able to select a single employee from the employee dropdown option
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "CLOCK IN EMPLOYEE" button in the Ledger
    And I select "Dan (dan@hijack.poker)" in the employee selection
    Then The employee "Dan (dan@hijack.poker)" should be displayed in Employee textbox

  Scenario: Verify that user is able to successfully clockin an employee after clicking the “Clock In Employee” button while required fields has a valid data
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "CLOCK IN EMPLOYEE" button in the Ledger
    And I select "Dan (dan@hijack.poker)" in the employee selection
    And I input "100" in the Transaction amount
    And I click "CLOCK IN EMPLOYEE" button in the Ledger
    Then The "Success" popup message should be displayed

  Scenario: Verify that “Employee Clock In” label is displaying in the modal when clicking the Clock In Employee button
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "CLOCK IN EMPLOYEE" button in the Ledger
    Then The header "Employee Clock In" should be displayed in the modal