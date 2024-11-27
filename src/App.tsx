import { Suspense, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { RoleName } from "./api/interfaces/user";
import { Route } from "./interfaces/Route.interfaces";
import { AdminRoutes } from "./routes/Admin.routes";
import { OrganizerRoutes } from "./routes/Organizer.routes";
import { PublicRoutes } from "./routes/Public.routes";
import RoutesComponent from "./routes/RoutesComponent";
import { UserRoutes } from "./routes/User.routes";
import useStore from "./store/useStore";

function App() {
  const { name: role } = useStore((store) => store.user.role);
  const checkAndLoadUser = useStore((state) => state.checkAndLoadUser);

  useEffect(() => {
    checkAndLoadUser();
  }, [checkAndLoadUser]);

  const routesByRole: Record<
    RoleName,
    { requiredRole: RoleName; routes: Route[] }
  > = {
    unauthenticated: { requiredRole: "unauthenticated", routes: PublicRoutes },
    user: { requiredRole: "user", routes: UserRoutes },
    organizer: { requiredRole: "organizer", routes: OrganizerRoutes },
    admin: { requiredRole: "admin", routes: AdminRoutes },
  };

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <RoutesComponent
          role={routesByRole[role].requiredRole}
          routes={routesByRole[role].routes}
        />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
