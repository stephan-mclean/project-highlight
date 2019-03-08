Cypress.Commands.add("login", () => {
  cy.visit("/public/login");

  cy.get("[data-cy=auth-email-btn]").click();
  cy.get("[data-cy=auth-email]").type("cy@test.com");
  cy.get("[data-cy=auth-pass]").type("cypress");
  cy.get("[data-cy=auth-submit-email]").click();
});

Cypress.Commands.add("logout", () => {
  cy.get("[data-cy=nav-settings-btn]").click();
  cy.get("[data-cy=settings-logout-btn]").click();
});
