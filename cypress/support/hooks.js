// Load fixtures data
before(() => {
  cy.fixture('user-details.json').then(function (data) {
    this.userDetails = data;
  });
});