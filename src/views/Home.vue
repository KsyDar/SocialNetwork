<template>
  <div class="main-content">
    <div class="home-wrapper">
      <div class="home__profile">
        <img class="profile__avatar" :src="user.avatar" />
        <div class="profile__information">
          <h1 class="profile__title">{{ user.name }}</h1>
          <p class="profile__information__item">
            <span class="bold-segment">Возраст:</span> {{ user.age }}
          </p>
          <p class="profile__information__item">
            <span class="bold-segment">О себе:</span> {{ user.description }}
          </p>
          <p class="profile__information__item">
            Друзья ({{ friendList.length }})
          </p>
          <!-- <router-link >Друзья ({{user.friendList.length}})</router-link> -->
          <button class="profile__button">Редактировать</button>
        </div>
      </div>
      <ToDoList :toDoList="toDoList" />
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useUserStore } from "../../platform/store/users/users";
import { useToDoListsStore } from "../../platform/store/toDoLists/toDoLists";
import ToDoList from "./../components/ToDoList.vue";

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
</script>

<style>
.home-wrapper {
  padding: 2rem 1rem;
}

.home__profile {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
}

.profile__avatar {
  width: 20rem;
  border-radius: 25%;
  border: solid 3px #6629cd;
}

.profile__information {
  width: 60%;
  font-size: 1.5rem;
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