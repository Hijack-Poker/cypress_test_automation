import frontOfficeLocators from "../../../element-locators/front-office-locators";
import { Before, Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  // Load fixtures data
  cy.fixture('player-details.json').then(function (data) {
    this.playerDetails = data;
  });
  // Added uncaught exception handler inside origin
  cy.origin("https://auth.descope.io", () => {
    Cypress.on('uncaught:exception', (err) => {
      if (err.name.includes('NotAllowedError')) {
        return false;
      }
    });
  });
});

Given('I login to Front Office via Auth Descope API', function () {
  cy.c_loginDescopeViaAPI(this.playerDetails.player1_email, this.playerDetails.password);
});

Given('I login to Front Office via Auth Descope UI', function () {
  cy.c_navigateToPage("front office login");
  const { email_textbox, password_textbox, login_with_email_button, login_button } = frontOfficeLocators.login_page;
  const { player1_email, password } = this.playerDetails;
  cy.origin("https://auth.descope.io", { args: { login_with_email_button, login_button, email_textbox, password_textbox, playerEmail: player1_email, playerPassword: password } }, ({ login_with_email_button, login_button, email_textbox, password_textbox, playerEmail, playerPassword }) => { 
    cy.get(login_with_email_button).click();
    cy.get(email_textbox).type(playerEmail);
    cy.get(password_textbox).type(playerPassword, { force: true });
    cy.get(login_button).click();
  });
  cy.c_verifyPageDisplayed("front office cardhouse");
});

When('I click on {string} button in Descope page', (button) => {
  let value;
  switch (button.toLowerCase()) {
  case 'login with email':
    value = frontOfficeLocators.login_page.login_with_email_button;
    break;
  case 'login':
    value = frontOfficeLocators.login_page.login_button;
    break;
  case 'forgot password':
    value = frontOfficeLocators.login_page.forgot_password;
    break;
  default:
    throw new Error('Invalid button name provided: ' + button);
  }
  const element = value;
  cy.origin("https://auth.descope.io", { args: { element } }, ({ element }) => {
    cy.get(element).click();
  });
});

When('I enter {string} credentials in Descope page', function (validity) {
  const { email_textbox, password_textbox } = frontOfficeLocators.login_page;
  let { player1_email, password } = this.playerDetails;
  if (validity === 'invalid') {
    password = "invalidPassword";
  }
  cy.origin("https://auth.descope.io", { args: {email_textbox, password_textbox, playerEmail: player1_email, playerPassword: password} }, ( {email_textbox, password_textbox, playerEmail, playerPassword}) => {
    cy.get(email_textbox).type(playerEmail);
    cy.get(password_textbox).type(playerPassword, { force: true }); // added option to avoid error
  });
});

Then('Auth Descope page should be displayed', () => {
  cy.origin("https://auth.descope.io", () => {
    cy.contains('Login or Register with').should('be.visible');
  });
});

Then('Reset Password modal should be displayed with text {string}', (text) => {
  const { reset_password_modal } = frontOfficeLocators.login_page;
  cy.origin("https://auth.descope.io", { args: { reset_password_modal, text } }, ({ reset_password_modal, text }) => {
    cy.get(reset_password_modal).should('be.visible').and('contain', text);
  });
});

Then('Error message should be displayed with text {string}', (text) => {
  const { error_message } = frontOfficeLocators.login_page;
  cy.origin("https://auth.descope.io", { args: { error_message, text } }, ({ error_message, text }) => {
    cy.get(error_message).should('be.visible').and('contain', text);
  });
});