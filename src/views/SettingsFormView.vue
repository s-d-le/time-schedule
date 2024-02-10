<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useBookingStore } from '@/stores/booking'
import { VisitDuration } from '@/types/visit-duration'
import { storeToRefs } from 'pinia'
import TimeSelection from '@/components/TimeSelection.vue'

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

    <div v-for="eventDay in store.eventDays.value" :key="eventDay.day">
      {{ eventDay.day }}
      <TimeSelection
        v-for="(timeSlot, index) in eventDay.timeSlots"
        :key="eventDay.day + '-' + index"
        :time-slot-entry="eventDay.day + '-' + index"
        v-model="timeSlot.startTime"
        @click:add-more-slot="console.log('add more slot')"
      />
    </div>
  </div>
</template>
