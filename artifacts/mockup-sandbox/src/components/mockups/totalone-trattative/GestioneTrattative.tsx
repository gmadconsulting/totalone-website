import { useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Banknote,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  FileText,
  Handshake,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { MarketingShell, openDemo } from "../totalone-site-architecture/_shared/MarketingShell";
import { Reveal, Stagger, StaggerItem, WordReveal, tpEase, useLoopSteps } from "@/components/totalone/motion-kit";
import { AppWindow, uiFont } from "@/components/totalone/app-ui";
import { ConversioneFlow, VenditeScreen } from "@/components/totalone/app-screens";
import { DettaglioTrattativaScreen, TrattativeKpiScreen, TrattativeSearchScreen } from "@/components/totalone/pages/trattative/TrattativeScreens";
import { routes } from "@/components/totalone/site/siteRoutes";
import { useSeo } from "@/components/totalone/site/useSeo";
import { ProcessoStrip } from "@/components/totalone/site/ProcessoStrip";

/* ------------------------------------------------------------------ */
/* Contenuti                                                           */
/* ------------------------------------------------------------------ */

type FlowItem = { label: string; body: string; icon: LucideIcon };

/** La vita di una trattativa, come nelle schermate: nasce dal preventivo convertito. */
const lifeFlow: FlowItem[] = [
  { label: "PREVENTIVO CONVERTITO", body: "Il cliente accetta la proposta e il preventivo viene segnato come Convertito.", icon: FileText },
  { label: "IN TRATTATIVA", body: "La trattativa nasce con preventivato e venduto. Si registrano gli acconti.", icon: Handshake },
  { label: "FINALIZZATO", body: "La vendita è definita: venduto, acconti e saldo sono chiari.", icon: CheckCircle2 },
];

const faqs = [
  ["Devo creare la trattativa a mano?", "No. Quando il preventivo viene convertito, Totalone crea da solo la trattativa con gli importi del preventivo e la schedina cliente con i prodotti. Non c'è niente da ricopiare."],
  ["Posso registrare più acconti?", "Sì. Ogni acconto ha importo, data e stato (Pagato o Da pagare). Il saldo si aggiorna in automatico sottraendo gli acconti dal venduto."],
  ["Cosa vuol dire Finalizzato?", "Una trattativa è In trattativa finché la vendita è ancora da definire. Quando venduto e condizioni sono confermati, passa a Finalizzato."],
  ["Vedo i numeri per venditore e per showroom?", "Sì. Preventivato, venduto e finalizzato si leggono per venditore e per showroom, con importi IVA inclusa o esclusa."],
] as const;

/* ------------------------------------------------------------------ */
/* Primitivi                                                           */
/* ------------------------------------------------------------------ */

const wrap = "mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10";
const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1769d5]";

