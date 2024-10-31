import { Navigate, Outlet } from "react-router-dom";
import { RoleName } from "../api/interfaces/user";
import useStore from "../store/useStore";

interface PrivateRouteProps {
  requiredRole: RoleName;
}

const PrivateRoute = ({ requiredRole }: PrivateRouteProps) => {
  const { name: role } = useStore((store) => store.user.role);

  // Check if the user's role is equal to the allowed role
  const hasAccess = requiredRole === role;

  if (hasAccess) return <Outlet />;

  return <Navigate to="/" />;
};

export default PrivateRoute;
