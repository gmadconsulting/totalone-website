/**
 * Schermate animate del gestionale, ricostruite dagli screen reali dell'app
 * (Totalone, Ingressi, Pipeline, Preventivatore, Preventivi, Arrivi previsti,
 * Magazzino, Montaggi, Rapportini, Assistenze, Task). Ogni schermata simula
 * un'azione reale a loop. Nomi di clienti, showroom e brand sono fittizi.
 */
import type { ReactNode } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  Archive,
  Banknote,
  Building2,
  Calendar,
  CalendarDays,
  Check,
  CheckCircle2,
  Circle,
  CircleCheck,
  ClipboardCheck,
  Clock,
  Euro,
  ExternalLink,
  Eye,
  FileText,
  Globe,
  HandCoins,
  LayoutGrid,
  ListChecks,
  Map,
  MoreHorizontal,
  Package,
  Pencil,
  Percent,
  Plus,
  Printer,
  Save,
  Tag,
  TrendingUp,
  User,
  UserPlus,
  Users,
  Wrench,
  XCircle,
} from "lucide-react";
import { CountUp, tpEase, useLoopSteps } from "./motion-kit";
import { AiFab, AppWindow, FakeCursor, TpAvatar, TpCard, TpChip, TpGhost, TpKpi, TpLabel, TpPageHeader, TpPill, TpSearch, docFont } from "./app-ui";

const spring = { type: "spring", stiffness: 380, damping: 32 } as const;

/* ------------------------------------------------------------------ */
/* HERO — pagina “Totalone” (pipeline trattative)                      */
/* ------------------------------------------------------------------ */

