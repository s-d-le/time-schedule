import { defineStore } from 'pinia'
import { mande } from 'mande'
import { reactive, computed } from 'vue'
import type { IExpense } from '@/types/expense'

const client = mande('https://65c5560ce5b94dfca2dff4ac.mockapi.io/api/Expenses')

export const useExpenseStore = defineStore('expense', () => {
  const state = reactive({
    expenses: [] as IExpense[]
  })

  const getExpenses = async () => {
    try {
      const data = await client.get<IExpense[]>('/')
      state.expenses = data
    } catch (error) {
      console.log('error', error)
    }
  }

  getExpenses()

  const expenses = computed<IExpense[]>(() => state.expenses)

  // function addExpense(expense: Expense) {
  //   expenses.push(expense)
  // }

  // function removeExpense(id: number) {
  //   const index = expenses.findIndex((expense) => expense.id === id)
  //   expenses.splice(index, 1)
  // }

  return {
    expenses
  }
})
