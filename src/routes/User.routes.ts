import { lazy } from "react";
import { Route } from "../interfaces/Route.interfaces";

export enum USERROUTES {
  Landing = "/",
  Calendar = "/calendar",
  Certifications = "/certifications",
  MyEvents = "/events/my-events",
  ViewEvent = "/events/event/:id?",
}

// Here are routes to user role
export const UserRoutes: Route[] = [
  {
    component: lazy(() => import("../pages/common/LandingPage")),
    index: true,
    path: USERROUTES.Landing,
  },
  {
    component: lazy(() => import("../pages/user/CalendarPage")),
    path: USERROUTES.Calendar,
  },
  {
    component: lazy(() => import("../pages/user/CertificationsPage")),
    path: USERROUTES.Certifications,
  },
  {
    component: lazy(() => import("../pages/user/MyEventsPage")),
    path: USERROUTES.MyEvents,
  },
  {
    component: lazy(() => import("../pages/common/ViewEventPage")),
    path: USERROUTES.ViewEvent,
  },
];
