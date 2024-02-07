Feature: Account - Account Help
    #Author: Alfe Niño Laña 01/23/2024

    #-------------------------------------
    # JIRA ticket: EN-2792
    #-------------------------------------

    Scenario: Verify that player is redirected to freshdesk website when clicking the Help Portal
        Given I login in the HiJack Poker
        When I logged in using the testing account
        And I click my profile
        And I click the Account button
        And I click Help tab in Account Details
        And I click the Help Portal link
        Then The Help Portal page should be displayed