<template lang="pug">
nav.navbar
  div
   <el-icon style="font-size: 24px" ><MoreFilled /></el-icon>
  div.user
   div.user-info
    div.user-icon B
    div.user-name
     div Baianat Company
     div Super Admin
     
    
   div
    <el-icon style="font-size: 18px" ><ArrowDown /></el-icon>
    
  
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 70px 30px;
  background-color: #fff;
  border-bottom: 1px solid #eee;

  .user {
    display: flex;
    align-items: center;

    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-right: 80px;
    }
    .user-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #f0f0f0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      color: #333;
    }
    .user-name {
      font-size: 14px;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
