import { describe, expect, it } from 'vitest'
import useUnits from '../useUnits'

describe('units composable', () => {
  it('formats price to 2 decimals', () => {
    const { currency, formatPrice } = useUnits()
    expect(formatPrice(13.23)).toMatch(`${currency} 13.23`)
    expect(formatPrice(13.234235453543)).toMatch(`${currency} 13.23`)
  })
})
