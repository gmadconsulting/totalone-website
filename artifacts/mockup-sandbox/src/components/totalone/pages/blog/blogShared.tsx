import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/totalone/motion-kit";
import { AppWindow } from "@/components/totalone/app-ui";
import {
  ArriviScreen,
  AssistenzeScreen,
  ConversioneFlow,
  HeroDashboardScreen,
  IngressiScreen,
  MagazzinoScreen,
  MontaggiScreen,
  PipelineScreen,
  PreventivatoreScreen,
  PreventiviListScreen,
  RapportiniScreen,
  SchedinaCliente,
  TasksScreen,
  VenditeScreen,
} from "@/components/totalone/app-screens";
import { AppuntamentiScreen, ContattiAziendaliScreen } from "@/components/totalone/pages/crm/CrmScreens";
import type { BlogArticleData } from "@/components/mockups/totalone-blog/blogContent";

/** Percorso pubblico dell'articolo. */
export const articleHref = (article: BlogArticleData) => article.route;

export function readTime(article: BlogArticleData) {
  const words = [
    ...article.intro,
    ...article.sections.flatMap((section) => [...(section.paragraphs ?? []), ...(section.bullets ?? []), ...(section.numbered ?? [])]),
  ]
    .join(" ")
    .trim()
    .split(/\s+/).length;
  return Math.max(4, Math.round(words / 190));
}

export const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1769d5]";

/** Pillola di sezione (stesso stile del Tag della homepage). */
export function Tag({ children, tone = "blue", className = "" }: { children: ReactNode; tone?: "blue" | "coral" | "dark"; className?: string }) {
  const tones = {
    blue: "bg-[#dcecff] text-[#0b55c6]",
    coral: "bg-[#ffdcd2] text-[#a33a22]",
    dark: "bg-white/12 text-[#d9efff] ring-1 ring-white/15",
  };
  return <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] ${tones[tone]} ${className}`}>{children}</span>;
}

/**
 * Bottone a pillola come link. Il colore va sullo span interno perché lo shell
 * imposta `a { color: inherit }` con specificità più alta delle utility.
 */
const pillStyles = {
  coral: "bg-[#cf4a2b] text-white shadow-[0_10px_24px_rgba(173,57,35,.22)] hover:bg-[#b93f23]",
  light: "bg-white text-[#0b4fbd] shadow-[0_10px_28px_rgba(4,43,102,.22)] hover:bg-[#e9f3ff]",
  ghost: "border border-white/30 bg-white/5 text-white hover:bg-white/15",
  outline: "border border-[#bcd7f1] bg-white text-[#0b55c6] hover:border-[#1769d5] hover:bg-[#f4f9ff]",
};
type PillVariant = keyof typeof pillStyles;

export function PillLink({ href, children, variant = "coral" }: { href: string; children: ReactNode; variant?: PillVariant }) {
  return (
    <a href={href} className={`group inline-flex shrink-0 rounded-full transition-transform duration-200 hover:-translate-y-0.5 active:scale-[.97] ${focusRing}`}>
      <span className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-center text-[14px] sm:whitespace-nowrap font-bold transition-colors duration-200 ${pillStyles[variant]}`}>
        {children}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </a>
  );
}

