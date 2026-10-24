import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/source-sans-3";
import "@fontsource-variable/source-serif-4";
import "@/styles/globals.css";
import { App } from "@/src/App";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Swiftradish could not find the application root.");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
