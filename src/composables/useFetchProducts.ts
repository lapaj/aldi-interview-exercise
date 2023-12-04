import { ref } from 'vue'
import { client } from '@/client/products'

export default function useFetchProducts() {
  const data = ref(null)
  const error = ref(null)
  const isLoading = ref(false)

  const fetchData = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await client.get('/')
      if (response.status !== 200)
        throw new Error('Failed to fetch data')

      data.value = response.data
    }
    catch (err: any) {
      error.value = err.message ?? err
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    data,
    error,
    isLoading,
    fetchData,
  }
}
