import profilePageLocator from "../../../element-locators/clubs-locators";
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When('I click the {string} in the User Management Dashboard', (element) => {
  cy.get(profilePageLocator.club_management_page.tab_button).contains(element).click();
});

When('I click {string} button on Profile page', (btnValue) => {
  cy.get(profilePageLocator.profile_page.profile_button).contains(btnValue).click();
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