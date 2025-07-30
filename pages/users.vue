<template>
 <div class="max-w-6xl mx-auto px-4 py-10">
  <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">User Management</h1>

  <div class="flex flex-col md:flex-row gap-4 mb-6">
   <input
     v-model="search"
     type="text"
     placeholder="Search by name or email"
     class="w-full md:w-1/2 px-3 py-2 border rounded-md"
   />

   <select v-model="selectedCountry" class="w-full md:w-1/3 px-3 py-2 border rounded-md">
    <option value="">All Countries</option>
    <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
   </select>
  </div>

  <div class="overflow-x-auto">
   <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
    <div
      v-for="user in paginatedUsers"
      :key="user.id"
      class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition"
    >
     <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
      {{ user.name }}
     </h2>
     <p class="text-sm text-gray-500 dark:text-gray-300 mb-1">
      {{ user.email }}
     </p>

     <div class="flex items-center justify-between mt-4">
      <span
        class="text-xs px-2 py-0.5 rounded-full"
        :class="{
          'bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-white': user.role === 'admin',
          'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200': user.role !== 'admin'
        }"
      >
        {{ user.role }}
      </span>
      <span class="text-xs text-gray-400 dark:text-gray-300">
        {{ user.country }}
      </span>
     </div>
    </div>
   </div>

  </div>

  <div class="mt-6 flex justify-between items-center">
   <button
     class="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded"
     :disabled="page === 1"
     @click="page--"
   >
    Previous
   </button>
   <p class="text-gray-700 dark:text-gray-300">Page {{ page }} of {{ totalPages }}</p>
   <button
     class="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded"
     :disabled="page === totalPages"
     @click="page++"
   >
    Next
   </button>
  </div>
 </div>
</template>

<script setup lang="ts">
import type { User } from '~/types/User'

definePageMeta({
 middleware: ['admin-only']
})

const { data: allUsers } = useFetch<User[]>('/api/users')
const search = ref('')
const selectedCountry = ref('')
const page = ref(1)
const perPage = 10

const countries = computed(() => {
 return [...new Set(allUsers.value?.map(u => u.country))].sort()
})

const filteredUsers = computed(() => {
 return allUsers.value
   ?.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.value.toLowerCase()) ||
      user.email.toLowerCase().includes(search.value.toLowerCase())

    const matchesCountry = selectedCountry.value
      ? user.country === selectedCountry.value
      : true

    return matchesSearch && matchesCountry
   }) || []
})

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / perPage))
const paginatedUsers = computed(() => {
 const start = (page.value - 1) * perPage
 return filteredUsers.value.slice(start, start + perPage)
})

watch([search, selectedCountry], () => {
 page.value = 1
})
</script>
