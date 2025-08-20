<template lang="pug">
div.table-footer
  span Showing {{ paginationInfo.startIndex + 1 }}-{{ paginationInfo.endIndex }} from {{ paginationInfo.total }}
  el-pagination(
    background
    layout="prev, pager, next"
    :total="paginationInfo.total"
    :page-size="paginationInfo.pageSize"
    v-model:current-page="currentPage"
  )
</template>

<script setup lang="ts">
import type { ProductPaginationInfo } from "@/types/Product";

interface Props {
  paginationInfo: ProductPaginationInfo;
}

defineProps<Props>();

const currentPage = defineModel<number>("currentPage", { required: true });
</script>

<style scoped lang="scss">
.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}
</style>
