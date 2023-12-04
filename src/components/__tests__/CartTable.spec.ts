import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CartTable from '../cart/CartTable.vue'

describe('CartTable', () => {
  it('Renders with no items', () => {
    const wrapper = mount(CartTable)
    expect(wrapper.text()).toContain('No items')
  })
})
