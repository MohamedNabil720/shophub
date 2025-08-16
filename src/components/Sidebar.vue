<template lang="pug">
aside.sidebar
  div.logo
   img( :src="logo", alt="Logo")
  nav
    ul
      li  <div class="link" to="#"> <el-icon style="font-size: 24px" ><OfficeBuilding /></el-icon> Analytics</div> 
      li  <router-link class="link" to="/dashboard/users"> <el-icon style="font-size: 24px"  ><User /></el-icon> Users</router-link>
      li  <router-link class="link" to="/dashboard/products"> <el-icon style="font-size: 24px" ><Menu /></el-icon> Products</router-link>

    
    
</template>

<script setup>
import logo from "../assets/images/logo.png";
</script>

<style lang="scss" scoped>
.sidebar {
  width: 240px;
  background: #fff;
  border-right: 1px solid #eee;
  padding: 20px;
}
.logo {
  text-align: center;
  margin-bottom: 30px;
}
li {
  margin-bottom: 10px;
  width: 100%;
  display: block;
}
.link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 9px;
  border-radius: 8px;
}

.router-link-active {
  background-color: #f0f0f0;
}
</style>
