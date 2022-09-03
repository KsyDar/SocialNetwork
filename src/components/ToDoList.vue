<template>
  <div class="to-do-list-wrapper">
      <h3 class="to-do-list__title">Список дел</h3>
      <ul class="to-do-list">
        <li class="to-do-list__item" v-for="toDo of toDos" :key="toDo.toDoId">
          <p class="to-do-list__item__title">
            {{ toDo.title }}
          </p>
          <div class="to-do-list__item__buttons">
            <button>Изменить</button>
            <button>Удалить</button>
          </div>
        </li>
      </ul>
      <button>Добавить</button>
    </div>
</template>

<script setup>
 const props = defineProps({
    toDos: Array,
 })
</script>

<style>

</style>