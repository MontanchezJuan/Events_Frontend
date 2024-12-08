import { lazy } from "react";
import { Route } from "../interfaces/Route.interfaces";

export enum PUBLICROUTES {
  Landing = "/",
  Login = "login",
  Signup = "signup",
  ViewEvent = "events/event/:id?",
}

// Here are routes to unauthenticated role
export const PublicRoutes: Route[] = [
  {
    component: lazy(() => import("../pages/common/LandingPage")),
    index: true,
    path: PUBLICROUTES.Landing,
  },
  {
    component: lazy(() => import("../pages/auth/LoginPage")),
    path: PUBLICROUTES.Login,
  },
  {
    component: lazy(() => import("../pages/auth/SingupPage")),
    path: PUBLICROUTES.Signup,
  },
  {
    component: lazy(() => import("../pages/common/ViewEventPage")),
    path: PUBLICROUTES.ViewEvent,
  },
];
