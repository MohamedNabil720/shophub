<template lang="pug">
main.login-container
  section.login-card
    img.login-logo(:src="logo", alt="Company Name Logo")

    el-form(:model="form", class="login-form", label-position="top", @submit.prevent="handleLogin")
      el-form-item(label="Email", class="email")
        el-input.form-input(v-model="form.email", class="email-input", placeholder="Enter your email", type="email", aria-label="Email address")

      el-form-item(label="Password", class="password")
        el-input.form-input(v-model="form.password", class="password-input", placeholder="Enter your password", show-password type="password", aria-label="Password")

      el-form-item
        el-button.login-btn(type="submit") Login
</template>

<script setup lang="ts">
import logo from "../assets/images/logo.png";

import { reactive } from "vue";

const form = reactive({
  email: "",
  password: "",
});

const handleLogin = () => {
  console.log("Email:", form.email);
  console.log("Password:", form.password);
};
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
    margin-top: 14px;
    margin-bottom: 0;
    color: $color-text;
    display: block;
  }
}

.email-input,
.password-input {
  :deep(.el-input__wrapper) {
    padding: 6px 9px;
    border-radius: 8px;
  }
}

.login-btn {
  width: 100%;
  margin-top: 18px !important;
  background-color: $login-btn;
  padding: 19px 0px;
  border-radius: 8px;
  color: white;
}
</style>
