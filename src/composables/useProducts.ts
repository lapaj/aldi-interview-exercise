import { reactive } from 'vue'
import { client } from '@/client/products'
import type { Product } from '@/types'

const products = reactive<Product[]>([])

export default function useProducts() {
  const fetchProducts = async () => {
    const response = await client.get<Product[]>('/')
    Object.assign(products, response.data)
  }

  const getProductById = (productId: string) => {
    return products.find((product) => product.id === productId)
  }

  const addProduct = (product: Product) => {
    products.push(product)
  }

  return {
    products,
    addProduct,
    fetchProducts,
    getProductById
  }
}
