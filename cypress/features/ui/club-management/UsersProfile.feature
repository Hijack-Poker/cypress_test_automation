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
    Then The name "Sevs" should be displayed in the Basic Information tab
    And The email "severinolorillajr@gmail.com" should be displayed in the Basic Information tab


  @smoke
  Scenario: Verify that the basic information section displays an edit icon, the employee's name, creation and last edit dates, and the employee's status


  @smoke
  Scenario: Verify that the text information for the "Request New Pin" section is visible, along with the "Request New Pin" button

  @smoke
  Scenario: Verify that clicking "Request New Pin" opens a modal with a new pin number and accompanying text information


  @smoke
  Scenario: Verify that the old pin becomes unusable for any transactions once a new pin has been requested

  @smoke
  Scenario: Verify that the "Suspend Account" and "Delete Account" options are clickable

  @smoke
  Scenario: Verify that clicking "Suspend Account" changes the user's status to "suspended"

  @smoke
  Scenario: Verify that clicking "Activate Account" changes the user's status to "active"

  @smoke
  Scenario: Verify that clicking "Delete Account" removes the account from the users list tab
