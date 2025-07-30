<template>
 <div class=" max-w-4xl mx-auto px-4 py-10">
  <h1 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Dashboard Overview</h1>

  <div v-if="loading" class="text-gray-500 dark:text-gray-300">Loading...</div>
  <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">


   <div class="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
    <p class="text-gray-500 dark:text-gray-300 text-sm">Admins</p>
    <p class="text-2xl font-semibold text-green-600 dark:text-green-400">{{ admins }}</p>
   </div>

   <div class="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
    <p class="text-gray-500 dark:text-gray-300 text-sm">Regular Users</p>
    <p class="text-2xl font-semibold text-purple-600 dark:text-purple-400">{{ users }}</p>
   </div>

   <div class="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
    <p class="text-gray-500 dark:text-gray-300 text-sm">Total Users</p>
    <p class="text-2xl font-semibold text-blue-600 dark:text-blue-400">{{ animatedTotal }}</p>
   </div>
  </div>
 </div>
</template>

<script setup lang="ts">
import type {User} from "../types/User";

definePageMeta({
 middleware: ['auth']
})
import { useAnimatedCounter } from '~/composables/useAnimatedCounter'

const { data, pending: loading } = await useFetch<User[]>('/api/users')

const total = computed(() => data.value?.length ?? 0)
const admins = computed(() => data.value?.filter(u => u.role === 'admin').length ?? 0)
const users = computed(() => data.value?.filter(u => u.role === 'user').length ?? 0)
const animatedTotal = useAnimatedCounter(total.value, 1000)
</script>
