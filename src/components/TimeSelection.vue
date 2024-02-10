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
  const start = new Date(`2024-01-01T${startTime.value}`)
  // Calculate end time
  const end = new Date(
    start.getTime() +
      parseInt(store.state.value.visitDuration) * store.state.value.numberOfBooking * 60000
  )
  return format(end, 'HH:mm')
})

timeslotStore.endTime = endTime.value
//push new time slot with startTime as endTime of the previous time slot
const addMoreSlot = () => {
  rawStore.eventDays[props.eventIndex].timeSlots.push({
    startTime: endTime.value
  })
}

const removeSlot = () => {
  rawStore.eventDays[props.eventIndex].timeSlots.splice(props.timeSlotIndex, 1)
}

defineEmits(['click:addMoreSlot'])

defineExpose({
  endTime
})
</script>

<template>
  <div>
    <input type="time" id="startTime" v-model="startTime" />
    <span>-</span>
    <input type="time" id="endTime" :value="endTime" disabled />
    <!-- <span @click="$emit('click:addMoreSlot')">+</span> -->
    <span @click="removeSlot">-</span>
    <span @click="addMoreSlot">+</span>
  </div>
</template>
