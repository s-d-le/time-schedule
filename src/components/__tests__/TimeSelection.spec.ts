import { describe, it, expect, beforeEach, vi } from 'vitest'

import { createTestingPinia } from '@pinia/testing'

import { mount } from '@vue/test-utils'
import TimeSelection from '@/components/TimeSelection.vue'

describe('TimeSelection', () => {
  beforeEach(() => {
    createTestingPinia({
      initialState: {
        booking: {
          eventDays: [
            {
              day: 'Monday',
              title: 'available',
              available: true,
              timeSlots: [{ start: '09:00', end: '10:00' }]
            }
          ]
        }
      },
      stubActions: false,
      createSpy: vi.fn
    })
  })

  it('it renders the input', () => {
    const wrapper = mount(TimeSelection, {
      props: { eventIndex: 0, timeSlotIndex: 0, modelValue: '09:00' }
    })

    expect(wrapper.exists()).toBe(true)
  })
})
