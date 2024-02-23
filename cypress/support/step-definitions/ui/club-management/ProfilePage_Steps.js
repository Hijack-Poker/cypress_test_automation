import profilePageLocator from "../../../element-locators/clubs-locators";
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When('I click the {string} in the User Management Dashboard', (element) => {
  cy.get(profilePageLocator.club_management_page.tab_button).contains(element).click();
});

When('I click {string} button on Profile page', (btnValue) => {
  cy.get(profilePageLocator.profile_page.profile_button).contains(btnValue).click();
});

When('I click {string} name in the Users Table', (userValue) => {
  cy.contains(profilePageLocator.users_management_page.user_table_data, userValue).click();
});

When('I search {string} in the Users search bar', (userValue) => {
  cy.get(profilePageLocator.users_management_page.search_employee_txtbox).type(userValue);
});

When('I click the {string} checkbox button in the User page', (statusValue) => {
  cy.get(profilePageLocator.users_management_page.status_check_box).filter(`[value="${statusValue}"]`).click();
});

Then('The Request New Pin button should be displayed in Request New Pin tab', () => {
  cy.contains(profilePageLocator.profile_page.profile_button, 'Request New Pin').should('be.visible');
});

Then('The {string} tab should displayed in the Profile page', (tabValue) => {
  cy.contains(profilePageLocator.profile_page.profile_text_finder, tabValue).should('be.visible');
});

Then('The {string} tab should displayed in the Profile page', (tabValue) => {
  cy.contains(profilePageLocator.profile_page.profile_text_finder, tabValue).should('be.visible');
});

Then('The status dipslayed in the Basic information should be {string}', (txtValue) => {
  cy.get(profilePageLocator.profile_page.basic_info_container_txt).eq(1).should('have.text', txtValue);
});

Then('The {string} status is displayed in the Users table', (statusValue) => {
  cy.contains(profilePageLocator.users_management_page.user_table_data, statusValue).should('be.visible');
});

Then('The name {string} should be displayed in the Basic Information page', (nameValue) => {
  cy.contains(profilePageLocator.profile_page.name_box, nameValue).should('be.visible');
});

Then('The data of {string} should be displayed in the Users table', (userValue) => {
  cy.contains(profilePageLocator.users_management_page.user_table_data, userValue).should('be.visible');
});