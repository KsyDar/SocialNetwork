<template>
  <div class="main-content">
    <h1 class="friend-list__title">Список друзей</h1>
    <div class="friend-list-wrapper">
      <ul class="friend-list">
        <li
          class="friend-list__item"
          v-for="friend of friendList.friends"
          :key="friend.id"
        >
          {{ friend.name }}
          <button class="button-change friend-list__button" @click="deleteFriend(friend)">
            Удалить
          </button>
        </li>
      </ul>
      <div class="friend-list__buttons">
        <button
          class="button--add friend-list__button"
          @click="openModal"
        >
          Добавить
        </button>
        <button class="negative-button" @click="backToHome">
          Назад
        </button>
      </div>
    </div>
  </div>
  <AddFriendsModal v-if="isModalOpen" @closeModal="openModal" :isAdd="!isAdd" />
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useFriendListsStore } from "../../../platform/store/users/friendLists";
import router from "../../../platform/router";
import AddFriendsModal from "../../components/AddFriendsModal.vue";

const props = defineProps({
  id: String,
});

const friendListStore = useFriendListsStore();
const friendList = ref([]);
onBeforeMount(async () => {
  friendList.value = await friendListStore.getFriendList(props.id);
});

const isAdd = ref(false)
const deleteFriend = async (friend) => {
  friendList.value.friends.splice(friendList.value.friends.indexOf(friend), 1);
  await friendListStore.changeFriendList(friendList.value);
  await friendListStore.mutualChange(friend, isAdd.value);
};

const isModalOpen = ref(false);
const openModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const backToHome = () => {
  router.push({ name: "Home", params: { id: props.id } });
};
</script>

<style>
.friend-list {
  padding: 0;
  list-style-type: none;
  font-size: 1.5rem;
}

.friend-list__title {
  color: #ff1f57;
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