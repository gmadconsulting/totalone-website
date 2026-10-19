import { useEffect } from "react";
import { SITE_URL } from "./siteRoutes";

type SeoOptions = {
  /** Titolo della pagina (senza suffisso: viene aggiunto " | Totalone"). */
  title: string;
  description: string;
  /** Percorso canonico, es. "/crm-arredamento". */
  path: string;
  noindex?: boolean;
  /** `false` per non impostare il canonical (es. pagina 404). Default `true`. */
  canonical?: boolean;
  /** JSON-LD opzionale. */
  jsonLd?: Record<string, unknown>;
};

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Imposta title, description, canonical, robots e Open Graph della pagina. */
export function useSeo({ title, description, path, noindex = false, canonical = true, jsonLd }: SeoOptions) {
  useEffect(() => {
    const fullTitle = path === "/" ? title : `${title} | Totalone`;
    const url = `${SITE_URL}${path === "/" ? "/" : path}`;
    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "Totalone");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      link?.remove();
    } else {
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = url;
    }

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seo = "page";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    return () => {
      script?.remove();
    };
  }, [title, description, path, noindex, canonical, jsonLd]);
}
