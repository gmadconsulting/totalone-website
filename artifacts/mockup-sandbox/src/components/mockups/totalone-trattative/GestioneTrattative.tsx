import { useEffect, useState, type ReactNode } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, Check, ChevronDown, Send, X } from "lucide-react";

const benefits = [
  ["Sai a che punto è ogni trattativa", "Ogni opportunità mantiene il proprio stato e il proprio contesto commerciale."],
  ["Sai chi la sta seguendo", "Cliente, venditore e informazioni della trattativa rimangono collegati."],
  ["Sai cosa può diventare vendita", "Mantieni una visione chiara delle opportunità commerciali ancora aperte e della loro evoluzione."],
];

const commercialFlow = [
  ["CONTATTO", "Il cliente entra nel sistema."],
  ["OPPORTUNITÀ", "Riconosci il possibile percorso commerciale."],
  ["TRATTATIVA", "Segui l’opportunità fino alla decisione."],
] as [string, string][];

const quoteFlow = [
  ["TRATTATIVA", "L’opportunità prende forma."],
  ["PREVENTIVO", "Costruisci la proposta."],
  ["DECISIONE", "Il cliente valuta e sceglie."],
] as [string, string][];

const saleFlow = [
  ["OPPORTUNITÀ", "Il primo interesse."],
  ["TRATTATIVA", "Il percorso commerciale."],
  ["PREVENTIVO", "La proposta concreta."],
  ["VENDITA", "La decisione diventa risultato."],
] as [string, string][];

const totaloneFlow = [
  ["CRM", "Il cliente entra nel sistema."],
  ["TRATTATIVA", "Segui l’opportunità commerciale."],
  ["PREVENTIVO", "Costruisci la proposta."],
  ["VENDITA", "La trattativa si conclude."],
  ["COMMESSA", "Inizia la gestione di ciò che hai venduto."],
] as [string, string][];

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
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#061a38]/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Prenota una demo">
      <div className="relative w-full max-w-lg rounded-[18px] bg-white p-6 shadow-2xl sm:p-9">
        <button onClick={onClose} className="absolute right-5 top-5 rounded-full p-2 text-[#557090] hover:bg-[#eaf3ff]" aria-label="Chiudi">
          <X className="h-5 w-5" />
        </button>
        {!sent ? (
          <>
            <span className="inline-flex rounded-full bg-[#dcecff] px-3 py-1.5 text-xs font-bold text-[#0b55c6]">GESTIONE TRATTATIVE TOTALONE</span>
            <h2 className="mt-5 max-w-sm text-4xl font-bold leading-[1.02] tracking-[-0.06em] text-[#102744]">Partiamo da una trattativa reale.</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#557090]">Raccontaci come seguite oggi le opportunità commerciali del vostro showroom.</p>
            <div className="mt-7 grid gap-3">
              <input className="rounded-[9px] border border-[#c8dcf3] px-4 py-3 text-sm outline-none placeholder:text-[#8aa3bd] focus:border-[#1769d5]" placeholder="Nome e cognome" />
              <input className="rounded-[9px] border border-[#c8dcf3] px-4 py-3 text-sm outline-none placeholder:text-[#8aa3bd] focus:border-[#1769d5]" placeholder="Email aziendale" type="email" />
              <button onClick={() => setSent(true)} className="mt-2 inline-flex items-center justify-center gap-2 rounded-[9px] bg-[#f36b4d] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#ff8668]">
                Prenota una demo <Send className="h-4 w-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#dcecff] text-[#1769d5]"><Check className="h-6 w-6" /></div>
            <h2 className="mt-5 text-4xl font-bold tracking-[-0.06em] text-[#102744]">Ricevuto.</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#557090]">Ti ricontatteremo per capire insieme come rendere più leggibile il vostro processo commerciale.</p>
            <button onClick={onClose} className="mt-7 rounded-[9px] border border-[#1769d5] px-5 py-3 text-sm font-bold text-[#0b55c6] hover:bg-[#eaf3ff]">Torna alla pagina</button>
          </div>
        )}
      </div>
    </div>
  );
}