/** Stessa pillola, ma come bottone (es. "Prenota una demo" che apre la modale sul posto). */
export function PillButton({ onClick, children, variant = "coral" }: { onClick: () => void; children: ReactNode; variant?: PillVariant }) {
  return (
    <button type="button" onClick={onClick} className={`group inline-flex shrink-0 rounded-full transition-transform duration-200 hover:-translate-y-0.5 active:scale-[.97] ${focusRing}`}>
      <span className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-center text-[14px] sm:whitespace-nowrap font-bold transition-colors duration-200 ${pillStyles[variant]}`}>
        {children}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </button>
  );
}

type FeatureMockup = { caption: string; render: () => ReactNode };

const windowed = (active: string, title: string, Screen: () => ReactNode) => () => (
  <AppWindow active={active} title={title} className="h-[400px] sm:h-[440px]">
    <Screen />
  </AppWindow>
);

/** Schermata reale del gestionale più vicina al tema di ciascun articolo. */
const featureMockups: Record<string, FeatureMockup> = {
  "software-gestionale-negozio-arredamento": { caption: "Pagina Totalone: trattative, incassi e clienti dello showroom", render: () => <HeroDashboardScreen className="h-[400px] sm:h-[440px]" /> },
  "gestionale-per-arredatori": { caption: "Pagina Totalone · incassi e clienti dello showroom", render: windowed("totalone", "Totalone showroom", VenditeScreen) },
  "software-preventivi-arredamento": { caption: "Preventivatore · prodotti, specifiche e prezzi in un unico documento", render: windowed("preventivi", "Preventivatore", PreventivatoreScreen) },
  "gestione-commesse-arredamento": { caption: "Dal preventivo alla trattativa, fino alla schedina cliente", render: () => <ConversioneFlow /> },
  "crm-negozio-arredamento": { caption: "Pipeline vendite · CRM", render: windowed("crm.pipeline", "Pipeline CRM", PipelineScreen) },
  "gestire-ingressi-showroom": { caption: "Ingressi showroom · CRM", render: windowed("crm.ingressi", "Ingressi", IngressiScreen) },
  "gestione-magazzino-arredamento": { caption: "Magazzino logistico · stato, colli e DDT", render: windowed("magazzino.magazzino", "Magazzino", MagazzinoScreen) },
  "gestione-montaggi-arredamento": { caption: "Montaggi · calendario del mese", render: windowed("montaggi.montaggi", "Montaggi", MontaggiScreen) },
  "gestione-post-vendita-arredamento": { caption: "Assistenze · lo stato di ogni prodotto in assistenza", render: windowed("assistenze", "Assistenze", AssistenzeScreen) },
  "excel-vs-gestionale-arredamento": { caption: "Tasks condivisi: chi fa cosa, con quale priorità", render: windowed("tasks.task", "Tasks", TasksScreen) },
  "gestionale-mobilificio": { caption: "Pagina Totalone: trattative, incassi e clienti dello showroom", render: () => <HeroDashboardScreen className="h-[400px] sm:h-[440px]" /> },
  "preventivo-cucina": { caption: "Preventivatore · sezioni Cucine, Sistemi, Arredamento e Montaggio", render: windowed("preventivi", "Preventivatore", PreventivatoreScreen) },
  "calcolare-margine-arredamento": { caption: "Schedina cliente · acquistato, margine generato e venduto, riga per riga", render: windowed("schedine", "Schedina", () => <SchedinaCliente rows={4} />) },
  "acconti-caparra-saldo-arredamento": { caption: "Pagina Totalone · acconti ricevuti, da ricevere e saldo di ogni trattativa", render: windowed("totalone", "Totalone showroom", VenditeScreen) },
  "architetti-interior-designer-showroom": { caption: "Contatti aziendali · fornitori, partner e altri contatti business", render: windowed("crm.contatti", "Contatti Aziendali", ContattiAziendaliScreen) },
  "follow-up-clienti-showroom": { caption: "Appuntamenti · il prossimo passo di ogni cliente", render: windowed("appuntamenti", "Appuntamenti", AppuntamentiScreen) },
  "ritardi-fornitori-consegne-mobili": { caption: "Arrivi previsti · cosa arriva, quando e per quale cliente", render: windowed("magazzino.arrivi", "Arrivi previsti", ArriviScreen) },
  "kpi-negozio-arredamento": { caption: "Preventivi · totale, in pipeline, accettato e conversione", render: windowed("preventivi", "Preventivi", PreventiviListScreen) },
  "gestire-piu-showroom-arredamento": { caption: "Ingressi showroom · le visite filtrate per sede", render: windowed("crm.ingressi", "Ingressi", IngressiScreen) },
  "rapportino-montaggio-mobili": { caption: "Rapportini di montaggio · giornate e fine lavoro", render: windowed("montaggi.rapportini", "Rapportini", RapportiniScreen) },
};

/** Box "funzionalità correlata": testo + mockup animato reale dentro AppWindow. */
export function RelatedFeatureBox({ article }: { article: BlogArticleData }) {
  const mockup = featureMockups[article.id];
  if (!mockup) return null;
  return (
    <Reveal y={30}>
      <aside aria-label="Funzionalità correlata" className="my-14 overflow-hidden rounded-[32px] border border-[#cfe1f4] bg-[linear-gradient(160deg,#eff7ff,#eaf4ff_60%,#f4f9ff)] p-3 sm:my-16 sm:p-4">
        <div className="flex flex-col gap-4 px-3 pb-5 pt-4 sm:flex-row sm:items-end sm:justify-between sm:px-5">
          <div className="max-w-md">
            <Tag>Funzionalità correlata</Tag>
            <p className="mt-4 text-2xl font-bold leading-[1.05] tracking-[-0.045em] text-[#102744] sm:text-[28px]">Questo passaggio, dentro Totalone.</p>
            <p className="mt-2 text-sm leading-6 text-[#557090]">{mockup.caption}.</p>
          </div>
          <PillLink href={article.product.href} variant="outline">{article.product.label}</PillLink>
        </div>
        <div className="rounded-[24px]" aria-hidden="true">{mockup.render()}</div>
        <p className="px-3 pb-1 pt-3 text-center text-[11px] font-semibold text-[#557090] sm:px-5">Schermate dimostrative, dati di esempio.</p>
      </aside>
    </Reveal>
  );
}
