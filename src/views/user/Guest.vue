<template>
  <div class="main-content">
    <div class="home-wrapper">
      <div class="home__profile">
        <img class="profile__avatar" :src="user.avatar" alt="" />
        <div class="profile__information">
          <h1 class="profile__title">{{ user.name }}</h1>
          <p><span class="bold-segment">Возраст:</span> {{ user.age }}</p>
          <p>
            <span class="bold-segment">О себе:</span> {{ user.description }}
          </p>
          <div class="bold-segment">
            Друзья:
            <ul>
              <li v-for="friend of friendList.friends" :key="friend.id">
                <a href="" @click="goToFriend(friend.id)">{{ friend.name }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core"
import { useFriendListsStore } from "../../../platform/store/users/friendLists"
import { useUserStore } from "../../../platform/store/users/users"

const props = defineProps({
    friendId: String,
})

const userStore = useUserStore()
const user = computed(() => userStore.getFriendById(props.friendId))

const friendListsStore = useFriendListsStore()
const friendList = computed(() => friendListsStore.getNewFriendList(props.friendId))

function goToFriend(id) {
  if(props.friendId === userStore.currentUser.id) {
    router.push({ name: 'Home'})
  }
  else {
    router.push({ name: 'Guest', params: {id: id }})
  }
}
</script>

<style scoped>
</style>