import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/templates/MainLayout";
import { ROUTES as PAGES } from "./routes";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          {PAGES.map((page) => {
            const Layout = page.layout || MainLayout;
            return (
              <Route key={page.path} element={<Layout />}>
                <Route
                  path={page.path}
                  element={
                    page.protected ? (
                      <PrivateRoute requiredRole={page.requiredRole}>
                        <page.component />
                      </PrivateRoute>
                    ) : (
                      <page.component />
                    )
                  }
                />
              </Route>
            );
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
