const projectId = Cypress.env('descope_project_id')
const managementKey = Cypress.env('descope_management_key')

// Define the authorization header
const authHeader = {
  'Authorization': `Bearer ${projectId}:${managementKey}`,
}

/**
 * HELPERS
 */
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

/**
 * DESCOPE AUTHENTICATION
 */
Cypress.Commands.add('c_createEncodedTokenCookie', (stringToken) => {
  let cleanedString = stringToken.replace(/ /g, '%20').replace(/"/g, '%22').replace(/,/g, '%2C');
  return cleanedString;
});

Cypress.Commands.add('c_loginDescopeViaAPI', (userEmail, userPassword) => {
  cy.request({
    method: 'POST',
    url: 'https://dsauth.hijack.poker/v1/auth/password/signin',
    headers: authHeader,
    body: {
      loginId: userEmail,
      password: userPassword
    },
  }).then(({ body }) => {
    const formData = {
      grant_type: 'refresh_token',
      refresh_token: body["refreshJwt"],
      scope: 'openid profile descope:custom_claims',
      client_id: Cypress.env('client_id'),
      client_secret: Cypress.env('client_secret'),
    };
    const urlEncodedData = new URLSearchParams(formData).toString();
    const headers = {
      ...authHeader,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    cy.request({
      method: 'POST',
      url: 'https://api.descope.com/oauth2/v1/token',
      headers: headers,
      body: urlEncodedData
    }).then(({ body }) => {
      const token_cookie = JSON.stringify({ access_token: body.access_token, id_token: body.id_token, refresh_token: body.refresh_token });
      cy.c_createEncodedTokenCookie(token_cookie).then((encodedToken) => {
        cy.setCookie('token-storage', encodedToken);
      });
      cy.visit(Cypress.env('FRONT_OFFICE_ACCOUNT_URL') + '/hijack/cardhouse');
    })
  })
})
