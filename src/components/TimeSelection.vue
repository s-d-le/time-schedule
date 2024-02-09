<script setup lang="ts">
defineProps<{
  endTime: string | undefined
}>()

const startTime = defineModel()

const emits = defineEmits(['update:endTime', 'click:addMoreSlot'])
</script>

<template>
  <div>
    <input type="time" id="startTime" v-model="startTime" @change="emits('update:endTime')" />
    <span>-</span>
    <input type="time" id="endTime" :value="endTime" disabled />
    <span @click="$emit('click:addMoreSlot')">+</span>
  </div>
</template>
