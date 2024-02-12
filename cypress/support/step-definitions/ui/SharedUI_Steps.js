import frontOfficeLocators from "../../element-locators/front-office-locators";
import clubsLocators from "../../element-locators/clubs-locators";
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const getLocatorFile = (domain) => {
  switch (domain) {
  case 'Front Office':
    return frontOfficeLocators;
  case 'Clubs':
    return clubsLocators;
  default:
    throw new Error('Invalid domain provided: ' + domain);
  }
};

Given('I navigate to {string} page', (page) => {
  cy.c_navigateToPage(page);
});

Then('{string} page should be displayed', (page) => {
  cy.c_verifyPageDisplayed(page);
});

//Example: I click on "Login button" in "Login Page" of "Front Office"
When('I click on {string} in {string} of {string}', (elementName, page, domain) => {
  const locatorFile = getLocatorFile(domain);
  cy.c_getLocatorByNamePage(locatorFile, page, elementName).then((elementLocator) => {
    cy.get(elementLocator).should('be.visible').click();
  });
});

//Example: The "Avatar Update modal" of "Front Office" is displayed with message "Update Success!"
Then('The {string} of {string} is displayed with message {string}', (elementName, domain, messageValue) => {
  const locatorFile = getLocatorFile(domain);
  cy.c_getLocatorByNamePage(locatorFile, "common", elementName).then((elementLocator) => {
    cy.get(elementLocator).should('be.visible').and('contain',messageValue);
    cy.get(elementLocator).contains('×').click();
  });
});