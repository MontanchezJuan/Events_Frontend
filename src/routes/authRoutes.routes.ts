import { lazy } from "react";
import { LAYOUTS } from "../components/templates/Layouts.routes";
import { Route } from "../routes";

export enum AUTH_ROUTES {
  LOGIN = "/login",
  SIGNUP = "/signup",
}

export const authRoutes: Route[] = [
  {
    component: lazy(() => import("../pages/auth/LoginPage")),
    layout: LAYOUTS.MAINLAYOUT,
    path: AUTH_ROUTES.LOGIN,
    requiredRoles: ["not-user"],
  },
  {
    component: lazy(() => import("../pages/auth/SingupPage")),
    layout: LAYOUTS.MAINLAYOUT,
    path: AUTH_ROUTES.SIGNUP,
    requiredRoles: ["not-user"],
  },
];
