import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  FileText,
  Handshake,
  Headphones,
  ListChecks,
  Menu,
  PackageCheck,
  Route,
  Send,
  Store,
  Truck,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";

const navItems = [
  { label: "Soluzioni", href: "/soluzioni/negozi-showroom-arredamento/" },
  { label: "Perché Totalone", href: "/__mockup/preview/totalone-perche/PercheTotalonePage" },
  { label: "Risorse", href: "/__mockup/preview/totalone-risorse/RisorseArchitecturePage" },
  { label: "Prezzi", href: "/__mockup/preview/totalone-prezzi/TotalonePrezzi" },
];
const productGroups = [
  { label: "VENDITE", links: [["CRM", "/__mockup/preview/totalone-crm/CrmProductPage"], ["Gestione trattative", "/__mockup/preview/totalone-trattative/GestioneTrattative"], ["Preventivi", "/__mockup/preview/totalone-preventivi/PreventiviProductPage"]] },
  { label: "OPERATIVITÀ", links: [["Gestione progetti", "/__mockup/preview/totalone-progetti/ProgettiProductPage"], ["Gestione commesse", "/__mockup/preview/totalone-commesse/CommesseProductPage"], ["Magazzino e logistica", "/__mockup/preview/totalone-magazzino/MagazzinoProductPage"], ["Montaggi", "/__mockup/preview/totalone-montaggi/MontaggiProductPage"], ["Assistenza e post-vendita", "/__mockup/preview/totalone-assistenza/AssistenzaPostVenditaProductPage"]] },
  { label: "CONTROLLO", links: [["Controllo e performance", "/controllo-gestione-arredamento/"]] },
];

type Area = {
  id: string;
  label: string;
  title: string;
  body: string;
  icon: LucideIcon;
};

const areas: Area[] = [
  {
    id: "crm",
    label: "CRM",
    title: "Tutto quello che sai sul cliente, finalmente condiviso.",
    body: "Il team entra nella relazione con il contesto giusto. Senza chiedere, cercare o ricominciare da capo.",
    icon: UsersRound,
  },
  {
    id: "trattative",
    label: "Gestione trattative",
    title: "Ogni trattativa ha un prossimo passo chiaro.",
    body: "Segui opportunità, attività e decisioni senza perdere il filo: il team sa cosa è successo, cosa manca e chi deve muoversi.",
    icon: Handshake,
  },
  {
    id: "preventivi",
    label: "Preventivi",
    title: "Una proposta chiara accelera la decisione.",
    body: "Versioni, revisioni e passaggi restano collegati alla stessa storia: il preventivo non vive più in un file isolato.",
    icon: FileText,
  },
  {
    id: "commesse",
    label: "Commesse",
    title: "La commessa diventa il punto di riferimento di tutti.",
    body: "Persone, scadenze, forniture e decisioni in un unico luogo condiviso, anche quando il lavoro passa da showroom a showroom.",
    icon: ClipboardList,
  },
  {
    id: "progetti",
    label: "Gestione progetti",
    title: "Il lavoro da fare diventa chiaro per tutto il team.",
    body: "Progetti, persone, task, priorità e scadenze rimangono nello stesso spazio, così ogni attività ha un contesto e un prossimo passo.",
    icon: ListChecks,
  },
  {
    id: "ordini",
    label: "Ordini",
    title: "Ogni ordine resta legato a ciò che deve far avanzare.",
    body: "Il team ritrova il legame tra acquisto, fornitura e commessa, con meno passaggi da ricostruire.",
    icon: PackageCheck,
  },
  {
    id: "magazzino",
    label: "Magazzino e logistica",
    title: "Sai cosa arriva. Sai dove si trova.",
    body: "Prodotti, arrivi, colli e magazzini restano collegati a cliente e commessa, così la logistica segue il venduto fino al montaggio.",
    icon: Truck,
  },
  {
    id: "montaggi",
    label: "Montaggi",
    title: "Il giorno del montaggio inizia prima.",
    body: "Informazioni e responsabilità arrivano al team giusto, con meno sorprese da gestire all'ultimo minuto.",
    icon: Route,
  },
  {
    id: "post-vendita",
    label: "Post-vendita",
    title: "La relazione continua anche dopo la consegna.",
    body: "Segnalazioni e attività successive non si perdono nel rumore. Il cliente resta seguito con la stessa precisione dell'inizio.",
    icon: Headphones,
  },
  {
    id: "performance",
    label: "Performance",
    title: "Vedi dove il business sta andando.",
    body: "Una lettura condivisa del lavoro aiuta a decidere con lucidità: cosa seguire, dove intervenire e quale showroom sta crescendo.",
    icon: BarChart3,
  },
];

