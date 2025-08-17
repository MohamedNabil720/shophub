<template lang="pug">
div.page-wrapper
  div.product-form
    el-steps(:active="currentStep" align-center)
      el-step()
      el-step()
      el-step()

    // ---------------- Step 1 ----------------

    template(v-if="currentStep === 1")
      h3.form-title Product information
      Form( :key="formKey" :validation-schema="step1Schema" :initial-values="form" @submit="goToStep2" v-slot="{ errors, setFieldValue }")
        Field(name="thumbnail" type="hidden")

        div.form-body
          div.thumbnail-section
            p.thumbnail-label Thumbnail
            div.thumbnail-upload(@click="$refs.fileInput.click()")
              template(v-if="previewImage")
                img(:src="previewImage" style="width:100%; height:100%; object-fit:cover;")
              template(v-else)
                i.el-icon-plus +
            input(
              type="file"
              accept="image/*"
              ref="fileInput"
              style="display:none"
              @change="e => uploadThumbnail(e, setFieldValue)"
            )
            small.note Note: formats: jpg, jpeg, png
            span.error {{ errors.thumbnail }}

          div.fields-section
            el-form(label-position="top" class="myForm" label-width="120px")
              el-form-item(label="Product title", :error="errors.title")
                Field(name="title" v-slot="{ field }")
                  el-input(:model-value="field.value" @update:model-value="field.onChange" placeholder="e.g. valuable, premium television")

              el-form-item(label="Slug" , :error="errors.slug")
                Field(name="slug" v-slot="{ field }")
                  el-input(:model-value="field.value" @update:model-value="field.onChange" placeholder="Enter slug")

              el-form-item(label="Category", :error="errors.category")
                Field(name="category" v-slot="{ field }")
                  el-select(:model-value="field.value" @update:model-value="field.onChange" placeholder="Choose category")
                    el-option(v-for="item in categories" :key="item.value" :label="item.label" :value="item.value")

        el-form(label-position="top" label-width="120px")
          el-form-item(label="Description", :error="errors.description")
            Field(name="description" v-slot="{ field }")
              el-input(type="textarea" :rows="8" :model-value="field.value" @update:model-value="field.onChange" placeholder="Type something..")

        div.form-actions
          el-button(type="default") Cancel
          el-button(type="primary" native-type="submit" :loading="uploading") Next

    // ---------------- Step 2 ----------------

    template(v-else-if="currentStep === 2")
      h3.form-title Product Pricing
      Form(:validation-schema="step2Schema" :initial-values="form" @submit="submitProduct" v-slot="{ errors }")
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
          el-button(type="default" @click="currentStep = 1") Back
          el-button(type="primary" native-type="submit") {{ props.mode === 'create' ? 'Create' : 'Update' }}

    // ---------------- Step 3 ----------------
    
    template(v-else-if="currentStep === 3")
      div.step3-container
        img.done-image(:src="doneImage", alt="Done icon")
        h2.success-title You are caught up
        p.success-message Product has been created successfully
        p.success-message Press "Done" to return back to your dashboard
        div.done-btn
          el-button(type="primary" @click="goToDashboard") Done
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import doneImage from "@/assets/images/done.png";
import router from "@/router";

interface Props {
  mode: "create" | "update";
  id?: string;
}
const props = defineProps<Props>();

const currentStep = ref(1);
const previewImage = ref<string | null>(null);
const uploading = ref(false);

const form = ref({
  title: "",
  slug: "",
  category: "",
  description: "",
  thumbnail: "",
  plan: "",
  productPrice: "",
  sellingPrice: "",
});

// const categories = [
//   { label: "Clothes", value: 1 },
//   { label: "Electronics", value: 2 },
//   { label: "Kids", value: 3 },
//   { label: "Others", value: 4 },
// ];

// Schema Step 1
const step1Schema = yup.object({
  title: yup.string().required("Title is required"),
  slug: yup.string().required("Slug is required"),
  description: yup.string().required("Description is required"),
  category: yup
    .string()
    .typeError("Category is required")
    .required("Category is required"),
  thumbnail: yup.string().required("Img is required"),
});

// Schema Step 2
const step2Schema = yup.object({
  productPrice: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
});

function goToStep2(values: any) {
  form.value = { ...form.value, ...values };
  currentStep.value = 2;
}

async function uploadThumbnail(e: Event, setFieldValue: any) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  previewImage.value = URL.createObjectURL(file);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "my_img");

  uploading.value = true;
  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/drok6e3iu/image/upload",
      formData
    );

    setFieldValue("thumbnail", res.data.secure_url);
    form.value.thumbnail = res.data.secure_url;
  } catch (err) {
    console.error("❌ Error uploading image:", err);
  } finally {
    uploading.value = false;
  }
}

const formKey = ref(0);

const categories = ref<{ label: string; value: number }[]>([]);

// ---------------- Load product if update ----------------
onMounted(async () => {
  try {
    // ✅ هات الكاتيجوريز من الـ API
    const { data } = await axios.get(
      "https://api.escuelajs.co/api/v1/categories"
    );
    categories.value = data.map((cat: any) => ({
      label: cat.name,
      value: cat.id,
    }));
  } catch (err) {
    console.error("❌ Error loading categories:", err);
  }

  if (props.mode === "update" && props.id) {
    try {
      const { data } = await axios.get(
        `https://api.escuelajs.co/api/v1/products/${props.id}`
      );

      form.value = {
        title: data.title,
        slug: data.title.toLowerCase().replace(/\s+/g, "-"),
        category: data.category?.name,
        description: data.description,
        thumbnail: data.images[0],
        plan: "Paid",
        productPrice: data.price,
        sellingPrice: data.price,
      };
      console.log(data.category);

      previewImage.value = data.images[0];

      // force re-render of <Form>
      formKey.value++;
    } catch (err) {
      console.error("❌ Error loading product:", err);
    }
  }
});

// ---------------- Create / Update product ----------------
async function submitProduct(values: any) {
  form.value = { ...form.value, ...values };

  const payload = {
    title: form.value.title,
    price: Number(form.value.productPrice),
    description: form.value.description,
    categoryId: Number(form.value.category),
    images: [form.value.thumbnail],
    plan: form.value.plan,
    sellingPrice: form.value.sellingPrice,
  };

  try {
    if (props.mode === "create") {
      const { data } = await axios.post(
        "https://api.escuelajs.co/api/v1/products/",
        payload
      );
      console.log("✅ Product Created:", data);
    } else if (props.mode === "update" && props.id) {
      const { data } = await axios.put(
        `https://api.escuelajs.co/api/v1/products/${props.id}`,
        payload
      );
      console.log("✅ Product Updated:", data);
    }
    currentStep.value = 3;
  } catch (err: any) {
    console.error("❌ Error:", err.response?.data || err.message);
  }
}

function goToDashboard() {
  router.push("/dashboard");
}
</script>

<style scoped lang="scss">
.page-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}

:deep(.el-step__head.is-finish) {
  color: #22c55e;
  .el-step__icon.is-text {
    background-color: #22c55e;
    .el-step__icon-inner {
      color: #fff;
    }
  }
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

.step3-container {
  text-align: center;
  color: #00ff00;

  .success-title {
    font-size: 40px;
    font-weight: bold;
  }

  .success-message {
    font-size: 14px;
    margin: 5px 0;
  }

  .done-btn {
    margin-top: 150px !important;
    width: 100%;
    text-align: end;
  }
}
</style>
