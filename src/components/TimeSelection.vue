<script setup lang="ts">
import { computed } from 'vue'
import { useBookingStore } from '@/stores/booking'
import { format } from 'date-fns'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  timeSlotEntry: string
  eventIndex: number
  timeSlotIndex: number
}>()

const store = storeToRefs(useBookingStore())
const rawStore = useBookingStore()

const timeslotStore = rawStore.eventDays[props.eventIndex].timeSlots[props.timeSlotIndex]

const startTime = defineModel<string>()

const endTime = computed(() => {
  const start = new Date(`2024-02-12T${startTime.value}`)
  // Calculate end time
  const end = new Date(
    start.getTime() +
      parseInt(store.state.value.visitDuration) * store.state.value.numberOfBooking * 60000
  )

  return format(end, 'HH:mm')
})

timeslotStore.end = endTime.value
//push new time slot with startTime as endTime of the previous time slot
const addMoreSlot = () => {
  rawStore.eventDays[props.eventIndex].timeSlots.push({
    start: endTime.value
  })
}

const removeSlot = () => {
  rawStore.eventDays[props.eventIndex].timeSlots.splice(props.timeSlotIndex, 1)
}

defineEmits(['click:addMoreSlot'])

defineExpose({
  endTime
})

const inputClass =
  'max-w-24 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark dark:focus:border-blue-500'
</script>

<template>
  <div class="flex items-center gap-2">
    <input type="time" :class="inputClass" id="startTime" v-model="startTime" />
    <span class="font-bold">-</span>
    <input type="time" :class="inputClass" id="endTime" :value="endTime" disabled />
    <!-- <span @click="$emit('click:addMoreSlot')">+</span> -->
    <span
      class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
      @click="removeSlot"
      >-</span
    >
    <span
      class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
      @click="addMoreSlot"
      >+</span
    >
  </div>
</template>
