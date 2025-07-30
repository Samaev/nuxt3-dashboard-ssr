export default defineNuxtRouteMiddleware(() => {
    const auth = useAuthStore()
    if (!auth || (!auth.isAuthenticated || !auth.isAdmin)) {
        return navigateTo('/')
    }
})
