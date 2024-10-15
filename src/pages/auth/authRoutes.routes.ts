import { lazy } from "react";
import { LAYOUTS } from "../../components/templates/Layouts.routes";
import { Route } from "../../routes";

export enum AUTH_ROUTES {
  LOGIN = "/login",
  SIGNUP = "/signup",
}

export const authRoutes: Route[] = [
  {
    component: lazy(() => import("./LoginPage")),
    path: AUTH_ROUTES.LOGIN,
    protected: false,
    layout: LAYOUTS.MAINLAYOUT,
  },
  {
    component: lazy(() => import("./SingupPage")),
    path: AUTH_ROUTES.SIGNUP,
    protected: false,
    layout: LAYOUTS.MAINLAYOUT,
  },
];
