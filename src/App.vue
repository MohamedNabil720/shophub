<template lang="pug">
div(class="main-container")
  router-view
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";

const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  if (authStore.isLoggedIn) {
    router.push("/dashboard");
  }
});
</script>

<style lang="scss" scoped></style>
