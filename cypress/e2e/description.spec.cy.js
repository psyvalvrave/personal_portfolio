//cypress/e2e/description.spec.cy.js
describe("Description Section Social Links", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("first link is GitHub and its href contains 'github'", () => {
    cy.get("#description a")
      .first()
      .should("have.attr", "href")
      .and("include", "github");
  });

  it("second link is LinkedIn and its href contains 'linkedin'", () => {
    cy.get("#description a")
      .eq(1)
      .should("have.attr", "href")
      .and("include", "linkedin");
  });
});