const flowSteps = [
  "Lead",
  "Cliente",
  "Preventivo",
  "Commessa",
  "Ordini",
  "Consegne",
  "Montaggio",
  "Post-vendita",
];
const heroTrustSignals = [
  ["UN UNICO MODO DI LAVORARE", "Dal primo contatto all’ultimo intervento."],
  ["INFORMAZIONI CONDIVISE", "Il contesto giusto per ogni persona del team."],
  ["PIÙ CONTROLLO", "Decisioni più chiare mentre l’azienda cresce."],
] as const;

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#top" className={`flex items-center gap-2.5 ${dark ? "text-[#102744]" : "text-white"}`}>
      <span className={`grid h-8 w-8 place-items-center rounded-[10px] ${dark ? "bg-[#102744] text-white" : "bg-white text-[#0b55c6]"}`}>
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
          ? "bg-white text-[#0b4fbd] shadow-[0_10px_28px_rgba(4,43,102,.22)] hover:bg-[#e9f3ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          : "bg-[#f36b4d] text-white shadow-[0_10px_24px_rgba(173,57,35,.22)] hover:bg-[#ff8668] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f36b4d]"
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </button>
  );
}

function ProductPlaceholder({ label, hero = false }: { label: string; hero?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[18px] border border-[#9bc4ec] bg-[#f8fbff] shadow-[0_24px_64px_rgba(7,62,137,.16)] ${
        hero ? "aspect-[16/10]" : "aspect-[16/10]"
      }`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(145deg,#e8f3ff,#ffffff_58%)]" />
      <div className="absolute inset-5 rounded-[12px] border border-dashed border-[#a9c8e8] sm:inset-7" />
      <div className="absolute inset-0 grid place-items-center p-6 text-center">
        <div>
          <div className="mx-auto mb-4 h-10 w-14 rounded-[7px] border border-[#9bc4ec] bg-white/70 shadow-[0_8px_20px_rgba(7,62,137,.08)]">
            <div className="mt-2.5 ml-2 h-1.5 w-8 rounded-full bg-[#c2dbf4]" />
            <div className="mt-1.5 ml-2 h-1.5 w-5 rounded-full bg-[#d8e8f8]" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#456887]">{label}</span>
          <p className="mt-2 text-xs text-[#8aa3bd]">Spazio riservato al tuo screenshot</p>
        </div>
      </div>
    </div>
  );
}

function DemoModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#061a38]/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Prenota una demo">
      <div className="relative w-full max-w-lg rounded-[18px] bg-white p-6 shadow-2xl sm:p-9">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-[#557090] hover:bg-[#eaf3ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769d5]"
          aria-label="Chiudi"
        >
          <X className="h-5 w-5" />
        </button>
        {!sent ? (
          <>
            <span className="inline-flex rounded-full bg-[#dcecff] px-3 py-1.5 text-xs font-bold text-[#0b55c6]">Parliamo del tuo showroom</span>
            <h2 className="mt-5 max-w-sm text-4xl font-bold leading-[1.02] tracking-[-0.06em] text-[#102744]">Partiamo da una tua commessa.</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#557090]">Raccontaci come lavorate oggi. Ti mostriamo dove Totalone può restituire tempo e controllo al tuo team.</p>
            <div className="mt-7 grid gap-3">
              <input className="rounded-[9px] border border-[#c8dcf3] bg-white px-4 py-3 text-sm outline-none placeholder:text-[#8aa3bd] focus:border-[#1769d5] focus-visible:ring-2 focus-visible:ring-[#1769d5]/20" placeholder="Nome e cognome" />
              <input className="rounded-[9px] border border-[#c8dcf3] bg-white px-4 py-3 text-sm outline-none placeholder:text-[#8aa3bd] focus:border-[#1769d5] focus-visible:ring-2 focus-visible:ring-[#1769d5]/20" placeholder="Email aziendale" type="email" />
              <button onClick={() => setSent(true)} className="mt-2 inline-flex items-center justify-center gap-2 rounded-[9px] bg-[#f36b4d] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#ff8668] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f36b4d]">
                Richiedi il contatto <Send className="h-4 w-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#dcecff] text-[#1769d5]"><Check className="h-6 w-6" /></div>
            <h2 className="mt-5 text-4xl font-bold tracking-[-0.06em] text-[#102744]">Ricevuto.</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#557090]">Ti ricontatteremo per capire insieme da quale commessa partire.</p>
            <button onClick={onClose} className="mt-7 rounded-[9px] border border-[#1769d5] px-5 py-3 text-sm font-bold text-[#0b55c6] hover:bg-[#eaf3ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769d5]">Torna alla pagina</button>
          </div>
        )}
      </div>
    </div>
  );
}

export function TotaloneHomepage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [activeArea, setActiveArea] = useState("crm");
  const selectedArea = areas.find((area) => area.id === activeArea) ?? areas[0];
  const ActiveIcon = selectedArea.icon;
  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    event.preventDefault();
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", href);
  };
  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <main id="top" className="min-h-[100dvh] overflow-hidden bg-[#fbfdff] text-[#102744]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`html { scroll-behavior: smooth; }`}</style>
      <header className="absolute left-0 right-0 top-0 z-40">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <Logo />
          <nav className="hidden items-center gap-7 md:flex">
            <button onClick={() => setProductMenuOpen((open) => !open)} aria-expanded={productMenuOpen} className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#d9eaff] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Prodotto <ChevronDown className="h-3.5 w-3.5" /></button>
            {navItems.map((item) => <a key={item.href} href={item.href} onClick={(event) => handleNavClick(event, item.href)} className="text-[13px] font-semibold text-[#d9eaff] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{item.label}</a>)}
            <a href="/login/" className="text-[13px] font-semibold text-[#d9eaff] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Login</a>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setDemoOpen(true)} className="hidden rounded-[8px] bg-white px-4 py-2.5 text-[13px] font-bold text-[#111111] hover:bg-[#e8e8e8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:block">Prenota una demo</button>
          <button onClick={() => setMenuOpen((open) => !open)} className="grid h-10 w-10 place-items-center rounded-[8px] border border-[#82bfff] text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden" aria-label="Apri menu">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          {productMenuOpen && <div className="absolute left-5 right-5 top-[72px] hidden rounded-[16px] border border-[#2a67ba] bg-[#fafdff] p-6 text-[#102744] shadow-[0_22px_60px_rgba(4,35,82,.24)] md:grid md:grid-cols-[.9fr_1.8fr] md:gap-7 lg:left-10 lg:right-10">
            <div className="border-r border-[#cfe1f4] pr-6"><span className="rounded-full bg-[#dcecff] px-3 py-1.5 text-[10px] font-bold tracking-[.1em] text-[#0b55c6]">IL PRODOTTO</span><h2 className="mt-4 text-3xl font-bold leading-[.98] tracking-[-.06em]">Un modo condiviso di lavorare.</h2><p className="mt-3 text-xs leading-5 text-[#557090]">Dal primo contatto al controllo del business, ogni passaggio resta collegato.</p></div>
             <div className="grid grid-cols-3 gap-4">{productGroups.map((group) => <div key={group.label} className="border-l border-[#cfe1f4] pl-4"><h3 className="text-[10px] font-bold tracking-[.12em] text-[#0b55c6]">{group.label}</h3>{group.links.map(([label, href]) => <a key={href} href={href} onClick={() => setProductMenuOpen(false)} className="flex items-center justify-between gap-1 py-2 text-[11px] font-bold text-[#245b96] hover:text-[#f36b4d]">{label}<ChevronRight className="h-3 w-3" /></a>)}</div>)}</div>
          </div>}
        </div>
        {menuOpen && (
          <div className="border-t border-[#2a67ba] bg-[#0b3473] px-5 py-4 md:hidden">
             <button onClick={() => setProductMenuOpen((open) => !open)} className="flex w-full items-center justify-between border-b border-[#3d78c4] py-3 text-left text-sm font-semibold text-[#e7f2ff] hover:text-white">Prodotto <ChevronDown className="h-4 w-4" /></button>
              {productMenuOpen && <div className="border-b border-[#3d78c4] pb-2">{productGroups.map((group) => <div key={group.label} className="pt-3"><div className="text-[10px] font-bold tracking-[.12em] text-[#9fe0ff]">{group.label}</div>{group.links.map(([label, href]) => <a onClick={() => { setMenuOpen(false); setProductMenuOpen(false); }} key={href} href={href} className="block py-2 pl-2 text-xs font-semibold text-[#e7f2ff]">{label}</a>)}</div>)}</div>}
              {navItems.map((item) => <a onClick={(event) => { handleNavClick(event, item.href); setMenuOpen(false); }} key={item.href} href={item.href} className="block border-b border-[#3d78c4] py-3 text-sm font-semibold text-[#e7f2ff] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{item.label}</a>)}
             <a onClick={() => setMenuOpen(false)} href="/login/" className="block border-b border-[#3d78c4] py-3 text-sm font-semibold text-[#e7f2ff] hover:text-white">Login</a>
            <button onClick={() => { setDemoOpen(true); setMenuOpen(false); }} className="mt-4 w-full rounded-[8px] bg-[#f36b4d] px-4 py-3 text-left text-sm font-bold text-white hover:bg-[#ff8668] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Prenota una demo <ArrowRight className="ml-2 inline h-4 w-4" /></button>
          </div>
        )}
      </header>

      <section className="relative overflow-hidden bg-[linear-gradient(116deg,#082c68_0%,#0d56bf_54%,#1387ee_100%)] pb-16 pt-32 text-white sm:pb-24 sm:pt-40">
        <div className="absolute -right-20 top-20 h-[420px] w-[420px] rounded-full bg-[#75d7ff]/30 blur-3xl" />
        <div className="absolute -left-28 bottom-[-180px] h-[420px] w-[420px] rounded-full bg-[#f36b4d]/20 blur-3xl" />
        <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-10">
            <div>
              <span className="inline-flex rounded-full border border-[#8ecbff] bg-[#5abaff]/20 px-3.5 py-2 text-xs font-bold tracking-[0.08em] text-[#eff8ff]">IL SISTEMA OPERATIVO PER L'ARREDAMENTO</span>
              <h1 className="mt-7 max-w-2xl text-[clamp(3.3rem,7vw,6.8rem)] font-bold leading-[.93] tracking-[-0.075em]">Il tuo business dell’arredamento.<br /><span className="text-[#9fe0ff]">Tutto in un unico posto.</span></h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#e5f3ff]">Clienti, preventivi, commesse, consegne, montaggi e performance. Totalone riunisce il lavoro del tuo showroom in un unico sistema.</p>
              <div className="mt-9 flex flex-wrap items-center gap-4"><Button onClick={() => setDemoOpen(true)} light>Prenota una demo</Button><a href="#come-funziona" className="inline-flex items-center gap-2 px-2 text-sm font-bold text-white hover:text-[#d0d0d0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Scopri come funziona <ChevronDown className="h-4 w-4" /></a></div>
              <div className="mt-10 grid gap-3 text-xs text-[#d3ebff] sm:grid-cols-2 lg:grid-cols-4">{heroTrustSignals.map(([title, body]) => <div key={title} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#9fe0ff]" /><span><strong className="block text-[10px] font-bold tracking-[0.04em] text-white">{title}</strong><span className="mt-1 block font-semibold leading-5 text-[#d3ebff]">{body}</span></span></div>)}</div>
            </div>
            <div className="lg:pl-3"><ProductPlaceholder label="[HERO SCREENSHOT]" hero /></div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#cfe1f4] bg-[#eff7ff] py-12">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 px-5 sm:grid-cols-4 sm:px-8 lg:px-10">{["Lead → cliente", "Preventivo → commessa", "Consegna → montaggio", "Dati → decisioni"].map((item) => <div key={item} className="border-r border-[#cfe1f4] px-4 py-2 text-center text-xs font-bold text-[#1e5fa8] last:border-0 sm:px-5">{item}</div>)}</div>
      </section>

      <section className="bg-[#fffaf7] py-24 sm:py-32" id="come-funziona">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
            <div><span className="inline-flex rounded-full bg-[#ffdcd2] px-3 py-1.5 text-xs font-bold text-[#c34d35]">IL PROBLEMA</span><h2 className="mt-6 max-w-xl text-5xl font-bold leading-[.97] tracking-[-0.065em] text-[#102744] sm:text-6xl">La tua azienda non può dipendere dalla memoria di una persona.</h2></div>
            <div className="lg:pt-12"><p className="max-w-2xl text-xl leading-8 text-[#254b72]">Excel per i numeri. WhatsApp per gli aggiornamenti. Email per i documenti. Carta per quello che non deve andare perso.</p><p className="mt-6 max-w-xl text-base leading-7 text-[#557090]">Quando le informazioni sono sparse, ogni passaggio chiede una rincorsa. Totalone porta tutto nello stesso modo di lavorare.</p><div className="mt-9 flex flex-wrap gap-2">{["Excel", "WhatsApp", "Email", "Agenda", "Memoria"].map((item) => <span key={item} className="rounded-full border border-[#f1c2b6] bg-white px-3.5 py-2 text-xs font-semibold text-[#c34d35]">{item}</span>)}</div></div>
          </div>
        </div>
      </section>

      <section className="bg-[#eaf4ff] py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><span className="inline-flex rounded-full bg-[#fff2dd] px-3 py-1.5 text-xs font-bold text-[#b96a19]">LA COMMESSA</span><h2 className="mt-6 max-w-3xl text-5xl font-bold leading-[.95] tracking-[-0.065em] text-[#102744] sm:text-7xl">Una sola commessa.<br />Tutta la sua storia.</h2></div><p className="max-w-sm text-sm leading-6 text-[#557090]">Dalla prima richiesta all’ultimo intervento, tutto rimane collegato alla stessa commessa.</p></div>
          <div className="mt-14 overflow-hidden rounded-[18px] border border-[#c8dcf3] bg-white p-5 shadow-[0_16px_40px_rgba(7,62,137,.08)] sm:p-8">
            <div className="flex min-w-[840px] items-center justify-between gap-2">
              {flowSteps.map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                  <div className={`grid h-16 min-w-[88px] place-items-center rounded-[12px] border px-3 text-center text-xs font-bold ${index === 3 ? "border-[#f36b4d] bg-[#fff0eb] text-[#c34d35]" : "border-[#bcd7f1] bg-[#f7fbff] text-[#245b96]"}`}>
                    <span className="mb-1 text-[10px] tracking-[0.12em] text-[#8aa3bd]">0{index + 1}</span>{step}
                  </div>
                  {index < flowSteps.length - 1 && <ArrowRight className="h-4 w-4 shrink-0 text-[#72a5d9]" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfdff] py-24 sm:py-32" id="aree">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-7 border-b border-[#cfe1f4] pb-10 lg:flex-row lg:items-end lg:justify-between"><div><span className="inline-flex rounded-full bg-[#dcecff] px-3 py-1.5 text-xs font-bold text-[#0b55c6]">IL PRODOTTO</span><h2 className="mt-6 max-w-3xl text-5xl font-bold leading-[.95] tracking-[-0.065em] text-[#102744] sm:text-7xl">Un modo condiviso di lavorare.</h2></div><p className="max-w-sm text-sm leading-6 text-[#557090]">Non moduli da compilare. Passaggi che si parlano e fanno avanzare il lavoro.</p></div>
          <div className="mt-12 grid gap-10 lg:grid-cols-[.38fr_.62fr] lg:gap-16">
            <div className="lg:sticky lg:top-8 lg:self-start"><div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-[#557090]"><Route className="h-4 w-4 text-[#1769d5]" /> Seleziona un’area</div><div className="divide-y divide-[#cfe1f4] rounded-[12px] border-y border-[#cfe1f4]">{areas.map((area) => <button key={area.id} onClick={() => setActiveArea(area.id)} className={`flex w-full items-center justify-between py-4 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769d5] ${activeArea === area.id ? "font-bold text-[#0b55c6]" : "font-semibold text-[#557090] hover:text-[#0b55c6]"}`}><span>{area.label}</span><ChevronRight className={`h-4 w-4 transition-transform ${activeArea === area.id ? "translate-x-1" : ""}`} /></button>)}</div></div>
            <div key={selectedArea.id} className="animate-[fadeIn_.3s_ease-out]"><div className="mb-6 grid h-12 w-12 place-items-center rounded-[12px] bg-[#ffdcd2] text-[#c34d35]"><ActiveIcon className="h-5 w-5" /></div><p className="text-xs font-bold uppercase tracking-[0.1em] text-[#0b55c6]">{selectedArea.label}</p><h3 className="mt-4 max-w-2xl text-4xl font-bold leading-[1] tracking-[-0.06em] text-[#102744] sm:text-5xl">{selectedArea.title}</h3><p className="mt-5 max-w-xl text-base leading-7 text-[#557090]">{selectedArea.body}</p><div className="mt-9"><ProductPlaceholder label={`[${selectedArea.label.toUpperCase()} SCREENSHOT]`} /></div></div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#cfe1f4] bg-[#fffaf7] py-20 sm:py-24">
        <div className="mx-auto max-w-[900px] px-5 text-center sm:px-8 lg:px-10"><span className="inline-flex rounded-full bg-[#ffdcd2] px-3 py-1.5 text-xs font-bold text-[#c34d35]">UN MOTIVO IN PIÙ</span><h2 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-[.96] tracking-[-0.06em] text-[#102744] sm:text-6xl">Le informazioni non devono dipendere dalle singole persone. Devono appartenere all’azienda.</h2><p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#557090]">Così il lavoro continua con la stessa chiarezza, anche quando cambiano ruoli, responsabilità e giornate.</p></div>
      </section>

      <section className="bg-[#fbfdff] py-24 sm:py-32" id="autonomia">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">
            <div><span className="inline-flex rounded-full bg-[#dcecff] px-3 py-1.5 text-xs font-bold text-[#0b55c6]">AUTONOMIA</span><h2 className="mt-6 max-w-xl text-5xl font-bold leading-[.95] tracking-[-0.065em] text-[#102744] sm:text-7xl">La tua azienda cambia. Non devi chiamarci ogni volta che succede.</h2></div>
            <div><p className="max-w-2xl text-xl leading-8 text-[#254b72]">Entra una nuova persona nel team? Apri un nuovo showroom? Devi aggiornare un nome o modificare la struttura della tua organizzazione?</p><p className="mt-6 max-w-xl text-base leading-7 text-[#557090]">Le normali attività amministrative possono essere gestite direttamente da Totalone. Non devi inviarci una richiesta e aspettare che qualcuno faccia la modifica per te.</p><div className="mt-10 grid gap-3 sm:grid-cols-3"><div className="rounded-[14px] border border-[#cfe1f4] bg-white p-5"><span className="text-[10px] font-bold tracking-[.1em] text-[#0b55c6]">NUOVO DIPENDENTE</span><p className="mt-3 text-sm font-bold leading-5 text-[#102744]">Aggiungi e gestisci autonomamente le persone del tuo team.</p></div><div className="rounded-[14px] border border-[#cfe1f4] bg-white p-5"><span className="text-[10px] font-bold tracking-[.1em] text-[#0b55c6]">NUOVO SHOWROOM</span><p className="mt-3 text-sm font-bold leading-5 text-[#102744]">Gestisci direttamente le sedi e la struttura della tua organizzazione.</p></div><div className="rounded-[14px] border border-[#cfe1f4] bg-white p-5"><span className="text-[10px] font-bold tracking-[.1em] text-[#0b55c6]">MODIFICHE QUOTIDIANE</span><p className="mt-3 text-sm font-bold leading-5 text-[#102744]">Aggiorna nomi, informazioni e configurazioni direttamente dalla piattaforma.</p></div></div></div>
          </div>
          <div className="mt-14 rounded-[18px] bg-[#082c68] p-7 text-white sm:p-10"><p className="max-w-3xl text-3xl font-bold leading-[1] tracking-[-0.055em] sm:text-5xl">“Il tuo gestionale. La tua azienda. La gestisci tu.”</p><p className="mt-5 max-w-2xl text-sm leading-6 text-[#d5ebff]">Totalone è progettato per darti autonomia nelle normali attività di amministrazione della piattaforma. Niente ticket per aggiungere una persona. Niente richieste per aggiornare un nome. Niente interventi tecnici per le normali modifiche organizzative.</p></div>
        </div>
      </section>

      <section className="bg-[#eff7ff] py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:gap-20">
             <div><span className="inline-flex rounded-full bg-[#dcecff] px-3 py-1.5 text-xs font-bold text-[#0b55c6]">CONTROLLO DEL BUSINESS</span><h2 className="mt-6 max-w-xl text-5xl font-bold leading-[.94] tracking-[-0.065em] text-[#102744] sm:text-6xl">Capire cosa sta succedendo, prima di decidere.</h2><p className="mt-7 max-w-lg text-base leading-7 text-[#557090]">Totalone aiuta a leggere il lavoro dell’azienda attraverso vendite, commesse, pagamenti, costi, marginalità e performance. Un quadro più chiaro per intervenire dove serve.</p><div className="mt-8 flex flex-wrap gap-2">{["Vendite", "Commesse", "Pagamenti", "Costi", "Marginalità", "Performance"].map((item) => <span key={item} className="rounded-full border border-[#bcd7f1] bg-white px-3.5 py-2 text-xs font-semibold text-[#245b96]">{item}</span>)}</div></div>
            <ProductPlaceholder label="[DASHBOARD SCREENSHOT]" />
          </div>
        </div>
      </section>

      <section className="bg-[#fbfdff] py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10"><div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-24"><div><span className="inline-flex rounded-full bg-[#ffdcd2] px-3 py-1.5 text-xs font-bold text-[#c34d35]">SPECIALIZZAZIONE</span><h2 className="mt-6 max-w-xl text-5xl font-bold leading-[.94] tracking-[-0.065em] text-[#102744] sm:text-6xl">Non adattato all’arredamento.<br /><span className="text-[#0b55c6]">Nato per l’arredamento.</span></h2><p className="mt-7 max-w-lg text-base leading-7 text-[#557090]">Perché vendere arredamento non significa semplicemente gestire ordini. Significa gestire commesse.</p></div><div className="rounded-[18px] border border-[#c8dcf3] bg-[#eaf4ff] p-5 sm:p-8"><div className="rounded-[12px] border border-[#bcd7f1] bg-white p-6 sm:p-8"><div className="flex items-center justify-between border-b border-[#e4eef8] pb-5"><span className="text-xs font-bold uppercase tracking-[0.12em] text-[#0b55c6]">Il lavoro dello showroom</span><Store className="h-5 w-5 text-[#f36b4d]" /></div><div className="mt-7 grid gap-3 sm:grid-cols-2">{["Progettare", "Coordinare", "Consegnare", "Montare"].map((item) => <div key={item} className="rounded-[10px] bg-[#f4f9ff] px-4 py-4 text-sm font-bold text-[#245b96]">{item}</div>)}</div></div></div></div></div>
      </section>

      <section className="bg-[linear-gradient(120deg,#082652,#0b4fae)] py-24 text-white sm:py-32" id="per-chi">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10"><div className="grid gap-10 lg:grid-cols-[1fr_.7fr] lg:items-end"><div><span className="inline-flex rounded-full bg-[#2b75cb] px-3 py-1.5 text-xs font-bold text-[#e8f5ff]">CRESCITA</span><h2 className="mt-6 max-w-4xl text-5xl font-bold leading-[.94] tracking-[-0.065em] sm:text-7xl">Funziona oggi.<br /><span className="text-[#9fe0ff]">Continua a funzionare quando cresci.</span></h2></div><p className="max-w-sm text-base leading-7 text-[#d5ebff]">Un modo di lavorare che segue la dimensione dell’azienda, senza perdere il filo.</p></div><div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[["01", "1 showroom", "Un linguaggio comune per tutto il team."], ["02", "Team in crescita", "Più persone, responsabilità più leggibili."], ["03", "Più showroom", "Lo stesso modo di lavorare in ogni punto vendita."], ["04", "Gruppo", "Una visione condivisa mentre l’azienda si allarga."]].map(([num, title, body]) => <div key={num} className="rounded-[16px] border border-[#4c89d0] bg-[#144b90] p-7"><span className="text-xs font-bold text-[#9fe0ff]">{num}</span><h3 className="mt-12 text-2xl font-bold tracking-[-0.04em]">{title}</h3><p className="mt-4 text-sm leading-6 text-[#d5ebff]">{body}</p></div>)}</div></div>
      </section>

      <section className="bg-[#fbfdff] py-24 sm:py-32" id="faq">
        <div className="mx-auto max-w-[900px] px-5 sm:px-8 lg:px-10"><span className="inline-flex rounded-full bg-[#dcecff] px-3 py-1.5 text-xs font-bold text-[#0b55c6]">FAQ · AUTONOMIA</span><h2 className="mt-6 max-w-3xl text-5xl font-bold leading-[.95] tracking-[-0.065em] text-[#102744] sm:text-7xl">Le normali modifiche restano nelle tue mani.</h2><div className="mt-12 grid gap-2">{[["Se assumo una nuova persona devo contattarvi?", "No. Puoi aggiungere e gestire direttamente gli utenti dalla piattaforma, senza richiedere un intervento da parte nostra."], ["Se apro un nuovo showroom dovete configurarlo voi?", "Le normali modifiche alla struttura della tua organizzazione possono essere gestite direttamente dalla piattaforma, senza dover richiedere ogni volta un intervento tecnico."], ["Devo pagare per modificare utenti, nomi o informazioni?", "No. Le normali modifiche amministrative che puoi effettuare direttamente dalla piattaforma non prevedono costi di intervento."]].map(([question, answer]) => <details key={question} className="border-b border-[#cfe1f4] py-5"><summary className="cursor-pointer text-base font-bold text-[#245b96]">{question}</summary><p className="mt-3 max-w-2xl text-sm leading-6 text-[#557090]">{answer}</p></details>)}</div></div>
      </section>

      <footer className="bg-[#eaf4ff] py-16 sm:py-20"><div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10"><div className="flex flex-col justify-between gap-10 rounded-[22px] bg-[linear-gradient(120deg,#082652,#0b62ce)] p-7 text-white sm:p-12 lg:flex-row lg:items-end"><div><Logo /><h2 className="mt-10 max-w-2xl text-4xl font-bold leading-[.96] tracking-[-0.06em] sm:text-6xl">Partiamo da una tua commessa.</h2><p className="mt-5 max-w-lg text-sm leading-6 text-[#d5ebff]">Non una demo generica. Vediamo insieme come Totalone può inserirsi nel modo in cui lavori oggi.</p></div><Button onClick={() => setDemoOpen(true)} light>Prenota una demo</Button></div><div className="flex flex-col justify-between gap-4 pt-8 text-xs font-semibold text-[#557090] sm:flex-row"><span>© Totalone — il sistema operativo per l'arredamento</span><span>Un modo più chiaro di lavorare insieme.</span></div></div></footer>
      {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}
    </main>
  );
}