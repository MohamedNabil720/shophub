<template lang="pug">
div.search-container
  el-input(
    v-model="searchText"
    placeholder="Search"
    prefix-icon="Search"
    class="search-input"
    clearable
  )
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/stores/useSearchStore";

const searchStore = useSearchStore();
const { searchText } = storeToRefs(searchStore);
</script>

<style scoped lang="scss">
.search-container {
  width: 380px;
  margin-top: 56px;
  margin-bottom: 20px;

  .search-input {
    :deep(.el-input__wrapper) {
      padding: 12px;
      border-radius: 12px;
      border: 1px solid $color-border;

      .el-input__icon {
        font-size: 20px;
      }
    }
  }
}
</style>
