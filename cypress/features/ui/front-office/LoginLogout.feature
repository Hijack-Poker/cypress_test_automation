Feature: Front Office - Login Logout
  #Author: Alfe Niño Laña 01/18/2024
  #Modified by: Anthony Mansueto 02/01/2024

  #-------------------------------------
  # JIRA ticket: EN-2785
  #-------------------------------------

  @smoke
  Scenario: Login With Email - Verify that player is redirected to cardhouse page after login and can enter lobby
    Given I navigate to "Front Office Login" page
    When I click on "Login with Email" button in Descope page
    And I enter "valid" credentials in Descope page
    And I click on "Login" button in Descope page
    Then "Front Office Cardhouse" page should be displayed
    When I click on "Enter Lobby button" in "Club House page" of "Front Office"
    Then "Front Office Lobby" page should be displayed

  @smoke
  Scenario: Login With Email - Verify that player can logout and not access the website by manually entering the URL
    Given I navigate to "Front Office Login" page
    When I am login to Auth Descope via UI
    And I click on "Avatar button" in "Navigation bar" of "Front Office"
    And I click on "Logout button" in "Navigation bar" of "Front Office"
    Then Auth Descope page should be displayed
    When I navigate to "Front Office Cardhouse" page
    Then Auth Descope page should be displayed

  @smoke
  Scenario: Login With Email - Verify that user can successfully reset password, when they do the forgot password process
    Given I navigate to "Front Office Login" page
    When I click on "Login with Email" button in Descope page
    And I enter "valid" credentials in Descope page
    And I click on "Forgot Password" button in Descope page
    Then Reset Password modal should be displayed with text "We've sent a password reset link to"

  @smoke
  Scenario: Login With Email - Verify that user cannot login with invalid credentials
    Given I navigate to "Front Office Login" page
    When I click on "Login with Email" button in Descope page
    And I enter "invalid" credentials in Descope page
    And I click on "Login" button in Descope page
    Then Error message should be displayed with text "Wrong password or unknown user"