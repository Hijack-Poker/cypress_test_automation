class LoginPage {
  btnLoginWithEmail = '#KAG9NgACSP';

  clickLoginWithEmail() {
    const login = this.btnLoginWithEmail;
    cy.origin("https://auth.descope.io", { args: { login } }, ({ login }) => {
      cy.get(login).eq(0).click();
    });
  }
}

export default new LoginPage();