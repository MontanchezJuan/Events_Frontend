/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export interface Route {
  component:
    | React.ElementType
    | React.LazyExoticComponent<React.ComponentType<any>>;
  path: string;
  index?: boolean;
}
