import frontOfficeLocators from "../../../element-locators/front-office-locators";
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When('I enter valid Email in Verify Your Email page', function () {
  const { email_textbox, submit_button } = frontOfficeLocators.registration_page;
  cy.origin("https://auth.descope.io", { args: {email_textbox, submit_button, testEmail: this.userDetails.test_user_register.email } }, ( {email_textbox, submit_button, testEmail}) => {
    cy.get(email_textbox).type(testEmail);
    cy.get(submit_button).click();
  });
});

When('I enter {string} in Email textbox on Verify Your Email modal', function (emailAddress) {
  const { email_textbox, submit_button } = frontOfficeLocators.registration_page;
  cy.origin("https://auth.descope.io", { args: {emailAddress, email_textbox, submit_button} }, ( {emailAddress, email_textbox, submit_button}) => {
    cy.get(email_textbox).type(emailAddress);
    cy.get(submit_button).click();
  });
});

Then('{string} modal should be displayed in Descope', (modalName) => {
  const { verify_your_email_modal, verification_modal, registration_form } = frontOfficeLocators.registration_page;
  cy.origin("https://auth.descope.io", { args: {modalName, verify_your_email_modal, verification_modal, registration_form } }, ( {modalName, verify_your_email_modal, verification_modal, registration_form}) => {
    switch (modalName.toLowerCase()) {
    case 'verify your email':
      cy.get(verify_your_email_modal).should('be.visible').contains('Verify Your Email');
      break;
    case 'email verification':
      cy.get(verification_modal).should('be.visible').contains("We've sent a message containing a 6-digit code");
      break;
    case 'registration form':
      cy.get(registration_form).should('be.visible').contains("To complete your sign up, please provide the following information");
      break;  
    default:
      throw new Error('Invalid modal provided: ' + modalName);
    }
  });
});

When('I enter generated OTP for test users in Descope Email Verification modal', function () {
  const str = this.otpCode;
  let arrValue = str.split('');
  const { verification_passcode } = frontOfficeLocators.registration_page;
  cy.origin("https://auth.descope.io", { args: {arrValue, verification_passcode} }, ( {arrValue, verification_passcode} ) => {
    cy.get(verification_passcode).find('vaadin-text-field').each(($el, index) => {
      if (index+1 < arrValue.length) {
        cy.get(`vaadin-text-field[data-id="${index+1}"]`).find('input').type(arrValue[index+1], {force: true});
      }
    });
    cy.get(`vaadin-text-field[data-id="0"]`).find('input').type(arrValue[0], {force: true});
  });
});

When('I enter 6-digit OTP {string} in Descope Email Verification modal', function (otpCode) {
  let arrValue = otpCode.split('');
  const { verification_passcode } = frontOfficeLocators.registration_page;
  cy.origin("https://auth.descope.io", { args: {arrValue, verification_passcode} }, ( {arrValue, verification_passcode} ) => {
    cy.get(verification_passcode).find('vaadin-text-field').each(($el, index) => {
      if (index+1 < arrValue.length) {
        cy.get(`vaadin-text-field[data-id="${index+1}"]`).find('input').type(arrValue[index+1], {force: true});
      }
    });
    cy.get(`vaadin-text-field[data-id="0"]`).find('input').type(arrValue[0], {force: true});
  });
});

Then('Error message should be displayed in {string} with message {string}', (location, errorMessage) => {
  const { code_error_message, email_error_message } = frontOfficeLocators.registration_page;
  cy.origin("https://auth.descope.io", { args: { location, errorMessage, code_error_message, email_error_message } }, ( { location, errorMessage, code_error_message, email_error_message }) => {
    let locatorValue; 
    switch (location.toLowerCase()) {
    case 'email verification modal':
      locatorValue = code_error_message;
      break;
    case 'verify your email modal':
      locatorValue = email_error_message;
      break;
    default:
      throw new Error('Invalid location provided: ' + location);
    }
    cy.get(locatorValue).should('be.visible').and('contain', errorMessage);
  });
});