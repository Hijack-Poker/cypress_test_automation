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
    });
  }
});