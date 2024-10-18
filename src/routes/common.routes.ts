import { lazy } from "react";
import { LAYOUTS } from "../components/templates/Layouts.routes";
import { Route } from "../routes";

// Only the route with "/" carries index: true
export enum COMMON_ROUTES {
  LANDING = "/",
}

export const commonRoutes: Route[] = [
  {
    component: lazy(() => import("../pages/common/LandingPage")),
    index: true,
    layout: LAYOUTS.MAINLAYOUT,
    path: COMMON_ROUTES.LANDING,
    requiredRoles: ["not-user"],
  },
];
