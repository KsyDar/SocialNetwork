<template>
  <div class="to-do-list-wrapper">
    <h3 class="to-do-list__title">Список дел</h3>
    <ol class="to-do-list">
      <li class="to-do-list__item" v-for="toDo of toDos" :key="toDo.toDoId">
        <label class="to-do-list__item__title" :class="{ 'is-done': toDo.isDone }">
          <input type="checkbox" v-model="toDo.isDone">
          {{ toDo.title }}
        </label>
        <div class="to-do-list__item__buttons">
          <button class="to-do-list__button to-do-list__button--change">
            Изменить
          </button>
          <button class="to-do-list__button to-do-list__button--delete">
            Удалить
          </button>
        </div>
      </li>
    </ol>
    <button class="to-do-list__button to-do-list__button--add">Добавить</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  toDos: Array,
});
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

.to-do-list__button {
  padding: 3px 7px;
  border-radius: 7px;
  font-weight: 600;
}

.to-do-list__button:hover {
  cursor: pointer;
  background: #00000059;
}

.to-do-list__button--change {
  margin-right: 2rem;
  border: solid 2px #8864c6;
  background: #927dd2;
  color: #fff;
}

.to-do-list__button--change:hover {
  background: #60458f;
}

.to-do-list__button--add {
  margin: 2rem auto;
  display: block;
  margin: 2rem auto;
  display: block;
  border: solid 2px #8864c6;
  color: #8864c6;
}

.to-do-list__button--add:hover {
  background: #dac4eb;
}
</style>