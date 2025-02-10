import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/bootstrap-replacement.css";
import "./assets/bootstrap.min.css";
import "./assets/style.css";

import App from "./App.jsx";
const Router =
  process.env.NODE_ENV === "production" ? HashRouter : BrowserRouter;
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
