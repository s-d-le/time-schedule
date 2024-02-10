<script setup lang="ts">
import { ref, reactive, isProxy, toRaw } from 'vue'
import { useBookingStore } from '@/stores/booking'
import { VisitDuration } from '@/types/visit-duration'
import { storeToRefs } from 'pinia'
import TimeSelection from '@/components/TimeSelection.vue'
import type { EventDay } from '@/types/event-day'

const store = storeToRefs(useBookingStore())

const settings = reactive({
  visitDuration: VisitDuration['15 min'],
  numberOfBooking: 1,
  videoTourCall: false
})

const setBookingSettings = () => {
  const { visitDuration, numberOfBooking } = settings
  store.state.value.visitDuration = visitDuration
  store.state.value.numberOfBooking = numberOfBooking
}

const timeSelection = ref<InstanceType<typeof TimeSelection>>()

const newTimeSlot = (eventDay: EventDay, index: number) => {
  // eventDay.timeSlots?.push({
  //   startTime: '00:00'
  // })
  // console.log(toRaw(eventDay))
  // if (timeSelection.value) {
  //   console.log(toRaw(timeSelection.value[index].endTime))
  // }
  //   eventDay.timeSlots?.push({
  //     startTime: '00:00'
  //   })
  // } else {
  //   eventDay.timeSlots = [
  //     {
  //       startTime: '00:00'
  //     }
  //   ]
  // }
  // console.log(timeSelection.value)
}
</script>

<template>
  <div class="container">
    <h1>Booking slot settings</h1>
    <form @submit.prevent="setBookingSettings">
      <div class="form-control">
        <label for="visitDuration">Visit duration</label>
        <select id="visitDuration" v-model="settings.visitDuration">
          <option
            v-for="duration in Object.values(VisitDuration)"
            :key="duration"
            :value="duration"
          >
            {{ duration }} min
          </option>
        </select>
      </div>
      <div class="form-control">
        <label for="numberOfBooking">Number of booking</label>
        <!-- max 48 -->
        <input v-model="settings.numberOfBooking" type="number" max="48" id="numberOfBooking" />
      </div>
      <div class="form-control">
        <label for="videoTourCall">Allow video tour call</label>
        <input type="checkbox" id="videoTourCall" v-model="settings.videoTourCall" />
      </div>
      <button class="btn">Next</button>
    </form>

    <div
      v-for="(eventDay, eventIndex) in store.eventDays.value"
      :key="eventDay.day"
      ref="timeSelection"
    >
      {{ eventDay.day }}
      <TimeSelection
        v-for="(timeSlot, timeSlotIntex) in eventDay.timeSlots"
        :key="eventDay.day + '-' + timeSlotIntex"
        :event-index="eventIndex"
        :time-slot-index="timeSlotIntex"
        :time-slot-entry="eventDay.day + '-' + timeSlotIntex"
        v-model="timeSlot.startTime"
        @click:add-more-slot="newTimeSlot(eventDay, timeSlotIntex)"
      />
    </div>
  </div>
</template>
