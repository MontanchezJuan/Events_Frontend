import { lazy } from "react";
import { LAYOUTS } from "../../components/templates/Layouts.routes";
import { Route } from "../../routes";

export enum COMMON_ROUTES {
  LANDING = "/",
  NOTFOUND = "*",
}

export const commonRoutes: Route[] = [
  {
    component: lazy(() => import("./LandingPage")),
    path: COMMON_ROUTES.LANDING,
    protected: false,
    layout: LAYOUTS.MAINLAYOUT,
  },
  {
    component: lazy(() => import("./NotFoundPage")),
    path: COMMON_ROUTES.NOTFOUND,
    protected: false,
    layout: LAYOUTS.MAINLAYOUT,
  },
];
