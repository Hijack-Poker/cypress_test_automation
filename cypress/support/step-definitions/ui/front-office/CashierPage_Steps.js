import cashierPageLocators from "../../../element-locators/front-office-locators";
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";



When('I click {string} in the Cashier Menu', (menuValue) => {
  switch (menuValue) {
  case 'Club Deposit':
    cy.get(cashierPageLocators.cashier_menu.club_deposit_button).click();
    break;
  case 'Club Withdraw':
    cy.get(cashierPageLocators.cashier_menu.club_withdraw_button).click();
    break;
  case 'Crypto Deposit':
    cy.get(cashierPageLocators.cashier_menu.crypto_deposit_button).click();
    break;
  case 'Crypto Withdraw':
    cy.get(cashierPageLocators.cashier_menu.crypto_withdraw_button).click();
    break;
  case 'Transfer': 
    cy.get(cashierPageLocators.cashier_menu.transfer_button).click();
    break;
  case 'History':
    cy.get(cashierPageLocators.cashier_menu.history_button).click();
    break;
  default:
    throw new Error('Invalid input provided: ' + menuValue);            
  }
});

When('I input {string} amount in {string}', (amountValue, element) => {
  switch (element) {
  case 'Deposit Amount':
    cy.get(cashierPageLocators.cashier_page.deposit_amount_txtbox).type(amountValue);
    break;
  case 'Withdraw Amount':
    cy.get(cashierPageLocators.cashier_page.withdraw_amount_txtbox).type(amountValue);
    break;
  default:
    throw new Error('Invalid input provided: ' + element);   
  } 
});

When('I select {string} in the {string} location', (clubValue, element) => {
  switch (element) {
  case 'Club Deposit':
    cy.get(cashierPageLocators.cashier_page.club_location_selector).select(clubValue);
    break;
  case 'Club Withdraw':
    cy.get(cashierPageLocators.cashier_page.club_location_withdraw_selector).select(clubValue);
    break;
  default:
    throw new Error('Invalid input provided: ' + element);      
  }
});

When('I input {string} in code textbox', (codeValue) => {
  cy.get(cashierPageLocators.cashier_page.enter_code_txtbox).type(codeValue);
});

When('I click {string} button in Cashier', (buttonValue) => {
  switch (buttonValue) {
  case 'Process Deposit':
    cy.get(cashierPageLocators.cashier_page.process_deposit_button).click();
    break;
  case 'Process Withdraw':
    cy.get(cashierPageLocators.cashier_page.process_withdraw_button).click();
    break;
  case 'Find User':
    cy.get(cashierPageLocators.cashier_page.find_user_button).click();
    break;
  case 'Refresh History':
    cy.get(cashierPageLocators.cashier_page.refresh_history_button).click();
    break; 
  case 'Received code SMS button':
    cy.get(cashierPageLocators.cashier_page.received_code_sms_button).click();
    break; 
  case 'Verify button':
    cy.get(cashierPageLocators.cashier_page.verify_code_button).click();
    break;    
  default:
    throw new Error('Invalid button provided: ' + buttonValue);  
  }
});

Then('The verification modal is displayed in Cashier Page', () => {
  cy.get(cashierPageLocators.cashier_page.verification_modal).should('be.visible');
});

Then('The amount {string} should be displayed in {string}', (amountValue, element) => {
  switch (element) {
  case 'Deposit Amount':
    cy.get(cashierPageLocators.cashier_page.deposit_amount_txtbox).invoke('text').then(amountValue);
    break;
  case 'Withdraw Amount':
    cy.get(cashierPageLocators.cashier_page.withdraw_amount_txtbox).invoke('text').then(amountValue);
    break;  
  default:
    throw new Error('Invalid element provided: ' + element);  
  }  
});

Then('The {string} notification should be displayed in Cashier page', (element) => {
  switch (element) {
  case 'Withdraw':
    cy.get(cashierPageLocators.cashier_page.withdrawal_notif).should('exist');
    break;
  case 'Deposit':
    cy.get(cashierPageLocators.cashier_page.deposit_notif).should('exist');
    break;
  case 'Request error':
    cy.get(cashierPageLocators.cashier_page.notification_verication_msg).should('be.visible');
    break;  
  default:
    throw new Error('Invalid input provided:' + element);      
  }
});

Then('The {string} type should be displayed in History page', (typeValue) => {
  cy.get(cashierPageLocators.cashier_page.history_row_data, typeValue).should('be.visible'); 
});

Then('The transaction id should be displayed in History Page', () => {
  cy.get(cashierPageLocators.cashier_page.transaction_id_column).should('be.visible');
});