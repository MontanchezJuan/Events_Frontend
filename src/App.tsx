import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NotFoundPage from "./pages/common/NotFoundPage";
import { ROUTES as PAGES } from "./routes";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          {PAGES.map((page) => {
            return (
              <Route key={page.path} element={<page.layout />}>
                <Route
                  path={page.path}
                  element={
                    <PrivateRoute requiredRoles={page.requiredRoles}>
                      <page.component />
                    </PrivateRoute>
                  }
                />
              </Route>
            );
          })}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
