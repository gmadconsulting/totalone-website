import { Suspense, lazy, useEffect, useState, type ComponentType } from "react";

import { modules as discoveredModules } from "./.generated/mockup-components";
import { blogRoutes, routes, type RouteKey } from "@/components/totalone/site/siteRoutes";

const NotFound = lazy(() => import("@/components/totalone/site/NotFound"));

type ModuleMap = Record<string, () => Promise<Record<string, unknown>>>;

function _resolveComponent(
  mod: Record<string, unknown>,
  name: string,
): ComponentType | undefined {
  const fns = Object.values(mod).filter(
    (v) => typeof v === "function",
  ) as ComponentType[];
  return (
    (mod.default as ComponentType) ||
    (mod.Preview as ComponentType) ||
    (mod[name] as ComponentType) ||
    fns[fns.length - 1]
  );
}

function PreviewRenderer({
  componentPath,
  modules,
}: {
  componentPath: string;
  modules: ModuleMap;
}) {
  const [Component, setComponent] = useState<ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setComponent(null);
    setError(null);

    async function loadComponent(): Promise<void> {
      const key = `./components/mockups/${componentPath}.tsx`;
      const loader = modules[key];
      if (!loader) {
        setError(`No component found at ${componentPath}.tsx`);
        return;
      }

      try {
        const mod = await loader();
        if (cancelled) {
          return;
        }
        const name = componentPath.split("/").pop()!;
        const comp = _resolveComponent(mod, name);
        if (!comp) {
          setError(
            `No exported React component found in ${componentPath}.tsx\n\nMake sure the file has at least one exported function component.`,
          );
          return;
        }
        setComponent(() => comp);
      } catch (e) {
        if (cancelled) {
          return;
        }

        const message = e instanceof Error ? e.message : String(e);
        setError(`Failed to load preview.\n${message}`);
      }
    }

    void loadComponent();

    return () => {
      cancelled = true;
    };
  }, [componentPath, modules]);

  if (error) {
    return (
      <pre style={{ color: "red", padding: "2rem", fontFamily: "system-ui" }}>
        {error}
      </pre>
    );
  }

  if (!Component) return null;

  return <Component />;
}

function getBasePath(): string {
  return import.meta.env.BASE_URL.replace(/\/$/, "");
}

/** Componente (cartella/File sotto components/mockups) di ogni pagina canonica. */
const pageComponents: Partial<Record<RouteKey, string>> = {
  home: "totalone-homepage/TotaloneHomepage",
  demo: "totalone-homepage/TotaloneHomepage",
  crm: "totalone-crm/CrmProductPage",
  trattative: "totalone-trattative/GestioneTrattative",
  preventivi: "totalone-preventivi/PreventiviProductPage",
  progetti: "totalone-progetti/ProgettiProductPage",
  commesse: "totalone-commesse/CommesseProductPage",
  margini: "totalone-commesse-margini/CommesseMarginiFocus",
  magazzino: "totalone-magazzino/MagazzinoProductPage",
  montaggi: "totalone-montaggi/MontaggiProductPage",
  assistenza: "totalone-assistenza/AssistenzaPostVenditaProductPage",
  controllo: "totalone-controllo/ControlloPerformanceProductPage",
  perche: "totalone-perche/PercheTotalonePage",
  prezzi: "totalone-prezzi/TotalonePrezzi",
  risorse: "totalone-site-architecture/ResourcesHub",
  privacy: "totalone-legal/PrivacyPolicyPage",
};

