Feature: Front Office - Login Logout
  #Author: Alfe Niño Laña 01/18/2024
  #Modified by: Anthony Mansueto 02/01/2024

  #-------------------------------------
  # JIRA ticket: EN-2785
  #-------------------------------------

  @smoke
  Scenario: Login With Email - Verify that player is redirected to cardhouse page after login and can enter lobby
    Given I navigate to "HiJack Login" Page
    When I click on "Login with Email" button in Hijack Login Page
    # And I enter valid email address in Hijack Login Page
    # And I enter valid password in Hijack Login Page
    # And I click on "Login" button in Hijack Login Page
    # Then HiJack "Cardhouse" page should be displayed
    # When I click on "Lobby" button
    # Then HiJack "Lobby" page should be displayed

  # @smoke
  # Scenario: Login With Email - Verify that player can logout and not access the website by manually entering the URL
    # Given I login to HiJack Game via "Login With Email"
    # When I click on my avatar
    # And I click on "Logout" button
    # Then "HiJack Login" page should be displayed
    # When I navigate to "HiJack Cardhouse" Page
    # Then "HiJack Login" page should be displayed

  # @smoke
  # Scenario: Login With Email - Verify that user can successfully reset password, when they do the forgot password process

  # @smoke
  # Scenario: Login With Email - Verify that user cannot login with invalid credentials
  
  # @smoke
  # Scenario: Login With Email - Verify error message is displayed when user enters incorrect password