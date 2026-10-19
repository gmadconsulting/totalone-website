import { useRef, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Building2, CalendarDays, Camera, Check, ChevronRight, ClipboardCheck, MapPin, Navigation, Package, Printer, Search, type LucideIcon } from "lucide-react";
import { MarketingShell, openDemo } from "../totalone-site-architecture/_shared/MarketingShell";
import { Reveal, Stagger, StaggerItem, WordReveal, tpEase, useLoopSteps } from "@/components/totalone/motion-kit";
import { AppWindow, uiFont } from "@/components/totalone/app-ui";
import { AnteprimaRapportinoScreen, FineLavoroCard, MontaggiCalendarioScreen, MontaggiMappaScreen, RapportiniStoricoScreen } from "@/components/totalone/pages/montaggi/MontaggiScreens";
import { routes } from "@/components/totalone/site/siteRoutes";
import { useSeo } from "@/components/totalone/site/useSeo";
import { ProcessoStrip } from "@/components/totalone/site/ProcessoStrip";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1769d5]";

/* ------------------------------------------------------------------ */
/* Primitivi della pagina                                              */
/* ------------------------------------------------------------------ */

function DemoButton({ children, light = false }: { children: ReactNode; light?: boolean }) {
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
      <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.06em] ${tones[tone]}`}>{children}</span>
    </Reveal>
  );
}

function SectionTitle({ children, className = "" }: { children: string; className?: string }) {
  return (
    <h2 className={`mt-6 text-[2.4rem] font-bold leading-[.95] tracking-[-0.065em] sm:text-6xl lg:text-[4rem] ${className}`}>
      <WordReveal text={children} />
    </h2>
  );
}

function Lead({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <Reveal delay={0.1}>
      <div className={`mt-6 space-y-4 text-base leading-7 text-[#557090] sm:text-[17px] sm:leading-8 ${className}`}>{children}</div>
    </Reveal>
  );
}

function InlineLink({ href, children, className = "mt-7" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} className={`group inline-flex items-center gap-1.5 rounded-full ${className} ${focusRing}`}>
      <span className="text-sm font-bold text-[#0b55c6] transition-colors group-hover:text-[#a33a22]">{children}</span>
      <ChevronRight className="h-4 w-4 text-[#0b55c6] transition-transform group-hover:translate-x-1 group-hover:text-[#a33a22]" />
    </a>
  );
}

