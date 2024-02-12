<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useBookingStore } from '@/stores/booking'
import { VisitDuration } from '@/types/visit-duration'
import { storeToRefs } from 'pinia'
import TimeSelection from '@/components/TimeSelection.vue'

const store = storeToRefs(useBookingStore())
const rawStore = useBookingStore()

const showSchedule = ref<boolean>(false)

const settings = reactive({
  visitDuration: rawStore.state.visitDuration,
  numberOfBooking: rawStore.state.numberOfBooking,
  allowVideoTourCall: rawStore.state.allowVideoTourCall
})

const setBookingSettings = () => {
  showSchedule.value = true
  const { visitDuration, numberOfBooking } = settings
  store.state.value.visitDuration = visitDuration
  store.state.value.numberOfBooking = numberOfBooking
}

const toggleCheckBox = (eventIndex: number) => {
  if (rawStore.eventDays[eventIndex].available === false) {
    rawStore.eventDays[eventIndex].available = false
    rawStore.eventDays[eventIndex].timeSlots = []
  } else {
    rawStore.eventDays[eventIndex].available = true
    rawStore.eventDays[eventIndex].timeSlots = [{ start: '09:00' }]
  }
}

const timeSelection = ref<InstanceType<typeof TimeSelection>>()

const labelClass = 'mb-2 text-sm font-medium text-gray-900 dark:text-white'
const optionClass =
  'max-w-24 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark dark:focus:border-blue-500'
const checkboxClass = 'h-3 w-3 rounded border-gray-300 text-blue-500'
const buttonClass =
  'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
</script>

<template>
  <div class="container">
    <form @submit.prevent="setBookingSettings">
      <div class="mb-4">
        <label for="visitDuration" :class="labelClass">Visit duration</label>
        <select id="visitDuration" :class="optionClass" v-model="settings.visitDuration">
          <option
            v-for="duration in Object.values(VisitDuration)"
            :key="duration"
            :value="duration"
          >
            {{ duration }} min
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="numberOfBooking" :class="labelClass">Number of booking</label>
        <!-- max 48 -->
        <input
          v-model="settings.numberOfBooking"
          :class="optionClass"
          type="number"
          max="48"
          id="numberOfBooking"
        />
      </div>
      <div class="mb-4">
        <input
          type="checkbox"
          id="videoTourCall"
          :class="checkboxClass"
          v-model="settings.allowVideoTourCall"
        />
        <label for="videoTourCall" :class="labelClass">Allow video tour call</label>
      </div>
      <button :class="buttonClass">Next</button>
    </form>

    <div
      v-for="(eventDay, eventIndex) in store.eventDays.value"
      :key="eventDay.day"
      ref="timeSelection"
      data-class="grid grid-cols-[10px,100px,1fr] gap-4 mb-2 items-center"
    >
      <input
        type="checkbox"
        :class="checkboxClass"
        @id="eventDay"
        :checked="eventDay.available"
        v-model="eventDay.available"
        @change="toggleCheckBox(eventIndex)"
      />
      <span :class="['font-bold mb-0', labelClass]">{{ eventDay.day }}</span>
      <span v-if="eventDay.timeSlots.length === 0">Unavailable</span>
      <TimeSelection
        v-else
        v-for="(timeSlot, timeSlotIntex) in eventDay.timeSlots"
        :key="eventDay.day + '-' + timeSlotIntex"
        :event-index="eventIndex"
        :time-slot-index="timeSlotIntex"
        :time-slot-entry="eventDay.day + '-' + timeSlotIntex"
        v-model="timeSlot.start"
      />
    </div>
  </div>
</template>