function ScreenshotPlaceholder({ label, caption, className = "" }: { label: string; caption?: string; className?: string }) {
  return (
    <figure className={`m-0 ${className}`}>
      <div className="grid min-h-[300px] place-items-center rounded-[18px] border border-[#c8dcf3] bg-[#f7fbff] p-8 text-center shadow-[0_18px_50px_rgba(7,62,137,.08)] sm:min-h-[440px]">
        <div>
          <div className="mx-auto mb-5 h-10 w-10 rounded-[10px] border border-[#bcd7f1] bg-white" />
          <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#456887]">{label}</span>
          <p className="mt-3 text-xs leading-5 text-[#8aa3bd]">Spazio riservato allo screenshot reale</p>
        </div>
      </div>
      {caption && <figcaption className="mt-3 text-[11px] font-semibold leading-5 text-[#6d89a5]">{caption}</figcaption>}
    </figure>
  );
}

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold tracking-[0.08em] ${dark ? "border border-[#8ecbff] bg-[#5abaff]/20 text-[#eff8ff]" : "bg-[#dcecff] text-[#0b55c6]"}`}>{children}</span>;
}

function MarketingFlow({ items, dark = false }: { items: [string, string][]; dark?: boolean }) {
  return (
    <div className={`grid gap-3 md:flex md:items-stretch md:gap-0 ${dark ? "text-white" : "text-[#102744]"}`}>
      {items.map(([label, body], index) => (
        <div key={label} className={`relative flex flex-1 items-start gap-4 rounded-[14px] border border-[#cfe1f4] bg-white p-5 md:rounded-none md:border-r-0 md:first:rounded-l-[14px] md:last:rounded-r-[14px] md:last:border-r md:before:absolute md:before:right-[-13px] md:before:top-1/2 md:before:z-10 md:before:h-6 md:before:w-6 md:before:-translate-y-1/2 md:before:rotate-45 md:before:border-r md:before:border-t md:before:border-[#cfe1f4] md:before:bg-white md:last:before:hidden ${dark ? "border-[#376ba5] bg-[#144b90] md:before:border-[#376ba5] md:before:bg-[#144b90]" : ""}`}>
          <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[10px] font-bold ${dark ? "bg-[#9fe0ff] text-[#082c68]" : "bg-[#dcecff] text-[#0b55c6]"}`}>{String(index + 1).padStart(2, "0")}</span>
          <span className="relative z-20"><strong className="block text-xs tracking-[0.08em]">{label}</strong><span className={`mt-2 block text-xs leading-5 ${dark ? "text-[#d5ebff]" : "text-[#557090]"}`}>{body}</span></span>
        </div>
      ))}
    </div>
  );
}

function InternalLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#0b55c6] hover:text-[#f36b4d]">{children}<ArrowRight className="h-4 w-4" /></a>;
}

export function GestioneTrattative() {
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    document.title = "Gestione Trattative per Arredatori e Showroom | Totalone";
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = "Gestisci trattative, opportunità commerciali e pipeline di vendita con Totalone. Segui ogni cliente dal primo interesse alla vendita in un unico sistema.";
  }, []);

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
          <div className="grid items-center gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-16">
            <div>
              <Eyebrow dark>GESTIONE TRATTATIVE</Eyebrow>
              <h1 className="mt-7 max-w-2xl text-[clamp(3rem,6.5vw,6.4rem)] font-bold leading-[.92] tracking-[-0.075em]">Ogni trattativa,<br /><span className="text-[#9fe0ff]">sotto controllo.</span></h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#e5f3ff]">Segui le opportunità commerciali del tuo showroom, controlla a che punto sono e mantieni collegati cliente, venditore, valore e attività fino alla vendita.</p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button onClick={() => setDemoOpen(true)} className="group inline-flex items-center justify-center gap-2 rounded-[9px] bg-[#f36b4d] px-5 py-3.5 text-[14px] font-bold text-white shadow-[0_10px_24px_rgba(173,57,35,.22)] hover:bg-[#ff8668]">Prenota una demo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button>
                <a href="#panoramica" className="inline-flex items-center gap-2 px-2 text-sm font-bold text-white hover:text-[#d0d0d0]">Scopri come funziona <ArrowDown className="h-4 w-4" /></a>
              </div>
              <p className="mt-5 text-xs font-bold text-[#c9e2fb]">Pensato per showroom, negozi di arredamento e realtà multi-store.</p>
            </div>
            <ScreenshotPlaceholder label="[SCREENSHOT — PANORAMICA GESTIONE TRATTATIVE]" caption="Una panoramica reale delle opportunità commerciali, da sostituire con lo screenshot Totalone." className="[&>div]:border-[#87b9e7] [&>div]:bg-[#f8fbff]" />
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf7] py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">
            <div><Eyebrow>UNA VISIONE COMMERCIALE COMPLETA</Eyebrow><h2 className="mt-6 max-w-xl text-5xl font-bold leading-[.95] tracking-[-0.065em] sm:text-7xl">Non perdere di vista nessuna opportunità.</h2></div>
            <div><p className="max-w-2xl text-xl leading-8 text-[#254b72]">Nel settore dell’arredamento una trattativa può durare settimane o mesi.</p><p className="mt-5 max-w-2xl text-base leading-7 text-[#557090]">Il cliente entra in showroom, valuta diverse soluzioni, riceve un preventivo, torna, modifica il progetto e prende una decisione. Totalone ti permette di mantenere ogni opportunità commerciale organizzata e di capire rapidamente quali trattative sono aperte, chi le sta seguendo e a che punto si trovano.</p></div>
          </div>
          <div className="mt-16 grid gap-0 border-t border-[#f1c2b6] sm:grid-cols-3">{benefits.map(([title, body], index) => <article key={title} className="border-b border-[#f1c2b6] py-7 sm:border-b-0 sm:border-r sm:px-7 sm:first:pl-0 sm:last:border-r-0"><span className="text-[11px] font-bold tracking-[.12em] text-[#c34d35]">0{index + 1}</span><h3 className="mt-5 text-xl font-bold leading-tight tracking-[-0.04em]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#557090]">{body}</p></article>)}</div>
        </div>
      </section>

      <section className="bg-[#fbfdff] py-24 sm:py-32" id="panoramica">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:gap-24">
            <div><Eyebrow>PANORAMICA COMMERCIALE</Eyebrow><h2 className="mt-6 max-w-xl text-5xl font-bold leading-[.95] tracking-[-0.065em] sm:text-7xl">Tutte le trattative. Una sola vista.</h2><div className="mt-6 max-w-lg text-base leading-7 text-[#557090]"><p>Visualizza le opportunità commerciali dello showroom in un unico ambiente e passa rapidamente dalla visione generale al dettaglio della singola trattativa.</p><p className="mt-5">L’obiettivo non è soltanto sapere quanti clienti stai seguendo, ma capire a che punto si trova ogni opportunità.</p></div></div>
            <ScreenshotPlaceholder label="[SCREENSHOT — ELENCO TRATTATIVE]" caption="Una visione condivisa delle opportunità commerciali dello showroom." />
          </div>
        </div>
      </section>

      <section className="bg-[#eaf4ff] py-24 sm:py-32" id="pipeline">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-center lg:gap-24">
            <div><Eyebrow>PIPELINE</Eyebrow><h2 className="mt-6 max-w-xl text-5xl font-bold leading-[.95] tracking-[-0.065em] sm:text-7xl">Trasforma le trattative in un processo visibile.</h2><p className="mt-7 max-w-lg text-base leading-7 text-[#557090]">Quando le opportunità vengono gestite nella testa delle persone, nelle email o in fogli separati, diventa difficile capire cosa sta realmente succedendo. Totalone porta le trattative in una pipeline condivisa, mantenendo una lettura ordinata del lavoro commerciale.</p><p className="mt-8 text-2xl font-bold leading-tight tracking-[-0.04em] text-[#0b55c6]">“Non solo quante trattative hai. A che punto sono.”</p></div>
            <ScreenshotPlaceholder label="[SCREENSHOT — PIPELINE TRATTATIVE]" caption="La pipeline reale verrà inserita qui, senza ricreare Kanban o fasi inventate." className="[&>div]:min-h-[380px] sm:[&>div]:min-h-[540px]" />
          </div>
        </div>
      </section>

      <section className="bg-[#fbfdff] py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-center lg:gap-24">
            <div><Eyebrow>DAL CONTATTO ALL’OPPORTUNITÀ</Eyebrow><h2 className="mt-6 max-w-xl text-5xl font-bold leading-[.95] tracking-[-0.065em] sm:text-6xl">Un cliente non deve perdersi dopo il primo contatto.</h2><p className="mt-7 max-w-lg text-base leading-7 text-[#557090]">Una richiesta, una visita in showroom o un nuovo contatto possono diventare un’opportunità commerciale. Totalone mantiene il cliente all’interno dello stesso ecosistema, così la fase commerciale può proseguire senza ricostruire ogni volta informazioni e contesto.</p><p className="mt-6 text-sm font-bold text-[#245b96]">Il CRM raccoglie il cliente. La gestione trattative segue l’opportunità commerciale.</p><InternalLink href="/__mockup/preview/totalone-crm/CrmProductPage">Scopri il CRM per arredatori</InternalLink></div>
            <MarketingFlow items={commercialFlow} />
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf7] py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:gap-24">
            <div><Eyebrow>VALORE COMMERCIALE</Eyebrow><h2 className="mt-6 max-w-xl text-5xl font-bold leading-[.95] tracking-[-0.065em] sm:text-7xl">Non tutte le trattative pesano allo stesso modo.</h2><p className="mt-7 max-w-lg text-base leading-7 text-[#557090]">Sapere quante opportunità sono aperte è utile. Sapere quale valore commerciale rappresentano rende la lettura molto più significativa.</p><p className="mt-6 max-w-lg text-base leading-7 text-[#557090]">Totalone mantiene il valore della trattativa collegato alla relativa opportunità, aiutando il team a leggere il lavoro commerciale in modo più strutturato.</p><p className="mt-8 text-2xl font-bold leading-tight tracking-[-0.04em] text-[#c34d35]">Dai un valore alle opportunità, non soltanto un nome.</p></div>
            <ScreenshotPlaceholder label="[SCREENSHOT — VALORI DELLE TRATTATIVE]" caption="Placeholder per la schermata reale dei valori delle opportunità." />
          </div>
        </div>
      </section>

      <section className="bg-[#fbfdff] py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-center lg:gap-24">
            <div><Eyebrow>DETTAGLIO TRATTATIVA</Eyebrow><h2 className="mt-6 max-w-xl text-5xl font-bold leading-[.95] tracking-[-0.065em] sm:text-7xl">Apri una trattativa e riparti da dove eri rimasto.</h2><p className="mt-7 max-w-lg text-base leading-7 text-[#557090]">Ogni opportunità commerciale deve mantenere il proprio contesto. Cliente, responsabile, stato, valore e informazioni della trattativa rimangono collegati, così chi la segue non deve ricostruire ogni volta ciò che è successo.</p></div>
            <ScreenshotPlaceholder label="[SCREENSHOT — DETTAGLIO TRATTATIVA]" caption="Placeholder per lo screenshot reale di una trattativa aperta." />
          </div>
        </div>
      </section>

      <section className="bg-[#eaf4ff] py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.76fr_1.24fr] lg:items-center lg:gap-24">
            <div><Eyebrow>TUTTO COLLEGATO</Eyebrow><h2 className="mt-6 max-w-xl text-5xl font-bold leading-[.95] tracking-[-0.065em] sm:text-6xl">Quando la trattativa diventa concreta, il preventivo è già nel flusso.</h2><p className="mt-7 max-w-lg text-base leading-7 text-[#557090]">Una trattativa nel settore dell’arredamento evolve spesso attraverso una o più proposte. Totalone collega il processo commerciale alla creazione del preventivo, evitando che l’offerta diventi un documento scollegato dal cliente e dall’opportunità che l’ha generata.</p><InternalLink href="/__mockup/preview/totalone-preventivi/PreventiviProductPage">Scopri i Preventivi Totalone</InternalLink></div>
            <MarketingFlow items={quoteFlow} />
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf7] py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[900px] text-center"><Eyebrow>CONVERSIONE</Eyebrow><h2 className="mt-6 text-5xl font-bold leading-[.95] tracking-[-0.065em] sm:text-7xl">Segui l’opportunità fino a quando diventa una vendita.</h2><p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#557090]">La trattativa non termina quando viene inviato il preventivo. Il cliente può chiedere modifiche, valutare alternative e richiedere nuove versioni prima di prendere una decisione.</p></div>
          <div className="mt-14"><MarketingFlow items={saleFlow} /></div>
          <p className="mt-8 text-center text-xl font-bold tracking-[-0.03em] text-[#c34d35]">Dal primo interesse alla vendita, senza perdere il contesto commerciale.</p>
        </div>
      </section>

      <section className="bg-[#082c68] py-24 text-white sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-center lg:gap-24">
            <div><Eyebrow dark>DALLA VENDITA ALL’OPERATIVITÀ</Eyebrow><h2 className="mt-6 max-w-xl text-5xl font-bold leading-[.95] tracking-[-0.065em] sm:text-7xl">Quando la trattativa si chiude, il lavoro continua.</h2><p className="mt-7 max-w-lg text-base leading-7 text-[#d5ebff]">La gestione trattative accompagna il processo commerciale fino alla vendita. Da quel momento, la Gestione Commesse permette di continuare a seguire ciò che è stato venduto all’interno dello stesso ecosistema Totalone.</p><InternalLink href="/__mockup/preview/totalone-commesse/CommesseProductPage">Scopri la Gestione Commesse</InternalLink></div>
            <MarketingFlow items={[["TRATTATIVA", "Segui l’opportunità."], ["PREVENTIVO", "Costruisci la proposta."], ["VENDITA", "La decisione si chiude."], ["COMMESSA", "Inizia l’operatività."]]} dark />
          </div>
        </div>
      </section>

      <section className="bg-[#fbfdff] py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:gap-24">
            <div><Eyebrow>TROVA SUBITO QUELLO CHE CERCHI</Eyebrow><h2 className="mt-6 max-w-xl text-5xl font-bold leading-[.95] tracking-[-0.065em] sm:text-6xl">Dal quadro generale alla singola opportunità.</h2><p className="mt-7 max-w-lg text-base leading-7 text-[#557090]">Quando aumentano clienti e trattative, avere una vista ordinata diventa essenziale. Totalone permette di organizzare il lavoro commerciale e concentrarsi sulle opportunità rilevanti per il momento.</p></div>
            <ScreenshotPlaceholder label="[SCREENSHOT — FILTRI GESTIONE TRATTATIVE]" caption="Placeholder per la schermata reale dei filtri e dell’organizzazione delle opportunità." />
          </div>
        </div>
      </section>

      <section className="bg-[#eaf4ff] py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-center lg:gap-24">
            <div><Eyebrow>PER CHI GESTISCE PIÙ SEDI</Eyebrow><h2 className="mt-6 max-w-xl text-5xl font-bold leading-[.95] tracking-[-0.065em] sm:text-6xl">Una pipeline commerciale condivisa, anche quando l’azienda cresce.</h2><p className="mt-7 max-w-lg text-base leading-7 text-[#557090]">Quando aumentano showroom e venditori, aumenta anche la complessità commerciale. Totalone permette di mantenere le trattative nello stesso sistema e di leggere il lavoro commerciale dalla prospettiva più utile alla propria organizzazione.</p></div>
            <ScreenshotPlaceholder label="[SCREENSHOT — TRATTATIVE PER SHOWROOM / VENDITORE]" caption="Placeholder opzionale per la vista reale organizzata per showroom o venditore." />
          </div>
        </div>
      </section>

      <section className="bg-[#f4f9ff] py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[900px] text-center"><Eyebrow>UN UNICO FLUSSO</Eyebrow><h2 className="mt-6 text-5xl font-bold leading-[.95] tracking-[-0.065em] sm:text-7xl">Dal primo contatto alla commessa.</h2><p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#557090]">Ogni fase mantiene continuità con quella precedente, riducendo la frammentazione tra strumenti, file e informazioni.</p></div>
          <div className="mt-14"><MarketingFlow items={totaloneFlow} /></div>
        </div>
      </section>

      <section className="bg-[#fffaf7] py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[900px]"><Eyebrow>PIÙ VISIBILITÀ</Eyebrow><h2 className="mt-6 max-w-3xl text-5xl font-bold leading-[.95] tracking-[-0.065em] sm:text-7xl">Il commerciale segue le trattative. La direzione vede cosa sta succedendo.</h2><p className="mt-7 max-w-2xl text-base leading-7 text-[#557090]">Una pipeline condivisa permette al team di lavorare sulle proprie opportunità e allo stesso tempo rende più leggibile l’attività commerciale dello showroom.</p></div>
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <div className="rounded-[18px] border border-[#f1c2b6] bg-white p-7 sm:p-9"><span className="text-[11px] font-bold uppercase tracking-[.12em] text-[#c34d35]">SENZA UN PROCESSO CONDIVISO</span><ul className="mt-7 grid gap-4 text-sm font-bold text-[#557090]">{["Trattative sparse", "Informazioni personali", "Aggiornamenti da chiedere", "Difficile capire cosa è aperto"].map((item) => <li key={item} className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-[#f1c2b6]" />{item}</li>)}</ul></div>
            <div className="rounded-[18px] border border-[#bcd7f1] bg-[#eaf4ff] p-7 sm:p-9"><span className="text-[11px] font-bold uppercase tracking-[.12em] text-[#0b55c6]">CON TOTALONE</span><ul className="mt-7 grid gap-4 text-sm font-bold text-[#245b96]">{["Pipeline condivisa", "Stati visibili", "Responsabilità chiare", "Opportunità organizzate"].map((item) => <li key={item} className="flex items-center gap-3"><Check className="h-4 w-4 text-[#1769d5]" />{item}</li>)}</ul></div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfdff] py-24 sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-24"><div><Eyebrow>PERCHÉ TOTALONE</Eyebrow><h2 className="mt-6 max-w-xl text-5xl font-bold leading-[.95] tracking-[-0.065em] sm:text-7xl">Un processo commerciale costruito per chi vende arredamento.</h2><p className="mt-7 max-w-lg text-base leading-7 text-[#557090]">Vendere arredamento raramente significa chiudere una trattativa in una singola conversazione. Visite in showroom, richieste, preventivi, modifiche e decisioni possono distribuirsi nel tempo.</p></div><div className="grid gap-0 border-t border-[#cfe1f4]">{[["VISIBILE", "Sai quali trattative sono aperte e a che punto sono."], ["CONDIVISO", "Il lavoro commerciale non rimane nella testa del singolo venditore."], ["COLLEGATO", "CRM, trattative, preventivi e commesse fanno parte dello stesso ecosistema."]].map(([title, body], index) => <article key={title} className="border-b border-[#cfe1f4] py-6"><span className="text-[11px] font-bold tracking-[.12em] text-[#0b55c6]">0{index + 1} · {title}</span><p className="mt-3 max-w-lg text-base leading-7 text-[#557090]">{body}</p></article>)}</div></div>
        </div>
      </section>

      <section className="bg-[#eaf4ff] py-20 sm:py-28">
        <div className="mx-auto max-w-[1000px] px-5 sm:px-8 lg:px-10"><Eyebrow>GESTIONE TRATTATIVE ARREDAMENTO</Eyebrow><h2 className="mt-6 max-w-4xl text-4xl font-bold leading-[.96] tracking-[-0.06em] text-[#102744] sm:text-6xl">Software per la gestione delle trattative commerciali nell’arredamento.</h2><div className="mt-7 max-w-3xl space-y-4 text-base leading-7 text-[#557090]"><p>Totalone è un gestionale per arredatori e showroom che permette di organizzare le trattative commerciali e mantenere collegate opportunità, clienti, venditori e preventivi.</p><p>La gestione della pipeline aiuta il team a seguire le opportunità durante il processo di vendita e a mantenere continuità dal primo contatto fino alla commessa.</p></div></div>
      </section>

      <section className="bg-[#082c68] py-24 text-white sm:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10"><div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end"><div><Eyebrow dark>GESTIONE TRATTATIVE TOTALONE</Eyebrow><h2 className="mt-6 max-w-3xl text-5xl font-bold leading-[.94] tracking-[-0.065em] sm:text-7xl">Non lasciare che una trattativa si perda per strada.</h2><p className="mt-6 max-w-xl text-base leading-7 text-[#d5ebff]">Scopri come Totalone può aiutare il tuo showroom a organizzare opportunità, venditori e preventivi in un unico processo commerciale.</p><p className="mt-4 text-xs font-bold text-[#9fc6eb]">Una demo costruita sul modo in cui lavora il tuo showroom.</p></div><button onClick={() => setDemoOpen(true)} className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-[9px] bg-white px-5 py-3.5 text-sm font-bold text-[#0b55c6] hover:bg-[#eaf3ff]">Prenota una demo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button></div></div>
      </section>

      {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}
    </main>
  );
}