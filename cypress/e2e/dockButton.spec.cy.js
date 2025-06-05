describe("VerticalDock E2E smoke tests", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    const waitForAnimation = () => {
        cy.wait(1600);
    };

    it("clicking 'Description' button scrolls to #description", () => {
        cy.get('button[aria-label="Description"]').click();
        waitForAnimation();
        cy.get("#description").then($el => {
        const rect = $el[0].getBoundingClientRect();
        expect(rect.top).to.be.closeTo(0, 200);
        });
    });

    it("clicking 'Skill Set' button scrolls to #stack", () => {
        cy.get('button[aria-label="Skill Set"]').click();
        waitForAnimation();
        cy.get("#stack").then($el => {
        const rect = $el[0].getBoundingClientRect();
        expect(rect.top).to.be.closeTo(0, 200);
        });
    });

    it("clicking 'Experience' button scrolls to #experience", () => {
        cy.get('button[aria-label="Experience"]').click();
        waitForAnimation();
        cy.get("#experience").then($el => {
        const rect = $el[0].getBoundingClientRect();
        expect(rect.top).to.be.closeTo(0, 200);
        });
    });

    it("clicking 'Project' button scrolls to #projects", () => {
        cy.get('button[aria-label="Project"]').click();
        waitForAnimation();
        cy.get("#projects").then($el => {
        const rect = $el[0].getBoundingClientRect();
        expect(rect.top).to.be.closeTo(0, 200);
        });
    });

    it("clicking 'Education' button scrolls to #education", () => {
        cy.get('button[aria-label="Education"]').click();
        waitForAnimation();
        cy.get("#education").then($el => {
        const rect = $el[0].getBoundingClientRect();
        expect(rect.top).to.be.closeTo(0, 200);
        });
    });

    it("clicking 'Top' button scrolls back to #intro (even if scrolled down first)", () => {
        cy.scrollTo("bottom");
        cy.wait(500);
        cy.get('button[aria-label="Top"]').click();
        waitForAnimation();

        cy.get("#intro").then($el => {
        const rect = $el[0].getBoundingClientRect();
        expect(Math.abs(rect.top)).to.be.lessThan(5);
        });
    });

    it("opens the ContactForm modal when 'Contact' is clicked", () => {
        cy.get('button[aria-label="Contact"]').click();
        cy.contains("h2", "Leave me a message").should("exist");
    });
});

describe("VerticalDock E2E smoke tests (mobile)", () => {
    beforeEach(() => {
        cy.viewport(375, 667);
        cy.visit("/");
    });

    const waitForAnimation = () => {
        cy.wait(2000);
    };

    it("clicking 'Description' button scrolls to #description", () => {
        cy.get('button[aria-label="Description"]').click();
        waitForAnimation();
        cy.get("#description").then($el => {
        const rect = $el[0].getBoundingClientRect();
        expect(rect.top).to.be.closeTo(0, 200);
        });
    });

    it("clicking 'Skill Set' button scrolls to #stack", () => {
        cy.get('button[aria-label="Skill Set"]').click();
        waitForAnimation();
        cy.get("#stack").then($el => {
        const rect = $el[0].getBoundingClientRect();
        expect(rect.top).to.be.closeTo(0, 200);
        });
    });

    it("clicking 'Experience' button scrolls to #experience", () => {
        cy.get('button[aria-label="Experience"]').click();
        waitForAnimation();
        cy.get("#experience").then($el => {
        const rect = $el[0].getBoundingClientRect();
        expect(rect.top).to.be.closeTo(0, 200);
        });
    });

    it("clicking 'Project' button scrolls to #projects", () => {
        cy.get('button[aria-label="Project"]').click();
        waitForAnimation();
        cy.get("#projects").then($el => {
        const rect = $el[0].getBoundingClientRect();
        expect(rect.top).to.be.closeTo(0, 200);
        });
    });

    it("clicking 'Education' button scrolls to #education", () => {
        cy.get('button[aria-label="Education"]').click();
        waitForAnimation();
        cy.get("#education").then($el => {
        const rect = $el[0].getBoundingClientRect();
        expect(rect.top).to.be.closeTo(0, 200);
        });
    });

    it("clicking 'Top' button scrolls back to #intro (even if scrolled down first)", () => {
        cy.scrollTo("bottom");
        cy.wait(500);
        cy.get('button[aria-label="Top"]').click();
        waitForAnimation();

        cy.get("#intro").then($el => {
        const rect = $el[0].getBoundingClientRect();
        expect(Math.abs(rect.top)).to.be.lessThan(5);
        });
    });

    it("opens the ContactForm modal when 'Contact' is clicked", () => {
        cy.get('button[aria-label="Contact"]').click();
        cy.contains("h2", "Leave me a message").should("exist");
    });
});
