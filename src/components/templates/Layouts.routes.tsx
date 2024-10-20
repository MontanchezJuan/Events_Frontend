import { lazy } from "react";

export const LAYOUTS = {
  MAINLAYOUT: lazy(() => import("./MainLayout")),
};

export type Layouts = (typeof LAYOUTS)[keyof typeof LAYOUTS];
