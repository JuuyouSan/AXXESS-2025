import "../global.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LoginPage } from "./Pages/LoginPage";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <LoginPage />
  </StrictMode>,
);
