import frontOfficeLocators from "../../../element-locators/front-office-locators";
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When('I click on Go to Help Portal link in Account Settings - Help page', () => {
  cy.get(frontOfficeLocators.account_settings_page.go_to_help_portal_link).invoke('removeAttr','target').click();
});

Then('HiJack Help Portal is displayed with url {string}', (url)=> {
  cy.origin("https://hijack.freshdesk.com/support/solutions", { args: {url}} ,({url}) => {
    cy.url().should('include', url);
  });
});