const articleComponents: Record<keyof typeof blogRoutes.articles, string> = {
  softwareGestionaleNegozio: "totalone-blog/SoftwareGestionaleNegozioArredamentoArticle",
  gestionalePerArredatori: "totalone-blog/GestionalePerArredatoriArticle",
  excelVsGestionale: "totalone-blog/ExcelVsGestionaleArredamentoArticle",
  softwarePreventivi: "totalone-blog/SoftwarePreventiviArredamentoArticle",
  gestioneCommesse: "totalone-blog/GestioneCommesseArredamentoArticle",
  crmNegozio: "totalone-blog/CrmNegozioArredamentoArticle",
  gestireIngressiShowroom: "totalone-blog/GestireIngressiShowroomArticle",
  gestioneMagazzino: "totalone-blog/GestioneMagazzinoArredamentoArticle",
  gestioneMontaggi: "totalone-blog/GestioneMontaggiArredamentoArticle",
  gestionePostVendita: "totalone-blog/GestionePostVenditaArredamentoArticle",
  gestionaleMobilificio: "totalone-blog/GestionaleMobilificioArticle",
  preventivoCucina: "totalone-blog/PreventivoCucinaArticle",
  calcolareMargine: "totalone-blog/CalcolareMargineArredamentoArticle",
  accontiCaparraSaldo: "totalone-blog/AccontiCaparraSaldoArticle",
  architettiInteriorDesigner: "totalone-blog/ArchitettiInteriorDesignerArticle",
  followUpClienti: "totalone-blog/FollowUpClientiShowroomArticle",
  ritardiFornitori: "totalone-blog/RitardiFornitoriConsegneArticle",
  kpiNegozio: "totalone-blog/KpiNegozioArredamentoArticle",
  piuShowroom: "totalone-blog/GestirePiuShowroomArticle",
  rapportinoMontaggio: "totalone-blog/RapportinoMontaggioArticle",
};

/**
 * Percorsi pubblici → componente. Solo URL canonici: gli alias storici sono
 * redirect 301 in `public/vercel.json`. Tenere allineati `public/sitemap.xml`
 * e le rewrite di `public/vercel.json`.
 */
const publicRoutes: Record<string, string> = {
  ...Object.fromEntries(
    (Object.entries(pageComponents) as [RouteKey, string][]).map(([key, component]) => [routes[key], component]),
  ),
  ...Object.fromEntries(
    Object.values(blogRoutes.categories).map((path) => [path, "totalone-site-architecture/ResourcesHub"]),
  ),
  ...Object.fromEntries(
    (Object.entries(blogRoutes.articles) as [keyof typeof blogRoutes.articles, string][]).map(([key, path]) => [path, articleComponents[key]]),
  ),
};

function normalizePublicPath(path: string): string {
  const normalized = path.replace(/\/+/g, "/");
  return normalized === "/" ? "/" : normalized.replace(/\/+$/, "");
}

const isProd = import.meta.env.PROD;

function getPreviewPath(): string | null {
  const basePath = getBasePath();
  const { pathname } = window.location;
  const withoutBase =
    basePath && pathname.startsWith(basePath) ? pathname.slice(basePath.length) || "/" : pathname;

  // In produzione si servono solo i percorsi canonici: /preview/* e
  // /__mockup/* (anteprime tecniche) mostrano la pagina 404.
  if (isProd) {
    return publicRoutes[normalizePublicPath(withoutBase)] ?? null;
  }

  // In sviluppo: i link usano il base path di Replit ("/__mockup"); in locale
  // il base path è "/", quindi lo togliamo per risolvere la stessa pagina.
  const local = withoutBase.replace(/^\/__mockup(?=\/|$)/, "") || "/";
  const publicRoute = normalizePublicPath(
    local.startsWith("/preview") ? local.slice("/preview".length) || "/" : local,
  );
  if (publicRoutes[publicRoute]) {
    return publicRoutes[publicRoute];
  }

  const match = local.match(/^\/preview\/(.+)$/);
  return match ? match[1] : null;
}

function PreviewLinkBridge() {
  useEffect(() => {
    const basePath = getBasePath();
    if (!basePath) return;

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (!(event.target instanceof Element)) return;

      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.hasAttribute("download")) return;

      const target = new URL(anchor.href, window.location.href);
      if (target.origin !== window.location.origin) return;
      if (target.pathname === basePath || target.pathname.startsWith(`${basePath}/`)) return;

      const publicPath = normalizePublicPath(target.pathname);
      const componentPath = publicRoutes[publicPath];
      if (!componentPath) return;

      if (publicPath === "/demo") target.searchParams.set("demo", "1");
      const destination = `${basePath}/preview/${componentPath}${target.search}${target.hash}`;
      event.preventDefault();

      if (anchor.target === "_blank" || event.metaKey || event.ctrlKey || event.shiftKey) {
        window.open(destination, "_blank", "noopener,noreferrer");
      } else {
        window.location.assign(destination);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}

function App() {
  const previewPath = getPreviewPath();

  if (previewPath) {
    return (
      <>
        {!isProd && <PreviewLinkBridge />}
        <PreviewRenderer componentPath={previewPath} modules={discoveredModules} />
      </>
    );
  }

  return (
    <Suspense fallback={null}>
      <NotFound />
    </Suspense>
  );
}

export default App;
