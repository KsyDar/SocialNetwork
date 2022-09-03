import { createPinia } from 'pinia'
import { defineStore } from 'pinia'
import axios from 'axios'

export default createPinia()

export const useToDoListsStore = defineStore('toDoLists', {
    state: () => ({ toDoLists: [], currentToDoList: null }),
    actions: {
        async getToDoList(userId) {
            const res = await axios.get("http://localhost:3000/toDoLists");
            this.toDoLists = res.data;
            try {
                this.currentToDoList = this.toDoLists.find(toDoList => toDoList.id === userId)
                return this.currentToDoList.toDos
            }
            catch(err) {
                console.log("There is no to-do list with this id");
            }
        }
    }
})