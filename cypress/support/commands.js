/// <reference types="cypress" />

Cypress.Commands.add('login', (email, password) => {
    cy.get('[placeholder="Email"]').clear();
    cy.get('[placeholder="Password"]').clear();
    cy.get('[placeholder="Email"]').type(email);
    cy.get('[placeholder="Password"]').type(password);
    cy.get('[type="submit"]').click();
})