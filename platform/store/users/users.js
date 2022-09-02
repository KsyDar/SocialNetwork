import { createPinia } from 'pinia'
import { defineStore } from 'pinia'

export default createPinia()

export const useUserStore = defineStore('users', {
    state: () => ({users: [], currentUser: null}),
    actions: {
        login(userName, password) {

        }
    }
})