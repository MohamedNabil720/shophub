<!-- pages/UsersTable.vue -->
<template lang="pug">
TopTable

div.table-container
  el-table(:data="paginatedUsers" style="width: 100%")
    el-table-column(label="User")
      template(#default="{ row }")
        UserAvatar(:user="row")
    el-table-column(prop="email" label="Email")
    el-table-column(prop="role" label="Role")

  TablePagination(
    :pagination-info="paginationInfo"
    v-model:current-page="currentPage"
  )
</template>

<script setup lang="ts">
import TopTable from "@/components/TopTable.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import TablePagination from "@/components/TablePagination.vue";
import { useUsers } from "@/composables/useUsers";

const { paginatedUsers, paginationInfo, currentPage } = useUsers();
</script>

<style scoped lang="scss">
.table-container {
  padding-right: $margin-right-large;
  padding-left: $margin-left-small;
  overflow-x: auto;

  :deep(.is-leaf) {
    font-weight: bold;
    color: #000;
  }
}
</style>
