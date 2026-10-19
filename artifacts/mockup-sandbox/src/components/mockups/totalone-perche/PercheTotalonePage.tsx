import { type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Check,
  DatabaseZap,
  GraduationCap,
  KeyRound,
  Minus,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { MarketingShell, openDemo } from "../totalone-site-architecture/_shared/MarketingShell";
import { Reveal, SpotlightCard, Stagger, StaggerItem, WordReveal, tpEase } from "@/components/totalone/motion-kit";
import { ConvergenceVisual, LifecycleRail } from "@/components/totalone/pages/perche/PercheVisuals";
import { ProcessoStrip } from "@/components/totalone/site/ProcessoStrip";
import { glossario, routes } from "@/components/totalone/site/siteRoutes";
import { useSeo } from "@/components/totalone/site/useSeo";

const SEO = {
  title: "Perché Totalone: il gestionale verticale per l'arredamento",
  description:
    "Perché Totalone esiste, in cosa è diverso da un gestionale o CRM generico e come si lavora insieme: avvio, migrazione dei dati, formazione e autonomia.",
};

const wrap = "mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10";
const h2Base = "text-5xl font-bold leading-[.95] tracking-[-0.065em] sm:text-7xl";
const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1769d5]";

/* ------------------------------------------------------------------ */
/* Contenuti                                                           */
/* ------------------------------------------------------------------ */

const dailyQuestions = [
  "A che punto è il preventivo di Casa Bianchi?",
  "L'acconto è stato pagato?",
  "La merce è arrivata? In quanti colli?",
  "Chi va al montaggio, e cosa deve portare?",
  "Quell'assistenza è stata risolta?",
];

/** Confronto: situazioni tipiche di uno strumento generico vs Totalone. */
const comparison: [string, string, string][] = [
  ["Ingresso in showroom", "Spesso non previsto: il visitatore resta su un foglio o nella memoria di chi l'ha accolto.", "Ingresso registrato con showroom, orario, venditore e motivo della visita, pronto a diventare lead."],
  ["Preventivo", "Righe di prodotto generiche, oppure un file a parte da tenere allineato.", "Preventivatore con sezioni per cucine, sistemi, arredamento e montaggio, versioni e PDF impaginato."],
  ["Dopo il sì del cliente", "I dati si ricopiano in un altro strumento per partire con ordini e consegne.", "Il preventivo convertito crea da solo la trattativa e la Schedina cliente."],
  ["Acconti e saldo", "Seguiti in un foglio di calcolo, scollegati dalla vendita.", "Preventivato, venduto, acconti e saldo nella trattativa, fino a Finalizzato."],
  ["Merce e arrivi", "Ordini e arrivi senza legame con il cliente a cui appartengono.", "Ogni prodotto della Schedina cliente ha il suo stato d'ordine (Da ordinare, Ordinato, Arrivato), con colli e arrivi."],
  ["Montaggio", "Calendario a parte, rapportino su carta.", "Montaggi in calendario con cliente e squadra, rapportino di fine lavoro con note e foto."],
  ["Assistenza", "Richieste via messaggio, senza storico del prodotto.", "Assistenze legate a cliente e prodotto, con stato: Da gestire, In gestione, Risolta."],
];

const definitions: [string, string][] = [
  ["Lead", "Il cliente prima del preventivo. Avanza nella pipeline del CRM: contatto iniziale, qualifica, appuntamento, preventivo."],
  ["Preventivo", "La proposta, con le sue versioni. Quando il cliente accetta, il preventivo viene convertito."],
  ["Trattativa", "Nasce in automatico dal preventivo convertito: preventivato, venduto, acconti e saldo, da In trattativa a Finalizzato."],
  ["Schedina cliente", "Nasce insieme alla trattativa ed è il fascicolo della commessa: prodotti, margini, fattura, ordine, colli, documenti, note e assistenza."],
];

