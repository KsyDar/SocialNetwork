<template>
  <button class="default-button button-exit" @click="exitFromProfile">Выйти</button>
  <div class="main-content">
    <div class="home-wrapper">
      <div class="home__profile">
        <img class="profile__avatar" :src="user.avatar" />
        <div class="profile__information">
          <h1 class="profile__title">{{ user.name }}</h1>
          <p><span class="bold-segment">Возраст:</span> {{ user.age }}</p>
          <p>
            <span class="bold-segment">О себе:</span> {{ user.description }}
          </p>
          <div class="profile__information__item">
            <router-link :to="{ name: 'FriendList', params: { id: props.id } }">
              Друзья
            </router-link>
            <button
              class="default-button button--add"
              @click="goToChangeProfile"
            >
              Редактировать
            </button>
          </div>
        </div>
      </div>
      <ToDoList :toDoList="toDoList" />
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useUserStore } from "../../../platform/store/users/users";
import { useToDoListsStore } from "../../../platform/store/toDoLists/toDoLists";
import router from "../../../platform/router";

import ToDoList from "../../components/ToDoList.vue";

const props = defineProps({
  id: String,
});

const userStore = useUserStore();
const toDoListStore = useToDoListsStore();

const user = ref({});
const friendList = ref([]);
const toDoList = ref([]);

onBeforeMount(async () => {
  toDoList.value = await toDoListStore.getToDoList(props.id);
  user.value = userStore.currentUser;
  friendList.value = userStore.currentUser.friendList;
});

const goToChangeProfile = () => {
  router.push({ name: "ChangeProfile", params: { id: props.id } });
};

const exitFromProfile = () => {
  router.push({ name: "AuthPage" });
}
</script>

<style>
.button-exit {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.home__profile {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.profile__avatar {
  width: 20rem;
  border-radius: 25%;
  border: solid 3px #6629cd;
  margin-right: 1rem;
}

.profile__information {
  width: 60%;
  font-size: 1.5rem;
  background: #d3d2d645;
  border-radius: 7px;
  padding: 0.5rem;
}

.profile__information__item {
  display: flex;
  align-items: center;
}

.profile__title {
  margin-top: 0;
  font-size: 2.5rem;
}

.bold-segment {
  font-weight: 600;
  color: #6e4fa3;
}

.profile__button {
  margin-top: 3rem;
  border: solid 2px #8864c6;
  padding: 3px 7px;
  border-radius: 7px;
  font-weight: 600;
  color: #8864c6;
}

.profile__button:hover {
  background: #dac4eb;
  cursor: pointer;
}
</style>