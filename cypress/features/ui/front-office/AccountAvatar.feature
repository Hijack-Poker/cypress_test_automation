Feature: Front Office - Account Avatar
  #Author: Anthony Mansueto 02/08/2024

  #-------------------------------------
  # JIRA ticket: EN-2791
  #-------------------------------------

  @smoke
  Scenario: Verify that user can successfully edit their avatar
    Given I navigate to "Front Office Login" page
    When I am login to Auth Descope via UI
    And I click on "Avatar button" in "Navigation bar" of "Front Office"
    And I click on "Account button" in "Navigation bar" of "Front Office"
    Then "Front Office Profile" page should be displayed
    When I click on "Avatar menu" in "Account Settings page" of "Front Office"
    And I select an avatar from the Avatar Selection section
    Then New Avatar is displayed in my Account Profile