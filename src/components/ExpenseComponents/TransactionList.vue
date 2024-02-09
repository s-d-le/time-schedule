<script setup lang="ts">
import type { IExpense } from '@/types/expense'
// const deleteTransaction = (id: number) => {
//   transactions.value = transactions.value.filter((transaction) => transaction.id !== id)
// }
</script>

<template>
  <h3>History</h3>
  <ul id="list" class="list">
    <!-- <li class="minus">Cash <span>-$400</span><button class="delete-btn">x</button></li>
    <li class="plus">Cash <span>$800</span><button class="delete-btn">x</button></li> -->
    <li
      v-for="transaction in expenses"
      :key="transaction.id"
      :class="transaction.amount < 0 ? 'minus' : 'plus'"
    >
      {{ transaction.text }}
      <span>{{ transaction.amount < 0 ? '-' : '' }}${{ Math.abs(transaction.amount) }}</span
      ><button class="delete-btn" data-click="deleteTransaction(transaction.id)">x</button>
    </li>
  </ul>
</template>
