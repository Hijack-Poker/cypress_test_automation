// Load fixtures data
before(() => {
  cy.fixture('user-details.json').then(function (data) {
    this.userDetails = data;
  });
  cy.fixture('club-details.json').then(function (data) {
    this.clubDetails = data;
  });
});