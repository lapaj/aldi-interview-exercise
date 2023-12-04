import type { CartItem, Product } from '@/types'
import { reactive, watch } from 'vue'

const cart = reactive({ total: 0, productItems: new Map<string, CartItem>() })

export default function useCart() {
  const LOCAL_STORAGE_KEY = 'webshop_cart'

  const loadCart = () => {
    const cartInStorage: string | null = window.localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!cartInStorage) return
    try {
      const parsedCart = JSON.parse(cartInStorage)
      if (parsedCart?.length) {
        cart.productItems = parsedCart
      }
    } catch (err) {
      console.error(err)
    }
  }

  const updateTotal = () => {
    cart.total = 0
    cart.productItems.forEach((item) => {
      item.totalPrice = item.product.price * item.amount
      cart.total += item.totalPrice
    })
  }

  if (cart.productItems.length === 0) {
    loadCart()
    updateTotal()
  }

  const getItemById = (productId: string) => {
    return cart.productItems.find((item) => productId == item.product.id)
  }

  const getItemIndexById = (productId: string) => {
    return cart.productItems.findIndex((item) => productId == item.product.id)
  }

  const addToCart = (product: Product, amount: number) => {
    const existingItem = getItemById(product.id)
    if (existingItem) {
      existingItem.amount += amount
      existingItem.totalPrice += amount * product.price
    } else {
      cart.productItems.push({ product, totalPrice: product.price * amount, amount })
    }
  }

  const removeFromCart = (cartItem: CartItem) => {
    const removeIndex = getItemIndexById(cartItem.product.id)
    if (removeIndex > -1) {
      cart.productItems.splice(removeIndex, 1)
    }
  }

  const saveCart = () => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart.productItems))
  }

  const validateAmount = (cartItem: CartItem) => {
    return isAmountAvailable(cartItem) && isAmountMinimum(cartItem)
  }

  const isAmountAvailable = (cartItem: CartItem) => {
    return cartItem.amount <= cartItem.product.availableAmount
  }

  const isAmountMinimum = (cartItem: CartItem) => {
    return cartItem.amount >= cartItem.product.minOrderAmount
  }

  watch(cart.productItems, (oldValue, newValue) => {
    console.log({oldValue, newValue})
    saveCart()
    updateTotal()
  })

  return {
    cart,
    getItemById,
    getItemIndexById,
    addToCart,
    removeFromCart,
    updateTotal
  }
}
