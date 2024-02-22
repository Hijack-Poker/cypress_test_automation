Feature: Club Management -  Users Profile
  #Author: Alfe Niño Laña 02/08/2024

  #-------------------------------------
  # JIRA ticket: EN-2983
  #-------------------------------------

  @smoke
  Scenario: Verify that the admin can view the basic information of the employee on the profile page
    Given I logged in Club Management API
    When I click the "Users" in the User Management Dashboard
    And I click View Profile of "Sevs" on Users table
    Then The "Basic Information" tab should displayed in the Profile page

  @smoke
  Scenario: Verify that the basic information section displays an edit icon, the employee's name, creation and last edit dates, and the employee's status
    Given I logged in Club Management API
    When I click the "Users" in the User Management Dashboard
    And I click View Profile of "Sevs" on Users table
    Then The "Edit button" should be displayed in the Basic Information tab
    And The name "Sevs" should be displayed in the Basic Information tab
    And The "Created" should be displayed in the Basic Information tab
    And The "Last edited" should be displayed in the Basic Information tab
    And The "Status" should be displayed in the Basic Information tab

  @smoke
  Scenario: Verify that the text information for the "Request New Pin" section is visible, along with the "Request New Pin" button
    Given I logged in Club Management API
    When I click the "Users" in the User Management Dashboard
    And I click View Profile of "Sevs" on Users table
    Then The "Request New Pin" tab should displayed in the Profile page
    And The Request New Pin button should be displayed in Request New Pin tab

  @smoke
  Scenario: Verify that clicking "Request New Pin" opens a modal with a new pin number and accompanying text information
    Given I logged in Club Management API
    When I click the "Users" in the User Management Dashboard
    And I click View Profile of "Sevs" on Users table
    And I click "Request New Pin" button on Profile page
    Then The "Request New Pin" modal should be displayed in the Profile page

  @smoke
  Scenario: Verify that the "Delete Account" options is clickable 
    Given I logged in Club Management API
    When I click the "Users" in the User Management Dashboard
    And I click View Profile of "Sevs" on Users table
    And I click "Delete Account" button on Profile page
    Then The "Confirm deletion" modal should be displayed in the Profile page

  @smoke
  Scenario: Verify that clicking "Suspend Account" changes the user's status to "suspended"
    Given I logged in Club Management API
    When I click the "Users" in the User Management Dashboard
    And I click View Profile of "Sevs" on Users table
    And I click "Suspended Account" button on Profile page
    Then The status dipslayed in the Basic information should be "suspended"

  @smoke
  Scenario: Verify that clicking "Activate Account" changes the user's status to "active"
    Given I logged in Club Management API
    When I click the "Users" in the User Management Dashboard
    And I click View Profile of "Sevs" on Users table
    And I click "Active Account" button on Profile page
    Then The status dipslayed in the Basic information should be "active"

