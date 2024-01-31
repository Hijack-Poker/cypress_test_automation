/// <reference types="cypress" />
import "cypress-shadow-dom";

beforeEach(() => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
});

function logIntoGoogle(username, password) {
  Cypress.on(
    "uncaught:exception",
    (err) =>
      !err.message.includes("ResizeObserver loop") &&
      !err.message.includes("Error in protected function")
  );
  cy.visit("https://account.hijackpoker-staging.online");

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

  cy.origin(
    "https://accounts.google.com",
    {
      args: {
        username,
        password,
      },
    },
    ({ username, password }) => {
      Cypress.on(
        "uncaught:exception",
        (err) =>
          !err.message.includes("ResizeObserver loop") &&
          !err.message.includes("Error in protected function")
      );

      cy.get('input[type="email"]').type(username, {
        log: false,
      });
      // NOTE: The element exists on the original form but is hidden and gets rerendered, which leads to intermittent detached DOM issues
      cy.contains("Next").click().wait(4000);
      cy.get('[type="password"]').type(password, {
        log: false,
      });
      cy.contains("Next").click().wait(4000);
    }
  );
}

function loginByGoogleApi() {
  cy.log("Logging in to Google");
  cy.request({
    method: "POST",
    url: "https://www.googleapis.com/oauth2/v4/token",
    body: {
      grant_type: "refresh_token",
      client_id: Cypress.env("googleClientId"),
      client_secret: Cypress.env("googleClientSecret"),
      refresh_token: Cypress.env("googleRefreshToken"),
    },
  }).then(({ body }) => {
    const { access_token, id_token } = body;

    cy.request({
      method: "GET",
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
      headers: { Authorization: `Bearer ${access_token}` },
    }).then(({ body }) => {
      cy.log(body);
      const userItem = {
        token: id_token,
        user: {
          googleId: body.sub,
          email: body.email,
          givenName: body.given_name,
          familyName: body.family_name,
        },
      };

      window.localStorage.setItem("googleCypress", JSON.stringify(userItem));
      cy.visit("https://account.hijackpoker-staging.online");
    });
  });
}

class FrontOffice_PO {
  navigate() {
    cy.fixture("config.json").then((data) => {
      cy.visit(data.frontOfficeUrl);
    });
  }

  clickLoginDetailsGoogle() {
    loginByGoogleApi();
  }

  clickLoginEmail() {
    cy.origin("https://auth.descope.io", () => {
      Cypress.on(
        "uncaught:exception",
        (err) => !err.message.includes("NotAllowedError")
      );
      /// Click Login Email button
      cy.get('descope-wc[project-id="P2TjFGLikGRSHKrrxgAHf2o3cM7w"]')
        .shadow()
        .find("#KAG9NgACSP")
        .shadow()
        .find("#KAG9NgACSP")
        .should("be.visible")
        .click();
      /// Fill-up email username
      cy.get('descope-wc[project-id="P2TjFGLikGRSHKrrxgAHf2o3cM7w"]')
        .shadow()
        .find("#GIhmN0AQ39")
        .shadow()
        .find("#input-vaadin-email-field-3")
        .type("jpanares+2@oppy.tech");
      /// Fill-up password
      cy.get('descope-wc[project-id="P2TjFGLikGRSHKrrxgAHf2o3cM7w"]')
        .shadow()
        .find("#b2gUaVb8UG")
        .shadow()
        .find("#input-vaadin-password-field-7")
        .should("be.visible")
        .type("Admin123");
      /// Click Login button
      cy.get('descope-wc[project-id="P2TjFGLikGRSHKrrxgAHf2o3cM7w"]')
        .shadow()
        .find("#VaCr2LiM1K")
        .shadow()
        .find("#VaCr2LiM1K")
        .should("be.visible")
        .click();
    });
  }

