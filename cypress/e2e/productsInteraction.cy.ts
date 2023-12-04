describe('Products', () => {
  beforeEach(() => {
    cy.interceptFetchProductsWithFixture(false)
    cy.visit('/products')
  })

  it('shows product list and empty cart', () => {
    cy.get('.products-list')
    cy.get('.global-cart-button')
    cy.get('.global-cart-button .cart-amount').should('not.exist')
    cy.get('.global-cart-button').contains('€ 0.00')
  })

  it('shows product data', () => {
    cy.get('.product-item').first().as('productItem')
    cy.get('@productItem').find('img')
    cy.get('@productItem').contains('Screwdrivers')
    cy.get('@productItem').contains('€ 3.00')
    cy.get('@productItem').contains('500 pc in stock')
    cy.get('@productItem').contains('Minimum: 1 pc')
  })

  it('adds product to cart', () => {
    cy.get('.product-item').as('productItems')
    cy.get('@productItems').first().find('.product-add-to-cart').click()
    cy.get('.global-cart-button')
    cy.get('.global-cart-button .cart-amount').contains('1')

    cy.get('@productItems').first().next().find('.product-add-to-cart').click()
    cy.get('.global-cart-button .cart-amount').contains('2')
  })

  it('changes total in cart', () => {
    cy.visit('/products')

    cy.get('.product-item').as('productItems')

    cy.get('@productItems').first().as('product1').find('.product-add-to-cart').click()
    cy.get('.global-cart-button').as('cartButton').invoke('data', 'total').then((total: unknown) => {
      cy.get('@product1').invoke('data', 'product-price').then((price: unknown) => {
        expect(parseFloat(total as string)).to.equal(price as number * 1)
        cy.get('@product1').find('.touchspin-button-add').click()
        cy.get('.global-cart-button').contains(price as number * 2)
      })
    })
  })

  it('adds custom amount to cart', () => {
    cy.get('.product-item').first().as('productItem')
    cy.get('@productItem').find('.touchspin-input').clear()
    cy.get('@productItem').find('.touchspin-input').type('{del}{del}300')
    cy.get('@productItem').find('.product-add-to-cart').click()
    cy.get('.global-cart-button').contains('900.00')
  })

  it('does not add less than the minimum', () => {
    cy.contains('.product-item', 'Bolts').as('productItem')
    cy.get('@productItem').find('.touchspin-input').should('have.value', 20)
    cy.get('@productItem').find('.touchspin-button-subtract').as('subtractBolts')
    cy.get('@subtractBolts').click()
    cy.get('@subtractBolts').click()
    cy.get('@subtractBolts').click()
    cy.get('@productItem').find('.touchspin-input').should('have.value', 20)

    cy.get('@productItem').find('.touchspin-input').clear()
    cy.get('@productItem').find('.touchspin-input').type('{del}{del}1')
    cy.get('@productItem').find('.product-add-to-cart').should('be.disabled')
  })

  it('does not add more than the available amount', () => {
    cy.contains('.product-item', 'Bolts').as('productItem')
    cy.get('@productItem').find('.touchspin-input').should('have.value', 20)

    cy.get('@productItem').find('.touchspin-input').clear()
    cy.get('@productItem').find('.touchspin-input').type('{del}{del}9999')
    cy.get('@productItem').find('.product-add-to-cart').should('be.disabled')

    cy.get('@productItem').find('.touchspin-input').clear()
    cy.get('@productItem').find('.touchspin-input').type('{del}{del}{del}{del}1000')
    cy.get('@productItem').find('.product-add-to-cart').click()
    cy.get('@productItem').find('.touchspin-button-add').as('addBolts')
    cy.get('@addBolts').click()
    cy.get('@addBolts').click()
    cy.get('@addBolts').click()
    cy.get('@addBolts').click()
    cy.get('@productItem').find('.touchspin-input').should('have.value', 1000)

    cy.get('@productItem').contains('0 pc in stock')
  })
})
