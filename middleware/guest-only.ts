// middleware/guest-only.ts
export default defineNuxtRouteMiddleware(() => {
    const auth = useAuthStore()
    if (auth.isAuthenticated) {
        return navigateTo('/dashboard')
    }
})
