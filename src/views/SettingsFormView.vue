<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useBookingStore } from '@/stores/booking'
import { VisitDuration } from '@/types/visit-duration'
import { format } from 'date-fns'
import { storeToRefs } from 'pinia'

const store = useBookingStore()
// const { visitDuration, numberOfBooking } = store.state
const refs = storeToRefs(store)

console.log(refs.state.value.visitDuration)

const settings = reactive({
  visitDuration: VisitDuration['15m'],
  numberOfBooking: 1,
  videoTourCall: false
})

const setBookingSettings = () => {
  const { visitDuration, numberOfBooking } = settings
  store.state.visitDuration = visitDuration
  store.state.numberOfBooking = numberOfBooking
  updateEndTime()
}

const startTime = ref<string>('09:00')
const endTime = ref<string>()

const updateEndTime = () => {
  const start = new Date(`2024-01-01T${startTime.value}`)
  const end = new Date(start.getTime() + settings.visitDuration * settings.numberOfBooking * 60000) // Calculate end time
  endTime.value = format(end, 'HH:mm')
}

onMounted(() => {
  updateEndTime()
})
</script>

<template>
  <div class="container">
    <h1>Booking slot settings</h1>
    <form @submit.prevent="setBookingSettings">
      <div class="form-control">
        <label for="visitDuration">Visit duration</label>
        <select id="visitDuration" v-model="settings.visitDuration">
          <option v-for="duration in VisitDuration" :key="duration" :value="duration">
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

    <div>
      <input type="time" id="startTime" v-model="startTime" @change="updateEndTime" />
      <span>-</span>
      <input type="time" id="endTime" v-model="endTime" disabled />
    </div>
  </div>
</template>
