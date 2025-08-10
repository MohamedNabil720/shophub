import MainLayout from "@/layout/MainLayout.vue";
import CreateProduct from "@/pages/CreateProduct.vue";
import Login from "@/pages/Login.vue";
import Products from "@/pages/Products.vue";
import Users from "@/pages/Users.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/",
    //   name: "login",
    //   component: Login,
    // },
    {
      path: "/users",
      name: "users",
      component: Users,
    },
    {
      path: "/",
      name: "mainLayout",
      component: MainLayout,
    },
    {
      path: "/products",
      name: "products",
      component: Products,
    },
    {
      path: "/createproduct",
      name: "createproduct",
      component: CreateProduct,
    },
  ],
});

export default router;
