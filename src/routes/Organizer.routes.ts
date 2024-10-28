import { lazy } from "react";
import { Route } from "../interfaces/Route.interfaces";

export enum ORGANIZERROUTES {
  HOME = "/",
}

// Here are routes to organizer role
export const OrganizerRoutes: Route[] = [
  {
    component: lazy(() => import("../pages/admin/DashboardPage")),
    index: true,
    path: ORGANIZERROUTES.HOME,
  },
];
