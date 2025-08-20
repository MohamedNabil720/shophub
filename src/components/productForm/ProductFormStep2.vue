<template lang="pug">
div
  h3.form-title Product Pricing
  Form(:validation-schema="step2Schema" :initial-values="form" @submit="$emit('submitProduct', $event)" v-slot="{ errors }")
    el-form(label-position="top" label-width="120px")
      el-form-item(label="Pricing plan")
        Field(name="plan" v-slot="{ field }")
          el-select(:model-value="field.value" @update:model-value="field.onChange" placeholder="Select plan")
            el-option(label="Paid" value="Paid")
            el-option(label="Free" value="Free")

      div.price-fields
        el-form-item(label="Product price", :error="errors.productPrice")
          Field(name="productPrice" v-slot="{ field }")
            el-input(:model-value="field.value" @update:model-value="field.onChange" placeholder="e.g price from manufacture $200")

        el-form-item(label="Selling price")
          Field(name="sellingPrice" v-slot="{ field }")
            el-input(:model-value="field.value" @update:model-value="field.onChange" placeholder="e.g price you are selling at $400")

      div.price-fields
        el-form-item(label="Commission")
          el-input(value="100%" disabled)
        el-form-item(label="Total revenue")
          el-input(value="200$" disabled)

    div.form-actions
      el-button(type="default" @click="$emit('goBack')") Back
      el-button(type="primary" native-type="submit") {{ mode === 'create' ? 'Create' : 'Update' }}
</template>

<script setup lang="ts">
import { Form, Field } from "vee-validate";
import { step2Schema } from "@/schemas/validation";
import type { ProductForm } from "@/types/create";

interface Props {
  form: ProductForm;
  mode: "create" | "update";
}

interface Emits {
  (e: "submitProduct", values: any): void;
  (e: "goBack"): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>