const together: [string, string, string, LucideIcon][] = [
  ["01", "Avvio", "Partiamo da come lavorate oggi: showroom, persone, ruoli e passaggi. Su questa base si configurano sedi, utenti e permessi.", Rocket],
  ["02", "Migrazione dei dati", "Decidiamo insieme quali dati portare, per esempio clienti e anagrafiche, e in che modo, per non ripartire da zero.", DatabaseZap],
  ["03", "Formazione", "Ognuno impara la parte che usa: chi vende, chi segue l'ufficio, chi gestisce magazzino e montaggi.", GraduationCap],
  ["04", "Autonomia", "Dopo l'avvio, utenti, sedi e configurazioni quotidiane li gestisci tu. Per le esigenze nuove ne parliamo insieme.", KeyRound],
];

const principles: [string, string, string][] = [
  ["01", "Il dato si scrive una volta.", "Quello che entra nel preventivo arriva a trattativa, Schedina cliente, ordini e montaggio senza essere ricopiato."],
  ["02", "Il processo prima della funzione.", "Ogni schermata esiste perché serve a un passaggio preciso del lavoro, nell'ordine in cui accade."],
  ["03", "Le parole del settore.", "Showroom, preventivo, Schedina cliente, colli, rapportino: il gestionale parla come parla il tuo team."],
  ["04", "Il tempo del team conta.", "Ogni volta che non serve cercare, copiare o chiedere, quel tempo torna al lavoro con i clienti."],
];

/* ------------------------------------------------------------------ */
/* Primitive                                                           */
/* ------------------------------------------------------------------ */

