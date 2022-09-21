<template>
  <div class="main-content">
    <div class="login-form">
      <h1 class="login-form__title">Авторизация</h1>
      <div class="login-form__item-wrapper">
        <p v-if="isError" class="login-form__failed">
          Неправильное имя пользователя или пароль
        </p>
        <label class="login-form__item">
          Логин:
          <input type="text" class="login-form__input" v-model="userName" />
        </label>
        <label class="login-form__item">
          Пароль:
          <input type="password" class="login-form__input" v-model="password" />
        </label>
      </div>
      <button class="negative-button enter-button" @click="Login">Войти</button>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import router from "../../platform/router";
import { useUserStore } from "../../platform/store/users/users";
import { useToDoListsStore } from "../../platform/store/toDoLists/toDoLists";
import { useFriendListsStore } from "../../platform/store/users/friendLists";

const userStore = useUserStore();
const toDoListStore = useToDoListsStore();
const friendListStore = useFriendListsStore();

const userName = ref("");
const password = ref("");
let userId = "";
const isError = ref(false);

const Login = async () => {
  userId = await userStore.login(userName.value, password.value);
  if (userId) {
    router.push({ name: "Home", params: { id: userId } });
    toDoListStore.getToDoList(userId);
    friendListStore.getFriendList(userId);
  } else {
    isError.value = true;
  }
};

onBeforeMount(() => {
  userStore.exit();
});
</script>

<style>
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
}

.login-form__title {
  margin: 3rem 0 0 5rem;
  font-size: 2.5rem;
  font-weight: 400;
  color: #ff1f57;
}

.login-form__item-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 2rem;
  color: #332025;
}

.login-form__failed {
  margin: 0;
  color: #ff0000;
}

.login-form__item {
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.login-form__input {
  background: #6e6c794d;
}

.enter-button {
  margin-left: 5rem;
}
</style>