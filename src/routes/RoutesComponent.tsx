import { Navigate, Route, Routes } from "react-router-dom";
import { Route as RouteI } from "../interfaces/Route.interfaces";
import { Role } from "../store/createUserSlice";
import PrivateRoute from "./PrivateRoute";

interface RoutesComponentProps {
  routes: RouteI[];
  role: Role;
}

const RoutesComponent = ({ routes, role }: RoutesComponentProps) => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={route.path + index}
          element={<PrivateRoute requiredRole={role} />}
        >
          <Route path={route.path} element={<route.component />} />
        </Route>
      ))}

      {/* Route for pages not found */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoutesComponent;
