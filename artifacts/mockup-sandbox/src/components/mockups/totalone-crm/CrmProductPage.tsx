import { useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  FileText,
  Filter,
  Handshake,
  ListChecks,
  MapPin,
  Send,
  Store,
  TrendingUp,
  UserPlus,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { MarketingShell, openDemo } from "../totalone-site-architecture/_shared/MarketingShell";
import { Reveal, SpotlightCard, Stagger, StaggerItem, WordReveal, tpEase, useLoopSteps } from "@/components/totalone/motion-kit";
import { AppWindow, uiFont } from "@/components/totalone/app-ui";
import { IngressiScreen, PipelineScreen } from "@/components/totalone/app-screens";
import { AppuntamentiScreen, ContattiAziendaliScreen, EmailMarketingScreen } from "@/components/totalone/pages/crm/CrmScreens";
import { blogRoutes, routes } from "@/components/totalone/site/siteRoutes";
import { useSeo } from "@/components/totalone/site/useSeo";
import { ProcessoStrip } from "@/components/totalone/site/ProcessoStrip";

/* ------------------------------------------------------------------ */
/* Dati della pagina                                                   */
/* ------------------------------------------------------------------ */

const contactFeatures = ["Ricerca per nome, email, telefono, città", "Smart List", "Tag", "Provenienza lead", "Anagrafiche aziendali", "Referenti"];
const showroomFeatures = ["Showroom", "Data e ora", "Venditore", "Provenienza", "Motivo della visita", "Collegamento al cliente"];

/** Il percorso del lead mostrato nell'hero: ogni tappa è una schermata reale del CRM. */
const journey = [
  { label: "Ingresso", caption: "Il cliente entra in showroom", icon: Store, nav: "crm.ingressi", tab: "Ingressi", screen: IngressiScreen },
  { label: "Appuntamento", caption: "Si fissa l'incontro", icon: CalendarDays, nav: "appuntamenti", tab: "Appuntamenti", screen: AppuntamentiScreen },
  { label: "Pipeline", caption: "Il lead avanza fino al preventivo", icon: UserPlus, nav: "crm.pipeline", tab: "Pipeline CRM", screen: PipelineScreen },
] as const;

const faqs = [
  ["È pensato solo per chi ha un grande showroom?", "No. Totalone è pensato per negozi di arredamento, showroom e realtà con più sedi: il flusso si adatta alla dimensione del team e al numero di showroom."],
  ["Si può registrare un visitatore che non lascia i dati?", "Sì. Puoi registrare l'ingresso con showroom, ora, venditore, provenienza e motivo della visita anche senza nome e contatti. Se il visitatore torna o lascia i dati, lo colleghi al cliente."],
  ["Funziona su più showroom?", "Sì. Ingressi, appuntamenti e lead sono legati allo showroom: puoi lavorare su una sede sola o confrontare tutte le sedi insieme."],
  ["Le informazioni restano condivise con il team?", "Sì. Clienti, visite, appuntamenti e lead restano dell'azienda, non della memoria del singolo venditore. Chi riprende un cliente vede cosa è successo prima."],
  ["Posso portare in Totalone i contatti che ho oggi?", "Sì. In fase di avvio vediamo insieme da dove arrivano i tuoi contatti (fogli Excel, rubriche, altri strumenti) e come portarli nel CRM."],
] as const;

/* ------------------------------------------------------------------ */
/* Primitivi di pagina                                                 */
/* ------------------------------------------------------------------ */

const wrap = "mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10";
const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1769d5]";

