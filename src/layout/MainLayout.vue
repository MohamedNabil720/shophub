<template lang="pug">
main.main-layout
 Sidebar
 div(class="main-container")
  Navbar
  <router-view />


</template>

<script setup lang="ts">
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
</script>

<style scoped>
.main-layout {
  display: flex;
  height: 100vh;
}

.main-container {
  width: 100%;
}
</style>
