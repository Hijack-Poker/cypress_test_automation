Feature: Front Office - Club Withdraw
  #Author: Alfe Niño Laña 02/07/2024

  #-------------------------------------
  # JIRA ticket: EN-2785
  #-------------------------------------

  @smoke
  Scenario: Verify that user cannot input invalid amount in club withdrawal amount
    Given I navigate to "Front Office Login" page
    When I click on "Login with Email" button in Descope page
    And I enter "valid" credentials in Descope page
    And I click on "Login" button in Descope page
    And I click on "Cashier button" in "Lobby page" of "Front Office"
    And I click "Club Withdraw" in the Cashier Menu
    And I input '11000' amount in "Withdraw Amount"
    And I click "Process Withdraw" button in Cashier
    Then The "Withdraw" notification should be displayed in Cashier page

@smoke
 Scenario: Verify user processes club withdrawal
    Given I navigate to "Front Office Login" page
    When I click on "Login with Email" button in Descope page
    And I enter "valid" credentials in Descope page
    And I click on "Login" button in Descope page
    And I click on "Cashier button" in "Lobby page" of "Front Office"
    And I click "Club Withdraw" in the Cashier Menu
    And I input '25' amount in "Withdraw Amount"
    And I click "Process Withdraw" button in Cashier
    Then The verification modal is displayed in Cashier Page

@smoke
 Scenario: Verify that withdrawal will not be successful if incorrect verification code is entered
    Given I navigate to "Front Office Login" page
    When I click on "Login with Email" button in Descope page
    And I enter "valid" credentials in Descope page
    And I click on "Login" button in Descope page
    And I click on "Cashier button" in "Lobby page" of "Front Office"
    And I click "Club Withdraw" in the Cashier Menu
    And I input '10' amount in "Withdraw Amount"
    And I click "Process Withdraw" button in Cashier
    And I click "Received code SMS button" button in Cashier
    And I input "1234" in code textbox
    And I click "Verify button" button in Cashier
    Then The "Request error" notification should be displayed in Cashier page