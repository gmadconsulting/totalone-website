import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Archive, ArrowDown, ArrowRight, Building2, CalendarDays, FolderKanban, ListChecks, TrendingUp, UserRound, UsersRound, type LucideIcon } from "lucide-react";
import { MarketingShell, openDemo } from "../totalone-site-architecture/_shared/MarketingShell";
import { Reveal, Stagger, StaggerItem, WordReveal } from "@/components/totalone/motion-kit";
import { AppWindow } from "@/components/totalone/app-ui";
import { TasksScreen } from "@/components/totalone/app-screens";
import { CaricoZoom, KanbanFlowZoom, TaskDashboardScreen } from "@/components/totalone/pages/progetti/ProgettiScreens";
import { routes } from "@/components/totalone/site/siteRoutes";
import { ProcessoStrip } from "@/components/totalone/site/ProcessoStrip";
import { useSeo } from "@/components/totalone/site/useSeo";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1769d5]";
const wrap = "mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10";
const h2Class = "text-[2.4rem] font-bold leading-[.95] tracking-[-0.065em] text-[#102744] sm:text-6xl";
const caption = "mt-5 text-center text-xs font-semibold text-[#557090]";

/* ------------------------------------------------------------------ */
/* Primitivi di pagina                                                 */
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

function Tag({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "coral" | "amber" | "dark" }) {
  const tones = {
    blue: "bg-[#dcecff] text-[#0b55c6]",
    coral: "bg-[#ffdcd2] text-[#a33a22]",
    amber: "bg-[#fff2dd] text-[#8a4f0f]",
    dark: "bg-white/12 text-[#e8f5ff] ring-1 ring-white/25",
  };
  return (
    <Reveal y={10}>
      <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.06em] ${tones[tone]}`}>{children}</span>
    </Reveal>
  );
}

function Lead({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <Reveal delay={0.1}>
      <div className={`space-y-4 text-base leading-7 text-[#557090] sm:text-[17px] sm:leading-8 ${className}`}>{children}</div>
    </Reveal>
  );
}

