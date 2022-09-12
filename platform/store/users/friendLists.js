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

        async changeFriendList(currentfriendList) {
            try {
                await axios.put(
                    `http://localhost:3000/friendLists/${currentfriendList.id}`,
                    currentfriendList
                )
            }
            catch (err) {
                alert('Ой! Что-то пошло не так..')
            }
        },

        async mutualChange(friend, isAdd) {
            try {
                const userStore = useUserStore()
                const user = userStore.currentUser
                let anotherFriendlist = this.friendLists.find(friendList => friendList.id === friend.id);
                if (!isAdd) {
                    anotherFriendlist.friends = anotherFriendlist.friends.filter(el => el.id !== user.id)
                }
                else {
                    anotherFriendlist.friends.push({ id: `${user.id}`, name: `${user.name}` })
                }
                await axios.put(
                    `http://localhost:3000/friendLists/${friend.id}`,
                    anotherFriendlist
                )
            }
            catch (err) {
                alert('Ой! Что-то пошло не так..')
            }
        }
    }
})