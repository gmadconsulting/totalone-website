import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  ClipboardList,
  Clock3,
  FileText,
  Headphones,
  Layers3,
  Menu,
  PackageCheck,
  Route,
  Send,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
  UsersRound,
  X,
} from "lucide-react";

const sections = [
  { id: "come-funziona", label: "Come funziona" },
  { id: "aree", label: "Aree" },
  { id: "per-chi", label: "Per chi" },
];

const areas = [
  {
    id: "crm",
    label: "01 / CRM",
    title: "Il cliente non resta in attesa tra un messaggio e l'altro.",
    copy: "Ogni contatto, esigenza e prossima azione è visibile a chi deve occuparsene. Il team entra nella relazione con il contesto giusto, senza chiedere di ricominciare da capo.",
    icon: UsersRound,
    accent: "bg-[#e8d6c6]",
    screen: "[CRM SCREENSHOT]",
  },
  {
    id: "preventivi",
    label: "02 / Preventivi",
    title: "Una proposta chiara accelera la decisione.",
    copy: "Dal primo desiderio alla proposta: prezzi, revisioni e passaggi restano collegati alla stessa storia. Così il preventivo non vive più in un file isolato.",
    icon: FileText,
    accent: "bg-[#d6e0d4]",
    screen: "[QUOTATION SCREENSHOT]",
  },
  {
    id: "commesse",
    label: "03 / Commesse",
    title: "La commessa diventa il punto di riferimento di tutti.",
    copy: "Persone, scadenze, forniture e decisioni in un unico luogo condiviso. Il lavoro procede con responsabilità chiare, anche quando passa da showroom a showroom.",
    icon: ClipboardList,
    accent: "bg-[#e1d9c8]",
    screen: "[PROJECT SCREENSHOT]",
  },
  {
    id: "logistica",
    label: "04 / Logistica",
    title: "Meno rincorse. Più consegne che arrivano preparate.",
    copy: "La squadra sa cosa deve muoversi, quando e per quale cliente. La logistica segue la commessa invece di diventare l'ennesima conversazione separata.",
    icon: Truck,
    accent: "bg-[#d8ddd8]",
    screen: "[LOGISTICS SCREENSHOT]",
  },
  {
    id: "montaggi",
    label: "05 / Montaggi",
    title: "Il giorno del montaggio inizia prima, sulla stessa pagina.",
    copy: "Informazioni e responsabilità arrivano al team giusto. Ogni installazione ha un contesto, un prossimo passo e meno sorprese da gestire all'ultimo minuto.",
    icon: PackageCheck,
    accent: "bg-[#ead8c1]",
    screen: "[INSTALLATION SCREENSHOT]",
  },
  {
    id: "post-vendita",
    label: "06 / Post-vendita",
    title: "La relazione continua anche dopo la consegna.",
    copy: "Segnalazioni e attività successive non si perdono nel rumore. Il team può prendersi cura del cliente con la stessa precisione dell'inizio.",
    icon: Headphones,
    accent: "bg-[#d8e2df]",
    screen: "[AFTER-SALES SCREENSHOT]",
  },
  {
    id: "performance",
    label: "07 / Performance",
    title: "Vedi dove il business sta andando, mentre succede.",
    copy: "Una lettura condivisa del lavoro aiuta a decidere con più lucidità: cosa seguire, dove intervenire, quale showroom sta crescendo.",
    icon: BarChart3,
    accent: "bg-[#e2d5dc]",
    screen: "[PERFORMANCE SCREENSHOT]",
  },
];

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.visible = "true";
          observer.unobserve(node);
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} data-reveal="true" className={`transition-all duration-700 ease-out ${className}`}>
      {children}
    </div>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className={`flex items-center gap-2.5 ${light ? "text-[#f5f1e8]" : "text-[#17261e]"}`}>
      <span className="grid h-8 w-8 place-items-center rounded-full border border-current">
        <span className="h-3.5 w-3.5 rounded-full border-[1.5px] border-current" />
      </span>
      <span className="font-['DM_Sans'] text-[17px] font-semibold tracking-[-0.04em]">totalone</span>
    </a>
  );
}

