/// <reference types="cypress" />

import { baseURL } from '../../src/client/products'

Cypress.Commands.add('interceptFetchProductsWithFixture', (wait = false) => {
  cy.fixture('products').then((productsJSON) => {
    cy.intercept(baseURL, (req) => {
      req.reply({
        statusCode: 200,
        body: productsJSON,
        delay: wait ? 2000 : 0, // milliseconds
      })
    }).as('interceptedProductFetch')
  })
})

export {}
