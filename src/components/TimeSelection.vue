<script setup lang="ts">
import { computed } from 'vue'
import { useBookingStore } from '@/stores/booking'
import { format } from 'date-fns'
import { storeToRefs } from 'pinia'

const store = storeToRefs(useBookingStore())

const startTime = defineModel()

const endTime = computed(() => {
  const start = new Date(`2024-01-01T${startTime.value}`)
  // Calculate end time
  const end = new Date(
    start.getTime() +
      parseInt(store.state.value.visitDuration) * store.state.value.numberOfBooking * 60000
  )
  return format(end, 'HH:mm')
})

defineEmits(['click:addMoreSlot'])
</script>

<template>
  <div>
    <input type="time" id="startTime" v-model="startTime" />
    <span>-</span>
    <input type="time" id="endTime" :value="endTime" disabled />
    <span @click="$emit('click:addMoreSlot')">+</span>
  </div>
</template>
