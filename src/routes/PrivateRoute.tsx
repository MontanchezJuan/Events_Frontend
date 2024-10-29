import { Navigate, Outlet } from "react-router-dom";
import { Role } from "../store/createUserSlice";
import useStore from "../store/useStore";

interface PrivateRouteProps {
  requiredRole: Role;
}

const PrivateRoute = ({ requiredRole }: PrivateRouteProps) => {
  const { role } = useStore((state) => state.user);

  // Check if the user's role is equal to the allowed role
  const hasAccess = requiredRole === role;

  if (hasAccess) return <Outlet />;

  return <Navigate to="/" />;
};

export default PrivateRoute;
