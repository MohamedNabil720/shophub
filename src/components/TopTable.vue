<template lang="pug">
  div.top-table
   div.my-content
    div
     h3 {{ lastSegment }}

     div.right-icon
      <el-icon><HomeFilled /></el-icon> <el-icon><ArrowRight /></el-icon>
      span {{ lastSegment }}
    div
     <el-button size="large" @click="handleAdd" class="add-user-btn" type="info"> 
       <el-icon class="icon-space"><Plus />  </el-icon> Add  {{ lastSegment.slice(0, -1) }}  
     </el-button>
 
   Search
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import Search from "./Search.vue";

const route = useRoute();

const router = useRouter();

const lastSegment = computed(() => {
  const segments = route.path.split("/");
  return segments[segments.length - 1];
});

const handleAdd = () => {
  if (lastSegment.value === "products") {
    router.push("/products/create");
  } else if (lastSegment.value === "users") {
    router.push("/dashboard/users");
  } else {
    console.log("No route defined for:", lastSegment.value);
  }
};
</script>

<style lang="scss" scoped>
.top-table {
  padding-right: $margin-right-large;
  padding-left: $margin-left-small;
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
  display: flex;
  align-items: center;
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
