import { ref, computed } from "vue";
import type { PaginationInfo } from "@/types/User";

export function usePagination(initialPageSize: number = 7) {
  const total = ref(0);
  const pageSize = ref(initialPageSize);
  const currentPage = ref(1);

  const startIndex = computed(() => (currentPage.value - 1) * pageSize.value);

  const endIndex = computed(() => {
    const end = startIndex.value + pageSize.value;
    return end > total.value ? total.value : end;
  });

  const paginationInfo = computed(
    (): PaginationInfo => ({
      total: total.value,
      pageSize: pageSize.value,
      currentPage: currentPage.value,
      startIndex: startIndex.value,
      endIndex: endIndex.value,
    })
  );

  function setTotal(newTotal: number) {
    total.value = newTotal;
  }

  function resetPagination() {
    currentPage.value = 1;
  }

  return {
    total,
    pageSize,
    currentPage,
    startIndex,
    endIndex,
    paginationInfo,
    setTotal,
    resetPagination,
  };
}
