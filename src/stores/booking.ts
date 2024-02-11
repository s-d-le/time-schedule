import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { VisitDuration } from '@/types/visit-duration'
import type { EventDay } from '@/types/event-day'
import { Days } from '@/types/event-day'

export const useBookingStore = defineStore(
  'booking',
  () => {
    const state = reactive({
      visitDuration: VisitDuration['15 min'],
      numberOfBooking: 1
    })

    const eventDays = ref<EventDay[]>([
      {
        day: Days.Mon,
        title: 'available',
        available: true,
        timeSlots: [{ start: '09:00' }]
      },
      {
        day: Days.Tue,
        title: 'available',
        available: true,
        timeSlots: [{ start: '09:00' }]
      },
      {
        day: Days.Wed,
        title: 'available',
        available: true,
        timeSlots: [{ start: '09:00' }]
      },
      {
        day: Days.Thu,
        title: 'available',
        available: true,
        timeSlots: [{ start: '09:00' }]
      },
      {
        day: Days.Fri,
        title: 'available',
        available: true,
        timeSlots: [{ start: '09:00' }]
      },
      {
        day: Days.Sat,
        title: 'available',
        available: false,
        timeSlots: []
      },
      {
        day: Days.Sun,
        title: 'available',
        available: false,
        timeSlots: []
      }
    ])

    return { state, eventDays }
  },
  { persist: true }
)
