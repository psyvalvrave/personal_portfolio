//cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', 
    specPattern: 'cypress/e2e/**/*.spec.cy.{js,jsx}',
    supportFile: 'cypress/support/e2e.{js,ts}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
