<template lang="pug">
div.user-info
  div.user-icon {{ userInitial }}
  div.user-name
    div {{ user.name }}
    div {{ user.role }}
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { User } from "@/types/User";

interface Props {
  user: User;
}

const props = defineProps<Props>();

const userInitial = computed(() => props.user.name.charAt(0).toUpperCase());
</script>

<style scoped lang="scss">
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-icon {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.user-name {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}
</style>
