import { baseURL } from '../../src/client/products'

describe('Products', () => {
  it('opens the products page', () => {
    cy.visit('/products')

    cy.contains('h1', 'Products')
  })

  it('shows loading animation', () => {
    cy.interceptFetchProductsWithFixture(true)
    cy.visit('/products')

    cy.get('.products-loading')
  })

  it('shows product list', () => {
    cy.interceptFetchProductsWithFixture(false)
    cy.visit('/products')

    cy.get('.products-list')
  })

  it('shows no products message', () => {
    cy.intercept(baseURL, (req) => {
      req.reply({
        statusCode: 404,
      })
    }).as('notFoundProductFetch')
    cy.visit('/products')

    cy.get('.products-none')
  })

  it('shows no products message on empty response', () => {
    cy.intercept(baseURL, (req) => {
      req.reply({
        statusCode: 200,
        body: '',
      })
    }).as('emptyProductFetch')

    cy.visit('/products')

    cy.get('.products-none')
  })
})
