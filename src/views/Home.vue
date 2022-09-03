<template>
  <div class="main-content">
    <div class="home-wrapper">
      <div class="home__profile">
        <h1 class="profile__title">{{ user.name }}</h1>
        <img class="profile__avatar" :src="user.avatar" />
        <p class="profile__information">Возраст: {{ user.age }}</p>
        <p class="profile__information">О себе: {{ user.description }}</p>
        <p class="profile__information">Друзья ({{ friendList.length }})</p>
        <!-- <router-link >Друзья ({{user.friendList.length}})</router-link> -->
        <button class="profile__button">Редактировать</button>
      </div>
      <ToDoList :toDos="toDos" />
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
const toDos = ref([]);

onBeforeMount(async () => {
  toDos.value = await toDoListStore.getToDoList(props.id);
  user.value = userStore.currentUser;
  friendList.value = userStore.currentUser.friendList;
});
</script>

<style>
.home-wrapper {
  padding: 2rem 1rem;
}

.profile__title {
  margin-top: 0;
  font-size: 2.5rem;
}

.profile__avatar {
  width: 20rem;
  border-radius: 50%;
  border: solid 2px #6629cd;
}
</style>