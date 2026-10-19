import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Archive, ArrowDown, ArrowRight, CalendarClock, Euro, Hammer, Paperclip, Search, Scale, Wrench, type LucideIcon } from "lucide-react";
import { MarketingShell, openDemo } from "../totalone-site-architecture/_shared/MarketingShell";
import { Reveal, SpotlightCard, Stagger, StaggerItem, WordReveal, tpEase, useLoopSteps } from "@/components/totalone/motion-kit";
import { AppWindow, uiFont } from "@/components/totalone/app-ui";
import {
  AssistenzeClientiScreen,
  MiniArrivo,
  MiniCarico,
  MiniDocumenti,
  MiniTabCosti,
  SchedinaAssistenzaScreen,
  StatoChip,
} from "@/components/totalone/pages/assistenza/AssistenzaScreens";
import { routes } from "@/components/totalone/site/siteRoutes";
import { useSeo } from "@/components/totalone/site/useSeo";
import { ProcessoStrip } from "@/components/totalone/site/ProcessoStrip";

const wrap = "mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10";
const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1769d5]";

/* ------------------------------------------------------------------ */
/* Primitivi di pagina                                                 */
/* ------------------------------------------------------------------ */

function DemoButton({ children = "Prenota una demo", light = false }: { children?: ReactNode; light?: boolean }) {
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
      <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold uppercase ${tones[tone]}`}>{children}</span>
    </Reveal>
  );
}

function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`mt-6 text-[2.4rem] font-bold leading-[.95] tracking-[-0.065em] text-[#102744] sm:text-6xl lg:text-[4rem] ${className}`}>{children}</h2>;
}

function Lead({ children, className = "", delay = 0.1 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className={`space-y-4 text-base leading-7 text-[#557090] ${className}`}>{children}</div>
    </Reveal>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <Stagger className="mt-8 flex flex-wrap gap-2" gap={0.04}>
      {items.map((item) => (
        <StaggerItem key={item}>
          <span className="inline-block rounded-full border border-[#bcd7f1] bg-white px-3.5 py-2 text-xs font-semibold text-[#245b96]">{item}</span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Pannello colorato che ospita un mockup (decorativo per gli screen reader). */
function WindowPanel({ children, tone = "blue", className = "" }: { children: ReactNode; tone?: "blue" | "warm" | "mint"; className?: string }) {
  const tones = {
    blue: "bg-[radial-gradient(circle_at_20%_10%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#dcecff,#c9e1ff)]",
    warm: "bg-[radial-gradient(circle_at_80%_10%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#ffe9e1,#ffd9cc)]",
    mint: "bg-[radial-gradient(circle_at_20%_90%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#e3f6ec,#cdeedd)]",
  };
  return (
    <Reveal y={40} delay={0.08} className={className}>
      <div aria-hidden="true" className={`relative rounded-[36px] p-3 sm:p-5 ${tones[tone]}`}>{children}</div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* 1. HERO                                                             */
/* ------------------------------------------------------------------ */

function HeroProduct() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.9, 1]);

  return (
    <div ref={ref} className="relative mx-auto mt-16 max-w-[1120px] [perspective:1600px] sm:mt-20">
      <motion.div aria-hidden="true" style={{ rotateX, scale, transformOrigin: "center top" }} className="relative">
        <AppWindow active="assistenze" title="Assistenze" className="h-[440px] sm:h-[500px] lg:h-[540px]">
          <AssistenzeClientiScreen mode="overview" />
        </AppWindow>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{ opacity: { delay: 1.2, duration: 0.6 }, scale: { delay: 1.2, duration: 0.6, ease: tpEase }, y: { delay: 1.2, duration: 6, repeat: Infinity, ease: "easeInOut" } }}
          className="absolute -right-8 bottom-24 z-20 hidden items-center gap-3 rounded-[18px] bg-white/95 py-3 pl-3 pr-5 shadow-[0_18px_44px_rgba(4,30,80,.28)] ring-1 ring-white backdrop-blur lg:flex"
          style={uiFont}
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#FEF2F2] text-[#DC2626]"><Wrench className="h-4 w-4" /></span>
          <span>
            <b className="block text-[12px] text-[#102744]">Casa Bianchi · 0/3</b>
            <span className="text-[11px] text-[#557090]">3 prodotti · Da gestire</span>
          </span>
        </motion.div>
      </motion.div>
      <div className="pointer-events-none absolute inset-x-[10%] -bottom-10 h-24 rounded-[100%] bg-[#04214f]/40 blur-3xl" />
      <p className="relative mt-8 text-center text-xs font-semibold text-[#c9e2fb]">Schermate dimostrative, dati di esempio.</p>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(116deg,#082c68_0%,#0d56bf_54%,#1387ee_100%)] pb-24 pt-28 text-white sm:pb-32 sm:pt-36">
      <motion.div aria-hidden className="absolute -right-20 top-20 h-[420px] w-[420px] rounded-full bg-[#75d7ff]/30 blur-3xl" animate={{ x: [0, -60, 0], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div aria-hidden className="absolute -left-28 top-[420px] h-[420px] w-[420px] rounded-full bg-[#f36b4d]/20 blur-3xl" animate={{ x: [0, 50, 0], y: [0, -30, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
      <div className={`relative ${wrap}`}>
        <nav aria-label="Breadcrumb" className="flex gap-2 text-[11px] font-bold text-[#c9e2fb]">
          <a href={routes.home} className={`hover:text-white ${focusRing}`}>Home</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Assistenza e post-vendita</span>
        </nav>
        <div className="mt-12 grid items-end gap-10 lg:mt-16 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
          <div>
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: tpEase }} className="inline-flex items-center gap-2 rounded-full border border-[#8ecbff] bg-[#5abaff]/20 px-3.5 py-2 text-xs font-bold tracking-[0.08em] text-[#eff8ff]">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9fe0ff] opacity-75 motion-reduce:animate-none" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#9fe0ff]" /></span>
              ASSISTENZA E POST-VENDITA
            </motion.span>
            <h1 className="mt-7 max-w-3xl text-[clamp(2.6rem,5.8vw,5.4rem)] font-bold leading-[.93] tracking-[-0.075em]">
              <WordReveal text="Il cliente resta seguito," />
              <br />
              <WordReveal text="anche dopo il montaggio." className="text-[#9fe0ff]" delay={0.3} />
            </h1>
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: tpEase, delay: 0.5 }}>
            <p className="max-w-xl text-lg leading-8 text-[#e5f3ff]">Ogni assistenza parte dal cliente e scende al singolo prodotto: stato, arrivo previsto del ricambio, a carico di chi è l’intervento, documenti e costi.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <DemoButton light />
              <a href="#assistenze" className="group inline-flex items-center gap-2 px-2 text-sm font-bold text-white hover:text-[#d0e8ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Scopri come funziona <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        </div>
        <HeroProduct />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2. TUTTE LE ASSISTENZE + STATI + RICERCA                            */
/* ------------------------------------------------------------------ */

const stati = [
  { stato: "gestire" as const, dot: "#EF4444", bg: "bg-[#fff5f5]", ring: "ring-[#fecaca]", label: "Da gestire", text: "Segnalazioni nuove e prodotti che aspettano una prima azione." },
  { stato: "gestione" as const, dot: "#F97316", bg: "bg-[#fff8f0]", ring: "ring-[#fed7aa]", label: "In gestione", text: "Intervento avviato: il caso sta avanzando." },
  { stato: "risolta" as const, dot: "#10B981", bg: "bg-[#f0fbf6]", ring: "ring-[#a7f3d0]", label: "Risolta", text: "Il problema è chiuso; l’assistenza si può segnare conclusa." },
];

function StatiCards() {
  const [ref, step] = useLoopSteps(3, 1800);
  return (
    <div ref={ref} className="grid gap-3 sm:grid-cols-3">
      {stati.map((c, i) => {
        const on = step === i;
        return (
          <motion.div
            key={c.label}
            animate={{ y: on ? -4 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className={`h-full rounded-[24px] p-5 ring-1 transition-shadow duration-500 ${c.bg} ${c.ring} ${on ? "shadow-[0_18px_44px_rgba(16,39,68,.10)]" : "shadow-none"}`}
          >
            <div aria-hidden="true" style={uiFont}><span className="inline-block origin-left scale-125"><StatoChip stato={c.stato} /></span></div>
            <p className="mt-5 text-lg font-bold tracking-[-0.03em] text-[#102744]">{c.label}</p>
            <p className="mt-1.5 text-sm leading-6 text-[#557090]">{c.text}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

function TutteLeAssistenze() {
  return (
    <section className="scroll-mt-24 bg-[#fffaf7] py-24 sm:py-32" id="assistenze">
      <div className={wrap}>
        <div className="grid gap-10 lg:grid-cols-[1fr_.85fr] lg:items-end lg:gap-20">
          <div>
            <Tag tone="coral">Tutte le assistenze</Tag>
            <H2 className="max-w-2xl"><WordReveal text="Sai subito cosa è da gestire, e per chi." /></H2>
          </div>
          <Lead>
            <p>La pagina Assistenze elenca i clienti con prodotti in assistenza. In alto i contatori per stato; per ogni cliente, il venditore, quante assistenze e quanti prodotti, e una barra che dice quanti sono già risolti.</p>
            <p>Tre stati, gli stessi sulla lista, sulla singola assistenza e su ogni prodotto.</p>
          </Lead>
        </div>
        <div className="mt-14">
          <StatiCards />
        </div>
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.2fr_.8fr] lg:gap-16">
          <WindowPanel tone="mint">
            <AppWindow active="assistenze" title="Assistenze" className="h-[400px] sm:h-[440px]">
              <AssistenzeClientiScreen mode="search" />
            </AppWindow>
          </WindowPanel>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#a33a22]">Ricerca e filtri</p>
            <h3 className="mt-3 text-3xl font-bold leading-[1.02] tracking-[-0.05em] text-[#102744] sm:text-4xl">Da decine di clienti al caso giusto.</h3>
            <p className="mt-4 text-base leading-7 text-[#557090]">Scrivi “Linea” e restano i clienti con prodotti di quel brand in assistenza. Si cerca per cliente, prodotto, brand o venditore, con i filtri avanzati per restringere ancora.</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {["Cliente", "Prodotto", "Brand", "Venditore", "Filtri avanzati"].map((s) => (
                <li key={s} className="inline-flex items-center gap-1.5 rounded-full border border-[#bcd7f1] bg-white px-3.5 py-2 text-xs font-bold text-[#245b96]">
                  <Search className="h-3 w-3 text-[#a33a22]" aria-hidden="true" />{s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3. LA SINGOLA ASSISTENZA, PRODOTTO PER PRODOTTO                      */
/* ------------------------------------------------------------------ */

function PerProdotto() {
  return (
    <section className="overflow-hidden bg-[#f4f9ff] py-24 sm:py-32">
      <div className={wrap}>
        <div className="grid gap-10 lg:grid-cols-[1fr_.85fr] lg:items-end lg:gap-20">
          <div>
            <Tag tone="amber">Non un ticket generico</Tag>
            <H2 className="max-w-2xl"><WordReveal text="Un’assistenza, tre prodotti, tre storie diverse." /></H2>
          </div>
          <Lead>
            <p>Casa Bianchi segnala un’anta pensile rigata, un ripiano da sostituire e il top scheggiato. Sono due brand diversi e tempi diversi: nella schedina dell’assistenza ogni prodotto ha la sua riga.</p>
            <p className="font-semibold text-[#245b96]">In alto, lo stato dell’assistenza e quanti prodotti sono già risolti: 0/3, poi 1/3, fino a 3/3.</p>
          </Lead>
        </div>
        <Chips items={["Prodotto", "Brand / Colore", "Arrivo previsto", "Data", "Stato", "A carico", "Azioni"]} />
        <WindowPanel tone="warm" className="mt-12">
          <AppWindow active="assistenze" title="Schedina assistenza" className="h-[400px] sm:h-[440px]">
            <SchedinaAssistenzaScreen />
          </AppWindow>
        </WindowPanel>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4. DENTRO LA SCHEDINA — a carico, arrivi, documenti, costi           */
/* ------------------------------------------------------------------ */

function BentoCard({ eyebrow, title, children, icon: Icon, className = "", body }: { eyebrow: string; title: string; body: ReactNode; icon: LucideIcon; children: ReactNode; className?: string }) {
  return (
    <StaggerItem className={`min-w-0 ${className}`}>
      <SpotlightCard className="flex h-full flex-col rounded-[32px] border border-[#e4eef8] bg-white p-6 shadow-[0_1px_4px_rgba(2,8,23,.04)] transition-shadow hover:shadow-[0_24px_60px_rgba(16,39,68,.10)] sm:p-8">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#dcecff] text-[#1769d5]" aria-hidden="true"><Icon className="h-[18px] w-[18px]" strokeWidth={1.8} /></span>
          <span className="text-[10px] font-bold tracking-[.12em] text-[#0b55c6]">{eyebrow}</span>
        </div>
        <h3 className="mt-6 text-2xl font-bold leading-[1.05] tracking-[-0.045em] text-[#102744] sm:text-[1.9rem]">{title}</h3>
        <div className="mt-3 space-y-3 text-sm leading-6 text-[#557090]">{body}</div>
        <div aria-hidden="true" className="mt-8 flex-1 rounded-[22px] bg-[#f4f9ff] p-4 sm:p-5">{children}</div>
      </SpotlightCard>
    </StaggerItem>
  );
}

function DettaglioBento() {
  return (
    <section className="bg-[#fbfdff] py-24 sm:py-32">
      <div className={wrap}>
        <div className="max-w-3xl">
          <Tag>Dentro la schedina</Tag>
          <H2><WordReveal text="Chi paga, quando arriva il ricambio, dove sono i documenti." /></H2>
        </div>
        <Stagger className="mt-14 grid gap-4 lg:grid-cols-2" gap={0.1}>
          <BentoCard
            eyebrow="A CARICO DI"
            icon={Scale}
            title="Per ogni prodotto, sai a carico di chi è l’intervento."
            body={<p>Nella colonna “A carico” indichi chi si fa carico dell’intervento su quel prodotto, per esempio il brand. Così, quando si parla di costi con fornitore o cliente, l’informazione è già sulla riga giusta.</p>}
          >
            <MiniCarico />
          </BentoCard>
          <BentoCard
            eyebrow="ARRIVO PREVISTO"
            icon={CalendarClock}
            title="Sai cosa stai aspettando."
            body={<p>Se l’assistenza dipende da un ricambio, la data prevista si scrive sulla riga del prodotto. La pagina Assistenze ha anche la scheda Arrivi previsti.</p>}
          >
            <MiniArrivo />
          </BentoCard>
          <BentoCard
            eyebrow="DOCUMENTI"
            icon={Paperclip}
            title="Foto e documenti restano sull’assistenza."
            body={<p>Il pulsante Documenti raccoglie i file dell’assistenza; ogni riga prodotto ha anche il suo allegato.</p>}
          >
            <MiniDocumenti />
          </BentoCard>
          <BentoCard
            eyebrow="COSTI"
            icon={Euro}
            title="Anche il post-vendita ha un costo."
            body={<p>Accanto alla scheda Prodotti, la scheda Costi della stessa assistenza tiene l’aspetto economico dell’intervento.</p>}
          >
            <div className="flex h-full items-center justify-center py-6">
              <MiniTabCosti />
            </div>
          </BentoCard>
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5. DA DOVE NASCE, DOVE FINISCE                                       */
/* ------------------------------------------------------------------ */

function OrigineEStorico() {
  return (
    <section className="bg-[#eaf4ff] py-24 sm:py-32">
      <div className={`${wrap} grid gap-4 lg:grid-cols-3`}>
        <Reveal>
          <div className="flex h-full flex-col rounded-[32px] bg-white p-7 ring-1 ring-[#d6e6f6] sm:p-9">
            <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#dcecff] text-[#1769d5]" aria-hidden="true"><Hammer className="h-5 w-5" /></span>
            <h2 className="mt-6 text-2xl font-bold leading-[1.05] tracking-[-0.045em] text-[#102744] sm:text-3xl">Nasce dopo il montaggio.</h2>
            <p className="mt-3 text-sm leading-6 text-[#557090]">Il rapportino di fine lavoro di Casa Bianchi resta nello storico dei Montaggi: se serve, si ritrova chi ha montato e quando.</p>
            <a href={routes.montaggi} className={`group mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-bold text-[#0b55c6] hover:text-[#a33a22] ${focusRing}`}>
              Montaggi e rapportini <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="flex h-full flex-col rounded-[32px] bg-white p-7 ring-1 ring-[#d6e6f6] sm:p-9">
            <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#dcecff] text-[#1769d5]" aria-hidden="true"><Archive className="h-5 w-5" /></span>
            <h2 className="mt-6 text-2xl font-bold leading-[1.05] tracking-[-0.045em] text-[#102744] sm:text-3xl">Finisce in archivio, non nel nulla.</h2>
            <p className="mt-3 text-sm leading-6 text-[#557090]">Con “Segna conclusa” chiudi l’assistenza; l’Archivio della pagina Assistenze tiene i casi passati consultabili.</p>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="relative flex h-full flex-col overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#0b3f8f,#1769d5)] p-7 text-white shadow-[0_24px_60px_rgba(11,85,198,.25)] sm:p-9">
            <p className="text-[11px] font-bold tracking-[0.12em] text-[#9fe0ff]">PASSO SUCCESSIVO</p>
            <h2 className="mt-4 text-2xl font-bold leading-[1.05] tracking-[-0.045em] sm:text-3xl">Dalle singole assistenze al quadro d’insieme.</h2>
            <p className="mt-3 text-sm leading-6 text-[#d7ebff]">I numeri d’insieme dello showroom, per periodo e per sede, si leggono in Controllo e performance.</p>
            <a href={routes.controllo} className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-bold text-white hover:text-[#9fe0ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              Vai a Controllo e performance <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6. DOMANDE FREQUENTI                                                 */
/* ------------------------------------------------------------------ */

const faq: [string, string][] = [
  ["Un’assistenza può riguardare più prodotti?", "Sì. Ogni prodotto è una riga della schedina, con brand, arrivo previsto, stato e a carico di chi è l’intervento."],
  ["Quali stati ha un’assistenza?", "Da gestire, In gestione e Risolta. Gli stessi valgono per il singolo prodotto e per l’assistenza nel suo insieme."],
  ["Come ritrovo un’assistenza chiusa?", "Le assistenze segnate come concluse restano consultabili in Archivio."],
  ["Posso cercare per brand?", "Sì: la ricerca lavora su cliente, prodotto, brand e venditore, con filtri avanzati."],
];

function Faq() {
  return (
    <section className="bg-[#fbfdff] py-24 sm:py-32">
      <div className="mx-auto max-w-[900px] px-5 sm:px-8 lg:px-10">
        <Tag>Domande frequenti</Tag>
        <H2><WordReveal text="Assistenza post-vendita nell’arredamento: le domande più comuni." /></H2>
        <div className="mt-10 divide-y divide-[#e4eef8] rounded-[28px] bg-white ring-1 ring-[#e4eef8]">
          {faq.map(([q, a]) => (
            <details key={q} className="group px-6 py-5 sm:px-8">
              <summary className={`flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-[#102744] ${focusRing}`}>
                {q}
                <ArrowDown className="h-4 w-4 shrink-0 text-[#1769d5] transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="mt-3 text-sm leading-6 text-[#557090]">{a}</p>
            </details>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <DemoButton>Vedi un’assistenza in demo</DemoButton>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PAGINA                                                              */
/* ------------------------------------------------------------------ */

export function AssistenzaPostVenditaProductPage() {
  useSeo({
    title: "Assistenza post-vendita per negozi di arredamento",
    description: "Gestisci le assistenze post-vendita per cliente e per prodotto: stati Da gestire, In gestione, Risolta, arrivo previsto dei ricambi, a carico di chi, documenti e costi.",
    path: routes.assistenza,
  });

  return (
    <MarketingShell active="assistenza" overlayHeader>
      <main id="top" className="overflow-x-clip bg-[#fbfdff] text-[#102744]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <Hero />
        <TutteLeAssistenze />
        <PerProdotto />
        <DettaglioBento />
        <OrigineEStorico />
        <Faq />
        <ProcessoStrip current="assistenza" />
      </main>
    </MarketingShell>
  );
}

export default AssistenzaPostVenditaProductPage;
