<script setup lang="ts">
import { reactive } from 'vue'
import { useBookingStore, VisitDuration } from '@/stores/booking'

const store = useBookingStore()

const settings = reactive({
  visitDuration: VisitDuration['15m'],
  numberOfBooking: 1,
  videoTourCall: false
})

const setBookingSettings = () => {
  console.log('settings', settings)
}
</script>

<template>
  <div class="container">
    <h1>Booking slot settings</h1>
    <form @submit.prevent="setBookingSettings">
      <div class="form-control">
        <label for="visitDuration">Visit duration</label>
        <select id="visitDuration" v-model="settings.visitDuration">
          <option v-for="duration in VisitDuration" :key="duration" :value="duration">
            {{ duration }}
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
  </div>
</template>
