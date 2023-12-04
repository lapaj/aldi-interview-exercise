import { beforeEach, describe, expect, it } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import useCart from '../useCart'
import type { CartItem } from '@/types'

describe('carts composable', () => {
  let mockCartItem: CartItem = {
    totalPrice: 10.2,
    amount: 1,
    product: {
      id: '1',
      name: 'paper',
      img: '/paper.jpg',
      availableAmount: 1,
      minOrderAmount: 1,
      price: 10.2,
    },
  }

  beforeEach(() => {
    window.localStorage.removeItem('webshop_cart')
    const { cart } = useCart()
    Object.assign(cart, { total: 0, productItems: new Map() })
    mockCartItem = structuredClone(mockCartItem)
  })

  it('initializes the cart', () => {
    const { cart, cartTotal, cartItemCount } = useCart()

    expect(cart).toBeDefined()
    expect(cartTotal.value).toBe(0)
    expect(cartItemCount.value).toBe(0)
  })

  it('loads cart from localstorage', () => {
    const mockCartItemsJSON = JSON.stringify([
      [mockCartItem.product.id, mockCartItem],
    ])

    window.localStorage.setItem('webshop_cart', mockCartItemsJSON)

    const { cart, cartTotal, cartItemCount } = useCart()

    expect(cartItemCount.value).toBe(1)
    expect([...cart.productItems.entries()]).toStrictEqual(
      JSON.parse(mockCartItemsJSON),
    )
    expect(cartTotal.value).toBe(10.2)
  })

  it('calculates total on initialization', () => {
    const { cartTotal } = useCart()

    expect(cartTotal.value).toBe(0)
  })

  it('calculates item count on initialization', () => {
    const { cartItemCount } = useCart()

    expect(cartItemCount.value).toBe(0)
  })

  it('returns item by product', () => {
    const { cart, getCartItem } = useCart()
    cart.productItems.set(mockCartItem.product.id, mockCartItem)

    const result = getCartItem(mockCartItem.product)

    expect(result).toStrictEqual(mockCartItem)
  })

  it('adds new item to cart', async () => {
    const { cartTotal, addToCart, getCartItem } = useCart()

    const product = structuredClone(mockCartItem.product)

    addToCart(mockCartItem.product, 10)
    await flushPromises()

    expect(getCartItem(product)!.product).toStrictEqual(product)
    expect(getCartItem(product)!.amount).toBe(10)
    expect(getCartItem(product)!.totalPrice).toBe(
      mockCartItem.product.price * 10,
    )
    expect(cartTotal.value).toBe(mockCartItem.product.price * 10)
  })

  it('checks if product is in cart', () => {
    const { addToCart, isProductInCart } = useCart()
    expect(isProductInCart(mockCartItem.product)).toBeFalsy()
    addToCart(mockCartItem.product, 10)
    expect(isProductInCart(mockCartItem.product)).toBe(true)
  })

  it('increases amount if item is in cart already', async () => {
    const { cart, cartTotal, addToCart, getCartItem } = useCart()
    cart.productItems.set(mockCartItem.product.id, mockCartItem)

    addToCart(mockCartItem.product, 10)
    await flushPromises()

    expect(getCartItem(mockCartItem.product)!.product).toStrictEqual(
      mockCartItem.product,
    )
    expect(getCartItem(mockCartItem.product)!.amount).toBeCloseTo(10 + 1)
    expect(getCartItem(mockCartItem.product)!.totalPrice).toBeCloseTo(
      mockCartItem.product.price * (10.0 + 1.0),
    )
    expect(cartTotal.value).toBeCloseTo(mockCartItem.product.price * (10 + 1))
  })

  it('removes item from cart', () => {
    const { cart, cartItemCount, removeProductFromCart } = useCart()

    cart.productItems.set(mockCartItem.product.id, mockCartItem)
    expect(cart.productItems.get(mockCartItem.product.id)).toStrictEqual(
      mockCartItem,
    )

    removeProductFromCart(mockCartItem.product)
    expect(cartItemCount.value).toBe(0)
  })

  it('saves cart to local storage', async () => {
    const { cart, addToCart } = useCart()

    expect(window.localStorage.getItem('webshop_cart')).toBeNull()

    addToCart(mockCartItem.product, 10)
    await flushPromises()

    const expectedJSONString = JSON.stringify([...cart.productItems.entries()])

    expect(window.localStorage.getItem('webshop_cart')).toStrictEqual(
      expectedJSONString,
    )
  })

  it('watches items and updates', async () => {
    const { cart, cartItemCount, cartTotal } = useCart()
    cart.productItems.set(mockCartItem.product.id, mockCartItem)

    expect(cart.productItems.get(mockCartItem.product.id)).toStrictEqual(
      mockCartItem,
    )
    expect(cart.productItems.get(mockCartItem.product.id)!.amount).toBe(
      mockCartItem.amount,
    )

    mockCartItem.amount = 3
    await flushPromises()

    expect(cart.productItems.get(mockCartItem.product.id)!.amount).toBe(3)
    expect(cartTotal.value).toBeCloseTo(3 * mockCartItem.product.price)
    expect(
      cart.productItems.get(mockCartItem.product.id)!.totalPrice,
    ).toBeCloseTo(3 * mockCartItem.product.price)

    cart.productItems.clear()
    await flushPromises()

    expect(cartItemCount.value).toBe(0)
    expect(cartTotal.value).toBe(0)
  })

  it('clears the cart', async () => {
    const { cart, clearCart, cartItemCount, cartTotal, getCartItem }
      = useCart()
    cart.productItems.set(mockCartItem.product.id, mockCartItem)
    expect(cartItemCount.value).toBe(1)
    expect(cartTotal.value).toBe(mockCartItem.totalPrice)

    clearCart()
    await flushPromises()

    expect(getCartItem(mockCartItem.product)).toBeFalsy()
    expect(cartItemCount.value).toBe(0)
    expect(cartTotal.value).toBe(0)
  })
})
