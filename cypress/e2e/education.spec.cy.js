//cypress/e2e/education.spec.cy.js
describe('Education Section – Pin & Visibility', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/');
    cy.wait(1000);
    cy.get('#education').should('exist').scrollIntoView();
    cy.wait(300);
    cy.get('.education-right')
      .scrollIntoView({ offset: { top: -100, left: 0 } });
    cy.wait(600);
  });

  it('pins .education display section on desktop', () => {
    cy.get('.education-right')
      .should('have.css', 'position', 'fixed');
  });

  it('shows course list when Courses button is clicked', () => {
    cy.get('.education-right .bg-violet-900').should('not.exist');
    cy.get('.education-right button').contains('Courses').click();

    cy.get('.education-right .bg-violet-900')
      .its('length')
      .should('be.gt', 0);
  });

  it('keeps gradient-bar visible after toggling courses', () => {
    cy.get('.gradient-bar').should('be.visible');
    cy.get('.education-right button').contains('Courses').click();
    cy.get('.gradient-bar').should('be.visible');
  });

  it('does not pin on mobile', () => {
    cy.viewport(375, 667);
    cy.reload();
    cy.wait(1000);
    cy.get('#education').scrollIntoView();
    cy.wait(300);
    cy.get('.education-right')
      .should('have.css', 'position')
      .and('not.equal', 'fixed');
  });

});

describe('Education Section – Pure Selection Tests (no pin)', () => {
    it('hovering over a school on desktop changes the displayed diploma', () => {
        cy.viewport(1920, 1080);
        cy.visit('/#education');
        cy.wait(500);
        cy.get('#education').scrollIntoView();
        cy.wait(300);

        cy.get('.education-item').eq(0)
        .scrollIntoView()
        .trigger('mouseover');
        cy.wait(200);
        cy.get('.education-right h2')
        .invoke('text')
        .then((firstText) => {
            const firstDiploma = firstText.trim();
            cy.log('firstDiploma:', firstDiploma);
            console.log('firstDiploma =', firstDiploma);

            cy.get('.education-item').eq(1)
            .scrollIntoView()
            .trigger('mouseover');
            cy.wait(200);
            cy.get('.education-right h2')
            .invoke('text')
            .then((secondText) => {
                const secondDiploma = secondText.trim();
                cy.log('secondDiploma:', secondDiploma);
                console.log('secondDiploma =', secondDiploma);

                expect(secondDiploma).not.to.equal(firstDiploma);
            });
        });
    });

    it('selecting a different school on mobile via CustomDropdown updates the displayed diploma', () => {
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

