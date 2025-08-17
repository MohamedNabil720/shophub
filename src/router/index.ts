import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "./auth";

import MainLayout from "@/layout/MainLayout.vue";
import Login from "@/pages/Login.vue";
import Users from "@/pages/Users.vue";
import Products from "@/pages/Products.vue";
import NotFound from "@/pages/NotFound.vue";
import CreateProduct from "@/pages/CreateProduct.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    component: MainLayout,
    children: [
      {
        path: "",
        redirect: "/dashboard/users",
      },
      {
        path: "users",
        name: "Users",
        component: Users,
      },
      {
        path: "products",
        name: "Products",
        component: Products,
      },
    ],
  },
  // CreateProduct & UpdateProduct as standalone (no navbar/side bar)
  {
    path: "/products/create",
    name: "CreateProduct",
    component: CreateProduct,
    props: { mode: "create" },
    meta: { requiresAuth: true },
  },
  {
    path: "/products/update/:id",
    name: "UpdateProduct",
    component: CreateProduct,
    props: (route) => ({ mode: "update", id: route.params.id }),
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global Guard
router.beforeEach(authGuard);

export default router;
