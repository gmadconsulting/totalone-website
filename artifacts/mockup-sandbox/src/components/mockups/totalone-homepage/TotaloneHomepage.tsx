import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  FileText,
  Headphones,
  Menu,
  PackageCheck,
  Route,
  Send,
  Store,
  Truck,
  UsersRound,
  X,
} from "lucide-react";

const navItems = [
  { label: "Come funziona", href: "#come-funziona" },
  { label: "Aree", href: "#aree" },
  { label: "Per chi", href: "#per-chi" },
];

const areas = [
  {
    id: "crm",
    label: "CRM",
    title: "Tutto quello che sai sul cliente, finalmente condiviso.",
    body: "Il team entra nella relazione con il contesto giusto. Senza chiedere, cercare o ricominciare da capo.",
    icon: UsersRound,
    screen: "[CRM SCREENSHOT]",
  },
  {
    id: "preventivi",
    label: "Preventivi",
    title: "Una proposta chiara accelera la decisione.",
    body: "Prezzi, revisioni e passaggi restano collegati alla stessa storia: il preventivo non vive più in un file isolato.",
    icon: FileText,
    screen: "[QUOTATION SCREENSHOT]",
  },
  {
    id: "commesse",
    label: "Commesse",
    title: "La commessa diventa il punto di riferimento di tutti.",
    body: "Persone, scadenze, forniture e decisioni in un unico luogo condiviso, anche quando il lavoro passa da showroom a showroom.",
    icon: ClipboardList,
    screen: "[PROJECT SCREENSHOT]",
  },
  {
    id: "logistica",
    label: "Logistica",
    title: "Meno rincorse. Più consegne preparate.",
    body: "La squadra sa cosa deve muoversi, quando e per quale cliente. La logistica segue la commessa invece di diventare una chat separata.",
    icon: Truck,
    screen: "[LOGISTICS SCREENSHOT]",
  },
  {
    id: "montaggi",
    label: "Montaggi",
    title: "Il giorno del montaggio inizia prima.",
    body: "Informazioni e responsabilità arrivano al team giusto, con meno sorprese da gestire all'ultimo minuto.",
    icon: PackageCheck,
    screen: "[INSTALLATION SCREENSHOT]",
  },
  {
    id: "post-vendita",
    label: "Post-vendita",
    title: "La relazione continua anche dopo la consegna.",
    body: "Segnalazioni e attività successive non si perdono nel rumore. Il cliente resta seguito con la stessa precisione dell'inizio.",
    icon: Headphones,
    screen: "[AFTER-SALES SCREENSHOT]",
  },
  {
    id: "performance",
    label: "Performance",
    title: "Vedi dove il business sta andando.",
    body: "Una lettura condivisa del lavoro aiuta a decidere con lucidità: cosa seguire, dove intervenire e quale showroom sta crescendo.",
    icon: BarChart3,
    screen: "[PERFORMANCE SCREENSHOT]",
  },
];

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#top" className={`flex items-center gap-2.5 ${dark ? "text-[#09285b]" : "text-[#f7fbff]"}`}>
      <span className={`grid h-8 w-8 place-items-center rounded-[10px] ${dark ? "bg-[#1769ff] text-[#f7fbff]" : "bg-[#f7fbff] text-[#1769ff]"}`}>
        <span className="h-3.5 w-3.5 rounded-full border-2 border-current" />
      </span>
      <span className="text-[18px] font-bold tracking-[-0.06em]">totalone</span>
    </a>
  );
}

