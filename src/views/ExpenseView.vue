<script setup lang="ts">
import ShowBalance from '@/components/ShowBalance.vue'
import IncomeExpense from '@/components/IncomeExpense.vue'
import TransactionList from '@/components/TransactionList.vue'
import AddTransaction from '@/components/AddTransaction.vue'

import { storeToRefs } from 'pinia'
import { useExpenseStore } from '@/stores/expense'

const store = useExpenseStore()

const { expenses } = storeToRefs(store)
</script>

<template>
  <div class="container">
    <h1>This is expense page</h1>
    <ShowBalance />
    <IncomeExpense />
    <TransactionList :transactions="expenses" />
    <AddTransaction />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
