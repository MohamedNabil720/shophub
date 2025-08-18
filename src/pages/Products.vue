<template lang="pug">
TopTable

div.table-container
  el-table(:data="paginatedProducts" style="width: 100%")
    el-table-column(label="Product" min-width="200")
      template(#default="{ row }")
        div.user-info
          div.user-icon {{ row.category?.name?.charAt(0) || 'P' }}
          div.user-name
            div {{ truncateWords(row.title, 3) }}
            div # {{ row.id }}

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
        div.action-wrapper
          div.icon-actionsz
            el-icon
              View
            el-dropdown(trigger="click" :teleported="true")
              span.el-dropdown-link
                el-icon
                  More
              template(#dropdown)
                el-dropdown-menu
                  el-dropdown-item(@click="goToEdit(row)") Edit
                  el-dropdown-item(@click="openDeleteDialog(row)" class="delete-item") Delete

  div.table-footer
    span Showing {{ startIndex + 1 }}-{{ endIndex }} from {{ total }}
    el-pagination(
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      v-model:current-page="currentPage"
    )

  // ===== Custom Dialog =====
  el-dialog(
    v-model="isDialogVisible" 
    title="Delete product" 
    width="50%" 
    :modal="true"
    :close-on-click-modal="false"
    :close-on-press-escape="true"
    class="custom-delete-dialog"
    center
  )
    div.dialog-content
      div.dialog-message
        p Are you sure you want to delete product <strong>{{ productToDelete?.id || 'Unknown' }}</strong>?
        p.product-name {{ productToDelete?.title || 'Unknown Product' }}
      
    template(#footer)
      div.dialog-footer
        el-button(@click="cancelDelete" size="large") Cancel
        el-button(type="danger" @click="confirmDelete" :disabled="!productToDelete" size="large") Delete
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import TopTable from "@/components/TopTable.vue";
import { useSearchStore } from "@/stores/useSearchStore";

const router = useRouter();
const searchStore = useSearchStore();

interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  creationAt: string;
  updatedAt: string;
  category?: {
    id: number;
    name: string;
  };
}

const products = ref<Product[]>([]);
const total = ref(0);
const pageSize = ref(7);
const currentPage = ref(1);

const startIndex = computed(() => (currentPage.value - 1) * pageSize.value);
const endIndex = computed(() => {
  const end = startIndex.value + pageSize.value;
  return end > total.value ? total.value : end;
});

const filteredProducts = computed(() => {
  const search = searchStore.searchText.toLowerCase();
  return products.value.filter(
    (u) =>
      u.title.toLowerCase().includes(search) ||
      u.category?.name.toLowerCase().includes(search) ||
      u.price.toString().includes(search)
  );
});

const paginatedProducts = computed(() => {
  return filteredProducts.value.slice(startIndex.value, endIndex.value);
});

const truncateWords = (text: string, wordLimit: number) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB");
  } catch (error) {
    return "";
  }
};

// ===== Delete Dialog  =====
const isDialogVisible = ref(false);
const productToDelete = ref<Product | null>(null);

const openDeleteDialog = (row: Product) => {
  if (!row || !row.id) {
    console.error("Invalid product data:", row);
    return;
  }

  productToDelete.value = { ...row };
  isDialogVisible.value = true;
};

const cancelDelete = () => {
  isDialogVisible.value = false;
  productToDelete.value = null;
};

const goToEdit = (row: Product) => {
  if (!row?.id) return;
  router.push(`/products/update/${row.id}`);
};

const confirmDelete = async () => {
  if (!productToDelete.value || !productToDelete.value.id) {
    console.error("No product selected for deletion");
    return;
  }

  try {
    const productId = productToDelete.value.id;
    products.value = products.value.filter((p) => p.id !== productId);

    total.value = products.value.length;

    cancelDelete();

    console.log(`Product ${productId} deleted successfully`);
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

onMounted(async () => {
  try {
    const { data } = await axios.get<Product[]>(
      "https://api.escuelajs.co/api/v1/products/"
    );

    if (Array.isArray(data)) {
      products.value = data.filter((product) => product && product.id);
      total.value = products.value.length;
    } else {
      console.error("Invalid data format received");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});
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

  :deep(.el-icon) {
    font-size: 24px;
    color: #000;
    cursor: pointer;
  }
}

.el-dropdown-menu {
  padding: 10px 15px !important;
  background-color: $bg-menu;

  :deep(.delete-item) {
    color: $color-error;
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

.icon-actions {
  display: flex;
  align-items: center;
  gap: 10px;
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

// ===== Custom Dialog Styles =====
:deep(.custom-delete-dialog) {
  .el-dialog {
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

    .el-dialog__header {
      padding: 24px 24px 0 24px;
      border-bottom: 1px solid #f0f0f0;

      .el-dialog__title {
        font-size: 20px;
        font-weight: 600;
        color: #333;
      }
    }

    .el-dialog__body {
      padding: 24px;
      min-height: 120px;
    }

    .el-dialog__footer {
      padding: 0 24px 24px 24px;
      border-top: 1px solid #f0f0f0;
    }
  }
}

:deep(.el-overlay-dialog) {
  top: 50% !important;
  left: 40% !important;
  transform: translateY(-50%) !important;
}

.dialog-content {
  text-align: center;

  .dialog-message {
    margin-bottom: 20px;

    p {
      margin: 8px 0;
      font-size: 16px;
      color: #666;

      &:first-child {
        color: #333;
        font-weight: 500;
      }
    }

    .product-name {
      color: #e74c3c;
      font-weight: 600;
      font-size: 14px;
    }
  }
}

.dialog-footer {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;

  .el-button {
    padding: 12px 24px;
    font-weight: 500;
    border-radius: 8px;
    min-width: 100px;

    &.el-button--danger {
      background-color: #e74c3c;
      border-color: #e74c3c;

      &:hover {
        background-color: #c0392b;
        border-color: #c0392b;
      }
    }
  }
}
</style>
