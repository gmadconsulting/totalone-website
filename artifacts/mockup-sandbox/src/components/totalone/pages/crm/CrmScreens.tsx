/**
 * Schermate CRM aggiuntive, ricostruite dagli screen reali dell'app:
 * - Appuntamenti (calendario mese)          → screen 15
 * - Contatti Aziendali (anagrafiche business) → screen 18
 * - Email Marketing (campagne su smart list)  → screen 16
 * Stile copiato da app-screens.tsx. Dati fittizi.
 */
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, CalendarDays, ChevronLeft, ChevronRight, Link2, ListChecks, Mail, Pencil, Plus, Send, Trash2, Users } from "lucide-react";
import { CountUp, tpEase, useLoopSteps } from "@/components/totalone/motion-kit";
import { AiFab, TpChip, TpGhost, TpLabel, TpPageHeader, TpPill, TpSearch } from "@/components/totalone/app-ui";

/* ------------------------------------------------------------------ */
/* APPUNTAMENTI · calendario mese (ottobre 2026)                        */
/* ------------------------------------------------------------------ */

const weekDays = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
/** Ottobre 2026 inizia di giovedì: griglia 28 set → 8 nov. */
const monthCells = Array.from({ length: 42 }, (_, i) => {
  const d = i - 2; // i = 3 → 1 ottobre
  if (d < 1) return { n: 27 + i + 1, out: true, key: `p${i}` }; // 28, 29, 30 settembre
  if (d > 31) return { n: d - 31, out: true, key: `n${i}` };
  return { n: d, out: false, key: `d${d}` };
});

type Appt = { day: number; time: string; who: string; from: number };
const appts: Appt[] = [
  { day: 7, time: "09:00", who: "Casa Bianchi", from: 0 },
  { day: 13, time: "17:30", who: "Studio Ferraro", from: 0 },
  { day: 16, time: "10:30", who: "Elena Rinaldi", from: 2 },
  { day: 21, time: "15:00", who: "Villa Martini", from: 3 },
  { day: 23, time: "11:00", who: "Famiglia Conti", from: 4 },
];

