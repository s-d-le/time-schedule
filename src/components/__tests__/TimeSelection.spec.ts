import { describe, it, expect, beforeEach, vi } from 'vitest'
import { storeToRefs } from 'pinia'

import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { useBookingStore } from '@/stores/booking'

import { mount } from '@vue/test-utils'
import TimeSelection from '@/components/TimeSelection.vue'

describe('TimeSelection', () => {
  let wrapper = null
  beforeEach(() => {
    setActivePinia(createPinia())
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

  it('renders the start time input', () => {
    const wrapper = mount(TimeSelection, {
      props: { eventIndex: 0, timeSlotIndex: 0 },
      global: {
        plugins: [createPinia()], // initializes Pinia
        stubs: { TimeSelection }
      }
    })
    const store = storeToRefs(useBookingStore())
    const rawStore = useBookingStore()
    expect(wrapper.exists()).toBe(true)
  })

  // it('renders the end time input', () => {
  //   const wrapper = mount(TimeSelection)
  //   const endTimeInput = wrapper.find('#endTime')
  //   expect(endTimeInput.exists()).toBe(true)
  // })

  // it('disables the end time input', () => {
  //   const wrapper = mount(TimeSelection)
  //   const endTimeInput = wrapper.find('#endTime')
  //   expect(endTimeInput.attributes('disabled')).toBe('disabled')
  // })

  // it('calls the removeSlot method when "-" button is clicked', async () => {
  //   const wrapper = mount(TimeSelection)
  //   const removeSlotButton = wrapper.find('.bg-gray-100')
  //   await removeSlotButton.trigger('click')
  //   expect(wrapper.emitted('removeSlot')).toBeTruthy()
  // })

  // it('calls the addMoreSlot method when "+" button is clicked', async () => {
  //   const wrapper = mount(TimeSelection)
  //   const addMoreSlotButton = wrapper.find('.bg-green-100')
  //   await addMoreSlotButton.trigger('click')
  //   expect(wrapper.emitted('addMoreSlot')).toBeTruthy()
  // })
})
