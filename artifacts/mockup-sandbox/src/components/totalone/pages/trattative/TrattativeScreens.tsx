/**
 * Schermate animate per la pagina "Gestione trattative", ricostruite dagli
 * screen reali: pagina Totalone (pipeline trattative, incassi & clienti, lista
 * trattative) e pannello "Dettaglio Trattativa" (screen 22: cliente, dati
 * economici con IVA automatica, acconti). Dati fittizi.
 */
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Banknote, Calendar, Check, CheckCircle2, Clock, FileText, HandCoins, Printer, TrendingUp, Users, XCircle } from "lucide-react";
import { CountUp, tpEase, useLoopSteps } from "@/components/totalone/motion-kit";
import { AiFab, FakeCursor, TpAvatar, TpChip, TpKpi, TpLabel, type ChipKind } from "@/components/totalone/app-ui";

const eur = (n: number) => `€ ${n.toLocaleString("it-IT", { useGrouping: "always" } as unknown as Intl.NumberFormatOptions)}`;
const escl = (n: number) => Math.round(n / 1.22);

/* ------------------------------------------------------------------ */
/* Riga trattativa (lista della pagina Totalone)                         */
/* ------------------------------------------------------------------ */

type Row = {
  i: string;
  n: string;
  meta: string;
  st: "tratt" | "final";
  prev: number;
  ven: number;
  acc: number;
};

