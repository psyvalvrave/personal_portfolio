describe("Intro Section Smoke Tests", () => {
    const waitForAnimation = () => {
        cy.wait(1600);
    };

    context("Desktop viewport", () => {
        beforeEach(() => {
        cy.visit("/");
            });
        it("clicking 'Click to Explore' scrolls to #description", () => {
        cy.contains("button", "Click to Explore").click();
        waitForAnimation();
            cy.get("#description").then($el => {
            const rect = $el[0].getBoundingClientRect();
            expect(rect.top).to.be.closeTo(0, 400);
            });
        });
    });

    context("Mobile viewport", () => {
        beforeEach(() => {
        cy.viewport(375, 667);
        cy.visit("/");
        });
        it("clicking 'Click to Explore' scrolls to #description", () => {
        cy.contains("button", "Click to Explore").click();
        waitForAnimation();
        cy.get("#description").then($el => {
            const rect = $el[0].getBoundingClientRect();
            expect(rect.top).to.be.closeTo(0, 500);
            });
        });
    });
});
