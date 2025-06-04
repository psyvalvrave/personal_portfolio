describe('Projects Section – Pin, Hover & Dropdown Selection', () => {
    context('Desktop: Project Selection', () => {
        beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('/#projects');
        cy.wait(800);
        cy.get('#projects').should('exist').scrollIntoView();
        cy.wait(300);

        cy.get('.projects-left').then(($el) => {
            const top = $el.offset().top;
            cy.window().then((win) => {
            win.scrollTo(0, top - 100);
            });
        });

        cy.wait(600);
        });

        it('project display should stay pin on desktop', () => {
        cy.get('.projects-left')
            .should('have.css', 'position', 'fixed');
        });

        it('hovering a project on desktop changes the displayed project', () => {
        cy.get('.projects-left')
            .find('h2, h3, .project-title') 
            .invoke('text')
            .then((initialText) => {
            const firstTitle = initialText.trim();
            cy.log('firstTitle:', firstTitle);


            cy.get('.project-link').eq(1)
                .scrollIntoView()
                .trigger('mouseover');
            cy.wait(200);

            cy.get('.projects-left')
                .find('h2, h3, .project-title')
                .invoke('text')
                .then((secondText) => {
                const secondTitle = secondText.trim();
                cy.log('secondTitle:', secondTitle);

                expect(secondTitle).not.to.equal(firstTitle);
                });
            });      
        });

        it('has Learn More and Download links with correct hrefs', () => {
            cy.get('.projects-left')
                .contains('Learn More')
                .should('have.attr', 'href')
                .and('include', 'github.com');

            cy.get('.projects-left')
                .contains('Download')
                .should('have.attr', 'href')
                .and('include', '/actions/runs/');
            });

        it('opens ImageModal when the image container is clicked and then closes it', () => {
        cy.get('.projects-left')
            .find('div.cursor-pointer:visible')
            .first()
            .click();

        cy.get('body')
            .find('div.fixed.top-0.left-0.w-full.h-full') 
            .should('be.visible')
            .within(() => {
            cy.get('img').should('be.visible');
            });

        cy.get('body')
            .find('button')
            .contains('×')
            .click({ force: true });

        cy.get('body')
            .find('div.fixed.top-0.left-0.w-full.h-full')
            .should('not.exist');
        });
    });

    context('Mobile: Project Selection (no pin)', () => {
        beforeEach(() => {
            cy.viewport(375, 667);
            cy.visit('/#projects');
            cy.wait(800);
            cy.get('#projects').scrollIntoView();
            cy.wait(300);
            });
        it('selecting a different project via CustomDropdown updates the displayed project', () => {
            cy.get('.projects-left')
                .find('h2, h3, .project-title')
                .invoke('text')
                .then((initial) => {
                const initialTitle = initial.trim();
                cy.log('initialTitle (mobile):', initialTitle);

                cy.get('.projects-left')
                    .find('div.flex.justify-between')
                    .click();
                cy.wait(200);

                cy.get('.projects-left')
                    .find('ul > li')
                    .eq(1)
                    .click();
                cy.wait(200);

                cy.get('.projects-left')
                    .find('h2, h3, .project-title')
                    .invoke('text')
                    .then((updated) => {
                    const updatedTitle = updated.trim();
                    cy.log('updatedTitle (mobile):', updatedTitle);

                    expect(updatedTitle).not.to.equal(initialTitle);
                    });
                });
            });

        it('has Learn More and Download links with expected URL patterns on mobile', () => {  
            cy.get('.projects-left')
                .contains('Learn More')
                .should('have.attr', 'href')
                .and('include', 'github.com');

            cy.get('.projects-left')
                .contains('Download')
                .should('have.attr', 'href')
                .and('include', '/actions/runs/');
            });

        it('opens ImageModal when the image container is tapped and then closes it on mobile', () => {
            cy.get('.projects-left')
                .find('div.cursor-pointer:visible')
                .eq(1)         
                .click();
            cy.wait(200);

            cy.get('body')
                .find('div.fixed.top-0.left-0.w-full.h-full')
                .should('be.visible')
                .within(() => {
                cy.get('img').should('be.visible');
                });

            cy.get('body')
                .find('button')
                .contains('×')
                .click({ force: true });

            cy.get('body')
                .find('div.fixed.top-0.left-0.w-full.h-full')
                .should('not.exist');
            });
    });
});
