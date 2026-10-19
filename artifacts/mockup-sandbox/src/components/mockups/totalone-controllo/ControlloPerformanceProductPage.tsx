import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { MarketingShell, openDemo } from "../totalone-site-architecture/_shared/MarketingShell";
import { Reveal, Stagger, StaggerItem, WordReveal, tpEase } from "@/components/totalone/motion-kit";
import { AppWindow } from "@/components/totalone/app-ui";
import { PreventiviListScreen, VenditeScreen } from "@/components/totalone/app-screens";
import { TrattativeKpiScreen } from "@/components/totalone/pages/trattative/TrattativeScreens";
import { TasksDashboardScreen } from "@/components/totalone/pages/controllo/ControlloScreens";
import { routes } from "@/components/totalone/site/siteRoutes";
import { ProcessoStrip } from "@/components/totalone/site/ProcessoStrip";
import { useSeo } from "@/components/totalone/site/useSeo";

const wrap = "mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10";
const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1769d5]";

/* ------------------------------------------------------------------ */
/* Primitive                                                           */
/* ------------------------------------------------------------------ */

function DemoButton({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <motion.button
      type="button"
      onClick={openDemo}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-bold transition-colors ${
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
    dark: "bg-[#2b75cb] text-[#e8f5ff]",
  };
  return (
    <Reveal y={10}>
      <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold uppercase ${tones[tone]}`}>{children}</span>
    </Reveal>
  );
}

function Heading({ tag, tone, title, body }: { tag: string; tone?: "blue" | "coral" | "amber" | "dark"; title: string; body?: ReactNode }) {
  return (
    <div className="max-w-2xl">
      <Tag tone={tone}>{tag}</Tag>
      <h2 className="mt-6 text-[2.4rem] font-bold leading-[.95] tracking-[-0.065em] text-[#102744] sm:text-6xl lg:text-[3.4rem]">
        <WordReveal text={title} />
      </h2>
      {body && (
        <Reveal delay={0.1}>
          <div className="mt-6 max-w-xl space-y-4 text-base leading-7 text-[#557090]">{body}</div>
        </Reveal>
      )}
    </div>
  );
}

function Checks({ items }: { items: string[] }) {
  return (
    <Stagger className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2" gap={0.05}>
      {items.map((item) => (
        <StaggerItem key={item}>
          <span className="flex items-start gap-2.5 text-sm font-semibold text-[#245b96]">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#dcecff] text-[#1769d5]"><Check className="h-3 w-3" /></span>
            {item}
          </span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

const panelTones = {
  blue: "bg-[radial-gradient(circle_at_20%_10%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#dcecff,#c9e1ff)]",
  coral: "bg-[radial-gradient(circle_at_80%_10%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#ffe9e1,#ffd9cc)]",
  amber: "bg-[radial-gradient(circle_at_20%_90%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#fff2dd,#ffe4b8)]",
  green: "bg-[radial-gradient(circle_at_80%_90%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#e3f6ec,#cdeedd)]",
};

/** Schermata reale del gestionale con didascalia: dove si trova e cosa mostra. */
function AppShot({ active, title, children, tone = "blue", where, caption }: { active: string; title: string; children: ReactNode; tone?: keyof typeof panelTones; where: string; caption: string }) {
  return (
    <Reveal y={40} delay={0.08}>
      <figure>
        <div aria-hidden="true" className={`relative rounded-[36px] p-3 sm:p-5 ${panelTones[tone]}`}>
          <AppWindow active={active} title={title} className="h-[400px] sm:h-[460px]">
            {children}
          </AppWindow>
        </div>
        <figcaption className="mt-4 text-[13px] leading-6 text-[#557090]">
          <b className="font-semibold text-[#245b96]">{where}</b> · {caption}
        </figcaption>
      </figure>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* 1 · HERO                                                            */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(116deg,#082c68,#0d56bf_54%,#1387ee)] pb-20 pt-28 text-white sm:pb-28 sm:pt-36">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#9fe0ff]/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#f36b4d]/15 blur-3xl" aria-hidden />
      <div className={`${wrap} relative`}>
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] text-[#bfe3ff]">
          <a href={routes.home} className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Home</a>
          <span aria-hidden>/</span>
          <span aria-current="page" className="text-white">Controllo e performance</span>
        </nav>
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-[.95fr_1.05fr] lg:gap-14">
          <div>
            <Tag tone="dark">Controllo e performance</Tag>
            <h1 className="mt-6 text-[2.7rem] font-bold leading-[.95] tracking-[-0.065em] sm:text-6xl lg:text-[4.6rem]">
              <WordReveal text="I numeri dello showroom," />
              <br />
              <WordReveal text="senza ricostruirli in Excel." className="text-[#9fe0ff]" delay={0.25} />
            </h1>
            <Reveal delay={0.2}>
              <p className="mt-7 max-w-xl text-base leading-7 text-[#d7e9ff] sm:text-lg sm:leading-8">
                Preventivi, trattative, acconti e task del team finiscono nello stesso sistema. Totalone li somma per showroom e per venditore, così la direzione legge pipeline, venduto e incassi senza chiedere report a nessuno.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <DemoButton light>Prenota una demo</DemoButton>
                <a href="#letture" className="group inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  Cosa puoi leggere <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </a>
              </div>
            </Reveal>
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: tpEase, delay: 0.3 }} className="min-w-0">
            <div aria-hidden="true">
              <AppWindow active="totalone" title="Totalone showroom" className="h-[380px] sm:h-[440px]">
                <TrattativeKpiScreen mode="showroom" />
              </AppWindow>
            </div>
            <p className="mt-4 text-[13px] leading-6 text-[#bfe3ff]">Pagina Totalone: i KPI della pipeline trattative e degli incassi, showroom per showroom. Schermate dimostrative, dati di esempio.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2 · VENDUTO PER VENDITORE                                           */
/* ------------------------------------------------------------------ */

function Venditori() {
  return (
    <section className="bg-[#fbfdff] py-24 sm:py-32" id="letture">
      <div className={`${wrap} grid items-center gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20`}>
        <div>
          <Heading
            tag="Pipeline e venduto"
            title="Quanto è in trattativa, quanto è chiuso."
            body={
              <>
                <p>In testa alla pagina Totalone ci sono i totali della pipeline: preventivi, finalizzato, venduto, da finalizzare e non confermato, con il numero di trattative per ciascuno.</p>
                <p>Scegli lo showroom e il venditore e i totali si ricalcolano. Gli importi si leggono IVA inclusa, con l’equivalente IVA esclusa sotto.</p>
              </>
            }
          />
          <Checks items={["Totale preventivi", "Finalizzato", "Venduto", "Da finalizzare", "Non confermato", "Filtro per showroom e venditore"]} />
        </div>
        <AppShot active="totalone" title="Totalone showroom" where="Pagina Totalone" caption="Gli stessi KPI filtrati per venditore: Tutti, Giulia, Luca. Dati di esempio.">
          <TrattativeKpiScreen mode="venditori" incassi={false} />
        </AppShot>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3 · PREVENTIVI                                                      */
/* ------------------------------------------------------------------ */

function Preventivi() {
  return (
    <section className="bg-[#fffaf7] py-24 sm:py-32" id="preventivi">
      <div className={`${wrap} grid items-center gap-14 lg:grid-cols-[1.15fr_.85fr] lg:gap-20`}>
        <div className="lg:order-2">
          <Heading
            tag="Preventivi"
            tone="coral"
            title="Quanti preventivi diventano vendite."
            body={
              <>
                <p>La lista Preventivi riassume il valore ancora in pipeline, quello accettato e la percentuale di conversione.</p>
                <p>Quando un preventivo viene convertito, i tre numeri si aggiornano da soli: nessuno deve contare a mano quanti ne sono stati firmati.</p>
              </>
            }
          />
          <div className="mt-8">
            <a href={routes.preventivi} className={`group inline-flex items-center gap-1.5 text-sm font-bold text-[#0b55c6] hover:text-[#b93f23] ${focusRing}`}>
              Come funzionano i preventivi <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
        <div className="lg:order-1">
          <AppShot tone="coral" active="preventivi" title="Preventivi" where="Preventivi" caption="In pipeline, accettato e conversione cambiano alla conversione di un preventivo. Dati di esempio.">
            <PreventiviListScreen />
          </AppShot>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4 · INCASSI                                                         */
/* ------------------------------------------------------------------ */

function Incassi() {
  return (
    <section className="bg-[#eff7ff] py-24 sm:py-32" id="incassi">
      <div className={`${wrap} grid items-center gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20`}>
        <div>
          <Heading
            tag="Incassi"
            tone="amber"
            title="Acconti ricevuti e acconti da ricevere."
            body={
              <>
                <p>Il riquadro “Incassi & clienti” somma gli acconti registrati su tutte le trattative e quelli ancora da incassare, insieme al numero di clienti.</p>
                <p>Ogni acconto registrato su una commessa sposta subito i totali: sai sempre quanto deve ancora entrare.</p>
              </>
            }
          />
        </div>
        <AppShot tone="amber" active="totalone" title="Totalone showroom" where="Pagina Totalone · Incassi & clienti" caption="Un acconto di Casa Bianchi aggiorna ricevuti e da ricevere. Dati di esempio.">
          <VenditeScreen />
        </AppShot>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5 · LAVORO DEL TEAM                                                 */
/* ------------------------------------------------------------------ */

function Team() {
  return (
    <section className="bg-[#fbfdff] py-24 sm:py-32" id="team">
      <div className={`${wrap} grid items-center gap-14 lg:grid-cols-[1.15fr_.85fr] lg:gap-20`}>
        <div className="lg:order-2">
          <Heading
            tag="Lavoro del team"
            title="Cosa è scaduto, cosa è stato chiuso, chi è carico."
            body={
              <>
                <p>La dashboard dei task mostra le attività scadute, in scadenza e completate, il carico per persona e i task ancora senza responsabile.</p>
                <p>È la lettura operativa del team: utile per capire dove si accumula il lavoro prima che diventi un ritardo con il cliente.</p>
              </>
            }
          />
          <div className="mt-8">
            <a href={routes.progetti} className={`group inline-flex items-center gap-1.5 text-sm font-bold text-[#0b55c6] hover:text-[#b93f23] ${focusRing}`}>
              Attività e task del team <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
        <div className="lg:order-1">
          <AppShot tone="green" active="tasks.dashboard" title="Dashboard task" where="Tasks · Dashboard" caption="Scadute, completate e carico per persona. Dati di esempio.">
            <TasksDashboardScreen />
          </AppShot>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6 · ALTRE LETTURE + PASSO SUCCESSIVO                                */
/* ------------------------------------------------------------------ */

function AltreLetture() {
  const items: [string, string][] = [
    ["Venduto e fatturato", "Il valore dei contratti messo a confronto con quanto risulta già fatturato nel periodo."],
    ["Marginalità", "Il margine letto per periodo, brand o categoria, oltre a quello della singola commessa."],
    ["Percorso commerciale", "Ingressi, trattative e vendite per canale di provenienza e per venditore."],
    ["Obiettivi", "Un target per metrica e periodo, confrontato con il risultato effettivo."],
  ];
  return (
    <section className="bg-[#f4f9ff] py-24 sm:py-28" id="altre-letture">
      <div className={wrap}>
        <Heading
          tag="In demo"
          tone="coral"
          title="Le altre letture, sui tuoi dati."
          body={<p>Ci sono analisi che hanno senso solo con i numeri veri dello showroom. Non le mostriamo con dati inventati: le vediamo insieme in demo, partendo dalla tua configurazione.</p>}
        />
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2" gap={0.06}>
          {items.map(([t, b]) => (
            <StaggerItem key={t}>
              <div className="h-full rounded-[24px] border border-[#e4eef8] bg-white p-6">
                <h3 className="text-xl font-bold tracking-[-0.035em] text-[#102744]">{t}</h3>
                <p className="mt-2 text-[15px] leading-7 text-[#557090]">{b}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <a href={routes.margini} className={`group flex flex-col rounded-[28px] border border-[#cfe1f4] bg-white p-7 transition-transform hover:-translate-y-1 ${focusRing}`}>
            <span className="text-[11px] font-bold tracking-[0.12em] text-[#0b55c6]">IL MARGINE DELLA SINGOLA COMMESSA</span>
            <strong className="mt-3 text-2xl font-bold tracking-[-0.04em] text-[#102744]">Margini di commessa</strong>
            <span className="mt-2 text-sm leading-6 text-[#557090]">Riga per riga, nella Schedina cliente.</span>
            <ArrowRight className="mt-5 h-4 w-4 text-[#cf4a2b] transition-transform group-hover:translate-x-1" aria-hidden />
          </a>
          <a href={routes.prezzi} className={`group flex flex-col rounded-[28px] bg-[#082c68] p-7 text-white shadow-[0_24px_60px_rgba(8,44,104,.22)] transition-transform hover:-translate-y-1 ${focusRing}`}>
            <span className="text-[11px] font-bold tracking-[0.12em] text-[#9fe0ff]">PASSO SUCCESSIVO</span>
            <strong className="mt-3 text-2xl font-bold tracking-[-0.04em]">Prezzi e piani</strong>
            <span className="mt-2 text-sm leading-6 text-[#d5ebff]">Piani e costi di Totalone, con il calcolatore per il tuo showroom.</span>
            <ArrowRight className="mt-5 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PAGINA                                                              */
/* ------------------------------------------------------------------ */

export function ControlloPerformanceProductPage() {
  useSeo({
    title: "KPI e controllo vendite per negozi di arredamento",
    description: "Pipeline trattative, venduto, conversione dei preventivi, acconti e lavoro del team: i numeri dello showroom di arredamento letti per sede e venditore con Totalone.",
    path: routes.controllo,
  });

  return (
    <MarketingShell active="controllo" overlayHeader>
      <main id="top" className="overflow-x-clip font-['DM_Sans',ui-sans-serif,system-ui,sans-serif] text-[#102744] [&_[id]]:scroll-mt-24">
        <Hero />
        <Venditori />
        <Preventivi />
        <Incassi />
        <Team />
        <AltreLetture />
        <ProcessoStrip current="controllo" />
      </main>
    </MarketingShell>
  );
}
