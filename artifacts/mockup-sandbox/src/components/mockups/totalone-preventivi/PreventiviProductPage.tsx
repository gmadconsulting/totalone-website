import {
  ArrowDown,
  ArrowRight,
  Check,
  FileText,
  Image as ImageIcon,
  Layers3,
  LayoutTemplate,
  Plus,
  Sparkles,
  Tag,
} from "lucide-react";
import type { ReactNode } from "react";
import { MarketingShell } from "../totalone-site-architecture/_shared/MarketingShell";
import "./PreventiviProductPage.css";

const priceRows = [
  ["Colonna cucina", "2", "1.280,00 €", "10%", "2.304,00 €"],
  ["Top in marmo", "1", "2.150,00 €", "5%", "2.042,50 €"],
  ["Forno integrato", "1", "890,00 €", "—", "890,00 €"],
];

const kitchenFeatures = [
  "Composizione cucina",
  "Aree e nicchie",
  "Marmo",
  "Elettrodomestici",
  "Extra e opzioni",
  "Quantità",
  "Sconti",
  "IVA",
];

const furnitureFeatures = [
  "Brand",
  "Modello",
  "Area",
  "Dimensioni",
  "Finiture",
  "Note",
  "Immagini",
  "Quantità",
  "Prezzo",
  "Sconto",
  "IVA",
];

const workflow = [
  "TRATTATIVA",
  "CREA PREVENTIVO",
  "INSERISCI PRODOTTI",
  "AGGIUNGI SPECIFICHE E FINITURE",
  "AGGIUNGI IMMAGINI",
  "CONTROLLA IL TOTALE",
  "IMPAGINA",
  "GENERA IL PDF",
];

function DemoTrigger({ children, variant = "" }: { children: ReactNode; variant?: string }) {
  const openDemo = () => {
    document.querySelector<HTMLButtonElement>(".to-footer-cta .to-button")?.click();
  };

  return (
    <button className={`preventivi-button ${variant}`} onClick={openDemo}>
      {children}
      <ArrowRight size={15} />
    </button>
  );
}

function Eyebrow({ children, tone = "" }: { children: ReactNode; tone?: string }) {
  return <span className={`preventivi-eyebrow ${tone}`}>{children}</span>;
}

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: ReactNode;
}) {
  return (
    <div className="preventivi-heading">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {body && <div className="preventivi-lead">{body}</div>}
    </div>
  );
}

function FeatureList({ items, tone = "" }: { items: string[]; tone?: string }) {
  return (
    <div className={`preventivi-feature-list ${tone}`}>
      {items.map((item) => (
        <span key={item}>
          <Check size={13} />
          {item}
        </span>
      ))}
    </div>
  );
}

