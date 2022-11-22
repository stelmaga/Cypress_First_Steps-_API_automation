/// <reference types="cypress" />

describe("API tests", () => {
    beforeEach(function() {
        cy.fixture("loginData").then(data => {
            this.data = data;
        })
    })
    it ("Verification of API tags", () => {
        cy.intercept("GET", "https://api.realworld.io/api/tags").as("requestTag");
        cy.visit("https://demo.realworld.io/");
        cy.wait("@requestTag")
        cy.get("@requestTag").then(res => {
            console.log(res)
            expect(res.response.statusCode).to.equal(200)
            expect(res.response.body.tags).to.contain("welcome").and.to.contain("implementations")
        })
    })

    it ("Login with incorrect data", function() {
        cy.intercept("POST", "https://api.realworld.io/api/users/login").as("requestLogin")
        cy.get("a.nav-link").contains("Sign in").click();
        cy.login("test1234@test.pl", "1234@");
        cy.wait("@requestLogin")
        cy.get("@requestLogin").then(res => {
            console.log(res)
            expect(res.response.statusCode).to.equal(403)
            expect(res.response.statusMessage).to.equal(this.data.statusMessage403)
        })
    })

    // mockowanie danych
    it ("Login with correct data", function() {
        cy.login("agnieszka@test.pl", "Password");
        cy.intercept("GET", "https://api.realworld.io/api/tags", {fixture: 'tags.json'}).as("requestTag");
        cy.wait("@requestTag")
        })

})