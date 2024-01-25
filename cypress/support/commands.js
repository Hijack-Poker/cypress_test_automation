// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Assuming your commands file contains additional custom commands

Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false here prevents Cypress from failing the test on uncaught exceptions
  return false;
});

Cypress.Commands.add('performSSO', () => {
    const payload = {
      executionId: "sign-up-or-in|#|2bROM5DpbB0AbKs2WFP0xytPaDr",
      stepId: "53",
      interactionId: "VaCr2LiM1K",
      componentsVersion: "1.0.218",
      input: {
        email: "alana+17@oppy.tech",
        password: "P@ssw0rd!1",
        origin: "https://auth.descope.io"
      }
    };
  
    cy.request({
      method: 'POST',
      url: 'https://api.descope.com/v1/flow/next', // Replace with your actual API endpoint
      body: payload,
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed
      }
    }).then((response) => {
      // Handle the response as needed
      // For example, you might want to assert certain conditions on the response
      expect(response.status).to.eq(200);
      // Add more assertions as needed
    });
  });