Feature: Front Office - Account Avatar
  #Author: Anthony Mansueto 02/08/2024
  #Modified by: Anthony Mansueto 02/12/2024

  #-------------------------------------
  # JIRA ticket: EN-2791
  #-------------------------------------

  @smoke
  Scenario: Verify that user can successfully edit their avatar
    Given I login to Front Office via Auth Descope UI
    When I navigate to "Front Office Profile" page
    Then "Front Office Profile" page should be displayed
    When I click on "Avatar menu" in "Account Settings page" of "Front Office"
    And I select an avatar from the Avatar Selection section
    Then The "Message modal" of "Front Office" is displayed with message "Avatar Updated!"
    And New Avatar is displayed in Account Profile