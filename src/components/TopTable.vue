<template lang="pug">
  div.top-table
   div.my-content
    div
     h3 Users

     div.right-icon
      <el-icon><HomeFilled /></el-icon> <el-icon><ArrowRight /></el-icon>
      span Users
    div
     <el-button size="large" class="add-user-btn" type="info"> <el-icon class="icon-space"><Plus /> </el-icon>   Add user
     </el-button>
 
   Search

</template>

<script setup lang="ts">
import Search from "./Search.vue";
</script>

<style lang="scss" scoped>
.top-table {
  margin-right: $margin-right-large;
  margin-left: $margin-left-small;
  margin-top: 50px;
}

.my-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  h3 {
    font-weight: 600;
    font-size: 24px;
  }
}

.right-icon {
  font-size: 12px;
  margin-top: 3px;
  span {
    color: #0000004f;
  }
}

.icon-space {
  margin-right: 5px !important;
}

.add-user-btn {
  padding: 12px 25px;
  font-size: 16px;
  background-color: #4c4c4c;
}
</style>
