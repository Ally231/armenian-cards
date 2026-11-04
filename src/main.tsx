import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/app/app/app";
import "@/infrastructure/i18n";
import { LocaleProvider } from "@/infrastructure/i18n/locale-provider";
import "@/styles/global.css";

const container = document.getElementById("root");
if (!container) throw new Error("Root element #root not found");

createRoot(container).render(
  <StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </StrictMode>,
);
