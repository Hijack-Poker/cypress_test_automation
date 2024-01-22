Feature: Front Office - Login Page
    #Author: Alfe Niño Laña 01/18/2024

    #-------------------------------------
    # JIRA ticket: EN-2785
    #-------------------------------------

    Scenario: Verify that player can logout and not access the website by manually entering the URL
        Given I login in the HiJack Poker
        When I logged in using the testing account
        And I click my profile
        And I click the logout button
        And I access the website by manually entering the URL
        Then The login page HiJack will be displayed

    Scenario: Verify that player is redirected to cardhouse page after login and can enter lobby
        Given I login in the HiJack Poker
        When I logged in using the testing account
        Then The HiJack Logo header should be displayed

    Scenario: Verify that user can reset password
        Given I login in the HiJack Poker
        When I click the Login with Email option
        And I input the test email in the login email
        And I click the forget password
        Then Reset password modal should be displayed

    Scenario: Verify that user cannot login with invalid credentials
        Given I login in the HiJack Poker
        When I click the Login with Email option
        And I input invalid email for login
        And I input invalid password
        And I click the login button
        Then The login error message should be displayed

    Scenario: Verify error message displays when incorrect password used
        Given I login in the HiJack Poker
        When I click the Login with Email option
        And I input the test email in the login email
        And I input invalid password
        And I click the login button
        Then The login error message should be displayed


