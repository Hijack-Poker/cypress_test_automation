

const projectId = Cypress.env('descope_project_id')
const managementKey = Cypress.env('descope_management_key')

// Define the authorization header
const authHeader = {
  'Authorization': `Bearer ${projectId}:${managementKey}`,
}

// Define the test user details
const testUser = {
  loginId: "amansueto+testuserregister@oppy.tech",
  email: "amansueto+testuserregister@oppy.tech",
  phone: "+13239991158",
  verifiedEmail: true,
  verifiedPhone: true,
  test: true,
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
    case 'club management':
      cy.visit(Cypress.env('CLUBS_MANAGEMENT_URL') + '/management/users');
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
    case 'front office cardhouse selection':
      cy.url().should('include', '/hijack/cardhouseselection');
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

Cypress.Commands.add('c_createEncodedTokenCookie', (stringToken) => {
  let cleanedString = stringToken.replace(/ /g, '%20').replace(/"/g, '%22').replace(/,/g, '%2C');
  return cleanedString;
});

Cypress.Commands.add('c_executeFunction', (func, ...args) => {
  // Execute the provided function with arguments within Cypress environment
  return cy.then(() => func(...args));
});

/**
 * DESCOPE APP
 */
Cypress.Commands.add('c_clickElementInDescope', (element) => {
  cy.origin("https://auth.descope.io", { args: { element } }, ({ element }) => {
    Cypress.on('uncaught:exception', (err) => {
      if (err.name.includes('NotAllowedError') || err.name.includes('Error')) {
        return false;
      }
    });
    cy.get(element).click();
  });
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
        // Return the id_token  
        return cy.wrap(body.id_token);
      });
    })
  })
})

Cypress.Commands.add('c_createTestUser', () => {
  cy.request({
    method: 'POST',
    url: 'https://api.descope.com/v1/mgmt/user/create',
    headers: authHeader,
    body: testUser,
  }).then((response) => {
     if (response.status === 200) {
        cy.log("User successfully created.")
      } else {
        throw new Error("Failed to create user");
      }
  });
});

Cypress.Commands.add('c_generateTestUserOTP', (loginId, deliveryMethod) => {
  cy.request({
    method: 'POST',
    url: 'https://api.descope.com/v1/mgmt/tests/generate/otp',
    headers: authHeader,
    body: {
        "loginId": loginId,
        "deliveryMethod": deliveryMethod.toLowerCase()
    }
  }).then((response) => {
      if (response.status === 200) {
        const otpCode = response.body.code;
        return otpCode;
      } else {
        throw new Error(`Failed to generate OTP. Status code: ${response.status}`);
      }
  });
});

Cypress.Commands.add('c_enterOTPCode', (arrOTP, locator) => {
  cy.origin("https://auth.descope.io", { args: {arrOTP, locator} }, ( {arrOTP, locator} ) => {
    cy.get(locator).find('vaadin-text-field').each(($el, index) => {
      if (index+1 < arrOTP.length) {
        cy.get(`vaadin-text-field[data-id="${index+1}"]`).find('input').type(arrOTP[index+1], {force: true});
      }
    });
    cy.get(`vaadin-text-field[data-id="0"]`).find('input').type(arrOTP[0], {force: true});
  });
});

Cypress.Commands.add('c_updateCustomAttribute', (loginId, attributeKey, attributeValue) => {
  cy.request({
    method: 'POST',
    url: 'https://api.descope.com/v1/mgmt/user/update/customAttribute',
    // headers: authHeader,
    body: {
      loginId: loginId,
      attributeKey: attributeKey,
      attributeValue: attributeValue
    },
  }).then((response) => {
    if (response.status === 200) {
       cy.log("Custom Attribute successfully updated.")
     } else {
       throw new Error("Failed to update Custom Attribute");
     }
 });
});

/**
 * TABLE HANDLING
 */
Cypress.Commands.add('c_verifyValueExistInColumn', (tableSelector, columnSelector, expectedValue) => {
  let exist = false;
  cy.get(tableSelector).find('tr').each(($element, index, $list) => { //eslint-disable-line
    const getValue = $element.find(columnSelector).text();
    if(getValue.includes(expectedValue)) {
      exist = true;
    }
  }).then(() => {
    expect(exist).to.be.true;
  });
});

/**
 * GOOGLE LOGIN
 */
// 

Cypress.Commands.add("c_loginWithGoogleAPI", () => {
  cy.visit('https://clubs.hijackpoker-staging.online');
  // Call Google API to get authentication data
  cy.request({
    method: 'POST',
    url: 'https://www.googleapis.com/oauth2/v4/token',
    headers: authHeader,
    body: {
      grant_type: 'refresh_token',
      client_id: Cypress.env('googleClientId'),
      client_secret: Cypress.env('googleClientSecret'),
      refresh_token: Cypress.env('googleRefreshToken'),
    }  
  }).then(({ body }) => {
    const id_token = body.id_token;
    cy.log('header:', authHeader); 
    // Store authentication data in localStorage
    // localStorage.setItem('auth', id_token);
    window.localStorage.setItem('auth', JSON.stringify(id_token));
    cy.log('1st:', JSON.stringify(id_token));
    // Call your other API endpoints to get data
    cy.request({
      method: 'GET',
      url: 'https://backoffice.hijackpoker-staging.online/api/clubs/get-all-clubs-data?dealerId=1',
    }).then(({ body }) => {
      const clubsData = JSON.parse(body);

      // Store clubs data in localStorage
      // localStorage.setItem('clubs', JSON.stringify(clubsData));
      window.localStorage.setItem('clubs', JSON.stringify(clubsData.data));
      cy.log('2nd:', JSON.stringify(clubsData.data));
      cy.request({
        method: 'GET',
        url: 'https://backoffice.hijackpoker-staging.online/api/club-members/search?email=alana@oppy.tech',
        failOnStatusCode: false,
      }).then(({ body }) => {
        const otherData = JSON.parse(body);
        const club = clubsData.data[0];
        // Store otherData in localStorage
        window.localStorage.setItem('club', JSON.stringify(club));
        cy.log('3rd:', JSON.stringify(club));
        // Visit the homepage
        // cy.intercept('GET', 'https://clubs.hijackpoker-staging.online/management').as('managementRequest');
  
        cy.reload();
        // cy.visit('https://clubs.hijackpoker-staging.online/login'), {
        //   headers: {
        //     "Accept": "application/json, text/plain, */*",
        //     "User-Agent": "axios/0.18.0"
        //   },
        //   failOnStatusCode: false
        // }
      });
    });
    
    // cy.visit('https://clubs.hijackpoker-staging.online/management');
    // cy.wait('@managementRequest');
    
  });
});