function Chips({ items, tone = "white" }: { items: string[]; tone?: "white" | "blue" | "warm" }) {
  const tones = {
    white: "border-[#cfe1f4] bg-white text-[#245b96]",
    blue: "border-transparent bg-[#dcecff] text-[#0b55c6]",
    warm: "border-[#f6d5c9] bg-white text-[#a33a22]",
  };
  return (
    <Stagger className="flex flex-wrap gap-2" gap={0.04}>
      {items.map((item) => (
        <StaggerItem key={item}>
          <span className={`inline-flex rounded-full border px-3.5 py-2 text-[13px] font-semibold ${tones[tone]}`}>{item}</span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function MockPanel({ children, tone = "blue", className = "" }: { children: ReactNode; tone?: "blue" | "coral" | "amber" | "green"; className?: string }) {
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

/* ------------------------------------------------------------------ */
/* 1 · HERO                                                            */
/* ------------------------------------------------------------------ */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.9, 1]);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(116deg,#082c68,#0d56bf_54%,#1387ee)] pb-20 pt-28 text-white sm:pb-28 sm:pt-36">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-[#75d7ff]/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-60 left-[-10%] h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
      <div className={`${wrap} relative`}>
        <nav aria-label="Breadcrumb" className="flex gap-2 text-xs font-semibold text-[#c9e2fb]">
          <a href={routes.home} className={`hover:text-white ${focusRing}`}>Home</a><span aria-hidden>/</span><span aria-current="page" className="text-white">Gestione progetti</span>
        </nav>
        <div className="mx-auto max-w-4xl pt-10 text-center sm:pt-14">
          <Tag tone="dark">Gestione progetti · attività del team</Tag>
          <h1 className="mt-6 text-[2.7rem] font-bold leading-[.95] tracking-[-0.07em] sm:text-6xl lg:text-[4.8rem]">
            <WordReveal text="Ogni attività del team," />
            <br />
            <WordReveal text="con un responsabile e una scadenza." className="text-[#9fe0ff]" delay={0.15} />
          </h1>
          <Reveal delay={0.25}>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#d7eaff] sm:text-lg sm:leading-8">
              Qui “progetto” è il lavoro interno dello showroom: un’apertura, un riallestimento, i richiami ai clienti, la formazione. Lo dividi in task, li assegni alle persone e segui cosa è fermo e cosa è chiuso.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#cfe6ff]">
              Il progetto d’arredo del cliente non sta qui: vive nella{" "}
              <a href={routes.commesse} className="font-bold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Schedina cliente della commessa</a>.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <DemoButton light>Prenota una demo</DemoButton>
              <a href="#progetto" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Come funziona <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>

        <div ref={ref} aria-hidden="true" className="relative mx-auto mt-14 max-w-[1100px] [perspective:1600px] sm:mt-20">
          <motion.div style={{ rotateX, scale, transformOrigin: "center top" }}>
            <AppWindow active="tasks.dashboard" title="Dashboard task" className="h-[440px] sm:h-[500px] lg:h-[540px]">
              <TaskDashboardScreen />
            </AppWindow>
          </motion.div>
          <div className="pointer-events-none absolute inset-x-[10%] -bottom-10 h-24 rounded-[100%] bg-[#04214f]/40 blur-3xl" />
        </div>
        <p className="mt-10 text-center text-xs font-semibold text-[#cfe6ff]">Tasks · Dashboard. Schermate dimostrative, dati di esempio.</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2 · UN PROGETTO = PERSONE + TASK + SCADENZA                          */
/* ------------------------------------------------------------------ */

const projectFields: [string, LucideIcon][] = [
  ["Nome progetto", FolderKanban],
  ["Persone coinvolte", UsersRound],
  ["Task collegati", ListChecks],
  ["Percentuale di completamento", TrendingUp],
  ["Scadenza", CalendarDays],
  ["Showroom", Building2],
];

function Progetto() {
  return (
    <section className="bg-[#fbfdff] py-24 sm:py-32" id="progetto">
      <div className={wrap}>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <Tag tone="coral">Il progetto</Tag>
            <h2 className={`mt-6 ${h2Class}`}><WordReveal text="Persone, task e una scadenza." /></h2>
          </div>
          <Lead>
            <p>Un progetto raccoglie le attività di un lavoro che coinvolge più persone. La percentuale di completamento si calcola da sola: task completati su task totali.</p>
          </Lead>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <div className="h-full rounded-[32px] border border-[#e4eef8] bg-white p-6 shadow-[0_24px_60px_rgba(16,39,68,.06)] sm:p-9">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#a33a22]">Cosa contiene ogni progetto</p>
              <Stagger className="mt-6 grid gap-3 sm:grid-cols-2" gap={0.06}>
                {projectFields.map(([label, Icon]) => (
                  <StaggerItem key={label}>
                    <div className="flex items-center gap-3 rounded-[18px] bg-[#f4f9ff] px-4 py-3.5">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-white text-[#1769d5] shadow-[0_4px_12px_rgba(23,105,213,.10)]"><Icon className="h-4 w-4" aria-hidden /></span>
                      <span className="text-sm font-semibold text-[#102744]">{label}</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-between gap-8 rounded-[32px] bg-[#102744] p-6 text-white sm:p-9">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#9fe0ff]">Esempi di progetti interni</p>
                <p className="mt-4 text-2xl font-bold leading-tight tracking-[-0.045em] sm:text-3xl">Il lavoro che non è una vendita, ma va fatto.</p>
              </div>
              <Stagger className="flex flex-wrap gap-2" gap={0.05}>
                {["Apertura showroom", "Riallestimento esposizione", "Richiami clienti", "Logistica interna", "Formazione"].map((v) => (
                  <StaggerItem key={v}>
                    <span className="inline-flex rounded-full bg-white/10 px-3.5 py-2 text-[13px] font-semibold text-[#e8f5ff] ring-1 ring-white/15">{v}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3 · TASK — priorità e scadenze                                       */
/* ------------------------------------------------------------------ */

function Task() {
  return (
    <section className="bg-[#eff7ff] py-24 sm:py-32" id="task">
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16`}>
        <div>
          <Tag>Task</Tag>
          <h2 className={`mt-6 ${h2Class}`}><WordReveal text="Ogni cosa da fare ha un nome e una data." /></h2>
          <Lead className="mt-6">
            <p>Ogni task è collegato a un progetto e ha un responsabile, una priorità e una scadenza. Chi apre Totalone vede prima i suoi.</p>
          </Lead>
          <p className="mb-3 mt-8 text-xs font-bold uppercase tracking-[0.1em] text-[#557090]">Viste</p>
          <Chips items={["Kanban", "Lista", "Calendario"]} tone="blue" />
          <p className="mb-3 mt-6 text-xs font-bold uppercase tracking-[0.1em] text-[#557090]">Priorità</p>
          <Chips items={["Alta", "Media", "Bassa"]} tone="warm" />
        </div>
        <div>
          <MockPanel tone="blue">
            <AppWindow active="tasks.task" title="Tasks" className="h-[400px] sm:h-[460px]">
              <TasksScreen />
            </AppWindow>
          </MockPanel>
          <p className={caption}>Tasks · Kanban. Dati di esempio.</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4 · AVANZAMENTO                                                     */
/* ------------------------------------------------------------------ */

function Avanzamento() {
  return (
    <section className="bg-[#fffaf7] py-24 sm:py-32" id="avanzamento">
      <div className={wrap}>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <Tag tone="amber">Avanzamento</Tag>
            <h2 className={`mt-6 ${h2Class}`}><WordReveal text="Da fare, in corso, completato." /></h2>
          </div>
          <Lead>
            <p>I task passano da una colonna all’altra man mano che il lavoro va avanti. Il progetto aggiorna la sua percentuale e la dashboard conta quanti task sono scaduti, in scadenza o chiusi negli ultimi giorni.</p>
          </Lead>
        </div>
        <MockPanel tone="coral" className="mt-14">
          <KanbanFlowZoom />
        </MockPanel>
        <p className={caption}>Dati di esempio.</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5 · TEAM — carico, filtri, archivio                                  */
/* ------------------------------------------------------------------ */

function Team() {
  const filtri: [string, LucideIcon][] = [["Showroom", Building2], ["Utenti", UserRound], ["I miei progetti", FolderKanban], ["Archivio", Archive]];
  return (
    <section className="bg-[#eaf4ff] py-24 sm:py-32" id="team">
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-16`}>
        <div>
          <Tag>Team</Tag>
          <h2 className={`mt-6 ${h2Class}`}><WordReveal text="Chi è carico, chi è libero." /></h2>
          <Lead className="mt-6">
            <p>Il carico per persona mostra quanti task ha aperto ciascuno e quanti sono in ritardo, compresi quelli ancora senza responsabile.</p>
            <p>Filtra per showroom o per utente, oppure guarda solo i tuoi progetti. Quelli conclusi vanno in archivio e non intralciano il lavoro di oggi.</p>
          </Lead>
          <div className="mt-8 flex flex-wrap gap-2">
            {filtri.map(([l, Icon]) => (
              <span key={l} className="inline-flex items-center gap-2 rounded-full border border-[#cfe1f4] bg-white px-3.5 py-2 text-[13px] font-semibold text-[#245b96]"><Icon className="h-3.5 w-3.5" aria-hidden />{l}</span>
            ))}
          </div>
        </div>
        <div>
          <MockPanel tone="blue">
            <CaricoZoom />
          </MockPanel>
          <p className={caption}>Carico per persona dalla dashboard task. Dati di esempio.</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6 · PASSO SUCCESSIVO                                                */
/* ------------------------------------------------------------------ */

function PassoSuccessivo() {
  return (
    <section className="bg-[#fbfdff] py-20 sm:py-24">
      <div className={`${wrap} grid gap-4 md:grid-cols-2`}>
        <a href={routes.commesse} className={`group flex flex-col rounded-[28px] border border-[#e4eef8] bg-white p-7 transition-transform hover:-translate-y-1 sm:p-9 ${focusRing}`}>
          <span className="text-[11px] font-bold tracking-[0.12em] text-[#0b55c6]">IL PROGETTO DEL CLIENTE</span>
          <strong className="mt-4 text-2xl font-bold tracking-[-0.04em] text-[#102744]">Gestione commesse</strong>
          <span className="mt-2 text-sm leading-6 text-[#557090]">Prodotti, ordini, documenti e pagamenti di ciò che hai venduto: la Schedina cliente.</span>
          <ArrowRight className="mt-6 h-4 w-4 text-[#cf4a2b] transition-transform group-hover:translate-x-1" aria-hidden />
        </a>
        <a href={routes.magazzino} className={`group flex flex-col rounded-[28px] bg-[#082c68] p-7 text-white shadow-[0_24px_60px_rgba(8,44,104,.22)] transition-transform hover:-translate-y-1 sm:p-9 ${focusRing}`}>
          <span className="text-[11px] font-bold tracking-[0.12em] text-[#9fe0ff]">PASSO SUCCESSIVO</span>
          <strong className="mt-4 text-2xl font-bold tracking-[-0.04em]">Magazzino e logistica</strong>
          <span className="mt-2 text-sm leading-6 text-[#d5ebff]">Arrivi previsti, colli e ubicazioni dei prodotti ordinati.</span>
          <ArrowRight className="mt-6 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PAGINA                                                              */
/* ------------------------------------------------------------------ */

export function ProgettiProductPage() {
  useSeo({
    title: "Gestione progetti e task per showroom",
    description: "Organizza le attività interne dello showroom con Totalone: progetti, task con responsabile, priorità e scadenza, Kanban, carico per persona e archivio.",
    path: routes.progetti,
  });

  return (
    <MarketingShell active="progetti" overlayHeader>
      <main id="top" className="overflow-x-clip bg-[#fbfdff] text-[#102744] [&_[id]]:scroll-mt-24" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <Hero />
        <Progetto />
        <Task />
        <Avanzamento />
        <Team />
        <PassoSuccessivo />
        <ProcessoStrip current="progetti" />
      </main>
    </MarketingShell>
  );
}

export default ProgettiProductPage;
