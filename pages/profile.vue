<template>
 <div class="max-w-xl mx-auto py-10 px-4">
  <h1 class="text-2xl font-bold mb-6">Profile</h1>

  <form @submit.prevent="saveProfile" class="space-y-6">
   <div>
    <label class="block mb-1 font-medium">Name</label>
    <input
      v-model="form.name"
      type="text"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      placeholder="Enter your name"
    />
   </div>

   <div>
    <label class="block mb-1 font-medium">Email (unchangeable)</label>
    <input
      v-model="form.email"
      type="email"
      disabled
      class="input w-full opacity-60 cursor-not-allowed"
    />
   </div>

   <div>
    <label class="block mb-1 font-medium">Country</label>
    <Multiselect
      v-model="form.country"
      :options="countries"
      placeholder="Select your country"
      searchable
      class="multiselect w-full"
    />
   </div>

   <div>
    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
     Save
    </button>
   </div>
  </form>
 </div>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2'
import Multiselect from '@vueform/multiselect'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
 middleware: ['auth']
})

const auth = useAuthStore()

const form = reactive({
 name: auth.user?.name || '',
 email: auth.user?.email || '',
 country: auth.user?.country || ''
})

const { data: countriesData } = await useFetch('https://restcountries.com/v3.1/all?fields=name')

const countries = computed(() =>
  countriesData.value?.map((c: any) => c.name.common).sort() ?? []
)

const saveProfile = async () => {
 auth.user = {
  ...auth.user,
  name: form.name,
  country: form.country
 }

 await Swal.fire({
  icon: 'success',
  title: 'Profile updated',
  text: "We have just imitated saving your data :)",
  showConfirmButton: false,
  timer: 2000
 })
}
</script>

<style scoped>

</style>
