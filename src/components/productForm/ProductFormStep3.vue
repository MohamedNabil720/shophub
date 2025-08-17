<template lang="pug">
div.step3-container
  img.done-image(:src="doneImage", alt="Done icon")
  h2.success-title You are caught up
  p.success-message Product has been created successfully
  p.success-message Press "Done" to return back to your dashboard
  div.done-btn
    el-button(type="primary" @click="$emit('goToDashboard')") Done
</template>

<script setup lang="ts">
import doneImage from "@/assets/images/done.png";

interface Emits {
  (e: "goToDashboard"): void;
}

defineEmits<Emits>();
</script>

<style scoped lang="scss">
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
