import { reactive } from 'vue'
import useFetchProducts from './useFetchProducts'
import type { Product } from '@/types'

const products = reactive<Product[]>([])

export default function useProducts() {
  const fetchProducts = () => {
    const { data, error, isLoading, fetchData } = useFetchProducts()
    fetchData().then(() => {
      Object.assign(products, data.value)
    })

    return { data, error, isLoading }
  }

  const getProductById = (productId: string) => {
    return products.find(product => product.id === productId)
  }

  const addProduct = (product: Product) => {
    products.push(product)
  }

  return {
    products,
    addProduct,
    fetchProducts,
    getProductById,
  }
}
