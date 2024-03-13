import ledgerPageLocator from "../../../element-locators/clubs-locators";
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("I click {string} button in the Ledger", (buttonValue) => {
  cy.get(ledgerPageLocator.club_management_page.constant_button).contains(buttonValue).click();
});

When("I click outside the modal", () => {
  cy.get(ledgerPageLocator.cash_adjustment.outside_header).click();
});

When("I select {string} in the Transaction type", (optionValue) => {
  cy.get(ledgerPageLocator.cash_adjustment.transaction_type_txtbox).click();
  switch (optionValue.toLowerCase()) {
  case 'withdraw':
    cy.get(ledgerPageLocator.cash_adjustment.withdraw_list_option).click();
    break;
  case 'deposit':
    cy.get(ledgerPageLocator.cash_adjustment.deposit_list_option).click();
    break;
  default:
    throw new Error('Invalid values provided: ' + optionValue);      
  }
});

When("I input {string} in the Transaction amount", (amountValue) => {
  cy.get(ledgerPageLocator.cash_adjustment.transaction_amount_txtbox).type(amountValue);
});

Then("The new transaction should be displayed in the table", () => {

});

Then("The {string} popup message should be displayed", (popUpValue) => {
  switch (popUpValue.toLowerCase()) {
  case 'successful':
    cy.get(ledgerPageLocator.cash_adjustment.alert_popup).should('contain.text', 'Transaction successful!');
    break;
  default:
    throw new Error('Invalid values provided: ' + popUpValue);
  }
});

Then("The Cash Adjustment modal should not displayed", () => {
  cy.get(ledgerPageLocator.cash_adjustment.modal_box).should('not.be.visible');
});

Then("The Cash Adjustment modal should be displayed", () => {
  cy.get(ledgerPageLocator.cash_adjustment.modal_box).should('be.visible');
});


Then("The error message {string} should be displayed in the modal", (errorMsg) => {
  cy.get(ledgerPageLocator.cash_adjustment.error_messages_modal).contains(errorMsg).should('be.visible');
});
