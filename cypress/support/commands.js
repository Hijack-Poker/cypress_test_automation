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
Cypress.Commands.add('navigateToPage', (pageName) => {
  switch (pageName.toLowerCase()) {
    case 'hijack login':
      cy.visit('/index');
      break;
    case 'hijack cardhouse':
      cy.visit('/hijack/cardhouse');
      break;
    case 'club login':
      Cypress.config('baseUrl', Cypress.env('CLUBS_MANAGEMENT_URL'));
      cy.visit('/');
      break;
    // case 'club austin transactions':
    //   Cypress.config('baseUrl', Cypress.env('CLUBS_TRANSACTION_AUSTIN_URL'));
    //   cy.visit('/');
    //   break;
    // case 'club dallas transactions':
    //   Cypress.config('baseUrl', Cypress.env('CLUBS_TRANSACTION_DALLAS_URL'));
    //   cy.visit('/');
    //   break;
    // case 'club rgv transactions':
    //   Cypress.config('baseUrl', Cypress.env('CLUBS_TRANSACTION_RGV_URL'));
    //   cy.visit('/');
    //   break;
    // case 'club spring transactions':
    //   Cypress.config('baseUrl', Cypress.env('CLUBS_TRANSACTION_SPRING_URL'));
    //   cy.visit('/');
    //   break;
    default:
      cy.log('Invalid page name provided: ' + pageName.toLowerCase());
  }
});