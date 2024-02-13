<script setup lang="ts">
import { toRaw } from 'vue'
import { storeToRefs } from 'pinia'
import { useBookingStore } from '@/stores/booking'
import { format, addMinutes, parse, getHours, getMinutes } from 'date-fns'

import { ScheduleXCalendar } from '@schedule-x/vue'
import { createCalendar, viewDay, viewWeek } from '@schedule-x/calendar'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import '@schedule-x/theme-default/dist/index.css'

const store = storeToRefs(useBookingStore())
const eventsData = toRaw(store.eventDays.value)

const dayIndexMap = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6
}

interface CalendarEvent {
  id: number
  title?: string
  start?: string
  end?: string
}

const calendar: CalendarEvent[] = []

const numberOfBooking = store.state.value.numberOfBooking
const visitDuration = parseInt(store.state.value.visitDuration)

eventsData.forEach((eventDay) => {
  const dayIndex = dayIndexMap[eventDay.day] // Get the index of the day in a week
  const currentDate = new Date() // Get the current date
  const currentDateDayIndex = currentDate.getDay() // Get the index of the current day in a week

  // Calculate the date of the first matching day of the week
  const firstMatchingDayDate = new Date(currentDate)
  firstMatchingDayDate.setDate(
    firstMatchingDayDate.getDate() + ((dayIndex - currentDateDayIndex + 7) % 7)
  )

  // Iterate over timeSlots and create calendar entries
  eventDay.timeSlots.forEach((timeSlot) => {
    if (!timeSlot.end) return // Skip time slots without end time

    // Keep clean to track the day of the week
    const startEventDate = new Date(firstMatchingDayDate) //Mon Feb 12 2024 08:17:22 GMT+0100 ...
    const endEventDate = new Date(firstMatchingDayDate)

    //loop through timeSlot and create events based on numberOfBooking and visitDuration
    for (let i = 0; i < numberOfBooking; i++) {
      const startTimeSlot = parse(timeSlot.start, 'HH:mm', new Date())
      const startBooking = addMinutes(startTimeSlot, i * visitDuration)
      const endBooking = addMinutes(startBooking, visitDuration)

      // Set hours and minutes to start and end dates
      startEventDate.setHours(getHours(startBooking))
      startEventDate.setMinutes(getMinutes(startBooking))
      endEventDate.setHours(getHours(endBooking))
      endEventDate.setMinutes(getMinutes(endBooking))

      // Push calendar entry
      calendar.push({
        id: calendar.length,
        title: eventDay.title,
        start: format(startEventDate, 'yyyy-MM-dd HH:mm'),
        end: format(endEventDate, 'yyyy-MM-dd HH:mm')
      })
    }
  })
})

const today = format(new Date(), 'yyyy-MM-dd')

// Calendar setup
const calendarApp = createCalendar({
  selectedDate: today,
  views: [viewDay, viewWeek],
  defaultView: viewWeek.name,
  dayBoundaries: {
    start: '06:00',
    end: '20:00'
  },
  events: calendar,
  plugins: [createEventModalPlugin()]
})
</script>

<template>
  <div class="calendar-wrapper">
    <ScheduleXCalendar :calendar-app="calendarApp" />
  </div>
</template>

<style scoped>
.calendar-wrapper {
  height: 1200px;
}
</style>
