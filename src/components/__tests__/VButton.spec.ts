import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import VButton from '../common/VButton.vue'

describe('vButton', () => {
  it('renders the button with label', () => {
    const wrapper = shallowMount(VButton, {
      slots: { default: 'My button' },
      stubs: ['router-link'],
    })

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').text()).toContain('My button')
  })

  it('renders a router link with label', () => {
    const wrapper = shallowMount(VButton, {
      props: { to: '/products' },
      slots: { default: 'My button' },
      stubs: ['router-link'],
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('My button')
    expect(wrapper.attributes('to')).toBe('/products')
  })
})
