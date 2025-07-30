import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,

  typescript : {
    strict: true
  },

  modules: ['@pinia/nuxt'],
  css: ['@/assets/css/main.css', '@vueform/multiselect/themes/default.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/jpg',
          href: '/cs.jpg'
        }
      ]
    }
  }
})