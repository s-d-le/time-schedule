<script setup lang="ts">
import ShowBalance from '@/components/ExpenseComponents/ShowBalance.vue'
import IncomeExpense from '@/components/ExpenseComponents/IncomeExpense.vue'
import TransactionList from '@/components/ExpenseComponents/TransactionList.vue'
import AddTransaction from '@/components/ExpenseComponents/AddTransaction.vue'

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
