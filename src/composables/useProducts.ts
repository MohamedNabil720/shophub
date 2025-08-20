import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ProductService } from "@/services/productService";
import { ProductUtils } from "@/utility/productUtils";
import { useProductPagination } from "@/composables/useProductPagination";
import { useDeleteDialog } from "@/composables/useDeleteDialog";
import { useSearchStore } from "@/stores/useSearchStore";
import type { Product } from "@/types/Product";

export function useProducts() {
  const router = useRouter();
  const products = ref<Product[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const searchStore = useSearchStore();

  const {
    total,
    pageSize,
    currentPage,
    startIndex,
    endIndex,
    paginationInfo,
    setTotal,
    resetPagination,
  } = useProductPagination();

  const {
    isDialogVisible,
    productToDelete,
    openDeleteDialog,
    cancelDelete,
    resetDialog,
  } = useDeleteDialog();

  const filteredProducts = computed(() =>
    ProductUtils.filterProducts(products.value, searchStore.searchText)
  );

  const paginatedProducts = computed(() =>
    ProductUtils.paginateProducts(
      filteredProducts.value,
      startIndex.value,
      pageSize.value
    )
  );

  async function loadProducts() {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await ProductService.fetchProducts();
      products.value = data;
      setTotal(data.length);
    } catch (err) {
      error.value = "Failed to load products";
      console.error("Error loading products:", err);
    } finally {
      isLoading.value = false;
    }
  }

  function goToEdit(product: Product) {
    if (!product?.id) return;
    router.push(`/products/update/${product.id}`);
  }

  async function confirmDelete() {
    if (!productToDelete.value || !productToDelete.value.id) {
      console.error("No product selected for deletion");
      return;
    }

    try {
      const productId = productToDelete.value.id;

      // Remove from local state (since API might not actually delete)
      products.value = products.value.filter((p) => p.id !== productId);
      setTotal(products.value.length);

      cancelDelete();
      console.log(`Product ${productId} deleted successfully`);
    } catch (err) {
      error.value = "Failed to delete product";
      console.error("Error deleting product:", err);
    }
  }

  onMounted(() => {
    loadProducts();
  });

  return {
    // Data
    products,
    isLoading,
    error,
    filteredProducts,
    paginatedProducts,

    // Pagination
    paginationInfo,
    currentPage,
    pageSize,

    // Dialog
    isDialogVisible,
    productToDelete,

    // Methods
    loadProducts,
    goToEdit,
    openDeleteDialog,
    cancelDelete,
    confirmDelete,
    resetPagination,
    resetDialog,

    // Utilities (for template use)
    truncateWords: ProductUtils.truncateWords,
    formatDate: ProductUtils.formatDate,
  };
}
