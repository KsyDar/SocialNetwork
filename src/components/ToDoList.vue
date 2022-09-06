<template>
  <div class="to-do-list-wrapper" v-if="toDoList">
    <h3 class="to-do-list__title">Список дел</h3>
    <ol class="to-do-list">
      <li class="to-do-list__item" v-for="toDo of toDoList.toDos" :key="toDo.toDoId">
        <label
          class="to-do-list__item__title"
          :class="{ 'is-done': toDo.isDone }"
        >
          <input type="checkbox" v-model="toDo.isDone" @click="changeStatus(toDo)"/>
          {{ toDo.title }}
        </label>
        <div class="to-do-list__item__buttons">
          <button class="default-button button-change" @click="editToDo(toDo)">
            Изменить
          </button>
          <button class="default-button to-do-list__button--delete" @click="deleteToDo(toDo)">
            Удалить
          </button>
        </div>
      </li>
    </ol>
    <button class="default-button button--add" @click="addToDo">Добавить</button>
  </div>
  <div v-else>Загрузка...</div>
  <ChangeToDoModal
    v-if="selectedTodo"
    :toDo="selectedTodo"
    @saveChanges="saveChanges"
    @cancelChange="cancelChange"
  />
</template>

<script setup>
import { ref } from "vue";
import ChangeToDoModal from "./ToDoModal.vue";
import { useToDoListsStore } from "./../../platform/store/toDoLists/toDoLists"

const props = defineProps({
  toDoList: Object,
});

const toDoListStore = useToDoListsStore();
async function changeToDoList(currentToDoList) {
  await toDoListStore.changeToDoList(currentToDoList);
}

const selectedTodo = ref(null);

const deleteToDo = (toDo) => {
  const toDos = props.toDoList.toDos
  toDos.splice(toDos.indexOf(toDo), 1);
  changeToDoList(props.toDoList)
};

const editToDo = (toDo) => {
  selectedTodo.value = toDo;
};

const saveChanges = (info) => {
  const toDos = props.toDoList.toDos
  selectedTodo.value = null;
  if (info.isAdd) {
    const newToDo = { ...info.toDo, toDoId: `${toDos.length + 1}`, isDone: false };
    toDos.push(newToDo);
  } else {
    const editTodo = toDos.find((x) => x.toDoId === info.toDo.toDoId);
    if (editTodo) {
      editTodo.title = info.toDo.title;
      toDos.splice(toDos.indexOf(editTodo), 1, editTodo);
    }
  }
  changeToDoList(props.toDoList)
};

const addToDo = () => {
  selectedTodo.value = {
    toDoId: null,
    title: "",
    isDone: false,
  };
};

const cancelChange = () => {
  selectedTodo.value = null;
};

const changeStatus = (toDo) => {
  toDo.isDone = !toDo.isDone;
  changeToDoList(props.toDoList)
};
</script>

<style>
.to-do-list-wrapper {
  margin-top: 4rem;
  border: solid 3px #8864c6;
  border-radius: 10px;
}

.to-do-list__title {
  margin: 1rem;
  font-size: 2rem;
  font-weight: 600;
  color: #6e4fa3;
  text-align: center;
}

.to-do-list {
  padding: 0;
  margin: 0 1rem;
  font-size: 1.5rem;
}

.to-do-list__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 2px #aa94cf4f;
  margin-bottom: 1rem;
}

.is-done {
  text-decoration: line-through;
}
</style>