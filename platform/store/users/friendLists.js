import { createPinia } from 'pinia'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from './users'

export default createPinia()


export const useFriendListsStore = defineStore('friendLists', {
    state: () => ({ friendLists: [], currentfriendList: null }),
    actions: {
        async getFriendList(userId) {
            const res = await axios.get("http://localhost:3000/friendLists");
            this.friendLists = res.data;
            try {
                this.currentfriendList = this.friendLists.find(friendList => friendList.id === userId);
                return this.currentfriendList;
            }
            catch (err) {
                return false
            }
        },

        async changeFriendList(currentfriendList, friendFriendList) {
            try {
                this.currentfriendList = currentfriendList;
                await axios.put(
                    `http://localhost:3000/friendLists/${currentfriendList.id}`,
                    currentfriendList
                );

                await axios.put(
                    `http://localhost:3000/friendLists/${friendFriendList.id}`,
                    friendFriendList
                );                
            }
            catch (err) {
                alert('Ой! Что-то пошло не так..')
            }
        },

        getNewFriendList(id) {
            const newFriendList = this.friendLists.find(friendList => friendList.id === id)
            return newFriendList
        }
    }
})