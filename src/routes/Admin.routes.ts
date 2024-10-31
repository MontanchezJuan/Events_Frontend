import { lazy } from "react";
import { Route } from "../interfaces/Route.interfaces";

export enum ADMINROUTES {
  HOME = "/",
  USERS = "/list-users",
  EVENTS = "/list-events",
  EVENT = "/event/:id?",
}

// Here are routes to admin role
export const AdminRoutes: Route[] = [
  {
    component: lazy(() => import("../pages/admin/DashboardPage")),
    index: true,
    path: ADMINROUTES.HOME,
  },
  {
    component: lazy(() => import("../pages/admin/UsersPage")),
    path: ADMINROUTES.USERS,
  },
  {
    component: lazy(() => import("../pages/admin/ListEventsPage")),
    path: ADMINROUTES.EVENTS,
  },
  {
    component: lazy(() => import("../pages/admin/EventPage")),
    path: ADMINROUTES.EVENT,
  },
];
