/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Layouts } from "./components/templates/Layouts.routes";
import { authRoutes } from "./pages/auth/authRoutes.routes";
import { commonRoutes } from "./pages/common/common.routes";
import { Role } from "./store/createUserSlice";

export interface Route {
  component:
    | React.ElementType
    | React.LazyExoticComponent<React.ComponentType<any>>;
  path: string;
  protected: boolean;
  requiredRole?: Role;
  layout: Layouts;
}

export const ROUTES: Route[] = [...authRoutes, ...commonRoutes];
