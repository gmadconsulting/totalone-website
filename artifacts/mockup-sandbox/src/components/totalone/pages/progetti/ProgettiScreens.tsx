/**
 * Schermate della pagina "Gestione progetti", ricostruite dagli screen reali:
 *  - 1.webp  Tasks · Kanban (Da fare / In corso / Completati, priorità Media/Alta)
 *  - 2.webp  Tasks · Dashboard (scadute/oggi/7 giorni/mese/completate,
 *            panoramica, carico per persona, classifica carico)
 * Dati fittizi e coerenti tra loro (163 da fare, 28 in corso, 143 completati).
 */
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Circle, CircleCheck, Clock, FolderKanban, ListChecks, MoreHorizontal, Trophy, UserRound, Users } from "lucide-react";
import { CountUp, tpEase, useLoopSteps } from "@/components/totalone/motion-kit";
import { TpAvatar, TpCard, TpChip, TpKpi, TpLabel, uiFont } from "@/components/totalone/app-ui";

/* ------------------------------------------------------------------ */
/* Dati demo                                                           */
/* ------------------------------------------------------------------ */

const deadlines = [
  { label: "Scadute", value: 18, hint: "aperte in ritardo", color: "#EF4444" },
  { label: "Oggi", value: 1, hint: "in scadenza", color: "#3B82F6" },
  { label: "7 giorni", value: 4, hint: "in arrivo", color: "#3B82F6" },
  { label: "Mese", value: 9, hint: "da chiudere", color: "#3B82F6" },
  { label: "Completate", value: 7, hint: "ultimi 7 gg", color: "#10B981" },
];

const people = [
  { name: "Non assegnato", initials: "", todo: 149, doing: 20, late: 15, next: "16 ott", what: "Ordine piano cucina" },
  { name: "Giulia Ferri", initials: "GF", todo: 6, doing: 3, late: 2, next: "16 ott", what: "Confermare misure Casa Bianchi" },
  { name: "Luca Gallo", initials: "LG", todo: 4, doing: 2, late: 0, next: "", what: "" },
  { name: "Sara Rinaldi", initials: "SR", todo: 3, doing: 2, late: 1, next: "21 ott", what: "Appuntamento via Roma 16" },
  { name: "Davide Neri", initials: "DN", todo: 1, doing: 1, late: 0, next: "", what: "" },
];
const maxOpen = people[0].todo + people[0].doing;

/* ------------------------------------------------------------------ */
/* Timeline scadenze (riga in alto della Dashboard task)                */
/* ------------------------------------------------------------------ */