function Button({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <motion.button
      type="button"
      onClick={openDemo}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-bold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 ${
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

function Tag({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "coral" | "amber" }) {
  const tones = {
    blue: "bg-[#dcecff] text-[#0b55c6]",
    coral: "bg-[#ffdcd2] text-[#a33a22]",
    amber: "bg-[#fff2dd] text-[#8a4f0f]",
  };
  return (
    <Reveal y={10}>
      <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${tones[tone]}`}>{children}</span>
    </Reveal>
  );
}

function InternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className={`group inline-flex items-center gap-2 text-sm font-bold text-[#0b55c6] hover:text-[#a33a22] ${focusRing}`}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

const H2 = "text-5xl font-bold leading-[.95] tracking-[-0.065em] sm:text-6xl";

/** Pannello colorato che incornicia i mockup (decorativo). */
function MockPanel({ children, tone = 0, className = "" }: { children: ReactNode; tone?: number; className?: string }) {
  const tones = [
    "bg-[radial-gradient(circle_at_20%_10%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#dcecff,#c9e1ff)]",
    "bg-[radial-gradient(circle_at_80%_10%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#ffe9e1,#ffd9cc)]",
    "bg-[radial-gradient(circle_at_20%_90%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#fff2dd,#ffe4b8)]",
    "bg-[radial-gradient(circle_at_80%_90%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#e3f6ec,#cdeedd)]",
  ];
  return <div className={`relative rounded-[36px] p-3 sm:p-5 ${tones[tone % tones.length]} ${className}`}>{children}</div>;
}

/* ------------------------------------------------------------------ */
/* Flusso animato: la fase attiva avanza a loop                          */
/* ------------------------------------------------------------------ */

function AnimatedFlow({ items, interval = 1600 }: { items: FlowItem[]; interval?: number }) {
  const [ref, step] = useLoopSteps(items.length + 1, interval);
  const active = Math.min(step, items.length - 1);
  const done = step === items.length;
  return (
    <div ref={ref} className="relative">
      <ol className="relative grid gap-3 md:grid-cols-3">
        {items.map((it, i) => {
          const on = i === active && !done;
          const past = i < active || done;
          const Icon = it.icon;
          return (
            <motion.li
              key={it.label}
              animate={{ y: on ? -4 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className={`relative rounded-[24px] border p-5 transition-colors duration-500 ${on ? "border-[#9cc7f2] bg-white shadow-[0_18px_40px_rgba(23,105,213,.14)]" : "border-[#e4eef8] bg-white/80"}`}
            >
              <div className="flex items-center gap-3">
                <span className={`grid h-10 w-10 place-items-center rounded-full transition-colors duration-500 ${on ? "bg-[#cf4a2b] text-white" : past ? "bg-[#1769d5] text-white" : "bg-[#eaf4ff] text-[#1769d5]"}`}>
                  {past ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </span>
                <span className="font-mono text-[11px] font-semibold text-[#557090]">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <strong className="mt-5 block text-xs tracking-[0.1em] text-[#102744]">{it.label}</strong>
              <span className="mt-2 block text-sm leading-6 text-[#557090]">{it.body}</span>
              <span aria-hidden className="absolute inset-x-5 bottom-0 h-[3px] overflow-hidden rounded-full bg-[#eaf4ff]">
                <motion.span
                  className="block h-full origin-left rounded-full bg-[linear-gradient(90deg,#1769d5,#f36b4d)]"
                  initial={false}
                  animate={{ scaleX: past || on ? 1 : 0 }}
                  transition={{ duration: on ? interval / 1000 : 0.4, ease: on ? "linear" : tpEase }}
                />
              </span>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero product                                                         */
/* ------------------------------------------------------------------ */

function HeroProduct() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.9, 1]);
  return (
    <div ref={ref} className="relative mx-auto mt-16 max-w-[1120px] [perspective:1600px] sm:mt-20">
      <motion.div style={{ rotateX, scale, transformOrigin: "center top" }} className="relative">
        <AppWindow active="totalone" title="Trattative" className="h-[430px] sm:h-[500px] lg:h-[540px]">
          <VenditeScreen />
        </AppWindow>
        <FloatingNote className="-left-6 top-28 hidden lg:flex" delay={1.2} float={10}>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#DBEAFE] text-[#2563EB]"><Handshake className="h-4 w-4" /></span>
          <span><b className="block text-[12px] text-[#102744]">Trattativa creata</b><span className="text-[11px] text-[#557090]">Casa Bianchi · da preventivo convertito</span></span>
        </FloatingNote>
        <FloatingNote className="-right-8 bottom-28 hidden lg:flex" delay={1.6} float={-12}>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#D1FAE5] text-[#059669]"><Banknote className="h-4 w-4" /></span>
          <span><b className="block text-[12px] text-[#102744]">Acconto registrato</b><span className="text-[11px] text-[#557090]">Casa Bianchi · € 4.200</span></span>
        </FloatingNote>
      </motion.div>
      <p className="mt-6 text-center text-xs font-semibold text-[#b9dcff]">Schermate dimostrative, dati di esempio.</p>
      <div className="pointer-events-none absolute inset-x-[10%] -bottom-10 h-24 rounded-[100%] bg-[#04214f]/40 blur-3xl" />
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

/* ------------------------------------------------------------------ */
/* Sezione testo + mockup                                               */
/* ------------------------------------------------------------------ */

function Feature({ id, tag, tagTone, title, children, mock, flip = false, bg = "bg-[#fbfdff]" }: { id?: string; tag: string; tagTone?: "blue" | "coral" | "amber"; title: string; children: ReactNode; mock: ReactNode; flip?: boolean; bg?: string }) {
  return (
    <section id={id} className={`${bg} scroll-mt-24 py-24 sm:py-32`}>
      <div className={wrap}>
        <div className={`grid items-center gap-12 lg:gap-20 ${flip ? "lg:grid-cols-[1.2fr_.8fr]" : "lg:grid-cols-[.8fr_1.2fr]"}`}>
          <div className={flip ? "lg:order-2" : ""}>
            <Tag tone={tagTone}>{tag}</Tag>
            <h2 className={`mt-6 max-w-xl text-[#102744] ${H2}`}>
              <WordReveal text={title} />
            </h2>
            <Reveal delay={0.1}>
              <div className="mt-7 max-w-lg text-base leading-7 text-[#557090]">{children}</div>
            </Reveal>
          </div>
          <Reveal y={40} delay={0.08} className={`min-w-0 ${flip ? "lg:order-1" : ""}`}>
            {mock}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Pills({ items }: { items: string[] }) {
  return (
    <Stagger className="mt-7 flex flex-wrap gap-2" gap={0.05}>
      {items.map((t) => (
        <StaggerItem key={t}>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#cfe1f4] bg-white px-3.5 py-2 text-xs font-semibold text-[#245b96]">
            <Check className="h-3.5 w-3.5 text-[#1769d5]" /> {t}
          </span>
        </StaggerItem>
      ))}
    </Stagger>
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
          <h2 className={`mt-6 max-w-md text-[#102744] ${H2}`}><WordReveal text="Come funziona una trattativa in Totalone." /></h2>
        </div>
        <Stagger className="space-y-3" gap={0.06}>
          {faqs.map(([q, a], i) => (
            <StaggerItem key={q}>
              <FaqItem q={q} a={a} id={`tratt-faq-${i}`} open={open === i} onToggle={() => setOpen((v) => (v === i ? -1 : i))} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** Link al modulo successivo nel flusso (Trattative → Commesse). */
function NextStep() {
  return (
    <section className="bg-[#f4f9ff] pb-20 sm:pb-24" aria-labelledby="next-step-title">
      <div className={wrap}>
        <a
          href={routes.commesse}
          className={`group flex flex-col gap-5 rounded-[28px] border border-[#cfe1f4] bg-white p-6 transition-shadow hover:shadow-[0_20px_50px_rgba(16,39,68,.10)] sm:flex-row sm:items-center sm:justify-between sm:p-8 ${focusRing}`}
        >
          <span className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[16px] bg-[#ffdcd2] text-[#a33a22]"><ClipboardList className="h-5 w-5" /></span>
            <span>
              <span className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b55c6]">Il passo successivo</span>
              <span id="next-step-title" className="mt-1 block text-2xl font-bold tracking-[-0.04em] text-[#102744]">Venduto: ora si consegna. La commessa si segue nella schedina cliente.</span>
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#0b55c6] group-hover:text-[#a33a22]">
            Scopri la Gestione commesse <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PAGINA                                                              */
/* ------------------------------------------------------------------ */

export function GestioneTrattative() {
  useSeo({
    title: "Gestione trattative per showroom di arredamento",
    description: "Con Totalone la trattativa nasce dal preventivo convertito: preventivato, venduto, acconti e saldo collegati a cliente, venditore e showroom, fino alla vendita finalizzata.",
    path: routes.trattative,
  });

  return (
    <MarketingShell active="trattative" overlayHeader>
      <main id="top" className="overflow-x-clip bg-[#fbfdff] text-[#102744]">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[linear-gradient(116deg,#082c68_0%,#0d56bf_54%,#1387ee_100%)] pb-24 pt-28 text-white sm:pb-32 sm:pt-36">
          <motion.div aria-hidden className="absolute -right-20 top-20 h-[420px] w-[420px] rounded-full bg-[#75d7ff]/30 blur-3xl" animate={{ x: [0, -60, 0], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div aria-hidden className="absolute -left-28 top-[420px] h-[420px] w-[420px] rounded-full bg-[#f36b4d]/20 blur-3xl" animate={{ x: [0, 50, 0], y: [0, -30, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
          <div className={`relative ${wrap}`}>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#cfe6ff]">
              <a href={routes.home} className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Home</a>
              <ChevronRight aria-hidden className="h-3 w-3 opacity-60" />
              <span aria-current="page" className="text-white">Gestione trattative</span>
            </nav>
            <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
              <div>
                <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: tpEase }} className="inline-flex items-center gap-2 rounded-full border border-[#8ecbff] bg-[#5abaff]/20 px-3.5 py-2 text-xs font-bold tracking-[0.08em] text-[#eff8ff]">
                  <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9fe0ff] opacity-75 motion-reduce:animate-none" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#9fe0ff]" /></span>
                  GESTIONE TRATTATIVE
                </motion.span>
                <h1 className="mt-7 max-w-3xl text-[clamp(2.9rem,6.6vw,6.2rem)] font-bold leading-[.93] tracking-[-0.075em]">
                  <WordReveal text="Dal preventivo accettato" />
                  <br />
                  <WordReveal text="all’ultimo acconto." className="text-[#9fe0ff]" delay={0.25} />
                </h1>
              </div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: tpEase, delay: 0.5 }}>
                <p className="max-w-xl text-lg leading-8 text-[#e5f3ff]">Quando un preventivo viene accettato, la trattativa nasce da sola. Preventivato, venduto, acconti e saldo restano collegati al cliente e al venditore, finché la vendita è finalizzata.</p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button light>Prenota una demo</Button>
                  <a href="#come-nasce" className="group inline-flex items-center gap-2 px-2 text-sm font-bold text-white hover:text-[#d0e8ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                    Scopri come funziona <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                  </a>
                </div>
                <p className="mt-5 text-xs font-bold text-[#c9e2fb]">Per showroom, negozi di arredamento e realtà con più sedi.</p>
              </motion.div>
            </div>
            <HeroProduct />
          </div>
        </section>

        {/* COME NASCE UNA TRATTATIVA */}
        <section id="come-nasce" className="scroll-mt-24 bg-[#fffaf7] py-24 sm:py-32">
          <div className={wrap}>
            <div className="grid gap-10 lg:grid-cols-[1fr_.85fr] lg:items-end lg:gap-20">
              <div>
                <Tag tone="coral">COME NASCE UNA TRATTATIVA</Tag>
                <h2 className={`mt-6 max-w-2xl ${H2}`}><WordReveal text="La trattativa non si crea a mano. Nasce dal preventivo." /></h2>
              </div>
              <Reveal delay={0.1}>
                <p className="max-w-xl text-lg leading-8 text-[#254b72]">Segni il preventivo come <em>Convertito</em>: Totalone crea la trattativa con gli importi del preventivo e la schedina cliente con tutti i prodotti.</p>
                <p className="mt-4 max-w-xl text-base leading-7 text-[#557090]">Nessun dato da ricopiare. La schedina è il fascicolo della commessa: da lì partono ordini, consegna e montaggio.</p>
              </Reveal>
            </div>
            <Reveal y={40} className="mx-auto mt-14 max-w-[1040px]">
              <MockPanel tone={2}>
                <ConversioneFlow />
              </MockPanel>
            </Reveal>
            <Reveal y={30} className="mt-12">
              <AnimatedFlow items={lifeFlow} />
            </Reveal>
            <div className="mt-10 flex flex-col gap-3 border-t border-[#f3e2da] pt-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-bold text-[#245b96]">Prima del preventivo il cliente è un lead nella pipeline del CRM.</p>
              <InternalLink href={routes.crm}>Scopri il CRM</InternalLink>
            </div>
          </div>
        </section>

        {/* PANORAMICA */}
        <Feature
          id="panoramica"
          tag="LISTA TRATTATIVE"
          title="Ogni vendita in corso, cliente per cliente."
          mock={
            <MockPanel tone={0}>
              <AppWindow active="totalone" title="Trattative" className="h-[400px] sm:h-[460px]">
                <TrattativeSearchScreen />
              </AppWindow>
            </MockPanel>
          }
        >
          <p>Ogni riga è una trattativa: cliente, venditore, stato, preventivato, venduto, acconti e saldo da incassare. Cerchi per cliente o brand e passi da IVA inclusa a IVA esclusa con un clic.</p>
          <p className="mt-5">Gli stati sono due: <b className="text-[#102744]">In trattativa</b>, finché la vendita è da definire, e <b className="text-[#102744]">Finalizzato</b>, quando è confermata.</p>
        </Feature>

        {/* DETTAGLIO */}
        <Feature
          id="dettaglio"
          bg="bg-[#eaf4ff]"
          tag="DETTAGLIO TRATTATIVA"
          title="Preventivato, venduto, incassato. In una scheda."
          flip
          mock={
            <MockPanel tone={1}>
              <AppWindow active="totalone" title="Dettaglio trattativa" className="h-[400px] sm:h-[460px]">
                <DettaglioTrattativaScreen />
              </AppWindow>
            </MockPanel>
          }
        >
          <p>Apri la trattativa e trovi tutto: il cliente, la data, quanto era stato preventivato e quanto è stato venduto, con l’IVA calcolata in automatico.</p>
          <p className="mt-5">Registri gli acconti uno per uno, con importo, data e stato Pagato o Da pagare. Il saldo si aggiorna da solo.</p>
          <Pills items={["Cliente e data", "Preventivato e venduto", "IVA calcolata in automatico", "Acconti, saldo e stato"]} />
        </Feature>

        {/* LETTURA PER VENDITORE E SHOWROOM */}
        <section className="bg-[#fbfdff] py-24 sm:py-32">
          <div className={wrap}>
            <div className="grid gap-10 lg:grid-cols-[1fr_.85fr] lg:items-end lg:gap-20">
              <div>
                <Tag>VENDITORI E SHOWROOM</Tag>
                <h2 className={`mt-6 max-w-2xl ${H2}`}><WordReveal text="Il venditore segue le sue trattative. La direzione vede tutto lo showroom." /></h2>
              </div>
              <Reveal delay={0.1}>
                <p className="max-w-lg text-base leading-7 text-[#557090]">Gli stessi numeri si leggono per venditore e per sede: preventivato, venduto e finalizzato del mese, con gli incassi. Chi vende sa dove intervenire, chi dirige vede l’andamento senza chiedere aggiornamenti.</p>
              </Reveal>
            </div>
            <Stagger className="mt-14 grid gap-6 lg:grid-cols-2" gap={0.12}>
              <StaggerItem className="h-full">
                <div className="flex h-full flex-col rounded-[36px] border border-[#e4eef8] bg-[#f4f9ff] p-6 sm:p-10">
                  <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-[#dcecff] px-3 py-1.5 text-xs font-bold text-[#0b55c6]"><UsersRound className="h-3.5 w-3.5" /> PER VENDITORE</span>
                  <p className="mt-5 max-w-md text-base leading-7 text-[#557090]">Giulia, Luca, Sara, Davide: ognuno con le sue trattative e i suoi risultati.</p>
                  <div className="mt-auto pt-8">
                    <AppWindow active="totalone" title="Trattative" className="h-[340px] sm:h-[380px]">
                      <TrattativeKpiScreen mode="venditori" />
                    </AppWindow>
                  </div>
                </div>
              </StaggerItem>
              <StaggerItem className="h-full">
                <div className="flex h-full flex-col rounded-[36px] border border-[#e4eef8] bg-[#eaf4ff] p-6 sm:p-10">
                  <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#0b55c6]"><Building2 className="h-3.5 w-3.5" /> PER SHOWROOM</span>
                  <p className="mt-5 max-w-md text-base leading-7 text-[#557090]">Milano Centro, Lugano, Como, Bergamo: ogni sede letta con gli stessi criteri.</p>
                  <div className="mt-auto pt-8">
                    <AppWindow active="totalone" title="Trattative" className="h-[340px] sm:h-[380px]">
                      <TrattativeKpiScreen mode="showroom" incassi={false} />
                    </AppWindow>
                  </div>
                </div>
              </StaggerItem>
            </Stagger>
          </div>
        </section>

        <FaqSection />
        <ProcessoStrip current="trattative" />
        <NextStep />
      </main>
    </MarketingShell>
  );
}
