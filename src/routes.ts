/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Layouts } from "./components/templates/Layouts.routes";
import { authRoutes } from "./routes/authRoutes.routes";
import { commonRoutes } from "./routes/common.routes";
import { Role } from "./store/createUserSlice";

// Only the route with "/" carries index: true
export interface Route {
  component:
    | React.ElementType
    | React.LazyExoticComponent<React.ComponentType<any>>;
  path: string;
  requiredRoles: Role[];
  layout: Layouts;
  index?: boolean;
}

export const ROUTES: Route[] = [...authRoutes, ...commonRoutes];
