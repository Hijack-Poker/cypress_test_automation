Feature: Front Office - Club Transfer
  #Author: Alfe Niño Laña 02/08/2024

  #-------------------------------------
  # JIRA ticket: EN-2882
  #-------------------------------------

  @smoke
  Scenario: Verify that a player can search for another player
    Given I login to Front Office via Auth Descope UI
    When I click on "Cashier button" in "Lobby page" of "Front Office"
    And I click "Transfer" in the Cashier Menu
    And I input "amansueto+qaautoplayer2@oppy.tech" in the find user textbox
    And I click "Find User" button in Cashier
    Then The email "amansueto+qaautoplayer2@oppy.tech" should be displayed in Player Transfer

  @smoke
  Scenario: Verify that a player can search for another player using phone number
    Given I login to Front Office via Auth Descope UI
    When I click on "Cashier button" in "Lobby page" of "Front Office"
    And I click "Transfer" in the Cashier Menu
    And I input "+13239991158" in the find user textbox
    And I click "Find User" button in Cashier
    Then The email "amansueto+qaautoplayer2@oppy.tech" should be displayed in Player Transfer

  @smoke
  Scenario: Verify that a player can select a player from successful search results
    Given I login to Front Office via Auth Descope UI
    When I click on "Cashier button" in "Lobby page" of "Front Office"
    And I click "Transfer" in the Cashier Menu
    And I input "amansueto+qaautoplayer2@oppy.tech" in the find user textbox
    And I click "Find User" button in Cashier
    And I click "Select User" button in Cashier
    Then The "Amount to Transfer" section should be displayed in the Player Transfer page

  @smoke
  Scenario: Verify that a player receives correct error message from unsuccessful player search
    Given I login to Front Office via Auth Descope UI
    When I click on "Cashier button" in "Lobby page" of "Front Office"
    And I click "Transfer" in the Cashier Menu
    And I input "Lorem Ipsum" in the find user textbox
    And I click "Find User" button in Cashier
    Then The "User not found" notification should be displayed in Cashier page

  @smoke   
  Scenario: Verify that a player receives an error message when using own email in player search
    Given I login to Front Office via Auth Descope UI
    And I click on "Cashier button" in "Lobby page" of "Front Office"
    And I click "Transfer" in the Cashier Menu
    And I input "amansueto+qaautoplayer@oppy.tech" in the find user textbox
    And I click "Find User" button in Cashier
    Then The "Account are restricted" notification should be displayed in Cashier page

  @smoke
  Scenario: Verify that a player can enter a valid dollar amount to transfer with a selected player account
    Given I login to Front Office via Auth Descope UI
    When I click on "Cashier button" in "Lobby page" of "Front Office"
    And I click "Transfer" in the Cashier Menu
    And I input "amansueto+qaautoplayer2@oppy.tech" in the find user textbox
    And I click "Find User" button in Cashier
    And I click "Select User" button in Cashier
    And I input "10" amount in "Transfer"
    And I click "Send Transfer" button in Cashier
    Then The verification modal is displayed in Cashier Page

 @smoke
  Scenario: Verify that transfer will not be successful if incorrect verification code is entered
    Given I login to Front Office via Auth Descope UI
    When I click on "Cashier button" in "Lobby page" of "Front Office"
    And I click "Transfer" in the Cashier Menu
    Then The "Send Money" section should be displayed in the Player Transfer page
    And I input "amansueto+qaautoplayer2@oppy.tech" in the find user textbox
    And I click "Find User" button in Cashier
    Then The "Select a Player" section should be displayed in the Player Transfer page
    And I click "Select User" button in Cashier
    And I input "10" amount in "Transfer"
    And I click "Send Transfer" button in Cashier
    And I click "Received code SMS button" button in Cashier
    And I input "1234" in code textbox
    And I click "Verify button" button in Cashier
    Then The "Request error" notification should be displayed in Cashier page