import { createRouter, createWebHistory } from "vue-router";
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
    path: "/create-product",
    name: "CreateProduct",
    component: CreateProduct,
  },
  {
    path: "/dashboard",
    component: MainLayout,
    children: [
      {
        path: "users",
        name: "Users",
        component: Users,
      },
      {
        path: "products",

        component: Products,
        children: [
          {
            path: "create",
            name: "create",
            component: CreateProduct,
          },
        ],
      },
      {
        path: "/",
        redirect: "/dashboard/users",
      },
    ],
  },
  // {
  //   path: "/:pathMatch(.*)*",
  //   name: "NotFound",
  //   component: NotFound,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
