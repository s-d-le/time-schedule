import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { VisitDuration } from '@/types/visit-duration'

export const useBookingStore = defineStore('booking', () => {
  const state = reactive({
    visitDuration: VisitDuration['15m'],
    numberOfBooking: 1
  })

  return { state }
})
