Feature: Club Management - Ledger | Cash Adjustment
  #Author: Alfe Niño Laña 03/11/2024

  #----------------------------------
  # JIRA ticket: EN-3166
  #----------------------------------

  Scenario: Verify that clicking outside the Cash Adjustment modal will close the modal
    Given I logged in Club Management API
    When I click the "Users" in the User Management Dashboard
