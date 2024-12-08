import { Navigate, Route, Routes } from "react-router-dom";
import { RoleName } from "../api/interfaces/user";
import { Route as RouteI } from "../interfaces/Route.interfaces";
import PrivateRoute from "./PrivateRoute";

interface RoutesComponentProps {
  routes: RouteI[];
  role: RoleName;
}

const RoutesComponent = ({ routes, role }: RoutesComponentProps) => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={route.path + index}
          element={<PrivateRoute requiredRole={role} />}
        >
          <Route
            path={route.path}
            index={route.index}
            element={<route.component />}
          />
        </Route>
      ))}

      {/* Route for pages not found */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoutesComponent;
