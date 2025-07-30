<template>
 <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">

  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
   <div class="flex justify-between h-16 items-center">
    <!-- Logo -->
    <NuxtLink to="/" class="text-xl font-bold text-blue-600 dark:text-blue-400">
     Nuxt SSR Dashboard
    </NuxtLink>

    <client-only>
     <NuxtLink to="/profile">
      <div
        v-if="auth.isAuthenticated"
        class="flex  items-center gap-4 justify-center text-center"
      >
       <div
         class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm"
         :title="auth.user?.name"
       >
        {{ initials }}
       </div>
       <div
         class="mt-1 text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full"
       >
        {{ auth.user?.role }}
       </div>
      </div>
     </NuxtLink>
    </client-only>
    <!-- Desktop Menu -->
    <div class="hidden md:flex gap-6 items-center">
     <NuxtLink
       to="/"
       class="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
     >
      Home
     </NuxtLink>
     <client-only>
      <NuxtLink
        v-if="auth.isAuthenticated && auth.isAdmin"
        to="/users"
        class="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
      >
       Users
      </NuxtLink>
      <NuxtLink
        v-if="auth.isAuthenticated"
        to="/dashboard"
        class="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
      >
       Dashboard
      </NuxtLink>

      <button
        v-if="auth.isAuthenticated"
        @click="logoutFromSystem"
        class="text-red-600 dark:text-red-400 hover:underline"
      >
       Logout
      </button>

      <NuxtLink
        v-else
        to="/login"
        class="text-green-600 dark:text-green-400 hover:underline"
      >
       Login
      </NuxtLink>
     </client-only>
    </div>

    <!-- Mobile Menu Button -->
    <button
      class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none"
      @click="isMobileOpen = !isMobileOpen"
    >
     <span class="sr-only">Open main menu</span>
     <svg
       class="h-6 w-6"
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
       stroke="currentColor"
       aria-hidden="true"
     >
      <path
        v-if="!isMobileOpen"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
      <path
        v-else
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
     </svg>
    </button>
   </div>

   <!-- Mobile Menu -->
   <div v-if="isMobileOpen" class="md:hidden mt-2 space-y-2">
    <NuxtLink
      to="/"
      class="block text-gray-700 dark:text-gray-200 hover:text-blue-500 px-2 py-1"
      @click="isMobileOpen = false"
    >
     Home
    </NuxtLink>

    <client-only>
     <NuxtLink
       v-if="auth.isAuthenticated && auth.isAdmin"
       to="/users"
       class="block text-gray-700 dark:text-gray-200 hover:text-blue-500 px-2 py-1"
       @click="isMobileOpen = false"
     >
      Users
     </NuxtLink>
     <NuxtLink
       v-if="auth.isAuthenticated"
       to="/dashboard"
       class="block text-gray-700 dark:text-gray-200 hover:text-blue-500 px-2 py-1"
       @click="isMobileOpen = false"
     >
      Dashboard
     </NuxtLink>

     <button
       v-if="auth.isAuthenticated"
       @click="logoutFromSystem"
       class="block text-red-600 dark:text-red-400 hover:underline px-2 py-1"
     >
      Logout
     </button>

     <NuxtLink
       v-else
       to="/login"
       class="block text-green-600 dark:text-green-400 hover:underline px-2 py-1"
       @click="isMobileOpen = false"
     >
      Login
     </NuxtLink>
    </client-only>
   </div>
  </nav>
 </header>
</template>

<script setup lang="ts">
const auth = useAuthStore()
const isMobileOpen = ref(false)
const initials = computed(() => useInitials(auth.user?.name))
const logoutFromSystem = async () => {
 auth.logout()
 isMobileOpen.value = false
 await navigateTo('/')
}
</script>
