import { useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  CircleUserRound,
  Clock3,
  FileText,
  MessageSquareText,
  Plus,
  Send,
  Store,
  Target,
  UsersRound,
  X,
} from "lucide-react";

const pipeline = [
  { label: "Nuovi contatti", count: "18", value: "€ 186.400", tone: "bg-[#dcecff] text-[#0b55c6]" },
  { label: "Da qualificare", count: "11", value: "€ 124.900", tone: "bg-[#fff2dd] text-[#ad6817]" },
  { label: "Appuntamento", count: "7", value: "€ 82.600", tone: "bg-[#efe4ff] text-[#6943a4]" },
  { label: "Preventivo", count: "9", value: "€ 156.200", tone: "bg-[#ffdcd2] text-[#c34d35]" },
  { label: "In decisione", count: "4", value: "€ 61.800", tone: "bg-[#d9f3e8] text-[#21764f]" },
];

const activities = [
  ["09:42", "Nuova richiesta da Casa Forma", "Assegnata a Martina · Showroom Milano"],
  ["Ieri", "Preventivo aggiornato per Bianchi", "Passata in fase “In decisione”"],
  ["Mar", "Appuntamento confermato", "Rossi Design · 16 maggio, ore 15:30"],
];

function Logo() {
  return (
    <a href="/__mockup/preview/totalone-homepage/TotaloneHomepage" className="flex items-center gap-2.5 text-[#102744]">
      <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[#102744] text-white">
        <span className="h-3.5 w-3.5 rounded-full border-2 border-current" />
      </span>
      <span className="text-[18px] font-bold tracking-[-0.06em]">totalone</span>
    </a>
  );
}

function DemoModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#061a38]/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Parliamo delle trattative">
      <div className="relative w-full max-w-lg rounded-[18px] bg-white p-6 shadow-2xl sm:p-9">
        <button onClick={onClose} className="absolute right-5 top-5 rounded-full p-2 text-[#557090] hover:bg-[#eaf3ff]" aria-label="Chiudi">
          <X className="h-5 w-5" />
        </button>
        {!sent ? (
          <>
            <span className="inline-flex rounded-full bg-[#dcecff] px-3 py-1.5 text-xs font-bold text-[#0b55c6]">PARLIAMO DEL TUO PROCESSO COMMERCIALE</span>
            <h2 className="mt-5 max-w-sm text-4xl font-bold leading-[1.02] tracking-[-0.06em] text-[#102744]">Partiamo da una trattativa reale.</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#557090]">Ti mostriamo come rendere più leggibile il percorso, dal primo contatto al preventivo.</p>
            <div className="mt-7 grid gap-3">
              <input className="rounded-[9px] border border-[#c8dcf3] px-4 py-3 text-sm outline-none placeholder:text-[#8aa3bd] focus:border-[#1769d5]" placeholder="Nome e cognome" />
              <input className="rounded-[9px] border border-[#c8dcf3] px-4 py-3 text-sm outline-none placeholder:text-[#8aa3bd] focus:border-[#1769d5]" placeholder="Email aziendale" type="email" />
              <button onClick={() => setSent(true)} className="mt-2 inline-flex items-center justify-center gap-2 rounded-[9px] bg-[#f36b4d] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#ff8668]">
                Richiedi il contatto <Send className="h-4 w-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#dcecff] text-[#1769d5]"><Check className="h-6 w-6" /></div>
            <h2 className="mt-5 text-4xl font-bold tracking-[-0.06em] text-[#102744]">Ricevuto.</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#557090]">Ti ricontatteremo per capire insieme dove si inceppa oggi il percorso commerciale.</p>
            <button onClick={onClose} className="mt-7 rounded-[9px] border border-[#1769d5] px-5 py-3 text-sm font-bold text-[#0b55c6] hover:bg-[#eaf3ff]">Torna alla pagina</button>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, note }: { icon: typeof Target; label: string; value: string; note: string }) {
  return (
    <div className="rounded-[14px] border border-[#cfe1f4] bg-white p-5">
      <div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-[.12em] text-[#7b91a8]">{label}</span><Icon className="h-4 w-4 text-[#1769d5]" /></div>
      <strong className="mt-6 block text-3xl font-bold tracking-[-0.06em] text-[#102744]">{value}</strong>
      <span className="mt-2 block text-xs font-semibold text-[#557090]">{note}</span>
    </div>
  );
}

export function GestioneTrattative() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <main className="min-h-[100dvh] overflow-hidden bg-[#fbfdff] text-[#102744]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`html { scroll-behavior: smooth; }`}</style>
      <header className="border-b border-[#dce9f6] bg-white">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <Logo />
          <a href="/__mockup/preview/totalone-homepage/TotaloneHomepage" className="inline-flex items-center gap-2 text-sm font-bold text-[#245b96] hover:text-[#0b55c6]"><ArrowLeft className="h-4 w-4" /> Torna al prodotto</a>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[linear-gradient(116deg,#082c68_0%,#0d56bf_56%,#1387ee_100%)] py-20 text-white sm:py-28">
        <div className="absolute -right-20 top-8 h-[420px] w-[420px] rounded-full bg-[#75d7ff]/25 blur-3xl" />
        <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
            <div>
              <span className="inline-flex rounded-full border border-[#8ecbff] bg-[#5abaff]/20 px-3.5 py-2 text-xs font-bold tracking-[0.08em] text-[#eff8ff]">GESTIONE TRATTATIVE</span>
              <h1 className="mt-7 max-w-2xl text-[clamp(3rem,6.5vw,6.4rem)] font-bold leading-[.92] tracking-[-0.075em]">Ogni trattativa ha un <span className="text-[#9fe0ff]">prossimo passo.</span></h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#e5f3ff]">Dalla prima richiesta al preventivo, il team vede cosa sta succedendo, chi deve muoversi e quale opportunità merita attenzione.</p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button onClick={() => setDemoOpen(true)} className="group inline-flex items-center justify-center gap-2 rounded-[9px] bg-[#f36b4d] px-5 py-3.5 text-[14px] font-bold text-white shadow-[0_10px_24px_rgba(173,57,35,.22)] hover:bg-[#ff8668]">Parliamone <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button>
                <a href="#pipeline" className="inline-flex items-center gap-2 px-2 text-sm font-bold text-white hover:text-[#d0d0d0]">Guarda la pipeline <ChevronDown className="h-4 w-4" /></a>
              </div>
            </div>
            <div className="rounded-[18px] border border-[#8ecbff]/60 bg-[#f8fbff] p-4 shadow-[0_26px_70px_rgba(4,43,102,.26)] sm:p-6">
              <div className="rounded-[13px] border border-[#c8dcf3] bg-white p-5 text-[#102744] sm:p-7">
                <div className="flex items-center justify-between border-b border-[#e4eef8] pb-5"><div><span className="text-[10px] font-bold uppercase tracking-[.12em] text-[#0b55c6]">Panoramica commerciale</span><h2 className="mt-2 text-xl font-bold tracking-[-0.04em]">Pipeline showroom</h2></div><BarChart3 className="h-5 w-5 text-[#f36b4d]" /></div>
                <div className="mt-6 grid grid-cols-5 gap-2">{pipeline.map((stage) => <div key={stage.label} className="min-w-0"><div className={`grid h-9 place-items-center rounded-[7px] text-xs font-bold ${stage.tone}`}>{stage.count}</div><div className="mt-2 h-16 rounded-[7px] bg-[#edf5fd] p-2"><div className="h-1.5 w-4/5 rounded-full bg-[#9fc3e8]" /><div className="mt-2 h-1.5 w-3/5 rounded-full bg-[#d3e4f4]" /><div className="mt-2 h-1.5 w-2/5 rounded-full bg-[#d3e4f4]" /></div><p className="mt-2 truncate text-[9px] font-bold text-[#557090]">{stage.label}</p><p className="mt-1 text-[9px] font-semibold text-[#8aa3bd]">{stage.value}</p></div>)}</div>
                <div className="mt-7 flex items-center justify-between rounded-[10px] bg-[#f4f9ff] px-4 py-3"><span className="text-xs font-bold text-[#557090]">Valore opportunità aperte</span><strong className="text-lg tracking-[-0.04em] text-[#0b55c6]">€ 612.900</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfdff] py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={Target} label="Opportunità aperte" value="49" note="in tutti gli showroom" />
            <StatCard icon={BarChart3} label="Valore pipeline" value="€ 612k" note="aggiornato dal team" />
            <StatCard icon={Clock3} label="Prossimi passi" value="16" note="da seguire oggi" />
            <StatCard icon={UsersRound} label="Showroom collegati" value="3" note="stesso processo commerciale" />
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf7] py-20 sm:py-28" id="pipeline">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-7 border-b border-[#f1c2b6] pb-10 lg:flex-row lg:items-end"><div><span className="inline-flex rounded-full bg-[#ffdcd2] px-3 py-1.5 text-xs font-bold text-[#c34d35]">UN PROCESSO LEGGIBILE</span><h2 className="mt-6 max-w-3xl text-5xl font-bold leading-[.94] tracking-[-0.065em] text-[#102744] sm:text-7xl">Meno rincorse.<br />Più trattative seguite bene.</h2></div><p className="max-w-sm text-sm leading-6 text-[#557090]">Ogni opportunità conserva contesto, responsabile, valore e prossimo passo.</p></div>
          <div className="mt-12 overflow-x-auto rounded-[18px] border border-[#f1c2b6] bg-white p-4 shadow-[0_16px_40px_rgba(173,57,35,.08)] sm:p-7"><div className="grid min-w-[860px] grid-cols-5 gap-3">{pipeline.map((stage) => <div key={stage.label} className="rounded-[12px] bg-[#fffaf7] p-3"><div className={`flex items-center justify-between rounded-[8px] px-3 py-2 text-xs font-bold ${stage.tone}`}><span>{stage.label}</span><span>{stage.count}</span></div><div className="mt-3 grid gap-2">{[1, 2, 3].map((item) => <div key={item} className="rounded-[9px] border border-[#f1c2b6] bg-white p-3"><div className="flex items-center justify-between"><span className="h-2 w-16 rounded-full bg-[#e4b3a7]" /><span className="h-2 w-5 rounded-full bg-[#f4d8d0]" /></div><p className="mt-3 text-[10px] font-bold text-[#245b96]">{["Casa Forma", "Bianchi", "Rossi Design"][item - 1]}</p><p className="mt-2 text-[10px] font-semibold text-[#8aa3bd]">{stage.value}</p><div className="mt-3 flex items-center gap-1 text-[9px] font-bold text-[#557090]"><CircleUserRound className="h-3 w-3" /> Martina</div></div>)}</div><button type="button" className="mt-3 flex w-full items-center justify-center gap-1 rounded-[8px] border border-dashed border-[#e4b3a7] py-2 text-[10px] font-bold text-[#c34d35] hover:bg-[#fff0eb]"><Plus className="h-3 w-3" /> Aggiungi opportunità</button></div>)}</div></div>
        </div>
      </section>

      <section className="bg-[#eaf4ff] py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-start lg:gap-24">
            <div><span className="inline-flex rounded-full bg-[#dcecff] px-3 py-1.5 text-xs font-bold text-[#0b55c6]">IL CONTESTO RESTA COLLEGATO</span><h2 className="mt-6 max-w-xl text-5xl font-bold leading-[.95] tracking-[-0.065em] text-[#102744] sm:text-6xl">Non basta sapere a che punto è.</h2><p className="mt-7 max-w-lg text-base leading-7 text-[#557090]">Serve capire perché, chi deve agire e cosa può far avanzare la relazione. Totalone tiene insieme informazioni, attività e documenti.</p></div>
            <div className="rounded-[18px] border border-[#bcd7f1] bg-white p-6 sm:p-9"><div className="grid gap-3">{[["01", "Contesto cliente", "Visite, note e conversazioni restano nella stessa storia.", CircleUserRound], ["02", "Prossimo passo", "Ogni trattativa ha un’attività chiara, non una promessa nella chat.", MessageSquareText], ["03", "Valore e probabilità", "Il team legge cosa è aperto e dove vale la pena intervenire.", BarChart3], ["04", "Dal sì al preventivo", "Quando la relazione avanza, il passaggio operativo non si perde.", FileText]].map(([number, title, body, Icon]) => <div key={number as string} className="flex gap-4 border-b border-[#e4eef8] pb-5 last:border-0 last:pb-0"><span className="mt-1 text-xs font-bold text-[#1769d5]">{number as string}</span><div className="grid h-9 w-9 shrink-0 place-items-center rounded-[9px] bg-[#dcecff] text-[#1769d5]"><Icon className="h-4 w-4" /></div><div><h3 className="text-sm font-bold text-[#102744]">{title as string}</h3><p className="mt-1 text-sm leading-5 text-[#557090]">{body as string}</p></div></div>)}</div></div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfdff] py-20 sm:py-28">
        <div className="mx-auto max-w-[900px] px-5 sm:px-8 lg:px-10"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-[#0b55c6]"><Clock3 className="h-4 w-4" /> Attività recenti</div><div className="mt-7 divide-y divide-[#cfe1f4] rounded-[14px] border-y border-[#cfe1f4]">{activities.map(([time, title, body]) => <div key={title} className="flex gap-5 py-5"><span className="w-12 shrink-0 text-xs font-bold text-[#8aa3bd]">{time}</span><div><h3 className="text-sm font-bold text-[#102744]">{title}</h3><p className="mt-1 text-xs leading-5 text-[#557090]">{body}</p></div></div>)}</div></div>
      </section>

      <footer className="bg-[#082c68] py-20 text-white">
        <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-10 px-5 sm:px-8 lg:flex-row lg:items-end lg:px-10"><div><span className="inline-flex rounded-full bg-[#2b75cb] px-3 py-1.5 text-xs font-bold text-[#d5ebff]">GESTIONE TRATTATIVE</span><h2 className="mt-6 max-w-2xl text-4xl font-bold leading-[.95] tracking-[-0.06em] sm:text-6xl">Una pipeline chiara fa muovere il team.</h2><p className="mt-5 max-w-lg text-sm leading-6 text-[#d5ebff]">Scopri come Totalone può aiutarti a seguire meglio ogni opportunità.</p></div><button onClick={() => setDemoOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-[9px] bg-white px-5 py-3.5 text-sm font-bold text-[#0b55c6] hover:bg-[#eaf3ff]">Richiedi una demo <ArrowRight className="h-4 w-4" /></button></div>
      </footer>
      {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}
    </main>
  );
}