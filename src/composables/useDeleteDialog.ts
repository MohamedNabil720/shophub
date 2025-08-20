import { ref } from "vue";
import type { Product, DeleteDialogState } from "@/types/Product";

export function useDeleteDialog() {
  const isDialogVisible = ref(false);
  const productToDelete = ref<Product | null>(null);

  const dialogState = ref<DeleteDialogState>({
    isVisible: false,
    productToDelete: null,
  });

  function openDeleteDialog(product: Product) {
    if (!product || !product.id) {
      console.error("Invalid product data:", product);
      return;
    }

    productToDelete.value = { ...product };
    isDialogVisible.value = true;
    dialogState.value = {
      isVisible: true,
      productToDelete: { ...product },
    };
  }

  function cancelDelete() {
    isDialogVisible.value = false;
    productToDelete.value = null;
    dialogState.value = {
      isVisible: false,
      productToDelete: null,
    };
  }

  function resetDialog() {
    cancelDelete();
  }

  return {
    isDialogVisible,
    productToDelete,
    dialogState,
    openDeleteDialog,
    cancelDelete,
    resetDialog,
  };
}
