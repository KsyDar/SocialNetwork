<template>
  <div class="main-content">
    <h1>Список друзей</h1>
    <div class="friend-list-wrapper">
      <ul class="friend-list">
        <li
          class="friend-list__item"
          v-for="friend of friendList"
          :key="friend.id"
        >
          {{ friend.name }}
          <button class="default-button" @click="deleteFriend(friend)">
            Удалить
          </button>
        </li>
      </ul>
      <div class="friend-list__buttons">
        <button class="default-button button-change" @click="backToHome">Назад</button>
        <button class="default-button friend-list__button button--add" @click="openModal">
          Добавить
        </button>
      </div>
    </div>
  </div>
  <AddFriendsModal v-if="isModalOpen" @closeModal="openModal" />
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useUserStore } from "../../../platform/store/users/users";
import router from "../../../platform/router";
import AddFriendsModal from "../../components/AddFriendsModal.vue";

const props = defineProps({
  id: String,
});

const userStore = useUserStore();
const friendList = ref(null);

onBeforeMount(() => {
  friendList.value = userStore.currentUser.friendList;
});

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const deleteFriend = async (friend) => {
  userStore.currentUser.friendList.splice(
    userStore.currentUser.friendList.indexOf(friend),
    1
  );
  await userStore.changeProfile(userStore.currentUser);
};

const backToHome = () => {
  router.push({ name: 'Home', params: {id: props.id} })
};
</script>

<style>
.friend-list {
  padding: 0;
  list-style-type: none;
  font-size: 1.5rem;
}

.friend-list__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 2px #aa94cf4f;
  margin-bottom: 1rem;
}

.friend-list__buttons {
  display: flex;
  justify-content: space-between;
}

.friend-list__button {
  margin: 0;
}
</style>