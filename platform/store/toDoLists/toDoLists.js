import { createPinia } from 'pinia'
import { defineStore } from 'pinia'
import axios from 'axios'

export default createPinia()

export const useToDoListsStore = defineStore('toDoLists', {
    state: () => ({ toDoLists: [], currentToDoList: null }),
    actions: {
        async getToDoList(userId) {
            if (this.currentToDoList === null) {
                const res = await axios.get("http://localhost:3000/toDoLists");
                this.toDoLists = res.data;
                try {
                    this.currentToDoList = this.toDoLists.find(toDoList => toDoList.id === userId)
                }
                catch (err) {
                    console.log("There is no to-do list with this id");
                }
            }
            return this.currentToDoList
        },

        async changeToDoList(currentToDoList) {
            try {
                this.currentToDoList = currentToDoList
                await axios.put(
                    `http://localhost:3000/toDoLists/${currentToDoList.id}`,
                    this.currentToDoList
                )
            }
            catch (err) {
                console.log("There is no to-do list with this id");
            }
        }
    }
})