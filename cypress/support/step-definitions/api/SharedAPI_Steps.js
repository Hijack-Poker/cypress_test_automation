import frontOfficeLocators from "../../element-locators/front-office-locators";
import { Given, When } from "@badeball/cypress-cucumber-preprocessor";

Given('I login to Front Office via Auth Descope API', function () {
  cy.c_loginDescopeViaAPI(this.userDetails.player1.email, this.userDetails.common.password).then(() => {
    cy.visit(Cypress.env('FRONT_OFFICE_ACCOUNT_URL') + '/hijack/cardhouse');
  });
});

Given('I am logged in as {string} in Front Office', function (userType) {
  const { player1, player2, test_user1, test_user_register, common } = this.userDetails;
  let userEmail;
  switch (userType.toLowerCase()) {
  case 'player 1':
    userEmail = player1.email;
    break;
  case 'player 2':
    userEmail = player2.email;
    break;
  case 'test user 1':
    userEmail = test_user1.email;
    break;
  case 'test user for registration':
    userEmail = test_user_register.email;
    break;
  default:
    throw new Error('Invalid user provided: ' + userType);
  }
  cy.c_loginDescopeViaAPI(userEmail, common.password).then((idToken) => {
    this.loginIdToken = idToken;
    cy.log("GENERATED ID TOKEN: " + this.loginIdToken);
  });
});

When('I use API to Generate OTP via {string} for {string}', function (deliveryMethod, testUser) {
  const { test_user1, test_user_register } = this.userDetails;
  let userSelected;
  switch (testUser.toLowerCase()) {
  case 'test user 1':
    userSelected = test_user1.email;
    break;
  case 'test user registration':
    userSelected = test_user_register.email;
    break;
  default:
    throw new Error('Invalid testUser provided: ' + testUser);
  }
  cy.c_generateTestUserOTP(userSelected, deliveryMethod).then((otpCode) => {
    this.otpCode = otpCode;
    cy.log("GENERATED OTP CODE: " + this.otpCode);
  });
});

When('I use API to Generate OTP via {string} for {string} then enter in {string}', function (deliveryMethod, testUser, location) {
  const { test_user1, test_user_register } = this.userDetails;
  const { common, cashier_page } = frontOfficeLocators;
  let userSelected;
  let codeLocator;
  if (testUser == 'test user 1') {
    userSelected = test_user1.email;
  } else if (testUser == 'test user registration') {
    userSelected = test_user_register.email;
  }
  cy.c_generateTestUserOTP(userSelected, deliveryMethod).then((otpCode) => {
    if (location == 'Verify Your Phone modal') {
      codeLocator = common.verify_your_phone_modal;
      cy.get(codeLocator).find('input').eq(1).should('be.visible').type(otpCode);
    } else if (location == 'Cashier Verify Phone modal') {
      codeLocator = cashier_page.enter_code_txtbox;
      cy.get(codeLocator).find('input').should('be.visible').type(otpCode);
    }
  });
});