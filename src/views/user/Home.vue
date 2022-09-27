<template>
  <button class="negative-button button-exit" @click="exitFromProfile">
    Выйти
  </button>
  <div class="main-content">
    <div class="home-wrapper">
      <div class="home__profile">
        <img class="profile__avatar" :src="user.avatar" alt="" />
        <div class="profile__information">
          <h1 class="profile__title">{{ user.name }}</h1>
          <p><span class="bold-segment">Возраст:</span> {{ user.age }}</p>
          <p>
            <span class="bold-segment">О себе:</span> {{ user.description }}
          </p>
          <div class="profile__information__item" v-if="isCurrentUser">
            <router-link :to="{ name: 'FriendList', params: { id: props.id } }">
              Друзья
            </router-link>
            <button class="profile__button" @click="goToChangeProfile">
              Редактировать
            </button>
          </div>
          <div class="profile__information__item" v-else>
            <span class="bold-segment">Друзья:</span>
            <ul>
              <li v-for="friend of friends" :key="friend.id">
                <router-link :to="{ name: 'Home', params: {id: friend.id} }">{{ friend.name }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ToDoList :toDoList="toDoList" :isCurrentUser="isCurrentUser"/>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import router from "../../../platform/router";
import { useUserStore } from "../../../platform/store/users/users";
import { useToDoListsStore } from "../../../platform/store/toDoLists/toDoLists";
import { useFriendListsStore } from "../../../platform/store/users/friendLists";
import ToDoList from "../../components/ToDoList.vue";

const userStore = useUserStore();
const toDoListStore = useToDoListsStore();
const friendListStore = useFriendListsStore();

const exitFromProfile = () => {
  router.push({path: '/'});
};

const props = defineProps({
  id: String,
});



const user = computed(() => userStore.getFriendById(props.id));
const isCurrentUser = computed(() => userStore.currentUser.id === props.id);
const friends = computed(
  () => friendListStore.getNewFriendList(props.id).friends
);
const toDoList = computed(() => toDoListStore.getNewToDoList(props.id));

const goToChangeProfile = () => {
  router.push({ name: "ChangeProfile", params: { id: props.id } });
};


// const goToFriend = (id) => {
//   router.push({ name: 'Home', params: {id: id} });
// };
</script>

<style>
.button-exit {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.button-exit:hover {
  border: solid 3px #fff;
}

.home__profile {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.profile__avatar {
  width: 20rem;
  border-radius: 25%;
  border: solid 3px #ff1f57;
  margin-right: 1rem;
}

.profile__information {
  width: 60%;
  font-size: 1.5rem;
  background: #d3d2d645;
  border-radius: 7px;
  padding: 0.5rem;
}

.profile__information__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.profile__title {
  margin-top: 0;
  font-size: 2.5rem;
  color: #ff1f57;
}

.bold-segment {
  font-weight: 600;
  color: #332025;
}

.profile__button {
  width: 100%;
  border: none;
  background: #ff1f57;
  color: #fff;
  padding: 5px;
  margin: 1rem auto;
  font-weight: 600;
  border-radius: 5px;
}

.profile__button:hover {
  background: #703e4bbf;
  cursor: pointer;
}

.profile__friend-list {
  font-weight: 100;
}
</style>