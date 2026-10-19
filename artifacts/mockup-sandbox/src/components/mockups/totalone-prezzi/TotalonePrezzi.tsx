import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Calculator,
  ChevronDown,
  Clock,
  Database,
  FileText,
  Layers,
  MonitorPlay,
  SlidersHorizontal,
  TrendingUp,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem, WordReveal, tpEase } from "@/components/totalone/motion-kit";
import { routes } from "@/components/totalone/site/siteRoutes";
import { useSeo } from "@/components/totalone/site/useSeo";
import { MarketingShell, ShellButton, ShellTag, openDemo } from "../totalone-site-architecture/_shared/MarketingShell";

/** Settimane lavorative in un anno, al netto di ferie e festività. */
const WORK_WEEKS = 46;
/** Oltre questa soglia il rapporto valore/costo non viene mostrato come numero esatto. */
const RATIO_CAP = 10;

// "always": anche 9.000 € con il separatore (in it-IT di default sotto 10.000 non c'è).
const euro = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0, useGrouping: "always" } as unknown as Intl.NumberFormatOptions);
const formatEuro = (value: number) => euro.format(Math.max(0, Math.round(value)));
const formatSignedEuro = (value: number) => `${value < 0 ? "−" : "+"}${euro.format(Math.abs(Math.round(value)))}`;

/* ------------------------------------------------------------------ */
/* Primitive del calcolatore                                           */
/* ------------------------------------------------------------------ */

