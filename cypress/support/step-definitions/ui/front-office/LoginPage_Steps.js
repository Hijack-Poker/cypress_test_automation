import frontOfficeLocators from "../../../element-locators/front-office-locators";
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I login to Front Office via Auth Descope UI', function () {
  cy.c_navigateToPage("front office login");
  const { email_textbox, password_textbox, login_with_email_button, login_button } = frontOfficeLocators.login_page;
  const { player1, common } = this.userDetails;
  cy.origin("https://auth.descope.io", { args: { login_with_email_button, login_button, email_textbox, password_textbox, playerEmail: player1.email, playerPassword: common.password } }, ({ login_with_email_button, login_button, email_textbox, password_textbox, playerEmail, playerPassword }) => { 
    cy.get(login_with_email_button).click();
    cy.get(email_textbox).type(playerEmail);
    cy.get(password_textbox).type(playerPassword, { force: true });
    cy.get(login_button).click();
  });
  cy.c_verifyPageDisplayed("front office cardhouse");
});

When('I enter {string} credentials in Descope page', function (validity) {
  const { email_textbox, password_textbox } = frontOfficeLocators.login_page;
  let { player1, common } = this.userDetails;
  if (validity === 'invalid') {
    common.password = "invalidPassword";
  }
  cy.origin("https://auth.descope.io", { args: {email_textbox, password_textbox, playerEmail: player1.email, playerPassword: common.password} }, ( {email_textbox, password_textbox, playerEmail, playerPassword}) => {
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