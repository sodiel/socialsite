import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Registration from "./pages/registration/index.tsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

createRoot("/register").render(
  <StrictMode>
    <Registration />
  </StrictMode>,
);