function TrattRow({ r, ivaEscl = false, glow = false }: { r: Row; ivaEscl?: boolean; glow?: boolean }) {
  const v = (n: number) => eur(ivaEscl ? escl(n) : n);
  const saldo = r.ven - r.acc;
  const saldoKind: ChipKind = saldo > 0 ? "pagare" : "saldato";
  return (
    <div className={`grid grid-cols-[1.6fr_.7fr_.75fr_.75fr] items-center gap-2 rounded-[12px] border bg-white px-2.5 py-2 shadow-[0_1px_4px_0_rgba(2,8,23,.05)] transition-colors duration-300 @md:grid-cols-[1.6fr_.7fr_.75fr_.75fr_.65fr_1.1fr] ${glow ? "border-[#BFDBFE] ring-2 ring-[#DBEAFE]" : "border-[#EEF2F6]"}`}>
      <div className="flex min-w-0 items-center gap-2">
        <TpAvatar initials={r.i} size={22} />
        <div className="min-w-0">
          <p className="truncate text-[9px] font-semibold uppercase tracking-[0.02em]">{r.n}</p>
          <p className="truncate text-[7.5px] text-[#64748B]">{r.meta}</p>
        </div>
      </div>
      <div>{r.st === "final" ? <TpChip kind="final">Final.</TpChip> : <TpChip kind="tratt">In Tratt.</TpChip>}</div>
      <Cell label="Preventivato" value={v(r.prev)} />
      <Cell label="Venduto" value={v(r.ven)} />
      <div className="hidden @md:block">
        <Cell label="Acconti" value={v(r.acc)} />
      </div>
      <div className="hidden text-center @md:block">
        <p className="text-[6.5px] font-medium uppercase tracking-[0.14em] text-[#64748B]">Saldo</p>
        <div className="mt-0.5">
          <TpChip kind={saldoKind}>{`${v(saldo)} · ${saldo > 0 ? "Da pagare" : "Saldato"}`}</TpChip>
        </div>
      </div>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 text-center">
      <p className="truncate text-[6.5px] font-medium uppercase tracking-[0.14em] text-[#64748B]">{label}</p>
      <motion.p key={value} initial={{ opacity: 0.2 }} animate={{ opacity: 1 }} className="truncate text-[9px] font-semibold">
        {value}
      </motion.p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* DETTAGLIO TRATTATIVA — pannello laterale (screen 22)                 */
/* ------------------------------------------------------------------ */

const detailRows: Row[] = [
  { i: "VM", n: "Villa Martini", meta: "09/10/2026 · Luca Gallo", st: "tratt", prev: 16110, ven: 14549, acc: 0 },
  { i: "SF", n: "Studio Ferraro", meta: "09/10/2026 · Giulia Ferri", st: "final", prev: 4454, ven: 3800, acc: 3800 },
  { i: "EC", n: "Famiglia Conti", meta: "08/10/2026 · Sara Rinaldi", st: "tratt", prev: 26229, ven: 0, acc: 0 },
  { i: "MG", n: "Marco Galli", meta: "07/10/2026 · Davide Neri", st: "final", prev: 3477, ven: 2440, acc: 2440 },
];

export function DettaglioTrattativaScreen() {
  const [ref, step] = useLoopSteps(9, 1600);
  const open = step >= 1 && step <= 7;
  const prev = step >= 2;
  const ven = step >= 3;
  const acc1 = step >= 4;
  const acc2 = step >= 5;
  const saved = step >= 8;
  const rows = detailRows.map((r, i) => (i === 0 && saved ? { ...r, acc: 3000 } : r));
  const cursor = [
    { x: "30%", y: "30%" },
    { x: "30%", y: "30%" },
    { x: "62%", y: "62%" },
    { x: "62%", y: "76%" },
    { x: "80%", y: "70%" },
    { x: "80%", y: "82%" },
    { x: "76%", y: "92%" },
    { x: "76%", y: "92%" },
    { x: "40%", y: "40%" },
  ][step];

  return (
    <div ref={ref} className="relative h-full">
      <div className="flex items-center gap-2">
        <TpLabel>Trattative — 13 clienti</TpLabel>
        <span className="ml-auto hidden rounded-full bg-[#F1F5F9] p-0.5 text-[8px] @md:flex">
          <span className="rounded-full bg-white px-1.5 py-0.5 font-medium shadow-sm">IVA incl.</span>
          <span className="px-1.5 py-0.5 text-[#64748B]">IVA escl.</span>
        </span>
      </div>
      <TpLabel className="mt-2.5 !tracking-[0.22em]">Ottobre 2026</TpLabel>
      <div className="mt-1.5 space-y-1.5">
        {rows.map((r, i) => (
          <TrattRow key={r.n} r={r} glow={i === 0 && (step === 0 || saved)} />
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div key="ov" className="absolute -inset-3 z-10 bg-black/45" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
            <motion.div
              key="sheet"
              className="absolute -bottom-3 -right-3 -top-3 z-20 flex w-[78%] flex-col overflow-hidden bg-white @xl:w-[54%]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: tpEase }}
            >
              <span className="absolute right-3 top-2.5 z-10 text-[11px] text-[#475569]">✕</span>
              <div className="relative min-h-0 flex-1 overflow-hidden">
                <motion.div animate={{ y: acc2 ? -142 : acc1 ? -118 : 0 }} transition={{ duration: 0.7, ease: tpEase }} className="px-3.5 pt-3.5">
                  <p className="text-[12px] font-bold tracking-[-0.02em]">Dettaglio Trattativa</p>
                  <p className="text-[8.5px] text-[#64748B]">Villa Martini</p>
                  <SheetDivider label="Cliente" />
                  <div className="grid grid-cols-2 gap-1.5">
                    <SheetField label="Nome cliente" value="Villa Martini" />
                    <SheetField label="Data creazione" value="09/10/2026" white />
                  </div>
                  <SheetDivider label="Dati economici" />
                  <div className="flex items-start gap-1.5 rounded-[8px] border border-[#E2E8F0] p-1.5">
                    <span className="grid h-3 w-3 shrink-0 place-items-center rounded-[3px] bg-[#0F172A] text-white"><Check className="h-2 w-2" /></span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[8px] font-medium">Abilita calcolo automatico IVA</p>
                      <p className="text-[6.5px] text-[#64748B]">I campi IVA esclusa vengono calcolati automaticamente</p>
                    </div>
                    <span className="rounded-[5px] border border-[#E2E8F0] px-1.5 text-[8px]">22</span>
                    <span className="text-[8px] text-[#64748B]">%</span>
                  </div>
                  <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                    <SheetField label="Preventivo IVA incl. (€)" value={prev ? <>€ <CountUp to={16110} duration={0.9} /></> : "€ 0"} white focus={step === 2} />
                    <SheetField label="Preventivo IVA escl. (€)" value={prev ? <>€ <CountUp to={escl(16110)} duration={0.9} /></> : "€ 0"} calc={step === 2} />
                    <SheetField label="Venduto IVA incl. (€)" value={ven ? <>€ <CountUp to={14549} duration={0.9} /></> : "€ 0"} white focus={step === 3} />
                    <SheetField label="Venduto IVA escl. (€)" value={ven ? <>€ <CountUp to={escl(14549)} duration={0.9} /></> : "€ 0"} calc={step === 3} />
                  </div>
                  <SheetDivider label="Acconti" />
                  <div className="flex justify-between text-[8px] text-[#64748B]">
                    <span>{acc2 ? 2 : acc1 ? 1 : 0} acconti</span>
                    <span>
                      Totale: <b className="text-[#0F172A]">{eur(acc2 ? 8000 : acc1 ? 3000 : 0)}</b>
                    </span>
                  </div>
                  <div className="mt-1.5 space-y-1.5">
                    <AnimatePresence initial={false}>
                      {acc1 && (
                        <motion.div key="a1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: tpEase }}>
                          <Acconto n={1} importo="€ 3.000" data="09/10/2026" paid />
                        </motion.div>
                      )}
                      {acc2 && (
                        <motion.div key="a2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: tpEase }}>
                          <Acconto n={2} importo="€ 5.000" data="15/11/2026" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
              <div className="shrink-0 border-t border-[#EEF2F6] bg-white px-3.5 pb-2.5 pt-2">
                <motion.div animate={step >= 6 ? { scale: [1, 0.96, 1] } : {}} transition={{ duration: 0.4 }} className="grid h-[24px] place-items-center rounded-[8px] bg-[#0F172A] text-[9px] font-semibold text-white">
                  Salva Modifiche
                </motion.div>
                <p className="mt-1 text-center text-[8px] text-[#64748B]">Annulla</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AiFab />
      <FakeCursor x={cursor.x} y={cursor.y} click={step === 0 || step === 6} />
    </div>
  );
}

function Acconto({ n, importo, data, paid = false }: { n: number; importo: string; data: string; paid?: boolean }) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-[#E2E8F0]">
      <div className="flex items-center gap-1.5 bg-[#F8FAFC] px-1.5 py-1">
        <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#0F172A] text-[7px] font-semibold text-white">{n}</span>
        <span className="text-[8.5px] font-medium">Acconto</span>
        {paid ? <TpChip kind="saldato" dot="#10B981">Pagato</TpChip> : <TpChip kind="pagare" dot="#F97316">Da pagare</TpChip>}
      </div>
      <div className="grid grid-cols-3 gap-1.5 px-1.5 py-1.5">
        <SheetField label="Importo" value={importo} white />
        <SheetField label="Data prevista" value={data} white />
        <SheetField label="Stato" value={paid ? "Pagato" : "Da pagare"} white />
      </div>
    </div>
  );
}

function SheetDivider({ label }: { label: string }) {
  return (
    <div className="my-2 flex items-center gap-2">
      <span className="h-px flex-1 bg-[#E2E8F0]" />
      <span className="text-[6.5px] font-medium uppercase tracking-[0.18em] text-[#475569]">{label}</span>
      <span className="h-px flex-1 bg-[#E2E8F0]" />
    </div>
  );
}

function SheetField({ label, value, focus = false, white = false, calc = false }: { label: string; value: ReactNode; focus?: boolean; white?: boolean; calc?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="truncate text-[6.5px] font-medium uppercase tracking-[0.12em] text-[#475569]">{label}</p>
      <motion.div
        animate={calc ? { backgroundColor: ["#F1F5F9", "#DBEAFE", "#F1F5F9"] } : {}}
        transition={{ duration: 1.2 }}
        className={`mt-0.5 flex h-[22px] items-center truncate rounded-[6px] px-1.5 text-[8.5px] font-medium transition-[border-color] ${focus ? "border-2 border-[#0F172A] bg-white" : white ? "border border-[#E2E8F0] bg-white" : "bg-[#F1F5F9]"}`}
      >
        {value}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PIPELINE TRATTATIVE + INCASSI — filtri per venditore o showroom       */
/* ------------------------------------------------------------------ */

type Kpis = { tot: number; fin: number; ven: number; daf: number; nc: number; tTot: number; tFin: number; tDaf: number; tNc: number; accR: number; accD: number; cli: number };

const byVenditore: Kpis[] = [
  { tot: 597523, fin: 309632, ven: 309632, daf: 160972, nc: 126919, tTot: 13, tFin: 6, tDaf: 5, tNc: 2, accR: 120698, accD: 189014, cli: 12 },
  { tot: 248410, fin: 141200, ven: 141200, daf: 72310, nc: 34900, tTot: 6, tFin: 3, tDaf: 2, tNc: 1, accR: 58300, accD: 82900, cli: 6 },
  { tot: 196880, fin: 98432, ven: 98432, daf: 54029, nc: 44419, tTot: 4, tFin: 2, tDaf: 1, tNc: 1, accR: 39100, accD: 59332, cli: 4 },
];
const byShowroom: { name: string; k: Kpis }[] = [
  { name: "Milano Centro", k: byVenditore[0] },
  { name: "Lugano", k: { tot: 312640, fin: 188400, ven: 188400, daf: 92140, nc: 32100, tTot: 8, tFin: 4, tDaf: 3, tNc: 1, accR: 74500, accD: 113900, cli: 8 } },
  { name: "Como", k: { tot: 205310, fin: 96220, ven: 96220, daf: 71890, nc: 37200, tTot: 7, tFin: 3, tDaf: 3, tNc: 1, accR: 41800, accD: 54420, cli: 7 } },
  { name: "Bergamo", k: { tot: 158770, fin: 84950, ven: 84950, daf: 49820, nc: 24000, tTot: 5, tFin: 3, tDaf: 1, tNc: 1, accR: 30200, accD: 54750, cli: 5 } },
];

export function TrattativeKpiScreen({ mode = "venditori", incassi = true }: { mode?: "venditori" | "showroom"; incassi?: boolean }) {
  const steps = mode === "venditori" ? 3 : 4;
  const [ref, step] = useLoopSteps(steps, 2400);
  const k = mode === "venditori" ? byVenditore[step] : byShowroom[step].k;
  const showroom = mode === "showroom" ? byShowroom[step].name : "Milano Centro";
  const chip = mode === "venditori" ? step : 0;
  const n = (v: number) => <CountUp to={v} suffix=" €" duration={0.9} />;

  return (
    <div ref={ref} className="relative h-full">
      <div className="flex items-center gap-1 text-[9px] text-[#64748B]">
        {["Retail", showroom, "Venditori", "Tutti i clienti"].map((c, i, a) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <span className="text-[#CBD5E1]">›</span>}
            {i === 1 ? (
              <motion.span key={c} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`font-medium text-[#0F172A] ${mode === "showroom" ? "rounded-full bg-[#EFF6FF] px-1.5 text-[#2563EB]" : ""}`}>
                  {c}
              </motion.span>
            ) : (
              <span className={i === a.length - 1 ? "font-medium text-[#0F172A]" : ""}>{c}</span>
            )}
          </span>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        {["Tutti", "GF · Giulia", "LG · Luca"].map((s, i) => (
          <span key={s} className={`rounded-full px-2.5 py-1 text-[9px] font-medium transition-colors duration-300 ${chip === i ? "bg-[#0F172A] text-white" : "text-[#64748B] ring-1 ring-[#E2E8F0]"}`}>
            {s}
          </span>
        ))}
        <span className="ml-auto grid h-6 w-6 place-items-center rounded-full bg-[#3B82F6] text-white">
          <Printer className="h-3 w-3" />
        </span>
      </div>

      <TpLabel className="mt-3">Pipeline trattative</TpLabel>
      <div className="mt-1.5 grid grid-cols-3 gap-2 @3xl:grid-cols-5">
        <TpKpi icon={FileText} label="Totale preventivi" value={n(k.tot)} hint={`${eur(escl(k.tot)).slice(2)} € IVA escl. · ${k.tTot} trattative`} />
        <TpKpi icon={CheckCircle2} iconTone="emerald" label="Finalizzato" value={n(k.fin)} hint={`${k.tFin} trattative`} />
        <TpKpi icon={TrendingUp} iconTone="blue" label="Venduto" value={n(k.ven)} hint={`${eur(escl(k.ven)).slice(2)} € IVA escl.`} />
        <div className="hidden @3xl:block">
          <TpKpi icon={Clock} label="Da finalizzare" value={n(k.daf)} hint={`${k.tDaf} trattative`} />
        </div>
        <div className="hidden @3xl:block">
          <TpKpi icon={XCircle} label="Non confermato" value={n(k.nc)} hint={`${k.tNc} trattative`} />
        </div>
      </div>

      {incassi && (
        <>
          <TpLabel className="mt-3">Incassi & clienti</TpLabel>
          <div className="mt-1.5 grid grid-cols-3 gap-2">
            <TpKpi icon={Banknote} iconTone="emerald" label="Acconti ricevuti" value={n(k.accR)} />
            <TpKpi icon={HandCoins} iconTone="orange" label="Acconti da ricevere" value={n(k.accD)} />
            <TpKpi icon={Users} label="Totale clienti" value={<CountUp to={k.cli} duration={0.6} />} />
          </div>
        </>
      )}
      <AiFab />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* RICERCA — lista trattative con ricerca, IVA incl/escl e periodo       */
/* ------------------------------------------------------------------ */

const searchRows: Row[] = [
  { i: "VM", n: "Villa Martini", meta: "14/10/2026 · Luca Gallo", st: "tratt", prev: 16110, ven: 14549, acc: 3000 },
  { i: "CB", n: "Casa Bianchi", meta: "14/10/2026 · Giulia Ferri", st: "final", prev: 26290, ven: 26290, acc: 4200 },
  { i: "MG", n: "Marco Galli", meta: "10/10/2026 · Davide Neri", st: "final", prev: 4454, ven: 3800, acc: 3800 },
  { i: "ER", n: "Elena Rinaldi", meta: "09/10/2026 · Sara Rinaldi", st: "tratt", prev: 9375, ven: 0, acc: 0 },
];

export function TrattativeSearchScreen() {
  const [ref, step] = useLoopSteps(7, 1300);
  const query = ["", "M", "Mar", "Mart", "Mart", "Mart", ""][step];
  const ivaEscl = step === 4 || step === 5;
  const period = step >= 5 && step < 6 ? 1 : 0;
  const rows = query ? searchRows.filter((r) => r.n.toLowerCase().includes(query.toLowerCase())) : searchRows;

  return (
    <div ref={ref} className="relative h-full">
      <div className="flex flex-wrap items-center gap-1.5">
        <TpLabel>Trattative — {rows.length === searchRows.length ? 13 : rows.length} clienti</TpLabel>
        <span className="ml-auto flex rounded-full bg-[#F1F5F9] p-0.5 text-[8px]">
          <span className={`rounded-full px-1.5 py-0.5 transition-colors ${!ivaEscl ? "bg-white font-medium shadow-sm" : "text-[#64748B]"}`}>IVA incl.</span>
          <span className={`rounded-full px-1.5 py-0.5 transition-colors ${ivaEscl ? "bg-white font-medium shadow-sm" : "text-[#64748B]"}`}>IVA escl.</span>
        </span>
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <span className={`flex h-[22px] min-w-0 flex-1 items-center gap-1.5 rounded-full border bg-white px-2.5 text-[8.5px] transition-colors ${query ? "border-[#93C5FD]" : "border-[#EEF2F6]"}`}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          {query ? <span className="text-[#0F172A]">{query}</span> : <span className="text-[#94A3B8]">Cerca cliente, brand</span>}
          {query && <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="-ml-1 h-3 w-px bg-[#0F172A]" />}
        </span>
        <span className="hidden items-center gap-1 rounded-full border border-[#EEF2F6] bg-white px-2 py-1 text-[8px] @md:flex">
          <Calendar className="h-2.5 w-2.5" /> Data creazione
        </span>
        <span className="flex rounded-full text-[8px]">
          {["Tutti", "Mese", "Trimestre"].map((p, i) => (
            <span key={p} className={`rounded-full px-2 py-1 transition-colors ${period === i ? "bg-[#0F172A] font-medium text-white" : "text-[#64748B]"} ${i === 2 ? "hidden @md:inline" : ""}`}>
              {p}
            </span>
          ))}
        </span>
      </div>
      <div className="mt-2.5 flex items-center gap-2">
        <span className="text-[7.5px] font-medium uppercase tracking-[0.22em] text-[#475569]">Ottobre 2026</span>
        <span className="h-px flex-1 bg-[#E2E8F0]" />
        <span className="text-[7px] text-[#94A3B8]">{rows.length} trattative</span>
      </div>
      <div className="mt-1.5 space-y-1.5">
        <AnimatePresence initial={false}>
          {rows.map((r) => (
            <motion.div key={r.n} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: tpEase }}>
              <TrattRow r={r} ivaEscl={ivaEscl} glow={query.length >= 4 && r.n === "Villa Martini"} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <AiFab />
    </div>
  );
}