function Button({
  children,
  onClick,
  light = false,
}: {
  children: ReactNode;
  onClick: () => void;
  light?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 rounded-[9px] px-5 py-3.5 text-[14px] font-bold transition-all duration-200 hover:-translate-y-0.5 ${
        light
          ? "bg-[#f7fbff] text-[#0a2a62] shadow-[0_10px_28px_rgba(8,40,92,.18)] hover:bg-[#dff2ff]"
          : "bg-[#1769ff] text-[#f7fbff] shadow-[0_10px_24px_rgba(23,105,255,.22)] hover:bg-[#0d55d8]"
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </button>
  );
}

function ProductPlaceholder({ label, hero = false }: { label: string; hero?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-[18px] border border-[#cbd9ed] bg-[#f7fbff] shadow-[0_20px_60px_rgba(8,40,92,.12)] ${hero ? "min-h-[410px]" : "min-h-[280px]"}`}>
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(222,241,255,.8),rgba(247,251,255,.96)_58%)]" />
      <div className="relative h-full p-4 sm:p-6">
        <div className="flex items-center justify-between border-b border-[#d6e2f1] pb-4 text-[10px] font-bold uppercase tracking-[0.13em] text-[#6f829d]">
          <span>Asset placeholder</span>
          <span className="rounded-full bg-[#e2f0ff] px-2.5 py-1 text-[#1769ff]">Replace</span>
        </div>
        <div className="mt-5 grid grid-cols-[62px_1fr] gap-3">
          <div className="space-y-2 rounded-lg bg-[#e8f2fc] p-2">
            <span className="block h-2 rounded bg-[#1769ff]/70" />
            <span className="block h-2 rounded bg-[#b9cee6]" />
            <span className="block h-2 rounded bg-[#b9cee6]" />
            <span className="block h-2 rounded bg-[#b9cee6]" />
            <span className="block h-2 rounded bg-[#b9cee6]" />
          </div>
          <div className="space-y-3">
            <div className="flex gap-2">
              <span className="h-7 flex-1 rounded bg-[#e7f1fb]" />
              <span className="h-7 w-16 rounded bg-[#d8eaff]" />
            </div>
            <div className={`grid gap-2 ${hero ? "grid-cols-3" : "grid-cols-2"}`}>
              {[1, 2, 3].map((item) => <span key={item} className="h-16 rounded-lg border border-[#d9e5f2] bg-[#f7fbff]" />)}
            </div>
            <div className="h-24 rounded-lg border border-[#d9e5f2] bg-[#f7fbff]" />
          </div>
        </div>
        <div className="absolute bottom-5 left-0 right-0 text-center text-[11px] font-bold tracking-[0.1em] text-[#6f829d]">{label}</div>
      </div>
    </div>
  );
}

function DemoModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#061d47]/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Prenota una demo">
      <div className="relative w-full max-w-lg rounded-[18px] bg-[#f7fbff] p-6 shadow-2xl sm:p-9">
        <button onClick={onClose} className="absolute right-5 top-5 rounded-full p-2 text-[#627590] hover:bg-[#e2f0ff]" aria-label="Chiudi"><X className="h-5 w-5" /></button>
        {!sent ? (
          <>
            <span className="inline-flex rounded-full bg-[#e2f0ff] px-3 py-1.5 text-xs font-bold text-[#1769ff]">Parliamo del tuo showroom</span>
            <h2 className="mt-5 max-w-sm text-4xl font-bold leading-[1.02] tracking-[-0.06em] text-[#09285b]">Partiamo da una tua commessa.</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#627590]">Raccontaci come lavorate oggi. Ti mostriamo dove Totalone può restituire tempo e controllo al tuo team.</p>
            <div className="mt-7 grid gap-3">
              <input className="rounded-[9px] border border-[#cbd9ed] bg-[#f7fbff] px-4 py-3 text-sm outline-none placeholder:text-[#91a1b6] focus:border-[#1769ff]" placeholder="Nome e cognome" />
              <input className="rounded-[9px] border border-[#cbd9ed] bg-[#f7fbff] px-4 py-3 text-sm outline-none placeholder:text-[#91a1b6] focus:border-[#1769ff]" placeholder="Email aziendale" type="email" />
              <button onClick={() => setSent(true)} className="mt-2 inline-flex items-center justify-center gap-2 rounded-[9px] bg-[#1769ff] px-5 py-3.5 text-sm font-bold text-[#f7fbff] hover:bg-[#0d55d8]">Richiedi il contatto <Send className="h-4 w-4" /></button>
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#e2f0ff] text-[#1769ff]"><Check className="h-6 w-6" /></div>
            <h2 className="mt-5 text-4xl font-bold tracking-[-0.06em] text-[#09285b]">Ricevuto.</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#627590]">Ti ricontatteremo per capire insieme da quale commessa partire.</p>
            <button onClick={onClose} className="mt-7 rounded-[9px] border border-[#1769ff] px-5 py-3 text-sm font-bold text-[#1769ff] hover:bg-[#e2f0ff]">Torna alla pagina</button>
          </div>
        )}
      </div>
    </div>
  );
}

