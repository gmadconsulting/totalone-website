/**
 * Schermate animate per le pagine "Gestione commesse" e "Margini di commessa".
 * Ricostruite SOLO da screen reali del gestionale:
 *  - 23 · Schedina Cliente (acquistato + margine generato = venduto, prodotti,
 *    colli, badge "Margine basso", tab, tabella prodotti con listino, sconto,
 *    finale, acquisto, margine, fattura, ordine, magazzino, colli)
 *  - 22 · Dettaglio Trattativa (pannello laterale con dati economici e acconti)
 * Dati e nomi fittizi.
 */
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Banknote, Check, Download, FileText, HandCoins, Paperclip, Plus, Trash2, Users } from "lucide-react";
import { CountUp, tpEase, useLoopSteps } from "@/components/totalone/motion-kit";
import { FakeCursor, TpAvatar, TpChip, TpGhost, TpKpi, TpLabel, TpSearch } from "@/components/totalone/app-ui";

const eur = (v: number, d = 2) =>
  v.toLocaleString("it-IT", { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: "always" } as unknown as Intl.NumberFormatOptions);

type Ordine = "Da ordinare" | "Ordinato" | "Arrivato";

type Prodotto = {
  brand: string;
  tipo: string;
  qty: number;
  listino: number;
  finale: number;
  acquisto: number;
  colli: number;
  magazzino?: boolean;
};

/** Righe della schedina demo (margine = (finale − acquisto) / finale). */
export const schedinaRows: Prodotto[] = [
  { brand: "Linea Cucine", tipo: "Cucina", qty: 1, listino: 26285, finale: 18218, acquisto: 12880, colli: 14, magazzino: true },
  { brand: "Pietra & Co", tipo: "Top in quarzo", qty: 1, listino: 3070, finale: 2150, acquisto: 1505, colli: 2 },
  { brand: "Casa Elettro", tipo: "Elettrodomestici", qty: 4, listino: 5750, finale: 4890, acquisto: 3912, colli: 4 },
  { brand: "Luce & Co", tipo: "Lampade sospese", qty: 3, listino: 1290, finale: 1032, acquisto: 903, colli: 3 },
];

/** Soglia demo sotto la quale la schedina segnala il margine come basso. */
const LOW = 25;
const marginOf = (p: Prodotto) => ((p.finale - p.acquisto) / p.finale) * 100;

const cols =
  "grid-cols-[1.6fr_.9fr_.7fr_.9fr] @xl:grid-cols-[1.5fr_.3fr_.9fr_.9fr_.7fr_.8fr_.9fr] @3xl:grid-cols-[1.5fr_.3fr_.9fr_.6fr_.9fr_.9fr_.7fr_.8fr_.9fr_.4fr_.4fr_.5fr]";

function OrdineChip({ stato }: { stato: Ordine }) {
  if (stato === "Arrivato") return <TpChip key="a" kind="saldato" dot="#10B981">Arrivato</TpChip>;
  if (stato === "Ordinato") return <TpChip key="o" kind="open" dot="#3B82F6">Ordinato</TpChip>;
  return <TpChip key="d" kind="neutral">Da ordinare</TpChip>;
}

/**
 * Pagina "Schedina Cliente" completa (screen 23).
 * - variant "operativa": i prodotti entrano uno alla volta e gli ordini avanzano.
 * - variant "margini": tutti i prodotti, il margine basso viene evidenziato e
 *   gli importi passano da IVA incl. a IVA escl. con il toggle reale.
 */
