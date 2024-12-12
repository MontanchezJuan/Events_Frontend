import { lazy } from "react";
import { Route } from "../interfaces/Route.interfaces";

export enum ADMINROUTES {
  HOME = "/",
  CALENDAR = "/calendar",
  EVENT = "/event/:id?",
  EVENTS = "/list-events/:date?",
  INSCRIPTIONS = "/list-inscriptions/:idEvent",
  MY_PROFILE = "/my-profile",
  NOTIFICATIONS = "/send-notifications/:idEvent",
  ONE = "/list-event/:id?",
  PERMISSION = "/permission/:id?",
  PERMISSIONS = "/list-permissions",
  PROFILE = "/profile/:id?",
  PROFILES = "/list-profiles",
  ROLE = "/role/:id?",
  ROLES = "/list-roles",
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
    component: lazy(() => import("../pages/admin/AdminCalendarPage")),
    path: ADMINROUTES.CALENDAR,
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
    component: lazy(() => import("../pages/admin/ListInscriptionsPage")),
    path: ADMINROUTES.INSCRIPTIONS,
  },
  {
    component: lazy(() => import("../pages/common/MyProfilePage")),
    path: ADMINROUTES.MY_PROFILE,
  },
  {
    component: lazy(() => import("../pages/common/SendNotificationPage")),
    path: ADMINROUTES.NOTIFICATIONS,
  },
  {
    component: lazy(() => import("../pages/common/ViewEventPage")),
    path: ADMINROUTES.ONE,
  },
  {
    component: lazy(() => import("../pages/admin/PermissionPage")),
    path: ADMINROUTES.PERMISSION,
  },
  {
    component: lazy(() => import("../pages/admin/ListPermissionsPage")),
    path: ADMINROUTES.PERMISSIONS,
  },
  {
    component: lazy(() => import("../pages/admin/ProfilePage")),
    path: ADMINROUTES.PROFILE,
  },
  {
    component: lazy(() => import("../pages/admin/ListProfilesPage")),
    path: ADMINROUTES.PROFILES,
  },
  {
    component: lazy(() => import("../pages/admin/RolePage")),
    path: ADMINROUTES.ROLE,
  },
  {
    component: lazy(() => import("../pages/admin/ListRolesPage")),
    path: ADMINROUTES.ROLES,
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