function Pills({ items }: { items: string[] }) {
  return (
    <Stagger className="mt-7 flex flex-wrap gap-2" gap={0.05}>
      {items.map((item) => (
        <StaggerItem key={item}>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#cfe1f4] bg-white px-3.5 py-2 text-[13px] font-semibold text-[#245b96]">
            <Check className="h-3.5 w-3.5 text-[#cf4a2b]" aria-hidden="true" />
            {item}
          </span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Pannello colorato che ospita un mockup (decorativo per gli screen reader). */
function Stage({ children, tone = "blue", className = "" }: { children: ReactNode; tone?: "blue" | "coral" | "amber" | "green"; className?: string }) {
  const tones = {
    blue: "bg-[radial-gradient(circle_at_20%_10%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#dcecff,#c9e1ff)]",
    coral: "bg-[radial-gradient(circle_at_80%_10%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#ffe9e1,#ffd9cc)]",
    amber: "bg-[radial-gradient(circle_at_20%_90%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#fff2dd,#ffe4b8)]",
    green: "bg-[radial-gradient(circle_at_80%_90%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#e3f6ec,#cdeedd)]",
  };
  return (
    <Reveal y={40} delay={0.08} className={className}>
      <div aria-hidden="true" className={`relative rounded-[32px] p-3 sm:rounded-[36px] sm:p-5 ${tones[tone]}`}>{children}</div>
    </Reveal>
  );
}

function Wrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

/* ------------------------------------------------------------------ */
/* 1. HERO                                                             */
/* ------------------------------------------------------------------ */

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

function HeroProduct() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.9, 1]);
  const [loopRef, view] = useLoopSteps(2, 9500);

  return (
    <div ref={ref} className="relative mx-auto mt-14 max-w-[1120px] [perspective:1600px] sm:mt-20">
      <motion.div ref={loopRef} aria-hidden="true" style={{ rotateX, scale, transformOrigin: "center top" }} className="relative">
        <AppWindow active="montaggi.montaggi" title="Montaggi" className="relative h-[430px] sm:h-[520px]">
          <AnimatePresence initial={false}>
            <motion.div
              key={view}
              className="absolute inset-3"
              initial={{ opacity: 0, scale: 0.985, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: tpEase }}
            >
              {view === 0 ? <MontaggiMappaScreen /> : <MontaggiCalendarioScreen />}
            </motion.div>
          </AnimatePresence>
        </AppWindow>
        <FloatingNote className="-left-8 top-28 hidden lg:flex" delay={1.1} float={10}>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ffe3db] text-[#a33a22]"><CalendarDays className="h-4 w-4" /></span>
          <span><b className="block text-[12px] text-[#102744]">Montaggio programmato</b><span className="text-[11px] text-[#557090]">Casa Bianchi · 2 giornate · Davide Neri</span></span>
        </FloatingNote>
        <FloatingNote className="-right-8 bottom-24 hidden lg:flex" delay={1.5} float={-12}>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#D1FAE5] text-[#059669]"><ClipboardCheck className="h-4 w-4" /></span>
          <span><b className="block text-[12px] text-[#102744]">Fine lavoro compilato</b><span className="text-[11px] text-[#557090]">Casa Bianchi · 3 foto · firmato</span></span>
        </FloatingNote>
      </motion.div>
      <div className="pointer-events-none absolute inset-x-[10%] -bottom-10 h-24 rounded-[100%] bg-[#04214f]/40 blur-3xl" />
      <p className="relative mt-8 text-center text-xs font-semibold text-[#c9e2fb]">Schermate dimostrative, dati di esempio.</p>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(116deg,#082c68_0%,#0d56bf_54%,#1387ee_100%)] pb-24 pt-28 text-white sm:pb-32 sm:pt-36">
      <motion.div aria-hidden className="absolute -right-20 top-10 h-[420px] w-[420px] rounded-full bg-[#75d7ff]/30 blur-3xl" animate={{ x: [0, -60, 0], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div aria-hidden className="absolute -left-28 top-[420px] h-[420px] w-[420px] rounded-full bg-[#f36b4d]/20 blur-3xl" animate={{ x: [0, 50, 0], y: [0, -30, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
      <Wrap className="relative">
        <nav aria-label="Breadcrumb" className="flex gap-2 text-[11px] font-bold text-[#c9e2fb]">
          <a href={routes.home} className="rounded hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Home</a>
          <span aria-hidden>/</span>
          <span aria-current="page">Montaggi</span>
        </nav>
        <div className="mt-12 grid items-end gap-10 sm:mt-16 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
          <div>
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: tpEase }} className="inline-flex items-center gap-2 rounded-full border border-[#8ecbff] bg-[#5abaff]/20 px-3.5 py-2 text-xs font-bold tracking-[0.08em] text-[#eff8ff]">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9fe0ff] opacity-75 motion-reduce:animate-none" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#9fe0ff]" /></span>
              GESTIONE MONTAGGI
            </motion.span>
            <h1 className="mt-7 max-w-3xl text-[clamp(2.7rem,6.6vw,6.2rem)] font-bold leading-[.93] tracking-[-0.075em]">
              <WordReveal text="Dalla mappa al fine lavoro," />
              <br />
              <WordReveal text="ogni montaggio" className="text-[#9fe0ff]" delay={0.25} />
              <br />
              <WordReveal text="sotto controllo." delay={0.4} />
            </h1>
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: tpEase, delay: 0.5 }}>
            <p className="max-w-xl text-lg leading-8 text-[#e5f3ff]">Programma i montaggi a calendario, guarda la giornata sulla mappa rispetto ai tuoi showroom e chiudi ogni intervento con un rapportino stampabile.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <DemoButton light>Prenota una demo</DemoButton>
              <a href="#mappa" className="group inline-flex items-center gap-2 rounded-full px-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                <span className="text-sm font-bold text-white group-hover:text-[#d0e8ff]">Scopri come funziona</span>
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        </div>
        <HeroProduct />
      </Wrap>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2. MAPPA — la funzione distintiva                                   */
/* ------------------------------------------------------------------ */

function MappaSection() {
  const items: [LucideIcon, string][] = [
    [CalendarDays, "Scegli il giorno da pianificare"],
    [Search, "Cerca un cliente per aggiungerlo alla giornata"],
    [Building2, "Showroom e montaggi sulla stessa mappa"],
    [Navigation, "Pulsante “Itinerario del giorno”"],
  ];
  return (
    <section className="scroll-mt-24 overflow-hidden bg-[#fffaf7] py-24 sm:py-32" id="mappa">
      <Wrap className="grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <div>
          <Tag tone="amber">Mappa</Tag>
          <SectionTitle className="text-[#102744]">La giornata di montaggio, sulla mappa.</SectionTitle>
          <Lead>
            <p>Nella scheda Mappa scegli un giorno e vedi dove si trovano i montaggi rispetto ai tuoi showroom: Milano Centro, Lugano, Como, Bergamo.</p>
            <p>Cerchi un cliente e lo aggiungi alla giornata; l’elenco a sinistra conta i montaggi del giorno. Dalla stessa schermata apri l’itinerario del giorno.</p>
          </Lead>
          <ul className="mt-7 space-y-2.5">
            {items.map(([Icon, label]) => (
              <li key={label} className="flex items-center gap-3 text-sm font-semibold text-[#245b96]">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-[#1769d5] ring-1 ring-[#cfe1f4]" aria-hidden="true"><Icon className="h-4 w-4" /></span>
                {label}
              </li>
            ))}
          </ul>
        </div>
        <Stage tone="amber">
          <AppWindow active="montaggi.montaggi" title="Montaggi" className="h-[420px] sm:h-[480px]">
            <MontaggiMappaScreen />
          </AppWindow>
        </Stage>
      </Wrap>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3. CALENDARIO — mese, settimana, giorno; i miei o tutti              */
/* ------------------------------------------------------------------ */

function CalendarioSection() {
  return (
    <section className="bg-[#eff7ff] py-24 sm:py-32" id="calendario">
      <Wrap>
        <div className="grid gap-10 lg:grid-cols-[1fr_.85fr] lg:items-end lg:gap-20">
          <div>
            <Tag>Calendario</Tag>
            <SectionTitle className="max-w-3xl text-[#102744]">Chi monta cosa, e in quali giorni.</SectionTitle>
          </div>
          <Reveal delay={0.1}>
            <div className="max-w-md space-y-3 text-base leading-7 text-[#557090]">
              <p>Il calendario mostra ogni montaggio con il cliente, i giorni occupati e chi è assegnato. Quelli ancora da assegnare si vedono subito.</p>
              <p>Passi da mese a settimana a giorno, filtri tra “I miei” e “Tutti” e cerchi per cliente o venditore.</p>
            </div>
          </Reveal>
        </div>
        <Stage className="mx-auto mt-14 max-w-[1080px]">
          <AppWindow active="montaggi.montaggi" title="Montaggi" className="h-[420px] sm:h-[520px]">
            <MontaggiCalendarioScreen />
          </AppWindow>
        </Stage>
        <Pills items={["Mese · Settimana · Giorno", "I miei / Tutti", "Cerca cliente o venditore", "Consegna manuale", "Previsti", "Archivio"]} />
      </Wrap>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4. CONTESTO — ogni montaggio ha un cliente e dei prodotti            */
/* ------------------------------------------------------------------ */

function ContestoSection() {
  return (
    <section className="bg-[#fbfdff] py-24 sm:py-32">
      <Wrap>
        <Reveal>
          <div className="grid gap-8 rounded-[36px] border border-[#e4eef8] bg-[#f4f9ff] p-7 sm:p-11 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-14">
            <div>
              <Tag>Ogni montaggio ha un cliente</Tag>
              <h2 className="mt-6 text-4xl font-bold leading-[.98] tracking-[-0.06em] text-[#102744] sm:text-5xl">Non pianifichi una data: pianifichi la cucina di Casa Bianchi.</h2>
              <p className="mt-5 text-base leading-7 text-[#557090]">La pagina Montaggi ha anche la scheda Prodotti: oltre alla programmazione, i prodotti da montare. Quando in magazzino ci sono tutti i colli, il montaggio si può programmare.</p>
              <InlineLink href={routes.magazzino}>Arrivi e colli in Magazzino e logistica</InlineLink>
            </div>
            <ul className="grid gap-3">
              {(
                [
                  [Package, "Prodotti da montare", "La scheda Prodotti, accanto a Calendario e Mappa."],
                  [MapPin, "Cliente sulla mappa", "Il cliente compare sulla mappa del giorno, con la sua città."],
                  [CalendarDays, "Giornate e montatore", "Nel calendario, con il nome di chi è assegnato."],
                ] as [LucideIcon, string, string][]
              ).map(([Icon, t, b]) => (
                <li key={t} className="flex items-start gap-4 rounded-[22px] bg-white p-5 ring-1 ring-[#e4eef8]">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[#dcecff] text-[#1769d5]" aria-hidden="true"><Icon className="h-4 w-4" /></span>
                  <div>
                    <p className="text-base font-bold text-[#102744]">{t}</p>
                    <p className="mt-1 text-sm leading-6 text-[#557090]">{b}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5. RAPPORTINO — giornate + fine lavoro + anteprima/stampa            */
/* ------------------------------------------------------------------ */

function RapportinoSection() {
  const steps: [LucideIcon, string, string, string][] = [
    [CalendarDays, "01", "Avanzamento giornaliero", "Ogni giornata di lavoro ha la sua scheda: data, autore, descrizione dei lavori svolti e foto."],
    [Camera, "02", "Fine lavoro", "A intervento concluso il montatore compila il fine lavoro, con note, foto e firma."],
    [Printer, "03", "Anteprima e stampa", "Il rapportino si apre come documento con cliente, periodo e documentazione fotografica, ed è pronto da stampare."],
  ];
  return (
    <section className="bg-[#fffaf7] py-24 sm:py-32" id="rapportini">
      <Wrap>
        <div className="mx-auto max-w-3xl text-center">
          <Tag tone="coral">Rapportino di montaggio</Tag>
          <SectionTitle className="text-[#102744]">Il montaggio finisce. Il rapportino resta.</SectionTitle>
          <Lead className="mx-auto max-w-2xl">
            <p>Per Casa Bianchi: due avanzamenti giornalieri registrati da Davide Neri, poi il fine lavoro. Tutto sotto lo stesso cliente.</p>
          </Lead>
        </div>
        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1.25fr_.75fr] lg:gap-10">
          <Stage tone="coral">
            <AppWindow active="montaggi.rapportini" title="Rapportini" className="h-[440px] sm:h-[500px]">
              <AnteprimaRapportinoScreen />
            </AppWindow>
          </Stage>
          <div className="space-y-4">
            <Stagger className="grid gap-3" gap={0.08}>
              {steps.map(([Icon, n, t, b]) => (
                <StaggerItem key={n}>
                  <div className="flex items-start gap-4 rounded-[22px] bg-white p-5 ring-1 ring-[#f3e2da]">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[#ffdcd2] text-[#a33a22]" aria-hidden="true"><Icon className="h-4 w-4" /></span>
                    <div>
                      <p className="font-mono text-[11px] font-bold text-[#557090]">{n}</p>
                      <h3 className="text-base font-bold text-[#102744]">{t}</h3>
                      <p className="mt-1 text-sm leading-6 text-[#557090]">{b}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.1}>
              <div aria-hidden="true" className="rounded-[26px] bg-[radial-gradient(circle_at_80%_10%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#e3f6ec,#cdeedd)] p-4 sm:p-5">
                <FineLavoroCard />
              </div>
            </Reveal>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6. STORICO + passo successivo (Assistenza)                           */
/* ------------------------------------------------------------------ */

function StoricoSection() {
  return (
    <section className="bg-[#eaf4ff] py-24 sm:py-32">
      <Wrap className="grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
        <div>
          <Tag tone="amber">Storico rapportini</Tag>
          <SectionTitle className="text-[#102744]">I rapportini non spariscono in una chat.</SectionTitle>
          <Lead>
            <p>Nella pagina Rapportini di montaggio cerchi per cliente, autore o note e restringi il periodo. Per ogni cliente vedi quante giornate sono state registrate e se il fine lavoro è compilato.</p>
          </Lead>
          <Pills items={["Cliente", "Autore", "Note", "Periodo"]} />
          <div className="mt-10 rounded-[28px] bg-[#082c68] p-7 text-white sm:p-8">
            <p className="text-[11px] font-bold tracking-[0.12em] text-[#9fe0ff]">PASSO SUCCESSIVO</p>
            <p className="mt-3 text-2xl font-bold leading-tight tracking-[-0.045em]">Se dopo il montaggio serve un intervento, si apre un’assistenza sullo stesso cliente.</p>
            <a href={routes.assistenza} className="group mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-white hover:text-[#9fe0ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              Vai ad Assistenza e post-vendita <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
        <Stage tone="amber">
          <AppWindow active="montaggi.rapportini" title="Rapportini" className="h-[400px] sm:h-[460px]">
            <RapportiniStoricoScreen />
          </AppWindow>
        </Stage>
      </Wrap>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PAGINA                                                              */
/* ------------------------------------------------------------------ */

export function MontaggiProductPage() {
  useSeo({
    title: "Gestione montaggi e consegne di mobili",
    description: "Calendario dei montaggi, mappa della giornata con i tuoi showroom e rapportini di montaggio stampabili, con giornate e fine lavoro. Per negozi di arredamento, mobilifici e showroom.",
    path: routes.montaggi,
  });

  return (
    <MarketingShell active="montaggi" overlayHeader>
      <main id="top" className="overflow-x-clip bg-[#fbfdff] text-[#102744]" style={{ fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif" }}>
        <Hero />
        <MappaSection />
        <CalendarioSection />
        <ContestoSection />
        <RapportinoSection />
        <StoricoSection />
        <ProcessoStrip current="montaggi" />
      </main>
    </MarketingShell>
  );
}

export default MontaggiProductPage;
