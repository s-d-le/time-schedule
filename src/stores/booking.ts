import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { VisitDuration } from '@/types/visit-duration'
import type { EventDay } from '@/types/event-day'
import { Days } from '@/types/event-day'

export const useBookingStore = defineStore('booking', () => {
  const state = reactive({
    visitDuration: VisitDuration['15 min'],
    numberOfBooking: 1
  })

  const eventDays = ref<EventDay[]>([
    {
      day: Days.Mon,
      available: true,
      timeSlots: [{ startTime: '09:00', endTime: '18:00' }, { startTime: '10:00' }]
    },
    {
      day: Days.Tue,
      available: true,
      timeSlots: undefined
    },
    {
      day: Days.Wed,
      available: true,
      timeSlots: [{ startTime: '09:00' }]
    },
    {
      day: Days.Thu,
      available: true,
      timeSlots: [{ startTime: '09:00' }]
    },
    {
      day: Days.Fri,
      available: true,
      timeSlots: [{ startTime: '09:00' }]
    },
    {
      day: Days.Sat,
      available: false,
      timeSlots: undefined
    },
    {
      day: Days.Sun,
      available: false,
      timeSlots: undefined
    }
  ])

  return { state, eventDays }
})
