import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import UserPage from "../pages/UserPage";
import AccountActivationPage from "../pages/AccountActivationPage";

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
