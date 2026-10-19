/**
 * Schermate animate per la pagina "Magazzino e logistica".
 * Ricostruite SOLO da elementi visibili negli screen reali:
 * - 10.webp Magazzino logistico (tab, Magazzino Italia, ricerca, filtro stato,
 *   Filtri/Azzera, stampa, Archivio, Storico DDT, Storico distinte, tabella)
 * - 23.webp Schedina Cliente (KPI Prodotti / Colli tot., colonne Ordine/Magaz./Colli)
 * Dati fittizi, coerenti con la Schedina demo di Casa Bianchi (4 prodotti, 23 colli).
 */
import { AnimatePresence, motion } from "framer-motion";
import { Archive, FileText, Printer, SlidersHorizontal } from "lucide-react";
import { CountUp, tpEase, useLoopSteps } from "../../motion-kit";
import { FakeCursor, TpChip, TpGhost, TpLabel } from "../../app-ui";

const spring = { type: "spring", stiffness: 380, damping: 32 } as const;

/* ------------------------------------------------------------------ */
/* Barra superiore del Magazzino logistico (tab + Magazzino Italia)     */
/* ------------------------------------------------------------------ */

const tabs = ["Magazzino logistico", "Transazioni", "Magazzino contabile"] as const;

/** Solo il selettore a tab reale: la pillola attiva si sposta tra le tre viste. */
export function MagazzinoTabsScreen() {
  const [ref, step] = useLoopSteps(6, 1500);
  const active = step % 2 === 0 ? 0 : 2;
  return (
    <div ref={ref} className="relative flex h-full flex-col items-center justify-center gap-3">
      <span className="relative flex max-w-full rounded-full border border-[#EEF2F6] bg-white p-0.5 text-[7.5px] @md:p-1 @md:text-[10px] shadow-[0_1px_4px_rgba(2,8,23,.05)]">
        {tabs.map((t, i) => (
          <span key={t} className={`relative px-2 py-1.5 @md:px-3 ${i === 1 ? "hidden @md:inline" : ""}`}>
            {i === active && (
              <motion.span
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={spring}
                className="absolute inset-0 rounded-full bg-white shadow-[0_1px_6px_rgba(2,8,23,.14)] ring-1 ring-[#EEF2F6]"
              />
            )}
            <span className={`relative whitespace-nowrap ${i === active ? "font-semibold text-[#0F172A]" : "text-[#64748B]"}`}>{t}</span>
          </span>
        ))}
      </span>
      <span className="flex items-center gap-1.5">
        <span className="flex items-center gap-1 rounded-full border border-[#EEF2F6] bg-white px-2.5 py-1 text-[9px] font-medium">🇮🇹 Magazzino Italia <span className="text-[#94A3B8]">▾</span></span>
        <span className="grid h-[22px] w-[22px] place-items-center rounded-full border border-[#EEF2F6] bg-white text-[9px] text-[#334155]">⇄</span>
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ricerca: si digita nel campo reale e la tabella si restringe          */
/* ------------------------------------------------------------------ */

const searchRows = [
  ["Casa Bianchi", "Corsia B", "Linea Cucine", "Cucina", 1, 14, "18.400,00"],
  ["Villa Martini", "Corsia A", "Forma Divani", "Divano modulare", 1, 3, "4.409,14"],
  ["Casa Bianchi", "Corsia B", "Pietra & Co", "Top in quarzo", 1, 2, "2.150,00"],
  ["Studio Ferraro", "Scaffale 4", "Luce & Co", "Applique da parete", 2, 2, "653,54"],
  ["Famiglia Conti", "Sotto al portico", "Atelier Legno", "Tavolo allungabile", 1, 1, "2.916,74"],
  ["Casa Bianchi", "Corsia B", "Casa Elettro", "Elettrodomestici", 4, 4, "4.890,00"],
] as const;

const query = "Casa Bianchi";

export function RicercaScreen() {
  const [ref, step] = useLoopSteps(18, 260);
  // 0-1 vuoto, 2-13 digitazione, 14-17 risultato
  const typed = query.slice(0, Math.max(0, Math.min(query.length, step - 1)));
  const filtering = typed.length >= 4;
  const visible = searchRows.filter((r) => !filtering || r[0].toLowerCase().startsWith(typed.toLowerCase()));
  return (
    <div ref={ref} className="relative h-full">
      <div className="flex items-center gap-1.5">
        <span className="flex h-[22px] min-w-0 flex-1 items-center gap-1.5 rounded-full border bg-white px-2.5 text-[8.5px] transition-colors @md:max-w-[190px] border-[#BFDBFE]">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          {typed ? (
            <span className="truncate text-[#0F172A]">{typed}<motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }} className="ml-px inline-block h-2 w-px bg-[#0F172A] align-middle" /></span>
          ) : (
            <span className="truncate text-[#94A3B8]">Cerca cliente, brand o prodotto</span>
          )}
        </span>
        <TpGhost>Arrivato ▾</TpGhost>
        <TpGhost className="hidden @md:inline-flex"><SlidersHorizontal className="h-2.5 w-2.5" />Filtri</TpGhost>
        <span className="hidden text-[8.5px] text-[#64748B] @md:inline">Azzera</span>
      </div>
      <div className="mt-2 overflow-hidden rounded-[14px] border border-[#EEF2F6] bg-white">
        <div className="grid grid-cols-[1.1fr_1.3fr_.6fr_.7fr] gap-2 border-b border-[#EEF2F6] px-2.5 py-1.5 text-[6.5px] font-semibold uppercase tracking-[0.14em] text-[#64748B] @md:grid-cols-[1.1fr_.8fr_1.3fr_.4fr_.7fr_.4fr_.7fr]">
          <span>Cliente ▲</span>
          <span className="hidden @md:block">Sede</span>
          <span>Brand · tipo</span>
          <span className="hidden @md:block">Qtà</span>
          <span>Stato</span>
          <span className="hidden @md:block">Colli</span>
          <span className="text-right">Prezzo</span>
        </div>
        <AnimatePresence initial={false}>
          {visible.map(([cliente, sede, brand, tipo, qty, colli, prezzo]) => (
            <motion.div
              key={tipo}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: tpEase }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-[1.1fr_1.3fr_.6fr_.7fr] items-center gap-2 border-b border-[#F8FAFC] px-2.5 py-1.5 @md:grid-cols-[1.1fr_.8fr_1.3fr_.4fr_.7fr_.4fr_.7fr]">
                <span className={`truncate text-[8.5px] font-semibold ${filtering ? "text-[#2563EB]" : ""}`}>{cliente}</span>
                <span className="hidden truncate text-[8px] text-[#64748B] @md:block">{sede}</span>
                <span className="min-w-0">
                  <span className="block truncate text-[8.5px] font-semibold">{brand}</span>
                  <span className="block truncate text-[7px] text-[#64748B]">{tipo}</span>
                </span>
                <span className="hidden text-[8.5px] @md:block">{qty}</span>
                <span><TpChip kind="final">Arrivato</TpChip></span>
                <span className="hidden text-[8.5px] @md:block">{colli}</span>
                <span className="text-right text-[8.5px] font-semibold">€ {prezzo}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Documenti: barra azioni reale (stampa, Archivio, Storico DDT/distinte) */
/* ------------------------------------------------------------------ */

const docButtons = [
  { label: "Archivio", icon: Archive, x: "24%" },
  { label: "Storico DDT", icon: FileText, x: "52%" },
  { label: "Storico distinte", icon: FileText, x: "80%" },
] as const;

export function DocumentiScreen() {
  const [ref, step] = useLoopSteps(3, 1600);
  return (
    <div ref={ref} className="relative flex h-full items-center justify-center">
      <div className="flex flex-wrap items-center justify-center gap-1.5 @md:gap-2">
        <span className="grid h-[26px] w-[26px] place-items-center rounded-full bg-[#3B82F6] text-white shadow-[0_4px_10px_rgba(59,130,246,.3)]"><Printer className="h-3 w-3" /></span>
        {docButtons.map((b, i) => (
          <motion.span
            key={b.label}
            animate={{ scale: step === i ? 1.06 : 1, borderColor: step === i ? "#93C5FD" : "#E2E8F0" }}
            transition={spring}
            className="inline-flex h-[22px] items-center gap-1 rounded-full border bg-white px-2 text-[8px] font-medium text-[#0F172A] @md:h-[26px] @md:gap-1.5 @md:px-3 @md:text-[9.5px]"
          >
            <b.icon className="h-3 w-3" />
            {b.label}
          </motion.span>
        ))}
      </div>
      <div className="hidden @md:block">
        <FakeCursor x={docButtons[step].x} y="58%" click />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Colli: frammento della Schedina Cliente (screen 23)                  */
/* ------------------------------------------------------------------ */

const colliRows = [
  { brand: "Linea Cucine", tipo: "Cucina", qty: 1, colli: 14 },
  { brand: "Pietra & Co", tipo: "Top in quarzo", qty: 1, colli: 2 },
  { brand: "Casa Elettro", tipo: "Elettrodomestici", qty: 4, colli: 4 },
  { brand: "Luce & Co", tipo: "Lampade sospese", qty: 3, colli: 3 },
] as const;

export function ColliScreen() {
  const [ref, step] = useLoopSteps(7, 1000);
  const shown = Math.min(colliRows.length, step + 1);
  const arrived = Math.max(0, step - 3);
  const totColli = colliRows.slice(0, shown).reduce((s, r) => s + r.colli, 0);
  const totQty = colliRows.slice(0, shown).reduce((s, r) => s + r.qty, 0);
  return (
    <div ref={ref} className="relative h-full">
      <p className="text-[8.5px] text-[#64748B]">Schedine Clienti › <b className="font-semibold uppercase text-[#0F172A]">Casa Bianchi</b></p>
      <p className="mt-1 text-[12.5px] font-bold tracking-[-0.02em]">Schedina Cliente</p>

      <div className="mt-3 flex items-center gap-4 rounded-[14px] border border-[#EEF2F6] bg-white px-3 py-2.5 shadow-[0_1px_4px_0_rgba(2,8,23,.05)]">
        <div>
          <TpLabel>Prodotti</TpLabel>
          <p className="text-[13px] font-bold">{shown}</p>
        </div>
        <div>
          <TpLabel>Colli tot.</TpLabel>
          <p className="text-[13px] font-bold"><CountUp key={shown} to={totColli} duration={0.5} /></p>
        </div>
      </div>

      <div className="mt-2.5 flex gap-3 border-b border-[#E2E8F0] text-[8.5px]">
        <span className="border-b-2 border-[#0F172A] pb-1 font-semibold">↓ Prodotti</span>
        <span className="pb-1 text-[#64748B]">Costi di Servizio</span>
        <span className="hidden pb-1 text-[#64748B] @md:inline">Documenti</span>
      </div>

      <div className="mt-2 overflow-hidden rounded-[14px] border border-[#EEF2F6] bg-white">
        <div className="grid grid-cols-[1.6fr_.4fr_.9fr_.5fr_.5fr] gap-1.5 border-b border-[#EEF2F6] px-2.5 py-1.5 text-[6px] font-semibold uppercase tracking-[0.12em] text-[#64748B]">
          <span>Tipo</span>
          <span className="text-center">Qty</span>
          <span className="text-center">Ordine</span>
          <span className="text-center">Magaz.</span>
          <span className="text-center">Colli</span>
        </div>
        {colliRows.map((r, i) => (
          <motion.div
            key={r.tipo}
            initial={false}
            animate={{ opacity: i < shown ? 1 : 0, x: i < shown ? 0 : -10 }}
            transition={{ duration: 0.4, ease: tpEase }}
            className="grid grid-cols-[1.6fr_.4fr_.9fr_.5fr_.5fr] items-center gap-1.5 border-b border-[#F8FAFC] px-2.5 py-1.5"
          >
            <span className="min-w-0">
              <span className="block truncate text-[6.5px] font-medium uppercase tracking-[0.1em] text-[#64748B]">{r.brand}</span>
              <span className="block truncate text-[9px] font-semibold">{r.tipo}</span>
            </span>
            <span className="text-center text-[8.5px]">{r.qty}</span>
            <span className="flex justify-center">
              {i < arrived ? (
                <TpChip kind="saldato" dot="#10B981">Arrivato</TpChip>
              ) : (
                <TpChip kind="open" dot="#3B82F6">Ordinato</TpChip>
              )}
            </span>
            <span className="text-center text-[8px] text-[#94A3B8]">—</span>
            <span className="text-center text-[8.5px] font-semibold">{r.colli}</span>
          </motion.div>
        ))}
        <div className="grid grid-cols-[1.6fr_.4fr_.9fr_.5fr_.5fr] items-center gap-1.5 bg-[#F8FAFC] px-2.5 py-1.5">
          <span className="text-[7px] font-semibold uppercase tracking-[0.14em] text-[#475569]">Σ Totali</span>
          <span className="text-center text-[8.5px] font-bold">{totQty}</span>
          <span />
          <span />
          <span className="text-center text-[8.5px] font-bold">{totColli}</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sede: Magazzino Italia selezionato + colonna Sede della tabella       */
/* ------------------------------------------------------------------ */

const sedeRows = [
  ["Casa Bianchi", "Corsia B", "Cucina"],
  ["Studio Ferraro", "Scaffale 4", "Applique da parete"],
  ["Famiglia Conti", "Sotto al portico", "Tavolo allungabile"],
] as const;

export function SedeScreen() {
  const [ref, step] = useLoopSteps(sedeRows.length, 1300);
  return (
    <div ref={ref} className="relative h-full">
      <div className="flex items-center justify-end gap-1.5">
        <span className="flex items-center gap-1 rounded-full border border-[#EEF2F6] bg-white px-2.5 py-1 text-[9px] font-medium shadow-[0_1px_4px_rgba(2,8,23,.05)]">🇮🇹 Magazzino Italia <span className="text-[#94A3B8]">▾</span></span>
        <span className="grid h-[22px] w-[22px] place-items-center rounded-full border border-[#EEF2F6] bg-white text-[9px] text-[#334155]">⇄</span>
      </div>
      <div className="mt-2 overflow-hidden rounded-[12px] border border-[#EEF2F6] bg-white">
        <div className="grid grid-cols-[1fr_.9fr_1.2fr] gap-2 border-b border-[#EEF2F6] px-2.5 py-1.5 text-[6.5px] font-semibold uppercase tracking-[0.14em] text-[#64748B]">
          <span>Cliente</span>
          <span>Sede</span>
          <span>Brand · tipo</span>
        </div>
        {sedeRows.map(([cliente, sede, tipo], i) => (
          <div key={tipo} className="grid grid-cols-[1fr_.9fr_1.2fr] items-center gap-2 border-b border-[#F8FAFC] px-2.5 py-1.5 last:border-b-0">
            <span className="truncate text-[8.5px] font-semibold">{cliente}</span>
            <motion.span
              animate={{ backgroundColor: i === step ? "#E8F0FE" : "rgba(232,240,254,0)", color: i === step ? "#2563EB" : "#64748B" }}
              transition={{ duration: 0.4, ease: tpEase }}
              className="w-fit truncate rounded-full px-1.5 py-0.5 text-[8px]"
            >
              {sede}
            </motion.span>
            <span className="truncate text-[8px] text-[#64748B]">{tipo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
