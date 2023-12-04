import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CartButton from '../cart/CartButton.vue'

import useUnits from '@/composables/useUnits'

describe('CartButton', () => {
  const { currency } = useUnits()
  it('renders properly', () => {
    const wrapper = mount(CartButton)
    expect(wrapper.text()).toContain(currency)
    expect(wrapper.find('img').attributes('alt')).toContain('Cart')
  })
})