export function AppuntamentiScreen() {
  const [ref, step] = useLoopSteps(7, 1500);
  const visible = appts.filter((a) => step >= a.from && !(step === 6 && a.from > 0));
  return (
    <div ref={ref} className="relative flex h-full flex-col">
      <TpPageHeader
        icon={CalendarDays}
        title="Appuntamenti"
        subtitle="Ottobre 2026"
        actions={
          <>
            <TpGhost className="hidden @xl:inline-flex"><Link2 className="h-2.5 w-2.5" />Collega</TpGhost>
            <TpGhost className="hidden @md:inline-flex">Oggi</TpGhost>
            <span className="hidden h-[22px] w-[22px] place-items-center rounded-full border border-[#E2E8F0] bg-white @md:grid"><ChevronLeft className="h-3 w-3" /></span>
            <span className="hidden h-[22px] w-[22px] place-items-center rounded-full border border-[#E2E8F0] bg-white @md:grid"><ChevronRight className="h-3 w-3" /></span>
            <motion.span animate={step === 1 ? { scale: [1, 0.88, 1] } : {}} transition={{ duration: 0.4 }}>
              <TpPill><Plus className="h-2.5 w-2.5" />Nuovo</TpPill>
            </motion.span>
          </>
        }
      />
      <div className="mt-2.5 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[14px] border border-[#EEF2F6] bg-white">
        <div className="grid grid-cols-7 border-b border-[#EEF2F6]">
          {weekDays.map((d) => (
            <p key={d} className="py-1 text-center text-[6.5px] font-medium uppercase tracking-[0.14em] text-[#64748B]">{d}</p>
          ))}
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-7 grid-rows-6">
          {monthCells.map((c, i) => {
            const dayAppts = c.out ? [] : visible.filter((a) => a.day === c.n);
            const today = !c.out && c.n === 15;
            return (
              <div key={c.key} className={`relative min-w-0 overflow-hidden border-[#F1F5F9] px-[3px] pt-[3px] ${i % 7 !== 6 ? "border-r" : ""} ${i < 35 ? "border-b" : ""} ${c.out ? "bg-[#FAFBFC]" : ""}`}>
                <div className="flex items-center">
                  <span className={`grid h-[13px] min-w-[13px] place-items-center rounded-full text-[7px] font-semibold ${today ? "bg-[#3B82F6] text-white" : c.out ? "text-[#94A3B8]" : "text-[#0F172A]"}`}>{c.n}</span>
                  {dayAppts.length > 0 && <span className="ml-auto text-[6px] text-[#94A3B8]">{dayAppts.length}</span>}
                </div>
                <AnimatePresence initial={false}>
                  {dayAppts.map((a) => (
                    <motion.div
                      key={a.who}
                      initial={{ opacity: 0, scale: 0.8, y: 4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 420, damping: 26 }}
                      className={`mt-[2px] rounded-[4px] border px-[3px] py-[1px] ${a.from > 0 && step === a.from ? "border-[#3B82F6] bg-[#DBEAFE] shadow-[0_4px_10px_rgba(59,130,246,.3)]" : "border-[#BFDBFE] bg-[#E8F0FE]"}`}
                    >
                      <p className="text-[6px] font-medium leading-tight text-[#2563EB]">{a.time}</p>
                      <p className="truncate text-[6px] leading-tight text-[#2563EB]">{a.who}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
      <AiFab />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CRM · CONTATTI AZIENDALI                                             */
/* ------------------------------------------------------------------ */

const companies = [
  { name: "Linea Cucine", type: "Fornitore", contacts: 3 },
  { name: "Logistica Nord", type: "Trasportatore", contacts: 2 },
  { name: "Pietra & Co", type: "Fornitore", contacts: 1 },
  { name: "Studio Ferraro", type: "Partner", contacts: 2 },
  { name: "Forma Divani", type: "Fornitore", contacts: 4 },
  { name: "Luce & Co", type: "Fornitore", contacts: 1 },
];

export function ContattiAziendaliScreen() {
  const [ref, step] = useLoopSteps(6, 1500);
  const count = Math.min(2 + step, companies.length);
  return (
    <div ref={ref} className="relative h-full">
      <p className="text-[12.5px] font-semibold tracking-[-0.02em]">Contatti Aziendali</p>
      <p className="mt-0.5 truncate text-[8.5px] text-[#64748B]">Anagrafiche di fornitori, partner, trasportatori e altri contatti business.</p>
      <div className="mt-2.5 flex items-center gap-2 rounded-[14px] border border-[#EEF2F6] bg-white p-1.5 shadow-[0_1px_4px_0_rgba(2,8,23,.05)]">
        <TpSearch placeholder="Cerca per ragione sociale, P.IVA, email, città, settore..." className="min-w-0 flex-1 overflow-hidden whitespace-nowrap" />
        <span className="hidden whitespace-nowrap text-[8px] text-[#64748B] @md:inline">
          {count} aziende
        </span>
        <motion.span animate={step > 0 ? { scale: [1, 0.9, 1] } : {}} key={step} transition={{ duration: 0.35 }} className="shrink-0">
          <TpPill><Plus className="h-2.5 w-2.5" />Nuova azienda</TpPill>
        </motion.span>
      </div>
      <div className="mt-2.5 grid grid-cols-1 gap-2 @md:grid-cols-2 @3xl:grid-cols-3">
        <AnimatePresence initial={false}>
          {companies.slice(0, count).map((c, i) => {
            const isNew = i === count - 1 && step > 0;
            return (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: tpEase }}
                className={`rounded-[14px] border bg-white p-2.5 shadow-[0_1px_4px_0_rgba(2,8,23,.05)] transition-colors duration-500 ${isNew ? "border-[#93C5FD] ring-2 ring-[#3B82F6]/15" : "border-[#EEF2F6]"}`}
              >
                <div className="flex items-start gap-2">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#EFF6FF] text-[#3B82F6]"><Building2 className="h-3 w-3" strokeWidth={1.75} /></span>
                  <div className="min-w-0">
                    <p className="truncate text-[9.5px] font-semibold">{c.name}</p>
                    <span className="mt-0.5 inline-flex rounded-full bg-[#EFF6FF] px-1.5 py-[1px] text-[7px] font-medium text-[#3B82F6]">{c.type}</span>
                  </div>
                </div>
                <div className="mt-2 border-t border-[#F1F5F9] pt-1.5">
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#EEF2F6] px-1.5 py-[1px] text-[7px] font-medium text-[#0F172A]"><Users className="h-2 w-2" />{c.contacts} contatti</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <AiFab />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CRM · EMAIL MARKETING (Automation)                                   */
/* ------------------------------------------------------------------ */

type Campaign = { name: string; subject: string; list: string };
const campaigns: Campaign[] = [
  { name: "Inviti serata showroom", subject: "Ti aspettiamo giovedì sera", list: "Clienti Milano Centro" },
  { name: "Novità zona giorno", subject: "Le nuove collezioni sono arrivate", list: "Lead da ingresso" },
];
const newCampaign: Campaign = { name: "Open day cucine", subject: "Porte aperte nel weekend", list: "Lead cucine · Como" };

function EmailKpi({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: ReactNode }) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-[14px] border border-[#EEF2F6] bg-white p-2 shadow-[0_1px_4px_0_rgba(2,8,23,.05)]">
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-[7px] bg-[#EFF6FF] text-[#3B82F6]"><Icon className="h-3 w-3" strokeWidth={1.75} /></span>
      <div className="min-w-0">
        <TpLabel className="truncate">{label}</TpLabel>
        <p className="text-[13px] font-bold leading-none tracking-[-0.03em]">{value}</p>
      </div>
    </div>
  );
}

export function EmailMarketingScreen() {
  const [ref, step] = useLoopSteps(6, 1700);
  const draft = step >= 2;
  const sent = step >= 4;
  return (
    <div ref={ref} className="relative h-full">
      <p className="text-[12.5px] font-semibold tracking-[-0.02em]">Email Marketing</p>
      <p className="mt-0.5 truncate text-[8.5px] text-[#64748B]">Crea una campagna, seleziona una smart list e invia l'email a tutti i contatti della lista.</p>
      <div className="mt-2.5 grid grid-cols-2 gap-1.5 @xl:grid-cols-4">
        <EmailKpi icon={Mail} label="Bozze" value={draft && !sent ? 1 : 0} />
        <EmailKpi icon={Send} label="Inviate" value={sent ? 3 : 2} />
        <EmailKpi icon={Users} label="Email totali" value={<CountUp key={String(sent)} to={sent ? 214 : 172} duration={0.9} />} />
        <EmailKpi icon={ListChecks} label="Liste disponibili" value={4} />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="min-w-0 flex-1 rounded-[14px] border border-[#EEF2F6] bg-white p-1.5">
          <TpSearch placeholder="Cerca campagna..." className="w-full" />
        </div>
        <motion.span animate={step === 1 ? { scale: [1, 0.85, 1] } : {}} transition={{ duration: 0.4 }} className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-[#3B82F6] text-white shadow-[0_4px_10px_rgba(59,130,246,.3)]">
          <Plus className="h-3 w-3" />
        </motion.span>
      </div>
      <div className="mt-2 overflow-hidden rounded-[14px] border border-[#EEF2F6] bg-white">
        <div className="grid grid-cols-[1.5fr_1fr_.8fr] items-center gap-2 border-b border-[#F1F5F9] px-2.5 py-1.5 @md:grid-cols-[1.5fr_1.1fr_.8fr_.6fr]">
          {["Campagna", "Lista", "Stato"].map((h) => <TpLabel key={h}>{h}</TpLabel>)}
          <TpLabel className="hidden text-right @md:block">Azioni</TpLabel>
        </div>
        <AnimatePresence initial={false}>
          {draft && (
            <motion.div key="new" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5, ease: tpEase }}>
              <CampaignRow c={newCampaign} status={sent ? "done" : "draft"} highlight />
            </motion.div>
          )}
        </AnimatePresence>
        {campaigns.map((c) => <CampaignRow key={c.name} c={c} status="done" />)}
      </div>
    </div>
  );
}

function CampaignRow({ c, status, highlight = false }: { c: Campaign; status: "draft" | "done"; highlight?: boolean }) {
  return (
    <div className={`grid grid-cols-[1.5fr_1fr_.8fr] items-center gap-2 border-b border-[#F1F5F9] px-2.5 py-2 last:border-b-0 @md:grid-cols-[1.5fr_1.1fr_.8fr_.6fr] ${highlight ? "bg-[#F8FBFF]" : ""}`}>
      <div className="min-w-0">
        <p className="truncate text-[9px] font-semibold">{c.name}</p>
        <p className="truncate text-[7.5px] text-[#64748B]">{c.subject}</p>
      </div>
      <span className="inline-flex min-w-0 items-center gap-1 justify-self-start rounded-full bg-[#F8FAFC] px-1.5 py-0.5 text-[7.5px] text-[#334155] ring-1 ring-[#EEF2F6]">
        <ListChecks className="h-2.5 w-2.5 shrink-0" /><span className="truncate">{c.list}</span>
      </span>
      <span>
        <AnimatePresence mode="wait" initial={false}>
          {status === "done" ? <TpChip key="d" kind="saldato">Completata</TpChip> : <TpChip key="b" kind="neutral">Bozza</TpChip>}
        </AnimatePresence>
      </span>
      <span className="hidden justify-end gap-1 @md:flex">
        <span className="grid h-[18px] w-[18px] place-items-center rounded-full border border-[#E2E8F0] text-[#0F172A]"><Pencil className="h-2 w-2" /></span>
        <span className="grid h-[18px] w-[18px] place-items-center rounded-full border border-[#FECACA] text-[#EF4444]"><Trash2 className="h-2 w-2" /></span>
      </span>
    </div>
  );
}
