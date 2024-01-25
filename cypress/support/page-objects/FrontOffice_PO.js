/// <reference types="cypress" />
import "cypress-shadow-dom";

class FrontOffice_PO {
  navigate() {
    cy.fixture("config.json").then((data) => {
      cy.visit(data.frontOfficeUrl);
    });
  }

  clickLoginDetails() {
    cy.origin("https://auth.descope.io", () => {
      /// Click Login Email button
      cy.get('descope-wc[project-id="P2TjFGLikGRSHKrrxgAHf2o3cM7w"]')
        .shadow()
        .find("#bsRZVUo8ym")
        .shadow()
        .find("#bsRZVUo8ym")
        .shadow()
        .find(".vaadin-button-container")
        .click();
    });
    cy.origin("https://accounts.google.com", () => {
      /// Input email address
      cy.get("#identifierId").type("alana@oppy.tech{enter}");

      /// Input password
      cy.get("[jscontroller='bzud8b'] [jsname='YPqjbf']").type("Tw1tt3rC@rb0n{enter}");
    });
  }

  clickProfile() {
    cy.get("#a#navbarDropdownUserImage > img").should("exist").click();
  }

  clickLogoutBtn() {
    cy.get(
      ".animated--fade-in-up.border-0.dropdown-menu.dropdown-menu-right.shadow.show > a:nth-of-type(2)"
    ).click();
  }

  reEnterUrl() {
    cy.wait(3000);
    cy.fixture("config.json").then((data) => {
      cy.visit(data.hiJackHomePageUrl);
    });
  }

  verifyTheWelcomeMessage() {
    cy.wait(3000);
    cy.origin("https://auth.descope.io", () => {
      cy.get('descope-wc[project-id="P2TjFGLikGRSHKrrxgAHf2o3cM7w"]')
        .shadow()
        .find("#tIhFQOC4fm")
        .should("exist");
    });
  }

  verifyIconIsDisplayed() {
    cy.get(".logo").should("be.visible");
  }

  clickLoginEmailButton() {
    cy.wait(3000);
    cy.origin("https://auth.descope.io", () => {
      cy.get('descope-wc[project-id="P2TjFGLikGRSHKrrxgAHf2o3cM7w"]')
        .shadow()
        .find("#KAG9NgACSP")
        .shadow()
        .find("#KAG9NgACSP")
        .click();
    });
  }

  inputEmailAddress() {
    cy.origin("https://auth.descope.io", () => {
      cy.get('descope-wc[project-id="P2TjFGLikGRSHKrrxgAHf2o3cM7w"]')
        .shadow()
        .find("#GIhmN0AQ39")
        .shadow()
        .find("#input-vaadin-email-field-3")
        .type("jpanares+2@oppy.tech");
    });
  }

  clickForgetPasswordBtn() {
    cy.origin("https://auth.descope.io", () => {
      cy.get('descope-wc[project-id="P2TjFGLikGRSHKrrxgAHf2o3cM7w"]')
        .shadow()
        .find("#vGbww3RITJ")
        .shadow()
        .find("#vGbww3RITJ")
        .shadow()
        .find(".vaadin-button-container")
        .click();
    });
  }

  inputInvalidEmailAddress() {
    cy.origin("https://auth.descope.io", () => {
      cy.get('descope-wc[project-id="P2TjFGLikGRSHKrrxgAHf2o3cM7w"]')
        .shadow()
        .find("#GIhmN0AQ39")
        .shadow()
        .find("#input-vaadin-email-field-3")
        .type("invalid@email.com");
    });
  }

  inputInvalidPassword() {
    cy.origin("https://auth.descope.io", () => {
      cy.get('descope-wc[project-id="P2TjFGLikGRSHKrrxgAHf2o3cM7w"]')
        .shadow()
        .find("#b2gUaVb8UG")
        .shadow()
        .find("#input-vaadin-password-field-7")
        .should("exist")
        .type("invalidPassw0rd");
    });
  }

  verifyResetModalIsDisplayed() {
    cy.origin("https://auth.descope.io", () => {
      cy.get('descope-wc[project-id="P2TjFGLikGRSHKrrxgAHf2o3cM7w"]')
        .shadow()
        .find("#ROOT")
        .should("be.visible");
    });
  }

  verifyInvalidCredentialsMessageDisplayed() {
    cy.origin("https://auth.descope.io", () => {
      const cssSelectorForHost1 =
        'descope-wc[project-id="P2TjFGLikGRSHKrrxgAHf2o3cM7w"]';
      cy.get(cssSelectorForHost1)
        .shadow()
        .find(
          "div:nth-child(2) > descope-container:nth-child(1) > descope-text:nth-child(7)"
        )
        .should("exist");
    });
  }

  clickLoginBtn() {
    cy.origin("https://auth.descope.io", () => {
      cy.get('descope-wc[project-id="P2TjFGLikGRSHKrrxgAHf2o3cM7w"]')
        .shadow()
        .find("#VaCr2LiM1K")
        .shadow()
        .find("#VaCr2LiM1K")
        .click();
    });
  }

  clickAccountBtn() {
    cy.get("[aria-labelledby] .dropdown-item:nth-child(3)").click();
  }

  clickNameTxtField(fieldValue) {
    if (fieldValue.includes("Display Name")) {
      cy.get("a#editdisplayname").click();
    } else if (fieldValue.includes("First Name")) {
      cy.get("a#editfirstname").click();
    } else if (fieldValue.includes("Last Name")) {
      cy.get("a#editlastname").click();
    } else {
      //blank for now
    }
  }

  clearNameTxtField(fieldValue) {
    if (fieldValue.includes("Display Name")) {
      cy.get("input#displayname").clear();
    } else if (fieldValue.includes("First Name")) {
      cy.get("input#firstname").clear();
    } else if (fieldValue.includes("Last Name")) {
      cy.get("input#lastname").clear();
    } else {
      //blank for now
    }
  }

  clickSaveButton(fieldValue) {
    if (fieldValue.includes("Display Name")) {
      cy.get("button#submitdisplayname").click();
    } else if (fieldValue.includes("First Name")) {
      cy.get("button#submitfirstname").click();
    } else if (fieldValue.includes("Last Name")) {
      cy.get("button#submitlastname").click();
    } else {
      //blank for now
    }
  }

  verifyErrorMsg(messageValue) {
    cy.get("#errorMessageText")
      .should("be.visible")
      .invoke("text")
      .should("include", messageValue);
  }

  editNameField(fieldValue, textValue) {
    if (fieldValue.includes("Display Name")) {
      cy.get("input#displayname").clear();
      cy.get("input#displayname").type(textValue);
    } else if (fieldValue.includes("First Name")) {
      cy.get("input#firstname").clear();
      cy.get("input#firstname").type(textValue);
    } else if (fieldValue.includes("Last Name")) {
      cy.get("input#lastname").clear();
      cy.get("input#lastname").type(textValue);
    } else {
      //blank for now
    }
  }
}
export default FrontOffice_PO;
