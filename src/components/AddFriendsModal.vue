<template>
  <div class="modal-wrapper">
    <div class="modal">
      <h3 class="modal__title">Давай дружить!</h3>
      <div class="search-form">
        <input type="text" class="modal__input" v-model="searchQuery" />
        <button
          class="default-button button--search"
          @click="searching(searchQuery)"
        >
          Поиск
        </button>
      </div>
      <div v-if="result" class="results">
        Найдено: {{ result }}
        <button class="default-button button--add-friend" @click="addFriend">
          Добавить
        </button>
      </div>
      <button
        class="default-button button-change friends-modal__button"
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

const props = defineProps({
  id: String,
});
const emits = defineEmits(["closeModal"]);

const userStore = useUserStore();

const searchQuery = ref(null);
const result = ref(null);
const friendId = ref("");

const searching = (searchQuery) => {
  const resultUser = userStore.users.find((el) => el.name === searchQuery);
  result.value = resultUser.name;
  friendId.value = resultUser.id
};

const addFriend = async () => {
  userStore.currentUser.friendList.push({id: `${friendId.value}`, name: result});
  await userStore.changeProfile(userStore.currentUser);
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

.button--add-friend {
  border: solid 2px #8864c6;
  color: #8864c6;
}

.friends-modal__button {
  display: block;
  margin: 1rem auto;
}
</style>