<template>
  <div class="modal-wrapper" @click.self="cancelChange">
    <div class="modal">
      <h3 class="modal__title">Редактирование...</h3>
      <input type="text" class="modal__input" v-model="title" />
      <div class="modal__buttons">
        <button class="negative-button" @click="cancelChange">Отмена</button>
        <button
          class="button-change to-do__save-button"
          @click="saveChanges"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref } from "@vue/reactivity";

const props = defineProps({
  toDo: Object,
});
const emits = defineEmits(["saveChanges", "cancelChange"]);

const title = ref(props.toDo.title);

const saveChanges = () => {
  emits("saveChanges", {
    isAdd: props.toDo.toDoId === null,
    toDo: {
      toDoId: props.toDo.toDoId,
      title: title.value,
    },
  });
};

const cancelChange = () => {
  emits("cancelChange");
};
</script>
  
<style>
.modal__buttons {
  display: flex;
  justify-content: space-between;
  width: 94%;
  margin: 1rem;
}

.to-do__save-button {
  margin: 0;
}
</style>