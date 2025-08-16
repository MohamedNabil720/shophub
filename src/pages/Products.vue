<template lang="pug">
TopTable

div.table-container
  el-table(:data="paginatedProducts" style="width: 100%")
    el-table-column(label="Product" min-width="200")
      template(#default="{ row }")
        div.user-info
          div.user-icon {{ row.category.name.charAt(0) }}
          div.user-name
            div {{ truncateWords(row.title, 3) }}
            div # {{ row.id }}

    el-table-column(label="Slug" min-width="240")
      template(#default="{ row }")
        span {{ truncateWords(row.slug, 3) }}

    el-table-column(label="Description" min-width="230")
      template(#default="{ row }")
        span {{ truncateWords(row.description, 5) }}

    el-table-column(label="Category" width="120")
      template(#default="{ row }")
        span {{ row.category?.name }}

    el-table-column(label="Price" width="100")
      template(#default="{ row }")
        span $ {{ row.price }}

    el-table-column(label="Created At" width="140")
      template(#default="{ row }")
        span {{ formatDate(row.creationAt) }}

    el-table-column(label="Updated At" width="140")
      template(#default="{ row }")
        span {{ formatDate(row.updatedAt) }}

    el-table-column(label="Action" width="100")
      template(#default="{ row }")
        div.action-wrapper
          div.icon-actions
            el-icon
              View
            el-dropdown(trigger="click" :teleported="true")
              span.el-dropdown-link
                el-icon
                  More
              template(#dropdown)
                el-dropdown-menu
                  el-dropdown-item() Edit
                  el-dropdown-item(@click="deleteProduct(row.id)" , class="delete-item") Delete


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

const selectedRowId = ref<number | null>(null);

const toggleMenu = (id: number) => {
  selectedRowId.value = selectedRowId.value === id ? null : id;
};

const products = ref<any[]>([]);
const total = ref(0);
const pageSize = ref(7);
const currentPage = ref(1);

const startIndex = computed(() => (currentPage.value - 1) * pageSize.value);
const endIndex = computed(() => {
  const end = startIndex.value + pageSize.value;
  return end > total.value ? total.value : end;
});

const paginatedProducts = computed(() => {
  return products.value.slice(startIndex.value, endIndex.value);
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
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB");
};

const deleteProduct = (id: number) => {
  console.log("Delete product", id);
};

onMounted(async () => {
  try {
    const { data } = await axios.get(
      "https://api.escuelajs.co/api/v1/products/"
    );
    products.value = data;
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

.menu-item {
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #d6d6d6;
  }
}

.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}
</style>
