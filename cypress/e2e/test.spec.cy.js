// cypress/e2e/education-mobile-dropdown.spec.cy.js

describe('Education Section – Mobile Dropdown Selection', () => {
    it('selecting a different school via CustomDropdown updates the displayed diploma', () => {
        cy.viewport(375, 667);
        cy.visit('/#education');
        cy.wait(500);

        cy.get('#education').scrollIntoView();
        cy.wait(300);

        cy.get('.education-right h2')
        .invoke('text')
        .then((initialText) => {
            const initialDiploma = initialText.trim();
            cy.log('Initial diploma (mobile):', initialDiploma);

            cy.get('.education-right')
            .find('div.flex.justify-between')
            .click();
            cy.wait(200);
            cy.get('.education-right')
            .find('ul > li')
            .eq(1)
            .click();
            cy.wait(200);

            cy.get('.education-right h2')
            .invoke('text')
            .then((updatedText) => {
                const updatedDiploma = updatedText.trim();
                cy.log('Updated diploma (mobile):', updatedDiploma);
                expect(updatedDiploma).not.to.equal(initialDiploma);
            });
        });
    });
});
