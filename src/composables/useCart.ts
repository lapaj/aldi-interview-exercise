import { computed, reactive, watch } from 'vue'
import type { CartItem, Product } from '@/types'

const cart = reactive({ productItems: new Map<string, CartItem>() })

export default function useCart() {
  const LOCAL_STORAGE_KEY = 'webshop_cart'

  const loadCart = () => {
    const cartInStorage: string | null
      = window.localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!cartInStorage)
      return

    try {
      const parsedCart = JSON.parse(cartInStorage)
      if (parsedCart?.length)
        cart.productItems = new Map(parsedCart)
    }
    catch (err) {
      console.error(err)
    }
  }

  const cartTotal = computed(() => {
    let total = 0
    cart.productItems.forEach((item) => {
      item.totalPrice = item.product.price * item.amount
      total += item.totalPrice
    })
    return total
  })

  const cartItemCount = computed(() => {
    return cart.productItems?.size ?? 0
  })

  if (cart.productItems.size === 0)
    loadCart()

  const getCartItem = (product: Product) => {
    return cart.productItems.get(product.id)
  }

  const addToCart = (product: Product, amount: number) => {
    if (cart.productItems.has(product.id)) {
      const existingItem = cart.productItems.get(product.id)!
      existingItem.amount += amount
      existingItem.totalPrice += amount * product.price
    }
    else
      cart.productItems.set(product.id, {
        product,
        totalPrice: product.price * amount,
        amount,
      })
  }

  const isProductInCart = (product: Product) => {
    return cart.productItems.has(product.id)
  }

  const removeProductFromCart = (product: Product) => {
    cart.productItems.delete(product.id)
  }

  const saveCart = () => {
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([...cart.productItems.entries()]),
    )
  }

  const clearCart = () => {
    cart.productItems.clear()
  }

  watch(cartItemCount, () => {
    saveCart()
  })

  return {
    cart,
    getCartItem,
    addToCart,
    removeProductFromCart,
    cartTotal,
    cartItemCount,
    isProductInCart,
    clearCart,
  }
}
