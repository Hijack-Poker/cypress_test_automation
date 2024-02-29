@api
Feature: Front Office API - POST Cashier Deposit
  #Author: Anthony Mansueto 02/28/2024

  #-------------------------------------
  # JIRA ticket: EN-3087
  #-------------------------------------

  @smoke
  Scenario: Verify API - POST Cashier Deposit with valid inputs
    Given I am logged in as "Player 2" in Front Office
    When I use API to post cashier deposit in club "Austin" with amount "11000" USD
    Then Response Status Code should be 200

  @smoke
  Scenario: Verify API - POST Cashier Deposit with invalid club
    Given I am logged in as "Player 2" in Front Office
    When I use API to post cashier deposit in club "invalidClub" with amount "200" USD
    Then Response Status Code should be 400
    And Response Body should contain "clubId is invalid."
  
  @smoke
  Scenario: Verify API - POST Cashier Deposit with invalid amount
    Given I am logged in as "Player 2" in Front Office
    When I use API to post cashier deposit in club "Austin" with amount "0" USD
    Then Response Status Code should be 400
    And Response Body should contain "deposit failed because the amount is either not a number or less than or equal to 0."

  #Enhancement ticket: EN-3112
  @smoke @bugfix
  Scenario: Verify API - POST Cashier Deposit with above limit amount
    Given I am logged in as "Player 2" in Front Office
    When I use API to post cashier deposit in club "Austin" with amount "11000" USD
    Then Response Status Code should be 400