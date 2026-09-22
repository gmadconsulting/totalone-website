import { ArrowDown, ArrowRight, Check, ExternalLink, Minus, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { MarketingShell } from "../totalone-site-architecture/_shared/MarketingShell";
import "./CommesseProductPage.css";

const overviewImage = "/__mockup/images/crm-pipeline-overview.png";
const listImage = "/__mockup/images/crm-pipeline-list.png";

const labels = ["Cliente", "Responsabile", "Stato", "Preventivato", "Venduto", "Acconti", "Saldo"];
const moneyConcepts = [
  ["Acconti ricevuti", "Quanto è già stato incassato."],
  ["Acconti da ricevere", "Quanto deve ancora essere riscosso."],
  ["Saldo commessa", "La situazione economica del singolo cliente."],
];
const flow = ["Trattativa", "Preventivo", "Finalizzazione", "Vendita", "Acconto", "Saldo", "Montaggio"];

function DemoTrigger({ children, variant = "" }: { children: ReactNode; variant?: string }) {
  const openDemo = () => {
    document.querySelector<HTMLButtonElement>(".to-footer-cta .to-button")?.click();
  };
  return <button className={`commesse-button ${variant}`} onClick={openDemo}>{children}<ArrowRight size={15} /></button>;
}

function Eyebrow({ children, tone = "" }: { children: ReactNode; tone?: string }) {
  return <span className={`commesse-eyebrow ${tone}`}>{children}</span>;
}

function SectionHeading({ eyebrow, title, body, tone = "" }: { eyebrow: string; title: string; body?: ReactNode; tone?: string }) {
  return (
    <div className="commesse-heading">
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {body && <div className="commesse-lead">{body}</div>}
    </div>
  );
}

function RealShot({ src, alt, caption, className = "" }: { src: string; alt: string; caption: string; className?: string }) {
  return (
    <figure className={`commesse-shot ${className}`}>
      <div className="commesse-shot-frame">
        <img src={src} alt={alt} />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className="commesse-text-link" href={href}>{children}<ArrowRight size={15} /></a>;
}

function FlowStrip({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`commesse-flow-strip ${className}`} aria-label="Percorso della commessa">
      {items.map((item, index) => (
        <span className="commesse-flow-item" key={item}>
          <b>{String(index + 1).padStart(2, "0")}</b>{item}
          {index < items.length - 1 && <i aria-hidden="true">→</i>}
        </span>
      ))}
    </div>
  );
}

export function CommesseProductPage() {
  return (
    <MarketingShell active="Gestione commesse">
      <main className="commesse-page" id="top">
        <section className="commesse-hero">
          <div className="commesse-orb commesse-orb-one" aria-hidden="true" />
          <div className="commesse-orb commesse-orb-two" aria-hidden="true" />
          <div className="commesse-wrap">
            <div className="commesse-breadcrumb"><a href="/">Home</a><span>/</span><span>Gestione commesse</span></div>
            <div className="commesse-hero-grid">
              <div className="commesse-hero-copy">
                <Eyebrow>GESTIONE COMMESSE</Eyebrow>
                <h1>Gestione commesse per arredatori, tutto sotto controllo.</h1>
                <p>Segui ogni commessa dal primo preventivo alla chiusura. Totalone riunisce stato della trattativa, valori economici, acconti, saldo e responsabili in un’unica vista.</p>
                <div className="commesse-actions">
                  <DemoTrigger>Prenota una demo</DemoTrigger>
                  <a className="commesse-button outline" href="#panoramica">Scopri come funziona <ArrowDown size={15} /></a>
                </div>
                <p className="commesse-micro">Pensato per showroom, negozi di arredamento e realtà multi-store.</p>
              </div>
              <RealShot
                src={overviewImage}
                alt="Dashboard reale Totalone con KPI delle commesse, incassi e clienti e righe delle trattative"
                caption="La vista reale Totalone: KPI economici, incassi, clienti e commesse nella stessa schermata."
                className="commesse-hero-shot"
              />
            </div>
            <div className="commesse-seo" aria-label="Metadati SEO della pagina">
              <div><span>URL</span><strong>/gestione-commesse-arredamento</strong></div>
              <div><span>SEO title</span><strong>Gestione Commesse per Arredatori e Showroom | Totalone</strong></div>
              <div><span>Meta description</span><strong>Gestisci commesse, preventivi, vendite, acconti e saldi con Totalone. Il software per il controllo delle commesse di negozi e showroom di arredamento.</strong></div>
            </div>
          </div>
        </section>

        <section className="commesse-section commesse-warm">
          <div className="commesse-wrap">
            <div className="commesse-intro-grid">
              <SectionHeading eyebrow="UNA VISIONE COMPLETA" title="Non perdere il controllo dopo il preventivo." />
              <div className="commesse-copy">
                <p>Una commessa di arredamento può durare settimane o mesi e attraversare diverse fasi economiche e commerciali.</p>
                <p>Totalone raccoglie le informazioni principali in un’unica vista, così puoi capire immediatamente cosa è ancora in trattativa, cosa è stato finalizzato, quanto hai venduto e quanto devi ancora incassare.</p>
              </div>
            </div>
            <div className="commesse-benefits">
              <article><span>01</span><h3>Sai a che punto è ogni commessa</h3><p>Stato, cliente, commerciale e valori economici sono sempre visibili e aggiornati.</p></article>
              <article><span>02</span><h3>Controlli i numeri mentre lavori</h3><p>Preventivato, finalizzato, venduto, acconti e saldo non vivono in file separati.</p></article>
              <article><span>03</span><h3>Tutto il team vede le stesse informazioni</h3><p>Ogni commessa mantiene il proprio contesto e rimane accessibile alle persone coinvolte.</p></article>
            </div>
          </div>
        </section>

        <section className="commesse-section" id="panoramica">
          <div className="commesse-wrap commesse-split">
            <div>
              <SectionHeading eyebrow="PANORAMICA COMMESSE" title="Tutte le tue commesse. Una sola vista." body={<><p>Visualizza le commesse dello showroom in un’unica schermata e individua immediatamente le informazioni che contano.</p><p>Per ogni cliente puoi vedere responsabile, stato della trattativa, valore preventivato, venduto, acconti ricevuti e saldo.</p></>} />
              <div className="commesse-label-list">{labels.map((label) => <span key={label}>{label}</span>)}</div>
            </div>
            <RealShot src={listImage} alt="Elenco reale Totalone delle commesse con clienti, stati e colonne economiche" caption="Dalla panoramica generale al dettaglio della singola commessa, senza cambiare strumento." />
          </div>
        </section>

        <section className="commesse-section commesse-sky" id="controllo-economico">
          <div className="commesse-wrap">
            <SectionHeading eyebrow="CONTROLLO ECONOMICO" title="Dal preventivato al venduto, sai sempre dove sei." body={<><p>Un grande volume di preventivi non significa necessariamente vendite.</p><p>Totalone distingue le diverse fasi economiche delle tue commesse e ti permette di leggere immediatamente quanto hai preventivato, quanto è stato finalizzato, quanto è stato venduto e quale valore deve ancora essere confermato.</p></>} />
            <FlowStrip items={["PREVENTIVATO", "FINALIZZATO", "VENDUTO"]} className="economic-flow" />
            <div className="commesse-side-status"><span>DA FINALIZZARE</span><span>NON CONFERMATO</span><p>Una lettura più chiara della pipeline economica permette di capire non solo quanto stai quotando, ma quanto valore si sta realmente trasformando in fatturato.</p></div>
            <RealShot src={overviewImage} alt="Area KPI reale Totalone con Totale preventivi, Finalizzato, Venduto, Da finalizzare e Non confermato" caption="L’area KPI reale rende leggibile il passaggio dal preventivato al venduto: non numeri ricreati, ma il prodotto." className="commesse-wide-shot" />
          </div>
        </section>

        <section className="commesse-section">
          <div className="commesse-wrap commesse-split commesse-reverse">
            <div>
              <SectionHeading eyebrow="ACCONTI E SALDI" title="Non basta sapere quanto hai venduto. Devi sapere quanto hai incassato." body={<><p>Totalone mantiene visibile la situazione economica delle commesse anche dopo la vendita.</p><p>Controlla gli acconti già ricevuti, quelli ancora da ricevere e il saldo della singola commessa senza dover ricostruire i dati tra fogli Excel, email e documenti separati.</p></>} />
              <div className="commesse-concepts">{moneyConcepts.map(([title, text]) => <div key={title}><span className="commesse-dot" /><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
            </div>
            <RealShot src={overviewImage} alt="Dashboard Totalone con area Incassi e Clienti e valori degli acconti" caption="Nella stessa dashboard: Acconti ricevuti, Acconti da ricevere, Totale clienti e le singole righe economiche." />
          </div>
        </section>

        <section className="commesse-section commesse-warm">
          <div className="commesse-wrap commesse-split">
            <div>
              <SectionHeading eyebrow="OGNI COMMESSA HA IL SUO CONTESTO" title="Apri una commessa e trovi quello che ti serve." body={<><p>Passa dalla panoramica generale al dettaglio della singola commessa.</p><p>Note, stato, preventivato, venduto, acconti, saldo e informazioni operative rimangono collegati allo stesso cliente, così il team non deve ogni volta ricostruire la storia della trattativa.</p></>} />
              <div className="commesse-label-list warm-labels">{["Note", "Stato", "Preventivato", "Venduto", "Acconti", "Saldo", "Data montaggio"].map((label) => <span key={label}>{label}</span>)}</div>
              <p className="commesse-neutral-note"><Minus size={14} /> Il dettaglio espanso e i relativi comandi richiedono uno screenshot dedicato; qui mostriamo fedelmente la vista reale disponibile.</p>
            </div>
            <RealShot src={listImage} alt="Vista reale Totalone delle commesse con stato, preventivato, venduto, acconti, saldo e apertura dettaglio" caption="La lista reale mantiene visibili contesto, stato e valori economici della commessa." />
          </div>
        </section>

        <section className="commesse-section commesse-connected">
          <div className="commesse-wrap commesse-split-wide">
            <div>
              <SectionHeading eyebrow="TUTTO COLLEGATO" title="Il preventivo fa parte della commessa, non di un processo separato." body={<><p>Quando una trattativa richiede un’offerta, puoi passare direttamente dalla commessa alla creazione del preventivo.</p><p>Le informazioni commerciali rimangono collegate, evitando passaggi inutili e rendendo più semplice seguire l’evoluzione della vendita.</p></>} />
              <FlowStrip items={["Commessa", "Preventivo", "Vendita"]} />
              <TextLink href="/software-preventivi-arredamento/">Scopri i Preventivi Totalone</TextLink>
            </div>
            <div className="commesse-proof-note"><span>Crea preventivo</span><strong>Commessa <i>→</i> Preventivo</strong><small>Il collegamento è il punto di partenza del flusso. Per mostrare il comando nel dettaglio serve una vista espansa dedicata.</small></div>
          </div>
        </section>

        <section className="commesse-section commesse-sky">
          <div className="commesse-wrap commesse-split-wide">
            <div>
              <SectionHeading eyebrow="DALL’AZIENDA AL SINGOLO VENDITORE" title="Guarda il business dalla prospettiva che ti serve." body={<><p>Passa dalla visione complessiva dell’azienda alla singola sede, al venditore o al gruppo di clienti che vuoi analizzare.</p><p>Totalone ti permette di filtrare le commesse e concentrarti sui dati rilevanti per il momento.</p></>} />
              <div className="commesse-filter-cloud">{["Showroom", "Venditore", "Cliente", "Provenienza", "Data", "Stato"].map((item) => <span key={item}>{item}</span>)}</div>
            </div>
            <div>
              <div className="commesse-hierarchy"><span>Retail</span><i>→</i><span>Showroom</span><i>→</i><span>Venditori</span><i>→</i><span>Tutti i Clienti</span></div>
              <RealShot src={overviewImage} alt="Navigazione reale Totalone con Retail, showroom, venditori e tutti i clienti" caption="La gerarchia visibile nell’interfaccia: Retail → Showroom → Venditori → Tutti i Clienti." className="commesse-small-shot" />
            </div>
          </div>
        </section>

        <section className="commesse-section commesse-pipeline">
          <div className="commesse-wrap">
            <SectionHeading eyebrow="DALLE TRATTATIVE AI NUMERI" title="Capisci cosa è già venduto e cosa può ancora diventarlo." body={<><p>Totalone mette in relazione lo stato delle commesse con il loro valore economico.</p><p>In questo modo puoi distinguere le opportunità ancora in trattativa dalle commesse finalizzate e avere una lettura immediata del valore commerciale ancora aperto.</p></>} />
            <FlowStrip items={["IN TRATTATIVA", "FINALIZZATO", "VENDUTO"]} className="pipeline-flow" />
            <p className="commesse-supporting-line">Non solo quante commesse hai. Quanto valgono e a che punto sono.</p>
            <div className="commesse-context-links"><a href="/crm-arredamento/">CRM per arredatori <ExternalLink size={13} /></a><a href="/gestione-trattative-arredamento/">Gestione trattative <ExternalLink size={13} /></a></div>
          </div>
        </section>

        <section className="commesse-section commesse-flow-section">
          <div className="commesse-wrap">
            <SectionHeading eyebrow="UN UNICO FLUSSO" title="Dalla trattativa alla chiusura della commessa." body="Le informazioni accompagnano la commessa durante tutto il suo percorso. Il team mantiene continuità tra fase commerciale ed economica senza moltiplicare file, strumenti e passaggi manuali." />
            <div className="commesse-totalone-flow" aria-label="Flusso completo della commessa">
              {flow.map((step, index) => <div className="commesse-totalone-node" key={step}><span>0{index + 1}</span><strong>{step}</strong>{index < flow.length - 1 && <i aria-hidden="true">→</i>}</div>)}
            </div>
          </div>
        </section>

        <section className="commesse-section commesse-sky commesse-multi">
          <div className="commesse-wrap commesse-split-wide">
            <div>
              <SectionHeading eyebrow="PER CHI GESTISCE PIÙ SEDI" title="Una visione unica, anche quando gli showroom diventano più di uno." body={<><p>Totalone permette di passare dalla visione complessiva alle singole sedi e ai singoli venditori.</p><p>Così la direzione mantiene una lettura condivisa del business mentre ogni showroom continua a gestire le proprie commesse.</p></>} />
              <TextLink href="/gestionale-arredamento/">Scopri il gestionale arredamento</TextLink>
            </div>
            <RealShot src={overviewImage} alt="Dettaglio reale della navigazione Totalone tra showroom e venditori" caption="Un dettaglio dell’interfaccia reale per leggere sedi e venditori nello stesso contesto." className="commesse-small-shot" />
          </div>
        </section>

        <section className="commesse-section commesse-why">
          <div className="commesse-wrap">
            <SectionHeading eyebrow="PERCHÉ TOTALONE" title="La commessa non è un numero. È il centro del lavoro." body={<><p>Nel settore dell’arredamento, vendita, incassi e operatività fanno parte dello stesso processo.</p><p>Totalone è progettato per mantenere queste informazioni collegate e dare al team una visione chiara di ciò che sta succedendo, dal preventivo fino al saldo.</p></>} />
            <div className="commesse-pillars">
              <article><span>01</span><h3>VISIBILE</h3><p>Sai immediatamente a che punto è ogni commessa.</p></article>
              <article><span>02</span><h3>ECONOMICO</h3><p>Preventivato, venduto, acconti e saldo restano sotto controllo.</p></article>
              <article><span>03</span><h3>COLLEGATO</h3><p>CRM, trattative, preventivi e commesse continuano nello stesso sistema.</p></article>
            </div>
            <div className="commesse-related-links" aria-label="Approfondimenti Totalone">
              <span>Continua a esplorare</span>
              <a href="/crm-arredamento/">CRM</a><a href="/gestione-trattative-arredamento/">Trattative</a><a href="/software-preventivi-arredamento/">Preventivi</a><a href="/gestione-progetti-arredamento/">Progetti</a><a href="/gestionale-arredamento/">Gestionale arredamento</a>
            </div>
          </div>
        </section>

        <section className="commesse-final">
          <div className="commesse-wrap commesse-final-grid">
            <div>
              <Eyebrow>IL PROSSIMO PASSO</Eyebrow>
              <h2>Porta tutte le tue commesse sotto controllo.</h2>
              <p>Scopri come Totalone può aiutarti a seguire trattative, preventivi, vendite e incassi in un unico sistema costruito per il settore dell’arredamento.</p>
              <div className="commesse-actions"><DemoTrigger variant="light">Prenota una demo</DemoTrigger><a className="commesse-button outline" href="#top">Scopri tutte le funzionalità <ArrowRight size={15} /></a></div>
              <p className="commesse-final-note">Una demo costruita sul modo in cui lavora il tuo showroom.</p>
            </div>
            <div className="commesse-final-mark" aria-hidden="true"><Check size={65} strokeWidth={1.1} /></div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}