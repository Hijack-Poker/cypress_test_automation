import LoginPage from "../../../page-objects/front-office/LoginPage";
import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I navigate to {string} Page', function (page) {
  cy.navigateToPage(page);
});

Then('I click on {string} button in Hijack Login Page', (button) => {
  if (button == 'Login with Email') {
    LoginPage.clickLoginWithEmail();
  }
});