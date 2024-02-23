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

  @smoke
  Scenario: Verify that each user has one of the following statuses: active, suspended, not active, or deleted
    Given I logged in Club Management API
    When I click the "Users" in the User Management Dashboard
    Then The "Active" status is displayed in the Users table

  @smoke 
  Scenario: Verify that clicking on a user's name allows viewing their profile
    Given I logged in Club Management API
    When I click the "Users" in the User Management Dashboard
    And I click "Sevs" name in the Users Table
    Then The name "Sevs" should be displayed in the Basic Information page

  @smoke
  Scenario: Verify the ability to search for users by entering keywords in the search input field
    Given I logged in Club Management API
    When I click the "Users" in the User Management Dashboard
    And I search "Julie" in the Users search bar
    Then The data of "Julie" should be displayed in the Users table

  @smoke
  Scenario: Verify that selecting the "active" checkbox displays only active status users
    Given I logged in Club Management API
    When I click the "Users" in the User Management Dashboard
    And I click the "active" checkbox button in the User page
    Then The "Active" status is displayed in the Users table

  @smoke
  Scenario: Verify that selecting the "suspended" checkbox displays only suspended users
    Given I logged in Club Management API
    When I click the "Users" in the User Management Dashboard
    And I click the "suspended" checkbox button in the User page
    Then The "Suspended" status is displayed in the Users table

  Scenario: Verify that clicking on the "Create Employee" button redirects the admin to the create user tab
    Given I logged in Club Management API
    When I click the "Users" in the User Management Dashboard
    And I click "Create Employee" button on Users page
    Then I am redirected to "Create User" on Management page

  @smoke
  Scenario: Verify that clicking on "View Profile" for an employee in the list redirects the admin to the user's profile page
    Given I logged in Club Management API
    When I click the "Users" in the User Management Dashboard
    And I click View Profile of "Sevs" on Users table
    Then The name "Sevs" should be displayed in the Basic Information page

  Scenario: Verify that the main navigation bar, clubhouse dropdown, and logout remain visible and functional when scrolling up and down
    Given I logged in Club Management API
    When I click the "Users" in the User Management Dashboard
    And I scrolled down in the User Management page
    Then The "Navigation bar" is still displayed in the Club Managements Page
    And The "Clubhouse dropdown" is still displayed in the Club Managements Page
    And The "Logout button" is still displayed in the Club Managements Page