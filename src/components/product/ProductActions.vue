<template lang="pug">
div.action-wrapper
  div.icon-actions
    el-icon
      View
    el-dropdown(trigger="click" :teleported="true")
      span.el-dropdown-link
        el-icon
          More
      template(#dropdown)
        el-dropdown-menu
          el-dropdown-item(@click="handleEdit") Edit
          el-dropdown-item(@click="handleDelete" class="delete-item") Delete
</template>

<script setup lang="ts">
import type { Product } from "@/types/Product";

interface Props {
  product: Product;
}

interface Emits {
  (e: "edit", product: Product): void;
  (e: "delete", product: Product): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function handleEdit() {
  emit("edit", props.product);
}

function handleDelete() {
  emit("delete", props.product);
}
</script>

<style scoped lang="scss">
.action-wrapper {
  .icon-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  :deep(.el-icon) {
    font-size: 24px;
    color: #000;
    cursor: pointer;
  }
}

:deep(.el-dropdown-menu) {
  padding: 10px 15px !important;
  background-color: $bg-menu;

  .delete-item {
    color: $color-error;
  }
}
</style>
