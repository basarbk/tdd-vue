import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import SignUpPage from "../pages/SignUpPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import UserPage from "../pages/UserPage.vue";
import AccountActivationPage from "../pages/AccountActivationPage.vue";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/signup",
    component: SignUpPage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/user/:id",
    component: UserPage,
  },
  {
    path: "/activate/:token",
    component: AccountActivationPage,
  },
];

const router = createRouter({ routes, history: createWebHistory() });

export default router;
