<template>
  <div class="header">
    <div class="header__logo" @click="goToHome">
      <img class="header__icon" src="./assets/icons/headerIcon.png" alt=""/>
      <h1 class="header__title">FaceLess</h1>
    </div>
  </div>
  <router-view></router-view>
</template>

<script setup>
import router from "../platform/router";
import { useUserStore } from "../platform/store/users/users";

const userStore = useUserStore();

const goToHome = () => {
  if (userStore.currentUser) {
    router.push({ name: "Home", params: { id: userStore.currentUser.id } });
  }
};
</script>



<style>
.header {
  background: #ff1f57;
  margin: 0;
  height: 4.5rem;
  display: flex;
  align-items: center;
}

.header__logo {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.header__icon {
  width: 3.5rem;
  height: 3rem;
  margin-left: 1rem;
}

.header__title {
  margin: 0;
  color: #fff;
  font-size: 2.5rem;
  font-weight: 100;
}

.main-content {
  background: #f5e4e4;
  margin: 0 15%;
  min-height: calc(100vh - 4.5rem);
  padding: 1rem;
}
</style>