export function HeroDashboardScreen({ className = "" }: { className?: string }) {
  const [ref, step] = useLoopSteps(7, 1900);
  const finalized = step >= 3 && step < 6;
  const cursor = [
    { x: "70%", y: "88%" },
    { x: "24%", y: "17%" },
    { x: "52%", y: "62%" },
    { x: "40%", y: "64%" },
    { x: "84%", y: "40%" },
    { x: "88%", y: "66%" },
    { x: "70%", y: "88%" },
  ][step];

  return (
    <div ref={ref} className={className}>
      <AppWindow active="totalone" title="Totalone showroom" notifications={step >= 4 && step < 6 ? 51 : 50} className="h-full">
        <div className="flex items-center gap-1 text-[9px] text-[#64748B]">
          {["Retail", "Milano Centro", "Venditori", "Tutti i clienti"].map((c, i, a) => (
            <span key={c} className="flex items-center gap-1">
              {i > 0 && <span className="text-[#CBD5E1]">›</span>}
              <span className={i === a.length - 1 || i === 1 ? "font-medium text-[#0F172A]" : ""}>{c}</span>
            </span>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          <>
            {["Tutti", "GF · Giulia", "LG · Luca"].map((s, i) => {
              const on = (step >= 1 && step < 6 ? 1 : 0) === i;
              return (
                <span key={s} className={`rounded-full px-2.5 py-1 text-[9px] font-medium transition-colors duration-300 ${on ? "bg-[#0F172A] text-white" : "text-[#64748B] ring-1 ring-[#E2E8F0]"}`}>
                  {s}
                </span>
              );
            })}
          </>
          <span className="ml-auto grid h-6 w-6 place-items-center rounded-full bg-[#3B82F6] text-white">
            <Printer className="h-3 w-3" />
          </span>
        </div>

        <TpLabel className="mt-3">Pipeline trattative</TpLabel>
        <div className="mt-1.5 grid grid-cols-3 gap-2 @3xl:grid-cols-5">
          <TpKpi icon={FileText} label="Totale preventivi" value={<CountUp to={finalized ? 623813 : 597523} suffix=" €" />} hint="13 trattative" />
          <TpKpi icon={CheckCircle2} iconTone="emerald" label="Finalizzato" highlight={step === 3} value={<CountUp key={String(finalized)} to={finalized ? 335322 : 309032} suffix=" €" duration={1} />} hint={finalized ? "7 trattative" : "6 trattative"} />
          <TpKpi icon={TrendingUp} iconTone="blue" label="Venduto" value={<CountUp to={309} suffix=".632 €" />} hint="253.797 € IVA escl." />
          <div className="hidden @3xl:block">
            <TpKpi icon={Clock} label="Da finalizzare" value={<CountUp to={160} suffix=".972 €" />} hint="5 trattative" />
          </div>
          <div className="hidden @3xl:block">
            <TpKpi icon={XCircle} label="Non confermato" value={<CountUp to={126} suffix=".919 €" />} hint="2 trattative" />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <TpLabel>Trattative — 13 clienti</TpLabel>
          <div className="ml-auto flex items-center gap-1">
            <span className="hidden rounded-full bg-[#F1F5F9] p-0.5 text-[8px] @md:flex">
              <span className="rounded-full bg-white px-1.5 py-0.5 font-medium shadow-sm">IVA incl.</span>
              <span className="px-1.5 py-0.5 text-[#64748B]">IVA escl.</span>
            </span>
            <TpSearch placeholder="Cerca cliente, brand" />
          </div>
        </div>
        <TpLabel className="mt-2 !tracking-[0.22em]">Luglio 2026</TpLabel>
        <div className="mt-1.5 space-y-1.5">
          <AnimatePresence initial={false}>
            {step >= 2 && step < 6 && (
              <motion.div key="new" initial={{ opacity: 0, height: 0, y: -8 }} animate={{ opacity: 1, height: "auto", y: 0 }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5, ease: tpEase }}>
                <DealRow initials="CB" name="Casa Bianchi" meta="31/07/2026 · Giulia Ferri" status={finalized ? "final" : "tratt"} preventivato="€ 26.290" venduto={finalized ? "€ 26.290" : "€ 0"} acconti={step >= 5 ? "€ 4.200" : "€ 0"} saldo={step >= 5 ? ["pagare", "€ 22.090 · Da pagare"] : finalized ? ["pagare", "€ 26.290 · Da pagare"] : ["saldato", "€ 0 · Saldato"]} glow />
              </motion.div>
            )}
          </AnimatePresence>
          <DealRow initials="AL" name="Atelier Lago" meta="31/07/2026 · Giulia Ferri" status="tratt" preventivato="€ 100" venduto="€ 80" acconti="€ 0" saldo={["pagare", "€ 80 · Da pagare"]} />
          <DealRow initials="FC" name="Francesco Conti" meta="31/07/2026" status="tratt" preventivato="€ 0" venduto="€ 0" acconti="€ 0" saldo={["saldato", "€ 0 · Saldato"]} />
          <DealRow initials="VM" name="Villa Martini" meta="28/07/2026 · Luca Gallo" status="final" preventivato="€ 38.900" venduto="€ 38.900" acconti="€ 15.000" saldo={["pagare", "€ 23.900 · Da pagare"]} />
        </div>

        <AiFab />
        <FakeCursor x={cursor.x} y={cursor.y} click={step === 1 || step === 3 || step === 5} />
      </AppWindow>
    </div>
  );
}

function DealRow({
  initials,
  name,
  meta,
  status,
  preventivato,
  venduto,
  acconti,
  saldo,
  glow = false,
}: {
  initials: string;
  name: string;
  meta: string;
  status: "tratt" | "final";
  preventivato: string;
  venduto: string;
  acconti: string;
  saldo: [Parameters<typeof TpChip>[0]["kind"], string];
  glow?: boolean;
}) {
  return (
    <div className={`grid grid-cols-[1.6fr_.8fr_.7fr_.7fr] items-center gap-2 rounded-[12px] border border-[#EEF2F6] bg-white px-2.5 py-2 shadow-[0_1px_4px_0_rgba(2,8,23,.05)] @md:grid-cols-[1.6fr_.8fr_.7fr_.7fr_.6fr_1.1fr] ${glow ? "ring-1 ring-[#BFDBFE]" : ""}`}>
      <div className="flex min-w-0 items-center gap-2">
        <TpAvatar initials={initials} size={22} />
        <div className="min-w-0">
          <p className="truncate text-[9px] font-semibold uppercase tracking-[0.02em]">{name}</p>
          <p className="truncate text-[7.5px] text-[#64748B]">{meta}</p>
        </div>
      </div>
      <div>
        <AnimatePresence mode="wait">
          {status === "final" ? <TpChip key="f" kind="final">Finalizzato</TpChip> : <TpChip key="t" kind="tratt">In Tratt.</TpChip>}
        </AnimatePresence>
      </div>
      <Cell label="Preventivato" value={preventivato} />
      <Cell label="Venduto" value={venduto} />
      <div className="hidden @md:block">
        <Cell label="Acconti" value={acconti} />
      </div>
      <div className="hidden text-center @md:block">
        <p className="text-[6.5px] font-medium uppercase tracking-[0.14em] text-[#64748B]">Saldo</p>
        <div className="mt-0.5">
          <TpChip kind={saldo[0]}>{saldo[1]}</TpChip>
        </div>
      </div>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-[6.5px] font-medium uppercase tracking-[0.14em] text-[#64748B]">{label}</p>
      <motion.p key={value} initial={{ opacity: 0.2 }} animate={{ opacity: 1 }} className="text-[9px] font-semibold">
        {value}
      </motion.p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CRM · INGRESSI SHOWROOM                                              */
/* ------------------------------------------------------------------ */

const showroomBadge: Record<string, string> = {
  "Milano Centro": "bg-[#FEF2F2] text-[#DC2626]",
  Lugano: "bg-[#F5F3FF] text-[#7C3AED]",
  Como: "bg-[#EFF6FF] text-[#2563EB]",
};
const showroomBar: Record<string, string> = { "Milano Centro": "#EF4444", Lugano: "#8B5CF6", Como: "#3B82F6" };

export function IngressiScreen() {
  const [ref, step] = useLoopSteps(5, 1700);
  const base = [
    { t: "Coppia // Visita showroom", time: "15:00", who: "Sara Rinaldi", s: "Lugano" },
    { t: "Famiglia // Richiesta informazioni zona giorno", time: "13:45", who: "Sara Rinaldi", s: "Lugano" },
    { t: "Sig. Galli per letto e armadio camera", time: "10:30", who: "Giulia Ferri", s: "Como" },
  ];
  return (
    <div ref={ref} className="relative h-full">
      <TpLabel>CRM · Ingressi</TpLabel>
      <p className="mt-0.5 text-[12.5px] font-semibold tracking-[-0.02em]">Ingressi Showroom</p>
      <p className="text-[8.5px] text-[#64748B]">Registra e consulta gli ingressi clienti negli showroom.</p>
      <div className="mt-2 flex items-center gap-1 overflow-hidden">
        <span className="flex h-[20px] items-center gap-1 rounded-full border border-[#EEF2F6] bg-white px-2 text-[8px] font-medium"><LayoutGrid className="h-2.5 w-2.5" />Dashboard</span>
        <span className="flex h-[20px] items-center rounded-full bg-[#3B82F6] px-2 text-[8px] font-medium text-white">Tutti</span>
        {["Milano Centro", "Lugano", "Como"].map((s) => (
          <span key={s} className="hidden h-[20px] items-center whitespace-nowrap rounded-full border border-[#EEF2F6] bg-white px-2 text-[8px] font-medium @md:flex">{s}</span>
        ))}
        <motion.span animate={step === 1 ? { scale: [1, 0.85, 1] } : {}} className="ml-auto grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-[#3B82F6] text-white">
          <Plus className="h-3 w-3" />
        </motion.span>
      </div>
      <div className="mt-2.5 flex items-center gap-2">
        <span className="text-[7.5px] font-medium uppercase tracking-[0.22em] text-[#475569]">14 ott 2026</span>
        <span className="h-px flex-1 bg-[#E2E8F0]" />
        <span className="text-[7px] uppercase tracking-[0.16em] text-[#94A3B8]">{step >= 2 ? 4 : 3} ingressi</span>
      </div>
      <div className="mt-1.5 space-y-1.5">
        <AnimatePresence initial={false}>
          {step >= 2 && (
            <motion.div key="new" initial={{ opacity: 0, height: 0, scale: 0.97 }} animate={{ opacity: 1, height: "auto", scale: 1 }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5, ease: tpEase }}>
              <IngressoRow t="Entrata per ispirazione. Casa nuova, consegna estate 2027." time="15:35" who="Giulia Ferri" s="Milano Centro" highlight={step >= 3} converted={step >= 4} />
            </motion.div>
          )}
        </AnimatePresence>
        {base.map((r) => (
          <IngressoRow key={r.t} {...r} />
        ))}
      </div>
    </div>
  );
}

function IngressoRow({ t, time, who, s, highlight = false, converted = false }: { t: string; time: string; who: string; s: string; highlight?: boolean; converted?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-[12px] border bg-white py-2 pl-3 pr-2.5 shadow-[0_1px_4px_0_rgba(2,8,23,.05)] transition-colors ${highlight ? "border-[#BFDBFE]" : "border-[#EEF2F6]"}`}>
      <span className="absolute inset-y-1.5 left-0 w-[3px] rounded-r" style={{ background: showroomBar[s] }} />
      <div className="flex items-start gap-2">
        <p className="min-w-0 flex-1 truncate text-[9.5px] text-[#0F172A]">{t}</p>
        <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[6.5px] font-semibold uppercase tracking-[0.06em] ${showroomBadge[s]}`}>{s}</span>
      </div>
      <div className="mt-1.5 flex items-center gap-2 border-t border-[#F1F5F9] pt-1.5 text-[7.5px] text-[#64748B]">
        <span className="flex items-center gap-0.5"><Calendar className="h-2.5 w-2.5" />14 ott</span>
        <span className="flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" />{time}</span>
        <span className="flex items-center gap-0.5"><User className="h-2.5 w-2.5" />{who}</span>
        <span className="hidden items-center gap-0.5 @md:flex"><Globe className="h-2.5 w-2.5" />{s === "Lugano" ? "Svizzera" : "Italia"}</span>
        <motion.span animate={converted ? { background: "#3B82F6", color: "#fff", borderColor: "#3B82F6" } : {}} className="ml-auto grid h-[18px] w-[18px] place-items-center rounded-full border border-[#93C5FD] text-[#3B82F6]">
          {converted ? <Check className="h-2.5 w-2.5" /> : s === "Lugano" ? <UserPlus className="h-2.5 w-2.5" /> : <ExternalLink className="h-2.5 w-2.5" />}
        </motion.span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CRM · PIPELINE VENDITE                                               */
/* ------------------------------------------------------------------ */

const pipeCols = [
  { name: "Contatto iniziale", dot: "#94A3B8", count: 9, value: "" },
  { name: "Qualifica", dot: "#F59E0B", count: 9, value: "€ 80.000" },
  { name: "Appuntamento", dot: "#8B5CF6", count: 1, value: "" },
  { name: "Preventivo", dot: "#F97316", count: 5, value: "€ 2.170.000" },
];

export function PipelineScreen() {
  const [ref, step] = useLoopSteps(4, 1800);
  const col = step === 0 ? 1 : step === 1 ? 2 : 3;
  const valued = step >= 2;
  return (
    <div ref={ref} className="relative h-full">
      <div className="flex items-start gap-2">
        <div>
          <p className="text-[12.5px] font-semibold tracking-[-0.02em]">Pipeline Vendite</p>
          <p className="text-[8.5px] text-[#64748B]">Dal primo contatto al preventivo.</p>
        </div>
        <div className="ml-auto hidden items-center gap-2 whitespace-nowrap rounded-full border border-[#EEF2F6] bg-white px-2.5 py-1 text-[7px] uppercase tracking-[0.14em] text-[#64748B] @xl:flex">
          Lead <b className="text-[10px] tracking-normal text-[#0F172A]">32</b>
          <span className="h-3 w-px bg-[#E2E8F0]" />
          Valore <b className="text-[10px] tracking-normal text-[#0F172A]">€ <CountUp key={String(valued)} to={valued ? 3591 : 3551} suffix=".000" duration={0.8} /></b>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <span className="text-[7px] font-medium uppercase tracking-[0.16em] text-[#64748B]">Smart lists</span>
        <span className="rounded-full bg-[#0F172A] px-2 py-0.5 text-[8px] font-medium text-white">Tutti</span>
      </div>
      <LayoutGroup id="pipeline">
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {pipeCols.map((c, ci) => (
            <div key={c.name} className={`rounded-[14px] border border-[#EEF2F6] bg-white p-1.5 ${ci === 0 ? "hidden" : ""}`}>
              <div className="flex items-center gap-1 px-1 pt-0.5">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.dot }} />
                <p className="truncate text-[7px] font-semibold uppercase tracking-[0.14em]">{c.name}</p>
                <span className="ml-auto text-[8px] font-semibold">{c.count + (ci === col ? 1 : 0)}</span>
              </div>
              <p className="h-3 px-1 text-[7px] text-[#64748B]">{c.value}</p>
              <div className="mt-1 space-y-1.5 border-t border-[#F1F5F9] pt-1.5">
                {ci === col && (
                  <motion.div layoutId="pipe-card" transition={{ type: "spring", stiffness: 240, damping: 28 }}>
                    <LeadCard name="Elena Rinaldi" value={valued ? "€ 40.000" : undefined} active doc={valued} />
                  </motion.div>
                )}
                {[["Marco Galli", ci === 3 ? "€ 50.000" : undefined], ["Nadia Ferraro", ci === 3 ? "€ 40.000" : undefined]].slice(0, ci === 2 ? 0 : 2).map(([n, v]) => (
                  <LeadCard key={String(n) + ci} name={String(n)} value={v} doc={ci >= 1} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </LayoutGroup>
    </div>
  );
}

function LeadCard({ name, value, active = false, doc = false }: { name: string; value?: string; active?: boolean; doc?: boolean }) {
  return (
    <div className={`rounded-[10px] border bg-white p-2 ${active ? "border-[#93C5FD] shadow-[0_8px_22px_rgba(59,130,246,.22)]" : "border-[#EEF2F6] shadow-[0_1px_3px_rgba(2,8,23,.04)]"}`}>
      <div className="flex items-center gap-1">
        <p className="truncate text-[9px] font-semibold">{name}</p>
        <span className="ml-auto"><TpChip kind="open">OPEN</TpChip></span>
      </div>
      <div className="mt-1.5 flex items-center gap-1 border-t border-[#F1F5F9] pt-1.5">
        {value ? <span className="whitespace-nowrap text-[9.5px] font-bold">{value}</span> : <span className="text-[6.5px] uppercase tracking-[0.16em] text-[#94A3B8]">Senza valore</span>}
        <span className={`ml-auto grid h-3.5 w-3.5 place-items-center rounded-[4px] border ${doc ? "border-[#FCD34D] bg-[#FEF3C7] text-[#D97706]" : "border-[#E2E8F0] text-[#94A3B8]"}`}>
          <FileText className="h-2 w-2" />
        </span>
        <ListChecks className="h-2.5 w-2.5 text-[#94A3B8]" />
        <Tag className="h-2.5 w-2.5 text-[#94A3B8]" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PREVENTIVATORE                                                      */
/* ------------------------------------------------------------------ */

export function PreventivatoreScreen() {
  const [ref, step] = useLoopSteps(5, 1500);
  const fields = [
    ["Cliente *", "Casa Bianchi"],
    ["Luogo", "Milano"],
    ["Data", "14/10/2026"],
  ];
  return (
    <div ref={ref} className="relative h-full">
      <div className="flex items-center gap-2 border-b border-[#EEF0F3] pb-2">
        <span className="text-[8.5px] text-[#334155]">← Preventivi</span>
        <span className="grid h-5 w-5 place-items-center rounded-[6px] bg-[#EFF6FF] text-[#3B82F6]"><FileText className="h-3 w-3" /></span>
        <div className="min-w-0">
          <p className="truncate text-[9.5px] font-semibold">Preventivo Casa Bianchi</p>
          <p className="flex items-center gap-1 text-[7px] text-[#64748B]">Trattativa di <b className="text-[#0F172A]">Casa Bianchi</b> <span className="rounded-full px-1 text-[#3B82F6] ring-1 ring-[#BFDBFE]">v1</span> <span className="rounded-full px-1 ring-1 ring-[#E2E8F0]">Bozza</span></p>
        </div>
        <motion.span animate={step === 4 ? { scale: [1, 0.9, 1] } : {}} className={`ml-auto flex items-center gap-1 text-[8.5px] font-medium ${step === 4 ? "text-[#059669]" : ""}`}>
          {step === 4 ? <Check className="h-3 w-3" /> : <Save className="h-3 w-3" />} {step === 4 ? "Salvato" : "Salva"}
        </motion.span>
      </div>
      <div className="mt-2 flex items-end justify-between">
        <div>
          <p className="text-[14px] font-bold tracking-[-0.03em]">Preventivatore</p>
          <p className="text-[8.5px] text-[#64748B]">Cucine · Sistemi · Arredamento · Montaggio</p>
        </div>
        <span className="hidden rounded-full border border-[#EEF2F6] bg-white p-0.5 text-[7.5px] @md:flex">
          <span className="rounded-full bg-[#3B82F6] px-1.5 py-0.5 font-medium text-white">IVA escl.</span>
          <span className="px-1.5 py-0.5 text-[#64748B]">IVA incl.</span>
        </span>
      </div>
      <div className="mt-2 flex w-fit gap-0.5 rounded-full border border-[#EEF2F6] bg-white p-0.5">
        <>
          {["Cucine", "Sistemi", "Arredamento", "Montaggio"].map((t, i) => (
            <span key={t} className={`rounded-full px-2 py-1 text-[8px] font-medium ${i === 0 ? "bg-[#3B82F6] text-white" : "text-[#334155]"} ${i > 2 ? "hidden @md:inline" : ""}`}>
              {t}
            </span>
          ))}
        </>
      </div>
      <TpCard className="mt-2 p-2.5">
        <p className="flex items-center gap-1 text-[7.5px] font-medium uppercase tracking-[0.16em] text-[#64748B]"><LayoutGrid className="h-2.5 w-2.5" />Intestazione preventivo</p>
        <div className="mt-1.5 grid grid-cols-3 gap-1.5">
          {fields.map(([l, v], i) => (
            <div key={l}>
              <p className="text-[6.5px] font-medium uppercase tracking-[0.14em] text-[#64748B]">{l}</p>
              <div className="mt-0.5 h-[20px] overflow-hidden rounded-[6px] bg-[#F1F5F9] px-1.5 text-[8.5px] leading-[20px]">
                <Typewriter key={`${step >= i + 1}`} text={step >= i + 1 ? v : ""} />
              </div>
            </div>
          ))}
        </div>
      </TpCard>
      <TpCard className="mt-2 p-2.5">
        <div className="flex items-center gap-1.5">
          <span className="grid h-4 w-4 place-items-center rounded-full bg-[#7C3AED] text-[7.5px] font-bold text-white">1</span>
          <p className="text-[10px] font-semibold">Cucina su misura</p>
          <span className="ml-auto text-[10px] font-bold text-[#059669]">€ <CountUp key={String(step >= 3)} to={step >= 3 ? 26290 : 0} duration={1.1} />,00</span>
        </div>
        <div className="mt-2 space-y-1">
          {[
            ["Basi e colonne laccate", "18.400"],
            ["Top in quarzo 3 cm", "2.150"],
            ["Elettrodomestici da incasso", "4.890"],
            ["Trasporto e montaggio", "850"],
          ].map(([d, p], i) => (
            <motion.div key={d} initial={false} animate={{ opacity: step >= 3 ? 1 : 0.25, x: step >= 3 ? 0 : -4 }} transition={{ delay: step >= 3 ? i * 0.12 : 0 }} className="flex items-center justify-between border-b border-[#F1F5F9] pb-1 text-[8.5px]" style={docFont}>
              <span className="text-[#94A3B8]">N° {i + 1}</span>
              <span className="flex-1 px-2">{d}</span>
              <span className="font-medium">€ {p}</span>
            </motion.div>
          ))}
        </div>
      </TpCard>
    </div>
  );
}

function Typewriter({ text }: { text: string }) {
  return (
    <motion.span initial="h" animate="s" variants={{ h: {}, s: { transition: { staggerChildren: 0.03 } } }}>
      {text.split("").map((ch, i) => (
        <motion.span key={i} variants={{ h: { opacity: 0 }, s: { opacity: 1 } }}>
          {ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/* PREVENTIVI — lista con KPI, Bozza → Convertito                      */
/* ------------------------------------------------------------------ */

export function PreventiviListScreen() {
  const [ref, step] = useLoopSteps(4, 1800);
  const converted = step >= 2;
  const rows = [
    { i: "CB", n: "Preventivo Casa Bianchi", c: "Casa Bianchi", v: "1 versione", tot: "€ 26.290,00", d: "14 ott 26", conv: converted },
    { i: "SF", n: "Preventivo Studio Ferraro", c: "Studio Ferraro · v1/2", v: "2 versioni", tot: "€ 2.609,92", d: "08 ott 26", conv: false },
    { i: "LG", n: "Preventivo Luca Galli", c: "Luca Galli", v: "1 versione", tot: "€ 48.892,48", d: "07 ott 26", conv: true },
    { i: "VM", n: "Preventivo Villa Martini", c: "Villa Martini · v1/3", v: "3 versioni", tot: "€ 9.375,20", d: "28 set 26", conv: true },
  ];
  return (
    <div ref={ref} className="relative h-full">
      <TpPageHeader title="Preventivi" subtitle="Tutti i preventivi dei clienti · stati, versioni, confronto" actions={<span className="flex h-[22px] items-center gap-1 rounded-full bg-[#EFF6FF] px-2.5 text-[8.5px] font-medium text-[#2563EB] ring-1 ring-[#BFDBFE]"><Plus className="h-2.5 w-2.5" />Nuovo preventivo</span>} />
      <div className="mt-2 grid grid-cols-3 gap-1.5 @xl:grid-cols-4">
        <TpKpi icon={FileText} iconTone="blue" label="Totale" value="11" />
        <TpKpi icon={Euro} iconTone="purple" label="In pipeline" value={<CountUp key={String(converted)} to={converted ? 6320 : 32610} suffix=" €" duration={0.9} />} />
        <TpKpi icon={CheckCircle2} iconTone="emerald" label="Accettato" highlight={step === 2} value={<CountUp key={`a${converted}`} to={converted ? 112203 : 85913} suffix=" €" duration={0.9} />} />
        <div className="hidden @xl:block">
          <TpKpi icon={Percent} iconTone="orange" label="Conversione" value={converted ? "63,6%" : "54,5%"} />
        </div>
      </div>
      <div className="mt-2 flex items-center gap-1.5 rounded-[14px] border border-[#EEF2F6] bg-white p-1.5">
        <TpSearch placeholder="Cerca per nome o cliente…" className="flex-1 border-0 bg-[#F8FAFC]" />
        <span className="hidden rounded-full border border-[#EEF2F6] p-0.5 text-[7.5px] @md:flex"><span className="rounded-full bg-[#F1F5F9] px-1.5 py-0.5 font-medium">Lista</span><span className="px-1.5 py-0.5 text-[#64748B]">Kanban</span></span>
      </div>
      <div className="mt-1.5 space-y-1.5">
        {rows.map((r, idx) => (
          <div key={r.n} className={`flex items-center gap-2 rounded-[12px] border bg-white px-2.5 py-1.5 shadow-[0_1px_4px_0_rgba(2,8,23,.05)] ${idx === 0 && step >= 1 ? "border-[#C4B5FD]" : "border-[#EEF2F6]"}`}>
            <TpAvatar initials={r.i} size={20} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[9px] font-semibold">{r.n}</p>
              <p className="truncate text-[7.5px] text-[#64748B]">{r.c}</p>
            </div>
            <AnimatePresence mode="wait">
              {r.conv ? <TpChip key="c" kind="convertito">↗ Convertito</TpChip> : <TpChip key="b" kind="neutral">Bozza</TpChip>}
            </AnimatePresence>
            <span className="hidden rounded-full px-1.5 py-0.5 text-[7.5px] font-medium ring-1 ring-[#E2E8F0] @xl:inline">{r.v}</span>
            <div className="text-right">
              <p className="text-[6.5px] uppercase tracking-[0.14em] text-[#64748B]">Totale</p>
              <p className="text-[9px] font-bold">{r.tot}</p>
            </div>
            <Eye className="hidden h-3 w-3 text-[#64748B] @md:block" />
            <ClipboardCheck className="hidden h-3 w-3 text-[#10B981] @md:block" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* VENDITE — Incassi & clienti                                          */
/* ------------------------------------------------------------------ */

export function VenditeScreen() {
  const [ref, step] = useLoopSteps(4, 1800);
  const paid = step >= 2;
  return (
    <div ref={ref} className="relative h-full">
      <TpLabel>Incassi & clienti</TpLabel>
      <div className="mt-1.5 grid grid-cols-3 gap-2">
        <TpKpi icon={Banknote} iconTone="emerald" label="Acconti ricevuti" highlight={step === 2} value={<CountUp key={String(paid)} to={paid ? 124898 : 120698} suffix=" €" duration={0.9} />} />
        <TpKpi icon={HandCoins} iconTone="orange" label="Acconti da ricevere" value={<CountUp key={`r${paid}`} to={paid ? 184814 : 189014} suffix=" €" duration={0.9} />} />
        <TpKpi icon={Users} label="Totale clienti" value={step >= 1 ? "13" : "12"} />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <TpLabel>Trattative — {step >= 1 ? 13 : 12} clienti</TpLabel>
        <TpSearch placeholder="Cerca cliente, brand" className="ml-auto" />
      </div>
      <div className="mt-1.5 space-y-1.5">
        <AnimatePresence initial={false}>
          {step >= 1 && (
            <motion.div key="n" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.45, ease: tpEase }}>
              <DealRow initials="CB" name="Casa Bianchi" meta="Da preventivo 2026/184" status="final" preventivato="€ 26.290" venduto="€ 26.290" acconti={paid ? "€ 4.200" : "€ 0"} saldo={paid ? ["pagare", "€ 22.090 · Da pagare"] : ["pagare", "€ 26.290 · Da pagare"]} glow />
            </motion.div>
          )}
        </AnimatePresence>
        <DealRow initials="VM" name="Villa Martini" meta="28/07/2026 · Luca Gallo" status="final" preventivato="€ 38.900" venduto="€ 38.900" acconti="€ 15.000" saldo={["pagare", "€ 23.900 · Da pagare"]} />
        <DealRow initials="FC" name="Francesco Conti" meta="31/07/2026" status="tratt" preventivato="€ 0" venduto="€ 0" acconti="€ 0" saldo={["saldato", "€ 0 · Saldato"]} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MAGAZZINO · ARRIVI PREVISTI — calendario pastello                    */
/* ------------------------------------------------------------------ */

const pastel = {
  lime: "bg-[#EEF5D6]",
  pink: "bg-[#F8D9EC]",
  blue: "bg-[#DCE6F7]",
  lilac: "bg-[#E6DDF8]",
  salmon: "bg-[#F6DDD5]",
  mint: "bg-[#D9F3E6]",
  green: "bg-[#DDF3D0]",
  sky: "bg-[#D6EEF6]",
};
type Pastel = keyof typeof pastel;
const arrivals: { day: number; t: string; s: string; c: Pastel }[] = [
  { day: 2, t: "Basi zona lavello", s: "Casa Bianchi", c: "lime" },
  { day: 2, t: "Top in quarzo", s: "Casa Bianchi", c: "salmon" },
  { day: 4, t: "Lampade sospese", s: "Studio Ferraro", c: "sky" },
  { day: 8, t: "Anta scorrevole", s: "Villa Martini", c: "lilac" },
  { day: 9, t: "Parquet rovere", s: "Famiglia Conti", c: "salmon" },
  { day: 10, t: "Armadio a battente", s: "Marco Galli", c: "green" },
  { day: 11, t: "Sgabelli cucina", s: "Nadia Ferraro", c: "green" },
  { day: 12, t: "Sedie imbottite", s: "Nadia Ferraro", c: "mint" },
  { day: 15, t: "Divano modulare", s: "Elena Rinaldi", c: "pink" },
  { day: 15, t: "Piano cucina", s: "Casa Bianchi", c: "blue" },
  { day: 16, t: "Tavolo allungabile", s: "Luca Galli", c: "lime" },
  { day: 18, t: "Specchi bagno", s: "Villa Martini", c: "green" },
];

export function ArriviScreen() {
  const [ref, step] = useLoopSteps(14, 380);
  const days = Array.from({ length: 21 }, (_, i) => i - 1);
  return (
    <div ref={ref} className="relative h-full">
      <div className="flex items-center gap-1.5">
        <CalendarDays className="h-3.5 w-3.5 text-[#334155]" />
        <p className="text-[11.5px] font-semibold">Arrivi previsti merce</p>
        <span className="text-[9px] text-[#64748B]"><CountUp key={step} to={98 + Math.min(step, 12)} duration={0.3} /></span>
        <span className="ml-auto text-[8.5px] font-medium text-[#3B82F6]">Oggi</span>
        <span className="text-[9.5px] font-semibold">Ottobre 2026</span>
      </div>
      <div className="mt-2 overflow-hidden rounded-[14px] border border-[#EEF2F6] bg-white">
        <div className="grid grid-cols-7 border-b border-[#EEF2F6] text-center text-[7.5px] font-medium text-[#334155]">
          {["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"].map((d) => (
            <span key={d} className="py-1">{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((d) => {
            const items = arrivals.map((a, i) => ({ ...a, i })).filter((a) => a.day === d);
            return (
              <div key={d} className="h-[86px] border-b border-r border-[#F1F5F9] p-1 last:border-r-0">
                <span className={`text-[7.5px] ${d < 1 ? "text-[#CBD5E1]" : d === 15 ? "grid h-3.5 w-3.5 place-items-center rounded-full bg-[#3B82F6] font-semibold text-white" : "text-[#475569]"}`}>{d < 1 ? 30 + d : d}</span>
                <div className="mt-0.5 space-y-0.5">
                  {items.map((a) => (
                    <AnimatePresence key={a.i}>
                      {a.i <= step && (
                        <motion.div initial={{ opacity: 0, y: -6, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={spring} className={`rounded-[4px] px-1 py-0.5 ${pastel[a.c]}`}>
                          <p className="truncate text-[6.5px] font-semibold leading-tight text-[#1E293B]">{a.t}</p>
                          <p className="truncate text-[5.5px] leading-tight text-[#475569]">{a.s}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MAGAZZINO LOGISTICO — tabella, stati che passano ad “Arrivato”       */
/* ------------------------------------------------------------------ */

export function MagazzinoScreen() {
  const [ref, step] = useLoopSteps(7, 900);
  const rows = [
    ["Linea Cucine", "Cucina laccata opaca", "Corsia B", 14, "18.400,00"],
    ["Pietra & Co", "Top in quarzo 3 cm", "Corsia B", 2, "2.150,00"],
    ["Casa Elettro", "Elettrodomestici da incasso", "Scaffale 4", 4, "4.890,00"],
    ["Luce & Co", "Lampade sospese", "Scaffale 2", 3, "653,54"],
    ["Atelier Legno", "Tavolo allungabile", "Sotto al portico", 1, "2.916,74"],
  ] as const;
  return (
    <div ref={ref} className="relative h-full">
      <div className="flex items-center gap-1.5">
        <span className="flex rounded-full border border-[#EEF2F6] bg-white p-0.5 text-[8px]">
          <span className="rounded-full bg-white px-2 py-1 font-semibold shadow-[0_1px_4px_rgba(2,8,23,.1)]">Magazzino logistico</span>
          <span className="hidden px-2 py-1 text-[#64748B] @md:inline">Transazioni</span>
          <span className="hidden px-2 py-1 text-[#64748B] @xl:inline">Magazzino contabile</span>
        </span>
        <span className="ml-auto flex items-center gap-1 rounded-full border border-[#EEF2F6] bg-white px-2 py-1 text-[8px] font-medium">🇮🇹 Magazzino Italia</span>
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <TpSearch placeholder="Cerca cliente, brand o prodotto" />
        <TpGhost>Arrivato ▾</TpGhost>
        <span className="ml-auto grid h-[22px] w-[22px] place-items-center rounded-full bg-[#3B82F6] text-white"><Printer className="h-2.5 w-2.5" /></span>
        <TpGhost className="hidden @xl:inline-flex"><Archive className="h-2.5 w-2.5" />Storico DDT</TpGhost>
      </div>
      <div className="mt-2 overflow-hidden rounded-[14px] border border-[#EEF2F6] bg-white">
        <div className="grid grid-cols-[1.1fr_1.4fr_.4fr_1fr_.6fr] gap-2 border-b border-[#EEF2F6] px-2.5 py-1.5 text-[6.5px] font-semibold uppercase tracking-[0.14em] text-[#64748B] @md:grid-cols-[1.1fr_.8fr_1.4fr_.4fr_1fr_.4fr_.7fr]">
          <span>Cliente ▲</span>
          <span className="hidden @md:block">Sede</span>
          <span>Brand · tipo</span>
          <span>Qtà</span>
          <span>Stato</span>
          <span className="hidden @md:block">Colli</span>
          <span className="text-right">Prezzo</span>
        </div>
        {rows.map(([brand, tipo, sede, colli, prezzo], i) => {
          const arrived = i < step;
          return (
            <div key={tipo} className="grid grid-cols-[1.1fr_1.4fr_.4fr_1fr_.6fr] items-center gap-2 border-b border-[#F8FAFC] px-2.5 py-1.5 @md:grid-cols-[1.1fr_.8fr_1.4fr_.4fr_1fr_.4fr_.7fr]">
              <span className="flex min-w-0 items-center gap-1">
                <span className="hidden whitespace-nowrap rounded-[4px] bg-[#F1F5F9] px-1 font-mono text-[6px] font-semibold text-[#475569] @xl:inline">IT-MI-01</span>
                <span className="truncate text-[8.5px] font-semibold">Casa Bianchi</span>
              </span>
              <span className="hidden truncate text-[8px] text-[#64748B] @md:block">{sede}</span>
              <span className="min-w-0">
                <span className="block truncate text-[8.5px] font-semibold">{brand}</span>
                <span className="block truncate text-[7px] text-[#64748B]">{tipo}</span>
              </span>
              <span className="text-[8.5px]">1</span>
              <span className="flex h-[18px] items-center justify-between rounded-full border border-[#EEF2F6] px-1">
                <AnimatePresence mode="wait">
                  {arrived ? <TpChip key="a" kind="final">Arrivato</TpChip> : <TpChip key="i" kind="media">In arrivo</TpChip>}
                </AnimatePresence>
                <span className="text-[7px] text-[#94A3B8]">▾</span>
              </span>
              <span className="hidden text-[8.5px] @md:block">{colli}</span>
              <span className="text-right text-[8.5px] font-semibold">€ {prezzo}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MONTAGGI — calendario, il montaggio viene programmato e assegnato    */
/* ------------------------------------------------------------------ */

export function MontaggiScreen() {
  const [ref, step] = useLoopSteps(5, 1500);
  const placed = step >= 1;
  const assigned = false;
  const days = Array.from({ length: 21 }, (_, i) => i + 5);
  return (
    <div ref={ref} className="relative h-full">
      <TpPageHeader
        title="Montaggi"
        subtitle="Gestisci la programmazione e i prodotti da montare."
        actions={<><TpPill><Plus className="h-2.5 w-2.5" />Consegna manuale</TpPill><span className="hidden items-center gap-1 text-[8.5px] @md:flex"><Calendar className="h-2.5 w-2.5" />Previsti</span></>}
      />
      <div className="mt-2 flex gap-3 border-b border-[#E2E8F0] text-[8.5px]">
        <span className="flex items-center gap-1 border-b-2 border-[#0F172A] pb-1 font-semibold"><Calendar className="h-2.5 w-2.5" />Calendario</span>
        <span className="flex items-center gap-1 pb-1 text-[#64748B]"><Map className="h-2.5 w-2.5" />Mappa</span>
        <span className="flex items-center gap-1 pb-1 text-[#64748B]"><Package className="h-2.5 w-2.5" />Prodotti</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-[8.5px] font-medium text-[#3B82F6]">Oggi</span>
        <span className="text-[10px] font-semibold">Ottobre 2026</span>
        <span className="ml-auto flex rounded-full text-[7.5px]"><span className="rounded-full bg-[#0F172A] px-1.5 py-0.5 font-medium text-white">Mese</span><span className="px-1.5 py-0.5">Settimana</span><span className="hidden px-1.5 py-0.5 @md:inline">Giorno</span></span>
      </div>
      <div className="mt-1.5 overflow-hidden rounded-[14px] border border-[#EEF2F6] bg-white">
        <div className="grid grid-cols-7 border-b border-[#EEF2F6] text-center text-[7.5px] font-medium">
          {["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"].map((d) => (
            <span key={d} className="py-1">{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((d) => (
            <div key={d} className={`h-[64px] border-b border-r border-[#F1F5F9] p-1 ${d === 15 ? "bg-[#FEFCE8]" : ""}`}>
              <span className="text-[7.5px] font-medium text-[#334155]">{d}</span>
              {d >= 7 && d <= 9 && <MontaggioCard name="Villa Martini" who="Squadra B" />}
              {d === 16 && (
                <AnimatePresence>
                  {placed && (
                    <motion.div initial={{ opacity: 0, y: -40, scale: 0.85, rotate: -4 }} animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
                      <MontaggioCard name="Casa Bianchi" who={assigned ? "Squadra A" : "Non assegnato"} highlight={assigned} />
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
              {d === 17 && placed && <MontaggioCard name="Casa Bianchi" who={assigned ? "Squadra A" : "Non assegnato"} highlight={assigned} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MontaggioCard({ name, who, highlight = false }: { name: string; who: string; highlight?: boolean }) {
  return (
    <div className={`mt-0.5 rounded-[4px] border-l-2 px-1 py-0.5 transition-colors ${highlight ? "border-[#059669] bg-[#D1FAE5]" : "border-[#E8A898] bg-[#F6DCD3]"}`}>
      <p className="truncate text-[6.5px] font-bold uppercase leading-tight text-[#1E293B]">{name}</p>
      <p className="truncate text-[5.5px] italic leading-tight text-[#64748B]">{who}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MONTAGGI · RAPPORTINI — giornate e fine lavoro                       */
/* ------------------------------------------------------------------ */

export function RapportiniScreen() {
  const [ref, step] = useLoopSteps(5, 1500);
  return (
    <div ref={ref} className="relative h-full">
      <TpPageHeader icon={ClipboardCheck} title="Rapportini di montaggio" subtitle="Avanzamenti giornalieri e rapportino di fine lavoro" actions={<TpPill><Plus className="h-2.5 w-2.5" />Nuovo rapportino</TpPill>} />
      <TpSearch placeholder="Cerca cliente, autore, note…" className="mt-2" />
      <TpCard className="mt-2 p-2.5">
        <div className="flex items-center gap-1.5">
          <div>
            <p className="text-[10px] font-semibold">Casa Bianchi</p>
            <p className="text-[7.5px] text-[#64748B]">{Math.min(step, 2)} avanzamenti giornalieri{step >= 3 ? " · Fine lavoro compilato" : ""}</p>
          </div>
          <span className="ml-auto"><TpGhost><Plus className="h-2.5 w-2.5" />Giornata</TpGhost></span>
          <TpPill className="hidden @md:inline-flex"><Pencil className="h-2.5 w-2.5" />Fine lavoro</TpPill>
        </div>
        <div className="mt-2 space-y-1.5">
          <AnimatePresence initial={false}>
            {step >= 3 && (
              <motion.div key="fine" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.45, ease: tpEase }}>
                <div className="rounded-[10px] border border-[#EEF2F6] p-2">
                  <TpChip kind="final">Fine lavoro</TpChip>
                  <p className="mt-1 flex items-center gap-1 text-[7.5px] text-[#64748B]"><Calendar className="h-2.5 w-2.5" />17/10/2026 · di Davide Neri</p>
                  <p className="mt-1 rounded-[6px] bg-[#F8FAFC] px-1.5 py-1 text-[8px]">Cucina completata e collaudata. Cliente soddisfatto, firma raccolta.</p>
                  <div className="mt-1 flex gap-1 text-[7px] text-[#64748B]">
                    <span className="rounded-full px-1.5 py-0.5 ring-1 ring-[#E2E8F0]">3 foto</span>
                    <motion.span initial={{ background: "#fff" }} animate={{ background: step >= 4 ? "#ECFDF5" : "#fff", color: step >= 4 ? "#047857" : "#64748B" }} className="rounded-full px-1.5 py-0.5 ring-1 ring-[#E2E8F0]">
                      {step >= 4 ? "✓ Firmato" : "No firma"}
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            )}
            {[
              { d: "17/10/2026", t: "Montati top e elettrodomestici, regolate le ante.", show: step >= 2 },
              { d: "16/10/2026", t: "Iniziato il montaggio delle basi e delle colonne.", show: step >= 1 },
            ].map(
              (g) =>
                g.show && (
                  <motion.div key={g.d} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.45, ease: tpEase }}>
                    <div className="flex items-start gap-2 rounded-[10px] border border-[#EEF2F6] bg-[#FCFDFE] p-2">
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-1 text-[7.5px]"><span className="rounded-full bg-[#EFF6FF] px-1.5 py-0.5 font-medium text-[#2563EB] ring-1 ring-[#BFDBFE]">Giornata</span><b className="text-[8.5px]">{g.d}</b><span className="text-[#64748B]">di Davide Neri</span></p>
                        <p className="mt-1 truncate text-[8.5px]">{g.t}</p>
                        <p className="text-[7px] text-[#64748B]">1 foto</p>
                      </div>
                      <Eye className="h-3 w-3 text-[#3B82F6]" />
                      <Pencil className="h-3 w-3 text-[#334155]" />
                    </div>
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>
      </TpCard>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ASSISTENZE — avanzamento e stati                                     */
/* ------------------------------------------------------------------ */

const statusStyle = {
  gestire: { kind: "perso" as const, dot: "#EF4444", label: "Da gestire" },
  gestione: { kind: "media" as const, dot: "#F97316", label: "In gestione" },
  risolta: { kind: "final" as const, dot: "#10B981", label: "Risolta" },
};

export function AssistenzeScreen() {
  const [ref, step] = useLoopSteps(5, 1500);
  const done = Math.min(step, 3);
  const st = done === 0 ? "gestire" : done < 3 ? "gestione" : "risolta";
  return (
    <div ref={ref} className="relative h-full">
      <TpPageHeader icon={Wrench} title="Assistenze" subtitle="Clienti con prodotti in assistenza" />
      <div className="mt-2 flex flex-wrap items-center gap-1">
        <TpPill><Plus className="h-2.5 w-2.5" />Nuova assistenza</TpPill>
        <Counter dot="#EF4444" n={st === "gestire" ? 69 : 68} l="da gestire" />
        <Counter dot="#F97316" n={st === "gestione" ? 6 : 5} l="in gestione" />
        <Counter dot="#10B981" n={st === "risolta" ? 10 : 9} l="pronte" />
      </div>
      <div className="mt-2 flex gap-3 border-b border-[#E2E8F0] text-[8.5px]">
        <span className="flex items-center gap-1 border-b-2 border-[#0F172A] pb-1 font-semibold"><Users className="h-2.5 w-2.5" />Clienti</span>
        <span className="flex items-center gap-1 pb-1 text-[#64748B]"><Package className="h-2.5 w-2.5" />Prodotti</span>
        <span className="flex items-center gap-1 pb-1 text-[#64748B]"><Calendar className="h-2.5 w-2.5" />Arrivi previsti</span>
      </div>
      <div className="mt-2 space-y-1.5">
        <AssistenzaRow name="Casa Bianchi" sub="Giulia Ferri · 18 giu 2026" done={done} total={3} status={st} highlight />
        <AssistenzaRow name="Villa Martini" sub="26 mag 2026" done={0} total={1} status="gestire" />
        <AssistenzaRow name="Studio Ferraro" sub="12 mag 2026" done={0} total={1} status="gestione" />
        <AssistenzaRow name="Famiglia Conti" sub="07 apr 2026" done={1} total={1} status="risolta" />
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

function AssistenzaRow({ name, sub, done, total, status, highlight = false }: { name: string; sub: string; done: number; total: number; status: keyof typeof statusStyle; highlight?: boolean }) {
  const s = statusStyle[status];
  return (
    <div className={`flex items-center gap-2 rounded-[14px] border bg-white px-2.5 py-2 shadow-[0_1px_4px_0_rgba(2,8,23,.05)] ${highlight ? "border-[#BFDBFE]" : "border-[#EEF2F6]"}`}>
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#EFF6FF] text-[#3B82F6]"><Wrench className="h-3 w-3" /></span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[9.5px] font-semibold uppercase text-[#2563EB]">{name}</p>
        <p className="truncate text-[7.5px] text-[#64748B]">{sub}</p>
      </div>
      <div className="hidden w-[90px] @md:block">
        <div className="flex justify-between text-[7px]">
          <b>{done}/{total}</b>
          <span className="text-[#64748B]">{done === total ? "completa" : `mancano ${total - done}`}</span>
        </div>
        <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-[#F1F5F9]">
          <motion.div className="h-full rounded-full bg-[#10B981]" animate={{ width: `${(done / total) * 100}%` }} transition={{ duration: 0.6, ease: tpEase }} />
        </div>
      </div>
      <AnimatePresence mode="wait">
        <TpChip key={status} kind={s.kind} dot={s.dot}>{s.label}</TpChip>
      </AnimatePresence>
      <div className="hidden text-center @xl:block">
        <p className="text-[9px] font-semibold">{total}</p>
        <p className="text-[6px] uppercase tracking-[0.12em] text-[#64748B]">Prodotti</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* TASKS · KANBAN                                                       */
/* ------------------------------------------------------------------ */

export function TasksScreen() {
  const [ref, step] = useLoopSteps(4, 1700);
  const col = step === 0 ? 0 : step === 1 ? 1 : 2;
  const cols = [
    { name: "Da fare", icon: Circle, color: "#64748B", count: 163 },
    { name: "In corso", icon: Clock, color: "#3B82F6", count: 28 },
    { name: "Completati", icon: CircleCheck, color: "#10B981", count: 143 },
  ];
  const others = [
    [{ t: "Preventivo per Studio Ferraro", who: "GF", p: "media" as const }, { t: "Appuntamento via Roma 16", who: "SR", p: "alta" as const }],
    [{ t: "Ordine pavimento Villa Martini", who: "LG", p: "media" as const }],
    [{ t: "Ordine piano cucina", who: "", p: "media" as const }],
  ];
  return (
    <div ref={ref} className="relative h-full">
      <TpPageHeader
        icon={ListChecks}
        title="Task"
        subtitle="Organizza e traccia i tuoi task"
        actions={
          <>
            <span className="hidden rounded-full border border-[#EEF2F6] bg-white p-0.5 text-[7.5px] @xl:flex"><span className="rounded-full bg-[#3B82F6] px-1.5 py-0.5 font-medium text-white">Kanban</span><span className="px-1.5 py-0.5">Lista</span><span className="px-1.5 py-0.5">Calendario</span></span>
            <TpPill><Plus className="h-2.5 w-2.5" />Nuovo task</TpPill>
          </>
        }
      />
      <div className="mt-2 flex gap-1.5">
        <TpSearch placeholder="Cerca task…" className="flex-1" />
        <TpGhost className="hidden @md:inline-flex"><Building2 className="h-2.5 w-2.5" />Showroom</TpGhost>
        <TpGhost className="hidden @md:inline-flex"><User className="h-2.5 w-2.5" />Utenti</TpGhost>
      </div>
      <LayoutGroup id="tasks">
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {cols.map((c, ci) => (
            <div key={c.name} className="rounded-[14px] border border-[#EEF2F6] bg-white p-1.5">
              <div className="flex items-center gap-1 border-b border-[#F1F5F9] px-1 pb-1.5 pt-0.5">
                <c.icon className="h-2.5 w-2.5" style={{ color: c.color }} />
                <p className="text-[7.5px] font-semibold uppercase tracking-[0.12em]">{c.name}</p>
                <span className="ml-auto rounded-full bg-[#F1F5F9] px-1 text-[7px]">{c.count + (ci === col ? 1 : 0)}</span>
              </div>
              <p className="mt-1.5 px-1 text-[6.5px] font-medium uppercase tracking-[0.16em] text-[#64748B]">Ottobre 2026</p>
              <div className="mt-1 space-y-1.5">
                {ci === col && (
                  <motion.div layoutId="task-card" transition={{ type: "spring", stiffness: 240, damping: 28 }}>
                    <TaskCard t="Confermare misure Casa Bianchi" who="GF" p="alta" state={ci} active date="16/10/2026" />
                  </motion.div>
                )}
                {others[ci].map((o) => (
                  <TaskCard key={o.t} t={o.t} who={o.who} p={o.p} state={ci} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </LayoutGroup>
    </div>
  );
}

function TaskCard({ t, who, p, state, active = false, date }: { t: string; who: string; p: "media" | "alta"; state: number; active?: boolean; date?: string }) {
  const Icon = state === 0 ? Circle : state === 1 ? Clock : CircleCheck;
  const color = state === 0 ? "#94A3B8" : state === 1 ? "#3B82F6" : "#10B981";
  return (
    <div className={`rounded-[10px] border bg-white p-1.5 ${active ? "border-[#93C5FD] shadow-[0_8px_22px_rgba(59,130,246,.22)]" : "border-[#EEF2F6]"}`}>
      <div className="flex items-start gap-1">
        <Icon className="mt-[1px] h-2.5 w-2.5 shrink-0" style={{ color }} />
        <p className={`flex-1 text-[8px] font-medium leading-tight ${state === 2 ? "uppercase" : ""}`}>{t}</p>
        {who && <TpAvatar initials={who} size={13} />}
        <MoreHorizontal className="h-2.5 w-2.5 shrink-0 text-[#334155]" />
      </div>
      {date && <p className="mt-1 flex items-center gap-0.5 pl-3.5 text-[7px] text-[#64748B]"><Calendar className="h-2 w-2" />{date}</p>}
      <div className="mt-1 pl-3.5">
        <TpChip kind={p}>{p === "alta" ? "Alta" : "Media"}</TpChip>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ANALYTICS — barre e linea che si disegnano                           */
/* ------------------------------------------------------------------ */

export function PerformanceScreen() {
  const bars = [42, 58, 51, 67, 74, 63, 82, 91, 78, 88, 96, 104];
  const months = ["G", "F", "M", "A", "M", "G", "L", "A", "S", "O", "N", "D"];
  return (
    <div>
      <TpPageHeader icon={TrendingUp} title="Analytics" subtitle="Vendite, incassi e marginalità di tutti gli showroom" />
      <div className="mt-2 grid grid-cols-3 gap-2">
        <TpKpi icon={TrendingUp} iconTone="blue" label="Venduto anno" value={<CountUp to={1.84} decimals={2} suffix=" M€" />} hint="tutti gli showroom" />
        <TpKpi icon={Banknote} iconTone="emerald" label="Margine medio" value={<CountUp to={34.6} decimals={1} suffix="%" />} hint="sulle commesse chiuse" />
        <TpKpi icon={HandCoins} iconTone="orange" label="Da incassare" value={<CountUp to={189} suffix=".014 €" />} hint="31 commesse" />
      </div>
      <TpCard className="mt-2 p-3">
        <div className="flex items-center justify-between">
          <TpLabel>Venduto per mese · tutti gli showroom</TpLabel>
          <div className="flex gap-1">
            <TpChip kind="neutral">Milano</TpChip>
            <TpChip kind="tratt">Tutti</TpChip>
          </div>
        </div>
        <div className="relative mt-3 flex h-[110px] items-end gap-1.5">
          {bars.map((b, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <motion.div
                className={`w-full rounded-t-[4px] ${i === bars.length - 1 ? "bg-[#3B82F6]" : "bg-[#BFDBFE]"}`}
                initial={{ height: 0 }}
                whileInView={{ height: b * 0.95 }}
                viewport={{ once: false }}
                transition={{ duration: 0.9, ease: tpEase, delay: i * 0.05 }}
              />
              <span className="text-[7px] text-[#94A3B8]">{months[i]}</span>
            </div>
          ))}
          <svg className="pointer-events-none absolute inset-x-0 top-0 h-[100px] w-full" viewBox="0 0 300 100" preserveAspectRatio="none">
            <motion.path
              d="M0 70 C 30 62, 55 58, 80 55 S 130 46, 160 40 S 220 24, 250 22 S 285 12, 300 8"
              fill="none"
              stroke="#0F172A"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.6, ease: tpEase, delay: 0.4 }}
            />
          </svg>
        </div>
      </TpCard>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CONVERSIONE — preventivo → trattativa (Totalone) → schedina cliente  */
/* Ricostruita dagli screen reali: lista Preventivi, pannello           */
/* "Dettaglio Trattativa" e pagina "Schedina Cliente".                  */
/* ------------------------------------------------------------------ */

const convPhases = [
  { nav: "preventivi", tab: "Preventivi", label: "Preventivo convertito" },
  { nav: "totalone", tab: "Totalone showroom", label: "Trattativa creata" },
  { nav: "schedine", tab: "Schedina", label: "Schedina creata" },
];

export function ConversioneFlow({ className = "" }: { className?: string }) {
  const [ref, step] = useLoopSteps(9, 1500);
  const phase = step < 2 ? 0 : step < 5 ? 1 : 2;
  const p = convPhases[phase];
  return (
    <div ref={ref} className={className}>
      <div className="mb-3 flex flex-wrap items-center justify-center gap-1.5">
        {convPhases.map((c, i) => (
          <span key={c.label} className="flex items-center gap-1.5">
            {i > 0 && <span className={`h-px w-4 transition-colors ${i <= phase ? "bg-[#7C3AED]" : "bg-[#CBD5E1]"}`} />}
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold transition-colors duration-300 ${i === phase ? "bg-[#7C3AED] text-white shadow-[0_6px_16px_rgba(124,58,237,.3)]" : i < phase ? "bg-[#F3E8FF] text-[#7C3AED]" : "bg-white/70 text-[#8aa3bd]"}`}>
              {i < phase ? <Check className="h-3 w-3" /> : <span className="font-mono">{i + 1}</span>}
              {c.label}
            </span>
          </span>
        ))}
      </div>
      <AppWindow active={p.nav} title={p.tab} className="h-[400px] sm:h-[460px]">
        <AnimatePresence initial={false}>
          <motion.div key={phase} className="absolute inset-3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.45, ease: tpEase }}>
            {phase === 0 && <ConvPreventivi converted={step >= 1} />}
            {phase === 1 && <ConvTrattativa sheet={step >= 3} />}
            {phase === 2 && <SchedinaCliente rows={Math.min(4, step - 4)} />}
          </motion.div>
        </AnimatePresence>
      </AppWindow>
    </div>
  );
}

function ConvPreventivi({ converted }: { converted: boolean }) {
  const rows = [
    { i: "CB", n: "Preventivo Casa Bianchi", c: "Casa Bianchi", tot: "€ 26.290,00", conv: converted, hl: true },
    { i: "SF", n: "Preventivo Studio Ferraro", c: "Studio Ferraro · v1/2", tot: "€ 2.609,92", conv: false },
    { i: "LG", n: "Preventivo Luca Galli", c: "Luca Galli", tot: "€ 48.892,48", conv: true },
  ];
  return (
    <div>
      <TpPageHeader title="Preventivi" subtitle="Tutti i preventivi dei clienti · stati, versioni, confronto" />
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        <TpKpi icon={Euro} iconTone="purple" label="In pipeline" value={<CountUp key={`p${converted}`} to={converted ? 6320 : 32610} suffix=" €" duration={0.9} />} />
        <TpKpi icon={CheckCircle2} iconTone="emerald" label="Accettato" highlight={converted} value={<CountUp key={`a${converted}`} to={converted ? 112203 : 85913} suffix=" €" duration={0.9} />} />
        <TpKpi icon={Percent} iconTone="orange" label="Conversione" value={converted ? "63,6%" : "54,5%"} />
      </div>
      <div className="mt-2 space-y-1.5">
        {rows.map((r) => (
          <div key={r.n} className={`flex items-center gap-2 rounded-[12px] border bg-white px-2.5 py-2 shadow-[0_1px_4px_0_rgba(2,8,23,.05)] ${r.hl ? "border-[#C4B5FD] ring-2 ring-[#EDE9FE]" : "border-[#EEF2F6]"}`}>
            <TpAvatar initials={r.i} size={20} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[9px] font-semibold">{r.n}</p>
              <p className="truncate text-[7.5px] text-[#64748B]">{r.c}</p>
            </div>
            <AnimatePresence mode="wait">{r.conv ? <TpChip key="c" kind="convertito">↗ Convertito</TpChip> : <TpChip key="b" kind="neutral">Bozza</TpChip>}</AnimatePresence>
            <div className="text-right">
              <p className="text-[6.5px] uppercase tracking-[0.14em] text-[#64748B]">Totale</p>
              <p className="text-[9px] font-bold">{r.tot}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConvTrattativa({ sheet }: { sheet: boolean }) {
  return (
    <div className="relative h-full">
      <TpLabel>Trattative — 13 clienti</TpLabel>
      <TpLabel className="mt-2 !tracking-[0.22em]">Ottobre 2026</TpLabel>
      <div className="mt-1.5 space-y-1.5">
        <motion.div initial={{ opacity: 0, height: 0, y: -8 }} animate={{ opacity: 1, height: "auto", y: 0 }} transition={{ duration: 0.5, ease: tpEase, delay: 0.3 }}>
          <DealRow initials="CB" name="Casa Bianchi" meta="14/10/2026 · Giulia Ferri" status="final" preventivato="€ 26.290" venduto="€ 26.290" acconti="€ 0" saldo={["pagare", "€ 26.290 · Da pagare"]} glow />
        </motion.div>
        <DealRow initials="VM" name="Villa Martini" meta="09/10/2026 · Luca Gallo" status="tratt" preventivato="€ 16.110" venduto="€ 14.549" acconti="€ 3.000" saldo={["pagare", "€ 11.549 · Da pagare"]} />
        <DealRow initials="FC" name="Francesco Conti" meta="09/10/2026 · Sara Rinaldi" status="final" preventivato="€ 4.454" venduto="€ 3.800" acconti="€ 3.800" saldo={["saldato", "€ 0 · Saldato"]} />
      </div>

      <AnimatePresence>
        {sheet && (
          <>
            <motion.div key="ov" className="absolute -inset-3 z-10 bg-black/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
            <motion.div
              key="sheet"
              className="absolute -bottom-3 -right-3 -top-3 z-20 flex w-[66%] flex-col bg-white px-3.5 pb-3 pt-3.5 @xl:w-[50%]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: tpEase }}
            >
              <span className="absolute right-3 top-2.5 text-[11px] text-[#475569]">✕</span>
              <p className="text-[12px] font-bold tracking-[-0.02em]">Dettaglio Trattativa</p>
              <p className="text-[8.5px] text-[#64748B]">Casa Bianchi</p>
              <SheetDivider label="Cliente" />
              <div className="grid grid-cols-2 gap-1.5">
                <SheetField label="Nome cliente" value="Casa Bianchi" />
                <SheetField label="Data creazione" value="14/10/2026" focus />
              </div>
              <SheetDivider label="Dati economici" />
              <div className="flex items-start gap-1.5 rounded-[8px] border border-[#E2E8F0] p-1.5">
                <span className="grid h-3 w-3 shrink-0 place-items-center rounded-[3px] bg-[#0F172A] text-white"><Check className="h-2 w-2" /></span>
                <div className="min-w-0 flex-1">
                  <p className="text-[8px] font-medium">Abilita calcolo automatico IVA</p>
                  <p className="text-[6.5px] text-[#64748B]">I campi IVA esclusa vengono calcolati automaticamente</p>
                </div>
                <span className="rounded-[5px] border border-[#E2E8F0] px-1.5 text-[8px]">22 %</span>
              </div>
              <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                <SheetField label="Preventivo IVA incl. (€)" value={<>€ <CountUp to={26290} duration={1} /></>} white />
                <SheetField label="Preventivo IVA escl. (€)" value={<>€ <CountUp to={21549} duration={1} /></>} />
                <SheetField label="Venduto IVA incl. (€)" value={<>€ <CountUp to={26290} duration={1} /></>} white />
                <SheetField label="Venduto IVA escl. (€)" value={<>€ <CountUp to={21549} duration={1} /></>} />
              </div>
              <SheetDivider label="Acconti" />
              <div className="flex justify-between text-[8px] text-[#64748B]">
                <span>0 acconti</span>
                <span>Totale: <b className="text-[#0F172A]">€ 0</b></span>
              </div>
              <div className="mt-auto pt-2">
                <div className="grid h-[24px] place-items-center rounded-[8px] bg-[#0F172A] text-[9px] font-semibold text-white">Salva Modifiche</div>
                <p className="mt-1 text-center text-[8px] text-[#64748B]">Annulla</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
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

function SheetField({ label, value, focus = false, white = false }: { label: string; value: ReactNode; focus?: boolean; white?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="truncate text-[6.5px] font-medium uppercase tracking-[0.12em] text-[#475569]">{label}</p>
      <div className={`mt-0.5 flex h-[22px] items-center truncate rounded-[6px] px-1.5 text-[8.5px] font-medium ${focus ? "border-2 border-[#0F172A] bg-white" : white ? "border border-[#E2E8F0] bg-white" : "bg-[#F1F5F9]"}`}>{value}</div>
    </div>
  );
}

const schedinaProducts = [
  { brand: "Linea Cucine", tipo: "Cucina", listino: "26.285,00", sconto: "−30,00%", finale: "18.400,00", acquisto: "12.880,00", margine: "30,0%", good: true },
  { brand: "Pietra & Co", tipo: "Top in quarzo", listino: "3.070,00", sconto: "−29,97%", finale: "2.150,00", acquisto: "1.505,00", margine: "30,0%", good: true },
  { brand: "Casa Elettro", tipo: "Elettrodomestici", listino: "5.750,00", sconto: "−14,96%", finale: "4.890,00", acquisto: "3.912,00", margine: "20,0%", good: false },
  { brand: "Servizio", tipo: "Trasporto e montaggio", listino: "850,00", sconto: "0,00%", finale: "850,00", acquisto: "600,00", margine: "29,4%", good: true },
];

/** Pagina "Schedina Cliente" (screen reale), con le righe che arrivano dal preventivo. */
export function SchedinaCliente({ rows = 4 }: { rows?: number }) {
  return (
    <div className="h-full">
      <p className="text-[8.5px] text-[#64748B]">Schedine Clienti › <b className="font-semibold uppercase text-[#0F172A]">Casa Bianchi</b></p>
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

      <div className="relative mt-3 rounded-[14px] border border-[#EEF2F6] bg-white px-2.5 pb-2.5 pt-3.5 shadow-[0_1px_4px_0_rgba(2,8,23,.05)]">
        <span className="absolute -top-2 left-2.5 rounded-full bg-[#3B82F6] px-2 py-0.5 text-[6.5px] font-bold uppercase tracking-[0.12em] text-white">● Importi IVA incl.</span>
        <div className="flex items-center gap-2">
          <div>
            <TpLabel>Acquistato</TpLabel>
            <p className="text-[12px] font-bold">€ <CountUp key={rows} to={[0, 12880, 14385, 18297, 18897][rows] ?? 18897} duration={0.6} /></p>
          </div>
          <span className="text-[#CBD5E1]">+</span>
          <div>
            <p className="text-[7.5px] font-semibold uppercase tracking-[0.14em] text-[#059669]">Margine generato</p>
            <p className="text-[12px] font-bold text-[#059669]">€ <CountUp key={`m${rows}`} to={[0, 5520, 6165, 7143, 7393][rows] ?? 7393} duration={0.6} /></p>
          </div>
          <span className="text-[#CBD5E1]">=</span>
          <div>
            <TpLabel>Venduto IVA incl.</TpLabel>
            <p className="text-[12px] font-bold">€ <CountUp key={`v${rows}`} to={[0, 18400, 20550, 25440, 26290][rows] ?? 26290} duration={0.6} /></p>
          </div>
          <div className="ml-auto hidden border-l border-[#EEF2F6] pl-2 text-center @xl:block">
            <TpLabel>Prodotti</TpLabel>
            <p className="text-[12px] font-bold">{rows}</p>
          </div>
          {/* "Margine basso" come nello screen reale: compare quando entra il prodotto sotto soglia */}
          <AnimatePresence>
            {rows >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={spring}
                className="hidden shrink-0 rounded-[10px] border border-[#FDE68A] bg-[#FEFCE8] px-2 py-1 text-center @md:block"
              >
                <p className="text-[6.5px] font-bold uppercase tracking-[0.12em] text-[#B45309]">⚠ Margine basso</p>
                <p className="text-[9px] font-bold text-[#B45309]">1 prodotti</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-2.5 flex gap-3 border-b border-[#E2E8F0] text-[8.5px]">
        <span className="border-b-2 border-[#0F172A] pb-1 font-semibold">↓ Prodotti</span>
        <span className="pb-1 text-[#64748B]">Costi di Servizio</span>
        <span className="pb-1 text-[#64748B]">Documenti</span>
        <span className="hidden pb-1 text-[#64748B] @md:inline">Note</span>
        <span className="hidden pb-1 text-[#64748B] @xl:inline">Assistenza</span>
      </div>

      <div className="mt-2 overflow-hidden rounded-[14px] border border-[#EEF2F6] bg-white">
        <div className="grid grid-cols-[1.5fr_.9fr_.9fr_.7fr] gap-1.5 border-b border-[#EEF2F6] px-2.5 py-1.5 text-[6px] font-semibold uppercase tracking-[0.12em] text-[#64748B] @xl:grid-cols-[1.5fr_.9fr_.9fr_.7fr_.8fr_.8fr]">
          <span>Tipo</span>
          <span className="text-right">Finale (IVA incl.)</span>
          <span className="text-right">Acquisto</span>
          <span className="text-right">Margine</span>
          <span className="hidden text-center @xl:block">Fattura</span>
          <span className="hidden text-center @xl:block">Ordine</span>
        </div>
        {schedinaProducts.map((r, i) => (
          <motion.div
            key={r.tipo}
            initial={false}
            animate={{ opacity: i < rows ? 1 : 0, x: i < rows ? 0 : -10 }}
            transition={{ duration: 0.4, ease: tpEase }}
            className={`grid grid-cols-[1.5fr_.9fr_.9fr_.7fr] items-center gap-1.5 border-b border-[#F8FAFC] py-1.5 pl-2 pr-2.5 @xl:grid-cols-[1.5fr_.9fr_.9fr_.7fr_.8fr_.8fr] ${r.good ? "border-l-2 border-l-transparent" : "border-l-2 border-l-[#FACC15]"}`}
          >
            <span className="min-w-0">
              <span className="block truncate text-[6.5px] font-medium uppercase tracking-[0.1em] text-[#64748B]">{r.brand}</span>
              <span className="block truncate text-[9px] font-semibold">{r.tipo}</span>
            </span>
            <span className="text-right text-[8.5px] font-semibold text-[#EA580C]">€ {r.finale}</span>
            <span className="text-right text-[8.5px]">€ {r.acquisto}</span>
            <span className={`flex items-center justify-end gap-0.5 text-[8.5px] font-semibold ${r.good ? "text-[#059669]" : "text-[#EA580C]"}`}>
              {r.margine}
              <span className={`h-1.5 w-1.5 rounded-full ${r.good ? "bg-[#10B981]" : "bg-[#F59E0B]"}`} />
            </span>
            <span className="hidden justify-center @xl:flex"><span className="rounded-full px-1.5 py-0.5 text-[7px] font-medium text-[#DC2626] ring-1 ring-[#FECACA]">Mancante</span></span>
            <span className="hidden text-center text-[8px] text-[#94A3B8] @xl:block">—</span>
          </motion.div>
        ))}
        <div className="grid grid-cols-[1.5fr_.9fr_.9fr_.7fr] items-center gap-1.5 bg-[#F8FAFC] px-2.5 py-1.5 @xl:grid-cols-[1.5fr_.9fr_.9fr_.7fr_.8fr_.8fr]">
          <span className="text-[7px] font-semibold uppercase tracking-[0.14em] text-[#475569]">Σ Totali</span>
          <span className="text-right text-[8.5px] font-bold">€ {["0", "18.400", "20.550", "25.440", "26.290"][rows]}</span>
          <span className="text-right text-[8.5px] text-[#64748B]">€ {["0", "12.880", "14.385", "18.297", "18.897"][rows]}</span>
          <span className="text-right text-[8.5px] font-bold">{["—", "30,0%", "30,0%", "28,1%", "28,1%"][rows]}</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mappe di uso nel sito                                               */
/* ------------------------------------------------------------------ */

type ScreenDef = { el: () => ReactNode; nav: string; title: string };

/** Schermate della sezione "aree prodotto" (tab con autoplay). */
export const areaScreens: Record<string, ScreenDef> = {
  crm: { el: IngressiScreen, nav: "crm.ingressi", title: "Ingressi" },
  trattative: { el: PipelineScreen, nav: "crm.pipeline", title: "Pipeline CRM" },
  preventivi: { el: PreventiviListScreen, nav: "preventivi", title: "Preventivi" },
  commesse: { el: VenditeScreen, nav: "totalone", title: "Totalone showroom" },
  progetti: { el: TasksScreen, nav: "tasks.task", title: "Tasks" },
  ordini: { el: ArriviScreen, nav: "magazzino.arrivi", title: "Arrivi previsti" },
  magazzino: { el: MagazzinoScreen, nav: "magazzino.magazzino", title: "Magazzino" },
  montaggi: { el: RapportiniScreen, nav: "montaggi.rapportini", title: "Rapportini" },
  "post-vendita": { el: AssistenzeScreen, nav: "assistenze", title: "Assistenze" },
  performance: { el: PerformanceScreen, nav: "analytics", title: "Analytics" },
};
