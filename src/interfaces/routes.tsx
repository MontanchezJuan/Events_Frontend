/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from "react";
import { Landing } from "../pages/Landing";

export interface Route {
  icon?: React.ElementType;
  component: ReactElement<any, any>;
  name: string;
  path: string;
}

export const ROUTES: Route[] = [
  { component: <Landing />, path: "/", name: "Landing" },
];
