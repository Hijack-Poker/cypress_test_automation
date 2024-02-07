import frontOfficeLocators from "../../element-locators/front-office-locators";
import clubsLocators from "../../element-locators/clubs-locators";
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I navigate to {string} page', (page) => {
  cy.c_navigateToPage(page);
});

Then('{string} page should be displayed', (page) => {
  cy.c_verifyPageDisplayed(page);
});

//Example: I click on "Login button" in "Login Page" of "Front Office"
When('I click on {string} in {string} of {string}', (elementName, page, domain) => {
  let locatorFile;
  switch (domain) {
  case 'Front Office':
    locatorFile = frontOfficeLocators;
    break;
  case 'clubs':
    locatorFile = clubsLocators;
    break;
  default:
    throw new Error('Invalid domain provided: ' + domain);
  }
  cy.c_getLocatorByNamePage(locatorFile,elementName,page).then((elementLocator) => {
    cy.get(elementLocator).should('be.visible').click();
  });
});