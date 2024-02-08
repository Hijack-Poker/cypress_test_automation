import frontOfficeLocators from "../../../element-locators/front-office-locators";
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

let avatar_profile;

When('I click on Go to Help Portal link in Account Settings - Help page', () => {
  cy.get(frontOfficeLocators.account_settings_page.go_to_help_portal_link).invoke('removeAttr','target').click();
});

When('I select an avatar from the Avatar Selection section', () => {
  cy.get(frontOfficeLocators.navigation_bar.avatar_button).invoke('attr','src').then((srcValue) => {
    let index = 0;
    let avatar_image = 'bank';
    if (srcValue.includes('saloon')) {
      index = 1;
      avatar_image = 'saloon';
    }
    cy.get(frontOfficeLocators.account_settings_page.avatar_images).eq(index).click();
    avatar_profile = avatar_image;
  });
  cy.get(frontOfficeLocators.account_settings_page.avatar_updated_modal).find('#ModalBody').should('be.visible').and('contain','Avatar Updated!');
  cy.get(frontOfficeLocators.account_settings_page.avatar_updated_modal).contains('Close').click();
});

Then('HiJack Help Portal is displayed with url {string}', (url)=> {
  cy.origin("https://hijack.freshdesk.com/support/solutions", { args: {url}} ,({url}) => {
    cy.url().should('include', url);
  });
});
