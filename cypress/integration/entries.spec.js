describe("Entries", () => {
  before(() => {
    cy.login();
  });

  after(() => {
    cy.logout();
  });

  it("Should allow adding an entry without a book", () => {
    cy.get("[data-cy=nav-entries-btn]").click();
    cy.get("[data-cy=nav-plus-btn]").click();
    cy.get("[data-cy=new-entry-notes]").type("Entry Notes");
    cy.get("[data-cy=new-entry-submit-btn]").click();
  });

  it("Should allow deleting an entry from the list", () => {
    cy.get("[data-cy=nav-entries-btn]").click();
    cy.get("[data-cy=entry-list-entry-0]")
      .find("[data-cy=entry-delete-btn]")
      .click();
  });
});
