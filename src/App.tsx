import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES as PAGES } from "./interfaces/routes";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}

      <Routes>
        {PAGES &&
          PAGES.map((page) => (
            <Route key={page.path} path={page.path} element={page.component} />
          ))}
      </Routes>

      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
