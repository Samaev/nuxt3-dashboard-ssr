<template>
 <div class="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col gap-5 text-center">
   <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-5">
    Welcome to Nuxt SSR Dashboard
   </h1>
   <template  v-if="!auth.isAuthenticated">
    <p class="text-gray-600 dark:text-gray-300 mb-6">
     Please log in to access your dashboard.
    </p>

    <NuxtLink
      to="/login"
      class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
    >
     Login
    </NuxtLink>
   </template>

   <NuxtLink
     v-else
     to="/dashboard"
     class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md"
   >
    Go to Dashboard
   </NuxtLink>
  </div>
 </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()
</script>
