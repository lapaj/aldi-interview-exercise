import { describe, it, expect, vi, beforeEach } from 'vitest'
import useCart from '../useCart'
import type { Product } from '@/types'
import exp from 'constants'
import { flushPromises } from '@vue/test-utils'

describe('Products composable store', () => {
  let mockCartItem = {
    totalPrice: 10.2,
    amount: 1,
    product: {
      id: '1',
      name: 'paper',
      img: '/paper.jpg',
      availableAmount: 1,
      minOrderAmount: 1,
      price: 10.2
    }
  }

  beforeEach(() => {
    window.localStorage.removeItem('webshop_cart')
    const { cart } = useCart()
    Object.assign(cart, { total: 0, productItems: [] })
    mockCartItem.amount = 1
    mockCartItem.totalPrice = 10.2
  })

  it('initializes the cart', () => {
    const { cart } = useCart()

    expect(cart).toBeDefined()
    expect(cart.total).toBe(0)
    expect(cart.productItems.length).toBe(0)
  })

  it('loads cart from localstorage', () => {
    const mockCartItemsJSON = JSON.stringify([mockCartItem])

    window.localStorage.setItem('webshop_cart', mockCartItemsJSON)

    const { cart } = useCart()
    console.log(cart)
    expect(cart.productItems.length).toBe(1)
    expect(cart.productItems).toStrictEqual(JSON.parse(mockCartItemsJSON))
    expect(cart.total).toBe(10.2)
  })

  it('calculates total on initialization', () => {
    const { cart } = useCart()

    expect(cart.total).toBe(0)
  })

  it('gets item by id', () => {
    const { cart, getItemById } = useCart()
    cart.productItems.push(mockCartItem)

    const result = getItemById('1')

    expect(result).toStrictEqual(mockCartItem)
  })

  it('gets item index by id', () => {
    const { cart, getItemIndexById } = useCart()
    cart.productItems.push(mockCartItem)

    const index = getItemIndexById('1')

    expect(index).toBe(0)
    expect(cart.productItems[index]).toStrictEqual(mockCartItem)
  })

  it('adds new item to cart', async () => {
    const { cart, addToCart } = useCart()

    addToCart(mockCartItem.product, 10)
    await flushPromises()

    expect(cart.productItems[0].product).toStrictEqual(mockCartItem.product)
    expect(cart.productItems[0].amount).toBe(10)
    expect(cart.productItems[0].totalPrice).toBe(mockCartItem.product.price * 10)
    expect(cart.total).toBe(mockCartItem.product.price * 10)
  })

  it('increases amount if item is in cart already', async () => {
    const { cart, addToCart } = useCart()
    cart.productItems.push(mockCartItem)

    addToCart(mockCartItem.product, 10)
    await flushPromises()

    expect(cart.productItems[0].product).toStrictEqual(mockCartItem.product)
    expect(cart.productItems[0].amount).toBe(10 + 1)
    expect(cart.productItems[0].totalPrice).toBe(mockCartItem.product.price * (10 + 1))
    expect(cart.total).toBe(mockCartItem.product.price * (10 + 1))
  })

  it('removes item from cart', () => {
    const { cart, removeFromCart } = useCart()

    cart.productItems.push(mockCartItem)
    expect(cart.productItems[0]).toStrictEqual(mockCartItem)

    removeFromCart(mockCartItem)
    expect(cart.productItems.length).toBe(0)
  })

  it('saves cart to local storage', async () => {
    const { cart, addToCart } = useCart()

    expect(window.localStorage.getItem('webshop_cart')).toBeNull()

    addToCart(mockCartItem.product, 10)
    await flushPromises()

    const expectedJSONString = JSON.stringify(cart.productItems)

    expect(window.localStorage.getItem('webshop_cart')).toStrictEqual(expectedJSONString)
  })

  it('watches items and updates', async () => {
    const { cart } = useCart()
    cart.productItems.push(mockCartItem)

    expect(cart.productItems[0]).toStrictEqual(mockCartItem)
    expect(cart.productItems[0].amount).toBe(1)

    mockCartItem.amount = 3
    await flushPromises()

    expect(cart.productItems[0].amount).toBe(3)
    expect(cart.productItems[0].totalPrice).toBe(3 * mockCartItem.product.price)
    expect(cart.total).toBe(3 * mockCartItem.product.price)

    cart.productItems.splice(0)
    await flushPromises()

    expect(cart.productItems.length).toBe(0)
    expect(cart.total).toBe(0)
  })
})
