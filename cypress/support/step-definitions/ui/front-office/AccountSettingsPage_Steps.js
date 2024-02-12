/* eslint-disable cypress/unsafe-to-chain-command */
import frontOfficeLocators from "../../../element-locators/front-office-locators";
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

let avatar_profile;
let randomString;

When('I click on Go to Help Portal link in Account Settings - Help page', () => {
  cy.get(frontOfficeLocators.account_settings_page.go_to_help_portal_link).invoke('removeAttr','target').click();
});

When('I select an avatar from the Avatar Selection section', () => {
  cy.get(frontOfficeLocators.navigation_bar.avatar_button).invoke('attr','src').then((srcValue) => {
    let index = 1;
    let avatar_image = 'bank';
    if (srcValue.includes('bank')) {
      index = 0;
      avatar_image = 'saloon';
    }
    cy.get(frontOfficeLocators.account_settings_page.avatar_images).eq(index).click();
    avatar_profile = avatar_image;
  });
});

When('I edit the Account Details fields with these values', (dataTable) => {
  cy.c_generateRandomString(5).then((generatedRandomString) => {
    randomString = generatedRandomString;
    dataTable.hashes().forEach((row) => {
      const fieldName = row['Field'];
      const fieldValue = row['Value'] + " " + randomString;
      const editButton = frontOfficeLocators.account_settings_page[`${fieldName.toLowerCase().replace(/ /g, "_")}_edit`];
      const inputTextbox = frontOfficeLocators.account_settings_page[`${fieldName.toLowerCase().replace(/ /g, "_")}_textbox`];
      const saveButton = `button[onclick="submitchange('${fieldName.toLowerCase().replace(/ /g, "")}')"]`;

      cy.get(editButton).should('be.visible').click();
      cy.get(inputTextbox).clear().type(fieldValue);
      cy.get(saveButton).should('be.visible').click();
      cy.get(frontOfficeLocators.account_settings_page.message_modal).find('#ModalBody').should('be.visible');
      cy.get(frontOfficeLocators.account_settings_page.message_modal).contains('Close').click();
    });
  });
});

Then('HiJack Help Portal is displayed with url {string}', (url)=> {
  cy.origin("https://hijack.freshdesk.com/support/solutions", { args: {url}} ,({url}) => {
    cy.url().should('include', url);
  });
});

Then('New Avatar is displayed in my Account Profile', ()=> {
  cy.get(frontOfficeLocators.navigation_bar.avatar_button).invoke('attr','src').then((srcValue) => {
    expect(srcValue).includes(avatar_profile);
  });
});

Then('The Account Details fields is displayed with these values', (dataTable) => {
  dataTable.rawTable.forEach((row) => {
    const displayedValue = row[0].trim();
    const fieldValue = `input[value="${displayedValue} ${randomString}"]`;
    
    cy.get(fieldValue).should('be.visible');
  });
});