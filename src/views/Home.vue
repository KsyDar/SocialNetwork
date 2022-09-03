<template>
  <div class="main-content">
    <h1>{{ user.name }}</h1>
    <ToDoList :toDos="toDos" />
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useUserStore } from "../../platform/store/users/users";
import { useToDoListsStore } from "../../platform/store/toDoLists/toDoLists";
import ToDoList from "../components/toDoList.vue";

const props = defineProps({
  id: String,
});

const userStore = useUserStore();
const toDoListStore = useToDoListsStore();

const user = ref({});
const toDos = ref([]);

onBeforeMount(async () => {
  toDos.value = await toDoListStore.getToDoList(props.id);
  user.value = userStore.currentUser;
});
</script>

<style>
</style>