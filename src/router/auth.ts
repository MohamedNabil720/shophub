import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";

export async function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore();

  if (to.path !== "/login" && !authStore.isAuthenticated) {
    return next("/login");
  }

  if (authStore.isAuthenticated) {
    try {
      const res = await axios.get(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        }
      );

      const user = res.data;

      if (user.role === "admin") {
        if (to.path === "/login") {
          return next("/dashboard");
        }
        return next();
      } else {
        authStore.setError("Only admin can access this route");
        useAuthStore().logout();
        return next("/login");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        authStore.setError("Only admin can access this route");
        useAuthStore().logout();
      }
      return next("/login");
    }
  }

  next();
}
