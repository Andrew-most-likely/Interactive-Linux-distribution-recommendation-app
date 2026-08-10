import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./theme.css";
import App from "./App.tsx";
import { CompatibilityPage } from "./CompatibilityPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/distros" element={<CompatibilityPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);
