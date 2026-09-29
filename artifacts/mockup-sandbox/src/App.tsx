import { useEffect, useState, type ComponentType } from "react";

import { modules as discoveredModules } from "./.generated/mockup-components";

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

const publicRoutes: Record<string, string> = {
  "/": "totalone-homepage/TotaloneHomepage",
  "/gestionale-arredamento": "totalone-homepage/TotaloneHomepage",
  "/demo": "totalone-homepage/TotaloneHomepage",
  "/login": "totalone-site-architecture/CustomerAccessPage",
  "/crm-arredamento": "totalone-crm/CrmProductPage",
  "/crm-per-arredatori": "totalone-crm/CrmProductPage",
  "/crm-per-arredatori/ingressi-showroom": "totalone-blog/GestireIngressiShowroomArticle",
  "/gestione-trattative-arredamento": "totalone-trattative/GestioneTrattative",
  "/software-preventivi-arredamento": "totalone-preventivi/PreventiviProductPage",
  "/preventivi-arredatori": "totalone-preventivi/PreventiviProductPage",
  "/gestione-progetti-arredamento": "totalone-progetti/ProgettiProductPage",
  "/gestione-commesse-arredamento": "totalone-commesse/CommesseProductPage",
  "/gestione-magazzino-arredamento": "totalone-magazzino/MagazzinoProductPage",
  "/gestione-montaggi-arredamento": "totalone-montaggi/MontaggiProductPage",
  "/post-vendita-arredamento": "totalone-assistenza/AssistenzaPostVenditaProductPage",
  "/controllo-performance-arredamento": "totalone-controllo/ControlloPerformanceProductPage",
  "/perche-totalone": "totalone-perche/PercheTotalonePage",
  "/prezzi": "totalone-prezzi/TotalonePrezzi",
  "/strumenti/roi": "totalone-prezzi/TotalonePrezzi",
  "/risorse": "totalone-risorse/RisorseArchitecturePage",
  "/guide": "totalone-risorse/RisorseArchitecturePage",
  "/guide/crm-per-arredatori": "totalone-blog/CrmNegozioArredamentoArticle",
  "/guide/digitalizzazione-negozio-arredamento": "totalone-blog/SoftwareGestionaleNegozioArredamentoArticle",
  "/guide/gestione-commesse-arredamento": "totalone-blog/GestioneCommesseArredamentoArticle",
  "/guide/gestione-magazzino-arredamento": "totalone-blog/GestioneMagazzinoArredamentoArticle",
  "/guide/gestione-showroom-arredamento": "totalone-blog/SoftwareGestionaleNegozioArredamentoArticle",
  "/guide/preventivi-arredamento": "totalone-blog/SoftwarePreventiviArredamentoArticle",
  "/blog": "totalone-site-architecture/ResourcesHub",
  "/blog/gestione-showroom": "totalone-site-architecture/ResourcesHub",
  "/blog/vendite-crm": "totalone-site-architecture/ResourcesHub",
  "/blog/preventivi": "totalone-site-architecture/ResourcesHub",
  "/blog/commesse-progetti": "totalone-site-architecture/ResourcesHub",
  "/blog/logistica-magazzino": "totalone-site-architecture/ResourcesHub",
  "/blog/montaggi-post-vendita": "totalone-site-architecture/ResourcesHub",
  "/blog/controllo-performance": "totalone-controllo/ControlloPerformanceProductPage",
  "/blog/gestione-showroom/software-gestionale-negozio-arredamento": "totalone-blog/SoftwareGestionaleNegozioArredamentoArticle",
  "/blog/gestione-showroom/gestionale-per-arredatori": "totalone-blog/GestionalePerArredatoriArticle",
  "/blog/preventivi/software-preventivi-arredamento": "totalone-blog/SoftwarePreventiviArredamentoArticle",
  "/blog/commesse-progetti/gestione-commesse-arredamento": "totalone-blog/GestioneCommesseArredamentoArticle",
  "/blog/vendite-crm/crm-negozio-arredamento": "totalone-blog/CrmNegozioArredamentoArticle",
  "/blog/vendite-crm/gestire-ingressi-showroom": "totalone-blog/GestireIngressiShowroomArticle",
  "/blog/logistica-magazzino/gestione-magazzino-arredamento": "totalone-blog/GestioneMagazzinoArredamentoArticle",
  "/blog/montaggi-post-vendita/gestione-montaggi-arredamento": "totalone-blog/GestioneMontaggiArredamentoArticle",
  "/blog/montaggi-post-vendita/gestione-post-vendita-arredamento": "totalone-blog/GestionePostVenditaArredamentoArticle",
  "/blog/gestione-showroom/excel-vs-gestionale-arredamento": "totalone-blog/ExcelVsGestionaleArredamentoArticle",
  "/soluzioni/negozi-showroom-arredamento": "totalone-site-architecture/SolutionsTemplate",
  "/soluzioni/aziende-arredamento-in-crescita": "totalone-site-architecture/SolutionsTemplate",
  "/soluzioni/multi-showroom-arredamento": "totalone-site-architecture/SolutionsTemplate",
  "/soluzioni/gruppi-arredamento": "totalone-site-architecture/SolutionsTemplate",
};

function normalizePublicPath(path: string): string {
  const normalized = path.replace(/\/+/g, "/");
  return normalized === "/" ? "/" : normalized.replace(/\/+$/, "");
}

function getPreviewExamplePath(): string {
  const basePath = getBasePath();
  return `${basePath}/preview/ComponentName`;
}

function Gallery() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">
          Component Preview Server
        </h1>
        <p className="text-gray-500 mb-4">
          This server renders individual components for the workspace canvas.
        </p>
        <p className="text-sm text-gray-400">
          Access component previews at{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
            {getPreviewExamplePath()}
          </code>
        </p>
      </div>
    </div>
  );
}

function getPreviewPath(): string | null {
  const basePath = getBasePath();
  const { pathname } = window.location;
  const local =
    basePath && pathname.startsWith(basePath)
      ? pathname.slice(basePath.length) || "/"
      : pathname;
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
        <PreviewLinkBridge />
        <PreviewRenderer componentPath={previewPath} modules={discoveredModules} />
      </>
    );
  }

  return <Gallery />;
}

export default App;