function DeadlineStrip({ lit, big = false }: { lit: number; big?: boolean }) {
  return (
    <div className="relative">
      <div className={`absolute left-[10%] right-[10%] ${big ? "top-[9px]" : "top-[5px]"} h-px bg-[#E2E8F0]`}>
        <motion.div
          className="h-full origin-left bg-[linear-gradient(90deg,#EF4444,#3B82F6_35%,#3B82F6_75%,#10B981)]"
          animate={{ scaleX: Math.min(lit, deadlines.length - 1) / (deadlines.length - 1) }}
          transition={{ duration: 0.9, ease: tpEase }}
        />
      </div>
      <div className="relative grid grid-cols-5">
        {deadlines.map((d, i) => {
          const on = i <= lit;
          return (
            <div key={d.label} className="flex flex-col items-center text-center">
              <motion.span
                className={`relative rounded-full border ${big ? "h-[18px] w-[18px]" : "h-[10px] w-[10px]"}`}
                animate={{ backgroundColor: on ? d.color : "#ffffff", borderColor: on ? d.color : "#CBD5E1", scale: on ? 1 : 0.85 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
              >
                {on && i === lit && (
                  <motion.span
                    key={`ping-${lit}`}
                    className="absolute inset-0 rounded-full border-2"
                    style={{ borderColor: d.color }}
                    initial={{ scale: 1, opacity: 0.7 }}
                    animate={{ scale: 2.4, opacity: 0 }}
                    transition={{ duration: 1.1 }}
                  />
                )}
              </motion.span>
              <TpLabel className={big ? "mt-3 !text-[10px]" : "mt-1.5"}>{d.label}</TpLabel>
              <motion.p
                className={`font-bold leading-none tracking-[-0.03em] ${big ? "mt-2 text-[26px]" : "mt-1 text-[14px]"}`}
                animate={{ color: on ? (i === 0 ? "#DC2626" : "#020817") : "#CBD5E1" }}
                transition={{ duration: 0.4 }}
              >
                {d.value}
              </motion.p>
              <p className={`${big ? "mt-1.5 text-[11px]" : "mt-0.5 text-[7px]"} text-[#64748B]`}>{d.hint}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* DASHBOARD TASK — schermata completa (hero)                          */
/* ------------------------------------------------------------------ */

export function TaskDashboardScreen() {
  const [ref, step] = useLoopSteps(7, 1300);
  const lit = Math.min(step, deadlines.length - 1);
  return (
    <div ref={ref} className="relative h-full space-y-2 overflow-hidden">
      <TpCard className="px-2 pb-2.5 pt-3">
        <DeadlineStrip lit={lit} />
      </TpCard>

      <div>
        <TpLabel className="mb-1">Panoramica · tutto il periodo</TpLabel>
        <div className="grid grid-cols-3 gap-1.5 @xl:grid-cols-5">
          <TpKpi icon={ListChecks} label="Task aperte" value={<CountUp to={191} />} />
          <TpKpi icon={Clock} label="In corso" value={<CountUp to={28} />} />
          <TpKpi icon={CircleCheck} label="Completate" value={<CountUp to={143} />} />
          <div className="hidden @xl:block"><TpKpi icon={FolderKanban} label="Progetti attivi" value={<CountUp to={24} />} /></div>
          <div className="hidden @xl:block"><TpKpi icon={Users} label="Persone coinvolte" value={<CountUp to={5} />} /></div>
        </div>
      </div>

      <div className="grid gap-2 @3xl:grid-cols-[1.55fr_1fr]">
        <TpCard className="p-2.5">
          <div className="flex items-start justify-between">
            <div>
              <TpLabel>Carico per persona</TpLabel>
              <p className="mt-0.5 text-[10px] font-semibold">Chi sta lavorando su cosa</p>
            </div>
            <Trophy className="h-3 w-3 text-[#CBD5E1]" />
          </div>
          <div className="mt-1.5 grid grid-cols-[1.4fr_.5fr_.5fr_.5fr] gap-x-1 border-b border-[#F1F5F9] pb-1 text-[6.5px] font-medium uppercase tracking-[0.1em] text-[#64748B] @xl:grid-cols-[1.2fr_.45fr_.45fr_.45fr_1.6fr]">
            <span>Persona</span><span className="text-right">Da fare</span><span className="text-right">In corso</span><span className="text-right">Scadute</span><span className="hidden pl-2 @xl:block">Prossima</span>
          </div>
          {people.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: tpEase, delay: 0.15 + i * 0.07 }}
              className="grid grid-cols-[1.4fr_.5fr_.5fr_.5fr] items-center gap-x-1 border-b border-[#F1F5F9] py-[5px] text-[8px] last:border-0 @xl:grid-cols-[1.2fr_.45fr_.45fr_.45fr_1.6fr]"
            >
              <span className="truncate font-semibold">{p.name}</span>
              <span className="text-right">{p.todo}</span>
              <span className="text-right">{p.doing}</span>
              <span className={`text-right font-semibold ${p.late ? "text-[#DC2626]" : "text-[#94A3B8]"}`}>{p.late}</span>
              <span className="hidden truncate pl-2 text-[#64748B] @xl:block">{p.next ? <><b className="font-medium text-[#020817]">{p.next}</b> · {p.what}</> : "—"}</span>
            </motion.div>
          ))}
        </TpCard>

        <TpCard className="hidden p-2.5 @3xl:block">
          <div className="flex items-start justify-between">
            <div>
              <TpLabel>Classifica carico</TpLabel>
              <p className="mt-0.5 text-[10px] font-semibold">Task aperte</p>
            </div>
            <UserRound className="h-3 w-3 text-[#CBD5E1]" />
          </div>
          <div className="mt-2 space-y-2">
            {people.map((p, i) => (
              <RankRow key={p.name} rank={i + 1} name={p.name} value={p.todo + p.doing} delay={0.3 + i * 0.1} />
            ))}
          </div>
        </TpCard>
      </div>
    </div>
  );
}

function RankRow({ rank, name, value, delay, big = false }: { rank: number; name: string; value: number; delay: number; big?: boolean }) {
  const tone = rank === 1 ? "bg-[#FEF3C7] text-[#B45309]" : rank === 3 ? "bg-[#FFEDD5] text-[#C2410C]" : "bg-[#F1F5F9] text-[#475569]";
  const pct = Math.max(2.5, (value / maxOpen) * 100);
  return (
    <div className="flex items-center gap-2">
      <span className={`grid shrink-0 place-items-center rounded-full font-semibold ${tone} ${big ? "h-7 w-7 text-[11px]" : "h-4 w-4 text-[7px]"}`}>{rank}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className={`truncate font-semibold ${big ? "text-[13px]" : "text-[8px]"}`}>{name}</p>
          <p className={`font-bold ${big ? "text-[15px]" : "text-[9px]"}`}><CountUp to={value} duration={1.2} /></p>
        </div>
        <div className={`mt-1 overflow-hidden rounded-full bg-[#F1F5F9] ${big ? "h-[6px]" : "h-[3px]"}`}>
          <motion.div
            className="h-full rounded-full bg-[#3B82F6]"
            initial={{ width: 0 }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 1.1, ease: tpEase, delay }}
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ZOOM · Kanban: le card passano tra Da fare, In corso, Completati     */
/* ------------------------------------------------------------------ */

type Prio = "alta" | "media";
const flowTasks: { id: string; t: string; who: string; p: Prio; date: string }[] = [
  { id: "a", t: "Confermare misure Casa Bianchi", who: "GF", p: "alta", date: "16/10/2026" },
  { id: "b", t: "Preventivo per Studio Ferraro", who: "SR", p: "media", date: "21/10/2026" },
  { id: "c", t: "Ordine pavimento Villa Martini", who: "LG", p: "media", date: "18/10/2026" },
  { id: "d", t: "Ordine piano cucina", who: "DN", p: "media", date: "12/10/2026" },
];
/** Colonna di ogni task a ogni step del loop. */
const flowStates: Record<string, number>[] = [
  { a: 0, b: 0, c: 1, d: 2 },
  { a: 1, b: 0, c: 1, d: 2 },
  { a: 1, b: 0, c: 2, d: 2 },
  { a: 2, b: 0, c: 2, d: 2 },
  { a: 2, b: 1, c: 2, d: 2 },
  { a: 2, b: 1, c: 2, d: 2 },
];
const kanbanCols = [
  { name: "Da fare", icon: Circle, color: "#64748B", base: 163 },
  { name: "In corso", icon: Clock, color: "#3B82F6", base: 28 },
  { name: "Completati", icon: CircleCheck, color: "#10B981", base: 143 },
];

export function KanbanFlowZoom() {
  const [ref, step] = useLoopSteps(flowStates.length, 1600);
  const state = flowStates[step];
  const moved = step > 0 ? flowTasks.find((t) => flowStates[step - 1][t.id] !== state[t.id])?.id : undefined;
  const count = (ci: number) => kanbanCols[ci].base + flowTasks.filter((t) => state[t.id] === ci).length - flowTasks.filter((t) => flowStates[0][t.id] === ci).length;

  return (
    <div ref={ref} className="grid gap-3 sm:grid-cols-3" style={uiFont} role="img" aria-label="Kanban dei task: le attività passano da Da fare a In corso a Completati">
      {kanbanCols.map((c, ci) => (
        <div key={c.name} className="min-h-[150px] rounded-[20px] border border-[#EEF2F6] bg-white p-3 shadow-[0_1px_4px_rgba(2,8,23,.05)] sm:min-h-[340px]">
          <div className="flex items-center gap-2 border-b border-[#F1F5F9] px-1 pb-3">
            <c.icon className="h-4 w-4" style={{ color: c.color }} />
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#020817]">{c.name}</p>
            <motion.span key={count(ci)} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="ml-auto rounded-full bg-[#F1F5F9] px-2 py-0.5 text-[10px] text-[#334155]">{count(ci)}</motion.span>
          </div>
          <p className="mt-3 px-1 text-[9px] font-medium uppercase tracking-[0.16em] text-[#64748B]">Ottobre 2026</p>
          <div className="mt-2 space-y-2">
            <AnimatePresence initial={false}>
              {flowTasks.filter((t) => state[t.id] === ci).map((t) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: -36, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 36, scale: 0.96, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.6, ease: tpEase }}
                >
                  <ZoomTaskCard t={t.t} who={t.who} p={t.p} date={t.date} state={ci} active={t.id === moved} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
}

function ZoomTaskCard({ t, who, p, date, state, active = false }: { t: string; who: string; p: Prio; date?: string; state: number; active?: boolean }) {
  const Icon = state === 0 ? Circle : state === 1 ? Clock : CircleCheck;
  const color = state === 0 ? "#94A3B8" : state === 1 ? "#3B82F6" : "#10B981";
  return (
    <div className={`rounded-[14px] border bg-white p-3 transition-[border-color,box-shadow] duration-500 ${active ? "border-[#93C5FD] shadow-[0_12px_28px_rgba(59,130,246,.22)]" : "border-[#EEF2F6]"}`}>
      <div className="flex items-start gap-2">
        <Icon className="mt-[2px] h-3.5 w-3.5 shrink-0" style={{ color }} />
        <p className={`flex-1 text-[12px] font-medium leading-snug text-[#020817] ${state === 2 ? "uppercase" : ""}`}>{t}</p>
        <TpAvatar initials={who} size={20} />
        <MoreHorizontal className="h-3.5 w-3.5 shrink-0 text-[#334155]" />
      </div>
      {date && state < 2 && <p className="mt-2 flex items-center gap-1 pl-5 text-[10px] text-[#64748B]"><Calendar className="h-3 w-3" />{date}</p>}
      <div className="mt-2 pl-5 [&>span]:h-[18px] [&>span]:px-2 [&>span]:text-[9px]">
        <TpChip kind={p}>{p === "alta" ? "Alta" : "Media"}</TpChip>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ZOOM · Scadenze che si accendono + task con priorità                 */
/* ------------------------------------------------------------------ */

export function ScadenzeZoom() {
  const [ref, step] = useLoopSteps(7, 1250);
  const lit = Math.min(step, deadlines.length - 1);
  return (
    <div ref={ref} className="space-y-3" style={uiFont}>
      <div className="rounded-[22px] border border-[#EEF2F6] bg-white px-3 pb-5 pt-6 shadow-[0_1px_4px_rgba(2,8,23,.05)] sm:px-6">
        <DeadlineStrip lit={lit} big />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <motion.div animate={{ y: lit === 0 ? -4 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
          <ZoomTaskCard t="Ordine piano cucina" who="DN" p="media" date="12/10/2026" state={0} active={lit === 0} />
        </motion.div>
        <motion.div animate={{ y: lit === 1 ? -4 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
          <ZoomTaskCard t="Confermare misure Casa Bianchi" who="GF" p="alta" date="15/10/2026" state={1} active={lit === 1} />
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ZOOM · Carico per persona + classifica (barre che crescono)          */
/* ------------------------------------------------------------------ */

export function CaricoZoom() {
  return (
    <div className="grid gap-3 lg:grid-cols-[1.35fr_1fr]" style={uiFont}>
      <div className="rounded-[22px] border border-[#EEF2F6] bg-white p-4 shadow-[0_1px_4px_rgba(2,8,23,.05)] sm:p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#64748B]">Carico per persona</p>
            <p className="mt-1 text-[15px] font-semibold text-[#020817]">Chi sta lavorando su cosa</p>
          </div>
          <Trophy className="h-4 w-4 text-[#CBD5E1]" />
        </div>
        <div className="mt-4 grid grid-cols-[1.6fr_.6fr_.6fr_.6fr] gap-x-2 border-b border-[#F1F5F9] pb-2 text-[9px] font-medium uppercase tracking-[0.1em] text-[#64748B]">
          <span>Persona</span><span className="text-right">Da fare</span><span className="text-right">In corso</span><span className="text-right">Scadute</span>
        </div>
        {people.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: tpEase, delay: i * 0.08 }}
            className="grid grid-cols-[1.6fr_.6fr_.6fr_.6fr] items-center gap-x-2 border-b border-[#F1F5F9] py-2.5 text-[12px] text-[#020817] last:border-0"
          >
            <span className="flex min-w-0 items-center gap-2">
              {p.initials ? <TpAvatar initials={p.initials} size={22} tone={i} /> : <span className="h-[22px] w-[22px] shrink-0 rounded-full border border-dashed border-[#CBD5E1]" />}
              <span className="truncate font-semibold">{p.name}</span>
            </span>
            <span className="text-right"><CountUp to={p.todo} duration={1.1} /></span>
            <span className="text-right"><CountUp to={p.doing} duration={1.1} /></span>
            <span className={`text-right font-semibold ${p.late ? "text-[#DC2626]" : "text-[#94A3B8]"}`}>{p.late}</span>
          </motion.div>
        ))}
      </div>
      <div className="rounded-[22px] border border-[#EEF2F6] bg-white p-4 shadow-[0_1px_4px_rgba(2,8,23,.05)] sm:p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#64748B]">Classifica carico</p>
            <p className="mt-1 text-[15px] font-semibold text-[#020817]">Task aperte</p>
          </div>
          <UserRound className="h-4 w-4 text-[#CBD5E1]" />
        </div>
        <div className="mt-5 space-y-4">
          {people.map((p, i) => (
            <RankRow key={p.name} rank={i + 1} name={p.name} value={p.todo + p.doing} delay={0.2 + i * 0.12} big />
          ))}
        </div>
      </div>
    </div>
  );
}
