import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HelperCard from '../components/HelperCard.vue'
import type { HelperProfile } from '../types'

const helper: HelperProfile = {
  id: 1,
  userId: 11,
  name: 'Chiv Inthera',
  experience: 'degree',
  degrees: ['Nursing diploma'],
  availability: 'full_time',
  district: 'Chamkar Mon',
  bio: 'Elderly care nurse, 6 years.',
}

describe('HelperCard', () => {
  it('renders helper name', () => {
    const wrapper = mount(HelperCard, { props: { helper } })
    expect(wrapper.text()).toContain('Chiv Inthera')
  })

  it('renders correct experience label', () => {
    const wrapper = mount(HelperCard, { props: { helper } })
    expect(wrapper.text()).toContain('Expert')
  })

  it('renders correct availability label', () => {
    const wrapper = mount(HelperCard, { props: { helper } })
    expect(wrapper.text()).toContain('Full-time')
  })

  it('shows degree and verified badge when helper has degrees', () => {
    const wrapper = mount(HelperCard, { props: { helper } })
    expect(wrapper.text()).toContain('Nursing diploma')
    expect(wrapper.text()).toContain('Verified')
  })

  it('emits select event with correct id when "View profile" is clicked', async () => {
    const wrapper = mount(HelperCard, { props: { helper } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('select')?.[0]).toEqual([1])
  })

  it('renders initials correctly in avatar', () => {
    const wrapper = mount(HelperCard, { props: { helper } })
    expect(wrapper.text()).toContain('CI') // Chiv Inthera → CI
  })
})

