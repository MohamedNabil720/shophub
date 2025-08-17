<template lang="pug">
div
  h3.form-title Product information
  Form(
    :key="formKey",
    :validation-schema="step1Schema",
    :initial-values="form",
    @submit="$emit('goToStep2', $event)",
    v-slot="{ errors, setFieldValue }"
  )
    Field(name="thumbnail", type="hidden")

    .form-body
      .thumbnail-section
        p.thumbnail-label Thumbnail
        .thumbnail-upload(@click="$refs.fileInput.click()")
          template(v-if="previewImage")
            img(
              :src="previewImage",
              style="width: 100%; height: 100%; object-fit: cover"
            )
          template(v-else)
            i.el-icon-plus +
        input(
          type="file",
          accept="image/*",
          ref="fileInput",
          style="display: none",
          @change="(e) => $emit('uploadThumbnail', e, setFieldValue)"
        )
        small.note Note: formats: jpg, jpeg, png
        span.error {{ errors.thumbnail }}

      .fields-section
        el-form.myForm(label-position="top", label-width="120px")
          el-form-item(label="Product title", :error="errors.title")
            Field(name="title", v-slot="{ field }")
              el-input(
                :model-value="field.value",
                @update:model-value="field.onChange",
                placeholder="e.g. valuable, premium television"
              )

          el-form-item(label="Slug", :error="errors.slug")
            Field(name="slug", v-slot="{ field }")
              el-input(
                :model-value="field.value",
                @update:model-value="field.onChange",
                placeholder="Enter slug"
              )

          el-form-item(label="Category", :error="errors.category")
            Field(name="category", v-slot="{ field }")
              el-select(
                :model-value="field.value",
                @update:model-value="field.onChange",
                placeholder="Choose category"
              )
                el-option(
                  v-for="item in categories",
                  :key="item.value",
                  :label="item.label",
                  :value="item.value"
                )

    el-form(label-position="top", label-width="120px")
      el-form-item(label="Description", :error="errors.description")
        Field(name="description", v-slot="{ field }")
          el-input(
            type="textarea",
            :rows="8",
            :model-value="field.value",
            @update:model-value="field.onChange",
            placeholder="Type something.."
          )

    .form-actions
      el-button(type="default" @click="$emit('goToDashboard')") Cancel
      el-button(type="primary", native-type="submit", :loading="uploading") Next
</template>

<script setup lang="ts">
import { Form, Field } from "vee-validate";
import { step1Schema } from "@/schemas/validation";
import type { ProductForm, Category } from "@/types/product";

interface Props {
  formKey: number;
  form: ProductForm;
  previewImage: string | null;
  uploading: boolean;
  categories: Category[];
}

interface Emits {
  (e: "goToStep2", values: any): void;
  (e: "uploadThumbnail", event: Event, setFieldValue: any): void;
  (e: "goToDashboard"): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>