/** Numero in euro che scorre morbido verso il nuovo valore. */
function AnimatedEuro({ value, className, live = false }: { value: number; className?: string; live?: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const current = useRef(0);
  const [display, setDisplay] = useState(formatEuro(0));
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { rootMargin: "-40px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!seen) return;
    if (reduce) {
      current.current = value;
      setDisplay(formatEuro(value));
      return;
    }
    const controls = animate(current.current, value, {
      duration: 0.9,
      ease: tpEase,
      onUpdate: (v) => {
        current.current = v;
        setDisplay(formatEuro(v));
      },
    });
    return () => controls.stop();
  }, [value, seen, reduce]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`} aria-live={live ? "polite" : undefined}>
      {display}
    </span>
  );
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Campo numerico con bozza testuale: si può svuotare e riscrivere il valore
 * senza che torni subito al minimo. Il valore viene limitato all'intervallo.
 */
function NumberInput({
  id,
  value,
  min,
  max,
  step,
  onChange,
  className,
  ariaLabel,
}: {
  id?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  className: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState(String(value));
  useEffect(() => {
    if (document.activeElement !== ref.current) setDraft(String(value));
  }, [value]);
  return (
    <input
      ref={ref}
      id={id}
      type="number"
      inputMode="decimal"
      min={min}
      max={max}
      step={step}
      value={draft}
      aria-label={ariaLabel}
      onChange={(event) => {
        setDraft(event.target.value);
        const parsed = Number.parseFloat(event.target.value.replace(",", "."));
        if (Number.isFinite(parsed)) onChange(clamp(parsed, min, max));
      }}
      onBlur={() => setDraft(String(value))}
      className={className}
    />
  );
}

/** Campo del calcolatore: valore editabile + slider. */
function Field({
  label,
  hint,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const id = `calc-${label.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <div className="rounded-[22px] border border-[#e4eef8] bg-[#fbfdff] p-4 transition-colors focus-within:border-[#1769d5] hover:border-[#cfe1f4] sm:p-5">
      <label htmlFor={id} className="flex min-h-[2.5rem] items-start text-sm font-bold leading-5 text-[#183858]">
        {label}
      </label>
      <NumberInput
        id={id}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        className="mt-2 w-full min-w-0 bg-transparent text-3xl font-bold tracking-[-0.04em] text-[#102744] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <span className="block text-[10px] font-bold uppercase tracking-[.12em] text-[#557090]">{hint}</span>
      <input
        type="range"
        aria-label={`${label} (${hint})`}
        min={min}
        max={max}
        step={step}
        value={clamp(value, min, max)}
        onChange={(event) => onChange(Number(event.target.value))}
        className="tp-range mt-3 h-6 w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-none"
        style={{ ["--pct" as string]: `${pct}%` }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Contenuti                                                           */
/* ------------------------------------------------------------------ */

const factors: [LucideIcon, string, string][] = [
  [Building2, "Sedi e showroom", "Quanti punti vendita lavorano su Totalone e come sono organizzati tra loro."],
  [UsersRound, "Persone e ruoli", "Quante persone lo usano ogni giorno: vendita, ufficio, magazzino, montaggi."],
  [Layers, "Aree che usate", "Le parti del flusso che vi servono, dalle vendite alle commesse fino a magazzino, montaggi e assistenza."],
  [Database, "Avvio e passaggio dei dati", "La configurazione iniziale e, se serve, il passaggio dei dati da Excel o da un altro gestionale."],
];

const steps: [LucideIcon, string, string][] = [
  [MonitorPlay, "Demo su un caso reale", "Ti mostriamo Totalone partendo da una vostra commessa tipo, non da una presentazione generica."],
  [SlidersHorizontal, "Configurazione insieme", "Definiamo sedi, persone e aree che servono, e da dove ha senso partire."],
  [FileText, "La tua proposta", "Ricevi il preventivo costruito su quello che abbiamo definito insieme."],
];

const faqs: [string, string][] = [
  ["Perché non c’è un listino pubblico?", "Perché il prezzo dipende da come lavorate: numero di sedi, persone che usano Totalone, aree del gestionale che vi servono e come avviene l’avvio. Lo definiamo dopo la demo, sulla vostra configurazione reale."],
  ["Il risultato del calcolatore è un’offerta?", "No. È una stima indicativa costruita sui numeri che inserisci tu. Serve a capire l’ordine di grandezza del valore in gioco, non sostituisce la proposta e non è una promessa di risultato."],
  ["Possiamo partire solo da alcune aree?", "Le aree che usate sono uno dei fattori che consideriamo. In demo vediamo insieme da dove ha senso partire per il vostro modo di lavorare."],
  ["L’avvio e il passaggio dei dati come vengono considerati?", "Sono tra i fattori della proposta: dipendono da dove partite (Excel, un altro gestionale, fogli separati) e da quanti dati volete portare. Li definiamo insieme prima del preventivo."],
  ["Abbiamo più showroom: cambia qualcosa?", "Il numero di sedi entra nella valutazione. In demo vediamo come organizzarle nello stesso sistema, con clienti, preventivi e commesse leggibili per sede."],
  ["Come si arriva al preventivo?", "Prenota una demo. Partiamo da una vostra commessa, definiamo insieme la configurazione e poi ti inviamo la proposta."],
];

/* ------------------------------------------------------------------ */
/* PAGINA                                                              */
/* ------------------------------------------------------------------ */

export function TotalonePrezzi() {
  useSeo({
    title: "Prezzi del gestionale per l'arredamento",
    description: "Come si costruisce il prezzo di Totalone: sedi, persone, aree usate e avvio. Stima con il calcolatore il valore del tempo e dei preventivi recuperati.",
    path: routes.prezzi,
  });

  // Valori di esempio: vanno sostituiti con i propri.
  const [team, setTeam] = useState(8);
  const [hoursSaved, setHoursSaved] = useState(2);
  const [hourValue, setHourValue] = useState(30);
  const [quotes, setQuotes] = useState(20);
  const [averageMargin, setAverageMargin] = useState(1250);
  const [closeRate, setCloseRate] = useState(3);
  const [annualFee, setAnnualFee] = useState(0);
  const [setupCost, setSetupCost] = useState(0);
  const [costOpen, setCostOpen] = useState(false);

  const result = useMemo(() => {
    const annualTimeValue = team * hoursSaved * hourValue * WORK_WEEKS;
    const annualQuoteValue = quotes * (closeRate / 100) * averageMargin * 12;
    const annualBenefit = annualTimeValue + annualQuoteValue;
    const firstYearCost = annualFee + setupCost;
    const ratio = firstYearCost > 0 ? annualBenefit / firstYearCost : null;
    const firstYearDelta = firstYearCost > 0 ? annualBenefit - firstYearCost : null;
    return { annualTimeValue, annualQuoteValue, annualBenefit, ratio, firstYearDelta };
  }, [annualFee, averageMargin, closeRate, hourValue, hoursSaved, quotes, setupCost, team]);

  const timeShare = result.annualBenefit > 0 ? (result.annualTimeValue / result.annualBenefit) * 100 : 50;

  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: "start", behavior: "instant" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <MarketingShell active="prezzi" overlayHeader>
      <main className="bg-[#fbfdff] text-[#102744]">
        <style>{`
          .tp-range::-webkit-slider-runnable-track{height:6px;border-radius:999px;background:linear-gradient(90deg,#1769d5 0,#1769d5 var(--pct),#dcecff var(--pct),#dcecff 100%)}
          .tp-range::-moz-range-track{height:6px;border-radius:999px;background:#dcecff}
          .tp-range::-moz-range-progress{height:6px;border-radius:999px;background:#1769d5}
          .tp-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;margin-top:-8px;height:22px;width:22px;border-radius:999px;background:#fff;border:2px solid #1769d5;box-shadow:0 4px 12px rgba(23,105,213,.3);transition:transform .2s cubic-bezier(.16,1,.3,1)}
          .tp-range::-moz-range-thumb{height:18px;width:18px;border-radius:999px;background:#fff;border:2px solid #1769d5;box-shadow:0 4px 12px rgba(23,105,213,.3)}
          .tp-range:hover::-webkit-slider-thumb,.tp-range:active::-webkit-slider-thumb{transform:scale(1.15)}
          .tp-range:focus-visible::-webkit-slider-thumb{outline:3px solid rgba(23,105,213,.35);outline-offset:2px}
          .tp-range:focus-visible::-moz-range-thumb{outline:3px solid rgba(23,105,213,.35);outline-offset:2px}
        `}</style>

        {/* HERO */}
        <section className="relative overflow-hidden bg-[linear-gradient(116deg,#082c68_0%,#0d56bf_54%,#1387ee_100%)] pb-24 pt-36 text-white sm:pb-28 sm:pt-44">
          <motion.div aria-hidden className="absolute -right-20 top-20 h-[420px] w-[420px] rounded-full bg-[#75d7ff]/30 blur-3xl" animate={{ x: [0, -60, 0], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div aria-hidden className="absolute -left-28 bottom-0 h-[380px] w-[380px] rounded-full bg-[#f36b4d]/20 blur-3xl" animate={{ x: [0, 50, 0], y: [0, -30, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
          <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: tpEase }} className="inline-flex items-center gap-2 rounded-full border border-[#8ecbff] bg-[#5abaff]/20 px-3.5 py-2 text-xs font-bold tracking-[0.08em] text-[#eff8ff]">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9fe0ff] opacity-75 motion-reduce:animate-none" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#9fe0ff]" /></span>
              PREZZI
            </motion.span>
            <h1 className="mt-7 max-w-5xl text-[clamp(2.5rem,7vw,6.2rem)] font-bold leading-[.92] tracking-[-0.075em]">
              <WordReveal text="Il prezzo si costruisce sulla tua azienda." />
              <br />
              <WordReveal text="Il ritorno, sulla tua operatività." className="text-[#9fe0ff]" delay={0.35} />
            </h1>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: tpEase, delay: 0.5 }}>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#e5f3ff]">La proposta parte da come lavorate: sedi, persone, aree del gestionale e avvio. Intanto puoi stimare quanto tempo e quanti preventivi in più può recuperare il tuo team.</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ShellButton light>Prenota una demo</ShellButton>
                <ShellButton href="#calcolatore" ghost icon={false}><Calculator className="h-4 w-4" /> Stima il valore</ShellButton>
                <button type="button" onClick={openDemo} className="group inline-flex items-center gap-2 px-2 py-2 text-sm font-bold text-white hover:text-[#d0e8ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  Richiedi un preventivo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* COSA DETERMINA IL PREZZO + PERCORSO */}
        <section className="bg-[#fffaf7] py-20 sm:py-28" aria-labelledby="fattori-title">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-end lg:gap-20">
              <div>
                <ShellTag tone="coral">COSA DETERMINA IL PREZZO</ShellTag>
                <h2 id="fattori-title" className="mt-6 max-w-2xl text-[clamp(2.4rem,8.5vw,4.5rem)] font-bold leading-[.95] tracking-[-0.065em]"><WordReveal text="I fattori che consideriamo." /></h2>
              </div>
              <Reveal delay={0.1}><p className="max-w-lg text-base leading-7 text-[#557090]">Non sono scaglioni di un listino: sono gli elementi che valutiamo con te per costruire una proposta sulla vostra configurazione reale.</p></Reveal>
            </div>
            <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
              {factors.map(([Icon, title, body], i) => (
                <StaggerItem key={title} className="h-full">
                  <div className="h-full rounded-[28px] border border-[#f1dcd3] bg-white p-6 shadow-[0_1px_4px_rgba(2,8,23,.04)]">
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#fff1ec] text-[#c34d35]"><Icon className="h-5 w-5" /></span>
                      <span aria-hidden className="font-mono text-xs font-bold text-[#c98a79]">0{i + 1}</span>
                    </div>
                    <h3 className="mt-8 text-lg font-bold tracking-[-0.02em] text-[#102744]">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#557090]">{body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <div className="mt-16 rounded-[32px] border border-[#cfe1f4] bg-white p-6 sm:p-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0b55c6]">Come arrivi alla proposta</p>
              <ol className="mt-6 grid gap-6 md:grid-cols-3 md:gap-8">
                {steps.map(([Icon, title, body], i) => (
                  <li key={title} className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#dcecff] text-[#0b55c6]"><Icon className="h-[18px] w-[18px]" /></span>
                    <div>
                      <h3 className="text-base font-bold text-[#102744]"><span className="mr-1.5 font-mono text-xs text-[#557090]">{i + 1}.</span>{title}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-[#557090]">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-8"><ShellButton>Prenota una demo</ShellButton></div>
            </div>
          </div>
        </section>

        {/* CALCOLATORE */}
        <section className="scroll-mt-20 bg-[#fbfdff] py-20 sm:py-28" id="calcolatore" aria-labelledby="calcolatore-title">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-end lg:gap-20">
              <div>
                <ShellTag>CALCOLATORE</ShellTag>
                <h2 id="calcolatore-title" className="mt-6 max-w-2xl text-[clamp(2.4rem,8.5vw,4.5rem)] font-bold leading-[.95] tracking-[-0.065em]"><WordReveal text="Quanto valore può tornare al tuo team?" /></h2>
              </div>
              <Reveal delay={0.1}><p className="max-w-lg text-base leading-7 text-[#557090]">Due leve: il tempo che il team smette di perdere tra file e richieste, e i preventivi in più che si chiudono grazie a un follow-up ordinato. I valori di partenza sono esempi: sostituiscili con i tuoi.</p></Reveal>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-[1.25fr_.75fr] lg:items-start">
              {/* Input */}
              <Reveal y={30}>
                <div className="rounded-[32px] border border-[#cfe1f4] bg-white p-5 shadow-[0_24px_60px_rgba(16,39,68,.06)] sm:p-8">
                  <div className="flex items-start justify-between gap-5">
                    <div><p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#0b55c6]">I TUOI DATI</p><h3 className="mt-2 text-2xl font-bold tracking-[-0.045em] text-[#102744]">Costruiamo la stima</h3></div>
                    <span aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-[#dcecff] text-[#1769d5]"><Calculator className="h-5 w-5" /></span>
                  </div>

                  <p className="mt-8 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#557090]"><Clock className="h-3.5 w-3.5 text-[#1769d5]" /> Tempo recuperato</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <Field label="Persone coinvolte" hint="persone" value={team} min={1} max={60} onChange={setTeam} />
                    <Field label="Ore recuperate a persona" hint="ore / settimana" value={hoursSaved} min={0} max={10} step={0.5} onChange={setHoursSaved} />
                    <Field label="Costo medio di un’ora" hint="€ / ora" value={hourValue} min={15} max={100} onChange={setHourValue} />
                  </div>

                  <p className="mt-8 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#557090]"><TrendingUp className="h-3.5 w-3.5 text-[#cf4a2b]" /> Preventivi recuperati</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <Field label="Preventivi emessi" hint="al mese" value={quotes} min={1} max={150} onChange={setQuotes} />
                    <Field label="Preventivi in più chiusi" hint="% · tua ipotesi" value={closeRate} min={0} max={15} step={0.5} onChange={setCloseRate} />
                    <Field label="Margine medio" hint="€ / commessa" value={averageMargin} min={0} max={20000} step={50} onChange={setAverageMargin} />
                  </div>
                </div>
              </Reveal>

              {/* Risultato */}
              <Reveal y={30} delay={0.1} className="lg:sticky lg:top-24">
                <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(150deg,#082c68,#0b55c6)] p-7 text-white shadow-[0_30px_80px_rgba(8,44,104,.30)] sm:p-8">
                  <motion.div aria-hidden className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#1387ee]/50 blur-3xl" animate={{ x: [0, -30, 0], y: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
                  <div className="relative">
                    <p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#9fe0ff]">VALORE ANNUO STIMATO</p>
                    <p className="mt-1 text-xs text-[#d5ebff]">tempo + preventivi recuperati</p>
                    <AnimatedEuro value={result.annualBenefit} live className="mt-5 block text-5xl font-bold tracking-[-0.06em] sm:text-6xl" />

                    <div className="mt-7 flex h-2.5 overflow-hidden rounded-full bg-white/10" aria-hidden>
                      <motion.span className="h-full bg-[#9fe0ff]" animate={{ width: `${timeShare}%` }} transition={{ duration: 0.7, ease: tpEase }} />
                      <motion.span className="h-full bg-[#f36b4d]" animate={{ width: `${100 - timeShare}%` }} transition={{ duration: 0.7, ease: tpEase }} />
                    </div>

                    <div className="mt-6 grid gap-3 text-sm text-[#d5ebff]">
                      <div className="flex items-center justify-between gap-4 rounded-[16px] bg-white/[0.07] px-4 py-3">
                        <span className="flex items-center gap-2"><span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#9fe0ff]" />Tempo recuperato</span>
                        <AnimatedEuro value={result.annualTimeValue} className="font-bold text-white" />
                      </div>
                      <div className="flex items-center justify-between gap-4 rounded-[16px] bg-white/[0.07] px-4 py-3">
                        <span className="flex items-center gap-2"><span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#f36b4d]" />Preventivi in più chiusi</span>
                        <AnimatedEuro value={result.annualQuoteValue} className="font-bold text-white" />
                      </div>
                    </div>
                    <p className="mt-5 text-[12px] leading-5 text-[#d5ebff]">Stima indicativa basata sui tuoi dati, non un’offerta.</p>
                  </div>
                </div>

                <div className="mt-4 rounded-[24px] border border-[#cfe1f4] bg-white">
                  <button type="button" onClick={() => setCostOpen((v) => !v)} aria-expanded={costOpen} aria-controls="calc-costi" className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-[#245b96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769d5]">
                    Hai già una proposta? Confronta il valore con il costo
                    <motion.span animate={{ rotate: costOpen ? 180 : 0 }} transition={{ duration: 0.25, ease: tpEase }} className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#eff7ff] text-[#1769d5]"><ChevronDown className="h-4 w-4" /></motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {costOpen && (
                      <motion.div id="calc-costi" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: tpEase }} className="overflow-hidden">
                        <div className="grid gap-3 px-5 pb-5">
                          {([
                            ["calc-canone", "Canone annuo", annualFee, setAnnualFee],
                            ["calc-avvio", "Costo di avvio una tantum", setupCost, setSetupCost],
                          ] as const).map(([id, label, value, set]) => (
                            <label key={id} htmlFor={id} className="block">
                              <span className="text-sm font-bold text-[#183858]">{label}</span>
                              <span className="mt-2 flex items-center gap-3 rounded-[14px] border border-[#c8dcf3] bg-white px-4 py-3 focus-within:border-[#1769d5] focus-within:ring-2 focus-within:ring-[#1769d5]/15">
                                <NumberInput id={id} value={value} min={0} max={1000000} step={100} onChange={set} className="w-full bg-transparent text-lg font-bold text-[#102744] outline-none" />
                                <span className="shrink-0 text-xs font-semibold text-[#557090]">€</span>
                              </span>
                            </label>
                          ))}
                          <AnimatePresence>
                            {result.ratio !== null && result.firstYearDelta !== null && (
                              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: tpEase }} className="mt-1 grid grid-cols-2 gap-3 rounded-[16px] bg-[#f1f8ff] p-4" aria-live="polite">
                                <div>
                                  <span className="text-[10px] font-bold uppercase tracking-[.1em] text-[#557090]">Valore / costo, 1° anno</span>
                                  <strong className="mt-1 block text-2xl tabular-nums text-[#0b55c6]">{result.ratio > RATIO_CAP ? `oltre ${RATIO_CAP}×` : `${result.ratio.toLocaleString("it-IT", { maximumFractionDigits: 1 })}×`}</strong>
                                </div>
                                <div>
                                  <span className="text-[10px] font-bold uppercase tracking-[.1em] text-[#557090]">Differenza, 1° anno</span>
                                  <strong className="mt-1 block text-2xl tabular-nums text-[#0b55c6]">{formatSignedEuro(result.firstYearDelta)}</strong>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <details className="group mt-4 rounded-[24px] border border-[#cfe1f4] bg-[#eef7ff] p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-[#245b96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769d5] [&::-webkit-details-marker]:hidden">
                    Come calcoliamo
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="mt-4 grid gap-2 font-mono text-[12px] leading-5 text-[#245b96]">
                    <li><strong className="font-sans text-[#102744]">Tempo:</strong> persone × ore a settimana × costo orario × {WORK_WEEKS} settimane lavorative</li>
                    <li><strong className="font-sans text-[#102744]">Preventivi:</strong> preventivi al mese × % in più chiusi × margine medio × 12 mesi</li>
                    <li><strong className="font-sans text-[#102744]">Confronto:</strong> valore annuo ÷ (canone + avvio) nel primo anno</li>
                  </ul>
                </details>
              </Reveal>
            </div>
            <p className="mt-8 max-w-3xl text-[12px] leading-5 text-[#557090]">Stima indicativa basata sui tuoi dati, non un’offerta né una promessa di risultato. Il tempo recuperato è capacità di lavoro liberata, non un risparmio di costi diretto; la stima non considera i tempi di adozione dei primi mesi. Il prezzo di Totalone viene definito solo con una proposta personalizzata.</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-[#cfe1f4] bg-[#eff7ff] py-20 sm:py-28" aria-labelledby="faq-title">
          <div className="mx-auto grid max-w-[1240px] gap-10 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20 lg:px-10">
            <div>
              <ShellTag>DOMANDE SUI PREZZI</ShellTag>
              <h2 id="faq-title" className="mt-6 max-w-md text-[clamp(2.3rem,8vw,3.75rem)] font-bold leading-[.95] tracking-[-0.065em]"><WordReveal text="Prima di chiedere un preventivo." /></h2>
            </div>
            <div className="grid gap-3">
              {faqs.map(([question, answer]) => (
                <details key={question} className="group rounded-[22px] border border-[#cfe1f4] bg-white px-5 py-4 sm:px-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-[#102744] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1769d5] [&::-webkit-details-marker]:hidden">
                    {question}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#eff7ff] text-[#1769d5]"><ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" /></span>
                  </summary>
                  <p className="mt-3 text-[15px] leading-7 text-[#34506f]">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
