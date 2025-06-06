describe("Experience Section Responsive Behavior", () => {
  const waitForScroll = () => {
    cy.wait(500);
  };

  context("Mobile viewport (375×667)", () => {
    beforeEach(() => {
      cy.viewport(375, 667);
      cy.visit("/");
      cy.get("#experience").scrollIntoView();
      waitForScroll();
    });

    it("Notebook content is visible", () => {
      cy.get("#experience .prose").should("exist").and("be.visible");
    });

    it("timeline circle is not visible on mobile", () => {
      cy.get('#experience span.rounded-full').each(($circle) => {
        cy.wrap($circle).should("not.be.visible");
      });
    });
  });

  context("Desktop viewport", () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
      cy.visit("/");
      cy.get("#experience").scrollIntoView();
      waitForScroll();
    });

    it("Notebook content is visible", () => {
      cy.get("#experience .prose").should("exist").and("be.visible");
    });

    it("timeline circle is visible on desktop", () => {
      cy.get('#experience span.rounded-full').each(($circle) => {
        cy.wrap($circle).should("be.visible");
      });
    });
  });
});
