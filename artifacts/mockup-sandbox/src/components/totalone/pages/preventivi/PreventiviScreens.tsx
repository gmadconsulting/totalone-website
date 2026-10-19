/**
 * Schermate del Preventivatore ricostruite dagli screen reali:
 * - 13: intestazione preventivo + specifiche prodotto (tab Cucine/Sistemi/…, IVA, EUR/CHF)
 * - 12: immagini + composizione sistema (ricarico %, righe N°/codice/descrizione/prezzo)
 * - 11: anteprima globale / impaginazione (ordine documenti, Preview PDF, IT/EN)
 * Dati fittizi; le foto reali sono sostituite da riquadri a gradiente neutri.
 */
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  Clipboard,
  Crop,
  Download,
  Eye,
  EyeOff,
  FileSignature,
  FileText,
  GitBranch,
  GripVertical,
  Image as ImageIcon,
  LayoutGrid,
  Layers,
  Link2,
  ListOrdered,
  Minus,
  Move,
  Plus,
  Save,
  Scale,
  Sigma,
  Text,
  Trash2,
  Truck,
  Upload,
  X,
  Armchair,
  ChefHat,
  Table2,
} from "lucide-react";
import { CountUp, tpEase, useLoopSteps } from "@/components/totalone/motion-kit";
import { AiFab, docFont } from "@/components/totalone/app-ui";

/* ------------------------------------------------------------------ */
/* Pezzi comuni                                                        */
/* ------------------------------------------------------------------ */

/** Barra superiore del preventivo (← Preventivi, titolo, v1, Bozza, Salva). */
function QuoteTopBar({ saved = false }: { saved?: boolean }) {
  return (
    <div className="flex items-center gap-2 border-b border-[#EEF0F3] pb-2">
      <span className="flex items-center gap-1 text-[8.5px] text-[#334155]"><ArrowLeft className="h-2.5 w-2.5" />Preventivi</span>
      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-[6px] bg-[#EFF6FF] text-[#3B82F6]"><FileText className="h-3 w-3" /></span>
      <div className="min-w-0">
        <p className="truncate text-[9.5px] font-semibold">Preventivo Villa Martini</p>
        <p className="flex items-center gap-1 text-[7px] text-[#64748B]">
          <span className="hidden @md:inline">Trattativa di</span> <b className="hidden rounded-[4px] bg-[#F1F5F9] px-1 text-[#0F172A] @md:inline">Villa Martini</b>
          <span className="inline-flex items-center gap-0.5 rounded-full px-1 text-[#3B82F6] ring-1 ring-[#BFDBFE]"><GitBranch className="h-2 w-2" />v1</span>
          <span className="inline-flex items-center gap-0.5 rounded-full bg-[#F8FAFC] px-1 ring-1 ring-[#E2E8F0]"><FileSignature className="h-2 w-2" />Bozza</span>
        </p>
      </div>
      <div className="ml-auto flex items-center gap-2 text-[#334155]">
        <FileSignature className="hidden h-3 w-3 @md:block" strokeWidth={1.75} />
        <GitBranch className="hidden h-3 w-3 @md:block" strokeWidth={1.75} />
        <motion.span animate={saved ? { scale: [1, 0.9, 1] } : {}} className={`flex items-center gap-1 text-[8.5px] font-medium ${saved ? "text-[#059669]" : ""}`}>
          {saved ? <Check className="h-3 w-3" /> : <Save className="h-3 w-3" strokeWidth={1.75} />} {saved ? "Salvato" : "Salva"}
        </motion.span>
        <Download className="h-3 w-3" strokeWidth={1.75} />
      </div>
    </div>
  );
}

/** Rail verticale "Foglio di calcolo" sul bordo destro. */
function SheetRail() {
  return (
    <div className="absolute -right-3 bottom-0 top-9 hidden w-4 flex-col items-center gap-1 border-l border-[#EEF0F3] bg-white pt-2 @3xl:flex">
      <Table2 className="h-2.5 w-2.5 text-[#3B82F6]" />
      <span className="text-[5.5px] font-semibold uppercase tracking-[0.2em] text-[#64748B] [writing-mode:vertical-rl]">Foglio di calcolo</span>
    </div>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return <p className="truncate text-[6.5px] font-medium uppercase tracking-[0.14em] text-[#64748B]">{children}</p>;
}

function Field({ label, value, placeholder, select = false, typed = true }: { label: string; value?: string; placeholder?: string; select?: boolean; typed?: boolean }) {
  return (
    <div className="min-w-0">
      <FieldLabel>{label}</FieldLabel>
      <div className="mt-0.5 flex h-[19px] items-center justify-between overflow-hidden rounded-[6px] bg-[#F1F5F9] px-1.5 text-[8.5px]">
        <AnimatePresence mode="wait" initial={false}>
          {value && typed ? (
            <motion.span key={value} className="truncate text-[#0F172A]" initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: tpEase }}>{value}</motion.span>
          ) : (
            <motion.span key="ph" className="truncate text-[#94A3B8]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{placeholder ?? ""}</motion.span>
          )}
        </AnimatePresence>
        {select && <ChevronDown className="h-2.5 w-2.5 shrink-0 text-[#64748B]" />}
      </div>
    </div>
  );
}

