Feature: Club Management - Ledger | Cash Adjustment
  #Author: Alfe Niño Laña 03/11/2024

  #----------------------------------
  # JIRA ticket: EN-3166
  #----------------------------------

  Scenario: Verify that clicking outside the Cash Adjustment modal will close the modal
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click Cash Adjustment button in the Ledger
    And I click outside the modal
    Then The Cash Adjustment modal should not displayed

  Scenario: Verify that clicking the Make Adjustment button when fields are empty will display appropriate error message for each required field
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "Cash Adjustment" button in the Ledger
    And I click "Make Adjustment" button in the Ledger
    Then The error message "Error: Transaction type is required." should be displayed
    And The error message "Error: Transaction amount is required." should be displayed

  Scenario: Verify that success popup message is displaying after cash adjustment
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "Cash Adjustment" button in the Ledger
    And I select "Deposit" in the Transaction type
    And I input "10" in the Transaction amount
    And I click "Make Adjustment" button in the Ledger
    Then The "Success" popup message should be displayed

  Scenario: Verify that the correct fields are displaying in the Cash Adjustment modal

  Scenario: Verify that user is able to click Cancel button which will close the modal
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "Cash Adjustment" button in the Ledger
    And I click "Cancel" button in the Ledger
    Then The Cash Adjustment modal should not displayed

  Scenario: Verify that user is able to click the “Cash Adjustment” button and will display the correct modal
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I click "Cash Adjustment" button in the Ledger
    Then The Cash Adjustment modal should be displayed

  Scenario: Verify that user is able to perform cash adjustment for Deposit and data is inserted in the table
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I get the value of total deposit in the Ledger
    And I click "Cash Adjustment" button in the Ledger
    And I select "Deposit" in the Transaction type
    And I input "10" in the Transaction amount
    And I click "Make Adjustment" button in the Ledger
    Then The new transaction should be displayed in the table

  Scenario: Verify that user is able to perform cash adjustment for Withdrawal and data is inserted in the table
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I get the value of total deposit in the Ledger
    And I click "Cash Adjustment" button in the Ledger
    And I select "Withdraw" in the Transaction type
    And I input "10" in the Transaction amount
    And I click "Make Adjustment" button in the Ledger
    Then The new transaction should be displayed in the table

  Scenario: Verify that “Cash Adjustment” label is displaying in the modal when clicking the Cash Adjustment button
    Given I logged in Club Management API
    When I click the "Ledger" in the User Management Dashboard
    And I get the value of total deposit in the Ledger
    And I click "Cash Adjustment" button in the Ledger
    Then The header "Cash Adjustment" should be displayed in the modal
