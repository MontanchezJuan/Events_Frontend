import { lazy } from "react";
import { Route } from "../interfaces/Route.interfaces";

export enum ORGANIZERROUTES {
  HOME = "/",
  CALENDAR = "/calendar",
  EVENT = "/event/:id?",
  EVENTS = "/list-events/:date?",
  INSCRIPTIONS = "/list-inscriptions/:idEvent",
  MY_PROFILE = "/my-profile",
  NOTIFICATIONS = "/send-notifications/:idEvent",
}

// Here are routes to organizer role
export const OrganizerRoutes: Route[] = [
  {
    component: lazy(() => import("../pages/organizer/DashboardPage")),
    index: true,
    path: ORGANIZERROUTES.HOME,
  },
  {
    component: lazy(() => import("../pages/admin/AdminCalendarPage")),
    path: ORGANIZERROUTES.CALENDAR,
  },
  {
    component: lazy(() => import("../pages/admin/EventPage")),
    path: ORGANIZERROUTES.EVENT,
  },
  {
    component: lazy(() => import("../pages/organizer/ListMyEventsPage")),
    path: ORGANIZERROUTES.EVENTS,
  },
  {
    component: lazy(() => import("../pages/admin/ListInscriptionsPage")),
    path: ORGANIZERROUTES.INSCRIPTIONS,
  },
  {
    component: lazy(() => import("../pages/common/MyProfilePage")),
    path: ORGANIZERROUTES.MY_PROFILE,
  },
  {
    component: lazy(() => import("../pages/common/SendNotificationPage")),
    path: ORGANIZERROUTES.NOTIFICATIONS,
  },
];
