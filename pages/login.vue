<template>
 <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
  <div class="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
   <h2 class="text-center text-2xl font-bold text-gray-800 dark:text-white mb-6">
    Login to Dashboard
   </h2>

   <form @submit.prevent="handleLogin" class="space-y-4">
    <div>
     <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
      Email
     </label>
     <input
       v-model="email"
       id="email"
       type="email"
       required
       class="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
     />
    </div>

    <div>
     <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
      Password
     </label>
     <input
       v-model="password"
       id="password"
       type="password"
       required
       autocomplete=true
       class="mt-1 w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
     />
    </div>

    <div v-if="error" class="text-red-600 dark:text-red-400 text-sm">
     {{ error }}
    </div>

    <button
      type="submit"
      class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
    >
     Login
    </button>
   </form>
  </div>
 </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import type {User} from "../types/User";

definePageMeta({
 middleware: ['guest-only']
})

const auth = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
 error.value = ''

 try {
  const { data, error: fetchError } = await useFetch('/api/login', {
   method: 'POST',
   body: {
    email: email.value,
    password: password.value
   }
  })

  if (fetchError.value) throw new Error(fetchError.value.statusMessage)
  if (!data.value) throw new Error('Invalid response')

  auth.setUser(data.value) // функция setUser — сохранить в стор user
  await navigateTo('/dashboard')

 } catch (err: any) {
  error.value = err.message || 'Login failed'
 }
}
</script>
