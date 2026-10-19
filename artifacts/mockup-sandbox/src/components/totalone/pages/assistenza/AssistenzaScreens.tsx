/**
 * Schermate animate della sezione Assistenze, ricostruite dagli screen reali:
 * - 4.webp  Assistenze (lista clienti, contatori, search, assistenze collegate, “Controllo rapido”)
 * - 3.webp  Schedina assistenza (Torna alle assistenze, 0/3, Segna conclusa, Documenti,
 *           Aggiungi prodotto, tab Prodotti/Costi, tabella prodotti).
 * Nessuna funzione inventata: le animazioni cambiano solo valori visti negli screen.
 * Clienti, brand e venditori sono fittizi.
 */
import { AnimatePresence, motion } from "framer-motion";
import {
  Archive,
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronDown,
  ChevronRight,
  CircleX,
  Filter,
  Layers,
  MessageSquare,
  Package,
  Paperclip,
  Plus,
  Search,
  Users,
  Wrench,
} from "lucide-react";
import { tpEase, useLoopSteps } from "@/components/totalone/motion-kit";
import { TpChip, TpLabel, TpPill, uiFont, type ChipKind } from "@/components/totalone/app-ui";

/* ------------------------------------------------------------------ */
/* Stati                                                               */
/* ------------------------------------------------------------------ */

/** Stati dell'assistenza, gli stessi in tutto il sito: Da gestire · In gestione · Risolta. */
export type StatoAssistenza = "gestire" | "gestione" | "risolta";

export const statoStyle: Record<StatoAssistenza, { kind: ChipKind; dot: string; label: string; bar: string; row: string }> = {
  gestire: { kind: "perso", dot: "#EF4444", label: "Da gestire", bar: "#EF4444", row: "#FEF7F7" },
  gestione: { kind: "media", dot: "#F97316", label: "In gestione", bar: "#F97316", row: "#FFFBF5" },
  risolta: { kind: "final", dot: "#10B981", label: "Risolta", bar: "#10B981", row: "#FFFFFF" },
};

export function StatoChip({ stato }: { stato: StatoAssistenza }) {
  const s = statoStyle[stato];
  return (
    <TpChip key={stato} kind={s.kind} dot={s.dot}>{s.label}</TpChip>
  );
}

