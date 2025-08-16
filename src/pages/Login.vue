<template lang="pug">
main.login-container
  section.login-card
    img.login-logo(:src="logo", alt="Company Name Logo")

    el-form(class="login-form", label-position="top", @submit.prevent="onSubmit")
      el-form-item(label="Email", class="email", :error="errors.email")
        el-input.form-input(
          v-model="email", 
          class="email-input", 
          placeholder="Enter your email", 
          type="email", 
          aria-label="Email address",
          :class="{ 'is-error': errors.email }"
        )

      el-form-item(label="Password", class="password", :error="errors.password")
        el-input.form-input(
          v-model="password", 
          class="password-input", 
          placeholder="Enter your password", 
          show-password 
          type="password", 
          aria-label="Password",
          :class="{ 'is-error': errors.password }"
        )

      el-form-item
        el-button.login-btn(type="primary" native-type="submit" :loading="isLoading" :disabled="isLoading") Login



      .error-message(v-if="loginError") {{ loginError }}
</template>

<script setup lang="ts">
import logo from "@/assets/images/logo.png";
import axios from "axios";
import { useForm, useField } from "vee-validate";
import { ref } from "vue";
import * as yup from "yup";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "vue-router";

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const { handleSubmit, errors, meta } = useForm({
  validationSchema,
});

const { value: email } = useField("email");
const { value: password } = useField("password");

const loginError = ref("");
const isLoading = ref(false);

const router = useRouter();
const authStore = useAuthStore();

const onSubmit = handleSubmit(async (formValues) => {
  isLoading.value = true;
  try {
    const response = await axios.post(
      "https://api.escuelajs.co/api/v1/auth/login",
      {
        email: formValues.email,
        password: formValues.password,
      }
    );

    authStore.login(response.data.access_token, { email: formValues.email });

    loginError.value = "";
    router.push("/dashboard");
  } catch (error) {
    console.error(" Login failed:", error);
    loginError.value = "Invalid email or password";
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped lang="scss">
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  width: 340px;
  display: flex;
  justify-items: start;
  align-items: start;
  flex-direction: column;
}

.login-form {
  width: 100%;

  :deep(.el-form-item__label) {
    margin-top: 14px !important;
    color: $color-text;
    display: block;
  }

  :deep(.el-form-item__error) {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
  }

  .el-form-item {
    position: relative;
    margin-bottom: 22px;
  }
}

.email-input,
.password-input {
  :deep(.el-input__wrapper) {
    padding: 6px 9px;
    border-radius: 8px;
    transition: border-color 0.2s;
  }

  &.is-error :deep(.el-input__wrapper) {
    border-color: #f56c6c;
  }
}

.login-btn {
  width: 100%;
  margin-top: 18px !important;
  background-color: $login-btn;
  padding: 19px 0px;
  border-radius: 8px;
  color: white;
  transition: opacity 0.2s;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.error-message {
  color: #f56c6c;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
  padding: 8px;
  background-color: #fef0f0;
  border: 1px solid #fde2e2;
  border-radius: 4px;
}
</style>
