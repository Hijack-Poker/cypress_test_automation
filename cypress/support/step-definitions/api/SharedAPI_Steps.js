import { Given, When } from "@badeball/cypress-cucumber-preprocessor";

Given('I login to Front Office via Auth Descope API', function () {
  cy.c_loginDescopeViaAPI(this.userDetails.player1.email, this.userDetails.common.password);
});

When('I use API to Generate OTP via {string} for test user', function (method) {
  const allowedMethods = ['email', 'sms'];
  if (!allowedMethods.includes(method.toLowerCase())) {
    throw new Error(`Selected method is not acceptable: ${method}`);
  } else {
    cy.c_generateTestUserOTP(this.userDetails.test_user1.email, method.toLowerCase()).then((otpCode) => {
      this.otpCode = otpCode;
      cy.log("GENERATED CODE: " + this.otpCode);
    });
  }
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
    throw new Error('Invalid location provided: ' + location);
  }
  cy.c_generateTestUserOTP(userSelected, deliveryMethod).then((otpCode) => {
    this.otpCode = otpCode;
  });
});