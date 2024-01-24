@account @regression
Feature: Account - Account Details
    #Author: Alfe Niño Laña 01/19/2024

    #-------------------------------------
    # JIRA ticket: EN-2785
    #-------------------------------------

    Scenario Outline: Verify that error message displays when empty on required fields
        Given I login in the HiJack Poker
        When I logged in using the testing account
        And I click my profile
        And I click the Account button
        And I click the edit "<fieldName>" on Account Details
        And I empty the name field of "<fieldName>"
        And I click the Save button of "<fieldName>" on account details
        Then The error message "<errorMessage>" should be displayed
        Examples:
            | fieldName    | errorMessage                      |
            | Display Name | Display Name should not be empty! |
            | First Name   | First Name should not be empty!   |
            | Last Name    | Last Name should not be empty!    |

    Scenario: Verify that player can successfully edit their account details
        Given I login in the HiJack Poker
        When I logged in using the testing account
        And I click my profile
        And I click the Account button
        And I click the edit "Last Name" on Account Details
        And I edit the "Last Name" to "Sample" on Account Details

    Scenario:    



