<template>
  <div class="header">
    <img class="header__icon" src="./components/icons/headerIcon.png" />
    <h1 class="header__title">facepalmbook</h1>
  </div>
  <router-view></router-view>
</template>

<script setup>
</script>



<style>
.header {
  background: #aa94cf;
  margin: 0;
  height: 4.5rem;
  display: flex;
  align-items: center;
}

.header__icon {
  width: 3rem;
  height: 3rem;
  margin-left: 1rem;
}

.header__title {
  margin: 0;
  margin-left: 1rem;
  color: #000;
  font-size: 2.5rem;
  font-weight: 100;
}

.main-content {
  background: #fff;
  margin: 0 25rem;
  min-height: calc(100vh - 4.5rem);
}
</style>
