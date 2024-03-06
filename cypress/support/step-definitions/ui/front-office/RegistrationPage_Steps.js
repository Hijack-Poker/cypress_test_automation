import frontOfficeLocators from "../../../element-locators/front-office-locators";
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I go to Registration Form modal in Descope page', function () {
  cy.c_navigateToPage("front office login");
  const { register_now_with_email, code_submit_button } = frontOfficeLocators.login_page;
  const { email_textbox, submit_button, verification_passcode } = frontOfficeLocators.registration_page;
  const { test_user_register } = this.userDetails;
  cy.origin("https://auth.descope.io", { args: { register_now_with_email, email_textbox, submit_button, testUserEmail: test_user_register.email } }, ({ register_now_with_email, email_textbox, submit_button, testUserEmail }) => { 
    cy.get(register_now_with_email).click();
    cy.get(email_textbox).type(testUserEmail);
    cy.get(submit_button).click();
  });
  cy.c_generateTestUserOTP(test_user_register.email, "email").then((otpCode) => {
    let arrValue = otpCode.split('');
    cy.c_enterOTPCode(arrValue, verification_passcode);
  });
  cy.c_clickElementInDescope(code_submit_button);
});

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
    case 'verification':
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

When('I use API to generate OTP via {string} for {string} then enter in Descope Verification modal', function (deliveryMethod, testUser) {
  const { test_user1, test_user_register } = this.userDetails;
  let userSelected;
  if (testUser == 'test user 1') {
    userSelected = test_user1.email;
  } else if (testUser == 'test user registration') {
    userSelected = test_user_register.email;
  }
  cy.c_generateTestUserOTP(userSelected , deliveryMethod).then((otpCode) => {
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
});

When('I enter 6-digit OTP {string} in Descope Verification modal', function (otpCode) {
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

When('I populate the Registration form fields with these values', (dataTable) => {
  cy.c_generateRandomString(5).then((generatedRandomString) => {
    let randomString = generatedRandomString;
    dataTable.hashes().forEach((row) => {
      const fieldName = row['Field'];
      const fieldValue = row['Value'];
      const fieldLabel = frontOfficeLocators.registration_page[`${fieldName.toLowerCase().replace(/ /g, "_")}_label`];
      cy.origin("https://auth.descope.io", { args: { fieldLabel, fieldName, fieldValue, randomString } }, ( { fieldLabel, fieldName, fieldValue, randomString }) => { 
        cy.get(fieldLabel).should('be.visible').click();
        if(fieldName.includes('Phone')) {
          cy.get(fieldLabel).find('input').should('be.visible').invoke('val', fieldValue);
        } else if (fieldName.includes('Password')) {
          cy.get(fieldLabel).find('input').should('be.visible').type(fieldValue + randomString);
        } else {
          // eslint-disable-next-line cypress/unsafe-to-chain-command
          cy.get(fieldLabel).find('input').should('be.visible').clear().type(fieldValue);
        }
      });
    });
  });
});

When('I edit the Registration form field {string} with value {string}', (fieldName, fieldValue) => {
  const fieldLabel = frontOfficeLocators.registration_page[`${fieldName.toLowerCase().replace(/ /g, "_")}_label`];
  cy.origin("https://auth.descope.io", { args: { fieldLabel, fieldName, fieldValue } }, ( { fieldLabel, fieldName, fieldValue }) => { 
    cy.get(fieldLabel).should('be.visible').click();
    if(fieldName.includes('Phone')) {
      // eslint-disable-next-line cypress/unsafe-to-chain-command
      cy.get(fieldLabel).find('input').clear().invoke('val', fieldValue);
    } else {
      // eslint-disable-next-line cypress/unsafe-to-chain-command
      cy.get(fieldLabel).find('input').clear().type(fieldValue);
    }
  });
});

Then('The Registration form fields is displayed with these values', (dataTable) => {
  dataTable.rawTable.forEach((row) => {
    cy.origin("https://auth.descope.io", { args: { row } }, ( { row }) => { 
      const displayedValue = row[0].trim();
      const fieldValue = `input[value*="${displayedValue}"]`;
      cy.get(fieldValue).should('be.visible');
    });
  });
});

Then('Error message should be displayed in {string} with message {string}', (location, errorMessage) => {
  const { code_error_message, email_error_message, field_error_message } = frontOfficeLocators.registration_page;
  cy.origin("https://auth.descope.io", { args: { location, errorMessage, code_error_message, email_error_message, field_error_message } }, ( { location, errorMessage, code_error_message, email_error_message, field_error_message }) => {
    let locatorValue; 
    switch (location.toLowerCase()) {
    case 'otp verification modal':
    case 'registration form modal':  
      locatorValue = code_error_message;
      break;
    case 'verify your email modal':
      locatorValue = email_error_message;
      break;
    case 'registration form field':
    case 'otp verification field':
      locatorValue = field_error_message;
      break;  
    default:
      throw new Error('Invalid location provided: ' + location);
    }
    cy.get(locatorValue).should('be.visible').and('contain', errorMessage);
  });
});