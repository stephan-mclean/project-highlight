describe("Books", () => {
  before(() => {
    cy.login();
  });

  after(() => {
    cy.logout();
  });

  it("Should allow adding a new book via search", () => {
    cy.get("[data-cy=nav-books-btn]").click();
    cy.get("[data-cy=nav-plus-btn]").click();

    cy.get("[data-cy=tab-Search]").click();
    cy.get("[data-cy=book-search-title]").type("A Game Of Thrones");
    cy.get("[data-cy=book-search-submit]").click();
    cy.get("[data-cy=new-book-search-result-0]").click();
    cy.get(
      "[data-cy=new-book-search-result-individual-result-add-btn]"
    ).click();
  });

  it("Should all deleting a book from the main books page", () => {
    cy.get("[data-cy=nav-books-btn]").click();
    cy.get("[data-cy=books-edit-btn]").click();
    cy.get("[data-cy=books-select-0]").click();
    cy.get("[data-cy=books-delete-btn]").click();
  });
});