function DemoButton({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <motion.button
      type="button"
      onClick={openDemo}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-0 px-6 py-3.5 text-[14px] font-bold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 ${
        light
          ? "bg-white text-[#0b4fbd] shadow-[0_10px_28px_rgba(4,43,102,.22)] hover:bg-[#e9f3ff] focus-visible:outline-white"
          : "bg-[#cf4a2b] text-white shadow-[0_10px_24px_rgba(173,57,35,.22)] hover:bg-[#b93f23] focus-visible:outline-[#cf4a2b]"
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </motion.button>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className={`group inline-flex items-center gap-1.5 text-sm font-bold text-[#0b55c6]! hover:text-[#a33a22]! ${focusRing}`}>
      {children} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
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
      <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold tracking-[0.06em] ${tones[tone]}`}>{children}</span>
    </Reveal>
  );
}

function H2({ children, className = "" }: { children: string; className?: string }) {
  return (
    <h2 className={`mt-6 text-[2.6rem] font-bold leading-[.95] tracking-[-0.065em] text-[#102744] sm:text-6xl ${className}`}>
      <WordReveal text={children} />
    </h2>
  );
}

function FeaturePills({ items }: { items: readonly string[] }) {
  return (
    <Stagger className="mt-7 flex flex-wrap gap-2" gap={0.05}>
      {items.map((item) => (
        <StaggerItem key={item}>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#cfe1f4] bg-white px-3.5 py-2 text-xs font-bold text-[#245b96]">
            <Check className="h-3.5 w-3.5 text-[#1769d5]" /> {item}
          </span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Cornice pastello attorno a una finestra del gestionale (decorativa). */
function ScreenPanel({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "coral" | "amber" | "mint" }) {
  const tones = {
    blue: "bg-[radial-gradient(circle_at_20%_10%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#dcecff,#c9e1ff)]",
    coral: "bg-[radial-gradient(circle_at_80%_10%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#ffe9e1,#ffd9cc)]",
    amber: "bg-[radial-gradient(circle_at_20%_90%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#fff2dd,#ffe4b8)]",
    mint: "bg-[radial-gradient(circle_at_80%_90%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#e3f6ec,#cdeedd)]",
  };
  return <div className={`relative rounded-[36px] p-3 sm:p-5 ${tones[tone]}`}>{children}</div>;
}

/** Sezione testo + schermata, alternata. */
function FeatureSplit({ id, bg, flip = false, copy, visual, after }: { id?: string; bg: string; flip?: boolean; copy: ReactNode; visual: ReactNode; after?: ReactNode }) {
  return (
    <section id={id} className={`${bg} scroll-mt-24 py-24 sm:py-32`}>
      <div className={`${wrap} grid items-center gap-12 lg:gap-20 ${flip ? "lg:grid-cols-[1.15fr_.85fr]" : "lg:grid-cols-[.85fr_1.15fr]"}`}>
        <div className={flip ? "lg:order-2" : ""}>{copy}</div>
        <Reveal y={40} delay={0.08} className={`min-w-0 ${flip ? "lg:order-1" : ""}`}>
          {visual}
        </Reveal>
      </div>
      {after && <div className={`${wrap} mt-14`}>{after}</div>}
    </section>
  );
}

/** Link al modulo successivo nel flusso commerciale (CRM → Preventivi). */
function NextStep() {
  return (
    <section className="bg-[#f4f9ff] pb-20 sm:pb-24" aria-labelledby="next-step-title">
      <div className={wrap}>
        <a
          href={routes.preventivi}
          className={`group flex flex-col gap-5 rounded-[28px] border border-[#cfe1f4] bg-white p-6 transition-shadow hover:shadow-[0_20px_50px_rgba(16,39,68,.10)] sm:flex-row sm:items-center sm:justify-between sm:p-8 ${focusRing}`}
        >
          <span className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[16px] bg-[#ffdcd2] text-[#a33a22]"><FileText className="h-5 w-5" /></span>
            <span>
              <span className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b55c6]">Il passo successivo</span>
              <span id="next-step-title" className="mt-1 block text-2xl font-bold tracking-[-0.04em] text-[#102744]">Il lead è pronto per una proposta: si passa al preventivo.</span>
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#0b55c6] group-hover:text-[#a33a22]">
            Scopri i Preventivi <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* HERO — tour del percorso del lead su schermate reali                  */
/* ------------------------------------------------------------------ */

function HeroJourney() {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15%" });
  const reduce = useReducedMotion();
  const step = journey[active];
  const Screen = step.screen;
  const paused = hover || !inView || !!reduce;

  return (
    <div ref={ref} className="relative mx-auto mt-14 max-w-[1120px] sm:mt-20" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <motion.div initial={{ opacity: 0, y: 50, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.1, ease: tpEase, delay: 0.35 }} className="relative">
        <AppWindow active={step.nav} title={step.tab} className="relative h-[420px] sm:h-[500px] lg:h-[540px]">
          <AnimatePresence initial={false}>
            <motion.div
              key={step.label}
              className="absolute inset-3"
              initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.01, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease: tpEase }}
            >
              <Screen />
            </motion.div>
          </AnimatePresence>
        </AppWindow>

        <FloatingNote className="-left-8 top-28 hidden lg:flex" delay={1.4} float={10}>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#fff2dd] text-[#8a4f0f]"><Store className="h-4 w-4" /></span>
          <span><b className="block text-[12px] text-[#102744]">Nuovo ingresso</b><span className="text-[11px] text-[#557090]">Milano Centro · Giulia Ferri</span></span>
        </FloatingNote>
        <FloatingNote className="-right-8 bottom-24 hidden lg:flex" delay={1.8} float={-12}>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#dcecff] text-[#1769d5]"><CalendarDays className="h-4 w-4" /></span>
          <span><b className="block text-[12px] text-[#102744]">Appuntamento fissato</b><span className="text-[11px] text-[#557090]">Casa Bianchi · showroom Como</span></span>
        </FloatingNote>
      </motion.div>

      {/* Mini-timeline del percorso: ogni tappa è anche un tab */}
      <div className="relative mt-6 grid gap-2 sm:grid-cols-3" role="tablist" aria-label="Il percorso del lead nel CRM">
        {journey.map((j, i) => {
          const on = i === active;
          const done = i < active;
          const Icon = j.icon;
          return (
            <button
              key={j.label}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              className={`relative cursor-pointer overflow-hidden rounded-[20px] border px-4 py-3.5 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                on ? "border-white/40 bg-white/16" : "border-white/12 bg-white/[.05] hover:bg-white/10"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors duration-300 ${on ? "bg-white text-[#0b55c6]" : done ? "bg-[#9fe0ff] text-[#082c68]" : "bg-white/12 text-[#cfe9ff]"}`}>
                  {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] text-[#9fe0ff]">0{i + 1}</span>
                  <span className="block text-sm font-bold text-white">{j.label}</span>
                </span>
              </span>
              <span className="mt-2 hidden text-xs leading-5 text-[#cfe4fb] sm:block">{j.caption}</span>
              {i < journey.length - 1 && <ArrowRight aria-hidden className="absolute right-3 top-4 hidden h-4 w-4 text-white/30 sm:block" />}
              {on && (
                <span
                  key={`bar-${j.label}`}
                  onAnimationEnd={() => setActive((v) => (v + 1) % journey.length)}
                  className="absolute bottom-0 left-0 right-0 h-[3px] origin-left bg-[#9fe0ff] [animation:tp-progress_6.5s_linear_forwards]"
                  style={{ animationPlayState: paused ? "paused" : "running" }}
                />
              )}
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-center text-xs font-semibold text-[#b9dcff]">Schermate dimostrative, dati di esempio.</p>
      <div className="pointer-events-none absolute inset-x-[10%] top-[60%] -z-10 h-24 rounded-[100%] bg-[#04214f]/40 blur-3xl" />
    </div>
  );
}

function FloatingNote({ children, className, delay, float }: { children: ReactNode; className: string; delay: number; float: number }) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: [0, float, 0] }}
      transition={{ opacity: { delay, duration: 0.6 }, scale: { delay, duration: 0.6, ease: tpEase }, y: { delay, duration: 6, repeat: Infinity, ease: "easeInOut" } }}
      className={`absolute z-20 items-center gap-3 rounded-[18px] bg-white/95 py-3 pl-3 pr-5 shadow-[0_18px_44px_rgba(4,30,80,.28)] ring-1 ring-white backdrop-blur ${className}`}
      style={uiFont}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(116deg,#082c68_0%,#0d56bf_54%,#1387ee_100%)] pb-20 pt-28 text-white sm:pb-28 sm:pt-36">
      <motion.div aria-hidden className="absolute -right-20 top-10 h-[420px] w-[420px] rounded-full bg-[#75d7ff]/30 blur-3xl" animate={{ x: [0, -60, 0], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div aria-hidden className="absolute -left-28 top-[460px] h-[420px] w-[420px] rounded-full bg-[#f36b4d]/20 blur-3xl" animate={{ x: [0, 50, 0], y: [0, -30, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
      <div className={`relative ${wrap}`}>
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#cfe6ff]">
          <a href={routes.home} className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Home</a>
          <ChevronRight aria-hidden className="h-3 w-3 opacity-60" />
          <span aria-current="page" className="text-white">CRM</span>
        </nav>
        <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
          <div>
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: tpEase }} className="inline-flex items-center gap-2 rounded-full border border-[#8ecbff] bg-[#5abaff]/20 px-3.5 py-2 text-xs font-bold tracking-[0.08em] text-[#eff8ff]">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9fe0ff] opacity-75 motion-reduce:animate-none" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#9fe0ff]" /></span>
              CRM PER ARREDATORI
            </motion.span>
            <h1 className="mt-7 max-w-3xl text-[clamp(2.9rem,6.6vw,6.2rem)] font-bold leading-[.93] tracking-[-0.075em]">
              <WordReveal text="Il CRM costruito" />
              <br />
              <WordReveal text="per chi vende arredamento." className="text-[#9fe0ff]" delay={0.25} />
            </h1>
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: tpEase, delay: 0.5 }}>
            <p className="max-w-xl text-lg leading-8 text-[#e5f3ff]">Dal primo ingresso in showroom al momento del preventivo, Totalone raccoglie clienti, visite, appuntamenti e lead in un unico posto. Il team sa sempre chi seguire e qual è il prossimo passo.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <DemoButton light>Prenota una demo</DemoButton>
              <a href="#contatti" className="group inline-flex items-center gap-2 px-2 text-sm font-bold text-white! hover:text-[#d0e8ff]! focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Scopri come funziona <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </div>
            <p className="mt-6 text-xs font-semibold text-[#b9dcff]">Per showroom, negozi di arredamento e realtà con più sedi.</p>
          </motion.div>
        </div>
        <HeroJourney />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PERCHÉ È DIVERSO                                                    */
/* ------------------------------------------------------------------ */

const benefits: [string, string, LucideIcon][] = [
  ["Ogni contatto ha una storia", "Visite, provenienza, appuntamenti e note restano sul cliente, non sparsi tra Excel, email e appunti.", UsersRound],
  ["Ogni lead ha un prossimo passo", "Sai chi ricontattare, chi ha un appuntamento fissato e per chi va preparato il preventivo.", TrendingUp],
  ["Il lavoro continua senza ricopiare", "Quando il preventivo viene accettato, il cliente passa in trattativa e nella schedina con i dati già raccolti.", Handshake],
];

function WhySection() {
  return (
    <section className="bg-[#fffaf7] py-24 sm:py-32">
      <div className={wrap}>
        <div className="grid gap-10 lg:grid-cols-[1fr_.85fr] lg:items-end lg:gap-20">
          <div>
            <Tag tone="coral">PERCHÉ È DIVERSO</Tag>
            <H2 className="max-w-2xl">Non un CRM generico adattato all’arredamento.</H2>
          </div>
          <Reveal delay={0.1}>
            <p className="text-lg leading-8 text-[#254b72]">Vendere arredamento vuol dire seguire relazioni che durano mesi: ingressi in showroom, richieste, appuntamenti, misure, preventivi e ritorni.</p>
            <p className="mt-4 text-base leading-7 text-[#557090]">Il CRM di Totalone segue questi passaggi così come avvengono in negozio, e li tiene collegati a quello che succede dopo la vendita.</p>
          </Reveal>
        </div>
        <Stagger className="mt-14 grid gap-4 md:grid-cols-3">
          {benefits.map(([title, body, Icon], i) => (
            <StaggerItem key={title}>
              <SpotlightCard className="h-full rounded-[28px] border border-[#f3e2da] bg-white p-7 shadow-[0_1px_4px_rgba(2,8,23,.04)] transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(16,39,68,.10)]">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#ffdcd2] text-[#a33a22]"><Icon className="h-5 w-5" /></span>
                  <span aria-hidden className="font-mono text-4xl font-bold tracking-[-0.06em] text-[#f6e3db]">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-bold leading-6 tracking-[-0.03em] text-[#102744]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#557090]">{body}</p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* INGRESSI — tile della dashboard ingressi                             */
/* ------------------------------------------------------------------ */

const analyticsTiles: [string, string, LucideIcon][] = [
  ["Totale ingressi", "Il volume delle visite, in ogni periodo.", Store],
  ["Trend", "Come cambia l’affluenza nel tempo.", TrendingUp],
  ["Showroom", "Quali sedi generano più traffico.", MapPin],
  ["Venditori", "Chi segue le visite, sede per sede.", UsersRound],
];

function AnalyticsTiles() {
  return (
    <div>
      <Reveal>
        <p className="text-sm font-bold text-[#102744]">Dalla dashboard ingressi: confronta sedi, periodi e venditori.</p>
      </Reveal>
      <Stagger className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {analyticsTiles.map(([label, body, Icon]) => (
          <StaggerItem key={label}>
            <div className="h-full rounded-[24px] border border-[#cfe1f4] bg-white p-5">
              <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-[#fff2dd] text-[#8a4f0f]"><Icon className="h-5 w-5" /></span>
              <p className="mt-4 text-base font-bold tracking-[-0.02em] text-[#102744]">{label}</p>
              <p className="mt-1.5 text-xs leading-5 text-[#557090]">{body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PIPELINE LEAD — le 4 fasi della schermata reale                      */
/* ------------------------------------------------------------------ */

const stages = ["Contatto iniziale", "Qualifica", "Appuntamento", "Preventivo"];

function PipelineSection() {
  const [ref, step] = useLoopSteps(stages.length, 1400);
  return (
    <section id="pipeline" className="scroll-mt-24 bg-[#eff7ff] py-24 sm:py-32">
      <div className={wrap}>
        <div className="grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-end lg:gap-20">
          <div>
            <Tag>PIPELINE LEAD</Tag>
            <H2 className="max-w-2xl">Ogni lead in una colonna. Ogni colonna, un prossimo passo.</H2>
          </div>
          <Reveal delay={0.1}>
            <p className="text-base leading-7 text-[#557090]">Contatto iniziale, qualifica, appuntamento, preventivo: sposti il lead quando avanza e il team vede subito il valore in gioco e chi deve muoversi. Le Smart List filtrano la pipeline per il pubblico che ti interessa.</p>
            <p className="mt-4 text-base leading-7 text-[#557090]">Quando il preventivo viene accettato e convertito, il lead diventa una trattativa.</p>
            <div className="mt-6"><TextLink href={routes.trattative}>Cosa succede dopo il sì: Gestione trattative</TextLink></div>
          </Reveal>
        </div>

        <div ref={ref} className="mt-12 flex flex-wrap items-center gap-2" aria-label="Fasi della pipeline lead">
          {stages.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <motion.span
                animate={{ backgroundColor: i <= step ? "#1769d5" : "#ffffff", color: i <= step ? "#ffffff" : "#245b96", borderColor: i <= step ? "#1769d5" : "#cfe1f4" }}
                transition={{ duration: 0.35 }}
                className="inline-flex rounded-full border px-4 py-2 text-xs font-bold"
              >
                {s}
              </motion.span>
              {i < stages.length - 1 && <ArrowRight aria-hidden className={`h-4 w-4 transition-colors duration-300 ${i < step ? "text-[#1769d5]" : "text-[#b7cde4]"}`} />}
            </div>
          ))}
        </div>

        <Reveal y={40} className="mt-8">
          <ScreenPanel>
            <AppWindow active="crm.pipeline" title="Pipeline CRM" className="h-[400px] sm:h-[480px]">
              <PipelineScreen />
            </AppWindow>
          </ScreenPanel>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* SEGMENTAZIONE — Smart List → campagna email                          */
/* ------------------------------------------------------------------ */

function SegmentFlow() {
  const [ref, step] = useLoopSteps(3, 1500);
  const items: [string, LucideIcon][] = [["Filtra i contatti", Filter], ["Salva la Smart List", ListChecks], ["Invia la campagna", Send]];
  return (
    <div ref={ref} className="mt-8 flex flex-wrap items-center gap-2">
      {items.map(([label, Icon], i) => (
        <div key={label} className="flex items-center gap-2">
          <motion.span
            animate={{ backgroundColor: i <= step ? "#cf4a2b" : "#ffffff", color: i <= step ? "#ffffff" : "#a33a22", borderColor: i <= step ? "#cf4a2b" : "#f6c3b5" }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold"
          >
            <Icon className="h-3.5 w-3.5" /> {label}
          </motion.span>
          {i < items.length - 1 && <ArrowRight aria-hidden className="h-4 w-4 text-[#f0a993]" />}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

function FaqItem({ q, a, open, onToggle, id }: { q: string; a: string; open: boolean; onToggle: () => void; id: string }) {
  return (
    <div className={`rounded-[22px] border bg-white transition-colors duration-300 ${open ? "border-[#9cc4ee] shadow-[0_14px_36px_rgba(16,39,68,.08)]" : "border-[#e4eef8]"}`}>
      <h3>
        <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={id} className="flex w-full cursor-pointer items-center gap-4 rounded-[22px] border-0 bg-transparent px-6 py-5 text-left text-base font-bold tracking-[-0.02em] text-[#102744] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769d5]">
          {q}
          <span className={`ml-auto grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors duration-300 ${open ? "bg-[#1769d5] text-white" : "bg-[#eff7ff] text-[#1769d5]"}`}>
            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div id={id} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: tpEase }} className="overflow-hidden">
            <p className="px-6 pb-6 text-sm leading-6 text-[#557090]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-[#fbfdff] py-24 sm:py-32">
      <div className={`${wrap} grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20`}>
        <div>
          <Tag tone="amber">DOMANDE FREQUENTI</Tag>
          <H2>Il CRM deve seguire il tuo modo di lavorare.</H2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-sm text-base leading-7 text-[#557090]">Le domande che ci fanno più spesso showroom e negozi prima di partire.</p>
            <div className="mt-6"><TextLink href={routes.prezzi}>Vedi i prezzi</TextLink></div>
          </Reveal>
        </div>
        <Stagger className="space-y-3" gap={0.06}>
          {faqs.map(([q, a], i) => (
            <StaggerItem key={q}>
              <FaqItem q={q} a={a} id={`crm-faq-${i}`} open={open === i} onToggle={() => setOpen((v) => (v === i ? -1 : i))} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PAGINA                                                              */
/* ------------------------------------------------------------------ */

export function CrmProductPage() {
  useSeo({
    title: "CRM per negozi di arredamento e showroom",
    description: "Il CRM per negozi di arredamento, showroom e mobilifici: ingressi in showroom, contatti, appuntamenti, pipeline lead e campagne email su Smart List, collegati a preventivi e trattative.",
    path: routes.crm,
  });

  return (
    <MarketingShell active="crm" overlayHeader>
      <main className="overflow-x-clip bg-[#fbfdff] text-[#102744]" id="top">
        <Hero />
        <WhySection />

        {/* CONTATTI E AZIENDE */}
        <FeatureSplit
          id="contatti"
          bg="bg-[#fbfdff]"
          copy={
            <>
              <Tag>CONTATTI E AZIENDE</Tag>
              <H2>Clienti, lead e rete professionale nello stesso archivio.</H2>
              <Reveal delay={0.1}>
                <p className="mt-6 text-base leading-7 text-[#557090]">Clienti e lead stanno in un database condiviso: li cerchi per nome, email, telefono o città, li etichetti con i tag e li raccogli in Smart List.</p>
                <p className="mt-4 text-base leading-7 text-[#557090]">Accanto ai clienti ci sono le anagrafiche aziendali, con i loro referenti: fornitori, partner, trasportatori. Tutta la rete dello showroom resta ordinata e a portata di mano.</p>
              </Reveal>
              <FeaturePills items={contactFeatures} />
            </>
          }
          visual={
            <ScreenPanel>
              <AppWindow active="crm.contatti" title="Contatti Aziendali" className="h-[400px] sm:h-[460px]">
                <ContattiAziendaliScreen />
              </AppWindow>
            </ScreenPanel>
          }
        />

        {/* INGRESSI SHOWROOM + DASHBOARD */}
        <FeatureSplit
          id="ingressi"
          bg="bg-[#eaf4ff]"
          flip
          copy={
            <>
              <Tag tone="coral">INGRESSI SHOWROOM</Tag>
              <H2>Sai davvero chi entra nel tuo showroom?</H2>
              <Reveal delay={0.1}>
                <p className="mt-6 text-base leading-7 text-[#557090]">Registri ogni visita con showroom, ora, venditore, provenienza e motivo, anche quando il visitatore non lascia i propri dati. Se poi diventa un contatto, con un clic lo trasformi in lead.</p>
              </Reveal>
              <FeaturePills items={showroomFeatures} />
              <div className="mt-7"><TextLink href={blogRoutes.categories["vendite-crm"]}>Leggi le guide su vendite e CRM</TextLink></div>
            </>
          }
          visual={
            <ScreenPanel tone="coral">
              <AppWindow active="crm.ingressi" title="Ingressi" className="h-[400px] sm:h-[460px]">
                <IngressiScreen />
              </AppWindow>
            </ScreenPanel>
          }
          after={<AnalyticsTiles />}
        />

        {/* AGENDA E APPUNTAMENTI */}
        <FeatureSplit
          id="appuntamenti"
          bg="bg-[#fffaf7]"
          copy={
            <>
              <Tag tone="amber">AGENDA E APPUNTAMENTI</Tag>
              <H2>Appuntamenti e follow-up in un calendario condiviso.</H2>
              <Reveal delay={0.1}>
                <p className="mt-6 text-base leading-7 text-[#557090]">Fissi l’incontro in showroom o il sopralluogo, lo colleghi al cliente e il team vede gli impegni di tutti. La continuità con il cliente non dipende più dall’agenda personale del singolo venditore.</p>
              </Reveal>
            </>
          }
          visual={
            <ScreenPanel tone="amber">
              <AppWindow active="appuntamenti" title="Appuntamenti" className="h-[400px] sm:h-[460px]">
                <AppuntamentiScreen />
              </AppWindow>
            </ScreenPanel>
          }
        />

        <PipelineSection />

        {/* SEGMENTAZIONE E CAMPAGNE */}
        <FeatureSplit
          id="campagne"
          bg="bg-[#fbfdff]"
          flip
          copy={
            <>
              <Tag tone="coral">SEGMENTAZIONE E CAMPAGNE</Tag>
              <H2>Il tuo database non è solo un archivio.</H2>
              <Reveal delay={0.1}>
                <p className="mt-6 text-base leading-7 text-[#557090]">Con le Smart List raggruppi i contatti che ti interessano: i clienti di uno showroom, i lead arrivati da una certa fonte, chi ha un tag in comune. Poi crei una campagna email, scegli la Smart List e la invii a tutti i contatti della lista.</p>
              </Reveal>
              <SegmentFlow />
            </>
          }
          visual={
            <ScreenPanel tone="mint">
              <AppWindow active="crm.automation" title="Email Marketing" className="h-[400px] sm:h-[460px]">
                <EmailMarketingScreen />
              </AppWindow>
            </ScreenPanel>
          }
        />

        <FaqSection />
        <ProcessoStrip current="crm" />
        <NextStep />
      </main>
    </MarketingShell>
  );
}
