<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBookingStore } from '@/stores/booking'

import { ScheduleXCalendar } from '@schedule-x/vue'
import {
  createCalendar,
  viewDay,
  viewWeek,
  viewMonthGrid,
  viewMonthAgenda
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'

const store = storeToRefs(useBookingStore())

onMounted(() => {
  console.log(store.eventDays.value)
})

// Calendar setup
const calendarApp = createCalendar({
  selectedDate: '2023-12-19',
  views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
  defaultView: viewWeek.name,
  events: [
    {
      id: 1,
      title: 'Event 1',
      start: '2023-12-19',
      end: '2023-12-19'
    },
    {
      id: 2,
      title: 'Event 2',
      start: '2023-12-20 12:00',
      end: '2023-12-20 13:00'
    }
  ]
})
</script>

<template>
  <div class="flex about">
    <h1>Calendar Page</h1>
    <div>
      <ScheduleXCalendar :calendar-app="calendarApp" />
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