function Placeholder({
  label,
  tone = "light",
  compact = false,
}: {
  label: string;
  tone?: "light" | "dark";
  compact?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden border ${
        tone === "dark" ? "border-[#3b5048] bg-[#23372e]" : "border-[#c6c7bc] bg-[#ecebe3]"
      } ${compact ? "min-h-[154px]" : "min-h-[310px]"} p-4 sm:p-6`}
    >
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(135deg, transparent 48%, rgba(42,55,46,.12) 49%, transparent 50%)", backgroundSize: "18px 18px" }} />
      <div className={`relative flex h-full flex-col justify-between ${tone === "dark" ? "text-[#d8e4db]" : "text-[#687168]"}`}>
        <div className="flex items-center justify-between border-b border-current/20 pb-3 font-['DM_Sans'] text-[10px] font-semibold tracking-[0.16em]">
          <span>ASSET PLACEHOLDER</span>
          <span className="rounded-full border border-current/30 px-2 py-1">REPLACE</span>
        </div>
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="text-center">
            <span className="mb-3 inline-block h-8 w-8 rounded-full border border-current/50 p-2">
              <span className="block h-full w-full rounded-full border border-current/50" />
            </span>
            <p className="font-['DM_Sans'] text-xs font-medium tracking-[0.12em]">{label}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 font-['DM_Sans'] text-[10px] tracking-[0.08em] opacity-70">
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          <span>STRUTTURA PRONTA PER IL TUO ASSET</span>
        </div>
      </div>
    </div>
  );
}

function ArrowLink({ children, href = "#aree" }: { children: ReactNode; href?: string }) {
  return (
    <a href={href} className="group inline-flex items-center gap-2 font-['DM_Sans'] text-sm font-semibold text-[#b85c3b] transition-colors hover:text-[#173c30]">
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function DemoModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#17261e]/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Prenota una demo">
      <div className="relative w-full max-w-lg border border-[#bdc5b8] bg-[#f5f1e8] p-6 shadow-2xl sm:p-9">
        <button onClick={onClose} className="absolute right-5 top-5 rounded-full p-2 text-[#536158] transition-colors hover:bg-[#e4e4d9]" aria-label="Chiudi">
          <X className="h-5 w-5" />
        </button>
        {!sent ? (
          <>
            <p className="mb-4 font-['DM_Sans'] text-xs font-semibold uppercase tracking-[0.18em] text-[#b85c3b]">Partiamo da una tua commessa</p>
            <h2 className="max-w-sm font-['Playfair_Display'] text-4xl leading-[1.03] tracking-[-0.05em] text-[#173c30]">Facciamo ordine, insieme.</h2>
            <p className="mt-4 max-w-md font-['DM_Sans'] text-sm leading-6 text-[#536158]">Raccontaci come lavorate oggi. Ti mostriamo dove Totalone può restituire tempo e controllo al tuo team.</p>
            <div className="mt-7 grid gap-3">
              <input className="border border-[#c6c7bc] bg-transparent px-4 py-3 font-['DM_Sans'] text-sm outline-none transition-colors placeholder:text-[#899188] focus:border-[#b85c3b]" placeholder="Nome e cognome" />
              <input className="border border-[#c6c7bc] bg-transparent px-4 py-3 font-['DM_Sans'] text-sm outline-none transition-colors placeholder:text-[#899188] focus:border-[#b85c3b]" placeholder="Email aziendale" type="email" />
              <button onClick={() => setSent(true)} className="mt-2 flex items-center justify-center gap-2 bg-[#b85c3b] px-5 py-3.5 font-['DM_Sans'] text-sm font-semibold text-[#fff8ef] transition-colors hover:bg-[#93462f]">
                Richiedi il contatto <Send className="h-4 w-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <CircleCheck className="mx-auto h-12 w-12 text-[#b85c3b]" />
            <h2 className="mt-5 font-['Playfair_Display'] text-4xl tracking-[-0.05em] text-[#173c30]">Ricevuto.</h2>
            <p className="mx-auto mt-3 max-w-sm font-['DM_Sans'] text-sm leading-6 text-[#536158]">Ti ricontatteremo per capire insieme da quale commessa partire.</p>
            <button onClick={onClose} className="mt-7 border border-[#173c30] px-5 py-3 font-['DM_Sans'] text-sm font-semibold text-[#173c30] transition-colors hover:bg-[#173c30] hover:text-[#f5f1e8]">Torna alla pagina</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Step({ number, title, copy, icon: Icon }: { number: string; title: string; copy: string; icon: typeof Route }) {
  return (
    <div className="relative border-l border-[#b9c0b5] pb-10 pl-7 last:pb-0">
      <span className="absolute -left-[7px] top-0 h-3 w-3 rounded-full border-2 border-[#f5f1e8] bg-[#b85c3b]" />
      <div className="flex items-start gap-4">
        <span className="font-['DM_Sans'] text-xs font-semibold tracking-[0.16em] text-[#b85c3b]">{number}</span>
        <Icon className="h-5 w-5 text-[#173c30]" strokeWidth={1.5} />
      </div>
      <h3 className="mt-3 font-['Playfair_Display'] text-2xl tracking-[-0.04em] text-[#173c30]">{title}</h3>
      <p className="mt-2 max-w-sm font-['DM_Sans'] text-sm leading-6 text-[#637066]">{copy}</p>
    </div>
  );
}

export function TotaloneHomepage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [activeArea, setActiveArea] = useState("crm");

  return (
    <main id="top" className="min-h-[100dvh] overflow-hidden bg-[#f5f1e8] text-[#173c30] selection:bg-[#d5b39c] selection:text-[#173c30]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        [data-reveal="true"] { opacity: 0; transform: translateY(24px); }
        [data-reveal="true"][data-visible="true"] { opacity: 1; transform: translateY(0); }
        html { scroll-behavior: smooth; }
      `}</style>
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-[#d9d8cc]/80 bg-[#f5f1e8]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            {sections.map((section) => <a key={section.id} href={`#${section.id}`} className="font-['DM_Sans'] text-[13px] font-medium text-[#5f6c62] transition-colors hover:text-[#b85c3b]">{section.label}</a>)}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setDemoOpen(true)} className="hidden border border-[#173c30] px-4 py-2.5 font-['DM_Sans'] text-[13px] font-semibold text-[#173c30] transition-colors hover:bg-[#173c30] hover:text-[#f5f1e8] sm:block">Prenota una demo</button>
            <button onClick={() => setMenuOpen((open) => !open)} className="grid h-10 w-10 place-items-center border border-[#c6c7bc] md:hidden" aria-label="Apri menu">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </div>
        {menuOpen && <div className="border-t border-[#d9d8cc] bg-[#f5f1e8] px-5 py-4 md:hidden">{sections.map((section) => <a onClick={() => setMenuOpen(false)} key={section.id} href={`#${section.id}`} className="block border-b border-[#d9d8cc] py-3 font-['DM_Sans'] text-sm text-[#536158]">{section.label}</a>)}<button onClick={() => { setDemoOpen(true); setMenuOpen(false); }} className="mt-4 w-full bg-[#b85c3b] px-4 py-3 text-left font-['DM_Sans'] text-sm font-semibold text-[#fff8ef]">Prenota una demo <ArrowRight className="ml-2 inline h-4 w-4" /></button></div>}
      </header>

      <section className="relative mx-auto max-w-[1380px] px-5 pb-20 pt-36 sm:px-8 sm:pb-28 lg:px-12 lg:pt-48">
        <div className="grid items-end gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <Reveal>
            <p className="mb-7 flex items-center gap-3 font-['DM_Sans'] text-xs font-semibold uppercase tracking-[0.2em] text-[#b85c3b]"><span className="h-px w-8 bg-[#b85c3b]" />Il sistema operativo per l'arredamento</p>
            <h1 className="max-w-4xl font-['Playfair_Display'] text-[clamp(3.6rem,8vw,8rem)] leading-[.88] tracking-[-0.07em] text-[#173c30]">Il tuo business dell’arredamento.<br /><em className="font-normal text-[#b85c3b]">Tutto in un unico posto.</em></h1>
            <p className="mt-8 max-w-xl font-['DM_Sans'] text-lg leading-8 text-[#536158]">Totalone dà a showroom, rivenditori e reti multi-store un modo condiviso di lavorare: dal primo contatto al post-vendita.</p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <button onClick={() => setDemoOpen(true)} className="group inline-flex items-center gap-3 bg-[#b85c3b] px-6 py-4 font-['DM_Sans'] text-sm font-semibold text-[#fff8ef] transition-all hover:bg-[#93462f] hover:pr-5">Prenota una demo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button>
              <a href="#come-funziona" className="group inline-flex items-center gap-2 font-['DM_Sans'] text-sm font-semibold text-[#173c30]">Scopri come funziona <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" /></a>
            </div>
          </Reveal>
          <Reveal className="lg:pb-4">
            <Placeholder label="[HERO SCREENSHOT]" tone="dark" />
            <div className="mt-4 flex items-center justify-between font-['DM_Sans'] text-[11px] uppercase tracking-[0.12em] text-[#718078]"><span>Un unico punto di verità</span><span>01 — 07</span></div>
          </Reveal>
        </div>
        <div className="mt-20 grid grid-cols-2 gap-px border-y border-[#d0d2c7] bg-[#d0d2c7] sm:grid-cols-4">
          {["Lead → cliente", "Preventivo → commessa", "Consegna → montaggio", "Dati → decisioni"].map((item) => <div key={item} className="bg-[#f5f1e8] px-3 py-5 font-['DM_Sans'] text-xs font-semibold tracking-[0.05em] text-[#536158] sm:px-5">{item}<span className="mt-2 block text-[#b85c3b]">/</span></div>)}
        </div>
      </section>

      <section className="bg-[#e6e4d9] py-24 sm:py-32" id="problema">
        <div className="mx-auto grid max-w-[1380px] gap-14 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-28 lg:px-12">
          <Reveal><p className="font-['DM_Sans'] text-xs font-semibold uppercase tracking-[0.18em] text-[#b85c3b]">Il lavoro com'è oggi</p><h2 className="mt-5 max-w-lg font-['Playfair_Display'] text-5xl leading-[.97] tracking-[-0.06em] text-[#173c30] sm:text-6xl">La commessa non dovrebbe vivere in cinque posti diversi.</h2></Reveal>
          <Reveal className="lg:pt-12"><p className="max-w-2xl font-['DM_Sans'] text-xl leading-8 text-[#536158]">Excel per i numeri. WhatsApp per gli aggiornamenti. Email per i documenti. Carta per quello che non deve andare perso. E, alla fine, la memoria di una persona.</p><p className="mt-7 max-w-xl font-['DM_Sans'] text-base leading-7 text-[#718078]">Quando le informazioni sono sparse, ogni passaggio chiede una rincorsa. Chi entra dopo non vede tutto. Chi deve decidere aspetta. E il cliente percepisce il disordine prima ancora che venga detto.</p><div className="mt-10 flex flex-wrap gap-2">{["Excel", "WhatsApp", "Email", "Carta", "Memoria"].map((item) => <span key={item} className="border border-[#b9c0b5] px-3 py-2 font-['DM_Sans'] text-xs text-[#657168]">{item}</span>)}</div></Reveal>
        </div>
      </section>

      <section className="py-24 sm:py-32" id="come-funziona">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
          <Reveal><div className="flex flex-col justify-between gap-7 border-b border-[#c9cbc0] pb-9 sm:flex-row sm:items-end"><div><p className="font-['DM_Sans'] text-xs font-semibold uppercase tracking-[0.18em] text-[#b85c3b]">La trasformazione</p><h2 className="mt-5 max-w-3xl font-['Playfair_Display'] text-5xl leading-[.95] tracking-[-0.06em] text-[#173c30] sm:text-7xl">Tutti lavorano sulla stessa storia.</h2></div><p className="max-w-xs font-['DM_Sans'] text-sm leading-6 text-[#637066]">Un modo di lavorare condiviso, con un responsabile chiaro per ogni prossimo passo.</p></div></Reveal>
          <div className="mt-14 grid gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-24">
            <Reveal><div className="border border-[#c6c7bc] bg-[#ecebe3] p-5 sm:p-8"><div className="flex items-center justify-between border-b border-[#c6c7bc] pb-4"><span className="font-['DM_Sans'] text-xs font-semibold uppercase tracking-[0.14em] text-[#718078]">Una commessa, in chiaro</span><span className="rounded-full bg-[#d6e0d4] px-2.5 py-1 font-['DM_Sans'] text-[10px] font-semibold text-[#315241]">ATTIVA</span></div><div className="mt-7 grid gap-3">{[["Cliente", "Elena e Marco Riva"], ["Prossimo passo", "Conferma misure cucina"], ["Responsabile", "Marta — showroom Milano"], ["Consegna prevista", "18 ottobre 2024"]].map(([label, value], index) => <div key={label} className={`flex items-center justify-between gap-3 border-b border-[#d4d5ca] pb-4 ${index ? "pt-2" : ""}`}><span className="font-['DM_Sans'] text-xs text-[#718078]">{label}</span><span className="text-right font-['DM_Sans'] text-sm font-semibold text-[#173c30]">{value}</span></div>)}</div><div className="mt-7 flex items-center gap-3 border border-[#c6c7bc] bg-[#f5f1e8] p-3"><Clock3 className="h-4 w-4 text-[#b85c3b]" /><span className="font-['DM_Sans'] text-xs text-[#536158]">Il team sa cosa succede adesso.</span></div></div></Reveal>
            <Reveal className="lg:pt-8"><div className="space-y-8"><Step number="01" title="Un'informazione condivisa" copy="La storia del cliente e della commessa è accessibile a chi ne ha bisogno, senza passaggi invisibili." icon={Layers3} /><Step number="02" title="Una responsabilità leggibile" copy="Ogni attività ha un proprietario e un prossimo passo. Delegare non significa perdere il filo." icon={ShieldCheck} /><Step number="03" title="Una decisione più veloce" copy="Quando il contesto è completo, il team può agire. E tu puoi guardare il business senza inseguirlo." icon={Sparkles} /></div></Reveal>
          </div>
        </div>
      </section>

      <section className="bg-[#173c30] py-24 text-[#f5f1e8] sm:py-32" id="per-chi">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
          <Reveal><div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end"><div><p className="font-['DM_Sans'] text-xs font-semibold uppercase tracking-[0.18em] text-[#d0a285]">Nato per la crescita reale</p><h2 className="mt-5 max-w-4xl font-['Playfair_Display'] text-5xl leading-[.94] tracking-[-0.06em] sm:text-7xl">Da uno showroom a una rete retail, senza moltiplicare il caos.</h2></div><p className="max-w-sm font-['DM_Sans'] text-base leading-7 text-[#b9c8bc]">Totalone tiene insieme il modo di lavorare mentre il tuo business cambia scala: più persone, più punti vendita, la stessa visione.</p></div></Reveal>
          <div className="mt-16 grid gap-px border border-[#3b5048] bg-[#3b5048] sm:grid-cols-3">{[["01", "Uno showroom", "Il team ha un linguaggio comune e il titolare torna a vedere il quadro intero."], ["02", "Più responsabilità", "Puoi delegare il quotidiano senza lasciare il controllo delle decisioni importanti."], ["03", "Una rete", "Ogni punto vendita lavora nel proprio contesto, dentro un modo di fare condiviso."]].map(([num, title, copy]) => <div key={num} className="bg-[#173c30] p-6 sm:p-8"><span className="font-['DM_Sans'] text-xs font-semibold tracking-[0.16em] text-[#d0a285]">{num}</span><h3 className="mt-12 font-['Playfair_Display'] text-3xl tracking-[-0.04em]">{title}</h3><p className="mt-4 font-['DM_Sans'] text-sm leading-6 text-[#b9c8bc]">{copy}</p></div>)}</div>
        </div>
      </section>

      <section className="py-24 sm:py-32" id="aree">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
          <Reveal><div className="flex flex-col gap-7 border-b border-[#c9cbc0] pb-9 lg:flex-row lg:items-end lg:justify-between"><div><p className="font-['DM_Sans'] text-xs font-semibold uppercase tracking-[0.18em] text-[#b85c3b]">Il flusso completo</p><h2 className="mt-5 max-w-3xl font-['Playfair_Display'] text-5xl leading-[.95] tracking-[-0.06em] sm:text-7xl">Una commessa. Dall’inizio alla relazione che resta.</h2></div><p className="max-w-sm font-['DM_Sans'] text-sm leading-6 text-[#637066]">Non moduli da compilare. Passaggi che si parlano e fanno avanzare il lavoro.</p></div></Reveal>
          <div className="mt-12 grid gap-10 lg:grid-cols-[.42fr_.58fr] lg:gap-16">
            <Reveal><div className="sticky top-24"><div className="mb-7 flex items-center gap-3 font-['DM_Sans'] text-xs uppercase tracking-[0.14em] text-[#718078]"><Route className="h-4 w-4 text-[#b85c3b]" /> Seleziona una fase</div><div className="divide-y divide-[#d1d2c8] border-y border-[#d1d2c8]">{areas.map((area) => <button key={area.id} onClick={() => setActiveArea(area.id)} className={`flex w-full items-center justify-between py-4 text-left font-['DM_Sans'] text-sm transition-colors ${activeArea === area.id ? "font-semibold text-[#b85c3b]" : "text-[#718078] hover:text-[#173c30]"}`}><span>{area.label}</span><ChevronRight className={`h-4 w-4 transition-transform ${activeArea === area.id ? "translate-x-1" : ""}`} /></button>)}</div><p className="mt-7 font-['DM_Sans'] text-xs leading-5 text-[#899188]">Ogni area nasce dal lavoro vero di chi vende, progetta, consegna e si prende cura della casa.</p></div></Reveal>
            <Reveal><div className="min-h-[540px]">{areas.map((area) => { const Icon = area.icon; return <div key={area.id} className={`${activeArea === area.id ? "block animate-[fadeIn_.35s_ease-out]" : "hidden"}`}><div className={`mb-8 flex h-12 w-12 items-center justify-center ${area.accent}`}><Icon className="h-5 w-5 text-[#173c30]" strokeWidth={1.6} /></div><p className="font-['DM_Sans'] text-xs font-semibold uppercase tracking-[0.16em] text-[#b85c3b]">{area.label}</p><h3 className="mt-4 max-w-2xl font-['Playfair_Display'] text-4xl leading-[1] tracking-[-0.05em] text-[#173c30] sm:text-5xl">{area.title}</h3><p className="mt-5 max-w-xl font-['DM_Sans'] text-base leading-7 text-[#637066]">{area.copy}</p><div className="mt-10"><Placeholder label={area.screen} tone="light" compact /></div></div>; })}</div></Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-[#c9cbc0] bg-[#ebe8df] py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1380px] gap-14 px-5 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:gap-28 lg:px-12">
          <Reveal><p className="font-['DM_Sans'] text-xs font-semibold uppercase tracking-[0.18em] text-[#b85c3b]">La differenza</p><h2 className="mt-5 max-w-xl font-['Playfair_Display'] text-5xl leading-[.92] tracking-[-0.06em] text-[#173c30] sm:text-7xl">Non adattato all’arredamento.<br /><em className="font-normal text-[#b85c3b]">Nato per l’arredamento.</em></h2></Reveal>
          <Reveal className="lg:pt-10"><p className="max-w-2xl font-['DM_Sans'] text-xl leading-8 text-[#536158]">Conosciamo la differenza tra un ordine e una commessa. Tra consegnare un prodotto e montare una casa. Tra chiudere una vendita e costruire una relazione.</p><div className="mt-12 grid gap-7 border-t border-[#c9cbc0] pt-7 sm:grid-cols-2"><div><Store className="h-5 w-5 text-[#b85c3b]" /><h3 className="mt-4 font-['Playfair_Display'] text-2xl tracking-[-0.04em] text-[#173c30]">Il tuo linguaggio</h3><p className="mt-2 font-['DM_Sans'] text-sm leading-6 text-[#637066]">Le aree seguono il modo in cui il lavoro accade davvero in showroom.</p></div><div><Check className="h-5 w-5 text-[#b85c3b]" /><h3 className="mt-4 font-['Playfair_Display'] text-2xl tracking-[-0.04em] text-[#173c30]">La tua gradualità</h3><p className="mt-2 font-['DM_Sans'] text-sm leading-6 text-[#637066]">Si parte da ciò che oggi pesa di più. Il resto può entrare dopo, con ordine.</p></div></div></Reveal>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
          <Reveal><div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end"><div><p className="font-['DM_Sans'] text-xs font-semibold uppercase tracking-[0.18em] text-[#b85c3b]">Un passo alla volta</p><h2 className="mt-5 max-w-3xl font-['Playfair_Display'] text-5xl leading-[.95] tracking-[-0.06em] text-[#173c30] sm:text-7xl">Non devi cambiare tutto domani.</h2></div><p className="max-w-sm font-['DM_Sans'] text-base leading-7 text-[#637066]">L'onboarding parte dal tuo lavoro, dalle persone che lo conoscono e da una commessa concreta. Il sistema cresce con voi.</p></div></Reveal>
          <Reveal><div className="mt-14 grid gap-px border border-[#c9cbc0] bg-[#c9cbc0] md:grid-cols-3">{[["01", "Guardiamo", "Partiamo da una tua commessa e ricostruiamo insieme il percorso, senza teoria superflua."], ["02", "Impostiamo", "Diamo al team un modo semplice per iniziare, con informazioni e responsabilità al posto giusto."], ["03", "Facciamo crescere", "Quando il primo flusso è chiaro, aggiungiamo il passo successivo. Senza strappi."]].map(([num, title, copy]) => <div key={num} className="bg-[#f5f1e8] p-7 sm:p-9"><span className="font-['DM_Sans'] text-xs font-semibold tracking-[0.16em] text-[#b85c3b]">{num}</span><h3 className="mt-10 font-['Playfair_Display'] text-3xl tracking-[-0.04em] text-[#173c30]">{title}</h3><p className="mt-4 font-['DM_Sans'] text-sm leading-6 text-[#637066]">{copy}</p></div>)}</div></Reveal>
        </div>
      </section>

      <section className="bg-[#d9e2d9] py-24 sm:py-32">
        <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
          <Reveal><div className="grid gap-12 lg:grid-cols-[1fr_.95fr] lg:items-center"><div><p className="font-['DM_Sans'] text-xs font-semibold uppercase tracking-[0.18em] text-[#b85c3b]">Il punto di vista che serve</p><h2 className="mt-5 max-w-2xl font-['Playfair_Display'] text-5xl leading-[.93] tracking-[-0.06em] text-[#173c30] sm:text-7xl">Più tempo per decidere.<br />Meno tempo per cercare.</h2><p className="mt-7 max-w-lg font-['DM_Sans'] text-base leading-7 text-[#536158]">Quando il lavoro è leggibile, anche la crescita diventa una cosa concreta. Non una sensazione a fine giornata.</p><button onClick={() => setDemoOpen(true)} className="mt-8 inline-flex items-center gap-3 border border-[#173c30] px-6 py-4 font-['DM_Sans'] text-sm font-semibold text-[#173c30] transition-colors hover:bg-[#173c30] hover:text-[#f5f1e8]">Partiamo da una tua commessa <ArrowRight className="h-4 w-4" /></button></div><Placeholder label="[PERFORMANCE SCREENSHOT]" tone="light" /></div></Reveal>
        </div>
      </section>

      <footer className="bg-[#173c30] px-5 py-16 text-[#f5f1e8] sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[1380px]"><div className="grid gap-12 border-b border-[#3b5048] pb-14 lg:grid-cols-[1fr_.6fr]"><div><Logo light /><h2 className="mt-12 max-w-3xl font-['Playfair_Display'] text-5xl leading-[.94] tracking-[-0.06em] sm:text-7xl">Il prossimo passo<br /><em className="font-normal text-[#d0a285]">è una commessa reale.</em></h2></div><div className="lg:pt-1"><p className="max-w-sm font-['DM_Sans'] text-base leading-7 text-[#b9c8bc]">Portaci dentro il tuo modo di lavorare. Ti faremo vedere come Totalone può diventare il modo condiviso con cui farlo meglio.</p><button onClick={() => setDemoOpen(true)} className="mt-8 inline-flex items-center gap-3 bg-[#b85c3b] px-6 py-4 font-['DM_Sans'] text-sm font-semibold text-[#fff8ef] transition-colors hover:bg-[#d07552]">Prenota una demo <ArrowRight className="h-4 w-4" /></button></div></div><div className="flex flex-col justify-between gap-5 pt-6 font-['DM_Sans'] text-xs text-[#8fa198] sm:flex-row"><span>© Totalone — il sistema operativo per l'arredamento</span><span>Un modo più chiaro di lavorare insieme.</span></div></div>
      </footer>
      {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}
    </main>
  );
}