import { Navigate } from "react-router-dom";
import { Role } from "../store/createUserSlice";
import useStore from "../store/useStore";

interface PrivateRouteProps {
  children: React.ReactElement; // Asegúrate de que sea un ReactElement
  requiredRole?: Role | Role[]; // Puede ser un rol único o un array de roles
}

const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
  const user = useStore((state) => state.user);

  // Verifica si el usuario tiene permiso
  const hasPermission =
    !requiredRole ||
    (Array.isArray(requiredRole)
      ? requiredRole.includes(user.role)
      : user.role === requiredRole);

  // Redirigir si no tiene permiso
  if (!hasPermission) {
    return <Navigate to="/login" />;
  }

  return children; // Renderiza el componente si tiene permiso
};

export default PrivateRoute;
