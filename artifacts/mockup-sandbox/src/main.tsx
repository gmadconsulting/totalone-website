import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import App from "./App";
import "./index.css";

/**
 * Prerendering (scripts/prerender.mjs): la pagina viene aperta con `?__prerender=1`.
 * In quella modalità le animazioni sono disattivate e uno stile temporaneo
 * rende visibile anche il contenuto che normalmente entra allo scroll, così
 * l'HTML statico salvato contiene tutto il testo leggibile.
 * Nel browser reale lo stile del prerender viene rimosso prima di montare l'app.
 */
const prerendering = new URLSearchParams(window.location.search).has("__prerender");

document.querySelectorAll("style[data-prerender]").forEach((el) => {
  if (!prerendering) el.remove();
});

if (prerendering) {
  const style = document.createElement("style");
  style.setAttribute("data-prerender", "");
  style.textContent = '#root [style*="opacity"]{opacity:1!important}#root [style*="transform"]{transform:none!important}#root [style*="blur"]{filter:none!important}';
  document.head.appendChild(style);
}

createRoot(document.getElementById("root")!).render(
  <MotionConfig reducedMotion={prerendering ? "always" : "user"}>
    <App />
  </MotionConfig>,
);
