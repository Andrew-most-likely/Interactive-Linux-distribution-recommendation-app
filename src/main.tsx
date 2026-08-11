import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./theme.css";
import App from "./App.tsx";
import { CompatibilityPage } from "./CompatibilityPage.tsx";
import { FloatingShapes } from "./components/FloatingShapes.tsx";
import { SponsorAds } from "./components/SponsorAd.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <FloatingShapes />
      <SponsorAds />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/distros" element={<CompatibilityPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);
