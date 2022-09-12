import { createPinia } from 'pinia'
import { defineStore } from 'pinia'
import axios from 'axios'

export default createPinia()


export const useUserStore = defineStore('users', {
    state: () => ({ users: [], currentUser: null }),
    actions: {
        async login(userName, password) {
            const res = await axios.get("http://localhost:3000/users");
            this.users = res.data;
            try {
                this.currentUser = this.users.find(user => user.userName === userName && user.password === password)
                return this.currentUser.id
            }
            catch (err) {
                return false
            }
        },

        async changeProfile(currentUser) {
            try {
                await axios.put(
                    `http://localhost:3000/users/${currentUser.id}`,
                    currentUser
                )
            }
            catch (err) {
                alert('Ой! Что-то пошло не так..')
            }
        }
    }
})