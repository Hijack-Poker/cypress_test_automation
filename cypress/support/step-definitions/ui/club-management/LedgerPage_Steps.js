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

When("I click the Employee selection bar", () => {
  cy.get(ledgerPageLocator.employee_clock_in.employee_select_bar).click();
});

When("I select {string} in the employee selection", (nameValue) => {
  cy.get(ledgerPageLocator.employee_clock_in.employee_name_list).contains(nameValue).click();
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

Then("The Employee Clock In modal should not displayed", () => {
  cy.get(ledgerPageLocator.cash_adjustment.modal_box).should('not.be.visible');
});

Then("The list of employees should be displayed", () => {
  cy.get(ledgerPageLocator.employee_clock_in.employee_list).should('be.visible');
});

Then("The list of employees should not be displayed", () => {
  cy.get(ledgerPageLocator.employee_clock_in.employee_list).should('not.be.visible');
});

Then("The Employee textbox should be displayed in the modal", () => {
  cy.get(ledgerPageLocator.employee_clock_in.employee_name_label).should('be.visible');
});

Then("The transaction amount should be displayed in the modal", () => {
  cy.get(ledgerPageLocator.cash_adjustment.cash_on_hand_txtbox).should('be.visible');
});

Then("The total cash float should be displayed in the modal", () => {
  cy.get(ledgerPageLocator.employee_clock_in.employee_total_cash_float).should('be.visible');
});

Then("The Total Cash Float should be green", () => {
  cy.get(ledgerPageLocator.employee_clock_in.employee_total_cash_float).should('have.css', 'color', 'rgb(69, 190, 38)');
});

Then("The Total Cash Float should be red", () => {
  cy.get(ledgerPageLocator.employee_clock_in.employee_total_cash_float).should('have.css', 'color', 'red');
});

Then("The amount {string} should be displayed in the Transaction amount", (amountValue) => {
  cy.get(ledgerPageLocator.cash_adjustment.cash_on_hand_txtbox).contains(amountValue).should('be.visible');
});

Then("The employee {string} should be displayed in Employee textbox", (employeeValue) => {
  cy.get(ledgerPageLocator.employee_clock_in.employee_select_bar).contains(employeeValue).should('be.visible');
});