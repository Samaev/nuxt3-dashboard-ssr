// middleware/auth.ts
export default defineNuxtRouteMiddleware(() => {
    const auth = useAuthStore()
    if (!auth || !auth.isAuthenticated) {
        return navigateTo('/login')
    }
})