function Tag({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "coral" | "amber" | "dark" }) {
  const tones = {
    blue: "bg-[#dcecff] text-[#0b55c6]",
    coral: "bg-[#ffdcd2] text-[#a33a22]",
    amber: "bg-[#fff2dd] text-[#8a4f0f]",
    dark: "bg-[#2b75cb] text-[#e8f5ff]",
  };
  return (
    <Reveal y={10}>
      <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${tones[tone]}`}>{children}</span>
    </Reveal>
  );
}

function DemoButton({ children, light = false }: { children: ReactNode; light?: boolean }) {
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
      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </motion.button>
  );
}

function Lead({ children, light = false, className = "" }: { children: ReactNode; light?: boolean; className?: string }) {
  return (
    <Reveal delay={0.1} className={className}>
      <div className={`space-y-4 text-base leading-7 sm:text-lg sm:leading-8 ${light ? "text-[#d5ebff]" : "text-[#557090]"}`}>{children}</div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Confronto generico vs verticale                                     */
/* ------------------------------------------------------------------ */

function ComparisonTable() {
  return (
    <div className="mt-14 overflow-hidden rounded-[32px] border border-[#e4eef8] bg-white shadow-[0_24px_60px_rgba(16,39,68,.06)]">
      {/* Intestazione (da md) */}
      <div className="hidden grid-cols-[.7fr_1fr_1fr] md:grid">
        <span className="px-7 py-5 text-[11px] font-bold tracking-[0.12em] text-[#557090]">PASSAGGIO</span>
        <span className="border-l border-[#e4eef8] bg-[#f4f9ff] px-7 py-5 text-[11px] font-bold tracking-[0.12em] text-[#557090]">GESTIONALE O CRM GENERICO</span>
        <span className="bg-[#082c68] px-7 py-5 text-[11px] font-bold tracking-[0.12em] text-[#9fe0ff]">TOTALONE</span>
      </div>
      <Stagger className="divide-y divide-[#e4eef8]" gap={0.05}>
        {comparison.map(([step, generic, totalone]) => (
          <StaggerItem key={step}>
            <div className="grid md:grid-cols-[.7fr_1fr_1fr]">
              <h3 className="px-6 pb-2 pt-6 text-base font-bold tracking-[-0.02em] text-[#102744] md:px-7 md:py-6">{step}</h3>
              <p className="flex items-start gap-3 bg-[#f4f9ff] px-6 py-4 text-sm leading-6 text-[#557090] md:border-l md:border-[#e4eef8] md:px-7 md:py-6">
                <Minus aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#8aa3bd]" />
                <span><span className="sr-only">Generico: </span><span className="font-bold text-[#557090] md:hidden">Generico · </span>{generic}</span>
              </p>
              <p className="flex items-start gap-3 bg-[#082c68] px-6 py-4 text-sm font-semibold leading-6 text-white md:px-7 md:py-6">
                <span aria-hidden="true" className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#9fe0ff] text-[#082c68]"><Check className="h-3 w-3" /></span>
                <span><span className="sr-only">Totalone: </span><span className="font-bold text-[#9fe0ff] md:hidden">Totalone · </span>{totalone}</span>
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PAGINA                                                              */
/* ------------------------------------------------------------------ */

export function PercheTotalonePage() {
  useSeo({ ...SEO, path: routes.perche });

  return (
    <MarketingShell
      active="perche"
      overlayHeader
      closingTitle="Vediamo se Totalone fa per il tuo showroom."
      closingText="Partiamo da una tua commessa reale e dal modo in cui lavorate oggi: avvio, dati da portare e persone da coinvolgere."
    >
      <main id="top" className="overflow-x-clip bg-[#fbfdff] text-[#102744]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {/* 1 · HERO */}
        <section className="relative overflow-hidden bg-[linear-gradient(116deg,#082c68_0%,#0d56bf_54%,#1387ee_100%)] pb-24 pt-32 text-white sm:pb-32 sm:pt-40">
          <motion.div aria-hidden="true" className="absolute -right-20 top-10 h-[420px] w-[420px] rounded-full bg-[#75d7ff]/30 blur-3xl" animate={{ x: [0, -60, 0], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div aria-hidden="true" className="absolute -left-28 bottom-0 h-[380px] w-[380px] rounded-full bg-[#f36b4d]/20 blur-3xl" animate={{ x: [0, 50, 0], y: [0, -30, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
          <div className={`relative ${wrap} grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-10`}>
            <div>
              <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: tpEase }} className="inline-flex items-center gap-2 rounded-full border border-[#8ecbff] bg-[#5abaff]/20 px-3.5 py-2 text-xs font-bold tracking-[0.08em] text-[#eff8ff]">
                <span aria-hidden="true" className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9fe0ff] opacity-75 motion-reduce:animate-none" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#9fe0ff]" /></span>
                PERCHÉ TOTALONE
              </motion.span>
              <h1 className="mt-7 text-[clamp(2.9rem,6.4vw,6rem)] font-bold leading-[.93] tracking-[-0.075em]">
                <WordReveal text="Il gestionale che parte dall’arredamento." />
                <br />
                <WordReveal text="Non dal software." className="text-[#9fe0ff]" delay={0.35} />
              </h1>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: tpEase, delay: 0.5 }}>
                <p className="mt-7 max-w-xl text-lg leading-8 text-[#e5f3ff]">Perché Totalone esiste, in cosa è diverso da un gestionale generico e come si lavora insieme, dall'avvio fino a quando il team è autonomo.</p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <DemoButton light>Prenota una demo</DemoButton>
                  <a href="#confronto" className="group inline-flex items-center gap-2 px-2 text-sm font-bold text-white hover:text-[#d0e8ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                    Generico o verticale? <ArrowDown aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                  </a>
                </div>
              </motion.div>
            </div>
            <ConvergenceVisual />
          </div>
        </section>

        {/* 2 · PERCHÉ ESISTE */}
        <section className="bg-[#fffaf7] py-24 sm:py-32" aria-labelledby="esiste-title">
          <div className={`${wrap} grid items-center gap-12 lg:grid-cols-2 lg:gap-20`}>
            <div>
              <Tag tone="coral">PERCHÉ ESISTE</Tag>
              <h2 id="esiste-title" className={`mt-6 ${h2Base}`}><WordReveal text="Nato dal lavoro di tutti i giorni in showroom." /></h2>
              <Lead className="mt-7 max-w-xl">
                <p>Totalone è stato costruito partendo dai processi reali di chi vende e gestisce arredamento, non da un modello generico da adattare al settore.</p>
                <p>In uno showroom una vendita dura settimane o mesi: passa da più persone, più versioni del preventivo, più fornitori e più consegne. Gli strumenti generici reggono il singolo passaggio. Totalone tiene insieme il filo.</p>
              </Lead>
            </div>
            <Reveal y={30}>
              <div className="rounded-[32px] border border-[#f6d9cf] bg-white p-7 shadow-[0_24px_60px_rgba(195,77,53,.08)] sm:p-10">
                <span className="text-[11px] font-bold tracking-[0.14em] text-[#a33a22]">LE DOMANDE DI OGNI GIORNO</span>
                <ul className="mt-5 divide-y divide-[#f6e4dd]">
                  {dailyQuestions.map((q) => (
                    <li key={q} className="py-3.5 text-lg font-bold leading-6 tracking-[-0.03em] text-[#102744] sm:text-xl">{q}</li>
                  ))}
                </ul>
                <p className="mt-6 rounded-[20px] bg-[#082c68] px-5 py-4 text-sm font-semibold leading-6 text-white">Totalone è pensato per rispondere a queste domande senza dover chiedere a nessuno.</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 3 · GENERICO VS VERTICALE */}
        <section className="bg-[#fbfdff] py-24 sm:py-32" id="confronto" aria-labelledby="confronto-title">
          <div className={wrap}>
            <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end lg:gap-20">
              <div>
                <Tag>GENERICO O VERTICALE</Tag>
                <h2 id="confronto-title" className={`mt-6 ${h2Base}`}><WordReveal text="Stesse attività. Strumenti diversi." /></h2>
              </div>
              <Lead><p>Un gestionale o un CRM generico si può adattare, ma ogni adattamento resta a carico tuo. Ecco cosa cambia, passaggio per passaggio.</p></Lead>
            </div>
            <ComparisonTable />
            <p className="mt-4 text-xs font-semibold text-[#557090]">Il confronto descrive situazioni tipiche, non un prodotto specifico.</p>
          </div>
        </section>

        {/* 4 · IL FLUSSO, NELL'ORDINE GIUSTO */}
        <section className="relative overflow-hidden bg-[linear-gradient(120deg,#082652,#0b4fae)] py-24 text-white sm:py-32" aria-labelledby="flusso-title">
          <motion.div aria-hidden="true" className="absolute -right-32 top-10 h-[500px] w-[500px] rounded-full bg-[#1387ee]/30 blur-3xl" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
          <div className={`relative ${wrap}`}>
            <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end lg:gap-20">
              <div>
                <Tag tone="dark">LE PAROLE GIUSTE</Tag>
                <h2 id="flusso-title" className={`mt-6 ${h2Base}`}><WordReveal text="Ogni fase ha un nome. E un ordine preciso." /></h2>
              </div>
              <Lead light><p>In Totalone le parole del lavoro hanno un significato preciso. La commessa è la vendita seguita fino alla consegna, e il suo strumento è la Schedina cliente.</p></Lead>
            </div>
            <Reveal className="mt-16" y={30}><LifecycleRail items={[...glossario.flusso]} /></Reveal>
            <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
              {definitions.map(([term, def], i) => (
                <StaggerItem key={term} className="h-full">
                  <article className="h-full rounded-[28px] border border-white/15 bg-white/[0.07] p-6 backdrop-blur-sm">
                    <span className="font-mono text-xs font-bold text-[#9fe0ff]">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-6 text-2xl font-bold tracking-[-0.04em]">{term}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#d5ebff]">{def}</p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* 5 · COME SI LAVORA INSIEME */}
        <section className="border-b border-[#cfe1f4] bg-[#eff7ff] py-24 sm:py-32" id="insieme" aria-labelledby="insieme-title">
          <div className={wrap}>
            <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end lg:gap-20">
              <div>
                <Tag tone="amber">COME SI LAVORA INSIEME</Tag>
                <h2 id="insieme-title" className={`mt-6 ${h2Base}`}><WordReveal text="Cambiare gestionale, senza fermare lo showroom." /></h2>
              </div>
              <Lead><p>È la domanda vera di chi cambia strumento. Il percorso si costruisce sulla tua azienda: queste sono le tappe.</p></Lead>
            </div>
            <Stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4" gap={0.1}>
              {together.map(([num, title, body, Icon]) => (
                <StaggerItem key={num} className="h-full">
                  <div className="h-full">
                    <SpotlightCard className="h-full rounded-[28px] border border-[#e4eef8] bg-white p-7 shadow-[0_1px_4px_rgba(2,8,23,.04)]">
                      <div className="flex items-center justify-between">
                        <span aria-hidden="true" className="font-mono text-5xl font-bold tracking-[-0.06em] text-[#d6e6f6]">{num}</span>
                        <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#eff7ff] text-[#1769d5]"><Icon className="h-5 w-5" /></span>
                      </div>
                      <h3 className="mt-8 text-xl font-bold tracking-[-0.02em] text-[#102744]">{title}</h3>
                      <p className="mt-3 text-sm leading-6 text-[#557090]">{body}</p>
                    </SpotlightCard>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal>
              <div className="mt-10 flex flex-col gap-5 rounded-[24px] bg-white p-6 ring-1 ring-[#e4eef8] sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <p className="max-w-xl text-sm font-semibold leading-6 text-[#245b96]">Tempi e passaggi dipendono da sedi, persone e dati da portare. Li definiamo insieme, partendo da una tua commessa.</p>
                <DemoButton>Prenota una demo</DemoButton>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 6 · PRINCIPI */}
        <section className="bg-[#fbfdff] py-24 sm:py-32" aria-labelledby="principi-title">
          <div className={wrap}>
            <Tag tone="coral">PRINCIPI</Tag>
            <h2 id="principi-title" className={`mt-6 max-w-4xl ${h2Base}`}><WordReveal text="Come pensiamo il prodotto." /></h2>
            <Stagger className="mt-14 grid gap-4 sm:grid-cols-2" gap={0.08}>
              {principles.map(([num, title, body]) => (
                <StaggerItem key={num} className="h-full">
                  <article className="flex h-full gap-5 rounded-[28px] border border-[#e4eef8] bg-white p-7">
                    <span aria-hidden="true" className="font-mono text-xs font-bold text-[#0b55c6]">{num}</span>
                    <div>
                      <h3 className="text-2xl font-bold leading-[1.05] tracking-[-0.04em] text-[#102744]">{title}</h3>
                      <p className="mt-3 text-sm leading-6 text-[#557090]">{body}</p>
                      {num === "04" && (
                        <a href={routes.calcolatore} className={`group mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#0b55c6] hover:text-[#b93f23] ${focusRing}`}>
                          Calcola il valore del tempo recuperato <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      )}
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal>
              <p className="mt-10 flex items-center gap-2 text-sm font-semibold text-[#557090]">
                <BookOpen aria-hidden="true" className="h-4 w-4 text-[#1769d5]" />
                Vuoi approfondire?{" "}
                <a href={routes.risorse} className={`font-bold text-[#0b55c6] underline decoration-[#9fc4ee] underline-offset-4 hover:text-[#b93f23] ${focusRing}`}>Leggi le guide nelle Risorse</a>
              </p>
            </Reveal>
          </div>
        </section>

        {/* 7 · LE AREE */}
        <ProcessoStrip title="Scopri ogni area di Totalone." />
      </main>
    </MarketingShell>
  );
}
