/* eslint-disable cypress/unsafe-to-chain-command */
import frontOfficeLocators from "../../../element-locators/front-office-locators";
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

let avatar_profile;
let randomString;
let current_club;

When('I click on Go to Help Portal link in Account Settings - Help page', () => {
  cy.get(frontOfficeLocators.account_settings_page.go_to_help_portal_link).invoke('removeAttr', 'target').click();
});

When('I select an avatar from the Avatar Selection section', () => {
  cy.get(frontOfficeLocators.navigation_bar.avatar_button).invoke('attr', 'src').then((srcValue) => {
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
      cy.get(frontOfficeLocators.common.message_modal, { timeout: 20000 }).find('div#ModalBody').should('be.visible').contains('Updated');
      cy.get(frontOfficeLocators.common.message_modal).should('be.visible').contains('×').click();
    });
  });
});

When('I set the following Account Details fields to {string}', (value, dataTable) => {
  dataTable.rawTable.forEach((row) => {
    const fieldName = row[0].trim();
    const editButton = frontOfficeLocators.account_settings_page[`${fieldName.toLowerCase().replace(/ /g, "_")}_edit`];
    const inputTextbox = frontOfficeLocators.account_settings_page[`${fieldName.toLowerCase().replace(/ /g, "_")}_textbox`];
    cy.get(editButton).should('be.visible').click();

    if (value.toLowerCase() == "empty") {
      cy.get(inputTextbox).clear();
    } else if (value.toLowerCase() == "invalid") {
      cy.get(inputTextbox).clear().type('!@#$%^');
    } else {
      throw new Error('Invalid value name provided: ' + value);
    }
  });
});

When('I click on {string} button for {string} field', (button, field) => {
  let fieldValue = field.toLowerCase().replace(/ /g, "");
  let type;
  if (button == "Save") {
    type = "submit";
  } else if (button == "Cancel") {
    type = "cancel";
  } else {
    throw new Error('Invalid button name provided: ' + button);
  }
  const buttonLocator = `button[onclick="${type}change('${fieldValue}')"]`;
  cy.get(buttonLocator).should('be.visible').click();
});

When('I set a new Club in the Cardhouse Selection page', () => {
  cy.get(frontOfficeLocators.club_selection_page.club_list).eq(current_club).click();
});

When('I click on Change Club link in Account Profile page', () => {
  cy.get('div.form-groupbox').eq(6).invoke('text').then((text) => {
    let club_index = 0;
    if (text.includes('Austin')) {
      club_index = 1;
    }
    cy.get(frontOfficeLocators.account_settings_page.club_change_link).should('be.visible').click();
    current_club = club_index;
  });
});

When('New Club is displayed in the Club Selection field in Account Profile page', () => {
  cy.get('div.form-groupbox').eq(6).invoke('text').then((text) => {
    if (current_club == 1) {
      expect(text).to.include("Dallas");
    } else {
      expect(text).to.include("Austin");
    }
  });
});

Then('HiJack Help Portal is displayed with url {string}', (url) => {
  cy.origin("https://hijack.freshdesk.com/support/solutions", { args: { url } }, ({ url }) => {
    cy.url().should('include', url);
  });
});

Then('New Avatar is displayed in Account Profile', () => {
  cy.get(frontOfficeLocators.navigation_bar.avatar_button).invoke('attr', 'src').then((srcValue) => {
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