export function SchedinaCompleta({ variant = "operativa" }: { variant?: "operativa" | "margini" }) {
  const margini = variant === "margini";
  const [ref, step] = useLoopSteps(margini ? 7 : 8, margini ? 1900 : 1500);

  const rows = margini ? 4 : Math.min(4, step + 1);
  const ordini: Ordine[] = margini
    ? ["Arrivato", "Arrivato", "Ordinato", "Ordinato"]
    : ["Arrivato", step >= 4 ? "Arrivato" : "Ordinato", "Ordinato", step >= 5 ? "Ordinato" : "Da ordinare"];
  const focusLow = margini && step >= 1 && step <= 3;
  const escl = margini && (step === 4 || step === 5);
  const k = escl ? 1 / 1.22 : 1;

  const shown = schedinaRows.slice(0, rows);
  const tot = shown.reduce(
    (a, p) => ({ listino: a.listino + p.listino, finale: a.finale + p.finale, acquisto: a.acquisto + p.acquisto, colli: a.colli + p.colli, qty: a.qty + p.qty }),
    { listino: 0, finale: 0, acquisto: 0, colli: 0, qty: 0 },
  );
  const lowCount = shown.filter((p) => marginOf(p) < LOW).length;
  const media = shown.length ? shown.reduce((a, p) => a + marginOf(p), 0) / shown.length : 0;
  const totMargin = tot.finale ? ((tot.finale - tot.acquisto) / tot.finale) * 100 : 0;
  const totSconto = tot.listino ? (1 - tot.finale / tot.listino) * 100 : 0;
  const cursor = margini
    ? [
        { x: "88%", y: "92%" },
        { x: "90%", y: "22%" },
        { x: "70%", y: "62%" },
        { x: "70%", y: "70%" },
        { x: "16%", y: "44%" },
        { x: "40%", y: "30%" },
        { x: "88%", y: "92%" },
      ][step]
    : null;

  return (
    <div ref={ref} className="relative h-full">
      <p className="text-[8.5px] text-[#64748B]">
        Schedine Clienti › <b className="font-semibold uppercase text-[#0F172A]">Casa Bianchi</b>
      </p>
      <div className="mt-1.5 flex items-start gap-2">
        <div className="min-w-0">
          <p className="text-[12.5px] font-bold tracking-[-0.02em]">Schedina Cliente</p>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[8px] text-[#475569]">
            <span>📅 2026</span>
            <span>📍 Milano Centro</span>
            <span className="hidden @md:inline">👤 Giulia Ferri</span>
            <span className="font-medium text-[#2563EB]">● Finalizzato</span>
          </p>
        </div>
        <TpGhost className="ml-auto hidden @md:inline-flex">⇄ Migra showroom</TpGhost>
      </div>

      {/* Riepilogo economico */}
      <div className="relative mt-3 rounded-[14px] border border-[#EEF2F6] bg-white px-2.5 pb-2 pt-3.5 shadow-[0_1px_4px_0_rgba(2,8,23,.05)]">
        <span className="absolute -top-2 left-2.5 rounded-full bg-[#3B82F6] px-2 py-0.5 text-[6.5px] font-bold uppercase tracking-[0.12em] text-white">
          ● Importi IVA {escl ? "escl." : "incl."}
        </span>
        <div className="flex items-center gap-2">
          <div className="min-w-0">
            <TpLabel>Acquistato</TpLabel>
            <p className="text-[12px] font-bold">€ <CountUp key={`a${rows}${escl}`} to={Math.round(tot.acquisto * k)} duration={0.6} /></p>
          </div>
          <span className="text-[#CBD5E1]">+</span>
          <div className="min-w-0">
            <p className="text-[7.5px] font-semibold uppercase tracking-[0.14em] text-[#059669]">Margine generato</p>
            <p className="text-[12px] font-bold text-[#059669]">€ <CountUp key={`m${rows}${escl}`} to={Math.round((tot.finale - tot.acquisto) * k)} duration={0.6} /></p>
            <p className="hidden text-[7px] text-[#059669] @md:block">media dei margini di riga {media.toFixed(1)}%</p>
          </div>
          <span className="text-[#CBD5E1]">=</span>
          <div className="min-w-0">
            <TpLabel>Venduto IVA {escl ? "escl." : "incl."}</TpLabel>
            <p className="text-[12px] font-bold">€ <CountUp key={`v${rows}${escl}`} to={Math.round(tot.finale * k)} duration={0.6} /></p>
          </div>
          <div className="ml-auto hidden items-center gap-3 border-l border-[#EEF2F6] pl-2.5 text-center @xl:flex">
            <div>
              <TpLabel>Prodotti</TpLabel>
              <p className="text-[12px] font-bold">{rows}</p>
            </div>
            <div>
              <TpLabel>Colli tot.</TpLabel>
              <p className="text-[12px] font-bold">{tot.colli}</p>
            </div>
          </div>
          <AnimatePresence initial={false}>
            {lowCount > 0 && (
              <motion.div
                key="low"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: focusLow ? 1.06 : 1, boxShadow: focusLow ? "0 0 0 3px rgba(250,204,21,.35)" : "0 0 0 0 rgba(250,204,21,0)" }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.4, ease: tpEase }}
                className="ml-auto shrink-0 rounded-[10px] border border-[#FDE68A] bg-[#FEFCE8] px-2 py-1 text-center @xl:ml-0"
              >
                <p className="flex items-center justify-center gap-1 text-[6.5px] font-bold uppercase tracking-[0.1em] text-[#B45309]">
                  <AlertTriangle className="h-2.5 w-2.5" /> Margine basso
                </p>
                <p className="text-[9px] font-bold text-[#B45309]">{lowCount} prodotti</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Tab della schedina */}
      <div className="mt-2.5 flex gap-3 border-b border-[#E2E8F0] text-[8.5px]">
        <span className="border-b-2 border-[#0F172A] pb-1 font-semibold">↓ Prodotti</span>
        <span className="pb-1 text-[#64748B]">Costi di Servizio</span>
        <span className="pb-1 text-[#64748B]">Documenti</span>
        <span className="hidden pb-1 text-[#64748B] @md:inline">Note</span>
        <span className="hidden pb-1 text-[#64748B] @xl:inline">Assistenza</span>
      </div>

      {/* Tabella prodotti */}
      <div className="mt-2 overflow-hidden rounded-[14px] border border-[#EEF2F6] bg-white">
        <div className="flex items-center gap-1.5 px-2.5 pt-2">
          <span className="flex rounded-full bg-[#F1F5F9] p-0.5 text-[7.5px]">
            <span className={`rounded-full px-1.5 py-0.5 font-medium transition-colors duration-300 ${escl ? "text-[#64748B]" : "bg-[#3B82F6] text-white"}`}>IVA incl.</span>
            <span className={`rounded-full px-1.5 py-0.5 font-medium transition-colors duration-300 ${escl ? "bg-[#3B82F6] text-white" : "text-[#64748B]"}`}>IVA escl.</span>
          </span>
          <TpSearch placeholder="Cerca brand o tipo…" className="hidden @md:flex" />
          <span className="grid h-[18px] w-[18px] place-items-center rounded-full bg-[#FEF9C3] text-[#CA8A04]"><AlertTriangle className="h-2.5 w-2.5" /></span>
          <span className="ml-auto hidden h-[20px] w-[20px] place-items-center rounded-full bg-[#EFF6FF] text-[#3B82F6] @md:grid"><Download className="h-2.5 w-2.5" /></span>
          <span className="inline-flex h-[20px] items-center gap-1 rounded-full bg-[#3B82F6] px-2 text-[7.5px] font-semibold text-white @max-md:ml-auto">
            <Plus className="h-2.5 w-2.5" /> Aggiungi prodotto
          </span>
        </div>

        <div className={`mt-1.5 grid ${cols} gap-1.5 border-b border-[#EEF2F6] px-2.5 py-1.5 text-[6px] font-semibold uppercase tracking-[0.12em] text-[#64748B]`}>
          <span>Tipo</span>
          <span className="hidden text-center @xl:block">Qty</span>
          <span className="hidden text-right @3xl:block">Listino</span>
          <span className="hidden text-right @3xl:block">Sconto</span>
          <span className="text-right">Finale</span>
          <span className="hidden text-right @xl:block">Acquisto</span>
          <span className="text-right">Margine</span>
          <span className="hidden text-center @xl:block">Fattura</span>
          <span className="text-center">Ordine</span>
          <span className="hidden text-center @3xl:block">Magaz.</span>
          <span className="hidden text-center @3xl:block">Colli</span>
          <span className="hidden @3xl:block" />
        </div>

        <AnimatePresence initial={false}>
          {shown.map((p, i) => {
            const m = marginOf(p);
            const low = m < LOW;
            const sconto = (1 - p.finale / p.listino) * 100;
            return (
              <motion.div
                key={p.tipo}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: margini && focusLow && !low ? 0.45 : 1, height: "auto", backgroundColor: focusLow && low ? "#FEFCE8" : "#FFFFFF" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: tpEase }}
                className={`grid ${cols} items-center gap-1.5 border-b border-[#F8FAFC] py-1.5 pl-2 pr-2.5 border-l-2 ${low ? "border-l-[#FACC15]" : "border-l-transparent"}`}
              >
                <span className="min-w-0">
                  <span className="block truncate text-[6.5px] font-medium uppercase tracking-[0.1em] text-[#64748B]">{p.brand}</span>
                  <span className="block truncate text-[9px] font-semibold">{p.tipo}</span>
                  {p.magazzino && <span className="hidden items-center gap-0.5 text-[6.5px] font-medium text-[#CA8A04] @md:flex"><AlertTriangle className="h-2 w-2" /> Magazzino</span>}
                </span>
                <span className="hidden text-center text-[8.5px] @xl:block">{p.qty}</span>
                <span className="hidden text-right text-[8.5px] @3xl:block">€ {eur(p.listino * k)}</span>
                <span className="hidden text-right text-[8.5px] font-semibold text-[#DC2626] @3xl:block">−{eur(sconto)}%</span>
                <span className="text-right text-[8.5px] font-semibold text-[#EA580C]">€ {eur(p.finale * k)}</span>
                <span className="hidden text-right text-[8.5px] @xl:block">€ {eur(p.acquisto * k)}</span>
                <span className={`flex items-center justify-end gap-0.5 text-[8.5px] font-semibold ${low ? "text-[#EA580C]" : "text-[#059669]"}`}>
                  {m.toFixed(1)}%
                  <span className={`h-1.5 w-1.5 rounded-full ${low ? "bg-[#F59E0B]" : "bg-[#10B981]"}`} />
                </span>
                <span className="hidden justify-center @xl:flex">
                  <span className="rounded-full px-1.5 py-0.5 text-[7px] font-medium text-[#DC2626] ring-1 ring-[#FECACA]">Mancante</span>
                </span>
                <span className="flex justify-center">
                  <AnimatePresence mode="wait">
                    <OrdineChip key={ordini[i]} stato={ordini[i]} />
                  </AnimatePresence>
                </span>
                <span className="hidden text-center text-[8px] text-[#94A3B8] @3xl:block">—</span>
                <span className="hidden text-center text-[8.5px] @3xl:block">{p.colli}</span>
                <span className="hidden items-center justify-end gap-1 text-[#94A3B8] @3xl:flex">
                  <Paperclip className="h-2.5 w-2.5" />
                  <FileText className="h-2.5 w-2.5" />
                  <Trash2 className="h-2.5 w-2.5" />
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>

        <div className={`grid ${cols} items-center gap-1.5 bg-[#F8FAFC] px-2.5 py-1.5`}>
          <span>
            <span className="block text-[7px] font-semibold uppercase tracking-[0.14em] text-[#475569]">Σ Totali</span>
            <span className="block text-[6.5px] text-[#64748B]">{rows} prodotti</span>
          </span>
          <span className="hidden text-center text-[8.5px] font-bold @xl:block">{tot.qty}</span>
          <span className="hidden text-right text-[8.5px] text-[#64748B] @3xl:block">€ {eur(tot.listino * k, 0)}</span>
          <span className="hidden text-right text-[8.5px] font-semibold text-[#059669] @3xl:block">−{totSconto.toFixed(1)}%</span>
          <span className="text-right text-[8.5px] font-bold">€ {eur(tot.finale * k, 0)}</span>
          <span className="hidden text-right text-[8.5px] text-[#64748B] @xl:block">€ {eur(tot.acquisto * k, 0)}</span>
          <span className="flex items-center justify-end gap-0.5 text-[8.5px] font-bold">
            {totMargin.toFixed(1)}%
            <span className={`h-1.5 w-1.5 rounded-full ${totMargin < LOW ? "bg-[#F59E0B]" : "bg-[#10B981]"}`} />
          </span>
          <span className="hidden @xl:block" />
          <span />
          <span className="hidden @3xl:block" />
          <span className="hidden text-center text-[8.5px] font-bold @3xl:block">{tot.colli}</span>
          <span className="hidden @3xl:block" />
        </div>
      </div>

      {cursor && <FakeCursor x={cursor.x} y={cursor.y} click={step === 1 || step === 4} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Totalone · Dettaglio Trattativa con acconti (screen 22)              */
/* ------------------------------------------------------------------ */

const acconti = [
  { importo: 8000, data: "14/10/2026" },
  { importo: 6000, data: "02/11/2026" },
];

function MiniDeal({ i, n, meta, final, venduto, acconti: acc, saldo, saldato = false, glow = false }: { i: string; n: string; meta: string; final: boolean; venduto: string; acconti: string; saldo: string; saldato?: boolean; glow?: boolean }) {
  return (
    <div className={`grid grid-cols-[1.6fr_.8fr_.8fr] items-center gap-2 rounded-[12px] border border-[#EEF2F6] bg-white px-2.5 py-2 shadow-[0_1px_4px_0_rgba(2,8,23,.05)] @md:grid-cols-[1.6fr_.7fr_.7fr_.7fr_1.1fr] ${glow ? "ring-2 ring-[#BFDBFE]" : ""}`}>
      <div className="flex min-w-0 items-center gap-2">
        <TpAvatar initials={i} size={22} />
        <div className="min-w-0">
          <p className="truncate text-[9px] font-semibold uppercase tracking-[0.02em]">{n}</p>
          <p className="truncate text-[7.5px] text-[#64748B]">{meta}</p>
        </div>
      </div>
      <div>{final ? <TpChip kind="final">Finalizzato</TpChip> : <TpChip kind="tratt">In Tratt.</TpChip>}</div>
      <div className="text-center">
        <p className="text-[6.5px] font-medium uppercase tracking-[0.14em] text-[#64748B]">Venduto</p>
        <p className="text-[9px] font-semibold">{venduto}</p>
      </div>
      <div className="hidden text-center @md:block">
        <p className="text-[6.5px] font-medium uppercase tracking-[0.14em] text-[#64748B]">Acconti</p>
        <motion.p key={acc} initial={{ opacity: 0.2 }} animate={{ opacity: 1 }} className="text-[9px] font-semibold">{acc}</motion.p>
      </div>
      <div className="hidden text-center @md:block">
        <p className="text-[6.5px] font-medium uppercase tracking-[0.14em] text-[#64748B]">Saldo</p>
        <div className="mt-0.5">
          <TpChip key={saldo} kind={saldato ? "saldato" : "pagare"}>{saldo}</TpChip>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, white = false }: { label: string; value: ReactNode; white?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="truncate text-[6.5px] font-medium uppercase tracking-[0.12em] text-[#475569]">{label}</p>
      <div className={`mt-0.5 flex h-[22px] items-center truncate rounded-[6px] px-1.5 text-[8.5px] font-medium ${white ? "border border-[#E2E8F0] bg-white" : "bg-[#F1F5F9]"}`}>{value}</div>
    </div>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="my-2 flex items-center gap-2">
      <span className="h-px flex-1 bg-[#E2E8F0]" />
      <span className="text-[6.5px] font-medium uppercase tracking-[0.18em] text-[#475569]">{label}</span>
      <span className="h-px flex-1 bg-[#E2E8F0]" />
    </div>
  );
}

/** Gli acconti vengono registrati nel Dettaglio Trattativa e il saldo si aggiorna in lista. */
export function AccontiScreen() {
  const [ref, step] = useLoopSteps(8, 1600);
  const open = step >= 1 && step <= 5;
  const n = step >= 4 ? 2 : step >= 3 ? 1 : 0;
  const saved = step >= 6;
  const totale = acconti.slice(0, n).reduce((a, c) => a + c.importo, 0);
  const cursor = [
    { x: "30%", y: "56%" },
    { x: "30%", y: "56%" },
    { x: "80%", y: "60%" },
    { x: "80%", y: "70%" },
    { x: "80%", y: "84%" },
    { x: "78%", y: "93%" },
    { x: "60%", y: "56%" },
    { x: "60%", y: "56%" },
  ][step];

  return (
    <div ref={ref} className="relative h-full">
      <div className="grid grid-cols-3 gap-2">
        <TpKpi icon={Banknote} iconTone="emerald" label="Acconti ricevuti" highlight={step === 6} value={<CountUp key={`r${saved}`} to={saved ? 134698 : 120698} suffix=" €" duration={0.9} />} />
        <TpKpi icon={HandCoins} iconTone="orange" label="Acconti da ricevere" value={<CountUp key={`d${saved}`} to={saved ? 175014 : 189014} suffix=" €" duration={0.9} />} />
        <TpKpi icon={Users} label="Totale clienti" value="13" />
      </div>
      <TpLabel className="mt-3">Trattative — 13 clienti</TpLabel>
      <TpLabel className="mt-2 !tracking-[0.22em]">Ottobre 2026</TpLabel>
      <div className="mt-1.5 space-y-1.5">
        <MiniDeal
          i="CB"
          n="Casa Bianchi"
          meta="14/10/2026 · Giulia Ferri"
          final
          venduto="€ 26.290"
          acconti={saved ? "€ 14.000" : "€ 0"}
          saldo={saved ? "€ 12.290 · Da pagare" : "€ 26.290 · Da pagare"}
          glow={step <= 1 || saved}
        />
        <MiniDeal i="VM" n="Villa Martini" meta="09/10/2026 · Luca Gallo" final={false} venduto="€ 14.549" acconti="€ 3.000" saldo="€ 11.549 · Da pagare" />
        <MiniDeal i="SF" n="Studio Ferraro" meta="09/10/2026 · Sara Rinaldi" final venduto="€ 3.800" acconti="€ 3.800" saldo="€ 0 · Saldato" saldato />
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div key="ov" className="absolute -inset-3 z-10 bg-black/45" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
            <motion.div
              key="sheet"
              className="absolute -bottom-3 -right-3 -top-3 z-20 flex w-[78%] flex-col bg-white px-3.5 pb-3 pt-3.5 @xl:w-[52%]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: tpEase }}
            >
              <span className="absolute right-3 top-2.5 text-[11px] text-[#475569]">✕</span>
              <p className="text-[12px] font-bold tracking-[-0.02em]">Dettaglio Trattativa</p>
              <p className="text-[8.5px] text-[#64748B]">Casa Bianchi</p>
              <Divider label="Dati economici" />
              <div className="flex items-start gap-1.5 rounded-[8px] border border-[#E2E8F0] p-1.5">
                <span className="grid h-3 w-3 shrink-0 place-items-center rounded-[3px] bg-[#0F172A] text-white"><Check className="h-2 w-2" /></span>
                <div className="min-w-0 flex-1">
                  <p className="text-[8px] font-medium">Abilita calcolo automatico IVA</p>
                  <p className="truncate text-[6.5px] text-[#64748B]">I campi IVA esclusa vengono calcolati automaticamente</p>
                </div>
                <span className="rounded-[5px] border border-[#E2E8F0] px-1.5 text-[8px]">22 %</span>
              </div>
              <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                <Field label="Venduto IVA incl. (€)" value="€ 26.290" white />
                <Field label="Venduto IVA escl. (€)" value="€ 21.549" />
              </div>
              <Divider label="Acconti" />
              <div className="flex justify-between text-[8px] text-[#64748B]">
                <span>{n} acconti</span>
                <span>
                  Totale: <b className="text-[#0F172A]">€ {eur(totale, 0)}</b>
                </span>
              </div>
              <div className="mt-1.5 min-h-0 flex-1 space-y-1.5 overflow-hidden">
                <AnimatePresence initial={false}>
                  {acconti.slice(0, n).map((a, idx) => (
                    <motion.div
                      key={a.data}
                      initial={{ opacity: 0, y: 10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: tpEase }}
                      className="overflow-hidden rounded-[10px] border border-[#E2E8F0]"
                    >
                      <div className="flex items-center gap-1.5 bg-[#F8FAFC] px-2 py-1">
                        <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#0F172A] text-[7px] font-bold text-white">{idx + 1}</span>
                        <span className="text-[8.5px] font-semibold">Acconto</span>
                        <TpChip kind="saldato" dot="#10B981">Pagato</TpChip>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 px-2 py-1.5">
                        <Field label="Importo" value={`€ ${eur(a.importo, 0)}`} white />
                        <Field label="Data prevista" value={a.data} white />
                        <Field label="Stato" value="Pagato" white />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="pt-2">
                <motion.div animate={{ scale: step === 5 ? 0.97 : 1 }} className="grid h-[24px] place-items-center rounded-[8px] bg-[#0F172A] text-[9px] font-semibold text-white">
                  Salva Modifiche
                </motion.div>
                <p className="mt-1 text-center text-[8px] text-[#64748B]">Annulla</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <FakeCursor x={cursor.x} y={cursor.y} click={step === 1 || step === 5} />
    </div>
  );
}
