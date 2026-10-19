import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Building2,
  ChevronRight,
  Check,
  ClipboardList,
  FileText,
  Handshake,
  GitBranch,
  Layers,
  LayoutTemplate,
  ListOrdered,
  Plus,
  Sigma,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { MarketingShell, openDemo } from "../totalone-site-architecture/_shared/MarketingShell";
import { Reveal, ScrollLitText, Stagger, StaggerItem, WordReveal, tpEase, useLoopSteps } from "@/components/totalone/motion-kit";
import { AppWindow } from "@/components/totalone/app-ui";
import { ConversioneFlow, PreventivatoreScreen, PreventiviListScreen } from "@/components/totalone/app-screens";
import { AnteprimaScreen, ComposizioneScreen, IntestazioneScreen } from "@/components/totalone/pages/preventivi/PreventiviScreens";
import { routes } from "@/components/totalone/site/siteRoutes";
import { useSeo } from "@/components/totalone/site/useSeo";
import { ProcessoStrip } from "@/components/totalone/site/ProcessoStrip";

/* ------------------------------------------------------------------ */
/* Contenuti                                                           */
/* ------------------------------------------------------------------ */

const kitchenFeatures = ["Composizione cucina", "Aree e nicchie", "Marmo", "Elettrodomestici", "Extra e opzioni", "Quantità", "Sconti", "IVA"];
const furnitureFeatures = ["Brand", "Modello", "Area", "Dimensioni", "Finiture", "Note", "Immagini", "Quantità", "Prezzo", "Sconto", "IVA", "Valuta EUR / CHF"];
const showrooms = ["Milano Centro", "Lugano", "Como", "Bergamo"];
const summaryParts = ["Cucina", "Elettrodomestici", "Arredamento", "Sistemi", "Extra", "Servizi"];

const panelTones = [
  "bg-[radial-gradient(circle_at_20%_10%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#dcecff,#c9e1ff)]",
  "bg-[radial-gradient(circle_at_80%_10%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#ffe9e1,#ffd9cc)]",
  "bg-[radial-gradient(circle_at_20%_90%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#fff2dd,#ffe4b8)]",
  "bg-[radial-gradient(circle_at_80%_90%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#e3f6ec,#cdeedd)]",
  "bg-[radial-gradient(circle_at_50%_0%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#efe7ff,#e0d4ff)]",
];

type Chapter = {
  id: string;
  short: string;
  eyebrow: string;
  title: string;
  body: ReactNode;
  icon: LucideIcon;
  where: string;
  extra?: ReactNode;
  screen: () => ReactNode;
};

