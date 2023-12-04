import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import CartTable from '../cart/CartTable.vue'

describe('cartTable', () => {
  it('renders with no items', () => {
    const wrapper = mount(CartTable)
    expect(wrapper.text()).toContain('No items')
  })
})
