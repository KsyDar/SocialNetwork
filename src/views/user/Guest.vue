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
                <router-link :to="{ name: 'Guest', params: { friendId: friend.id } }">{{ friend.name }}</router-link>
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
const user = computed(() => userStore.getFriend(props.friendId))

const friendListsStore = useFriendListsStore()
const friendList = computed(() => friendListsStore.getNewFriendList(props.friendId))
</script>

<style scoped>
</style>