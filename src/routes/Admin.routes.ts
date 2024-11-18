import { lazy } from "react";
import { Route } from "../interfaces/Route.interfaces";

export enum ADMINROUTES {
  HOME = "/",
  USERS = "/list-users",
  EVENTS = "/list-events",
  EVENT = "/event/:id?",
  USER = "/user/:id?",
 PROFILE = "/admin-profile/:id?",
}

// Here are routes to admin role
export const AdminRoutes: Route[] = [
  {
    component: lazy(() => import("../pages/admin/DashboardPage")),
    index: true,
    path: ADMINROUTES.HOME,
  },
  {
  component: lazy(() => import("../pages/admin/AdminProfile")),
  path: ADMINROUTES.PROFILE,
  },
  {
    component: lazy(() => import("../pages/admin/ListUsersPage")),
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
  {
    component: lazy(() => import("../pages/admin/UserPage")),
    path: ADMINROUTES.USER,
  },
];
