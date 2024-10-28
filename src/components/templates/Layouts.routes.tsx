import { lazy } from "react";

export const LAYOUTS = {
  MAINLAYOUT: lazy(() => import("./MainLayout")),
  ADMINLAYOUT: lazy(() => import("./AdminLayout")),
};

export type Layouts = (typeof LAYOUTS)[keyof typeof LAYOUTS];
