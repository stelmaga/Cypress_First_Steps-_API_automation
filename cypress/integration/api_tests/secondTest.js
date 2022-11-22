/// <reference types="cypress" />

describe("Sending a request directly using API", () => {
    beforeEach(function() {
        cy.fixture("loginData").then(data => {
            this.data = data;
        })
    })
    it ("Authorization and adding a new article", function() {
        const authorizationData = {
            "user": {
                "email": "agnieszka@test.pl",
                "password": "Password"
            }
        }

        const dataArticle = {
            "article" : {
                "tagList": [],
                "title": "2nd test article from API",
                "description": "test",
                "body": "test"
            }
        }

        cy.request("POST", "https://api.realworld.io/api/users/login", authorizationData)
        .its("body").then(res => {
            const authToken = res.user.token;

            cy.request({
                method: "POST",
                url: "https://api.realworld.io/api/articles",
                body: dataArticle,
                headers: {
                    "Authorization": 'Token ' + authToken
                }
            }).then(res => {
                expect(res.status).to.equal(200)
            })
        })
    })
})