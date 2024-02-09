import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export enum VisitDuration {
  '15m' = '15 min',
  '30m' = '30 min',
  '45m' = '45 min',
  '60m' = '60 min',
  '90m' = '90 min'
}

export const useBookingStore = defineStore('booking', () => {
  const state = reactive({
    visitDuration: VisitDuration['15m'],
    numberOfBooking: 1
  })

  return { state }
})
