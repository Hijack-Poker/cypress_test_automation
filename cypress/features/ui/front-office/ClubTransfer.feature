Feature: Front Office - Club Transfer
  #Author: Alfe Niño Laña 02/08/2024

  #-------------------------------------
  # JIRA ticket: EN-2882
  #-------------------------------------

  @smoke
  Scenario: Verify that a player can search for another player
    Given I navigate to "Front Office Login" page
    When I click on "Login with Email" button in Descope page
    And I enter "valid" credentials in Descope page
    And I click on "Login" button in Descope page
    And I click on "Cashier button" in "Lobby page" of "Front Office"
    And I click "Transfer" in the Cashier Menu
    And I input "alana@oppy.tech" in the find user textbox
    And I click "Find User" button in Cashier
    Then The email "alana@oppy.tech" should be displayed in Player Transfer

  Scenario: Verify that a player can select a player from successful search results
    Given I navigate to "Front Office Login" page
    When I click on "Login with Email" button in Descope page
    And I enter "valid" credentials in Descope page
    And I click on "Login" button in Descope page
    And I click on "Cashier button" in "Lobby page" of "Front Office"
    And I click "Transfer" in the Cashier Menu
    And I input "alana@oppy.tech" in the find user textbox
    And I click "Find User" button in Cashier
    And I click "Select User" button in Cashier
    Then The "Amount to Transfer" should be displayed in the page

  Scenario: Verify that a player receives correct error message from unsuccessful player search
    Given I navigate to "Front Office Login" page
    When I click on "Login with Email" button in Descope page
    And I enter "valid" credentials in Descope page
    And I click on "Login" button in Descope page
    And I click on "Cashier button" in "Lobby page" of "Front Office"
    And I click "Transfer" in the Cashier Menu
    And I input "Lorem Ipsum" in the find user textbox
    And I click "Find User" button in Cashier
    Then The "User not found" notification should be displayed in Cashier page

  Scenario: Verify that a player can enter a valid dollar amount to transfer with a selected player account
    Given I navigate to "Front Office Login" page
    When I click on "Login with Email" button in Descope page
    And I enter "valid" credentials in Descope page
    And I click on "Login" button in Descope page
    And I click on "Cashier button" in "Lobby page" of "Front Office"
    And I click "Transfer" in the Cashier Menu
    And I input "alana@oppy.tech" in the find user textbox
    And I click "Find User" button in Cashier
    And I click "Select User" button in Cashier
    And I input "10" amount in "Transfer"
    And I click "Send Transfer" button in Cashier
    Then The verification modal is displayed in Cashier Page