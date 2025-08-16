<template lang="pug">
TopTable

div.table-container
  el-table(:data="paginatedUsers" style="width: 100%")
    el-table-column(label="User")
      template(#default="{ row }")
        div.user-info
          div.user-icon {{ row.name.charAt(0) }}
          div.user-name
            div {{ row.name }}
            div {{ row.role }}
    el-table-column(prop="email" label="Email")
    el-table-column(prop="role" label="Role")

  div.table-footer
    span Showing {{ startIndex + 1 }}-{{ endIndex }} from {{ total }}
    el-pagination(
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      v-model:current-page="currentPage"
    )
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import TopTable from "@/components/TopTable.vue";

const users = ref<any[]>([]);
const total = ref(0);
const pageSize = ref(7);
const currentPage = ref(1);

const startIndex = computed(() => (currentPage.value - 1) * pageSize.value);
const endIndex = computed(() => {
  const end = startIndex.value + pageSize.value;
  return end > total.value ? total.value : end;
});

const paginatedUsers = computed(() => {
  return users.value.slice(startIndex.value, endIndex.value);
});

onMounted(async () => {
  try {
    const { data } = await axios.get("https://api.escuelajs.co/api/v1/users/");

    users.value = data;
    total.value = data.length;
  } catch (error) {
    console.error("Error", error);
  }
});
</script>

<style scoped lang="scss">
.table-container {
  margin-right: $margin-right-large;
  margin-left: $margin-left-small;

  :deep(.is-leaf) {
    font-weight: bold;
    color: #000;
  }
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-icon {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.user-name {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}
</style>
