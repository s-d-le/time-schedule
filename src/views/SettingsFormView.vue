<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useBookingStore } from '@/stores/booking'
import { VisitDuration } from '@/types/visit-duration'
import { format } from 'date-fns'
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
  updateEndTime()
}

const startTime = ref<string>('09:00')
const endTime = ref<string>()

const updateEndTime = () => {
  const start = new Date(`2024-01-01T${startTime.value}`)
  const end = new Date(
    start.getTime() +
      parseInt(store.state.value.visitDuration) * store.state.value.numberOfBooking * 60000
  ) // Calculate end time
  endTime.value = format(end, 'HH:mm')
  console.log(endTime.value)
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
        v-for="timeSlot in eventDay.timeSlots"
        :key="timeSlot.startTime"
        v-model="timeSlot.startTime"
        :end-time="timeSlot.endTime"
        @update:end-time="updateEndTime"
        @click:add-more-slot="console.log('add more slot')"
      />
    </div>

    <TimeSelection
      v-model="startTime"
      :end-time="endTime"
      @update:end-time="updateEndTime"
      @click:add-more-slot="console.log('add more slot')"
    />
  </div>
</template>
