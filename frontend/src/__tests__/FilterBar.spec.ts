import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FilterBar from '../components/FilterBar.vue'

describe('FilterBar', () => {
  it('renders search input and filter chips', () => {
    const wrapper = mount(FilterBar, {
      props: { search: '', availability: '', experience: '' },
    })
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    // Experience chips: Any + 3 options
    const chips = wrapper.findAll('.chip')
    expect(chips.length).toBeGreaterThanOrEqual(7) // 4 experience + 4 availability
  })

  it('emits update:search when user types', async () => {
    const wrapper = mount(FilterBar, {
      props: { search: '', availability: '', experience: '' },
    })
    const input = wrapper.find('input[type="text"]')
    await input.setValue('Chiv')
    expect(wrapper.emitted('update:search')?.[0]).toEqual(['Chiv'])
  })

  it('emits update:experience when an experience chip is clicked', async () => {
    const wrapper = mount(FilterBar, {
      props: { search: '', availability: '', experience: '' },
    })
    // "Expert" is the 4th chip (index 3)
    const chips = wrapper.findAll('.chip')
    await chips[3]?.trigger('click')
    expect(wrapper.emitted('update:experience')).toBeTruthy()
  })

  it('marks the active experience chip', () => {
    const wrapper = mount(FilterBar, {
      props: { search: '', availability: '', experience: 'degree' },
    })
    const activeChips = wrapper.findAll('.chip--active')
    // "Expert" (degree) chip should be active
    expect(activeChips.some((c) => c.text() === 'Expert')).toBe(true)
  })

  it('marks the active availability chip', () => {
    const wrapper = mount(FilterBar, {
      props: { search: '', availability: 'full_time', experience: '' },
    })
    const activeChips = wrapper.findAll('.chip--active')
    expect(activeChips.some((c) => c.text() === 'Full-time')).toBe(true)
  })
})
