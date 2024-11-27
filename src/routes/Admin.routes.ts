import { lazy } from "react";
import { Route } from "../interfaces/Route.interfaces";

export enum ADMINROUTES {
  HOME = "/",
  EVENT = "/event/:id?",
  EVENTS = "/list-events",
  INSCRIPTION = "/inscription/:id?",
  INSCRIPTIONS = "/list-inscriptions",
  PROFILE = "/profile/:id?",
  USER = "/user/:id?",
  USERS = "/list-users",
}

// Here are routes to admin role
export const AdminRoutes: Route[] = [
  {
    component: lazy(() => import("../pages/admin/DashboardPage")),
    index: true,
    path: ADMINROUTES.HOME,
  },
  {
    component: lazy(() => import("../pages/admin/EventPage")),
    path: ADMINROUTES.EVENT,
  },
  {
    component: lazy(() => import("../pages/admin/ListEventsPage")),
    path: ADMINROUTES.EVENTS,
  },
  {
    component: lazy(() => import("../pages/admin/InscriptionPage")),
    path: ADMINROUTES.INSCRIPTION,
  },
  {
    component: lazy(() => import("../pages/admin/ListInscriptionsPage")),
    path: ADMINROUTES.INSCRIPTIONS,
  },
  {
    component: lazy(() => import("../pages/admin/AdminProfile")),
    path: ADMINROUTES.PROFILE,
  },
  {
    component: lazy(() => import("../pages/admin/UserPage")),
    path: ADMINROUTES.USER,
  },
  {
    component: lazy(() => import("../pages/admin/ListUsersPage")),
    path: ADMINROUTES.USERS,
  },
];