/** Barra “0/3 · mancano 3” come negli screen. */
export function Avanzamento({ done, total, className = "" }: { done: number; total: number; className?: string }) {
  return (
    <div className={className}>
      <div className="flex justify-between gap-2 text-[7px]">
        <b className="text-[#0F172A]">{done}/{total}</b>
        <span className="text-[#64748B]">{done === total ? "completa" : `mancano ${total - done}`}</span>
      </div>
      <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-[#F1F5F9]">
        <motion.div className="h-full rounded-full bg-[#10B981]" initial={false} animate={{ width: `${(done / total) * 100}%` }} transition={{ duration: 0.6, ease: tpEase }} />
      </div>
    </div>
  );
}

function Counter({ dot, n, l }: { dot: string; n: number; l: string }) {
  return (
    <span className="flex h-[22px] items-center gap-1 rounded-full border border-[#EEF2F6] bg-white px-2 text-[8px]">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: dot }} />
      <motion.b key={n} initial={{ y: -4, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{n}</motion.b>
      <span className="text-[#64748B]">{l}</span>
    </span>
  );
}

function WrenchBadge({ size = 24 }: { size?: number }) {
  return (
    <span className="grid shrink-0 place-items-center rounded-full bg-[#EFF6FF] text-[#3B82F6]" style={{ width: size, height: size }}>
      <Wrench style={{ width: size * 0.46, height: size * 0.46 }} strokeWidth={1.75} />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* ASSISTENZE — lista clienti (screen 4)                               */
/* ------------------------------------------------------------------ */

type Cliente = { name: string; sub: string; done: number; total: number; stato: StatoAssistenza; prodotti: number; brand: string };

const clienti: Cliente[] = [
  { name: "Casa Bianchi", sub: "Giulia Ferri · 18 giu 2026", done: 0, total: 3, stato: "gestire", prodotti: 3, brand: "linea cucine pietra & co" },
  { name: "Villa Martini", sub: "Luca Gallo · 02 giu 2026", done: 0, total: 1, stato: "gestione", prodotti: 1, brand: "forma divani" },
  { name: "Studio Ferraro", sub: "Sara Rinaldi · 26 mag 2026", done: 0, total: 1, stato: "gestire", prodotti: 1, brand: "linea cucine" },
  { name: "Elena Rinaldi", sub: "Davide Neri · 14 mag 2026", done: 0, total: 1, stato: "gestione", prodotti: 1, brand: "luce & co" },
  { name: "Famiglia Conti", sub: "Giulia Ferri · 07 apr 2026", done: 1, total: 1, stato: "risolta", prodotti: 1, brand: "atelier legno" },
];

const prodottiCasaBianchi = [
  { name: "Anta pensile rigata – sostituzione in garanzia", brand: "Linea Cucine", time: "18 giu 2026 16:30" },
  { name: "Ripiano nuovo", brand: "Linea Cucine", time: "18 giu 2026 16:30" },
  { name: "Top cucina scheggiato", brand: "Pietra & Co", time: "18 giu 2026 16:31" },
];

function ClienteRow({ c, open = false, highlight = false }: { c: Cliente; open?: boolean; highlight?: boolean }) {
  return (
    <div className={`flex items-center gap-2 px-2.5 py-2 ${highlight ? "" : ""}`}>
      <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.3, ease: tpEase }} className="text-[#64748B]">
        <ChevronRight className="h-2.5 w-2.5" />
      </motion.span>
      <WrenchBadge size={22} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[9.5px] font-semibold uppercase text-[#2563EB]">{c.name}</p>
        <p className="truncate text-[7.5px] text-[#64748B]">{c.sub}</p>
      </div>
      <Avanzamento done={c.done} total={c.total} className="hidden w-[84px] @md:block" />
      <StatoChip stato={c.stato} />
      <div className="hidden w-[46px] text-center @xl:block">
        <p className="text-[9px] font-semibold">1</p>
        <p className="text-[5.5px] uppercase tracking-[0.12em] text-[#64748B]">Assistenza</p>
      </div>
      <div className="hidden w-[40px] text-center @xl:block">
        <p className="text-[9px] font-semibold">{c.prodotti}</p>
        <p className="text-[5.5px] uppercase tracking-[0.12em] text-[#64748B]">Prodotti</p>
      </div>
    </div>
  );
}

/** Popover “Controllo rapido” come nello screen 4. */
export function ControlloRapido({ className = "" }: { className?: string }) {
  return (
    <div className={`w-[230px] rounded-[10px] border border-[#E2E8F0] bg-white p-2.5 shadow-[0_18px_40px_rgba(15,23,42,.16)] ${className}`} style={uiFont}>
      <p className="flex items-center gap-1 text-[7px] font-semibold uppercase tracking-[0.14em] text-[#475569]"><MessageSquare className="h-2.5 w-2.5" />Controllo rapido</p>
      <div className="mt-1.5 divide-y divide-[#F1F5F9]">
        {[...prodottiCasaBianchi].reverse().map((p) => (
          <div key={p.name} className="py-1.5">
            <p className="truncate text-[8px] font-semibold text-[#0F172A]">{p.name}</p>
            <p className="text-[7.5px] text-[#334155]">Prodotto aggiunto in assistenza (standalone)</p>
            <p className="mt-0.5 text-[6.5px] text-[#64748B]">{p.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Card “assistenze collegate” (#1 · 3 prodotti) dentro il cliente espanso. */
function AssistenzaCollegata({ active = false }: { active?: boolean }) {
  return (
    <div className={`flex items-center gap-2 rounded-[12px] border bg-white px-2 py-1.5 transition-colors duration-300 ${active ? "border-[#93C5FD] shadow-[0_6px_16px_rgba(59,130,246,.14)]" : "border-[#BFDBFE]"}`}>
      <WrenchBadge size={18} />
      <span className="text-[8px] font-semibold text-[#2563EB]">#1</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[8.5px] font-semibold">3 prodotti</p>
        <p className="truncate text-[7px] text-[#64748B]">Creata il 18 giu 2026</p>
      </div>
      <span className="hidden @md:inline-flex"><StatoChip stato="gestire" /></span>
      <Avanzamento done={0} total={3} className="hidden w-[70px] @xl:block" />
      <ArrowRight className="h-2.5 w-2.5 text-[#3B82F6]" />
    </div>
  );
}

function AssistenzeHeader({ daGestire = 69, inGestione = 5, pronte = 9 }: { daGestire?: number; inGestione?: number; pronte?: number }) {
  return (
    <>
      <div className="flex items-start gap-2">
        <WrenchBadge size={28} />
        <div className="min-w-0">
          <p className="text-[12.5px] font-semibold leading-tight tracking-[-0.02em] text-[#020817]">Assistenze</p>
          <p className="mt-0.5 truncate text-[8.5px] text-[#64748B]">Clienti con prodotti in assistenza</p>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-1">
        <TpPill><Plus className="h-2.5 w-2.5" />Nuova assistenza</TpPill>
        <Counter dot="#EF4444" n={daGestire} l="da gestire" />
        <Counter dot="#F97316" n={inGestione} l="in gestione" />
        <span className="hidden @md:contents"><Counter dot="#10B981" n={pronte} l="pronte" /></span>
        <span className="ml-auto hidden h-[22px] items-center gap-1 rounded-full border border-[#E2E8F0] bg-white px-2.5 text-[8.5px] font-medium @xl:inline-flex"><Archive className="h-2.5 w-2.5" />Archivio</span>
      </div>
      <div className="mt-2 flex gap-3 border-b border-[#E2E8F0] text-[8.5px]">
        <span className="flex items-center gap-1 border-b-2 border-[#0F172A] pb-1 font-semibold"><Users className="h-2.5 w-2.5" />Clienti</span>
        <span className="flex items-center gap-1 pb-1 text-[#64748B]"><Package className="h-2.5 w-2.5" />Prodotti</span>
        <span className="flex items-center gap-1 pb-1 text-[#64748B]"><Calendar className="h-2.5 w-2.5" />Arrivi previsti</span>
      </div>
    </>
  );
}

function SearchBar({ query, counts, typing = false }: { query: string; counts: string; typing?: boolean }) {
  return (
    <div className="mt-2 flex items-center gap-1.5">
      <span className={`flex h-[22px] min-w-0 flex-1 items-center gap-1.5 rounded-full border bg-white px-2.5 text-[8.5px] transition-colors ${typing ? "border-[#93C5FD] ring-2 ring-[#3B82F6]/15" : "border-[#EEF2F6]"}`}>
        <Search className="h-2.5 w-2.5 shrink-0 text-[#94A3B8]" />
        {query ? (
          <span className="truncate text-[#0F172A]">{query}</span>
        ) : (
          <span className="truncate text-[#94A3B8]">Cerca cliente, prodotto, brand, venditore…</span>
        )}
        {typing && <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }} className="-ml-1 h-3 w-px bg-[#0F172A]" />}
      </span>
      <span className="inline-flex h-[22px] shrink-0 items-center gap-1 rounded-full border border-[#E2E8F0] bg-white px-2.5 text-[8.5px] font-medium"><Filter className="h-2.5 w-2.5" />Filtri avanzati</span>
      <span className="hidden shrink-0 text-[7.5px] text-[#64748B] @xl:inline">{counts}</span>
    </div>
  );
}

/**
 * Lista clienti in assistenza.
 * - `overview`: il primo cliente si espande, compare l'assistenza collegata e il “Controllo rapido”.
 * - `search`: si digita un brand e la lista si restringe ai clienti coinvolti.
 */
export function AssistenzeClientiScreen({ mode = "overview" }: { mode?: "overview" | "search" }) {
  const [ref, step] = useLoopSteps(mode === "overview" ? 6 : 8, mode === "overview" ? 1700 : 650);

  if (mode === "search") {
    const word = "Linea";
    const typed = step <= 1 ? 0 : Math.min(step - 1, word.length);
    const query = word.slice(0, typed);
    const filtered = typed === word.length;
    const list = filtered ? clienti.filter((c) => c.brand.includes("linea")) : clienti;
    return (
      <div ref={ref} className="relative h-full" style={uiFont}>
        <AssistenzeHeader />
        <SearchBar query={query} typing={typed > 0 && !filtered} counts={filtered ? "2 clienti · 4 prodotti" : "48 clienti · 83 prodotti"} />
        <div className="mt-2 space-y-1.5">
          <AnimatePresence initial={false}>
            {list.map((c) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: tpEase }}
                className={`overflow-hidden rounded-[14px] border bg-white shadow-[0_1px_4px_0_rgba(2,8,23,.05)] ${filtered ? "border-[#BFDBFE]" : "border-[#EEF2F6]"}`}
              >
                <ClienteRow c={c} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  const open = step >= 1 && step <= 4;
  const hover = step === 3 || step === 4;
  return (
    <div ref={ref} className="relative h-full" style={uiFont}>
      <AssistenzeHeader />
      <SearchBar query="" counts="48 clienti · 83 prodotti" />
      <div className="relative mt-2 space-y-1.5">
        <div className={`overflow-hidden rounded-[14px] border bg-white shadow-[0_1px_4px_0_rgba(2,8,23,.05)] transition-colors duration-300 ${open ? "border-[#BFDBFE]" : "border-[#EEF2F6]"}`}>
          <ClienteRow c={clienti[0]} open={open} />
          <AnimatePresence initial={false}>
            {open && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: tpEase }} className="overflow-hidden">
                <div className="border-t border-[#F1F5F9] bg-[#FBFCFE] px-2.5 pb-2 pt-1.5">
                  <TpLabel className="mb-1">Assistenze collegate</TpLabel>
                  <AssistenzaCollegata active={hover} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {clienti.slice(1).map((c) => (
          <div key={c.name} className="rounded-[14px] border border-[#EEF2F6] bg-white shadow-[0_1px_4px_0_rgba(2,8,23,.05)]">
            <ClienteRow c={c} />
          </div>
        ))}
        <AnimatePresence>
          {hover && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.3, ease: tpEase }}
              className="absolute left-2 top-[96px] z-20"
            >
              <ControlloRapido />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SCHEDINA ASSISTENZA (screen 3)                                      */
/* ------------------------------------------------------------------ */

type RigaSchedina = { name: string; brand: string; arrivo: string; stato: StatoAssistenza; carico: string; focus?: "arrivo" | "stato" | "carico" | "doc" };

const azioni = [ArrowRight, MessageSquare, Layers, CircleX, Paperclip];

function DateInput({ value, focus = false }: { value: string; focus?: boolean }) {
  return (
    <span className={`flex h-[18px] w-full items-center justify-between rounded-[6px] border bg-white px-1.5 text-[7.5px] transition-all duration-300 ${focus ? "border-[#3B82F6] ring-2 ring-[#3B82F6]/20" : "border-[#E2E8F0]"}`}>
      <motion.span key={value} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className={value ? "font-medium text-[#0F172A]" : "text-[#334155]"}>
        {value || "gg/mm/aaaa"}
      </motion.span>
      <Calendar className="h-2 w-2 text-[#0F172A]" />
    </span>
  );
}

function StatoSelect({ stato, focus = false }: { stato: StatoAssistenza; focus?: boolean }) {
  const s = statoStyle[stato];
  const tone = stato === "gestire" ? "bg-[#FEF2F2] text-[#DC2626]" : stato === "risolta" ? "bg-[#ECFDF5] text-[#047857]" : "bg-[#FFF7ED] text-[#EA580C]";
  return (
    <span className={`flex h-[18px] w-full items-center gap-1 rounded-full px-1.5 text-[7.5px] font-semibold transition-all duration-300 ${tone} ${focus ? "ring-2 ring-[#3B82F6]/30" : ""}`}>
      <span className="h-1 w-1 shrink-0 rounded-full" style={{ background: s.dot }} />
      <motion.span key={stato} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="truncate">{s.label}</motion.span>
      <ChevronDown className="ml-auto h-2 w-2 shrink-0 opacity-70" />
    </span>
  );
}

function CaricoSelect({ value, focus = false }: { value: string; focus?: boolean }) {
  const set = value !== "A carico di…";
  return (
    <span className={`flex h-[18px] w-full items-center gap-1 rounded-full border px-1.5 text-[7.5px] transition-all duration-300 ${set ? "border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]" : "border-[#E2E8F0] bg-white text-[#64748B]"} ${focus ? "ring-2 ring-[#3B82F6]/25" : ""}`}>
      <motion.span key={value} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="truncate">{value}</motion.span>
      <ChevronDown className="ml-auto h-2 w-2 shrink-0" />
    </span>
  );
}

function SchedinaRow({ r }: { r: RigaSchedina }) {
  const s = statoStyle[r.stato];
  return (
    <motion.div animate={{ backgroundColor: s.row }} transition={{ duration: 0.4 }} className="flex items-center gap-2 border-t border-[#F1F5F9] px-2 py-1.5">
      <span className="h-2.5 w-2.5 shrink-0 rounded-[3px] border border-[#94A3B8] bg-white" />
      <ChevronRight className="h-2.5 w-2.5 shrink-0 text-[#64748B]" />
      <div className="flex min-w-0 flex-1 items-center gap-1.5">
        <motion.span animate={{ backgroundColor: s.bar }} transition={{ duration: 0.4 }} className="h-5 w-[2px] shrink-0 rounded-full" />
        <p className="line-clamp-2 text-[8px] font-semibold leading-tight text-[#0F172A]">{r.name}</p>
      </div>
      <span className="hidden w-[62px] shrink-0 truncate text-[8px] text-[#475569] @md:block">{r.brand}</span>
      <span className="hidden w-[70px] shrink-0 @xl:block"><DateInput value={r.arrivo} focus={r.focus === "arrivo"} /></span>
      <span className="hidden w-[18px] shrink-0 text-center text-[8px] text-[#94A3B8] @3xl:block">—</span>
      <span className="hidden w-[40px] shrink-0 items-center gap-0.5 text-[7px] leading-tight text-[#475569] @3xl:flex"><Calendar className="h-2 w-2 shrink-0" />18 giu 2026</span>
      <span className="flex w-[74px] shrink-0 items-center gap-1">
        <StatoSelect stato={r.stato} focus={r.focus === "stato"} />
        <span className="hidden text-[6.5px] text-[#94A3B8] @xl:inline">M</span>
      </span>
      <span className="hidden w-[76px] shrink-0 @3xl:block"><CaricoSelect value={r.carico} focus={r.focus === "carico"} /></span>
      <span className="hidden shrink-0 items-center gap-1.5 text-[#0F172A] @xl:flex">
        {azioni.map((Icon, i) => (
          <span key={i} className={`relative grid h-3.5 w-3.5 place-items-center rounded-full transition-colors ${r.focus === "doc" && i === 4 ? "bg-[#DBEAFE] text-[#2563EB]" : ""}`}>
            <Icon className="h-2.5 w-2.5" strokeWidth={1.75} />
            {i === 1 && <span className="absolute -right-1 -top-1 grid h-2 w-2 place-items-center rounded-full bg-[#3B82F6] text-[4.5px] font-bold text-white">1</span>}
          </span>
        ))}
      </span>
    </motion.div>
  );
}

function headerStato(rows: RigaSchedina[]): StatoAssistenza {
  if (rows.every((r) => r.stato === "risolta")) return "risolta";
  if (rows.some((r) => r.stato !== "gestire")) return "gestione";
  return "gestire";
}

/** Schedina assistenza: le righe prodotto avanzano ciascuna con il proprio stato. */
export function SchedinaAssistenzaScreen({ focus = "stati" }: { focus?: "stati" | "documenti" }) {
  const [ref, step] = useLoopSteps(8, 1500);
  const base: RigaSchedina[] = [
    { name: prodottiCasaBianchi[0].name, brand: "Linea Cucine", arrivo: "", stato: "gestire", carico: "A carico Brand" },
    { name: prodottiCasaBianchi[1].name, brand: "Linea Cucine", arrivo: "", stato: "gestire", carico: "A carico di…" },
    { name: prodottiCasaBianchi[2].name, brand: "Pietra & Co", arrivo: "", stato: "gestire", carico: "A carico di…" },
  ];
  const rows = base.map((r) => ({ ...r }));
  if (focus === "stati") {
    if (step === 1) rows[0].focus = "arrivo";
    if (step >= 2) rows[0].arrivo = "24/06/2026";
    if (step === 3) rows[0].focus = "stato";
    if (step >= 3) rows[0].stato = "gestione";
    if (step >= 5) rows[0].stato = "risolta";
    if (step >= 4) rows[1].stato = "gestione";
    if (step === 4) rows[1].focus = "stato";
    if (step === 6) rows[2].focus = "carico";
    if (step >= 6) rows[2].carico = "A carico Brand";
  } else {
    rows[0].arrivo = "24/06/2026";
    rows[0].stato = "gestione";
    rows[(Math.floor(step / 2) % 3)].focus = "doc";
  }
  const done = rows.filter((r) => r.stato === "risolta").length;
  const docFocus = focus === "documenti" && step % 2 === 1;

  return (
    <div ref={ref} className="relative h-full" style={uiFont}>
      <p className="flex items-center gap-1.5 text-[8.5px] text-[#475569]"><ArrowLeft className="h-2.5 w-2.5" />Torna alle assistenze</p>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
        <div className="flex min-w-0 items-start gap-2">
          <WrenchBadge size={26} />
          <div className="min-w-0">
            <p className="text-[12.5px] font-semibold uppercase leading-tight tracking-[-0.01em] text-[#2563EB]">Casa Bianchi</p>
            <p className="mt-0.5 truncate text-[7.5px] text-[#64748B]">Giulia Ferri · 18 giu 2026 · 3 prodotti · {done}/3 risolte</p>
          </div>
        </div>
        <StatoChip stato={headerStato(rows)} />
        <div className="hidden w-[110px] @md:block">
          <Avanzamento done={done} total={3} />
          <p className="mt-0.5 text-[6.5px] text-[#64748B]">{done} assistenze risolte su 3</p>
        </div>
        <div className="flex items-center gap-1 @3xl:ml-auto">
          <span className="hidden h-[22px] items-center gap-1 rounded-full border border-[#E2E8F0] bg-white px-2.5 text-[8.5px] font-medium @xl:inline-flex"><Archive className="h-2.5 w-2.5" />Segna conclusa</span>
          <span className={`inline-flex h-[22px] items-center gap-1 rounded-full border bg-white px-2.5 text-[8.5px] font-medium transition-all duration-300 ${docFocus ? "border-[#3B82F6] ring-2 ring-[#3B82F6]/20" : "border-[#E2E8F0]"}`}><Paperclip className="h-2.5 w-2.5" />Documenti</span>
          <TpPill><Plus className="h-2.5 w-2.5" />Aggiungi prodotto</TpPill>
        </div>
      </div>
      <div className="mt-3 inline-flex rounded-full border border-[#EEF2F6] bg-white p-0.5 text-[8px]">
        <span className="rounded-full bg-[#3B82F6] px-2.5 py-1 font-medium text-white">Prodotti</span>
        <span className="px-2.5 py-1 text-[#334155]">Costi</span>
      </div>
      <div className="mt-2 overflow-hidden rounded-[14px] border border-[#EEF2F6] bg-white shadow-[0_1px_4px_0_rgba(2,8,23,.05)]">
        <div className="flex items-center gap-2 px-2 py-1.5 text-[7px] text-[#64748B]">
          <span className="h-2.5 w-2.5 shrink-0 rounded-[3px] border border-[#94A3B8]" />
          <span className="w-2.5 shrink-0" />
          <span className="min-w-0 flex-1 pl-2">Prodotto</span>
          <span className="hidden w-[62px] shrink-0 leading-tight @md:block">Brand / Colore</span>
          <span className="hidden w-[70px] shrink-0 @xl:block">Arrivo prev.</span>
          <span className="hidden w-[18px] shrink-0 @3xl:block">Arrivi</span>
          <span className="hidden w-[40px] shrink-0 @3xl:block">Data</span>
          <span className="w-[74px] shrink-0">Stato</span>
          <span className="hidden w-[76px] shrink-0 @3xl:block">A carico</span>
          <span className="hidden w-[84px] shrink-0 text-right @xl:block">Azioni</span>
        </div>
        {rows.map((r) => <SchedinaRow key={r.name} r={r} />)}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Frammenti della schedina per le card bento                          */
/* ------------------------------------------------------------------ */

/** Tre prodotti della stessa assistenza, ognuno con il suo stato. */
export function MiniStatiProdotto() {
  const [ref, step] = useLoopSteps(4, 1600);
  const seq: StatoAssistenza[][] = [
    ["gestire", "gestire", "gestire"],
    ["gestione", "gestire", "gestire"],
    ["risolta", "gestione", "gestire"],
    ["risolta", "risolta", "gestione"],
  ];
  const stati = seq[step];
  return (
    <div ref={ref} className="space-y-1.5" style={uiFont}>
      {prodottiCasaBianchi.map((p, i) => {
        const s = statoStyle[stati[i]];
        return (
          <motion.div key={p.name} animate={{ backgroundColor: s.row }} className="flex items-center gap-2 rounded-[12px] border border-[#EEF2F6] px-2.5 py-2">
            <motion.span animate={{ backgroundColor: s.bar }} className="h-6 w-[2px] shrink-0 rounded-full" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-semibold text-[#0F172A]">{p.name}</p>
              <p className="text-[8.5px] text-[#64748B]">{p.brand}</p>
            </div>
            <span className="w-[82px] shrink-0"><StatoSelect stato={stati[i]} /></span>
          </motion.div>
        );
      })}
    </div>
  );
}

/** Colonna “Arrivo prev.” che si compila. */
export function MiniArrivo() {
  const [ref, step] = useLoopSteps(3, 1700);
  return (
    <div ref={ref} className="rounded-[14px] border border-[#EEF2F6] bg-white p-3" style={uiFont}>
      <div className="flex text-[8px] text-[#64748B]"><span className="flex-1">Prodotto</span><span className="w-[92px]">Arrivo prev.</span></div>
      {[["Ripiano nuovo", "24/06/2026"], ["Top cucina scheggiato", "02/07/2026"]].map(([n, d], i) => (
        <div key={n} className="mt-2 flex items-center gap-2">
          <p className="min-w-0 flex-1 truncate text-[10px] font-semibold text-[#0F172A]">{n}</p>
          <span className="w-[92px] shrink-0"><DateInput value={step > i ? d : ""} focus={step === i} /></span>
        </div>
      ))}
    </div>
  );
}

/** Pulsante “Documenti” e allegato per prodotto, evidenziati a turno. */
export function MiniDocumenti() {
  const [ref, step] = useLoopSteps(4, 1300);
  return (
    <div ref={ref} className="rounded-[14px] border border-[#EEF2F6] bg-white p-3" style={uiFont}>
      <div className="flex items-center gap-1.5">
        <span className={`inline-flex h-[24px] items-center gap-1 rounded-full border bg-white px-3 text-[9px] font-medium transition-all duration-300 ${step === 0 ? "border-[#3B82F6] ring-2 ring-[#3B82F6]/20" : "border-[#E2E8F0]"}`}><Paperclip className="h-3 w-3" />Documenti</span>
        <TpPill className="!h-[24px] !text-[9px]"><Plus className="h-2.5 w-2.5" />Aggiungi prodotto</TpPill>
      </div>
      <div className="mt-3 space-y-1.5">
        {prodottiCasaBianchi.map((p, i) => (
          <div key={p.name} className="flex items-center gap-2 rounded-[10px] bg-[#F8FAFC] px-2 py-1.5">
            <p className="min-w-0 flex-1 truncate text-[9px] font-medium text-[#0F172A]">{p.name}</p>
            <span className={`grid h-5 w-5 place-items-center rounded-full transition-colors duration-300 ${step === i + 1 ? "bg-[#DBEAFE] text-[#2563EB]" : "text-[#334155]"}`}><Paperclip className="h-3 w-3" /></span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Tab Prodotti / Costi della schedina (solo il selettore: il contenuto di Costi non è illustrato). */
export function MiniTabCosti() {
  const [ref, step] = useLoopSteps(2, 1800);
  return (
    <div ref={ref} className="inline-flex rounded-full border border-[#EEF2F6] bg-white p-1 text-[10px] shadow-[0_1px_4px_rgba(2,8,23,.05)]" style={uiFont}>
      {["Prodotti", "Costi"].map((t, i) => (
        <motion.span
          key={t}
          animate={{ backgroundColor: step === i ? "#3B82F6" : "rgba(59,130,246,0)", color: step === i ? "#FFFFFF" : "#334155" }}
          transition={{ duration: 0.35, ease: tpEase }}
          className="rounded-full px-3.5 py-1.5 font-medium"
        >
          {t}
        </motion.span>
      ))}
    </div>
  );
}

/** Colonna “A carico” della schedina (screen 3): si sceglie a carico di chi è l'intervento sul prodotto. */
export function MiniCarico() {
  const [ref, step] = useLoopSteps(4, 1600);
  const valori = ["A carico Brand", step >= 2 ? "A carico Brand" : "A carico di…", "A carico di…"];
  return (
    <div ref={ref} className="rounded-[14px] border border-[#EEF2F6] bg-white p-3" style={uiFont}>
      <div className="flex text-[8px] text-[#64748B]"><span className="flex-1">Prodotto</span><span className="w-[96px]">A carico</span></div>
      {prodottiCasaBianchi.map((p, i) => (
        <div key={p.name} className="mt-2 flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-semibold text-[#0F172A]">{p.name}</p>
            <p className="text-[8px] text-[#64748B]">{p.brand}</p>
          </div>
          <span className="w-[96px] shrink-0"><CaricoSelect value={valori[i]} focus={step === 1 && i === 1} /></span>
        </div>
      ))}
    </div>
  );
}