function Chips({ items, tone = "blue" }: { items: string[]; tone?: "blue" | "coral" }) {
  return (
    <Stagger className="mt-6 flex flex-wrap gap-2" gap={0.035}>
      {items.map((item) => (
        <StaggerItem key={item}>
          <span className={`inline-flex items-center gap-1.5 rounded-full border bg-white px-3 py-1.5 text-xs font-semibold ${tone === "blue" ? "border-[#cfe1f4] text-[#245b96]" : "border-[#f6d2c8] text-[#a33a22]"}`}>
            <Check className="h-3 w-3" />
            {item}
          </span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

const chapters: Chapter[] = [
  {
    id: "intestazione",
    short: "Prodotti e specifiche",
    eyebrow: "PREVENTIVI ARREDAMENTO",
    title: "Tutte le specifiche del prodotto, nello stesso contesto.",
    body: (
      <>
        <p>Inserisci nel preventivo le informazioni che servono davvero quando vendi arredamento: brand, modello, composizione, area, dimensioni, finiture, note e immagini.</p>
        <p className="mt-3">In intestazione scegli cliente, showroom e valuta (euro o franchi svizzeri); prodotti e specifiche restano nella stessa proposta, con quantità, prezzi e sconti.</p>
      </>
    ),
    icon: FileText,
    where: "Preventivatore › Intestazione e specifiche",
    extra: <Chips items={furnitureFeatures} />,
    screen: () => (
      <AppWindow active="preventivi" title="Preventivatore" className="h-[400px] sm:h-[460px]">
        <IntestazioneScreen />
      </AppWindow>
    ),
  },
  {
    id: "composizione",
    short: "Composizione",
    eyebrow: "PREVENTIVI CUCINE",
    title: "Una cucina organizzata in composizioni, aree e componenti.",
    body: (
      <>
        <p>Organizza la cucina in composizioni e aree, separando elementi, marmo, elettrodomestici, extra e opzioni.</p>
        <p className="mt-3">Ogni componente rimane organizzata all’interno dello stesso preventivo, così anche una proposta articolata resta semplice da costruire, modificare e presentare.</p>
      </>
    ),
    icon: Layers,
    where: "Preventivatore › Immagini e composizione",
    extra: <Chips items={kitchenFeatures} tone="coral" />,
    screen: () => (
      <AppWindow active="preventivi" title="Preventivatore" className="h-[400px] sm:h-[460px]">
        <ComposizioneScreen focus="immagini" />
      </AppWindow>
    ),
  },
  {
    id: "prezzi",
    short: "Prezzi",
    eyebrow: "CONTROLLO DEL PREVENTIVO",
    title: "Prezzi, sconti e totali sempre sotto controllo.",
    body: (
      <>
        <p>Gestisci prezzi, quantità, sconti e IVA direttamente all’interno del preventivo.</p>
        <p className="mt-3">Cucina, elettrodomestici, arredamento, sistemi, extra e servizi confluiscono in un unico riepilogo: il totale è sempre leggibile mentre costruisci l’offerta.</p>
      </>
    ),
    icon: Sigma,
    where: "Preventivatore › Composizione sistema",
    extra: (
      <>
        <Equation />
        <SummaryDiagram />
      </>
    ),
    screen: () => (
      <AppWindow active="preventivi" title="Preventivatore" className="h-[400px] sm:h-[460px]">
        <ComposizioneScreen focus="prezzi" />
      </AppWindow>
    ),
  },
  {
    id: "anteprima",
    short: "Anteprima PDF",
    eyebrow: "VERSIONI E DOCUMENTI",
    title: "Dalla prima idea al PDF che il cliente può capire.",
    body: <p>Conserva le diverse versioni della proposta, controlla lo stato del preventivo e prepara un documento coerente con la tua presentazione commerciale.</p>,
    icon: LayoutTemplate,
    where: "Preventivatore › Anteprima globale / Impaginazione",
    extra: <DocumentPoints />,
    screen: () => (
      <AppWindow active="preventivi" title="Preventivatore" className="h-[400px] sm:h-[460px]">
        <AnteprimaScreen />
      </AppWindow>
    ),
  },
  {
    id: "conversione",
    short: "Conversione",
    eyebrow: "CONVERSIONE",
    title: "Il cliente dice sì: un clic e il lavoro passa avanti.",
    body: (
      <>
        <p>Ogni preventivo ha il suo stato, da Bozza a Convertito. Quando il cliente accetta, segni il preventivo come <em>Convertito</em>.</p>
        <p className="mt-3">Totalone crea in automatico la trattativa (preventivato, venduto, acconti) e la schedina cliente con tutti i prodotti del preventivo. Niente da ricopiare.</p>
      </>
    ),
    icon: Sparkles,
    where: "Preventivi › Convertito → Trattativa e Schedina cliente",
    extra: (
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
        <TextLink href={routes.trattative}>Come si segue la trattativa</TextLink>
        <TextLink href={routes.commesse}>Cosa contiene la commessa</TextLink>
      </div>
    ),
    screen: () => <ConversioneFlow />,
  },
];

/* ------------------------------------------------------------------ */
/* Primitivi della pagina (stile homepage)                             */
/* ------------------------------------------------------------------ */

function DemoButton({ light = false, children = "Prenota una demo" }: { light?: boolean; children?: ReactNode }) {
  return (
    <motion.button
      type="button"
      onClick={openDemo}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-bold transition-colors duration-200 ${
        light
          ? "bg-white text-[#0b4fbd] shadow-[0_10px_28px_rgba(4,43,102,.22)] hover:bg-[#e9f3ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          : "bg-[#cf4a2b] text-white shadow-[0_10px_24px_rgba(173,57,35,.22)] hover:bg-[#b93f23] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cf4a2b]"
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </motion.button>
  );
}

function Tag({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "coral" | "amber" }) {
  const tones = {
    blue: "bg-[#dcecff] text-[#0b55c6]",
    coral: "bg-[#ffdcd2] text-[#a33a22]",
    amber: "bg-[#fff2dd] text-[#8a4f0f]",
  };
  return (
    <Reveal y={10}>
      <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold tracking-[0.04em] ${tones[tone]}`}>{children}</span>
    </Reveal>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#0b55c6] hover:text-[#a33a22] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1769d5]">
      {children} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function Equation() {
  const parts = ["Prezzo", "×", "Quantità", "−", "Sconto", "="];
  return (
    <Stagger className="mt-6 flex flex-wrap items-center gap-2" gap={0.06}>
      {parts.map((p, i) => (
        <StaggerItem key={`${p}-${i}`}>
          {p.length === 1 ? (
            <span aria-hidden className="text-lg font-bold text-[#557090]">{p}</span>
          ) : (
            <span className="inline-flex rounded-full border border-[#cfe1f4] bg-white px-3.5 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#245b96]">{p}</span>
          )}
        </StaggerItem>
      ))}
      <StaggerItem>
        <span className="inline-flex rounded-full bg-[#082c68] px-3.5 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white">Totale</span>
      </StaggerItem>
    </Stagger>
  );
}

function DocumentPoints() {
  const items: [LucideIcon, string, string, string][] = [
    [GitBranch, "Versioni", "Confronta le alternative", "La proposta evolve senza perdere il riferimento alle configurazioni precedenti."],
    [ListOrdered, "Impaginazione", "Un documento ordinato", "Organizza sezioni, immagini e dettagli in un layout leggibile."],
    [FileText, "PDF", "Presenta con chiarezza", "Genera il documento che accompagna il cliente nella scelta."],
  ];
  return (
    <ul className="mt-6 space-y-3">
      {items.map(([Icon, kicker, title, body]) => (
        <li key={kicker} className="flex gap-3">
          <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-[#dcecff] text-[#1769d5]"><Icon className="h-4 w-4" /></span>
          <span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-[#a33a22]">{kicker}</span>
            <b className="block text-sm text-[#102744]">{title}</b>
            <span className="block text-sm leading-6 text-[#557090]">{body}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* HERO                                                                */
/* ------------------------------------------------------------------ */

function HeroProduct() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.9, 1]);
  const [loopRef, step] = useLoopSteps(2, 6500);
  const list = step === 0;

  return (
    <div ref={ref} className="relative mx-auto mt-14 max-w-[1080px] [perspective:1600px] sm:mt-20">
      <motion.div ref={loopRef} style={{ rotateX, scale, transformOrigin: "center top" }} className="relative">
        <AppWindow active="preventivi" title={list ? "Preventivi" : "Preventivatore"} className="h-[420px] sm:h-[500px]">
          <AnimatePresence initial={false}>
            <motion.div
              key={list ? "list" : "editor"}
              className="absolute inset-3"
              initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.01, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: tpEase }}
            >
              {list ? <PreventiviListScreen /> : <PreventivatoreScreen />}
            </motion.div>
          </AnimatePresence>
        </AppWindow>
      </motion.div>
      <p className="mt-6 text-center text-xs font-semibold text-[#b9dcff]">Schermate dimostrative, dati di esempio.</p>
      <div className="pointer-events-none absolute inset-x-[10%] -bottom-10 h-24 rounded-[100%] bg-[#04214f]/40 blur-3xl" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* RACCONTO — sticky scroll: intestazione → composizione → PDF → conv. */
/* ------------------------------------------------------------------ */

function Story() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const current = chapters[active];

  return (
    <section className="relative bg-[#f4f9ff] py-24 sm:py-32" id="come-funziona-flusso">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Tag tone="amber">COME FUNZIONA</Tag>
          <h2 className="mt-6 text-5xl font-bold leading-[.95] tracking-[-0.065em] text-[#102744] sm:text-7xl">
            <WordReveal text="Dalla prima idea al preventivo" />
            <br />
            <WordReveal text="pronto da presentare." className="text-[#0b55c6]" delay={0.2} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#557090]">Il lead arriva dalla pipeline del CRM. Da lì costruisci la proposta in cinque passaggi: prodotti, composizione, prezzi, PDF e conversione.</p>
          </Reveal>
        </div>

        <Stagger className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-2" gap={0.05}>
          {chapters.map((c, i) => (
            <StaggerItem key={c.id}>
              <a
                href={`#capitolo-${c.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(`capitolo-${c.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769d5] ${
                  i === active ? "border-[#1769d5] bg-[#1769d5] text-white shadow-[0_8px_20px_rgba(23,105,213,.22)]" : "border-[#cfe1f4] bg-white text-[#245b96] hover:border-[#1769d5]"
                }`}
              >
                <span className={`font-mono text-[10px] ${i === active ? "text-[#cfe6ff]" : "text-[#557090]"}`}>0{i + 1}</span>
                <c.icon className={`h-3.5 w-3.5 ${i === active ? "text-white" : "text-[#f36b4d]"}`} />
                {c.short}
              </a>
            </StaggerItem>
          ))}
        </Stagger>

        <div ref={ref} className="relative mt-14 grid gap-10 sm:mt-20 lg:grid-cols-[.78fr_1.22fr] lg:gap-16">
          {/* linea di avanzamento (solo desktop) */}
          <div className="absolute bottom-0 left-0 top-0 hidden w-[2px] rounded-full bg-[#d6e6f6] lg:block">
            <motion.div style={{ scaleY: fill }} className="h-full w-full origin-top rounded-full bg-[linear-gradient(#1769d5,#f36b4d)]" />
          </div>
          <div className="lg:pl-10">
            {chapters.map((c, i) => (
              <ChapterBlock key={c.id} chapter={c} index={i} onActive={() => setActive(i)} />
            ))}
          </div>
          <div className="hidden lg:block">
            <div className="sticky top-[max(88px,calc(50vh-280px))]">
              <div className={`relative h-[600px] rounded-[36px] p-5 transition-[background] duration-700 ${panelTones[active % panelTones.length]}`}>
                <div className="mb-3 flex items-center justify-between px-1">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-[11px] font-bold text-[#245b96] backdrop-blur">
                    <span className="font-mono text-[#557090]">0{active + 1}</span> {current.short}
                  </span>
                  <span className="flex gap-1.5" aria-hidden>
                    {chapters.map((c, i) => (
                      <span key={c.id} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-6 bg-[#1769d5]" : "w-1.5 bg-white"}`} />
                    ))}
                  </span>
                </div>
                <div className="relative h-[530px]">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={current.id}
                      className="absolute inset-0 flex flex-col justify-center"
                      initial={{ opacity: 0, y: 24, scale: 0.98, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -16, scale: 0.99, filter: "blur(6px)" }}
                      transition={{ duration: 0.55, ease: tpEase }}
                    >
                      {current.screen()}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChapterBlock({ chapter, index, onActive }: { chapter: Chapter; index: number; onActive: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive();
  }, [inView, onActive]);
  const Icon = chapter.icon;

  return (
    <div id={`capitolo-${chapter.id}`} ref={ref} className="flex flex-col justify-center py-10 lg:min-h-[86vh] lg:py-0">
      <Reveal>
        <div className="flex items-center gap-3">
          <span aria-hidden className="font-mono text-5xl font-bold tracking-[-0.06em] text-[#d6e6f6] sm:text-6xl">0{index + 1}</span>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#1769d5] shadow-[0_6px_18px_rgba(16,39,68,.08)] ring-1 ring-[#cfe1f4]"><Icon className="h-4 w-4" /></span>
        </div>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-[#a33a22]">{chapter.eyebrow}</p>
        <h3 className="mt-3 max-w-lg text-3xl font-bold leading-[1.02] tracking-[-0.055em] text-[#102744] sm:text-[2.6rem]">{chapter.title}</h3>
        <div className="mt-5 max-w-lg text-base leading-7 text-[#557090]">{chapter.body}</div>
        {chapter.extra}
        <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#cfe1f4] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#557090]">
          <ClipboardList className="h-3.5 w-3.5 text-[#1769d5]" /> {chapter.where}
        </span>
      </Reveal>
      {/* mobile/tablet: la schermata segue il testo */}
      <Reveal y={36} delay={0.05} className="mt-8 lg:hidden">
        <div className={`rounded-[28px] p-2.5 sm:p-4 ${panelTones[index % panelTones.length]}`}>{chapter.screen()}</div>
      </Reveal>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Illustrazioni non-UI (alternative, riepilogo, showroom)             */
/* ------------------------------------------------------------------ */

/** Schema astratto: configurazione principale con extra e opzioni che si agganciano. */
function OptionsDiagram() {
  const [ref, step] = useLoopSteps(4, 1500);
  const branches = [
    { label: "Extra", icon: Plus },
    { label: "Opzioni", icon: Layers },
    { label: "Alternativa", icon: GitBranch },
  ];
  return (
    <div ref={ref} className="relative mt-8 rounded-[24px] bg-[#f4f9ff] p-5">
      <div className="flex items-center gap-3 rounded-[18px] bg-white p-3.5 shadow-[0_6px_18px_rgba(16,39,68,.06)] ring-1 ring-[#e4eef8]">
        <span className="grid h-9 w-9 place-items-center rounded-[12px] bg-[#082c68] text-white"><LayoutTemplate className="h-4 w-4" /></span>
        <b className="text-sm text-[#102744]">Configurazione principale</b>
      </div>
      <div className="ml-7 border-l-2 border-dashed border-[#bcd7f1] pl-5 pt-2">
        {branches.map((b, i) => (
          <motion.div
            key={b.label}
            initial={false}
            animate={{ opacity: i < step ? 1 : 0.3, x: i < step ? 0 : -8 }}
            transition={{ duration: 0.5, ease: tpEase }}
            className="relative mt-2 flex items-center gap-2.5 rounded-[14px] bg-white px-3 py-2.5 ring-1 ring-[#e4eef8]"
          >
            <span className="absolute -left-5 top-1/2 h-[2px] w-5 bg-[#bcd7f1]" />
            <span className="grid h-7 w-7 place-items-center rounded-[9px] bg-[#ffdcd2] text-[#a33a22]"><b.icon className="h-3.5 w-3.5" /></span>
            <span className="text-sm font-semibold text-[#245b96]">{b.label}</span>
            {i < step && <Check className="ml-auto h-4 w-4 text-[#1769d5]" />}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/** Le parti della proposta confluiscono in un unico totale. */
function SummaryDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  return (
    <div ref={ref} className="relative mt-8 rounded-[24px] bg-[#fffaf7] p-5">
      <div className="flex flex-wrap gap-2">
        {summaryParts.map((p, i) => (
          <motion.span
            key={p}
            initial={{ opacity: 0, y: -12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 22 }}
            className="rounded-full border border-[#f6d2c8] bg-white px-3 py-1.5 text-xs font-semibold text-[#a33a22]"
          >
            {p}
          </motion.span>
        ))}
      </div>
      <svg viewBox="0 0 300 46" className="my-1 h-12 w-full" preserveAspectRatio="none" aria-hidden>
        {[30, 90, 150, 210, 270].map((x, i) => (
          <motion.path
            key={x}
            d={`M${x} 2 C ${x} 26, 150 20, 150 44`}
            fill="none"
            stroke="#f3b3a2"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.06, duration: 0.8, ease: tpEase }}
          />
        ))}
      </svg>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.1, duration: 0.6, ease: tpEase }}
        className="flex items-center justify-between rounded-[18px] bg-[#082c68] px-4 py-3.5 text-white"
      >
        <span className="flex items-center gap-2 text-sm font-bold"><Sigma className="h-4 w-4 text-[#9fe0ff]" /> Totale complessivo</span>
        <span className="text-xs font-semibold text-[#9fe0ff]">un unico riepilogo</span>
      </motion.div>
    </div>
  );
}

/** Lo stesso documento, con l'intestazione di ogni showroom. */
function ShowroomDiagram() {
  const [ref, step] = useLoopSteps(showrooms.length, 1800);
  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[460px]">
      <div className="absolute -inset-6 rounded-[40px] bg-[linear-gradient(135deg,#dcecff,#fff2ea)]" />
      <div className="relative">
        {[2, 1].map((d) => (
          <div key={d} className="absolute inset-0 rounded-[28px] bg-white/70 ring-1 ring-[#e4eef8]" style={{ transform: `translate(${d * 10}px, ${d * 10}px)` }} />
        ))}
        <div className="relative rounded-[28px] bg-white p-7 shadow-[0_30px_70px_rgba(16,39,68,.14)] ring-1 ring-[#e4eef8]">
          <div className="flex items-center justify-between">
            <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#082c68] text-white"><Building2 className="h-5 w-5" /></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#557090]">Proposta commerciale</span>
          </div>
          <div className="mt-6 h-12 overflow-hidden">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.p
                key={showrooms[step]}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.55, ease: tpEase }}
                className="text-3xl font-bold tracking-[-0.05em] text-[#102744]"
              >
                Showroom {showrooms[step]}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="mt-6 space-y-2" aria-hidden>
            <span className="block h-2 w-[85%] rounded-full bg-[#eef5fd]" />
            <span className="block h-2 w-[70%] rounded-full bg-[#eef5fd]" />
            <span className="block h-2 w-[55%] rounded-full bg-[#eef5fd]" />
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-[#e4eef8] pt-4 text-xs font-semibold text-[#557090]">
            <span>Cucina · Soggiorno · Servizi</span>
            <span className="text-[#1769d5]">Layout e identità dello showroom</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PAGINA                                                              */
/* ------------------------------------------------------------------ */

export function PreventiviProductPage() {
  useSeo({
    title: "Software preventivi per arredamento e cucine",
    description: "Software preventivi per negozi e showroom di arredamento: offerte per cucine, mobili, sistemi e servizi con specifiche, immagini, versioni e PDF. Il preventivo convertito crea trattativa e schedina cliente.",
    path: routes.preventivi,
  });

  return (
    <MarketingShell active="preventivi" overlayHeader>
      <main id="top" className="overflow-x-clip bg-[#fbfdff] text-[#102744]">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[linear-gradient(116deg,#082c68_0%,#0d56bf_54%,#1387ee_100%)] pb-20 pt-28 text-white sm:pb-28 sm:pt-36">
          <motion.div aria-hidden className="absolute -right-20 top-10 h-[420px] w-[420px] rounded-full bg-[#75d7ff]/30 blur-3xl" animate={{ x: [0, -60, 0], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div aria-hidden className="absolute -left-28 top-[380px] h-[420px] w-[420px] rounded-full bg-[#f36b4d]/20 blur-3xl" animate={{ x: [0, 50, 0], y: [0, -30, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
          <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#cfe6ff]">
              <a href={routes.home} className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Home</a>
              <ChevronRight aria-hidden className="h-3 w-3 opacity-60" />
              <span aria-current="page" className="text-white">Preventivi</span>
            </nav>
            <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
              <div>
                <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: tpEase }} className="inline-flex items-center gap-2 rounded-full border border-[#8ecbff] bg-[#5abaff]/20 px-3.5 py-2 text-xs font-bold tracking-[0.08em] text-[#eff8ff]">
                  <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9fe0ff] opacity-75 motion-reduce:animate-none" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#9fe0ff]" /></span>
                  SOFTWARE PREVENTIVI
                </motion.span>
                <h1 className="mt-7 max-w-3xl text-[clamp(2.7rem,6.2vw,5.6rem)] font-bold leading-[.95] tracking-[-0.07em]">
                  <WordReveal text="Un preventivatore costruito per" />{" "}
                  <WordReveal text="la complessità dell’arredamento." className="text-[#9fe0ff]" delay={0.25} />
                </h1>
              </div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: tpEase, delay: 0.45 }}>
                <p className="max-w-xl text-lg leading-8 text-[#e5f3ff]">Trasforma una proposta articolata in un preventivo ordinato, visuale e professionale. Cucine, sistemi, mobili, elettrodomestici e servizi rimangono nello stesso flusso.</p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <DemoButton light />
                  <a href="#come-funziona" className="group inline-flex items-center gap-2 px-2 text-sm font-bold text-white hover:text-[#d0e8ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                    Scopri come funziona <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                  </a>
                </div>
                <p className="mt-5 text-xs font-semibold text-[#cfe6ff]">Per negozi, showroom e rivenditori di arredamento, con una o più sedi.</p>
              </motion.div>
            </div>
            <HeroProduct />
          </div>
        </section>

        {/* COMPLESSITÀ */}
        <section className="border-b border-[#f3e3dc] bg-[#fffaf7] py-24 sm:py-32" id="come-funziona">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[1fr_.85fr] lg:items-end lg:gap-20">
              <div>
                <Tag tone="coral">LA COMPLESSITÀ DELL’ARREDAMENTO</Tag>
                <h2 className="mt-6 max-w-2xl text-4xl font-bold leading-[.97] tracking-[-0.065em] text-[#102744] sm:text-6xl">
                  <WordReveal text="Una proposta può avere molte parti. Il preventivo non deve diventare difficile da leggere." />
                </h2>
              </div>
              <Reveal delay={0.1}>
                <p className="max-w-md text-lg leading-8 text-[#254b72]">Una cucina attraversa composizioni, aree, dimensioni, finiture, elettrodomestici e opzioni. Un progetto di arredamento aggiunge brand, modelli, immagini, servizi e più alternative.</p>
              </Reveal>
            </div>
            <ScrollLitText className="mt-14 max-w-4xl text-3xl font-bold leading-[1.08] tracking-[-0.05em] text-[#102744] sm:text-5xl" text="Totalone riunisce questi elementi in una proposta organizzata, pronta da modificare, condividere e presentare al cliente." />
          </div>
        </section>

        {/* RACCONTO */}
        <Story />

        {/* ALTERNATIVE, EXTRA E OPZIONI */}
        <section className="bg-[#fbfdff] py-24 sm:py-32">
          <div className="mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_.9fr] lg:items-center lg:gap-20 lg:px-10">
            <div>
              <Tag>UNA PROPOSTA PIÙ FLESSIBILE</Tag>
              <h2 className="mt-6 max-w-xl text-4xl font-bold leading-[.97] tracking-[-0.06em] text-[#102744] sm:text-6xl"><WordReveal text="Alternative, extra e opzioni nello stesso preventivo." /></h2>
              <Reveal delay={0.1}>
                <p className="mt-7 max-w-lg text-base leading-7 text-[#557090]">Una proposta di arredamento cambia continuamente. Aggiungi extra e opzioni alla configurazione principale, senza creare documenti separati: il preventivo resta leggibile anche quando il cliente valuta più possibilità.</p>
              </Reveal>
            </div>
            <Reveal y={30}>
              <OptionsDiagram />
            </Reveal>
          </div>
        </section>

        {/* PIÙ SHOWROOM */}
        <section className="overflow-hidden bg-[#eff7ff] py-24 sm:py-32">
          <div className="mx-auto grid max-w-[1240px] gap-16 px-5 sm:px-8 lg:grid-cols-[1fr_.9fr] lg:items-center lg:gap-24 lg:px-10">
            <div>
              <Tag>PIÙ SHOWROOM, LO STESSO METODO</Tag>
              <h2 className="mt-6 max-w-xl text-5xl font-bold leading-[.95] tracking-[-0.065em] text-[#102744] sm:text-6xl"><WordReveal text="Ogni sede prepara le proposte allo stesso modo." /></h2>
              <Reveal delay={0.1}>
                <p className="mt-7 max-w-lg text-base leading-7 text-[#557090]">Ogni preventivo indica lo showroom da cui parte, così il documento per il cliente riporta la sede giusta.</p>
                <p className="mt-3 max-w-lg text-base leading-7 text-[#557090]">Il team usa lo stesso metodo in tutte le sedi, e ogni punto vendita conserva i propri preventivi.</p>
              </Reveal>
              <Stagger className="mt-8 flex flex-wrap gap-2" gap={0.06}>
                {showrooms.map((s) => (
                  <StaggerItem key={s}>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#bcd7f1] bg-white px-3.5 py-2 text-xs font-semibold text-[#245b96]"><Building2 className="h-3.5 w-3.5 text-[#f36b4d]" />Showroom {s}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
            <Reveal y={40}>
              <ShowroomDiagram />
            </Reveal>
          </div>
        </section>

        <ProcessoStrip current="preventivi" />
        <NextStep />
      </main>
    </MarketingShell>
  );
}

/** Link al modulo successivo nel flusso (Preventivi → Gestione trattative). */
function NextStep() {
  return (
    <section className="bg-[#f4f9ff] pb-20 sm:pb-24" aria-labelledby="next-step-title">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <a
          href={routes.trattative}
          className="group flex flex-col gap-5 rounded-[28px] border border-[#cfe1f4] bg-white p-6 transition-shadow hover:shadow-[0_20px_50px_rgba(16,39,68,.10)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1769d5] sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <span className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[16px] bg-[#ffdcd2] text-[#a33a22]"><Handshake className="h-5 w-5" /></span>
            <span>
              <span className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b55c6]">Il passo successivo</span>
              <span id="next-step-title" className="mt-1 block text-2xl font-bold tracking-[-0.04em] text-[#102744]">Il cliente accetta: nasce la trattativa.</span>
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#0b55c6] group-hover:text-[#a33a22]">
            Scopri la Gestione trattative <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </a>
      </div>
    </section>
  );
}
