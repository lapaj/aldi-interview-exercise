// https://on.cypress.io/api

describe('Products', () => {
  it('opens the products', () => {
    cy.visit('/products')
    cy.contains('h1', 'You did it!')
  })
})
