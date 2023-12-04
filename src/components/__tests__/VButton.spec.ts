import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VButton from '../common/VButton.vue'

describe('VButton', () => {
  it('renders the button with label', () => {
    const wrapper = mount(VButton, { slots: { default: 'My button' } })

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').text()).toContain('My button')
  })

  it('renders a router link with label', () => {
    const wrapper = mount(VButton, { props: { to: '/test' }, slots: { default: 'My button' } })

    expect(wrapper.find('routerlink').exists()).toBe(true)
    expect(wrapper.find('routerlink').text()).toContain('My button')
    expect(wrapper.find('routerlink').attributes('to')).toBe('/test')
  })
})
