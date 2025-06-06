describe("ContactForm validation (no reCAPTCHA token)", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('button[aria-label="Contact"]').click();
    cy.get("h2").contains("Leave me a message").should("exist");
  });

  it("alerts the user to verify reCAPTCHA before sending", () => {
    cy.window().then((win) => {
      cy.stub(win, "alert").as("alert");
    });

    cy.get('input[name="name"]').type("Test User");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('textarea[name="message"]').type("Hello world!");
    cy.get('button[type="submit"]').click();

    cy.get("@alert").should(
      "have.been.calledWith",
      "Please verify you’re not a robot."
    );

    cy.intercept("/api/contact", (req) => {
      throw new Error("Should not have submitted without reCAPTCHA");
    });
  });
});

describe("ContactForm submission (with reCAPTCHA token)", () => {
  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad(win) {
        win.grecaptcha = {
          render: (container, opts) => {
            opts.callback("FAKE_TOKEN");
            return 1234;
          },
          reset: () => {},
        };
        win.grecaptcha.ready = (cb) => cb();
      },
    });
    cy.get('button[aria-label="Contact"]').click();
    cy.get("h2").contains("Leave me a message").should("exist");
    cy.get('input[name="name"]').type("Test User");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('textarea[name="message"]').type("Hello world!");
    cy.intercept("POST", "/api/contact", {
      statusCode: 200,
      body: {},
    }).as("postContact");
  });

  it("displays 'Sent!' on success and then closes the modal", () => {
    cy.get('button[type="submit"]').click();
    cy.wait("@postContact");
    cy.get('button[type="submit"]').contains("Sent!").should("exist");
    cy.get("h2").contains("Leave me a message").should("exist");
    cy.wait(2100);
    cy.get("h2").contains("Leave me a message").should("not.exist");
  });
});
