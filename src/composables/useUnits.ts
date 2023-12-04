export default function useUnits() {
  const currency = '€'
  const amount = 'pc'

  const formatPrice = (price: number) => {
    return `${currency} ${price.toFixed(2)}`
  }

  return {
    currency,
    amount,
    formatPrice,
  }
}
