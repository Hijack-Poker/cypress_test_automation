Feature: Club Management -  Dashboard
#Author: Alfe Niño Laña 02/08/2024

  #-------------------------------------
  # JIRA ticket: EN-2982
  #-------------------------------------

  @smoke
  Scenario: Verify that all users are successfully retrieved and displayed in the table
    Given I logged in Club Management API 
    When I click the "Users" in the User Management Dashboard
    Then The list of users should be displayed in the Users table

  Scenario: Verify that each user has one of the following statuses: active, suspended, not active, or deleted
    Given I logged in Club Management API   
    When I click the "Users" in the User Management Dashboard

  Scenario: Verify that clicking on a user's name allows viewing their profile

  Scenario: Verify the ability to search for users by entering keywords in the search input field

  Scenario: Verify that selecting the "active" checkbox displays only active status users

  Scenario: Verify that selecting the "suspended" checkbox displays only suspended users

  Scenario: Verify that clicking on the "Create Employee" button redirects the admin to the create user tab

  Scenario: Verify that clicking on "View Profile" for an employee in the list redirects the admin to the user's profile page

  Scenario: Verify that the main navigation bar, clubhouse dropdown, and logout remain visible and functional when scrolling up and down 