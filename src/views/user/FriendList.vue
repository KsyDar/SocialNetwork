<template>
  <div class="main-content">
    <h1 class="friend-list__title">Список друзей</h1>
    <div class="friend-list-wrapper">
      <div v-if="friendList.friends.length === 0" class="zero-list">У вас нет ни одного друга :(</div>
      <ul v-else class="friend-list">
        <li
          class="friend-list__item"
          v-for="friend of friendList.friends"
          :key="friend.id"
        >
        <router-link :to="{ name: 'Home', params: { id: friend.id } }">
          {{ friend.name }}
        </router-link>
          <button class="button-change friend-list__button" @click="changeFriendList(friend, false)">
            Удалить
          </button>
        </li>
      </ul>
      <div class="friend-list__buttons">
        <button class="negative-button" @click="backToHome">
          Назад
        </button>
        <button
          class="button--add friend-list__button"
          @click="openModal"
        >
          Добавить
        </button>
      </div>
    </div>
  </div>
  <AddFriendsModal v-if="isModalOpen" @closeModal="openModal" @addFriend="changeFriendList"/>
</template>

<script setup>
import { computed, ref } from "vue";
import { useFriendListsStore } from "../../../platform/store/users/friendLists";
import { useUserStore } from "../../../platform/store/users/users";
import router from "../../../platform/router";
import AddFriendsModal from "../../components/AddFriendsModal.vue";

const props = defineProps({
  id: String,
});

const userStore = useUserStore();
const friendListStore = useFriendListsStore();
const friendList = computed(() => friendListStore.currentfriendList);


const changeFriendList = async (friend, isAdd) => {
  let friendsCurrent = []
  friendList.value.friends.forEach(el => {
    friendsCurrent.push(el)
  });
  
  let friendsFriend = []
  let anotherFriendList = friendListStore.getNewFriendList(friend.id);
  anotherFriendList.friends.forEach(el => {
    friendsFriend.push(el)
  });

  let currentfriendList = {
    id: props.id,
    friends: friendsCurrent
  };
  let friendFriendList = {
    id: friend.id,
    friends: friendsFriend
  };

  if (!isAdd) {
    currentfriendList.friends.splice(currentfriendList.friends.indexOf(friend), 1);
    friendFriendList.friends.splice(friendFriendList.friends.findIndex(el => el.id === props.id), 1);
  }
  else {
    let repeat = currentfriendList.friends.find(el => el.id === friend.id)
    if(repeat) {
      alert("Вы уже дружите!")
    }
    else {
      currentfriendList.friends.push(friend);
      friendFriendList.friends.push({id: props.id, name: `${userStore.currentUser.name}`});
    }
  }
  await friendListStore.changeFriendList(currentfriendList, friendFriendList);
};

const isModalOpen = ref(false);
const openModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const backToHome = () => {
  router.back();
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