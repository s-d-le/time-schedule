<script setup lang="ts">
import { onMounted, toRaw } from 'vue'
import { storeToRefs } from 'pinia'
import { useBookingStore } from '@/stores/booking'
import { format } from 'date-fns'

import { ScheduleXCalendar } from '@schedule-x/vue'
import { createCalendar, viewDay, viewWeek } from '@schedule-x/calendar'
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

    const startTime = new Date(firstMatchingDayDate)
    const endTime = new Date(firstMatchingDayDate)

    // Extract hours and minutes from time slot strings
    const [startHours, startMinutes] = timeSlot.start.split(':')
    const [endHours, endMinutes] = (timeSlot.end ?? timeSlot.start).split(':')

    // Set hours and minutes to start and end dates
    startTime.setHours(parseInt(startHours))
    startTime.setMinutes(parseInt(startMinutes))
    endTime.setHours(parseInt(endHours))
    endTime.setMinutes(parseInt(endMinutes))

    // Push calendar entry
    calendar.push({
      id: calendar.length,
      title: eventDay.title,
      start: format(startTime, 'yyyy-MM-dd HH:mm'),
      end: format(endTime, 'yyyy-MM-dd HH:mm')
    })
  })
})

console.log('calendar', calendar)

onMounted(() => {
  console.log(eventsData)
})

const today = format(new Date(), 'yyyy-MM-dd')

// Calendar setup
const calendarApp = createCalendar({
  selectedDate: today,
  views: [viewDay, viewWeek],
  defaultView: viewWeek.name,
  dayBoundaries: {
    start: '06:00',
    end: '18:00'
  },
  events: calendar
  // events: [
  //   {
  //     id: 1,
  //     title: 'Event 1',
  //     start: '2023-12-19 08:00',
  //     end: '2023-12-19 12:00'
  //   },
  //   {
  //     id: 2,
  //     title: 'Event 1',
  //     start: '2023-12-19 12:00',
  //     end: '2023-12-19 14:00'
  //   },
  //   {
  //     id: 3,
  //     title: 'Event 2',
  //     start: '2023-12-20 12:00',
  //     end: '2023-12-20 13:00'
  //   }
  // ]
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
