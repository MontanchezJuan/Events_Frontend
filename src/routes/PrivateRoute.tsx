import { Navigate } from "react-router-dom";
import { Role } from "../store/createUserSlice";
import useStore from "../store/useStore";

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRoles: Role[];
}

const PrivateRoute = ({ children, requiredRoles }: PrivateRouteProps) => {
  const { role } = useStore((state) => state.user);

  // Si el rol del usuario no está en los roles permitidos, redirigir a una página de error o principal
  if (!requiredRoles.includes(role)) {
    return <Navigate to="/" />; // O una página de "No Autorizado"
  }

  // Si está autenticado y tiene permisos, renderizar el componente hijo
  return <>{children}</>;
};

export default PrivateRoute;