function SmallGhost({ children }: { children: ReactNode }) {
  return <span className="inline-flex h-[18px] items-center gap-1 rounded-full border border-[#E2E8F0] bg-white px-2 text-[7.5px] font-medium text-[#0F172A]">{children}</span>;
}

/** Riquadro neutro al posto delle foto reali del progetto. */
const photoTones = [
  "bg-[radial-gradient(circle_at_30%_20%,#ffffff_0%,transparent_40%),linear-gradient(160deg,#e7ded2,#b9ab98_60%,#8f8272)]",
  "bg-[radial-gradient(circle_at_70%_15%,#ffffff_0%,transparent_42%),linear-gradient(160deg,#dfe4ea,#aeb8c4_60%,#7f8b99)]",
  "bg-[radial-gradient(circle_at_50%_10%,#ffffff_0%,transparent_45%),linear-gradient(160deg,#e9e3da,#c7b9a4_55%,#9c8a72)]",
];

function PhotoTile({ tone, className = "" }: { tone: number; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${photoTones[tone % photoTones.length]} ${className}`} aria-hidden>
      {/* linee di prospettiva leggere: pavimento e parete, senza contenuti reali */}
      <span className="absolute inset-x-0 bottom-0 h-[34%] bg-black/10" />
      <span className="absolute left-[18%] right-[18%] top-[22%] bottom-[34%] rounded-[2px] border border-white/35" />
      <ImageIcon className="absolute left-1/2 top-[44%] h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-white/60" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 13 — Intestazione preventivo + specifiche prodotto                  */
/* ------------------------------------------------------------------ */

const tabs = [
  { label: "Cucine", icon: ChefHat },
  { label: "Sistemi", icon: LayoutGrid },
  { label: "Arredamento", icon: Armchair },
  { label: "Montaggio e trasporto", icon: Truck },
];

export function IntestazioneScreen() {
  const [ref, step] = useLoopSteps(7, 1500);
  return (
    <div ref={ref} className="relative h-full">
      <QuoteTopBar saved={step === 6} />
      <div className="mt-2 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[14px] font-bold tracking-[-0.03em]">Preventivatore</p>
          <p className="truncate text-[8.5px] text-[#64748B]">Cucine · Sistemi · Arredamento · Montaggio</p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <span className="hidden items-center rounded-full border border-[#EEF2F6] bg-white p-0.5 text-[7.5px] @md:flex">
            <span className={`rounded-full px-1.5 py-0.5 font-medium bg-[#3B82F6] text-white`}>IVA escl.</span>
            <span className={`rounded-full px-1.5 py-0.5 font-medium transition-colors duration-300 text-[#64748B]`}>IVA incl.</span>
            <span className="px-1 text-[#64748B]">%</span>
            <span className="rounded-[4px] bg-[#F1F5F9] px-1.5 py-0.5">0</span>
          </span>
          <span className="flex rounded-full border border-[#EEF2F6] bg-white p-0.5 text-[7.5px]">
            <span className="rounded-full bg-[#3B82F6] px-1.5 py-0.5 font-medium text-white">EUR</span>
            <span className="px-1.5 py-0.5 text-[#64748B]">CHF</span>
          </span>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-1">
        <div className="flex w-fit gap-0.5 rounded-full border border-[#EEF2F6] bg-white p-0.5">
          {tabs.map((t, i) => (
            <span key={t.label} className={`relative items-center gap-1 whitespace-nowrap rounded-full px-2 py-1 text-[8px] font-medium ${i === 1 ? "text-white" : "text-[#334155]"} ${i === 3 ? "hidden @xl:inline-flex" : "inline-flex"}`}>
              {i === 1 && <span className="absolute inset-0 rounded-full bg-[#3B82F6]" />}
              <t.icon className="relative h-2.5 w-2.5" strokeWidth={1.75} />
              <span className="relative">{t.label}</span>
            </span>
          ))}
        </div>
        <span className="grid h-[22px] w-[22px] place-items-center rounded-full border border-[#EEF2F6] bg-white"><ListOrdered className="h-2.5 w-2.5" /></span>
      </div>

      <div className="mt-2 rounded-[14px] border border-[#EEF2F6] bg-white p-2.5 shadow-[0_1px_4px_0_rgba(2,8,23,.05)]">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1 text-[7.5px] font-medium uppercase tracking-[0.16em] text-[#64748B]"><LayoutGrid className="h-2.5 w-2.5" />Intestazione preventivo</p>
          <SmallGhost><Plus className="h-2 w-2" />Aggiungi campo</SmallGhost>
        </div>
        <div className="mt-1.5 grid grid-cols-2 gap-1.5 @md:grid-cols-3">
          <Field label="Cliente *" value={step >= 1 ? "Villa Martini" : undefined} />
          <Field label="Luogo" value={step >= 2 ? "Lugano" : undefined} />
          <div className="hidden @md:block"><Field label="Telefono" placeholder="Dal CRM cliente" /></div>
          <div className="hidden @md:block"><Field label="Email" placeholder="Dal CRM cliente" /></div>
          <div className="hidden @md:block"><Field label="Luogo preventivo" placeholder="Showroom" /></div>
          <Field label="Data" value={step >= 2 ? "14/10/2026" : undefined} />
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: step >= 3 ? 1 : 0.35, y: step >= 3 ? 0 : 6 }}
        transition={{ duration: 0.5, ease: tpEase }}
        className="mt-2 rounded-[14px] border border-[#EEF2F6] bg-white shadow-[0_1px_4px_0_rgba(2,8,23,.05)]"
      >
        <div className="flex items-center gap-1.5 border-b border-[#F1F5F9] px-2.5 py-2">
          <span className="grid h-4 w-4 place-items-center rounded-full bg-[#7C3AED] text-[7.5px] font-bold text-white">1</span>
          <p className="text-[10px] font-semibold">Libreria su misura</p>
          <span className="ml-auto text-[10px] font-bold text-[#059669]">
            € <CountUp key={String(step >= 5)} to={step >= 5 ? 8800 : 0} duration={0.9} />,00
          </span>
          <Trash2 className="h-2.5 w-2.5 text-[#94A3B8]" />
          <ChevronUp className="h-2.5 w-2.5 text-[#64748B]" />
        </div>
        <div className="px-2.5 pb-2.5 pt-2">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1 text-[9px] font-semibold"><FileText className="h-2.5 w-2.5 text-[#64748B]" />Specifiche prodotto</p>
            <SmallGhost><Plus className="h-2 w-2" />Aggiungi campo</SmallGhost>
          </div>
          <div className="mt-1.5 grid grid-cols-2 gap-1.5">
            <Field label="Brand" value={step >= 4 ? "Atelier Legno" : undefined} placeholder="Seleziona" select />
            <Field label="Tipo prodotto" value={step >= 4 ? "Libreria" : undefined} placeholder="Seleziona" select />
          </div>
          <div className="mt-1.5 grid grid-cols-2 gap-1.5 @md:grid-cols-3">
            <Field label="Modello" placeholder="Modello" />
            <div className="hidden @md:block"><Field label="Struttura" placeholder="Struttura" /></div>
            <Field label="Led" value={step >= 5 ? "Led su ogni ripiano" : undefined} />
            <Field label="Ante" value={step >= 5 ? "Scorrevoli in vetro" : undefined} />
          </div>
        </div>
      </motion.div>
      <SheetRail />
      <AiFab />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 12 — Immagini e composizione sistema                                */
/* ------------------------------------------------------------------ */

const compRows = [
  { n: 2, d: "Libreria 140×40×h210", p: 1850 },
  { n: 1, d: "Libreria 230×40×h210", p: 2900 },
  { n: 1, d: "Mobile TV 200×45×h50", p: 1400 },
];

const eur = (v: number) => v.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: "always" } as unknown as Intl.NumberFormatOptions);

/**
 * `focus="immagini"`: le immagini si aggiungono una alla volta.
 * `focus="prezzi"`: i prezzi si compilano e il ricarico aggiorna i totali.
 */
export function ComposizioneScreen({ focus = "immagini" }: { focus?: "immagini" | "prezzi" }) {
  const [ref, step] = useLoopSteps(6, focus === "immagini" ? 1300 : 1500);
  const images = focus === "immagini" ? Math.min(3, step) : 3;
  const filled = focus === "prezzi" ? Math.min(3, step) : 3;
  const ric = focus === "prezzi" ? (step >= 4 ? 10 : 0) : 10;
  const rowTot = (i: number) => (i < filled ? compRows[i].n * compRows[i].p * (1 + ric / 100) : 0);
  const total = compRows.reduce((s, _r, i) => s + rowTot(i), 0);

  return (
    <div ref={ref} className="relative flex h-full flex-col">
      <QuoteTopBar saved={focus === "prezzi" && step === 5} />
      <div className="relative min-h-0 flex-1 overflow-hidden">
      <motion.div
        initial={false}
        animate={{ y: focus === "prezzi" ? -104 : 0 }}
        transition={{ duration: 0.8, ease: tpEase }}
        className="pt-2"
      >
        <FieldLabel>Finitura</FieldLabel>
        <p className="mt-0.5 flex items-center gap-1 text-[8.5px] font-medium text-[#3B82F6]"><Plus className="h-2.5 w-2.5" />Aggiungi finitura</p>

        {/* Immagini */}
        <div className="mt-2 rounded-[14px] border border-[#BFDBFE]/70 bg-white p-2">
          <p className="flex items-center gap-1 text-[7.5px]">
            <ImageIcon className="h-2.5 w-2.5 text-[#3B82F6]" />
            <b className="font-semibold uppercase tracking-[0.12em] text-[#2563EB]">Immagini</b>
            <span className="truncate text-[#3B82F6]/80">URL · file · incolla (Ctrl+V) · ritaglio</span>
          </p>
          <div className="mt-1.5 grid h-[78px] grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <AnimatePresence key={i} initial={false}>
                {i < images ? (
                  <motion.div
                    key="img"
                    initial={{ opacity: 0, scale: 0.9, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 380, damping: 26 }}
                    className="flex flex-col overflow-hidden rounded-[10px] border border-[#EEF2F6] bg-white"
                  >
                    <PhotoTile tone={i} className="flex-1" />
                    <div className="flex items-center gap-1 p-1">
                      <span className="flex h-[14px] flex-1 items-center justify-center gap-0.5 rounded-[4px] bg-[#2563EB] text-[7px] font-medium text-white"><Crop className="h-2 w-2" />Ritaglia</span>
                      <X className="h-2.5 w-2.5 text-[#94A3B8]" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-[10px] border border-dashed border-[#E2E8F0]" />
                )}
              </AnimatePresence>
            ))}
          </div>
          <div className="mt-1.5 flex items-center gap-1">
            <span className="flex h-[18px] flex-1 items-center gap-1 rounded-[6px] border border-[#E2E8F0] px-1.5 text-[7.5px] text-[#94A3B8]"><Link2 className="h-2 w-2" />https://…</span>
            <span className="hidden h-[18px] items-center gap-0.5 rounded-[6px] bg-[#93C5FD] px-1.5 text-[7px] font-medium text-white @md:inline-flex"><Plus className="h-2 w-2" />Aggiungi URL</span>
            <motion.span animate={focus === "immagini" && step >= 1 && step <= 3 ? { scale: [1, 0.92, 1] } : {}} transition={{ duration: 0.4 }} className="inline-flex h-[18px] items-center gap-0.5 rounded-[6px] border border-[#BFDBFE] px-1.5 text-[7px] font-medium text-[#2563EB]"><Upload className="h-2 w-2" />Dal PC</motion.span>
            <span className="inline-flex h-[18px] items-center gap-0.5 rounded-[6px] border border-[#BFDBFE] px-1.5 text-[7px] font-medium text-[#2563EB]"><Clipboard className="h-2 w-2" />Incolla</span>
          </div>
        </div>

        {/* Composizione sistema */}
        <div className="mt-2.5 flex items-center gap-1.5">
          <Layers className="h-3 w-3 text-[#3B82F6]" strokeWidth={1.75} />
          <p className="text-[10px] font-semibold">Composizione sistema</p>
          <motion.span
            initial={false}
            animate={{ boxShadow: focus === "prezzi" && step === 4 ? "0 0 0 2px rgba(59,130,246,.45)" : "0 0 0 0 rgba(59,130,246,0)" }}
            className="ml-auto flex h-[18px] items-center gap-1.5 rounded-[6px] bg-[#F1F5F9] px-1.5 text-[7px] font-medium uppercase tracking-[0.1em] text-[#64748B]"
          >
            Ricarico % <b className="text-[8.5px] text-[#0F172A]">{ric}</b>
          </motion.span>
          <SmallGhost><Plus className="h-2 w-2" />Campi prezzo</SmallGhost>
        </div>
        <div className="mt-1.5 rounded-[14px] border border-[#EEF2F6] bg-white p-2 shadow-[0_1px_4px_0_rgba(2,8,23,.05)]">
          <div className="flex items-center justify-between">
            <p className="text-[8px] font-medium uppercase tracking-[0.12em] text-[#334155]">Libreria su misura</p>
            <Trash2 className="h-2.5 w-2.5 text-[#94A3B8]" />
          </div>
          <div className="mt-1 grid grid-cols-[22px_1fr_44px_30px_52px] gap-1.5 border-b border-[#F1F5F9] pb-1 text-[6.5px] font-medium uppercase tracking-[0.12em] text-[#64748B] @md:grid-cols-[24px_42px_1fr_52px_34px_60px]">
            <span>N°</span><span className="hidden @md:block">Codice</span><span>Descrizione</span><span>Prezzo</span><span>Ric.%</span><span className="text-right">Tot.</span>
          </div>
          {compRows.map((r, i) => (
            <div key={r.d} className="grid grid-cols-[22px_1fr_44px_30px_52px] items-center gap-1.5 border-b border-[#F8FAFC] py-1 text-[8px] @md:grid-cols-[24px_42px_1fr_52px_34px_60px]" style={docFont}>
              <span className="font-semibold">N° {r.n}</span>
              <span className="hidden text-[#CBD5E1] @md:block">Codice</span>
              <span className="truncate">{r.d}</span>
              <motion.span
                initial={false}
                animate={{ backgroundColor: focus === "prezzi" && step === i + 1 ? "#DBEAFE" : "#F1F5F9" }}
                className="rounded-[4px] px-1 py-0.5 text-[7.5px]"
              >
                {i < filled ? eur(r.p).replace(",00", "") : "0"}
              </motion.span>
              <span className="rounded-[4px] bg-[#F1F5F9] px-1 py-0.5 text-[7.5px]">{i < filled ? ric : 0}</span>
              <span className="text-right font-semibold">€ {eur(rowTot(i))}</span>
            </div>
          ))}
        </div>
        {focus === "prezzi" && (
          <div className="mt-2 flex items-center gap-1.5 rounded-[12px] border border-[#EEF2F6] bg-white px-2.5 py-1.5 shadow-[0_1px_4px_0_rgba(2,8,23,.05)]">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-[#7C3AED] text-[7.5px] font-bold text-white">1</span>
            <p className="text-[9px] font-semibold">Libreria su misura</p>
            <span className="ml-auto text-[10px] font-bold text-[#059669]">€ {eur(total)}</span>
          </div>
        )}
      </motion.div>
      </div>
      <SheetRail />
      <AiFab />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 11 — Anteprima globale / Impaginazione                              */
/* ------------------------------------------------------------------ */

const labels = {
  it: { doc: "Preventivo", modello: "Modello", struttura: "Struttura", finitura: "Finitura", name: "Libreria su misura" },
  en: { doc: "Quotation", modello: "Model", struttura: "Structure", finitura: "Finish", name: "Custom bookcase" },
};

export function AnteprimaScreen() {
  const [ref, step] = useLoopSteps(6, 1600);
  const montaggioOn = step >= 1 && step <= 4;
  const lang = step >= 2 && step <= 4 ? "en" : "it";
  const pdfPress = step === 4;
  const L = labels[lang];

  return (
    <div ref={ref} className="relative h-full">
      {/* preventivatore sotto, oscurato */}
      <div className="absolute -inset-3 bg-[#0F172A]/45" />
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: tpEase }}
        className="absolute inset-0 flex flex-col overflow-hidden rounded-[12px] bg-white shadow-[0_24px_60px_rgba(2,8,23,.35)]"
      >
        <div className="flex items-center gap-1.5 border-b border-[#EEF0F3] px-2.5 py-2">
          <ListOrdered className="h-3 w-3 shrink-0 text-[#3B82F6]" />
          <p className="truncate text-[9.5px] font-semibold">Anteprima globale / Impaginazione</p>
          <div className="ml-auto flex shrink-0 items-center gap-1">
            <motion.span
              animate={pdfPress ? { scale: [1, 0.9, 1] } : {}}
              transition={{ duration: 0.45 }}
              className={`inline-flex h-[18px] items-center gap-1 rounded-[6px] bg-[#0F172A] px-1.5 text-[7.5px] font-medium text-white ${pdfPress ? "ring-2 ring-[#3B82F6]/50" : ""}`}
            >
              <Eye className="h-2.5 w-2.5" />Preview PDF
            </motion.span>
            <span className="hidden h-[18px] items-center gap-1 rounded-[6px] border border-[#E2E8F0] px-1.5 text-[7.5px] font-medium @xl:inline-flex"><ListOrdered className="h-2.5 w-2.5" />Prezzi / totali</span>
            <span className="hidden h-[18px] max-w-[92px] items-center truncate rounded-[6px] border border-[#E2E8F0] px-1.5 text-[7.5px] @3xl:inline-flex">Showroom Lugano</span>
            <span className="flex rounded-full border border-[#EEF2F6] p-0.5 text-[7px] font-semibold">
              <span className={`rounded-full px-1.5 py-0.5 transition-colors duration-300 ${lang === "it" ? "bg-[#3B82F6] text-white" : "text-[#64748B]"}`}>IT</span>
              <span className={`rounded-full px-1.5 py-0.5 transition-colors duration-300 ${lang === "en" ? "bg-[#3B82F6] text-white" : "text-[#64748B]"}`}>EN</span>
            </span>
            <X className="h-3 w-3 text-[#475569]" />
          </div>
        </div>

        <div className="flex min-h-0 flex-1">
          {/* Ordine documenti */}
          <div className="hidden w-[40%] shrink-0 flex-col border-r border-[#EEF0F3] bg-[#F8FAFC] p-2 @md:flex">
            <p className="text-[6.5px] font-semibold uppercase tracking-[0.16em] text-[#64748B]">Ordine documenti</p>
            <div className="mt-1.5 space-y-1">
              <DocItem icon={LayoutGrid} title="Libreria su misura" kind="Sistema" price="€ 8.800,00" on />
              <DocItem icon={Truck} title="Montaggio e trasporto" kind="Montaggio" price="€ 650,00" on={montaggioOn} flash={step === 1} />
              <DocItem icon={Sigma} title="Totale generale" kind="Totali" price="€ 9.450,00" on />
              <div className="flex items-start gap-1 rounded-[8px] border border-dashed border-[#FCD34D] bg-[#FFFBEB] p-1.5">
                <GripVertical className="mt-0.5 h-2.5 w-2.5 shrink-0 text-[#CBD5E1]" />
                <Scale className="mt-0.5 h-2.5 w-2.5 shrink-0 text-[#D97706]" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[6.5px] font-bold uppercase tracking-[0.08em] text-[#D97706]">Sale terms and conditions:</p>
                  <p className="truncate text-[7px] text-[#334155]">* IVA esclusa. * Validità dell'off…</p>
                </div>
                <Trash2 className="h-2.5 w-2.5 shrink-0 text-[#94A3B8]" />
              </div>
            </div>
            <div className="mt-auto space-y-1">
              {([[Plus, "Interruzione pagina"], [Text, "Testo libero"], [Minus, "Linea"], [Scale, "T&C · Termini"]] as const).map(([Icon, l]) => (
                <span key={l} className="flex h-[17px] items-center justify-center gap-1 rounded-[6px] border border-[#E2E8F0] bg-white text-[7px] font-medium"><Icon className="h-2 w-2" />{l}</span>
              ))}
            </div>
          </div>

          {/* Pagina PDF */}
          <div className="min-w-0 flex-1 overflow-hidden bg-[#EEF0F3] p-2">
            <div className="mx-auto h-full max-w-[300px] overflow-hidden bg-white px-3 pt-3 shadow-[0_2px_8px_rgba(2,8,23,.08)]" style={docFont}>
              <div className="flex items-start justify-between">
                <div>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p key={L.doc} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }} className="text-[6px] font-semibold uppercase tracking-[0.2em] text-[#64748B]">{L.doc}</motion.p>
                  </AnimatePresence>
                  <p className="text-[11px] font-bold tracking-[-0.02em]">Villa Martini</p>
                  <p className="text-[6.5px] text-[#475569]">{lang === "it" ? "Preventivo" : "Quotation"} Villa Martini</p>
                </div>
                <span className="text-[11px] font-black tracking-[-0.04em] text-[#0F172A]">showroom<span className="text-[#3B82F6]">.</span></span>
              </div>
              <div className="mt-2 h-px bg-[#E2E8F0]" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.p key={L.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-2 text-[9px] font-bold">{L.name}</motion.p>
              </AnimatePresence>
              <div className="mt-1 flex justify-end gap-2 text-[6px] font-medium">
                <span className="text-[#3B82F6]">+ Spazio</span>
                <span className="text-[#334155]">= Equalizza</span>
                <span className="text-[#334155]">— Nascondi</span>
              </div>
              <div className="mt-1 grid h-[86px] grid-cols-3 gap-[2px] @xl:h-[110px]">
                <PhotoTile tone={0} />
                <div className="relative">
                  <PhotoTile tone={1} className="h-full" />
                  <span className="absolute right-1 top-1 grid h-3 w-3 place-items-center rounded-full bg-black/45 text-white"><X className="h-2 w-2" /></span>
                  <span className="absolute bottom-1 left-1 inline-flex items-center gap-0.5 rounded-full bg-black/55 px-1 py-0.5 text-[5.5px] font-medium text-white"><Move className="h-1.5 w-1.5" />Inquadra</span>
                </div>
                <PhotoTile tone={2} />
              </div>
              <p className="mt-1 text-center text-[5.5px] text-[#94A3B8]">Spazio = box blu vuoto · + = immagine · Nascondi = chiudi galleria</p>
              <div className="mt-2 space-y-0.5">
                {[L.modello, L.struttura, L.finitura].map((l) => (
                  <p key={l} className="flex gap-6 text-[6.5px]"><span className="w-12 font-semibold uppercase tracking-[0.08em] text-[#64748B]">{l}</span><span className="text-[#94A3B8]">—</span></p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function DocItem({
  icon: Icon,
  title,
  kind,
  price,
  on,
  flash = false,
}: {
  icon: typeof Truck;
  title: string;
  kind: string;
  price: string;
  on: boolean;
  flash?: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: on ? 1 : 0.5, boxShadow: flash ? "0 0 0 2px rgba(59,130,246,.4)" : "0 1px 3px rgba(2,8,23,.05)" }}
      transition={{ duration: 0.35 }}
      className="flex items-center gap-1 rounded-[8px] border border-[#EEF2F6] bg-white p-1.5"
    >
      <GripVertical className="h-2.5 w-2.5 shrink-0 text-[#CBD5E1]" />
      <Icon className="h-2.5 w-2.5 shrink-0 text-[#3B82F6]" strokeWidth={1.75} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[7.5px] font-semibold">{title}</p>
        <p className="text-[6px] uppercase tracking-[0.1em] text-[#94A3B8]">{kind}</p>
      </div>
      <span className="shrink-0 text-[7px] font-semibold text-[#059669]">{price}</span>
      {on ? <Eye className="h-2.5 w-2.5 shrink-0 text-[#3B82F6]" /> : <EyeOff className="h-2.5 w-2.5 shrink-0 text-[#94A3B8]" />}
    </motion.div>
  );
}

