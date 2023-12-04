describe('Cart', () => {
  it('displays no items when it is empty', () => {
    cy.visit('/cart')
    cy.get('main').contains('No items in cart.')
  })

  it('displays the item which has been added and its details', () => {
    cy.interceptFetchProductsWithFixture(false)
    cy.visit('/products')

    cy.contains('.product-item', 'Tennis ball').find('.product-add-to-cart').click()
    cy.contains('.product-item', 'Laptop').find('.product-add-to-cart').click()

    cy.visit('/cart')
    cy.get('table thead tr').contains('Name')
    cy.get('table thead tr').contains('Unit price')
    cy.get('table thead tr').contains('Amount')
    cy.get('table thead tr').contains('Price')

    cy.get('table tbody tr').contains('Tennis ball')
    cy.get('table tbody tr').contains('€ 0.60/pc')
    cy.contains('table tbody tr', 'Tennis ball').find('.touchspin-input').should('have.value', 4)
    cy.get('table tbody tr').contains('€ 2.40')

    cy.get('table tbody tr').contains('Laptop')
    cy.get('table tbody tr').contains('€ 1200.00/pc')
    cy.contains('table tbody tr', 'Laptop').find('.touchspin-input').should('have.value', 1)
    cy.get('table tbody tr').contains('€ 1200.00')

    cy.contains('Total: € 1202.40')
  })
})
