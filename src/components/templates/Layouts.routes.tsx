/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy } from "react";

export const LAYOUTS: { [key: string]: React.ElementType<any> } = {
  MAINLAYOUT: lazy(() => import("./MainLayout")),
};

export type Layouts = (typeof LAYOUTS)[keyof typeof LAYOUTS];