  clickProfile() {
    cy.wait(6000);
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

  verifySuccessMessage(displayValue) {
    cy.get("#ModalBody")
      .should("be.visible")
      .invoke("text")
      .should("include", displayValue);
  }

  clickRegisterButton() {
    cy.origin("https://auth.descope.io", () => {
      cy.get('descope-wc[project-id="P2TjFGLikGRSHKrrxgAHf2o3cM7w"]')
        .shadow()
        .find("#I1tsVIdiWU")
        .shadow()
        .find("#I1tsVIdiWU")
        .shadow()
        .find(".vaadin-button-container")
        .click();
    });
  }

  verifyYourEmailIsDisplayed() {
    cy.origin("https://auth.descope.io", () => {
      cy.get('descope-wc[project-id="P2TjFGLikGRSHKrrxgAHf2o3cM7w"]')
        .shadow()
        .find("#LmrSIGOWZb")
        .should("exist");
    });
  }

  inputRegisterEmail() {
    cy.origin("https://auth.descope.io", () => {
      cy.get('descope-wc[project-id="P2TjFGLikGRSHKrrxgAHf2o3cM7w"]')
        .shadow()
        .find("#IgW48WJK2h")
        .shadow()
        .find("#input-vaadin-email-field-3")
        .type("alana+017@opyy.tech");
    });
  }

  inputInvalidRegisterEmail() {
    cy.origin("https://auth.descope.io", () => {
      cy.get('descope-wc[project-id="P2TjFGLikGRSHKrrxgAHf2o3cM7w"]')
        .shadow()
        .find("#IgW48WJK2h")
        .shadow()
        .find("#input-vaadin-email-field-3")
        .type("lOremIpsuM");
    });
  }

  clickRegSubmitBtn() {
    cy.origin("https://auth.descope.io", () => {
      cy.get('descope-wc[project-id="P2TjFGLikGRSHKrrxgAHf2o3cM7w"]')
        .shadow()
        .find("#DQfnTvyxi6")
        .shadow()
        .find("#DQfnTvyxi6")
        .click();
    });
  }

  verifyRegisterCodeMsgDisplay() {
    cy.origin("https://auth.descope.io", () => {
      cy.get('descope-wc[project-id="P2TjFGLikGRSHKrrxgAHf2o3cM7w"]')
        .shadow()
        .find("#auED4dEJkJ")
        .should("exist");
    });
  }

  inputEmailVerificationCode() {
    cy.origin("https://auth.descope.io", () => {
      ///1st code digit
      cy.get('descope-wc[project-id="P2TjFGLikGRSHKrrxgAHf2o3cM7w"]')
        .shadow()
        .find("#L1T9iO4p5U")
        .shadow()
        .find(
          'descope-text-field[type="tel"][class="descope-input-wrapper descope-text-field"][data-id="0"]'
        )
        .shadow()
        .find("#input-vaadin-text-field-35")
        .click()
        .type("1");

      ///2nd code digit
      cy.get("descope-wc[project-id='P2TjFGLikGRSHKrrxgAHf2o3cM7w']")
        .shadow()
        .find("#L1T9iO4p5U")
        .shadow()
        .find(
          "descope-text-field[type='tel'][class='descope-input-wrapper descope-text-field'][data-id='1']"
        )
        .shadow()
        .find("#input-vaadin-text-field-39")
        .click()
        .type("2");

      ///3rd code digit
      cy.get("descope-wc[project-id='P2TjFGLikGRSHKrrxgAHf2o3cM7w']")
        .shadow()
        .find("#L1T9iO4p5U")
        .shadow()
        .find(
          "descope-text-field[type='tel'][class='descope-input-wrapper descope-text-field'][data-id='2']"
        )
        .shadow()
        .find("#input-vaadin-text-field-43")
        .click()
        .type("3");

      ///4th code digit
      cy.get("descope-wc[project-id='P2TjFGLikGRSHKrrxgAHf2o3cM7w']")
        .shadow()
        .find("#L1T9iO4p5U")
        .shadow()
        .find(
          "descope-text-field[type='tel'][class='descope-input-wrapper descope-text-field'][data-id='3']"
        )
        .shadow()
        .find("#input-vaadin-text-field-47")
        .click()
        .type("4");

      ///5th code digit
      cy.get("descope-wc[project-id='P2TjFGLikGRSHKrrxgAHf2o3cM7w']")
        .shadow()
        .find("#L1T9iO4p5U")
        .shadow()
        .find(
          "descope-text-field[type='tel'][class='descope-input-wrapper descope-text-field'][data-id='4']"
        )
        .shadow()
        .find("#input-vaadin-text-field-51")
        .click()
        .type("5");

      ///6th code digit
      cy.get("descope-wc[project-id='P2TjFGLikGRSHKrrxgAHf2o3cM7w']")
        .shadow()
        .find("#L1T9iO4p5U")
        .shadow()
        .find(
          "descope-text-field[type='tel'][class='descope-input-wrapper descope-text-field'][data-id='5']"
        )
        .shadow()
        .find("#input-vaadin-text-field-55")
        .click()
        .type("6");
    });
  }

  clickSubmitBtnInVerification() {
    cy.origin("https://auth.descope.io", () => {
      cy.get("descope-wc[project-id='P2TjFGLikGRSHKrrxgAHf2o3cM7w']")
        .shadow()
        .find("#submit")
        .shadow()
        .find("#submit")
        .shadow()
        .find(".vaadin-button-container")
        .click();
    });
  }

  verifyFailedEmailCodeDisplayed() {
    cy.origin("https://auth.descope.io", () => {
      cy.get("descope-wc[project-id='P2TjFGLikGRSHKrrxgAHf2o3cM7w']")
        .shadow()
        .find("#fyz-aN6hyx")
        .should("exist");
    });
  }

  verifyErrorMsgEmailFormatDisplayed() {
    cy.origin("https://auth.descope.io", () => {
      cy.get("descope-wc[project-id='P2TjFGLikGRSHKrrxgAHf2o3cM7w']")
        .shadow()
        .find("#IgW48WJK2h")
        .shadow()
        .find("#error-message-vaadin-email-field-2")
        .should("exist");
    });
  }
}
export default FrontOffice_PO;
