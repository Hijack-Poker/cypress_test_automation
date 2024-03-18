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

When("I input {string} in the Cash on Hand", (amountValue) => {
  cy.get(ledgerPageLocator.cash_adjustment.cash_on_hand_txtbox).type(amountValue);
});

Then("The new transaction should be displayed in the table", () => {
  cy.get(ledgerPageLocator.cash_adjustment.transaction_date_time_data).invoke('text').then((tableCellValue) => {
    const tableCellDate = new Date(tableCellValue.trim());
    const currentDateTime = new Date();
    expect(tableCellDate).to.eql(currentDateTime);
  });
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

Then("The header {string} should be displayed in the modal", (headerValue) => {
  cy.get(ledgerPageLocator.cash_adjustment.modal_header).contains(headerValue).should('be.visible');
});

Then("The {string} field in the modal should be displayed", (fieldValue) => {
  switch (fieldValue.toLowerCase()) {
  case 'transaction type':
    cy.get(ledgerPageLocator.cash_adjustment.transaction_type_txtbox).should('be.visible');
    break;
  case 'transaction amount':
    cy.get(ledgerPageLocator.cash_adjustment.transaction_amount_txtbox).should('be.visible');
    break;   
  case 'reference number':
    cy.get(ledgerPageLocator.cash_adjustment.reference_code_number).should('be.visible');
    break;
  case 'transaction description':
    cy.get(ledgerPageLocator.cash_adjustment.transaction_description).should('be.visible');
    break;       
  }
});

Then("The text {string} should be displayed on modal", (textValue) => {
  cy.get(ledgerPageLocator.cash_adjustment.modal_text).contains(textValue).should('be.visible');
});

Then("The {string} button in the modal should be displayed", (buttonValue) => {
  cy.get(ledgerPageLocator.club_management_page.constant_button).contains(buttonValue).should('be.visible');
});

Then("The {string} textbox should be displayed in modal", (textValue) => {
  cy.get(ledgerPageLocator.cash_adjustment.modal_title_txt).contains(textValue).should('be.visible');
});

Then("The End of Closing modal should not displayed", () => {
  cy.get(ledgerPageLocator.cash_adjustment.modal_box).should('not.be.visible');
});