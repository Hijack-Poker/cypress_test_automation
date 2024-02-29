import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

function postCashierDepositAPI(clubId, amountUsd) {
  const headers = {
    'Authorization': 'Bearer' + this.loginIdToken,
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const formData = {
    amount_usd: amountUsd,
    club: clubId,
    token: this.loginIdToken,
  };
  const urlEncodedData = new URLSearchParams(formData).toString();
  cy.request({
    method: 'POST',
    url: Cypress.env('FRONT_OFFICE_ACCOUNT_URL') + '/api/cashier/deposit/club',
    headers: headers,
    body: urlEncodedData,
    failOnStatusCode: false
  }).then((response) => {
    const responseBody = response.body;
    const statusCode = response.status;
    return cy.wrap({ responseBody, statusCode });
  });
}

When('I use API to post cashier deposit in club {string} with amount {string} USD', function (clubName, amountUsd) {
  const { austin, dallas, rio, spring, houston, colinas } = this.clubDetails;
  let clubId;
  switch (clubName.toLowerCase()) {
  case 'austin':
    clubId = austin.locationId;
    break;
  case 'dallas':
    clubId = dallas.locationId;
    break;
  case 'rio':
    clubId = rio.locationId;
    break;
  case 'spring':
    clubId = spring.locationId;
    break;
  case 'houston':
    clubId = houston.locationId;
    break;
  case 'colinas':
    clubId = colinas.locationId;
    break;
  default:
    clubId = clubName;
  }
  cy.c_executeFunction(postCashierDepositAPI, clubId, amountUsd).as('postCashierDepositAPI');
  cy.get('@postCashierDepositAPI').then(({ responseBody }) => {
    if (responseBody.length < 5) {
      this.transactionCode = responseBody;
    }
  });
});

Then('Response Status Code should be {int}', function (expectedStatusCode) {
  cy.get('@postCashierDepositAPI').then(({ statusCode }) => {
    expect(statusCode).to.equal(expectedStatusCode);
  });
});

Then('Response Body should contain {string}', function (expectedResponse) {
  cy.get('@postCashierDepositAPI').then(({ responseBody }) => {
    expect(responseBody).to.contain(expectedResponse);
  });
});