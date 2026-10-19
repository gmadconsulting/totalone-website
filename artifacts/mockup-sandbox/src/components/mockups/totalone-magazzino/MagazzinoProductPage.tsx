import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Archive, Boxes, CalendarDays, FileText, MapPin, PackageCheck, Repeat, Search } from "lucide-react";
import { MarketingShell, openDemo } from "../totalone-site-architecture/_shared/MarketingShell";
import { Reveal, Stagger, StaggerItem, WordReveal, tpEase } from "@/components/totalone/motion-kit";
import { AppWindow, uiFont } from "@/components/totalone/app-ui";
import { ArriviScreen } from "@/components/totalone/app-screens";
import { ColliScreen, DocumentiScreen, MagazzinoTabsScreen, RicercaScreen, SedeScreen } from "@/components/totalone/pages/magazzino/MagazzinoScreens";
import { routes } from "@/components/totalone/site/siteRoutes";
import { useSeo } from "@/components/totalone/site/useSeo";
import { ProcessoStrip } from "@/components/totalone/site/ProcessoStrip";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1769d5]";
const h2Class = "text-4xl font-bold leading-[.95] tracking-[-0.065em] text-[#102744] sm:text-6xl";

/* ------------------------------------------------------------------ */
/* Primitive di pagina                                                  */
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
      <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold uppercase ${tones[tone]}`}>{children}</span>
    </Reveal>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className={`group inline-flex items-center gap-1.5 text-sm font-bold text-[#0b55c6] hover:text-[#a33a22] ${focusRing}`}>
      {children} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

const panelTones = {
  blue: "bg-[radial-gradient(circle_at_20%_10%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#dcecff,#c9e1ff)]",
  coral: "bg-[radial-gradient(circle_at_80%_10%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#ffe9e1,#ffd9cc)]",
  amber: "bg-[radial-gradient(circle_at_20%_90%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#fff2dd,#ffe4b8)]",
  mint: "bg-[radial-gradient(circle_at_80%_90%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#e3f6ec,#cdeedd)]",
} as const;

/** Contenitore dei mockup: decorativo per gli screen reader (il testo accanto spiega la funzione). */
function Panel({ tone, children, className = "" }: { tone: keyof typeof panelTones; children: ReactNode; className?: string }) {
  return (
    <div aria-hidden="true" className={`relative rounded-[36px] p-3 sm:p-5 ${panelTones[tone]} ${className}`}>
      {children}
    </div>
  );
}

function BentoCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <StaggerItem className={className}>
      <div className="flex h-full flex-col overflow-hidden rounded-[32px] bg-white p-6 shadow-[0_24px_60px_rgba(16,39,68,.06)] ring-1 ring-[#e4eef8] sm:p-8">{children}</div>
    </StaggerItem>
  );
}

function CardTitle({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#a33a22]">{eyebrow}</p>
      <h3 className="mt-3 text-2xl font-bold leading-[1.02] tracking-[-0.055em] text-[#102744] sm:text-[2rem]">{title}</h3>
      {children && <div className="mt-3 space-y-3 text-sm leading-6 text-[#557090]">{children}</div>}
    </div>
  );
}

