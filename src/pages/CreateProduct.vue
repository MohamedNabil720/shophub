<template lang="pug">
div.page-wrapper
  div.product-form
    el-steps(:active="currentStep" align-center)
      el-step()
      el-step()
      el-step()

    ProductFormStep1(
      v-if="currentStep === 1"
      :form-key="formKey"
      :form="form"
      :preview-image="previewImage"
      :uploading="uploading"
      :categories="categories"
      @go-to-step2="goToStep2"
      @upload-thumbnail="uploadThumbnail"
      @go-to-dashboard="goToDashboard"
    )

    ProductFormStep2(
      v-else-if="currentStep === 2"
      :form="form"
      :mode="props.mode"
      @submit-product="submitProduct"
      @go-back="currentStep = 1"
    )

    ProductFormStep3(
      v-else-if="currentStep === 3"
      @go-to-dashboard="goToDashboard"
    )
</template>

<script setup lang="ts">
import { useProductForm } from "@/composables/useProductForm";
import ProductFormStep1 from "@/components/productForm/ProductFormStep1.vue";
import ProductFormStep2 from "@/components/productForm/ProductFormStep2.vue";
import ProductFormStep3 from "@/components/productForm/ProductFormStep3.vue";
import type { ProductProps } from "@/types/create";

const props = defineProps<ProductProps>();

const {
  currentStep,
  previewImage,
  uploading,
  formKey,
  categories,
  form,
  uploadThumbnail,
  goToStep2,
  submitProduct,
  goToDashboard,
} = useProductForm(props);
</script>

<style lang="scss">
.page-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}

:deep(textarea) {
  resize: none;
  border-radius: 8px;
}

:deep(.myForm) {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-form {
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .form-title {
    font-size: 16px;
    font-weight: 600;
  }

  .el-form--default {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .el-form-item--label-top {
    width: 100%;
  }

  .form-body {
    display: flex;
    gap: 20px;

    .thumbnail-section {
      display: flex;
      flex-direction: column;
      gap: 5px;
      align-items: center;

      .thumbnail-label {
        font-size: 14px;
        width: 100%;
      }

      .thumbnail-upload {
        width: 230px;
        height: 200px;
        border: 1px dashed #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        color: #aaa;
        cursor: pointer;

        &:hover {
          border-color: #1e88e5;
          color: #1e88e5;
        }
      }

      .note {
        font-size: 12px;
        color: #999;
      }
    }

    .fields-section {
      flex: 1;
    }
    .error {
      color: red;
    }
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 40px;
  }

  .price-fields {
    display: flex;
    gap: 20px;
  }
}
</style>
