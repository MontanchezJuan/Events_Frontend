import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "./interfaces/Route.interfaces";
import { AdminRoutes } from "./routes/Admin.routes";
import { OrganizerRoutes } from "./routes/Organizer.routes";
import { PublicRoutes } from "./routes/Public.routes";
import RoutesComponent from "./routes/RoutesComponent";
import { UserRoutes } from "./routes/User.routes";
import { Role } from "./store/createUserSlice";
import useStore from "./store/useStore";

function App() {
  const { role } = useStore((state) => state.user);

  const routesByRole: {
    [key: string]: { requiredRole: Role; routes: Route[] };
  } = {
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
