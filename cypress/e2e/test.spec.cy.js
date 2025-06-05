// File: cypress/e2e/verticalDockContact.cy.js

/**
 * Verify that clicking the “Contact” dock button opens the ContactForm modal.
 * We’ll confirm this by checking for the unique heading “Leave me a message”.
 */

describe("VerticalDock → Contact button", () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit("/");
  });

  it("opens the ContactForm modal when 'Contact' is clicked", () => {
    // 1) Click the dock button whose aria-label="Contact"
    cy.get('button[aria-label="Contact"]').click();

    // 2) Check that the ContactForm’s heading appears
    //    (the <h2> in ContactForm reads “Leave me a message”)
    cy.contains("h2", "Leave me a message").should("exist");
  });
});
