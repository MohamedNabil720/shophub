// src/router/auth.ts
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";

export function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore();

  if (to.path !== "/" && !authStore.isAuthenticated) {
    return next("/");
  }

  if (to.path === "/" && authStore.isAuthenticated) {
    return next("/dashboard");
  }

  next();
}
