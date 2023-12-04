import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import VTouchspin from '../common/VTouchspin.vue'

describe('vTouchspin', () => {
  it('renders properly', () => {
    const wrapper = mount(VTouchspin)

    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.props().modelValue).toBe(1)
    expect(wrapper.findAll('button').length).toBe(2)
    expect(wrapper.findAll('button')[0].text()).toBe('-')
    expect(wrapper.find('input').element.value).toBe('1')
  })

  it('increments', async () => {
    const wrapper = mount(VTouchspin)

    const plusButton = wrapper.findAll('button')[1]

    expect(plusButton.text()).toBe('+')
    expect(wrapper.find('input').element.value).toBe('1')
    await plusButton.trigger('click')
    expect(wrapper.emitted('update:modelValue'))
    expect(wrapper.find('input').element.value).toBe('2')
  })
})
