<!-- pages/ProductsTable.vue -->
<template lang="pug">
TopTable

div.table-container
  el-table(:data="paginatedProducts" style="width: 100%")
    el-table-column(label="Product" min-width="200")
      template(#default="{ row }")
        ProductAvatar(:product="row")

    el-table-column(label="Slug" min-width="240")
      template(#default="{ row }")
        span {{ truncateWords(row.slug, 3) }}

    el-table-column(label="Description" min-width="220")
      template(#default="{ row }")
        span {{ truncateWords(row.description, 5) }}

    el-table-column(label="Category" width="140")
      template(#default="{ row }")
        span {{ row.category?.name || 'N/A' }}

    el-table-column(label="Price" width="100")
      template(#default="{ row }")
        span $ {{ row.price || '0' }}

    el-table-column(label="Created At" width="140")
      template(#default="{ row }")
        span {{ formatDate(row.creationAt) }}

    el-table-column(label="Updated At" width="140")
      template(#default="{ row }")
        span {{ formatDate(row.updatedAt) }}

    el-table-column(label="Action" width="100")
      template(#default="{ row }")
        ProductActions(
          :product="row"
          @edit="goToEdit"
          @delete="openDeleteDialog"
        )

  ProductPagination(
    :pagination-info="paginationInfo"
    v-model:current-page="currentPage"
  )

  DeleteProductDialog(
    v-model:visible="isDialogVisible"
    :product="productToDelete"
    @confirm="confirmDelete"
    @cancel="cancelDelete"
  )
</template>

<script setup lang="ts">
import TopTable from "@/components/TopTable.vue";
import ProductAvatar from "@/components/product/ProductAvatar.vue";
import ProductActions from "@/components/product/ProductActions.vue";
import ProductPagination from "@/components/product/ProductPagination.vue";
import DeleteProductDialog from "@/components/product/DeleteProductDialog.vue";
import { useProducts } from "@/composables/useProducts";

const {
  paginatedProducts,
  paginationInfo,
  currentPage,
  isDialogVisible,
  productToDelete,
  goToEdit,
  openDeleteDialog,
  cancelDelete,
  confirmDelete,
  truncateWords,
  formatDate,
} = useProducts();
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
