<template>
  <div class="header">
    <img class="header__icon" src="./components/icons/headerIcon.png" />
    <h1 class="header__title">FaceLess</h1>
  </div>
  <router-view></router-view>
</template>

<script setup>
</script>



<style>
.header {
  background: #ff1f57;
  margin: 0;
  height: 4.5rem;
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
