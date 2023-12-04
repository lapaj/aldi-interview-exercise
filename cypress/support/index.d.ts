/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    interceptFetchProductsWithFixture(wait?: boolean): Chainable<Element>
  }
}
