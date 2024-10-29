import { lazy } from "react";
import { Route } from "../interfaces/Route.interfaces";

export enum USERROUTES {
  LANDING = "/",
}

// Here are routes to user role
export const UserRoutes: Route[] = [
  {
    component: lazy(() => import("../pages/common/LandingPage")),
    index: true,
    path: USERROUTES.LANDING,
  },
];
