import { lazy } from "react";
import { Route } from "../interfaces/Route.interfaces";

export enum ORGANIZERROUTES {
  HOME = "/",
  MY_PROFILE = "/my-profile",
}

// Here are routes to organizer role
export const OrganizerRoutes: Route[] = [
  {
    component: lazy(() => import("../pages/organizer/DashboardPage")),
    index: true,
    path: ORGANIZERROUTES.HOME,
  },
  {
    component: lazy(() => import("../pages/common/MyProfilePage")),
    path: ORGANIZERROUTES.MY_PROFILE,
  },
];
