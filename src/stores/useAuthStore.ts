// src/stores/useAuthStore.ts
import { defineStore } from "pinia";
import Cookies from "js-cookie";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: Cookies.get("token") || "",
    errorMessage: null as string | null, // ✨ لتخزين الرسالة
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    login(token: string, user: any) {
      this.token = token;
      Cookies.set("token", token, { expires: 5, secure: true });
    },

    logout() {
      this.token = "";
      Cookies.remove("token");
    },

    setError(message: string | null) {
      this.errorMessage = message;
    },
  },
});
