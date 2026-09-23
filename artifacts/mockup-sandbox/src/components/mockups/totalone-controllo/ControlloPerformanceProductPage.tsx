import { useEffect, type ReactNode } from "react";
import { ArrowDown, ArrowRight, Check, ChevronRight } from "lucide-react";
import { MarketingShell } from "../totalone-site-architecture/_shared/MarketingShell";
import "./ControlloPerformanceProductPage.css";

const preview = (path: string) => `/__mockup/preview/${path}`;

const links = {
  crm: preview("totalone-crm/CrmProductPage"),
  trattative: preview("totalone-trattative/GestioneTrattative"),
  preventivi: preview("totalone-preventivi/PreventiviProductPage"),
  commesse: preview("totalone-commesse/CommesseProductPage"),
  magazzino: preview("totalone-magazzino/MagazzinoProductPage"),
  montaggi: preview("totalone-montaggi/MontaggiProductPage"),
  assistenza: preview("totalone-assistenza/AssistenzaPostVenditaProductPage"),
  perche: preview("totalone-perche/PercheTotalonePage"),
  prezzi: "/prezzi/",
};

function DemoTrigger({ children, variant = "" }: { children: ReactNode; variant?: string }) {
  const openDemo = () => document.querySelector<HTMLButtonElement>(".to-header-actions .to-button")?.click();
  return <button className={`controllo-button ${variant}`} onClick={openDemo}>{children}<ArrowRight size={15} /></button>;
}

function Eyebrow({ children, tone = "" }: { children: ReactNode; tone?: string }) {
  return <span className={`controllo-eyebrow ${tone}`}>{children}</span>;
}

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: ReactNode }) {
  return <div className="controllo-heading"><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{body && <div className="controllo-lead">{body}</div>}</div>;
}

function ScreenshotPlaceholder({ label, caption, className = "" }: { label: string; caption?: string; className?: string }) {
  return <figure className={`controllo-shot ${className}`}><div className="controllo-shot-frame" role="img" aria-label={label}><div className="controllo-placeholder-copy"><span>{label}</span><small>Spazio riservato allo screenshot reale Totalone</small></div></div>{caption && <figcaption>{caption}</figcaption>}</figure>;
}

function FlowStrip({ items, className = "" }: { items: string[]; className?: string }) {
  return <div className={`controllo-flow ${className}`} aria-label="Flusso di analisi">{items.map((item, index) => <span key={item}><b>{item}</b>{index < items.length - 1 && <i aria-hidden="true">→</i>}</span>)}</div>;
}

function MetricList({ items, className = "" }: { items: string[]; className?: string }) {
  return <div className={`controllo-metrics ${className}`}>{items.map((item) => <span key={item}><Check size={14} />{item}</span>)}</div>;
}

function LinkPill({ href, children }: { href: string; children: ReactNode }) {
  return <a className="controllo-link-pill" href={href}>{children}<ArrowRight size={13} /></a>;
}

function SeoMeta() {
  useEffect(() => {
    const title = "Controllo Performance per Arredatori e Showroom | Totalone";
    const description = "Analizza vendite, fatturato, marginalità, CRM, operatività e budget con Totalone. Una visione completa delle performance del tuo showroom di arredamento.";
    const canonical = "https://totalone.it/controllo-performance-arredamento";
    document.title = title;
    const upsert = (selector: string, attributes: Record<string, string>) => {
      let node = document.head.querySelector<HTMLMetaElement>(selector);
      if (!node) {
        node = document.createElement("meta");
        document.head.appendChild(node);
      }
      Object.entries(attributes).forEach(([key, value]) => node?.setAttribute(key, value));
      return node;
    };
    const descriptionMeta = upsert('meta[name="description"]', { name: "description", content: description });
    const ogTitle = upsert('meta[property="og:title"]', { property: "og:title", content: title });
    const ogDescription = upsert('meta[property="og:description"]', { property: "og:description", content: description });
    const canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]') ?? document.head.appendChild(document.createElement("link"));
    canonicalLink.setAttribute("rel", "canonical");
    canonicalLink.setAttribute("href", canonical);
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.dataset.totalonePage = "controllo-performance";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: canonical,
      isPartOf: { "@type": "WebSite", name: "Totalone", url: "https://totalone.it/" },
      about: { "@type": "Thing", name: "Controllo performance arredamento" },
    });
    document.head.appendChild(schema);
    return () => {
      descriptionMeta.remove();
      ogTitle.remove();
      ogDescription.remove();
      schema.remove();
    };
  }, []);
  return null;
}

