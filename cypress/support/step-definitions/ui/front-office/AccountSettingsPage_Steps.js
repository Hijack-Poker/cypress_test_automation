/* eslint-disable cypress/unsafe-to-chain-command */
import frontOfficeLocators from "../../../element-locators/front-office-locators";
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

let avatar_profile;
let randomString;
let current_club;
let current_phone;

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
      cy.get(inputTextbox).should('be.visible').clear().type(fieldValue);
      cy.get(saveButton).should('be.visible').click();

      cy.waitForStableDOM({ pollInterval: 1000, timeout: 10000 }); // waits for a stable DOM after page refresh
      cy.get(frontOfficeLocators.common.message_modal).find('div#ModalBody').should('be.visible').contains('Updated');
      cy.get(frontOfficeLocators.common.message_modal).contains('×').click();
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

When('I click on Change Phone in Account Profile page', () => {
  cy.get('div.form-groupbox').find('.col-10').invoke('text').then((text) => {
    current_phone = text;
    cy.get(frontOfficeLocators.account_settings_page.change_phone_button).click();
  });
});

When('I enter phone number in Verify Your Phone modal', function () {
  cy.get(frontOfficeLocators.common.verify_your_phone_modal).find('input').eq(0).should('be.visible').type(current_phone);
  cy.get(frontOfficeLocators.common.send_text_button).click({force: true});
});

When('I edit the Account Details Display Name with {string}', (displayName) => {
  const { display_name_edit, display_name_textbox, save_display_button } = frontOfficeLocators.account_settings_page;
  cy.c_generateRandomString(4).then((generatedRandomString) => {
    randomString = generatedRandomString;
    cy.get(display_name_edit).should('be.visible').click();
    cy.get(display_name_textbox).should('be.visible').clear().type(displayName + randomString);
    cy.get(save_display_button).should('be.visible').click();

    cy.waitForStableDOM({ pollInterval: 1000, timeout: 10000 }); // waits for a stable DOM after page refresh
    cy.get(frontOfficeLocators.common.message_modal).find('div#ModalBody').invoke('text').then((text) => {
      if (text.includes('Display Name Updated')) {
        cy.get(frontOfficeLocators.common.message_modal).contains('×').click();
      }
    });
  });
});

Then('{string} label is displayed in Verify Your Phone modal', (label) => {
  cy.get(frontOfficeLocators.common.verify_your_phone_modal).contains(label).should('be.visible');
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