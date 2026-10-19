/**
 * Unica fonte di verità per gli URL pubblici del sito Totalone.
 * Tutti i link interni (header, footer, CTA, card, articoli) devono usare
 * questi percorsi — mai `/__mockup/preview/...` o `/preview/...`.
 * I percorsi vanno tenuti allineati a `publicRoutes` in `src/App.tsx`,
 * a `public/vercel.json` (redirect) e a `public/sitemap.xml`.
 */

export const SITE_URL = "https://www.thetotalone.com";
export const APP_URL = "https://app.thetotalone.com";

export const routes = {
  home: "/",
  crm: "/crm-arredamento",
  trattative: "/gestione-trattative-arredamento",
  preventivi: "/software-preventivi-arredamento",
  progetti: "/gestione-progetti-arredamento",
  commesse: "/gestione-commesse-arredamento",
  margini: "/gestione-commesse-arredamento/margini",
  magazzino: "/gestione-magazzino-arredamento",
  montaggi: "/gestione-montaggi-arredamento",
  assistenza: "/post-vendita-arredamento",
  controllo: "/controllo-performance-arredamento",
  perche: "/perche-totalone",
  prezzi: "/prezzi",
  calcolatore: "/prezzi#calcolatore",
  risorse: "/blog",
  privacy: "/privacy",
  demo: "/demo",
} as const;

export type RouteKey = keyof typeof routes;

/** Percorsi delle categorie e degli articoli del blog. */
export const blogRoutes = {
  categories: {
    "gestione-showroom": "/blog/gestione-showroom",
    "vendite-crm": "/blog/vendite-crm",
    preventivi: "/blog/preventivi",
    "commesse-progetti": "/blog/commesse-progetti",
    "logistica-magazzino": "/blog/logistica-magazzino",
    "montaggi-post-vendita": "/blog/montaggi-post-vendita",
  },
  /** I 10 articoli pubblicati (percorso canonico). */
  articles: {
    softwareGestionaleNegozio: "/blog/gestione-showroom/software-gestionale-negozio-arredamento",
    gestionalePerArredatori: "/blog/gestione-showroom/gestionale-per-arredatori",
    excelVsGestionale: "/blog/gestione-showroom/excel-vs-gestionale-arredamento",
    softwarePreventivi: "/blog/preventivi/software-preventivi-arredamento",
    gestioneCommesse: "/blog/commesse-progetti/gestione-commesse-arredamento",
    crmNegozio: "/blog/vendite-crm/crm-negozio-arredamento",
    gestireIngressiShowroom: "/blog/vendite-crm/gestire-ingressi-showroom",
    gestioneMagazzino: "/blog/logistica-magazzino/gestione-magazzino-arredamento",
    gestioneMontaggi: "/blog/montaggi-post-vendita/gestione-montaggi-arredamento",
    gestionePostVendita: "/blog/montaggi-post-vendita/gestione-post-vendita-arredamento",
    gestionaleMobilificio: "/blog/gestione-showroom/gestionale-mobilificio",
    preventivoCucina: "/blog/preventivi/come-fare-preventivo-cucina",
    calcolareMargine: "/blog/commesse-progetti/calcolare-margine-arredamento",
    accontiCaparraSaldo: "/blog/commesse-progetti/acconti-caparra-saldo-mobili",
    architettiInteriorDesigner: "/blog/vendite-crm/showroom-architetti-interior-designer",
    followUpClienti: "/blog/vendite-crm/follow-up-clienti-showroom",
    ritardiFornitori: "/blog/logistica-magazzino/ritardi-fornitori-consegne-mobili",
    kpiNegozio: "/blog/gestione-showroom/kpi-negozio-arredamento",
    piuShowroom: "/blog/gestione-showroom/gestire-piu-showroom-arredamento",
    rapportinoMontaggio: "/blog/montaggi-post-vendita/rapportino-montaggio-mobili",
  },
} as const;

/** Etichette brevi delle pagine principali (menu, breadcrumb, `active`). */
export const routeLabels: Partial<Record<RouteKey, string>> = {
  home: "Home",
  crm: "CRM",
  trattative: "Gestione trattative",
  preventivi: "Preventivi",
  progetti: "Gestione progetti",
  commesse: "Gestione commesse",
  margini: "Margini di commessa",
  magazzino: "Magazzino e logistica",
  montaggi: "Montaggi",
  assistenza: "Assistenza e post-vendita",
  controllo: "Controllo e performance",
  perche: "Perché Totalone",
  prezzi: "Prezzi",
  risorse: "Risorse",
  privacy: "Privacy",
};

export function isRouteKey(value: string): value is RouteKey {
  return Object.prototype.hasOwnProperty.call(routes, value);
}

/** Tassonomia del prodotto a 4 verbi, uguale in mega-menu, footer e pagine. */
export const productNav: { verb: string; description: string; links: { key: RouteKey; label: string }[] }[] = [
  {
    verb: "Vendere",
    description: "Dal primo ingresso al preventivo accettato.",
    links: [
      { key: "crm", label: "CRM" },
      { key: "preventivi", label: "Preventivi" },
      { key: "trattative", label: "Gestione trattative" },
    ],
  },
  {
    verb: "Gestire",
    description: "La vendita diventa commessa, il team sa cosa fare.",
    links: [
      { key: "commesse", label: "Gestione commesse" },
      { key: "progetti", label: "Gestione progetti" },
      { key: "magazzino", label: "Magazzino e logistica" },
    ],
  },
  {
    verb: "Consegnare",
    description: "Fino al montaggio, e oltre.",
    links: [
      { key: "montaggi", label: "Montaggi" },
      { key: "assistenza", label: "Assistenza e post-vendita" },
    ],
  },
  {
    verb: "Controllare",
    description: "Una lettura chiara di come va il business.",
    links: [{ key: "controllo", label: "Controllo e performance" }],
  },
];

/** Glossario condiviso: usare SEMPRE questi termini e quest'ordine. */
export const glossario = {
  flusso: ["Ingresso", "Lead", "Preventivo", "Trattativa", "Schedina cliente", "Ordini e arrivi", "Montaggio", "Assistenza"],
  note:
    "Il preventivo convertito genera in automatico la trattativa (in Totalone) e la Schedina cliente. " +
    "La Schedina cliente è il fascicolo della commessa: prodotti, margini, ordini, documenti, note, assistenza.",
} as const;
