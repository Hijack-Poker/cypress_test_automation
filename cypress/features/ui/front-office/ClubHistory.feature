Feature: Front Office - Club History
  #Author: Alfe Niño Laña 02/12/2024

  #-------------------------------------
  # JIRA ticket: EN-2883
  #-------------------------------------

  #For Enhancement: To add API pre-requisite step to validate history of recent transaction

  @smoke
  Scenario: Verify that club deposit history is reflected
    Given I login to Front Office via Auth Descope UI
    When I click on "Cashier button" in "Lobby page" of "Front Office"
    And I click "History" in the Cashier Menu
    Then The "Deposit" type should be displayed in History page

  @smoke
  Scenario: Verify that club withdrawal is reflected in history
    Given I login to Front Office via Auth Descope UI
    When I click on "Cashier button" in "Lobby page" of "Front Office"
    And I click "History" in the Cashier Menu
    Then The "Withdrawal" type should be displayed in History page

  @smoke
  Scenario: Verify that transfer transactions are reflected in history
    Given I login to Front Office via Auth Descope UI
    When I click on "Cashier button" in "Lobby page" of "Front Office"
    And I click "History" in the Cashier Menu
    Then The "Transfer" type should be displayed in History page

  @smoke
  Scenario: Verify that user can refresh history list
    Given I login to Front Office via Auth Descope UI
    And I click on "Cashier button" in "Lobby page" of "Front Office"
    And I click "History" in the Cashier Menu  
    And I click "Refresh History" button in Cashier
    Then The table datas should be displayed in History Page
