/**
 * Schermate della pagina "Controllo e performance".
 * Ricostruite SOLO da screen reali:
 *  - TasksDashboardScreen → 2.webp (Tasks · Dashboard: scadute/oggi/7 giorni/mese/completate,
 *    panoramica, carico per persona, classifica carico).
 *  - SchedinaLoop → 23.webp (Schedina Cliente, riusa SchedinaCliente di app-screens,
 *    più il riquadro "Margine basso" visibile nello screen).
 * Dati fittizi.
 */
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CircleCheck, Clock, FolderKanban, ListTodo, Trophy, UserRound, Users } from "lucide-react";
import { tpEase, useLoopSteps } from "@/components/totalone/motion-kit";
import { FakeCursor, TpLabel } from "@/components/totalone/app-ui";
import { SchedinaCliente } from "@/components/totalone/app-screens";

const people = [
  { n: "Non assegnato", daFare: 149, inCorso: 20, scadute: 15, next: "13 ott · Rif. Casa Bianchi" },
  { n: "Giulia Ferri", daFare: 4, inCorso: 3, scadute: 6, next: "16 ott · Preventivo Studio Ferraro" },
  { n: "Luca Gallo", daFare: 2, inCorso: 1, scadute: 0, next: "—" },
  { n: "Sara Rinaldi", daFare: 3, inCorso: 0, scadute: 1, next: "18 ott · Visita al cantiere" },
  { n: "Davide Neri", daFare: 3, inCorso: 0, scadute: 2, next: "21 ott · Ordine pavimento Villa Martini" },
];

const card = "rounded-[14px] border border-[#EEF2F6] bg-white shadow-[0_1px_4px_0_rgba(2,8,23,.05)]";

