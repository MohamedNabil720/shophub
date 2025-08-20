<template lang="pug">
el-dialog(
  v-model="isVisible" 
  title="Delete product" 

  :modal="true"
  :close-on-click-modal="false"
  :close-on-press-escape="true"
  class="custom-delete-dialog"
  center
)
  div.dialog-content
    div.dialog-message
      p Are you sure you want to delete product <strong>{{ product?.id || 'Unknown' }}</strong>?
      p.product-name {{ product?.title || 'Unknown Product' }}
    
  template(#footer)
    div.dialog-footer
      el-button(@click="handleCancel" size="large") Cancel
      el-button(
        type="danger" 
        @click="handleConfirm" 
        :disabled="!product" 
        size="large"
      ) Delete
</template>

<script setup lang="ts">
import type { Product } from "@/types/Product";

interface Props {
  product: Product | null;
}

interface Emits {
  (e: "confirm"): void;
  (e: "cancel"): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const isVisible = defineModel<boolean>("visible", { required: true });

function handleConfirm() {
  emit("confirm");
}

function handleCancel() {
  emit("cancel");
}
</script>

<style lang="scss">
// ===== Custom Dialog Styles =====
:deep(.custom-delete-dialog) {
  .el-dialog {
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

    .el-dialog__header {
      padding: 24px 24px 0 24px;
      border-bottom: 1px solid #f0f0f0;

      .el-dialog__title {
        font-size: 20px;
        font-weight: 600;
        color: #333;
      }
    }

    .el-dialog__body {
      padding: 24px;
      min-height: 120px;
    }

    .el-dialog__footer {
      padding: 0 24px 24px 24px;
      border-top: 1px solid #f0f0f0;
    }
  }
}

.el-overlay {
  display: flex;
  align-items: center;
  justify-content: center;

  .el-overlay-dialog {
    top: 50% !important;
    left: 50% !important;
    transform: translate(-30%, -40%) !important;
  }
}

.dialog-content {
  text-align: center;

  .dialog-message {
    margin-bottom: 20px;

    p {
      margin: 8px 0;
      font-size: 16px;
      color: #666;

      &:first-child {
        color: #333;
        font-weight: 500;
      }
    }

    .product-name {
      color: #e74c3c;
      font-weight: 600;
      font-size: 14px;
    }
  }
}

.dialog-footer {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;

  .el-button {
    padding: 12px 24px;
    font-weight: 500;
    border-radius: 8px;
    min-width: 100px;

    &.el-button--danger {
      background-color: #e74c3c;
      border-color: #e74c3c;

      &:hover {
        background-color: #c0392b;
        border-color: #c0392b;
      }
    }
  }
}
</style>
