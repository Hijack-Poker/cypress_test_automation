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
Cypress.Commands.add('c_navigateToPage', (pageName) => {
  switch (pageName.toLowerCase()) {
    case 'front office login':
      cy.visit(Cypress.env('FRONT_OFFICE_ACCOUNT_URL'));
      break;
    case 'front office cardhouse':
      cy.visit(Cypress.env('FRONT_OFFICE_ACCOUNT_URL') + '/hijack/cardhouse');
      break;
    case 'front office profile':
      cy.visit(Cypress.env('FRONT_OFFICE_ACCOUNT_URL') + '/hijack/profile');
      break;  
    case 'club login':
      cy.visit(Cypress.env('CLUBS_MANAGEMENT_URL'));
      break;
    case 'front office lobby':
      cy.visit(Cypress.env('FRONT_OFFICE_PLAY_URL'));
      break;
    default:
      throw new Error('Invalid page name provided: ' + pageName);
  }
});

Cypress.Commands.add('c_verifyPageDisplayed', (pageName) => {
  switch (pageName.toLowerCase()) {
    case 'front office login':
      cy.url().should('include', '/index');
      break;
    case 'front office cardhouse':
      cy.url().should('include', '/hijack/cardhouse');
      break;
    case 'front office lobby':
      cy.url().should('include', 'play.hijackpoker');
      break;
    case 'front office profile':
      cy.url().should('include', '/hijack/profile');
      break;
    default:
      throw new Error('Invalid page name provided: ' + pageName);
  }
});

Cypress.Commands.add('c_getLocatorByNamePage', (locatorFile, page, elementName) => {
  const pageLocators = locatorFile[page.replace(/ /g, "_").toLowerCase()];
  if (!pageLocators) {
    throw new Error(`Page "${page}" not found in locator file."`);
  }
  const elementLocator = pageLocators[elementName.replace(/ /g, "_").toLowerCase()];
  if (!elementLocator) {
    throw new Error(`Element "${elementName}" not found on page "${page}."`);
  }
  // Use a callback to execute the logic
  return cy.wrap(elementLocator);
});


Cypress.Commands.add('c_generateRandomString', (length) => {
  const randomString = Array.from({ length }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
  return cy.wrap(randomString);
});