/** Tasks › Dashboard (2.webp). Animazione: Giulia chiude un task scaduto. */
export function TasksDashboardScreen() {
  const [ref, step] = useLoopSteps(4, 1900);
  const done = step >= 2;
  const strip = [
    { l: "Scadute", v: done ? 23 : 24, s: "aperte in ritardo", dot: "bg-[#EF4444]", red: true, hide: false },
    { l: "Oggi", v: 2, s: "in scadenza", dot: "bg-[#3B82F6]", red: false, hide: false },
    { l: "7 giorni", v: 5, s: "in arrivo", dot: "", red: false, hide: true },
    { l: "Mese", v: 0, s: "da chiudere", dot: "", red: false, hide: true },
    { l: "Completate", v: done ? 8 : 7, s: "ultimi 7 gg", dot: "", red: false, hide: false },
  ];
  const overview = [
    { l: "Task aperte", v: done ? 190 : 191, i: ListTodo },
    { l: "In corso", v: 28, i: Clock },
    { l: "Completate", v: done ? 144 : 143, i: CircleCheck },
    { l: "Progetti attivi", v: 62, i: FolderKanban },
    { l: "Persone coinvolte", v: 10, i: Users },
  ];
  const rows = people.map((p, i) => (i === 1 && done ? { ...p, scadute: p.scadute - 1 } : p));
  const max = 169;
  const ranking: [string, number][] = [
    ["Non assegnato", 169],
    ["Giulia Ferri", done ? 6 : 7],
    ["Sara Rinaldi", 3],
    ["Davide Neri", 3],
  ];

  return (
    <div ref={ref} className="relative h-full">
      <div className={`${card} px-2 py-2.5`}>
        <div className="relative flex justify-around">
          <span className="absolute left-[10%] right-[10%] top-[4px] h-px bg-[#E2E8F0]" />
          {strip.map((s) => (
            <div key={s.l} className={`relative flex-1 text-center ${s.hide ? "hidden @md:block" : ""}`}>
              <span className={`mx-auto block h-2 w-2 rounded-full ${s.dot || "border border-[#CBD5E1] bg-white"}`} />
              <p className="mt-1 text-[6px] font-semibold uppercase tracking-[0.14em] text-[#475569]">{s.l}</p>
              <motion.p key={s.v} initial={{ opacity: 0.2, y: -3 }} animate={{ opacity: 1, y: 0 }} className={`text-[13px] font-bold leading-tight ${s.red ? "text-[#E11D48]" : "text-[#0F172A]"}`}>
                {s.v}
              </motion.p>
              <p className="text-[6.5px] text-[#64748B]">{s.s}</p>
            </div>
          ))}
        </div>
      </div>

      <TpLabel className="mt-2.5">Panoramica · tutto il periodo</TpLabel>
      <div className="mt-1.5 grid grid-cols-3 gap-1.5 @xl:grid-cols-5">
        {overview.map((o, i) => (
          <div key={o.l} className={`${card} p-2 ${i >= 3 ? "hidden @xl:block" : ""}`}>
            <o.i className="h-3 w-3 text-[#94A3B8]" strokeWidth={1.75} />
            <TpLabel className="mt-1.5 truncate">{o.l}</TpLabel>
            <motion.p key={o.v} initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} className="mt-0.5 text-[14px] font-bold leading-none tracking-[-0.02em]">
              {o.v}
            </motion.p>
          </div>
        ))}
      </div>

      <div className="mt-2 grid gap-1.5 @3xl:grid-cols-[1.6fr_1fr]">
        <div className={`${card} overflow-hidden p-2`}>
          <div className="flex items-start">
            <div>
              <TpLabel>Carico per persona</TpLabel>
              <p className="text-[9.5px] font-semibold">Chi sta lavorando su cosa</p>
            </div>
            <Trophy className="ml-auto h-3 w-3 text-[#CBD5E1]" />
          </div>
          <div className="mt-1.5 grid grid-cols-[1.4fr_.5fr_.5fr_.5fr] gap-1 border-b border-[#EEF2F6] pb-1 text-[6px] font-semibold uppercase tracking-[0.12em] text-[#64748B] @xl:grid-cols-[1.2fr_.45fr_.45fr_.45fr_1.6fr]">
            <span>Persona</span>
            <span className="text-right">Da fare</span>
            <span className="text-right">In corso</span>
            <span className="text-right">Scadute</span>
            <span className="hidden pl-2 @xl:block">Prossima</span>
          </div>
          {rows.map((r, i) => (
            <div key={r.n} className={`grid grid-cols-[1.4fr_.5fr_.5fr_.5fr] items-center gap-1 border-b border-[#F8FAFC] py-1 text-[8px] transition-colors duration-500 @xl:grid-cols-[1.2fr_.45fr_.45fr_.45fr_1.6fr] ${i === 1 && step >= 1 && step < 3 ? "bg-[#EFF6FF]" : ""}`}>
              <span className="truncate font-semibold">{r.n}</span>
              <span className="text-right">{r.daFare}</span>
              <span className="text-right">{r.inCorso}</span>
              <motion.span key={r.scadute} initial={{ scale: 1.4 }} animate={{ scale: 1 }} className={`text-right font-semibold ${r.scadute > 0 ? "text-[#E11D48]" : "text-[#94A3B8]"}`}>
                {r.scadute}
              </motion.span>
              <span className="hidden truncate pl-2 text-[#64748B] @xl:block">{r.next}</span>
            </div>
          ))}
        </div>

        <div className={`${card} hidden p-2 @3xl:block`}>
          <div className="flex items-start">
            <div>
              <TpLabel>Classifica carico</TpLabel>
              <p className="text-[9.5px] font-semibold">Task aperte</p>
            </div>
            <UserRound className="ml-auto h-3 w-3 text-[#CBD5E1]" />
          </div>
          <div className="mt-2 space-y-2">
            {ranking.map(([n, v], i) => (
              <div key={n} className="flex items-center gap-1.5">
                <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full text-[7px] font-semibold ${i === 0 ? "bg-[#FEF3C7] text-[#B45309]" : "bg-[#F1F5F9] text-[#475569]"}`}>{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex text-[8px] font-semibold">
                    <span className="truncate">{n}</span>
                    <span className="ml-auto">{v}</span>
                  </div>
                  <div className="mt-0.5 h-1 rounded-full bg-[#F1F5F9]">
                    <motion.div className="h-1 rounded-full bg-[#3B82F6]" initial={false} animate={{ width: `${Math.max(4, (v / max) * 100)}%` }} transition={{ duration: 0.8, ease: tpEase }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FakeCursor x={step === 0 ? "70%" : "30%"} y={step === 0 ? "92%" : "74%"} click={step === 1} />
    </div>
  );
}

/** Schedina Cliente (23.webp): i prodotti entrano, il margine generato si compone, emerge il margine basso. */
export function SchedinaLoop() {
  const [ref, step] = useLoopSteps(5, 1600);
  const rows = [1, 2, 3, 3, 3][step];
  return (
    <div ref={ref} className="relative h-full">
      <SchedinaCliente rows={rows} />
      <AnimatePresence>
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: tpEase }}
            className="pointer-events-none absolute bottom-2 right-2 rounded-[12px] bg-[#FFFBEB] px-3 py-1.5 text-center shadow-[0_8px_20px_rgba(180,83,9,.12)] ring-1 ring-[#FDE68A]"
          >
            <span className="flex items-center justify-center gap-1 text-[6.5px] font-bold uppercase tracking-[0.12em] text-[#B45309]">
              <AlertTriangle className="h-2.5 w-2.5" />
              Margine basso
            </span>
            <span className="block text-[9px] font-bold text-[#B45309]">1 prodotti</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

