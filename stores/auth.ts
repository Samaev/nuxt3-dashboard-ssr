import { defineStore } from 'pinia'
import type {User} from "../types/User";


export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null
    }),
    getters: {
        isAuthenticated: state => !!state.user,
        isAdmin: state => state.user?.role === 'admin'
    },
    actions: {
        setUser(user: User) {
            this.user = user
        },
        logout() {
            this.user = null
        }
    },
    persist: true
})
