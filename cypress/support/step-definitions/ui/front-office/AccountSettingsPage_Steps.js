import frontOfficeLocators from "../../../element-locators/front-office-locators";
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

let avatar_profile;

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

Then('Avatar Updated modal is displayed with message {string}', (text)=> {
  cy.get(frontOfficeLocators.account_settings_page.avatar_updated_modal).find('#ModalBody').should('be.visible').and('contain',text);
  cy.get(frontOfficeLocators.account_settings_page.avatar_updated_modal).contains('Close').click();
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