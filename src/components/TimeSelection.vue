<script setup lang="ts">
import { ref } from 'vue'

defineProps()
</script>

<template>
  //drop down slection for start time
  <div class="form-control">
    <label for="start-time">Start Time</label>
    <select id="start-time">
      <option value="00:00">12:00 AM</option>
      <option value="00:30">12:30 AM</option>
      <option value="01:00">1:00 AM</option>
      <option value="01:30">1:30 AM</option>
      <option value="02:00">2:00 AM</option>
      <option value="02:30">2:30 AM</option>
      <option value="03:00">3:00 AM</option>
      <option value="03:30">3:30 AM</option>
      <option value="04:00">4:00 AM</option>
      <option value="04:30">4:30 AM</option>
      <option value="05:00">5:00 AM</option>
      <option value="05:30">5:30 AM</option>
      <option value="06:00">6:00 AM</option>
      <option value="06:30">6:30 AM</option>
      <option value="07:00">7:00 AM</option>
      <option value="07:30">7:30 AM</option>
      <option value="08:00">8:00 AM</option>
      <option value="08:30">8:30 AM</option>
      <option value="09:00">9:00 AM</option>
      <option value="09:30">9:30 AM</option>
      <option value="10:00">10:00 AM</option>
      <option value="10:30">10:30 AM</option>
      <option value="11:00">11:00 AM</option>
      <option value="11:30">11:30 AM</option>
      <option value="12:00">12:00 PM</option>
      <option value="12:30">12:30 PM</option>
      <option value="13:00">1:00 PM</option>
      <option value="13:30">1:30 PM</option>
      <option value="14:00">2:00 PM</option>
    </select>
  </div>
</template>
