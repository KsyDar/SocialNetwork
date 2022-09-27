<template>
  <div class="modal-wrapper" @click.self="closeModal">
    <div class="modal">
      <h3 class="modal__title">Давай дружить!</h3>
      <div class="search-form">
        <input type="text" class="modal__input" v-model="searchQuery" />
        <button
          class="button-change button--search"
          @click="searching(searchQuery)"
        >
          Поиск
        </button>
      </div>
      <div v-if="resultUser" class="results">
        Найдено: {{ resultUser.name }}
        <button class="button--add" @click="addFriend">
          Добавить
        </button>
      </div>
      <div v-else-if="resultUser === undefined" class="results">Пользователь не найден</div>
      <button
        class="negative-button friends-modal__button"
        @click="closeModal"
      >
        Закрыть
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useUserStore } from "../../platform/store/users/users";

const emits = defineEmits(["closeModal", "addFriend"]);

const userStore = useUserStore()
const searchQuery = ref(null);
const resultUser = ref(null);

const searching = (searchQuery) => {
  let userDetected = userStore.getFriendByName(searchQuery)
  resultUser.value = {
    id: userDetected.id,
    name: userDetected.name
  }
};


const addFriend = () => {
  emits("addFriend", resultUser.value, true);
};


const closeModal = () => {
  emits("closeModal");
};
</script>

<style>
.search-form {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.button--search {
  margin: 0 1rem;
}

.results {
  font-size: 1.5rem;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 94%;
  border: solid 2px #aa94cf4f;
  padding: 1rem;
}

.friends-modal__button {
  display: block;
  margin: 1rem auto;
}
</style>