import { ref, computed, onMounted } from "vue";
import { UserService } from "@/services/userService";
import { UserFilter } from "@/utility/userFilter";
import { usePagination } from "@/composables/usePagination";
import { useSearchStore } from "@/stores/useSearchStore";
import type { User } from "@/types/User";

export function useUsers() {
  const users = ref<User[]>([]);
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
  } = usePagination();

  const filteredUsers = computed(() =>
    UserFilter.filterBySearch(users.value, searchStore.searchText)
  );

  const paginatedUsers = computed(() =>
    UserFilter.paginateUsers(
      filteredUsers.value,
      startIndex.value,
      pageSize.value
    )
  );

  async function loadUsers() {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await UserService.fetchUsers();
      users.value = data;
      setTotal(data.length);
    } catch (err) {
      error.value = "Failed to load users";
      console.error("Error loading users:", err);
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(() => {
    loadUsers();
  });

  return {
    users,
    isLoading,
    error,
    filteredUsers,
    paginatedUsers,
    paginationInfo,
    currentPage,
    pageSize,
    loadUsers,
    resetPagination,
  };
}
