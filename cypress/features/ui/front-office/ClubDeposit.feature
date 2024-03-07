Feature: Front Office - Club Deposit
  #Author: Alfe Niño Laña 02/16/2024

  #-------------------------------------
  # JIRA ticket: EN-2861
  #-------------------------------------

  @smoke
  Scenario: Verify that user can enter valid amount for club deposit
    Given I login to Front Office via Auth Descope API
    And I use API to update Custom Attribute "idVerified" of "amansueto+qaautoplayer@oppy.tech" user with value "APPROVED"
    When I click on "Cashier button" in "Lobby page" of "Front Office"
    And I click "Club Deposit" in the Cashier Menu
    And I input '11' amount in "Deposit Amount"
    And I select a club location
    And I click "Process Deposit" button in Cashier
    Then The verification modal is displayed in Cashier Page

  Scenario: Verify that user cannot input invalid amount in club deposit amount
    Given I login to Front Office via Auth Descope API
    When I click on "Cashier button" in "Lobby page" of "Front Office"
    And I click "Club Deposit" in the Cashier Menu
    And I input '11000' amount in "Deposit Amount"
    And I click the club location selector
    And I select a club location
    And I click "Process Deposit" button in Cashier
    Then The "Deposit" notification should be displayed in Cashier page

  Scenario: Verify that deposit will not be successful if incorrect verification code is entered
    Given I login to Front Office via Auth Descope API
    And I click on "Cashier button" in "Lobby page" of "Front Office"
    And I click "Club Deposit" in the Cashier Menu
    And I input '10' amount in "Deposit Amount"
    And I click the club location selector
    And I select a club location
    And I click "Process Deposit" button in Cashier
    And I click "Received code SMS button" button in Cashier
    And I input "1234" in code textbox
    And I click "Verify button" button in Cashier
    Then The "Request error" notification should be displayed in Cashier page

  @smoke @failure
  Scenario: Verify that confirmation modal is displayed once correct verification is entered
    Given I login to Front Office via Auth Descope API
    And I click on "Cashier button" in "Lobby page" of "Front Office"
    And I click "Club Deposit" in the Cashier Menu
    And I input '10' amount in "Deposit Amount"
    And I click the club location selector
    And I select a club location
    And I click "Process Deposit" button in Cashier
    And I click "Received code SMS button" button in Cashier
    When I use API to Generate OTP via "SMS" for "test user 1" then enter in "Cashier Verify Phone modal"
    And I click "Verify button" button in Cashier
    Then The "Deposit" notification should be displayed in Cashier page