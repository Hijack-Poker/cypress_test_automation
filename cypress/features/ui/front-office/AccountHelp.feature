Feature: Front Office - Account Help
  #Author: Anthony Mansueto 02/07/2024
  #Modified by: Anthony Mansueto 02/12/2024

  #-------------------------------------
  # JIRA ticket: EN-2792
  #-------------------------------------

  @smoke
  Scenario: Verify that player is redirected to freshdesk website when clicking the Help Portal
    Given I login to Front Office via Auth Descope API
    When I navigate to "Front Office Profile" page
    Then "Front Office Profile" page should be displayed
    When I click on "Help menu" in "Account Settings page" of "Front Office"
    And I click on Go to Help Portal link in Account Settings - Help page
    Then HiJack Help Portal is displayed with url "https://hijack.freshdesk.com/support/solutions"