/** Frammento d'interfaccia ingrandito (scale) dentro una card della bento. */
function MiniWindow({ children, className = "h-[200px]", zoom = 1.3 }: { children: ReactNode; className?: string; zoom?: number }) {
  return (
    <div aria-hidden="true" className={`relative mt-auto overflow-hidden rounded-[20px] bg-[#F7F8FA] ring-1 ring-[#EEF0F3] ${className}`} style={uiFont}>
      <div className="@container absolute left-0 top-0 p-3" style={{ width: `${100 / zoom}%`, height: `${100 / zoom}%`, transform: `scale(${zoom})`, transformOrigin: "top left" }}>
        {children}
      </div>
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
/* 1. HERO — vista Magazzino logistico                                  */
/* ------------------------------------------------------------------ */

function HeroProduct() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.9, 1]);

  return (
    <div ref={ref} className="relative mx-auto mt-14 max-w-[1080px] [perspective:1600px] sm:mt-20">
      <motion.div aria-hidden="true" style={{ rotateX, scale, transformOrigin: "center top" }} className="relative">
        <AppWindow active="magazzino.magazzino" title="Magazzino" className="h-[400px] sm:h-[480px]">
          <RicercaScreen />
        </AppWindow>
        <FloatingNote className="-left-8 top-28 hidden lg:flex" delay={1.1} float={10}>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#D1FAE5] text-[#059669]"><PackageCheck className="h-4 w-4" /></span>
          <span><b className="block text-[12px] text-[#102744]">Arrivato</b><span className="text-[11px] text-[#557090]">Cucina · 14 colli</span></span>
        </FloatingNote>
        <FloatingNote className="-right-8 bottom-24 hidden lg:flex" delay={1.5} float={-12}>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#dcecff] text-[#1769d5]"><MapPin className="h-4 w-4" /></span>
          <span><b className="block text-[12px] text-[#102744]">Magazzino Italia</b><span className="text-[11px] text-[#557090]">Casa Bianchi · Corsia B</span></span>
        </FloatingNote>
      </motion.div>
      <div className="pointer-events-none absolute inset-x-[10%] -bottom-10 h-24 rounded-[100%] bg-[#04214f]/40 blur-3xl" />
      <p className="relative mt-8 text-center text-xs font-semibold text-[#cfe6ff]">Schermate dimostrative, dati di esempio.</p>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(116deg,#082c68,#0d56bf_54%,#1387ee)] pb-28 pt-28 text-white sm:pb-36 sm:pt-36">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#9fe0ff]/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[#1387ee]/40 blur-3xl" />
      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#cfe6ff]">
          <a href={routes.home} className={`hover:text-white ${focusRing}`}>Home</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-white">Magazzino e logistica</span>
        </nav>
        <div className="mx-auto mt-10 max-w-4xl text-center">
          <Reveal y={10}><span className="inline-flex rounded-full bg-white/12 px-3 py-1.5 text-xs font-bold text-[#9fe0ff] ring-1 ring-white/20">MAGAZZINO E LOGISTICA</span></Reveal>
          <h1 className="mt-6 text-5xl font-bold leading-[.95] tracking-[-0.065em] sm:text-7xl lg:text-[5.4rem]">
            <WordReveal text="Ogni arrivo, ogni collo." />
            <br />
            <WordReveal text="Al suo posto." className="text-[#9fe0ff]" delay={0.2} />
          </h1>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#d7ebff] sm:text-lg sm:leading-8">
              Arrivi previsti, colli, ubicazione e documenti di magazzino (DDT e distinte) per showroom e negozi di arredamento. Ogni prodotto resta legato al cliente e alla sua Schedina.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <DemoButton light />
              <a href="#logistica" className="inline-flex items-center gap-2 rounded-full border border-white/35 px-6 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Scopri come funziona <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
        <HeroProduct />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2. INTRO — perché il magazzino dell'arredamento è diverso            */
/* ------------------------------------------------------------------ */

const columns = ["Cliente", "Sede / ubicazione", "Brand", "Prodotto", "Quantità", "Stato", "Colli", "Prezzo"];

function LogisticaIntro() {
  return (
    <section id="logistica" className="scroll-mt-24 bg-[#fffaf7] py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-20">
          <div>
            <Tag tone="coral">Il magazzino dell’arredamento</Tag>
            <h2 className={`mt-6 ${h2Class}`}>
              <WordReveal text="Una cucina non arriva in un giorno solo." />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <div className="space-y-4 text-base leading-7 text-[#557090]">
              <p>
                La commessa di Casa Bianchi sono quattro prodotti di quattro brand diversi: cucina, top in quarzo, elettrodomestici e lampade. In tutto 23 colli, che arrivano in date diverse.
              </p>
              <p className="font-semibold text-[#102744]">
                Nel Magazzino logistico di Totalone ogni riga è un prodotto con il suo cliente: cerchi “Casa Bianchi” e vedi subito cosa è arrivato, quanti colli sono e in quale corsia si trovano.
              </p>
            </div>
          </Reveal>
        </div>
        <div className="mt-14 rounded-[32px] bg-white p-6 shadow-[0_24px_60px_rgba(16,39,68,.06)] ring-1 ring-[#f3e2da] sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#a33a22]">Cosa vedi in ogni riga</p>
          <Stagger className="mt-5 flex flex-wrap gap-2" gap={0.05}>
            {columns.map((c) => (
              <StaggerItem key={c}>
                <span className="inline-flex rounded-full border border-[#cfe1f4] bg-white px-3.5 py-2 text-xs font-bold text-[#245b96]">{c}</span>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-6 flex items-start gap-2 text-sm leading-6 text-[#557090]">
            <Search className="mt-1 h-4 w-4 shrink-0 text-[#1769d5]" aria-hidden="true" />
            Ricerca per cliente, brand o prodotto, filtro per stato e filtri sul magazzino selezionato.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3. ARRIVI PREVISTI                                                   */
/* ------------------------------------------------------------------ */

function Arrivi() {
  return (
    <section className="bg-[#fbfdff] py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Tag tone="amber">Arrivi previsti</Tag>
            <h2 className={`mt-6 max-w-3xl ${h2Class}`}>
              <WordReveal text="Guarda cosa sta arrivando, prima che arrivi." />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <div className="max-w-sm space-y-3 text-sm leading-6 text-[#557090]">
              <p>Il calendario “Arrivi previsti merce” mostra, giorno per giorno, quali prodotti sono attesi e per quale cliente.</p>
              <p>Si vede subito quando più commesse convergono sugli stessi giorni, e si organizzano ricezione e spazio in magazzino di conseguenza.</p>
            </div>
          </Reveal>
        </div>
        <Reveal y={40} delay={0.05}>
          <Panel tone="amber" className="mt-14">
            <AppWindow active="magazzino.arrivi" title="Arrivi previsti" className="h-[400px] sm:h-[420px]">
              <ArriviScreen />
            </AppWindow>
          </Panel>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4. COLLI                                                             */
/* ------------------------------------------------------------------ */

function Colli() {
  return (
    <section className="bg-[#eaf4ff] py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:px-10">
        <div>
          <Tag>Colli</Tag>
          <h2 className={`mt-6 ${h2Class}`}>
            <WordReveal text="Un prodotto può essere uno." />{" "}
            <WordReveal text="I colli molti di più." className="text-[#0b55c6]" delay={0.2} />
          </h2>
          <Reveal delay={0.1}>
            <div className="mt-6 space-y-4 text-base leading-7 text-[#557090]">
              <p>Sapere che “la cucina è arrivata” non basta: la cucina di Casa Bianchi sono 14 colli, e il montaggio parte solo quando ci sono tutti.</p>
              <p>Nella Schedina cliente ogni prodotto riporta il numero di colli e lo stato dell’ordine (Da ordinare, Ordinato, Arrivato). In alto, il totale: 4 prodotti, 23 colli.</p>
            </div>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#245b96] ring-1 ring-[#cfe1f4]">
              <Boxes className="h-4 w-4 text-[#1769d5]" aria-hidden="true" /> Al ricevimento sai quanti colli devono esserci.
            </p>
          </Reveal>
        </div>
        <Reveal y={40} delay={0.08}>
          <Panel tone="mint">
            <AppWindow active="schedine" title="Schedina" className="h-[400px] sm:h-[440px]">
              <ColliScreen />
            </AppWindow>
          </Panel>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5. UBICAZIONE — sedi, corsie, viste logistica/contabile, movimenti   */
/* ------------------------------------------------------------------ */

function Ubicazione() {
  return (
    <section className="bg-[#eff7ff] py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Tag>Ubicazione</Tag>
          <h2 className={`mt-6 ${h2Class}`}>
            <WordReveal text="Sai anche dove si trova." />
          </h2>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#557090]">
              Ogni prodotto ha la sua sede e la sua posizione, che sia una corsia, uno scaffale o “sotto al portico”. Con più magazzini scegli quello su cui lavorare e la tabella si adegua.
            </p>
          </Reveal>
        </div>
        <Stagger className="mt-14 grid gap-5 lg:grid-cols-6" gap={0.08}>
          <BentoCard className="lg:col-span-3">
            <CardTitle eyebrow="Più magazzini" title="Magazzino selezionato e posizione del prodotto.">
              <p>Il selettore in alto (per esempio “Magazzino Italia”) restringe la vista alla sede scelta; la colonna Sede dice dove si trova ogni prodotto.</p>
            </CardTitle>
            <MiniWindow className="mt-6 h-[170px]" zoom={1.35}>
              <SedeScreen />
            </MiniWindow>
          </BentoCard>

          <BentoCard className="lg:col-span-3">
            <CardTitle eyebrow="Logistico e contabile" title="Due viste dello stesso magazzino.">
              <p>Totalone distingue il Magazzino logistico, per chi riceve e sistema la merce, dal Magazzino contabile: due schede della stessa pagina, ognuna con la sua lettura.</p>
            </CardTitle>
            <MiniWindow className="mt-6 h-[170px]" zoom={1.35}>
              <MagazzinoTabsScreen />
            </MiniWindow>
          </BentoCard>

          <BentoCard className="lg:col-span-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[16px] bg-[#dcecff] text-[#1769d5]" aria-hidden="true"><Repeat className="h-5 w-5" /></span>
              <CardTitle eyebrow="Transazioni" title="Accanto alla situazione attuale, i movimenti registrati.">
                <p>La scheda Transazioni affianca alla vista del magazzino la lettura dei movimenti registrati.</p>
              </CardTitle>
            </div>
          </BentoCard>
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6. DOCUMENTI — DDT, distinte, archivio, stampa                       */
/* ------------------------------------------------------------------ */

function Documenti() {
  const items: { icon: typeof FileText; title: string; body: string }[] = [
    { icon: FileText, title: "Storico DDT", body: "I documenti di trasporto, da ritrovare quando serve verificare una consegna." },
    { icon: FileText, title: "Storico distinte", body: "Le distinte del magazzino, consultabili nel tempo." },
    { icon: Archive, title: "Archivio", body: "Lo storico operativo del magazzino resta accessibile dalla stessa barra." },
  ];
  return (
    <section className="bg-[#fbfdff] py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-10">
        <div>
          <Tag tone="coral">Documenti di magazzino</Tag>
          <h2 className={`mt-6 ${h2Class}`}>
            <WordReveal text="DDT e distinte, a un clic dalla tabella." />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-7 text-[#557090]">Dalla barra del Magazzino logistico stampi la vista corrente e apri archivio e storici, senza cercare nelle cartelle condivise.</p>
          </Reveal>
          <Stagger className="mt-8 grid gap-3" gap={0.08}>
            {items.map((it) => (
              <StaggerItem key={it.title}>
                <div className="flex items-start gap-4 rounded-[22px] bg-white p-5 ring-1 ring-[#e4eef8]">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[#f4f9ff] text-[#1769d5]" aria-hidden="true"><it.icon className="h-4 w-4" /></span>
                  <div>
                    <h3 className="text-base font-bold text-[#102744]">{it.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#557090]">{it.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <Reveal y={40} delay={0.08}>
          <Panel tone="blue">
            <MiniWindow className="h-[260px] sm:h-[320px]" zoom={1.6}>
              <DocumentiScreen />
            </MiniWindow>
          </Panel>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 7. PRIMA E DOPO — da dove arrivano i prodotti, dove vanno            */
/* ------------------------------------------------------------------ */

function PassoSuccessivo() {
  return (
    <section className="bg-[#f4f9ff] py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <Stagger className="grid gap-5 lg:grid-cols-2" gap={0.1}>
          <StaggerItem>
            <div className="flex h-full flex-col rounded-[36px] bg-white p-7 shadow-[0_24px_60px_rgba(16,39,68,.06)] ring-1 ring-[#e4eef8] sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#a33a22]">Da dove arriva</p>
              <h2 className="mt-3 text-3xl font-bold leading-[1] tracking-[-0.055em] text-[#102744] sm:text-5xl">I prodotti sono quelli della Schedina cliente.</h2>
              <p className="mt-5 text-base leading-7 text-[#557090]">Cliente, brand, quantità e colli sono gli stessi della vendita: in magazzino non si ricopia niente da un altro foglio.</p>
              <div className="mt-auto pt-8">
                <TextLink href={routes.commesse}>Vedi la Schedina in Gestione commesse</TextLink>
              </div>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#0b3f8f,#1769d5)] p-7 text-white shadow-[0_24px_60px_rgba(11,85,198,.25)] sm:p-10">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#9fe0ff]/25 blur-3xl" />
              <p className="relative text-xs font-bold uppercase tracking-[0.12em] text-[#9fe0ff]">Passo successivo</p>
              <h2 className="relative mt-3 text-3xl font-bold leading-[1] tracking-[-0.055em] sm:text-5xl">Quando i colli ci sono tutti, si programma il montaggio.</h2>
              <p className="relative mt-5 text-base leading-7 text-[#d7ebff]">Il montaggio di Casa Bianchi entra nel calendario della squadra con lo stesso cliente e la stessa commessa.</p>
              <div className="relative mt-auto flex flex-col items-start gap-5 pt-8">
                <a href={routes.montaggi} className="group inline-flex items-center gap-1.5 text-sm font-bold text-white hover:text-[#9fe0ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  Vai a Montaggi <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <DemoButton light>Vedi una tua commessa in demo</DemoButton>
              </div>
            </div>
          </StaggerItem>
        </Stagger>
        <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs font-semibold text-[#557090]">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /> Arrivi, colli e ubicazione restano consultabili anche dopo la consegna.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PAGINA                                                               */
/* ------------------------------------------------------------------ */

export function MagazzinoProductPage() {
  useSeo({
    title: "Magazzino per negozi di arredamento e mobilifici",
    description: "Arrivi previsti, colli, ubicazione e documenti di magazzino (DDT e distinte) per negozi di mobili, mobilifici e showroom di arredamento, collegati alla Schedina cliente.",
    path: routes.magazzino,
  });

  return (
    <MarketingShell active="magazzino" overlayHeader>
      <main id="top" className="overflow-x-clip text-[#102744]" style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" }}>
        <Hero />
        <LogisticaIntro />
        <Arrivi />
        <Colli />
        <Ubicazione />
        <Documenti />
        <PassoSuccessivo />
        <ProcessoStrip current="magazzino" />
      </main>
    </MarketingShell>
  );
}

export default MagazzinoProductPage;
