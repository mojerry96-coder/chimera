import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Master prompt section 1.8 — Afacad for display, Manrope for UI. Nothing else.
import "@fontsource/afacad/400.css";
import "@fontsource/afacad/500.css";
import "@fontsource/afacad/600.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";

import "./styles/global.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
