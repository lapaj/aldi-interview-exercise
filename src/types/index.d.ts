import type { DeepReadonly } from 'vue'

export interface Product {
  id: string
  name: string
  img: string
  availableAmount: number
  minOrderAmount: number
  price: number
}

export interface CartItem {
  product: DeepReadonly<Product>
  amount: number
  totalPrice: number
}