function QuoteVisual({
  variant,
  caption,
}: {
  variant: "prices" | "options" | "kitchen" | "summary";
  caption: string;
}) {
  return (
    <figure className="preventivi-visual">
      <div className={`preventivi-visual-frame preventivi-visual-${variant}`}>
        <div className="preventivi-window-bar">
          <span className="preventivi-window-dots"><i /><i /><i /></span>
          <span>Preventivo · Casa Rinaldi</span>
          <span className="preventivi-window-status">Bozza</span>
        </div>
        {variant === "prices" && (
          <div className="preventivi-table">
            <div className="preventivi-table-head"><span>Prodotto</span><span>Q.tà</span><span>Prezzo</span><span>Sconto</span><span>Totale</span></div>
            {priceRows.map((row) => <div className="preventivi-table-row" key={row[0]}>{row.map((cell, index) => <span key={`${row[0]}-${index}`} className={index === 4 ? "is-total" : ""}>{cell}</span>)}</div>)}
            <div className="preventivi-total-line"><span>Totale preventivo</span><strong>5.236,50 €</strong></div>
            <div className="preventivi-vat-line"><span>IVA</span><strong>+ 1.152,03 €</strong></div>
          </div>
        )}
        {variant === "options" && (
          <div className="preventivi-options-layout">
            <div className="preventivi-option-sidebar">
              <span className="is-active">Configurazione principale</span>
              <span><Plus size={13} /> Extra &amp; Opzioni</span>
              <span>Versione alternativa</span>
            </div>
            <div className="preventivi-option-content">
              <div className="preventivi-option-title"><div><small>PROPOSTA CUCINA</small><strong>Composizione Linea 01</strong></div><Tag size={18} /></div>
              <div className="preventivi-option-card"><span>EXTRA SELEZIONATO</span><strong>Illuminazione sottopensile</strong><small>Integrato nella stessa proposta</small><b>+ 420,00 €</b></div>
              <div className="preventivi-option-card muted"><span>OPZIONE DISPONIBILE</span><strong>Maniglia finitura bronzo</strong><small>Da valutare con il cliente</small><b>+ 96,00 €</b></div>
            </div>
          </div>
        )}
        {variant === "kitchen" && (
          <div className="preventivi-kitchen-layout">
            <div className="preventivi-kitchen-title"><small>STRUTTURA DELLA PROPOSTA</small><strong>Cucina · Casa Rinaldi</strong><span>3 aree · 12 elementi</span></div>
            <div className="preventivi-kitchen-grid">
              {["Composizione cucina", "Area colonne", "Marmo", "Elettrodomestici", "Extra e opzioni", "Finiture"].map((item, index) => <div key={item} className={index === 0 ? "is-selected" : ""}><Layers3 size={15} /><span>{item}</span><b>{index + 1 + (index === 0 ? 3 : 0)}</b></div>)}
            </div>
          </div>
        )}
        {variant === "summary" && (
          <div className="preventivi-summary-layout">
            <div className="preventivi-summary-title"><small>RIEPILOGO PREVENTIVO</small><strong>Casa Rinaldi</strong><span>Versione 03 · 12 luglio 2026</span></div>
            {[
              ["Cucina", "8.420,00 €"],
              ["Elettrodomestici", "2.180,00 €"],
              ["Arredamento", "4.960,00 €"],
              ["Extra e servizi", "860,00 €"],
            ].map(([label, value]) => <div className="preventivi-summary-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}
            <div className="preventivi-summary-total"><span>Totale complessivo</span><strong>16.420,00 €</strong></div>
          </div>
        )}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function PreventiviProductPage() {
  return (
    <MarketingShell active="Preventivi">
      <main className="preventivi-page" id="top">
        <section className="preventivi-hero">
          <div className="preventivi-orb preventivi-orb-one" aria-hidden="true" />
          <div className="preventivi-orb preventivi-orb-two" aria-hidden="true" />
          <div className="preventivi-wrap">
            <div className="preventivi-breadcrumb"><a href="/">Home</a><span>/</span><span>Preventivi per arredatori</span></div>
            <div className="preventivi-hero-grid">
              <div className="preventivi-hero-copy">
                <Eyebrow>SOFTWARE PREVENTIVI</Eyebrow>
                <h1>Un preventivatore costruito per la complessità dell’arredamento.</h1>
                <p>Trasforma una proposta articolata in un preventivo ordinato, visuale e professionale. Cucine, sistemi, mobili, elettrodomestici e servizi rimangono nello stesso flusso.</p>
                <div className="preventivi-actions">
                  <DemoTrigger>Prenota una demo</DemoTrigger>
                  <a className="preventivi-button outline" href="#come-funziona">Scopri come funziona <ArrowDown size={15} /></a>
                </div>
                <p className="preventivi-micro">Per negozi, showroom e rivenditori di arredamento.</p>
              </div>
              <QuoteVisual variant="summary" caption="Visuale illustrativa del riepilogo preventivo: componenti, servizi, versione e totale in un unico contesto." />
            </div>
            <div className="preventivi-seo" aria-label="Metadati SEO della pagina">
              <div><span>URL</span><strong>/software-preventivi-arredamento/</strong></div>
              <div><span>SEO title</span><strong>Software Preventivi per Negozi di Arredamento | Totalone</strong></div>
              <div><span>Meta description</span><strong>Software preventivi per negozi e showroom di arredamento: crea offerte per cucine, mobili, sistemi e servizi in un unico flusso.</strong></div>
            </div>
          </div>
        </section>

        <section className="preventivi-section preventivi-warm" id="come-funziona">
          <div className="preventivi-wrap preventivi-intro-grid">
            <SectionHeading eyebrow="LA COMPLESSITÀ DELL’ARREDAMENTO" title="Una proposta può avere molte parti. Il preventivo non deve diventare difficile da leggere." />
            <div className="preventivi-copy">
              <p>Una cucina attraversa composizioni, aree, dimensioni, finiture, elettrodomestici e opzioni. Un progetto di arredamento aggiunge brand, modelli, immagini, servizi e più alternative.</p>
              <p>Totalone riunisce questi elementi in una proposta organizzata, pronta da modificare, condividere e presentare al cliente.</p>
            </div>
          </div>
          <div className="preventivi-wrap preventivi-benefits">
            <article><span>01</span><h3>Costruisci</h3><p>Inserisci prodotti, quantità, specifiche, immagini e servizi nello stesso preventivo.</p></article>
            <article><span>02</span><h3>Organizza</h3><p>Dividi la proposta per composizioni, aree, categorie e opzioni senza perdere il filo.</p></article>
            <article><span>03</span><h3>Presenta</h3><p>Controlla il totale, scegli il layout e genera un PDF professionale per il cliente.</p></article>
          </div>
        </section>

        <section className="preventivi-section preventivi-sky">
          <div className="preventivi-wrap preventivi-split">
            <div>
              <SectionHeading eyebrow="PREVENTIVI CUCINE" title="Una cucina organizzata in composizioni, aree e componenti." body={<><p>Organizza la cucina in composizioni e aree, separando elementi, marmo, elettrodomestici, extra e opzioni.</p><p>Ogni componente rimane organizzata all’interno dello stesso preventivo, così anche una proposta articolata resta semplice da costruire, modificare e presentare.</p></>} />
              <FeatureList items={kitchenFeatures} />
            </div>
            <QuoteVisual variant="kitchen" caption="Visuale illustrativa della struttura di una proposta cucina, con aree e componenti organizzati." />
          </div>
        </section>

        <section className="preventivi-section">
          <div className="preventivi-wrap preventivi-split preventivi-reverse">
            <div>
              <SectionHeading eyebrow="PREVENTIVI ARREDAMENTO" title="Tutte le specifiche del prodotto, nello stesso contesto." body={<><p>Inserisci nel preventivo le informazioni che servono davvero quando vendi arredamento: brand, modello, composizione, area, dimensioni, finiture, note e immagini.</p><p>Prodotti e relative specifiche rimangono organizzati all’interno della stessa proposta, insieme a quantità, prezzi e sconti.</p></>} />
              <FeatureList items={furnitureFeatures} tone="warm" />
            </div>
            <div className="preventivi-card-stack">
              <div className="preventivi-detail-card"><div className="preventivi-detail-image"><ImageIcon size={19} /></div><div><span>PRODOTTO · BRAND</span><strong>Madia Linea 04</strong><small>Dimensioni · finitura · area · note</small></div><Tag size={16} /></div>
              <div className="preventivi-detail-card"><div className="preventivi-detail-image soft"><LayoutTemplate size={19} /></div><div><span>AMBIENTE · SPECIFICHE</span><strong>Soggiorno</strong><small>Immagine e dettagli della composizione</small></div><Tag size={16} /></div>
              <p className="preventivi-visual-note">Visuale illustrativa dei dati che puoi mantenere insieme nella proposta.</p>
            </div>
          </div>
        </section>

        <section className="preventivi-section preventivi-sky">
          <div className="preventivi-wrap preventivi-split">
            <div>
              <SectionHeading eyebrow="CONTROLLO DEL PREVENTIVO" title="Prezzi, sconti e totali sempre sotto controllo." body={<><p>Gestisci prezzi, quantità, sconti e IVA direttamente all’interno del preventivo.</p><p>Totalone aggiorna i valori delle diverse componenti della proposta e ti permette di mantenere sotto controllo il totale mentre costruisci l’offerta.</p></>} />
              <div className="preventivi-equation" aria-label="Prezzo per quantità meno sconto uguale totale"><span>PREZZO</span><i>×</i><span>QUANTITÀ</span><i>−</i><span>SCONTO</span><i>=</i><strong>TOTALE</strong></div>
            </div>
            <QuoteVisual variant="prices" caption="Visuale illustrativa dell’area prezzi: quantità, sconti, totali e IVA restano leggibili nella proposta." />
          </div>
        </section>

        <section className="preventivi-section preventivi-connected">
          <div className="preventivi-wrap preventivi-split">
            <div>
              <SectionHeading eyebrow="UNA PROPOSTA PIÙ FLESSIBILE" title="Gestisci alternative, extra e opzioni nello stesso preventivo." body={<><p>Una proposta di arredamento cambia continuamente.</p><p>Aggiungi elementi extra e opzioni alla configurazione principale, organizzandoli insieme al resto dell’offerta senza creare documenti separati.</p><p>Il preventivo rimane leggibile anche quando il cliente sta valutando più possibilità.</p></>} />
              <div className="preventivi-callout"><Sparkles size={17} /><span>Configurazione principale, extra e alternative nello stesso flusso.</span></div>
            </div>
            <QuoteVisual variant="options" caption="Visuale illustrativa dell’area Extra & Opzioni, con configurazione principale e alternative." />
          </div>
        </section>

        <section className="preventivi-section">
          <div className="preventivi-wrap">
            <SectionHeading eyebrow="VERSIONI E DOCUMENTI" title="Dalla prima idea al PDF che il cliente può capire." body="Conserva le diverse versioni della proposta, controlla lo stato del preventivo e prepara un documento coerente con la tua presentazione commerciale." />
            <div className="preventivi-document-grid">
              <article><FileText size={19} /><span>VERSIONI</span><h3>Confronta le alternative</h3><p>La proposta evolve senza perdere il riferimento alle configurazioni precedenti.</p></article>
              <article><LayoutTemplate size={19} /><span>IMPAGINAZIONE</span><h3>Un documento ordinato</h3><p>Organizza sezioni, immagini e dettagli in un layout leggibile.</p></article>
              <article><ArrowRight size={19} /><span>PDF</span><h3>Presenta con chiarezza</h3><p>Genera il documento che accompagna il cliente nella scelta.</p></article>
            </div>
          </div>
        </section>

        <section className="preventivi-section preventivi-warm">
          <div className="preventivi-wrap preventivi-split">
            <div>
              <SectionHeading eyebrow="TOTALE SEMPRE SOTTO CONTROLLO" title="Tutto il preventivo, in un unico riepilogo." body={<><p>Totalone raccoglie le diverse componenti della proposta e rende immediatamente leggibile il valore complessivo del preventivo.</p><p>Cucina, elettrodomestici, arredamento, sistemi, extra e servizi confluiscono in un unico riepilogo.</p></>} />
              <div className="preventivi-summary-tags"><span>Cucina</span><span>Elettrodomestici</span><span>Arredamento</span><span>Sistemi</span><span>Extra</span><span>Servizi</span></div>
            </div>
            <QuoteVisual variant="summary" caption="Visuale illustrativa del riepilogo: tutte le componenti della proposta confluiscono nello stesso totale." />
          </div>
        </section>

        <section className="preventivi-section preventivi-sky">
          <div className="preventivi-wrap">
            <SectionHeading eyebrow="UN UNICO FLUSSO" title="Dal contatto al preventivo pronto da presentare." body="Il preventivo segue il modo in cui lavora il tuo showroom: dalla trattativa alla proposta, dalle specifiche al PDF, senza interrompere il contesto." />
            <div className="preventivi-workflow" aria-label="Workflow del preventivo">
              {workflow.map((step, index) => <div className="preventivi-workflow-step" key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong>{index < workflow.length - 1 && <i aria-hidden="true">→</i>}</div>)}
            </div>
          </div>
        </section>

        <section className="preventivi-section preventivi-multi">
          <div className="preventivi-wrap preventivi-split-wide">
            <div>
              <SectionHeading eyebrow="PIÙ SHOWROOM, LO STESSO STANDARD" title="Ogni sede presenta il proprio lavoro con coerenza." body={<><p>Gestisci branding, documenti e proposte per più showroom mantenendo un’esperienza riconoscibile.</p><p>Il team lavora con lo stesso metodo mentre ogni punto vendita conserva il proprio contesto commerciale.</p></>} />
              <div className="preventivi-brand-row"><span>Showroom Milano</span><span>Showroom Roma</span><span>Showroom Torino</span></div>
            </div>
            <div className="preventivi-brand-card"><div className="preventivi-brand-header"><span className="preventivi-brand-mark">t</span><div><strong>totalone</strong><small>Proposta commerciale · Versione 03</small></div></div><div className="preventivi-brand-body"><span>Una proposta chiara, pronta per il tuo cliente.</span><b>Cucina · Soggiorno · Servizi</b></div><div className="preventivi-brand-footer">Layout e identità dello showroom</div></div>
          </div>
        </section>

        <section className="preventivi-section preventivi-pipeline">
          <div className="preventivi-wrap">
            <SectionHeading eyebrow="PIPELINE E CONVERSIONE" title="Segui i preventivi e capisci quali proposte fanno avanzare le trattative." body={<><p>Il preventivo non è solo un documento: è un passaggio commerciale da seguire.</p><p>Totalone collega proposta, stato e trattativa per aiutarti a mantenere leggibile il percorso dalla prima richiesta alla decisione.</p></>} />
            <div className="preventivi-pipeline-flow"><span>IN PREPARAZIONE</span><i>→</i><span>INVIATO</span><i>→</i><span>IN VALUTAZIONE</span><i>→</i><strong>CONVERTITO</strong></div>
            <p className="preventivi-supporting-line">Più chiarezza sulle proposte aperte. Più continuità nel lavoro commerciale.</p>
            <div className="preventivi-context-links"><a href="/crm-arredamento/">Scopri il CRM Totalone <ArrowRight size={13} /></a><a href="/gestione-trattative-arredamento/">Gestisci le trattative <ArrowRight size={13} /></a></div>
          </div>
        </section>

        <section className="preventivi-section preventivi-seo-section">
          <div className="preventivi-wrap preventivi-seo-grid">
            <div><Eyebrow>SOFTWARE PER ARREDATORI</Eyebrow><h2>Software preventivi per negozi di arredamento e showroom</h2></div>
            <div className="preventivi-lead"><p>Totalone è un software per preventivi dedicato al settore dell’arredamento. Aiuta negozi, showroom e rivenditori a creare offerte per cucine, sistemi, mobili e servizi, organizzando prodotti, specifiche, immagini, prezzi e documentazione in un unico flusso.</p><a className="preventivi-text-link" href="/gestione-commesse-arredamento/">Dal preventivo alla commessa <ArrowRight size={15} /></a></div>
          </div>
        </section>

        <section className="preventivi-final">
          <div className="preventivi-wrap preventivi-final-grid">
            <div>
              <Eyebrow>IL PROSSIMO PASSO</Eyebrow>
              <h2>Trasforma ogni proposta in un preventivo più chiaro.</h2>
              <p>Scopri come Totalone può aiutare il tuo showroom a costruire, organizzare e presentare preventivi complessi con più continuità.</p>
              <div className="preventivi-actions"><DemoTrigger variant="light">Prenota una demo</DemoTrigger><a className="preventivi-button outline" href="#top">Torna all’inizio <ArrowRight size={15} /></a></div>
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}