export function TotaloneHomepage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [activeArea, setActiveArea] = useState("crm");

  return (
    <main id="top" className="min-h-[100dvh] overflow-hidden bg-[#f7fbff] text-[#09285b]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`html { scroll-behavior: smooth; }`}</style>
      <header className="absolute left-0 right-0 top-0 z-40">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => <a key={item.href} href={item.href} className="text-[13px] font-semibold text-[#dcecff] transition-colors hover:text-[#f7fbff]">{item.label}</a>)}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setDemoOpen(true)} className="hidden rounded-[8px] bg-[#f7fbff] px-4 py-2.5 text-[13px] font-bold text-[#09285b] hover:bg-[#dff2ff] sm:block">Prenota una demo</button>
            <button onClick={() => setMenuOpen((open) => !open)} className="grid h-10 w-10 place-items-center rounded-[8px] border border-[#7ba0d0] text-[#f7fbff] md:hidden" aria-label="Apri menu">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </div>
        {menuOpen && <div className="border-t border-[#4678ba] bg-[#0b2e69] px-5 py-4 md:hidden">{navItems.map((item) => <a onClick={() => setMenuOpen(false)} key={item.href} href={item.href} className="block border-b border-[#4678ba] py-3 text-sm font-semibold text-[#e7f2ff]">{item.label}</a>)}<button onClick={() => { setDemoOpen(true); setMenuOpen(false); }} className="mt-4 w-full rounded-[8px] bg-[#f7fbff] px-4 py-3 text-left text-sm font-bold text-[#09285b]">Prenota una demo <ArrowRight className="ml-2 inline h-4 w-4" /></button></div>}
      </header>

      <section className="relative overflow-hidden bg-[linear-gradient(116deg,#061e49_0%,#0b3f91_50%,#1769ff_100%)] pb-16 pt-32 text-[#f7fbff] sm:pb-24 sm:pt-40">
        <div className="absolute -right-20 top-20 h-[420px] w-[420px] rounded-full bg-[#4e9cff]/30 blur-3xl" />
        <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-10">
            <div>
              <span className="inline-flex rounded-full border border-[#80b4ee] bg-[#174e9e]/50 px-3.5 py-2 text-xs font-bold tracking-[0.08em] text-[#dff2ff]">IL SISTEMA OPERATIVO PER L'ARREDAMENTO</span>
              <h1 className="mt-7 max-w-2xl text-[clamp(3.3rem,7vw,6.8rem)] font-bold leading-[.93] tracking-[-0.075em]">Il tuo business dell’arredamento.<br /><span className="text-[#8fd1ff]">Tutto in un unico posto.</span></h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#dbeaff]">Clienti, preventivi, commesse, consegne, montaggi e performance. Totalone riunisce il lavoro del tuo showroom in un unico sistema.</p>
              <div className="mt-9 flex flex-wrap items-center gap-4"><Button onClick={() => setDemoOpen(true)} light>Prenota una demo</Button><a href="#come-funziona" className="inline-flex items-center gap-2 px-2 text-sm font-bold text-[#f7fbff] hover:text-[#8fd1ff]">Scopri come funziona <ChevronDown className="h-4 w-4" /></a></div>
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs font-semibold text-[#bdd8f6]"><span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#8fd1ff]" />Un unico modo di lavorare</span><span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#8fd1ff]" />Informazioni condivise</span><span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#8fd1ff]" />Più controllo mentre cresci</span></div>
            </div>
            <div className="lg:pl-3"><ProductPlaceholder label="[HERO SCREENSHOT]" hero /></div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d7e3f1] bg-[#f7fbff] py-12">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 px-5 sm:grid-cols-4 sm:px-8 lg:px-10">{["Lead → cliente", "Preventivo → commessa", "Consegna → montaggio", "Dati → decisioni"].map((item) => <div key={item} className="border-r border-[#d7e3f1] px-4 py-2 text-center text-xs font-bold text-[#5f7290] last:border-0 sm:px-5">{item}</div>)}</div>
      </section>

      <section className="py-24 sm:py-32" id="come-funziona">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
            <div><span className="inline-flex rounded-full bg-[#e2f0ff] px-3 py-1.5 text-xs font-bold text-[#1769ff]">IL PROBLEMA</span><h2 className="mt-6 max-w-xl text-5xl font-bold leading-[.97] tracking-[-0.065em] text-[#09285b] sm:text-6xl">La tua azienda non può dipendere dalla memoria di una persona.</h2></div>
            <div className="lg:pt-12"><p className="max-w-2xl text-xl leading-8 text-[#3f5676]">Excel per i numeri. WhatsApp per gli aggiornamenti. Email per i documenti. Carta per quello che non deve andare perso.</p><p className="mt-6 max-w-xl text-base leading-7 text-[#6d809a]">Quando le informazioni sono sparse, ogni passaggio chiede una rincorsa. Totalone porta tutto nello stesso modo di lavorare.</p><div className="mt-9 flex flex-wrap gap-2">{["Excel", "WhatsApp", "Email", "Agenda", "Memoria"].map((item) => <span key={item} className="rounded-full border border-[#cbd9ed] bg-[#f7fbff] px-3.5 py-2 text-xs font-semibold text-[#637995]">{item}</span>)}</div></div>
          </div>
        </div>
      </section>

      <section className="bg-[#e8f4ff] py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><span className="inline-flex rounded-full bg-[#f7fbff] px-3 py-1.5 text-xs font-bold text-[#1769ff]">LA TRASFORMAZIONE</span><h2 className="mt-6 max-w-3xl text-5xl font-bold leading-[.95] tracking-[-0.065em] text-[#09285b] sm:text-7xl">Una sola commessa.<br />Tutta la sua storia.</h2></div><p className="max-w-sm text-sm leading-6 text-[#607797]">Dalla prima richiesta al montaggio, ogni passaggio resta collegato e leggibile.</p></div>
          <div className="mt-14 grid gap-7 md:grid-cols-3">{[["01", "Informazioni condivise", "Il team trova quello che serve senza doverlo chiedere."], ["02", "Responsabilità chiare", "Ogni persona sa cosa deve fare e qual è il prossimo passo."], ["03", "Decisioni più veloci", "Tu guardi il business senza dover inseguire ogni dettaglio."]].map(([num, title, body]) => <div key={num} className="rounded-[16px] border border-[#c8dcef] bg-[#f7fbff] p-7 shadow-[0_12px_30px_rgba(8,40,92,.06)]"><span className="text-xs font-bold text-[#1769ff]">{num}</span><h3 className="mt-10 text-2xl font-bold tracking-[-0.04em] text-[#09285b]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#657b98]">{body}</p></div>)}</div>
        </div>
      </section>

      <section className="py-24 sm:py-32" id="aree">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-7 border-b border-[#d7e3f1] pb-10 lg:flex-row lg:items-end lg:justify-between"><div><span className="inline-flex rounded-full bg-[#e2f0ff] px-3 py-1.5 text-xs font-bold text-[#1769ff]">TUTTO IL FLUSSO</span><h2 className="mt-6 max-w-3xl text-5xl font-bold leading-[.95] tracking-[-0.065em] text-[#09285b] sm:text-7xl">Un modo condiviso di lavorare.</h2></div><p className="max-w-sm text-sm leading-6 text-[#647a97]">Non moduli da compilare. Passaggi che si parlano e fanno avanzare il lavoro.</p></div>
          <div className="mt-12 grid gap-10 lg:grid-cols-[.38fr_.62fr] lg:gap-16">
            <div className="lg:sticky lg:top-8 lg:self-start"><div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-[#7b8ea8]"><Route className="h-4 w-4 text-[#1769ff]" /> Seleziona una fase</div><div className="divide-y divide-[#d7e3f1] rounded-[12px] border-y border-[#d7e3f1]">{areas.map((area) => <button key={area.id} onClick={() => setActiveArea(area.id)} className={`flex w-full items-center justify-between py-4 text-left text-sm transition-colors ${activeArea === area.id ? "font-bold text-[#1769ff]" : "font-semibold text-[#6d809a] hover:text-[#09285b]"}`}><span>{area.label}</span><ChevronRight className={`h-4 w-4 transition-transform ${activeArea === area.id ? "translate-x-1" : ""}`} /></button>)}</div></div>
            <div>{areas.map((area) => { const Icon = area.icon; return activeArea === area.id ? <div key={area.id} className="animate-[fadeIn_.3s_ease-out]"><div className="mb-6 grid h-12 w-12 place-items-center rounded-[12px] bg-[#e2f0ff] text-[#1769ff]"><Icon className="h-5 w-5" /></div><p className="text-xs font-bold uppercase tracking-[0.1em] text-[#1769ff]">{area.label}</p><h3 className="mt-4 max-w-2xl text-4xl font-bold leading-[1] tracking-[-0.06em] text-[#09285b] sm:text-5xl">{area.title}</h3><p className="mt-5 max-w-xl text-base leading-7 text-[#657b98]">{area.body}</p><div className="mt-9"><ProductPlaceholder label={area.screen} /></div></div> : null; })}</div>
          </div>
        </div>
      </section>

      <section className="bg-[#09285b] py-24 text-[#f7fbff] sm:py-32" id="per-chi">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10"><div className="grid gap-10 lg:grid-cols-[1fr_.7fr] lg:items-end"><div><span className="inline-flex rounded-full bg-[#1d4c96] px-3 py-1.5 text-xs font-bold text-[#8fd1ff]">CRESCERE CON ORDINE</span><h2 className="mt-6 max-w-4xl text-5xl font-bold leading-[.94] tracking-[-0.065em] sm:text-7xl">Funziona oggi.<br /><span className="text-[#8fd1ff]">Continua a funzionare quando cresci.</span></h2></div><p className="max-w-sm text-base leading-7 text-[#c1d4ed]">Da uno showroom a una rete retail: più persone, più punti vendita, lo stesso modo di lavorare.</p></div><div className="mt-14 grid gap-4 md:grid-cols-3">{[["01", "Uno showroom", "Il team ha un linguaggio comune e il titolare torna a vedere il quadro intero."], ["02", "Più responsabilità", "Puoi delegare il quotidiano senza lasciare il controllo delle decisioni importanti."], ["03", "Una rete", "Ogni punto vendita lavora nel proprio contesto, dentro un modo di fare condiviso."]].map(([num, title, body]) => <div key={num} className="rounded-[16px] border border-[#2f5792] bg-[#103571] p-7"><span className="text-xs font-bold text-[#8fd1ff]">{num}</span><h3 className="mt-12 text-2xl font-bold tracking-[-0.04em]">{title}</h3><p className="mt-4 text-sm leading-6 text-[#c1d4ed]">{body}</p></div>)}</div></div>
      </section>

      <section className="py-24 sm:py-32"><div className="mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-10"><div><span className="inline-flex rounded-full bg-[#e2f0ff] px-3 py-1.5 text-xs font-bold text-[#1769ff]">NATO PER L'ARREDAMENTO</span><h2 className="mt-6 max-w-xl text-5xl font-bold leading-[.94] tracking-[-0.065em] text-[#09285b] sm:text-6xl">Non adattato all’arredamento.<br /><span className="text-[#1769ff]">Nato per l’arredamento.</span></h2><p className="mt-7 max-w-lg text-base leading-7 text-[#657b98]">Conosciamo la differenza tra un ordine e una commessa. Tra consegnare un prodotto e montare una casa.</p><Button onClick={() => setDemoOpen(true)}>Partiamo da una tua commessa</Button></div><ProductPlaceholder label="[PERFORMANCE SCREENSHOT]" /></div></section>

      <footer className="bg-[#e8f4ff] py-16 sm:py-20"><div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10"><div className="flex flex-col justify-between gap-10 rounded-[22px] bg-[linear-gradient(120deg,#0b3f91,#1769ff)] p-7 text-[#f7fbff] sm:p-12 lg:flex-row lg:items-end"><div><Logo /><h2 className="mt-10 max-w-2xl text-4xl font-bold leading-[.96] tracking-[-0.06em] sm:text-6xl">Partiamo da una tua commessa.</h2><p className="mt-5 max-w-lg text-sm leading-6 text-[#dbeaff]">Non una demo generica. Vediamo insieme come Totalone può inserirsi nel modo in cui lavori oggi.</p></div><Button onClick={() => setDemoOpen(true)} light>Prenota una demo</Button></div><div className="flex flex-col justify-between gap-4 pt-8 text-xs font-semibold text-[#7087a5] sm:flex-row"><span>© Totalone — il sistema operativo per l'arredamento</span><span>Un modo più chiaro di lavorare insieme.</span></div></div></footer>
      {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}
    </main>
  );
}