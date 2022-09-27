<template>
  <div class="main-content">
    <h1 class="change-profile__title">Редактирование профиля...</h1>
    <div class="change-profile-wrapper">
      <label class="change-profile__item"
        >Логин:<input
          class="change-profile__input"
          type="text"
          v-model="user.userName"
      /></label>
      <label class="change-profile__item"
        >Пароль:<input
          class="change-profile__input"
          type="text"
          v-model="user.password"
      /></label>
      <label class="change-profile__item"
        >Имя:<input
          type="text"
          v-model="user.name"
          class="change-profile__input"
      /></label>
      <label class="change-profile__item"
        >Возраст:<input
          class="change-profile__input"
          type="text"
          v-model="user.age"
      /></label>
      <label class="change-profile__item"
        >О себе:<textarea
          class="change-profile__input input-textarea"
          v-model="user.description"
        ></textarea>
      </label>
      <label class="change-profile__item">
        Аватар:<input
          class="change-profile__input"
          type="text"
          v-model="user.avatar"
        />
      </label>
    </div>
    <div class="change-profile__buttons">
      <button class="button-change" @click="saveProfileChanges">Сохранить</button>
      <button class="negative-button" @click="backToHome">Назад</button>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useUserStore } from "../../../platform/store/users/users";
import router from "../../../platform/router";

const props = defineProps({
  id: String,
});

const userStore = useUserStore();
const user = ref({});

onBeforeMount(async () => {
  user.value = {
    id: props.id,
    userName: userStore.currentUser.userName,
    password: userStore.currentUser.password,
    name: userStore.currentUser.name,
    age: userStore.currentUser.age,
    avatar: userStore.currentUser.avatar,
    description: userStore.currentUser.description
  };
});


const saveProfileChanges = async () => {
  if(!user.value.userName || !user.value.password || 
  !user.value.name || !user.value.age || 
  !user.value.avatar || !user.value.description) {
    alert("Все поля должны быть заполнены!")
  }
  else {
    await userStore.changeProfile(user.value);
    alert('Изменения сохранены!')
  }
}

const backToHome = () => {
  router.push({ name: 'Home', params: {id: props.id} })
}
</script>

<style>
.change-profile__title {
  color: #ff1f57;
}

.change-profile-wrapper {
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
}

.change-profile__item {
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: 600;
  color: #332025;
}

.change-profile__input {
  width: 85%;
}

.input-textarea {
  resize: none;
  height: 10rem;
}

.change-profile__buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>