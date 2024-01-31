@smoke @registration
Feature: Front Office - Registration
    #Author: Alfe Niño Laña 01/30/2024

    #-------------------------------------
    # JIRA ticket: EN-2824
    #-------------------------------------

    Scenario: Verify that clicking the "Register Now" button redirects the user to the "Verify Email" page.
        Given I login in the HiJack Poker
        When I click the the Register Now with Email
        Then The Verify Your Email modal should be displayed

    Scenario: Verify that when entering an email, the system prompts the user to verify the code sent to that email.
        Given I login in the HiJack Poker
        When I click the the Register Now with Email
        And I input the email to be verified for registration
        And I click the submit button in the registration
        Then Verification info message is displayed on registration modal

    Scenario: Verify that when an invalid code is entered, the system prevents the user from proceeding to the next step.
        Given I login in the HiJack Poker
        When I click the the Register Now with Email
        And I input the email to be verified for registration
        And I click the submit button in the registration
        And I type this verification code in the Registation modal
        And I click the verification code submit button
        Then The failed error message for email code verification should be displayed

    Scenario: Verify that when an email address is entered in an incorrect format
        Given I login in the HiJack Poker
        When I click the the Register Now with Email
        And I input not an email in Registration
        And I click the submit button in the registration
        Then The failed error message for rmail format in registration should be displayed
