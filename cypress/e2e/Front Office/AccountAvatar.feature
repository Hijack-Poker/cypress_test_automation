Feature: Account - Avatar
    #Author: Alfe Niño Laña 01/23/2024

    #-------------------------------------
    # JIRA ticket: EN-2791
    #-------------------------------------

    Scenario: Verify that user can successfully edit their avatar
        Given I login in the HiJack Poker
        When I logged in using the testing account
        And I click my profile
        And I click the Account button
        And I click Avatar tab in Account Details
        And I choose different logo to update my avatar
        Then The message displayed in the account details should be "Avatar Updated!"