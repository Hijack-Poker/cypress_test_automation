Feature: Front Office - Login Logout
  #Author: Anthony Mansueto 02/07/2024

  #-------------------------------------
  # JIRA ticket: EN-2792
  #-------------------------------------

  @smoke
  Scenario: Verify that player is redirected to freshdesk website when clicking the Help Portal
    Given I navigate to "Front Office Login" page
    When I am login to Auth Descope via UI
    And I click on "Avatar button" in "Navigation bar" of "Front Office"
    And I click on "Account button" in "Navigation bar" of "Front Office"
    Then "Front Office Profile" page should be displayed
    When I click on "Help menu" in "Account Settings page" of "Front Office"
    And I click on Go to Help Portal link in Account Settings - Help page
    Then HiJack Help Portal is displayed with url "https://hijack.freshdesk.com/support/solutions"

