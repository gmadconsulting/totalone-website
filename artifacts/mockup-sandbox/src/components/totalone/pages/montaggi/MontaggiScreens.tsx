/**
 * Schermate animate della sezione Montaggi, ricostruite dagli screen reali:
 * - Montaggi · Calendario mese (8.webp)
 * - Montaggi · Mappa (7.webp) — mappa disegnata in SVG neutro, nessuna tile reale
 * - Rapportini di montaggio (6.webp) — storico con ricerca e card "Fine lavoro"
 * - Anteprima rapportino (5.webp) — modale documento con Stampa
 * Clienti, persone e showroom sono fittizi.
 */
import { AnimatePresence, motion } from "framer-motion";
import {
  Archive,
  Building2,
  Calendar,
  CalendarDays,
  Camera,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  ExternalLink,
  Eye,
  FileText,
  Hammer,
  Map as MapIcon,
  MapPin,
  Navigation,
  Package,
  Pencil,
  PenLine,
  Plus,
  Printer,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { tpEase, useLoopSteps } from "@/components/totalone/motion-kit";
import { FakeCursor, TpChip, TpGhost, TpLabel, TpPageHeader, TpPill, TpSearch, docFont, uiFont } from "@/components/totalone/app-ui";

/* ------------------------------------------------------------------ */
/* Intestazione comune della pagina Montaggi (8.webp / 7.webp)          */
/* ------------------------------------------------------------------ */

function MontaggiHeader({ tab }: { tab: "calendario" | "mappa" }) {
  const tabs = [
    { id: "calendario", label: "Calendario", icon: Calendar },
    { id: "mappa", label: "Mappa", icon: MapIcon },
    { id: "prodotti", label: "Prodotti", icon: Package },
  ];
  return (
    <>
      <div className="flex items-start gap-2">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-[12.5px] font-semibold leading-tight tracking-[-0.02em] text-[#020817]">
            <Hammer className="h-3.5 w-3.5 text-[#3B82F6]" strokeWidth={1.75} />
            Montaggi
          </p>
          <p className="mt-0.5 truncate text-[8.5px] text-[#64748B]">Gestisci la programmazione e i prodotti da montare.</p>
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <span className="inline-flex h-[22px] items-center gap-1 rounded-[6px] bg-[#3B82F6] px-2 text-[8.5px] font-medium text-white">
            <Plus className="h-2.5 w-2.5" />
            Consegna manuale
          </span>
          <span className="hidden items-center gap-1 text-[8.5px] text-[#334155] @md:flex">
            <CalendarDays className="h-2.5 w-2.5" />
            Previsti
          </span>
          <span className="hidden items-center gap-1 text-[8.5px] text-[#334155] @xl:flex">
            <Archive className="h-2.5 w-2.5" />
            Archivio
          </span>
        </div>
      </div>
      <div className="mt-2 flex gap-3 border-b border-[#E2E8F0] text-[8.5px]">
        {tabs.map((t) => (
          <span key={t.id} className={`flex items-center gap-1 pb-1 ${t.id === tab ? "border-b-2 border-[#0F172A] font-semibold text-[#0F172A]" : "text-[#64748B]"}`}>
            <t.icon className="h-2.5 w-2.5" />
            {t.label}
          </span>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* CALENDARIO — i montaggi si aggiungono, filtro I miei / Tutti         */
/* ------------------------------------------------------------------ */

type CalEvent = { name: string; who: string; days: number[]; mine: boolean; from: number };

const calEvents: CalEvent[] = [
  { name: "Villa Martini", who: "Davide Neri", days: [6, 7, 8], mine: true, from: 0 },
  { name: "Elena Rinaldi", who: "Non assegnato", days: [13], mine: false, from: 0 },
  { name: "Casa Bianchi", who: "Davide Neri", days: [16, 17], mine: true, from: 1 },
  { name: "Studio Ferraro", who: "Non assegnato", days: [21, 22], mine: false, from: 2 },
  { name: "Famiglia Conti", who: "Luca Gallo", days: [27], mine: false, from: 3 },
];

/** Celle di ottobre 2026: da lunedì 28 settembre a domenica 1 novembre. */
const calCells = [
  ...[28, 29, 30].map((d) => ({ d, out: true })),
  ...Array.from({ length: 31 }, (_, i) => ({ d: i + 1, out: false })),
  { d: 1, out: true },
];

export function MontaggiCalendarioScreen() {
  const [ref, step] = useLoopSteps(6, 1500);
  const onlyMine = step === 4;
  return (
    <div ref={ref} className="relative flex h-full flex-col">
      <MontaggiHeader tab="calendario" />
      <div className="mt-2 flex items-center gap-2">
        <span className="flex h-[22px] min-w-0 flex-1 items-center gap-1.5 rounded-full border border-[#EEF2F6] bg-white px-2.5 text-[8.5px] text-[#94A3B8] @xl:max-w-[55%]">
          <Search className="h-2.5 w-2.5 shrink-0" />
          <span className="truncate">Cerca cliente o venditore…</span>
        </span>
        <span className="flex shrink-0 items-center text-[8px]">
          {["I miei", "Tutti"].map((l) => {
            const on = (l === "I miei") === onlyMine;
            return (
              <span key={l} className={`rounded-[5px] px-1.5 py-1 font-medium transition-colors duration-300 ${on ? "bg-[#0F172A] text-white" : "text-[#64748B]"}`}>
                {l}
              </span>
            );
          })}
        </span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <ChevronLeft className="h-2.5 w-2.5 text-[#334155]" />
        <span className="text-[8.5px] font-medium text-[#3B82F6]">Oggi</span>
        <ChevronRight className="h-2.5 w-2.5 text-[#334155]" />
        <span className="text-[10px] font-semibold">Ottobre 2026</span>
        <span className="ml-auto flex text-[7.5px]">
          <span className="rounded-[5px] bg-[#0F172A] px-1.5 py-0.5 font-medium text-white">Mese</span>
          <span className="px-1.5 py-0.5">Settimana</span>
          <span className="hidden px-1.5 py-0.5 @md:inline">Giorno</span>
        </span>
      </div>
      <div className="mt-1.5 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[12px] border border-[#EEF2F6] bg-white">
        <div className="grid grid-cols-7 border-b border-[#EEF2F6] text-center text-[7.5px] font-medium">
          {["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"].map((d) => (
            <span key={d} className="py-1">{d}</span>
          ))}
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-7 grid-rows-5">
          {calCells.map((c, i) => {
            const events = c.out ? [] : calEvents.filter((e) => e.days.includes(c.d));
            return (
              <div key={i} className={`min-w-0 overflow-hidden border-b border-r border-[#F1F5F9] p-[3px] @md:p-1 ${!c.out && c.d === 15 ? "bg-[#FEFCE8]" : ""}`}>
                <span className={`text-[7.5px] font-medium ${c.out ? "text-[#CBD5E1]" : "text-[#334155]"}`}>{c.d}</span>
                <AnimatePresence initial={false}>
                  {events.map(
                    (e) =>
                      step >= e.from && (
                        <motion.div
                          key={e.name}
                          initial={{ opacity: 0, y: -14, scale: 0.85 }}
                          animate={{ opacity: onlyMine && !e.mine ? 0.12 : 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 300, damping: 22, delay: e.days.indexOf(c.d) * 0.08 }}
                        >
                          <CalCard name={e.name} who={e.who} />
                        </motion.div>
                      ),
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CalCard({ name, who }: { name: string; who: string }) {
  return (
    <div className="mt-0.5 rounded-[4px] border-l-2 border-[#E8A898] bg-[#F6DCD3] px-1 py-0.5">
      <p className="truncate text-[6.5px] font-bold uppercase leading-tight text-[#1E293B]">{name}</p>
      <p className="hidden truncate text-[5.5px] italic leading-tight text-[#64748B] @md:block">{who}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MAPPA — giorno, showroom, montaggi che compaiono, itinerario          */
/* ------------------------------------------------------------------ */

const showrooms = [
  { name: "Milano Centro", city: "Milano", x: 196, y: 240 },
  { name: "Lugano", city: "Lugano", x: 156, y: 98 },
  { name: "Como", city: "Como", x: 197, y: 150 },
  { name: "Bergamo", city: "Bergamo", x: 296, y: 186 },
];

const mapJobs = [
  { name: "Studio Ferraro", city: "Varese", x: 128, y: 166, search: "Studio Fe" },
  { name: "Villa Martini", city: "Lecco", x: 258, y: 128, search: "Villa Mar" },
  { name: "Casa Bianchi", city: "Monza", x: 236, y: 196, search: "Casa Bia" },
];

const cities: [string, number, number][] = [
  ["Lugano", 160, 88],
  ["Como", 206, 160],
  ["Varese", 104, 150],
  ["Lecco", 262, 150],
  ["Bergamo", 304, 200],
  ["Monza", 238, 214],
  ["Milano", 206, 256],
  ["Novara", 52, 238],
  ["Lodi", 262, 300],
  ["Brescia", 360, 214],
];

export function MontaggiMappaScreen() {
  const [ref, step] = useLoopSteps(8, 1300);
  const added = Math.min(Math.max(step, 0), 3);
  const routeOn = step >= 5;
  const typing = step >= 1 && step <= 3 ? mapJobs[step - 1].search : "";
  const cursor = step >= 4 && step <= 5 ? { x: "22%", y: "33%" } : { x: "30%", y: "46%" };

  return (
    <div ref={ref} className="relative flex h-full flex-col">
      <MontaggiHeader tab="mappa" />
      <div className="mt-2 grid min-h-0 flex-1 grid-cols-[118px_1fr] gap-2 @xl:grid-cols-[176px_1fr]">
        {/* Pannello laterale */}
        <div className="flex min-h-0 flex-col overflow-hidden rounded-[12px] border border-[#EEF2F6] bg-white p-2">
          <TpLabel>Giorno</TpLabel>
          <span className="mt-1 flex h-[20px] items-center justify-between rounded-[6px] border border-[#E2E8F0] px-1.5 text-[8.5px] text-[#0F172A]">
            16/10/2026
            <CalendarDays className="h-2.5 w-2.5" />
          </span>
          <motion.span
            animate={{ backgroundColor: added > 0 ? "#3B82F6" : "#A5C8FB", scale: step === 5 ? [1, 0.95, 1] : 1 }}
            transition={{ duration: 0.4 }}
            className="mt-1.5 flex h-[20px] items-center justify-center gap-1 rounded-full text-[8px] font-medium text-white"
          >
            <Navigation className="h-2.5 w-2.5" />
            <span className="truncate">Itinerario del giorno</span>
          </motion.span>
          <span className="mt-1.5 flex h-[20px] items-center gap-1 rounded-full border border-[#E2E8F0] px-1.5 text-[8px]">
            <Search className="h-2.5 w-2.5 shrink-0 text-[#94A3B8]" />
            {typing ? (
              <span className="truncate text-[#0F172A]">
                {typing}
                <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }} className="ml-px inline-block h-2 w-px bg-[#0F172A] align-middle" />
              </span>
            ) : (
              <span className="truncate text-[#94A3B8]">Cerca cliente…</span>
            )}
          </span>

          <p className="mt-2 flex items-center gap-1 border-t border-[#F1F5F9] pt-1.5 text-[7px] font-semibold uppercase tracking-[0.1em] text-[#475569]">
            <Building2 className="h-2.5 w-2.5" />
            Showroom
          </p>
          <div className="mt-0.5 space-y-0.5">
            {showrooms.map((s, i) => (
              <div key={s.name} className={`flex items-center gap-1 rounded-[6px] px-1 py-[3px] ${i === 0 ? "bg-[#EFF6FF]" : ""}`}>
                <Building2 className="h-2.5 w-2.5 shrink-0 text-[#64748B]" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[7.5px] font-semibold text-[#0F172A]">{s.name}</p>
                  <p className="hidden truncate text-[6.5px] text-[#64748B] @xl:block">{s.name}, {s.city}</p>
                </div>
                <span className="hidden text-[6.5px] text-[#64748B] @xl:inline">{s.city}</span>
                <ExternalLink className="h-2 w-2 shrink-0 text-[#64748B]" />
              </div>
            ))}
          </div>

          <p className="mt-2 flex items-center gap-1 text-[7px] font-semibold uppercase tracking-[0.1em] text-[#475569]">
            <MapPin className="h-2.5 w-2.5" />
            Montaggi
            <motion.span key={added} initial={{ scale: 0.6 }} animate={{ scale: 1 }} className="grid h-3 min-w-3 place-items-center rounded-full bg-[#F1F5F9] px-1 text-[6.5px] text-[#0F172A]">
              {added}
            </motion.span>
          </p>
          <div className="mt-0.5 min-h-0 space-y-0.5">
            {added === 0 && <p className="text-[7px] leading-snug text-[#64748B]">Nessun montaggio in questo giorno. Cerca un cliente per aggiungerlo.</p>}
            <AnimatePresence initial={false}>
              {mapJobs.slice(0, added).map((j) => (
                <motion.div
                  key={j.name}
                  initial={{ opacity: 0, height: 0, x: -8 }}
                  animate={{ opacity: 1, height: "auto", x: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: tpEase }}
                >
                  <div className="flex items-center gap-1 rounded-[6px] px-1 py-[3px]">
                    <MapPin className="h-2.5 w-2.5 shrink-0 text-[#F36B4D]" />
                    <p className="min-w-0 flex-1 truncate text-[7.5px] font-semibold text-[#0F172A]">{j.name}</p>
                    <span className="hidden text-[6.5px] text-[#64748B] @xl:inline">{j.city}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Mappa stilizzata */}
        <div className="relative min-h-0 overflow-hidden rounded-[12px] border border-[#EEF2F6] bg-[#EEF2EA]">
          <StylizedMap added={added} routeOn={routeOn} />
          <div className="absolute left-1.5 top-1.5 overflow-hidden rounded-[4px] border border-[#CBD5E1] bg-white text-center text-[9px] font-semibold leading-[14px] text-[#334155]">
            <span className="block w-[14px] border-b border-[#E2E8F0]">+</span>
            <span className="block w-[14px]">−</span>
          </div>
        </div>
      </div>
      <FakeCursor x={cursor.x} y={cursor.y} click={step === 5} />
    </div>
  );
}

function StylizedMap({ added, routeOn }: { added: number; routeOn: boolean }) {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Mappa stilizzata con showroom e montaggi del giorno">
      <rect width="400" height="320" fill="#EEF2EA" />
      {/* rilievi morbidi */}
      <ellipse cx="90" cy="40" rx="120" ry="60" fill="#E4EADC" />
      <ellipse cx="320" cy="50" rx="140" ry="70" fill="#E4EADC" />
      <ellipse cx="300" cy="300" rx="160" ry="50" fill="#F2F4EE" />
      {/* confine */}
      <path d="M0 122 C 60 112, 90 140, 132 120 S 182 130, 200 108 S 262 72, 302 84 S 362 64, 400 74" fill="none" stroke="#C9B8D6" strokeWidth="1.4" strokeDasharray="5 4" />
      {/* laghi */}
      <g fill="#CDE2F2">
        <path d="M90 20 C 100 60, 86 92, 98 122 S 110 160, 104 182 L 113 181 C 120 152, 106 120, 108 96 S 104 50, 99 18 Z" />
        <path d="M138 96 C 150 90, 160 104, 174 98 C 170 108, 152 110, 138 104 Z" />
        <path d="M204 34 C 208 66, 212 88, 220 108 L 210 140 L 217 142 L 228 118 L 240 142 L 247 140 L 232 106 C 226 84, 218 62, 213 34 Z" />
        <path d="M318 118 C 325 130, 320 150, 328 164 L 334 162 C 328 148, 332 130, 323 116 Z" />
      </g>
      {/* strade */}
      <g fill="none" strokeLinecap="round">
        {[
          "M196 240 L 197 150 L 156 98",
          "M196 240 C 230 220, 270 200, 296 186 L 380 210",
          "M196 240 C 160 210, 130 190, 104 150",
          "M196 240 L 52 236",
          "M236 210 C 246 180, 256 160, 262 146",
          "M196 240 L 262 300",
        ].map((d) => (
          <g key={d}>
            <path d={d} stroke="#FFFFFF" strokeWidth="4" />
            <path d={d} stroke="#EBD7A8" strokeWidth="1.6" />
          </g>
        ))}
      </g>
      {/* città */}
      <g fontFamily="Inter, ui-sans-serif, system-ui, sans-serif" fontSize="8.5" fill="#6B7280">
        {cities.map(([n, x, y]) => (
          <text key={n} x={x} y={y} textAnchor="middle">{n}</text>
        ))}
      </g>
      {/* itinerario */}
      <motion.path
        d="M196 240 Q 150 214 128 166 Q 186 112 258 128 Q 254 166 236 196"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{ pathLength: routeOn ? 1 : 0, opacity: routeOn ? 0.85 : 0 }}
        transition={{ pathLength: { duration: routeOn ? 1.6 : 0.3, ease: "easeInOut" }, opacity: { duration: 0.3 } }}
      />
      {/* showroom */}
      {showrooms.map((s) => (
        <g key={s.name} transform={`translate(${s.x} ${s.y})`}>
          <circle r="6" fill="#3B82F6" fillOpacity=".18" />
          <circle r="3.6" fill="#3B82F6" stroke="#fff" strokeWidth="1.6" />
        </g>
      ))}
      {/* montaggi */}
      {mapJobs.map((j, i) => (
        <g key={j.name} transform={`translate(${j.x} ${j.y})`}>
          <AnimatePresence>
            {i < added && (
              <motion.g initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 380, damping: 16 }}>
                <ellipse cx="0" cy="0.5" rx="3.5" ry="1.4" fill="#0F172A" fillOpacity=".18" />
                <path d="M0 0 C -2 -5 -7 -8 -7 -13 A 7 7 0 1 1 7 -13 C 7 -8 2 -5 0 0 Z" fill="#F36B4D" stroke="#fff" strokeWidth="1.2" />
                <circle cx="0" cy="-13" r="2.4" fill="#fff" />
                {routeOn && (
                  <motion.text initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.4 }} x="9" y="-14" fontFamily="Inter, ui-sans-serif, system-ui, sans-serif" fontSize="8" fontWeight="700" fill="#0F172A" paintOrder="stroke" stroke="#fff" strokeWidth="2.5">
                    {i + 1}. {j.name}
                  </motion.text>
                )}
              </motion.g>
            )}
          </AnimatePresence>
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* RAPPORTINI · STORICO — ricerca e periodo (6.webp)                    */
/* ------------------------------------------------------------------ */

const rapportiniClienti = [
  { name: "Casa Bianchi", giornate: 2 },
  { name: "Villa Martini", giornate: 3 },
  { name: "Studio Ferraro", giornate: 1 },
  { name: "Famiglia Conti", giornate: 0 },
  { name: "Elena Rinaldi", giornate: 2 },
];

export function RapportiniStoricoScreen() {
  const [ref, step] = useLoopSteps(6, 1400);
  const query = ["", "Bia", "Bianchi", "Bianchi", "Bianchi", ""][step];
  const filtered = step >= 2 && step <= 4;
  const list = filtered ? rapportiniClienti.slice(0, 1) : rapportiniClienti;
  const expanded = step >= 3 && step <= 4;

  return (
    <div ref={ref} className="relative h-full">
      <TpPageHeader
        icon={ClipboardCheck}
        title="Rapportini di montaggio"
        subtitle="Avanzamenti giornalieri e rapportino di fine lavoro"
        actions={
          <TpPill>
            <Plus className="h-2.5 w-2.5" />
            <span className="hidden @md:inline">Nuovo rapportino</span>
            <ChevronDown className="h-2.5 w-2.5" />
          </TpPill>
        }
      />
      <div className="mt-2 flex items-center gap-1.5">
        <span className="flex h-[22px] min-w-0 flex-1 items-center gap-1.5 rounded-full border border-[#EEF2F6] bg-white px-2.5 text-[8.5px]">
          <Search className="h-2.5 w-2.5 shrink-0 text-[#94A3B8]" />
          {query ? (
            <span className="text-[#0F172A]">
              {query}
              <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }} className="ml-px inline-block h-2.5 w-px bg-[#0F172A] align-middle" />
            </span>
          ) : (
            <span className="truncate text-[#94A3B8]">Cerca cliente, autore, note…</span>
          )}
        </span>
        <span className="hidden h-[22px] items-center gap-3 rounded-full border border-[#EEF2F6] bg-white px-2.5 text-[8.5px] @md:flex">
          Tutto il periodo <ChevronDown className="h-2.5 w-2.5 text-[#64748B]" />
        </span>
        <motion.span key={list.length} initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex h-[22px] shrink-0 items-center rounded-full border border-[#EEF2F6] bg-white px-2 text-[8px] text-[#64748B]">
          {list.length} {list.length === 1 ? "rapportino" : "rapportini"}
        </motion.span>
      </div>
      <div className="mt-2 space-y-1.5">
        <AnimatePresence initial={false}>
          {list.map((c) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: tpEase }}
            >
              <div className="rounded-[12px] border border-[#EEF2F6] bg-white px-2.5 py-2">
                <div className="flex items-center gap-1.5">
                  <div className="min-w-0">
                    <p className="truncate text-[9.5px] font-semibold">{c.name}</p>
                    <p className="truncate text-[7.5px] text-[#64748B]">{c.giornate} avanzamenti giornalieri · Fine lavoro compilato</p>
                  </div>
                  <span className="ml-auto hidden @md:inline-flex"><TpGhost><Plus className="h-2.5 w-2.5" />Giornata</TpGhost></span>
                  <TpPill className="hidden @md:inline-flex"><Pencil className="h-2.5 w-2.5" />Fine lavoro</TpPill>
                </div>
                <AnimatePresence initial={false}>
                  {expanded && c.name === "Casa Bianchi" && (
                    <motion.div key="days" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.45, ease: tpEase }}>
                      <div className="mt-2 space-y-1">
                        {[
                          ["17/10/2026", "Montati top e elettrodomestici, regolate le ante."],
                          ["16/10/2026", "Iniziato il montaggio delle basi e delle colonne."],
                        ].map(([d, t]) => (
                          <div key={d} className="flex items-start gap-2 rounded-[10px] border border-[#EEF2F6] bg-[#FCFDFE] p-1.5">
                            <div className="min-w-0 flex-1">
                              <p className="flex items-center gap-1 text-[7.5px]">
                                <span className="rounded-full bg-[#EFF6FF] px-1.5 py-0.5 font-medium text-[#2563EB] ring-1 ring-[#BFDBFE]">Giornata</span>
                                <b className="text-[8px]">{d}</b>
                                <span className="text-[#64748B]">di Davide Neri</span>
                              </p>
                              <p className="mt-0.5 truncate text-[8px]">{t}</p>
                            </div>
                            <Eye className="h-3 w-3 text-[#3B82F6]" />
                            <Pencil className="h-3 w-3 text-[#334155]" />
                            <Trash2 className="h-3 w-3 text-[#EF4444]" />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FINE LAVORO — card ingrandita del rapportino (6.webp)                */
/* ------------------------------------------------------------------ */

const fineNote = "Cucina completata e collaudata. Regolate le ante dell'isola, cliente soddisfatto.";

export function FineLavoroCard({ className = "" }: { className?: string }) {
  const [ref, step] = useLoopSteps(6, 1300);
  const chars = step === 0 ? 0 : step === 1 ? 28 : step === 2 ? 58 : fineNote.length;
  const photos = step >= 3 ? 3 : 0;
  const signed = step >= 4;
  return (
    <div ref={ref} className={`rounded-[18px] border border-[#EEF2F6] bg-white p-4 text-[#020817] shadow-[0_18px_44px_rgba(16,39,68,.10)] ${className}`} style={uiFont}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[15px] font-semibold">Casa Bianchi</p>
          <div className="mt-1.5 scale-[1.25] origin-left"><TpChip kind="final">Fine lavoro</TpChip></div>
          <p className="mt-2 flex items-center gap-1.5 text-[11px] text-[#64748B]">
            <Calendar className="h-3 w-3" />
            17/10/2026 <span className="text-[#CBD5E1]">•</span> di Davide Neri
          </p>
        </div>
        <Eye className="h-4 w-4 text-[#3B82F6]" />
      </div>
      <div className="mt-3 flex min-h-[54px] items-start gap-2 rounded-[10px] bg-[#F8FAFC] px-3 py-2.5 text-[12px] leading-5">
        <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#64748B]" />
        <span>
          {fineNote.slice(0, chars)}
          {step < 3 && <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }} className="ml-px inline-block h-3.5 w-px bg-[#0F172A] align-middle" />}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5 border-t border-[#F1F5F9] pt-3 text-[10.5px] text-[#475569]">
        <motion.span key={photos} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="inline-flex items-center gap-1 rounded-full px-2 py-1 ring-1 ring-[#E2E8F0]">
          <Camera className="h-3 w-3" /> {photos} foto
        </motion.span>
        <motion.span
          animate={{ backgroundColor: signed ? "#ECFDF5" : "#FFFFFF", color: signed ? "#047857" : "#475569" }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1 rounded-full px-2 py-1 ring-1 ring-[#E2E8F0]"
        >
          <PenLine className="h-3 w-3" /> {signed ? "Firmato" : "No firma"}
        </motion.span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ANTEPRIMA RAPPORTINO — modale documento con Stampa (5.webp)          */
/* ------------------------------------------------------------------ */

const anteprimaNote = "Iniziato il montaggio delle basi e delle colonne. Domani top ed elettrodomestici.";

export function AnteprimaRapportinoScreen() {
  const [ref, step] = useLoopSteps(7, 1500);
  const open = step >= 1;
  const typed = step <= 1 ? 0 : step === 2 ? 40 : anteprimaNote.length;
  const scrolled = step >= 4;
  const printing = step === 5 || step === 6;
  const cursor = printing ? { x: "84%", y: "11%" } : step >= 1 ? { x: "62%", y: "70%" } : { x: "80%", y: "40%" };

  return (
    <div ref={ref} className="relative h-full">
      {/* pagina Rapportini sotto la modale */}
      <div className="h-full">
        <TpPageHeader icon={ClipboardCheck} title="Rapportini di montaggio" subtitle="Avanzamenti giornalieri e rapportino di fine lavoro" actions={<TpPill><Plus className="h-2.5 w-2.5" />Nuovo rapportino</TpPill>} />
        <TpSearch placeholder="Cerca cliente, autore, note…" className="mt-2" />
        <div className="mt-2 rounded-[12px] border border-[#EEF2F6] bg-white p-2.5">
          <p className="text-[10px] font-semibold">Casa Bianchi</p>
          <p className="text-[7.5px] text-[#64748B]">2 avanzamenti giornalieri · Fine lavoro compilato</p>
          {["16/10/2026", "17/10/2026"].map((d) => (
            <div key={d} className="mt-1.5 flex items-center gap-1.5 rounded-[10px] border border-[#EEF2F6] p-2 text-[7.5px]">
              <span className="rounded-full bg-[#EFF6FF] px-1.5 py-0.5 font-medium text-[#2563EB] ring-1 ring-[#BFDBFE]">Giornata</span>
              <b>{d}</b>
              <span className="text-[#64748B]">di Davide Neri</span>
              <Eye className="ml-auto h-3 w-3 text-[#3B82F6]" />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div key="overlay" className="absolute -inset-3 z-10 bg-[#0F172A]/45" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
        )}
        {open && (
          <motion.div
            key="modal"
            className="absolute inset-0 z-20 flex flex-col overflow-hidden rounded-[16px] bg-white shadow-[0_24px_60px_rgba(2,8,23,.35)] @md:inset-x-3"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: tpEase }}
          >
            <div className="flex shrink-0 items-center gap-2 border-b border-[#EEF0F3] px-3 py-2">
              <div className="min-w-0">
                <p className="text-[7px] font-semibold uppercase tracking-[0.12em] text-[#3B82F6]">Anteprima rapportino</p>
                <p className="truncate text-[10px] font-semibold">Casa Bianchi</p>
              </div>
              <motion.span
                animate={printing ? { scale: [1, 0.92, 1.04, 1] } : { scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="ml-auto inline-flex h-[22px] items-center gap-1 rounded-full bg-[#3B82F6] px-2.5 text-[8.5px] font-medium text-white shadow-[0_4px_10px_rgba(59,130,246,.25)]"
              >
                <Printer className="h-2.5 w-2.5" />
                Stampa
              </motion.span>
              <X className="h-3 w-3 text-[#334155]" />
            </div>
            <div className="relative min-h-0 flex-1 overflow-hidden bg-[#EEF0F3] p-2.5 @md:p-3">
              <motion.div
                className="rounded-[10px] bg-white px-4 pb-40 pt-4 shadow-sm @md:px-7"
                style={docFont}
                animate={{ y: scrolled ? -150 : 0 }}
                transition={{ duration: 1.1, ease: tpEase }}
              >
                <p className="text-right text-[11px] font-bold tracking-[-0.03em] text-[#0F172A]">Showroom Demo</p>
                <p className="mt-2 text-[6.5px] font-semibold uppercase tracking-[0.22em] text-[#475569]">Rapportino di montaggio</p>
                <p className="mt-1 text-[15px] font-bold leading-tight tracking-[-0.02em] text-[#0F172A]">Avanzamento giornaliero</p>
                <p className="mt-0.5 text-[8px] text-[#475569]">
                  Redatto il 16 ottobre 2026 da <b className="text-[#0F172A]">Davide Neri</b>
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3 border-t border-[#E2E8F0] pt-3">
                  <div>
                    <p className="text-[6.5px] font-semibold uppercase tracking-[0.2em] text-[#475569]">Cliente</p>
                    <p className="mt-1 text-[10px] font-semibold">Casa Bianchi</p>
                  </div>
                  <div>
                    <p className="text-[6.5px] font-semibold uppercase tracking-[0.2em] text-[#475569]">Montaggio</p>
                    <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5 text-[7.5px]">
                      <dt className="text-[#64748B]">Periodo</dt>
                      <dd className="font-semibold">16 ottobre 2026</dd>
                      <dt className="text-[#64748B]">Giornata</dt>
                      <dd className="font-semibold">16 ottobre 2026</dd>
                      <dt className="text-[#64748B]">Foto allegate</dt>
                      <dd className="font-semibold">1</dd>
                    </dl>
                  </div>
                </div>
                <p className="mt-4 border-b border-[#E2E8F0] pb-1 text-[6.5px] font-bold uppercase tracking-[0.2em] text-[#0F172A]">Descrizione lavori svolti / note</p>
                <div className="mt-1.5 min-h-[36px] rounded-[8px] border border-[#EEF0F3] bg-[#FAFAFA] px-2.5 py-2 text-[8.5px] leading-snug">
                  {anteprimaNote.slice(0, typed)}
                </div>
                <p className="mt-4 border-b border-[#E2E8F0] pb-1 text-[6.5px] font-bold uppercase tracking-[0.2em] text-[#0F172A]">Documentazione fotografica</p>
                <AnimatePresence>
                  {step >= 3 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: tpEase }}>
                      <KitchenPhoto />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute inset-0 z-30 pointer-events-none">
        <FakeCursor x={cursor.x} y={cursor.y} click={printing} />
      </div>
    </div>
  );
}

/** Foto di cantiere illustrata (nessuna immagine reale). */
function KitchenPhoto() {
  return (
    <div className="mt-2 h-[96px] w-[150px] overflow-hidden rounded-[6px] bg-[linear-gradient(180deg,#d9dee4,#c3cad3)]" aria-label="Foto del montaggio" role="img">
      <svg viewBox="0 0 150 96" className="h-full w-full">
        <rect x="0" y="62" width="150" height="34" fill="#a9b1ba" />
        <rect x="14" y="14" width="40" height="22" rx="1.5" fill="#eef1f4" />
        <rect x="58" y="14" width="40" height="22" rx="1.5" fill="#eef1f4" />
        <rect x="10" y="40" width="130" height="5" fill="#6b7280" />
        <rect x="14" y="45" width="30" height="30" fill="#f4f5f7" />
        <rect x="46" y="45" width="30" height="30" fill="#e9ecef" />
        <rect x="78" y="45" width="30" height="30" fill="#f4f5f7" />
        <rect x="110" y="45" width="26" height="30" fill="#e2e6ea" />
        <rect x="104" y="10" width="34" height="27" rx="1.5" fill="#cfd5dc" />
        <circle cx="121" cy="23" r="7" fill="#b9c1ca" />
      </svg>
    </div>
  );
}
