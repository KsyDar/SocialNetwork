<template>
  <div class="modal-wrapper">
    <div class="modal">
      <h3 class="modal__title">Редактирование...</h3>
      <input type="text" class="modal__input" v-model="title" />
      <div class="modal__buttons">
        <button
          class="to-do-list__button to-do-list__button--change"
          @click="saveChanges"
        >
          Сохранить
        </button>
        <button class="to-do-list__button" @click="cancelChange">Отмена</button>
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
.modal-wrapper {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #04040491;
}
.modal {
  background-color: #fff;
  width: 35rem;
  height: 25rem;
  margin: auto;
  margin-top: 15rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border-radius: 5px;
  color: #000;
  border: solid 2px;
}

.modal__title {
  margin: 1rem;
}

.modal__input {
  padding: 0;
  width: 94%;
  height: 3rem;
  border-radius: 5px;
  margin: 0 1rem;
}

.modal__buttons {
  display: flex;
  justify-content: space-between;
  width: 94%;
  margin: 1rem;
}
</style>