function CommercialQuestions() {
  return <div className="controllo-questions"><div><span>01</span><strong>Quali showroom stanno vendendo di più?</strong></div><div><span>02</span><strong>Quali brand stanno generando più valore?</strong></div><div><span>03</span><strong>Quali venditori convertono meglio?</strong></div><div><span>04</span><strong>Da quali canali arrivano le trattative che diventano clienti?</strong></div></div>;
}

function EcosystemFlow() {
  const items = [
    ["CRM", links.crm],
    ["TRATTATIVE", links.trattative],
    ["PREVENTIVI", links.preventivi],
    ["COMMESSE", links.commesse],
    ["MAGAZZINO", links.magazzino],
    ["MONTAGGI", links.montaggi],
    ["ASSISTENZA", links.assistenza],
  ];
  return <div className="controllo-ecosystem">{items.map(([label, href], index) => <span key={label}><a href={href}>{label}<ChevronRight size={13} /></a>{index < items.length - 1 && <i>→</i>}</span>)}<strong>CONTROLLO E PERFORMANCE</strong></div>;
}

export function ControlloPerformanceProductPage() {
  return <MarketingShell active="Controllo e performance">
    <SeoMeta />
    <main className="controllo-page" id="top">
      <section className="controllo-hero">
        <div className="controllo-orb controllo-orb-one" aria-hidden="true" />
        <div className="controllo-orb controllo-orb-two" aria-hidden="true" />
        <div className="controllo-wrap">
          <nav className="controllo-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>Controllo e performance</span></nav>
          <div className="controllo-hero-grid">
            <div className="controllo-hero-copy">
              <Eyebrow>CONTROLLO E PERFORMANCE</Eyebrow>
              <h1>Sai come sta andando il tuo showroom.<br /><span>Non a fine mese. Adesso.</span></h1>
              <p>Vendite, fatturato, marginalità, CRM, operatività e budget. Totalone trasforma i dati generati ogni giorno dal tuo team in una visione completa delle performance dell’azienda.</p>
              <div className="controllo-actions"><DemoTrigger>Prenota una demo</DemoTrigger><a className="controllo-button outline" href="#overview">Scopri come funziona <ArrowDown size={15} /></a></div>
              <p className="controllo-micro">Dal dato generale fino al singolo showroom, venditore, brand o categoria.</p>
            </div>
            <ScreenshotPlaceholder label="[SCREENSHOT — ANALYTICS OVERVIEW]" caption="Inserisci qui lo screenshot reale della panoramica Analytics." className="controllo-hero-shot" />
          </div>
        </div>
      </section>

      <section className="controllo-section controllo-warm" id="overview">
        <div className="controllo-wrap">
          <div className="controllo-intro-grid"><SectionHeading eyebrow="UNA SOLA VISTA" title="Non devi più ricostruire i numeri della tua azienda." /><div className="controllo-copy"><p>Quando clienti, preventivi, vendite, commesse e attività operative vengono gestiti in strumenti diversi, anche capire come sta andando l’azienda richiede tempo.</p><p>Totalone parte dai dati generati durante il lavoro quotidiano e li riunisce in un unico ambiente di analisi.</p><p>Venduto, preventivato, fatturato, conversioni, marginalità e indicatori operativi diventano così parti della stessa lettura.</p></div></div>
          <FlowStrip items={["LAVORO QUOTIDIANO", "DATI CONDIVISI", "ANALISI", "DECISIONI"]} className="controllo-flow-large" />
        </div>
      </section>

      <section className="controllo-section" id="panoramica">
        <div className="controllo-wrap">
          <SectionHeading eyebrow="OVERVIEW" title="Parti dall’insieme. Poi vai in profondità." body={<><p>La panoramica riunisce gli indicatori principali dell’azienda e permette di leggere immediatamente l’andamento del periodo selezionato.</p><p>Filtra i dati per periodo, showroom e venditore e confronta ciò che sta succedendo nelle diverse aree dell’azienda.</p></>} />
          <MetricList items={["Venduto", "Preventivato", "Fatturato", "Conversione preventivo → venduto", "Andamento temporale", "Venduto per showroom", "Venduto geografico", "Sintesi del periodo"]} />
          <ScreenshotPlaceholder label="[SCREENSHOT — ANALYTICS OVERVIEW]" caption="Visual dominante per la panoramica delle performance." className="controllo-large-shot" />
        </div>
      </section>

      <section className="controllo-section controllo-sky" id="vendite">
        <div className="controllo-wrap controllo-split">
          <div><SectionHeading eyebrow="VENDITE" title="Capisci cosa vendi. Dove. E attraverso chi." body={<p>Totalone permette di approfondire le performance commerciali partendo dal venduto complessivo fino alle dimensioni che aiutano a capire da dove nasce il risultato.</p>} /><MetricList items={["Venduto IVA inclusa", "Venduto netto", "Ticket medio", "Numero ordini", "Venduto per brand", "Venduto geografico", "Ticket medio per venditore", "Venduto per categoria", "Ordini e clienti"]} /></div>
          <ScreenshotPlaceholder label="[SCREENSHOT — ANALYTICS VENDITE]" caption="Inserisci qui uno screenshot reale dell’analisi Vendite." />
        </div>
        <div className="controllo-wrap"><FlowStrip items={["AZIENDA", "SHOWROOM", "VENDITORE", "BRAND", "CATEGORIA", "CLIENTE"]} className="controllo-taxonomy" /><p className="controllo-statement">Non soltanto quanto hai venduto, ma come si compone il venduto.</p></div>
      </section>

      <section className="controllo-section" id="fatturato">
        <div className="controllo-wrap controllo-split controllo-split-reverse">
          <ScreenshotPlaceholder label="[SCREENSHOT — ANALYTICS FATTURATO]" caption="Placeholder per l’analisi del rapporto tra venduto e fatturato." />
          <div><SectionHeading eyebrow="FATTURATO" title="Venduto e fatturato non sono la stessa cosa." body={<><p>Una vendita conclusa non significa necessariamente che tutto sia già stato documentato o fatturato.</p><p>Totalone permette di mettere in relazione il valore dei contratti con quanto risulta fatturato nel periodo e di evidenziare ciò che resta ancora da documentare.</p></>} /><div className="controllo-highlight-grid"><strong>Fatturato DDT</strong><strong>Venduto contratti</strong><strong>Gap venduto / fatturato</strong></div><p className="controllo-small-copy">L’analisi può essere approfondita per brand, permettendo di confrontare il valore della merce venduta con quella già documentata.</p></div>
        </div>
      </section>

      <section className="controllo-section controllo-deep" id="marginalita">
        <div className="controllo-wrap controllo-split">
          <div><SectionHeading eyebrow="MARGINALITÀ" title="Il fatturato racconta quanto vendi. Il margine racconta come vendi." body={<p>Totalone affianca ai dati commerciali una lettura della marginalità, permettendo alla direzione di osservare il risultato economico da più prospettive.</p>} /><MetricList items={["EBITDA", "Margine lordo", "Margine merce", "Costi fissi del periodo", "Margine per brand", "Margine per categoria"]} className="controllo-metrics-light" /><p className="controllo-small-copy light">La lettura dei costi fissi e variabili è disponibile secondo quanto previsto dal sistema.</p></div>
          <ScreenshotPlaceholder label="[SCREENSHOT — ANALYTICS MARGINI]" caption="Una delle visual principali della pagina: inserisci lo screenshot reale dei Margini." className="controllo-dark-shot" />
        </div>
      </section>

      <section className="controllo-section controllo-warm" id="crm-funnel">
        <div className="controllo-wrap">
          <SectionHeading eyebrow="CRM FUNNEL" title="Dal primo ingresso alla vendita." body={<p>I dati commerciali diventano ancora più utili quando puoi capire il percorso che li ha generati. Totalone collega l’analisi alle attività CRM per leggere ingressi, trattative e chiusure.</p>} />
          <FlowStrip items={["INGRESSO", "TRATTATIVA", "CHIUSURA", "VENDUTO"]} className="controllo-flow-large" />
          <div className="controllo-funnel-grid"><div><h3>Quali canali generano davvero vendite?</h3><p>Confronta canali lead come showroom, referral e passaparola, digitale e altre fonti registrate nel sistema.</p><MetricList items={["Lifecycle trattativa", "Lifecycle da ingresso", "Ingressi nel periodo", "Tasso di chiusura globale", "Chiusura per canale lead", "Stagionalità"]} /></div><div><h3>Come performano i venditori?</h3><p>Analizza il tasso di chiusura e la conversione per venditore, partendo dai dati registrati nel percorso commerciale.</p><MetricList items={["Tasso di chiusura per venditore", "Performance per canale lead"]} /></div></div>
          <ScreenshotPlaceholder label="[SCREENSHOT — ANALYTICS CRM FUNNEL]" caption="Placeholder per il funnel CRM reale." className="controllo-large-shot" />
        </div>
      </section>

      <section className="controllo-section controllo-questions-section">
        <div className="controllo-wrap"><SectionHeading eyebrow="PERFORMANCE COMMERCIALE" title={<>Non fermarti al risultato.<br /><span>Capisci cosa lo ha generato.</span></>} body={<p>Quando i dati commerciali fanno parte dello stesso sistema utilizzato dal team ogni giorno, puoi passare dal risultato alla sua origine senza ricostruire manualmente le informazioni.</p>} /><CommercialQuestions /></div>
      </section>

      <section className="controllo-section controllo-sky" id="operativo">
        <div className="controllo-wrap controllo-split"><div><SectionHeading eyebrow="OPERATIVO" title="Le performance non finiscono con la vendita." body={<><p>Una commessa deve ancora essere consegnata, montata e, in alcuni casi, gestita nel post-vendita.</p><p>Per questo Totalone porta nel controllo anche alcuni indicatori operativi, affiancando alla performance commerciale una lettura di ciò che accade dopo la vendita.</p></>} /><MetricList items={["Consegne nel periodo", "Percentuale prodotti in assistenza", "Lifecycle assistenza", "Installazioni senza assistenza", "Rapporto installazioni-assistenze", "Consegne nel tempo", "Ordini nel tempo"]} /></div><ScreenshotPlaceholder label="[SCREENSHOT — ANALYTICS OPERATIVO]" caption="Inserisci qui lo screenshot reale degli indicatori operativi." /></div>
      </section>

      <section className="controllo-section" id="budget">
        <div className="controllo-wrap controllo-split controllo-split-reverse"><ScreenshotPlaceholder label="[SCREENSHOT — ANALYTICS BUDGET]" caption="Placeholder per il confronto Budget vs Actual." /><div><SectionHeading eyebrow="BUDGET" title="Trasforma gli obiettivi in qualcosa che puoi seguire." body={<><p>Definisci un target per una metrica e confrontalo con il risultato effettivo del periodo.</p><p>Totalone permette di impostare obiettivi temporali e visualizzare il confronto tra budget e actual.</p></>} /><MetricList items={["Scelta metrica", "Tipo periodo", "Periodo di riferimento", "Importo target", "Actual del periodo", "Confronto Budget vs Actual"]} /><div className="controllo-objective"><strong>OBIETTIVO</strong><span>vs</span><strong>RISULTATO</strong></div><p className="controllo-small-copy">Il budget può essere letto accanto ai dati effettivi generati dall’attività.</p></div></div>
      </section>

      <section className="controllo-section controllo-warm" id="filtri">
        <div className="controllo-wrap"><SectionHeading eyebrow="DAL GENERALE AL DETTAGLIO" title="Guarda l’azienda dalla prospettiva che ti serve." body={<p>La stessa informazione può assumere significati diversi a seconda del periodo, della sede o della persona che la genera. Per questo le analisi di Totalone possono essere filtrate secondo le dimensioni disponibili nel sistema.</p>} /><div className="controllo-filter-rail">{["PERIODO", "SHOWROOM", "VENDITORE", "GRANULARITÀ", "DATA DI RIFERIMENTO"].map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}</div><p className="controllo-statement">Un’unica base dati, più modi di leggerla.</p></div>
      </section>

      <section className="controllo-section controllo-sky" id="multi-showroom">
        <div className="controllo-wrap controllo-split"><div><SectionHeading eyebrow="MULTI-SHOWROOM" title="Un’azienda. Più showroom. Una sola lettura." body={<><p>Quando l’azienda cresce su più sedi, confrontare le performance diventa più complesso.</p><p>Totalone permette di analizzare i dati complessivi oppure concentrarsi su uno specifico showroom, mantenendo una struttura condivisa.</p></>} /><LinkPill href={links.perche}>Scopri l’architettura Totalone</LinkPill></div><ScreenshotPlaceholder label="[SCREENSHOT — PERFORMANCE PER SHOWROOM]" caption="Inserisci qui una vista reale del confronto tra showroom." /></div>
      </section>

      <section className="controllo-section controllo-why">
        <div className="controllo-wrap"><SectionHeading eyebrow="PERCHÉ CONTA" title="Dal “come stiamo andando?” al dato." /><div className="controllo-why-grid"><div><span>SENZA UNA VISIONE CONDIVISA</span><MetricList items={["Dati distribuiti tra più strumenti", "Report costruiti manualmente", "Numeri difficili da confrontare", "Informazioni aggiornate in momenti diversi", "Performance commerciali e operative separate"]} /></div><div><span>CON TOTALONE</span><MetricList items={["Dati provenienti dallo stesso flusso di lavoro", "Una vista condivisa", "Filtri per periodo, showroom e venditore", "Analisi commerciali e operative collegate", "Possibilità di approfondire il risultato"]} /></div></div></div>
      </section>

      <section className="controllo-section controllo-warm" id="ecosistema">
        <div className="controllo-wrap"><SectionHeading eyebrow="UN SISTEMA COLLEGATO" title="Il controllo funziona perché nasce dal lavoro quotidiano." body={<><p>Totalone non parte da un report separato.</p><p>Le informazioni arrivano dai processi che il team utilizza ogni giorno. Il dato non deve essere ricostruito: fa già parte del processo.</p></>} /><EcosystemFlow /></div>
      </section>

      <section className="controllo-section controllo-seo">
        <div className="controllo-wrap controllo-seo-copy"><SectionHeading eyebrow="CONTROLLO DI GESTIONE" title="Controllo di gestione per negozi e showroom di arredamento" body={<><p>Gestire le performance di un negozio di arredamento significa mettere in relazione informazioni commerciali, economiche e operative.</p><p>Venduto e preventivato raccontano una parte del risultato. Fatturato, marginalità, conversioni, performance dei venditori e andamento operativo permettono di leggerlo da prospettive diverse.</p><p>Totalone riunisce queste informazioni nello stesso ambiente utilizzato per gestire il lavoro dello showroom, offrendo alla direzione una visione più completa dell’azienda.</p></>} /></div>
      </section>

      <section className="controllo-final"><div className="controllo-wrap controllo-final-grid"><div><Eyebrow>CONTROLLO E PERFORMANCE</Eyebrow><h2>Meno tempo a ricostruire i numeri.<br /><span>Più tempo per capire cosa significano.</span></h2><p>Scopri come Totalone può aiutarti a leggere vendite, marginalità, CRM e operatività attraverso un unico sistema.</p></div><div className="controllo-actions"><DemoTrigger variant="light">Prenota una demo</DemoTrigger><a className="controllo-button outline" href={links.perche}>Scopri Totalone <ArrowRight size={15} /></a></div></div></section>
    </main>
  </MarketingShell>;
}