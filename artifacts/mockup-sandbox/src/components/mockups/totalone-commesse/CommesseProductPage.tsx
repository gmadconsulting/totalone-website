import { ArrowDown, ArrowRight, Check, ChevronRight, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { MarketingShell } from "../totalone-site-architecture/_shared/MarketingShell";
import "./CommesseProductPage.css";

const orderStatus = ["DA ORDINARE", "CONFERMATO", "ORDINATO", "ARRIVATO", "IN MAGAZZINO", "PROGRAMMATO"];
const commesseFields = ["Cliente", "Responsabile", "Stato", "Preventivato", "Venduto", "Acconti", "Saldo"];
const commesseContext = ["Prodotti", "Costi di servizio", "Documenti", "Note", "Assistenza"];

function DemoTrigger({ children, variant = "" }: { children: ReactNode; variant?: string }) {
  const openDemo = () => {
    document.querySelector<HTMLButtonElement>(".to-footer-cta .to-button")?.click();
  };

  return <button className={`commesse-button ${variant}`} onClick={openDemo}>{children}<ArrowRight size={15} /></button>;
}

function Eyebrow({ children, tone = "" }: { children: ReactNode; tone?: string }) {
  return <span className={`commesse-eyebrow ${tone}`}>{children}</span>;
}

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: ReactNode }) {
  return (
    <div className="commesse-heading">
      <Eyebrow tone={eyebrow === "AVANZAMENTO" ? "gold" : ""}>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {body && <div className="commesse-lead">{body}</div>}
    </div>
  );
}

function ScreenshotPlaceholder({ label, caption, className = "" }: { label: string; caption: string; className?: string }) {
  return (
    <figure className={`commesse-shot ${className}`}>
      <div className="commesse-shot-frame" role="img" aria-label={label}>
        <div className="commesse-placeholder-copy">
          <span>{label}</span>
          <small>Inserire qui lo screenshot reale Totalone</small>
        </div>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function FlowStrip({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`commesse-flow-strip ${className}`} aria-label="Avanzamento della commessa">
      {items.map((item, index) => (
        <span className="commesse-flow-item" key={item}>
          <b>{String(index + 1).padStart(2, "0")}</b>{item}
          {index < items.length - 1 && <i aria-hidden="true">→</i>}
        </span>
      ))}
    </div>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className="commesse-text-link" href={href}>{children}<ArrowRight size={15} /></a>;
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
                <p>Segui ogni commessa dal primo preventivo alla chiusura. Totalone riunisce stato, valori economici, acconti, saldo e responsabilità in un unico contesto.</p>
                <div className="commesse-actions">
                  <DemoTrigger>Prenota una demo</DemoTrigger>
                  <a className="commesse-button outline" href="#tutte-le-commesse">Scopri come funziona <ArrowDown size={15} /></a>
                </div>
                <p className="commesse-micro">Pensato per showroom, negozi di arredamento e realtà multi-store.</p>
              </div>
              <ScreenshotPlaceholder label="[SCREENSHOT — DETTAGLIO COMMESSA]" caption="Inserisci qui il dettaglio reale della commessa." className="commesse-hero-shot" />
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
                <p>Una commessa di arredamento può durare settimane o mesi e attraversare diverse fasi economiche e operative.</p>
                <p>Totalone raccoglie il contesto in un unico posto, così puoi capire cosa è ancora da ordinare, cosa è arrivato, quanto hai venduto e cosa deve succedere dopo.</p>
              </div>
            </div>
            <div className="commesse-benefits">
              <article><span>01</span><h3>Sai a che punto è ogni commessa</h3><p>Stato, cliente, responsabile e valori economici rimangono leggibili.</p></article>
              <article><span>02</span><h3>Controlli i numeri mentre lavori</h3><p>Preventivato, venduto, acconti e saldo non vivono in file separati.</p></article>
              <article><span>03</span><h3>Tutto il team vede lo stesso contesto</h3><p>Ogni commessa mantiene la propria storia e resta accessibile alle persone coinvolte.</p></article>
            </div>
          </div>
        </section>

        <section className="commesse-section" id="tutte-le-commesse">
          <div className="commesse-wrap commesse-split">
            <div>
              <SectionHeading eyebrow="TUTTE LE COMMESSE" title="Una sola vista per capire dove intervenire." body={<><p>Visualizza le commesse dello showroom in un’unica schermata e individua immediatamente le informazioni che contano.</p><p>Per ogni cliente puoi leggere responsabile, stato, valore preventivato, venduto, acconti ricevuti e saldo.</p></>} />
              <div className="commesse-label-list">{commesseFields.map((label) => <span key={label}>{label}</span>)}</div>
            </div>
            <ScreenshotPlaceholder label="[SCREENSHOT — ELENCO COMMESSE]" caption="Inserisci qui l’elenco reale delle commesse con clienti, stati e valori economici." />
          </div>
        </section>

        <section className="commesse-section commesse-connected" id="singola-commessa">
          <div className="commesse-wrap commesse-split-wide">
            <div>
              <SectionHeading eyebrow="SINGOLA COMMESSA" title="Apri una commessa e trovi quello che ti serve." body={<><p>Note, stato, preventivato, venduto, acconti, saldo e informazioni operative rimangono collegati allo stesso cliente.</p><p>Così il team non deve ricostruire la storia della commessa ogni volta che cambia una responsabilità.</p></>} />
              <div className="commesse-label-list warm-labels">{["Note", "Stato", "Preventivato", "Venduto", "Acconti", "Saldo", "Data montaggio"].map((label) => <span key={label}>{label}</span>)}</div>
            </div>
            <ScreenshotPlaceholder label="[SCREENSHOT — DETTAGLIO COMMESSA]" caption="Inserisci qui il dettaglio reale della commessa." />
          </div>
        </section>

        <section className="commesse-section commesse-sky commesse-product-section" id="prodotto-per-prodotto">
          <div className="commesse-wrap">
            <SectionHeading eyebrow="PRODOTTO PER PRODOTTO" title="Ogni prodotto segue il suo stato, dalla richiesta al montaggio." body={<><p>Una commessa non è un totale indistinto. Prodotti, brand, forniture e stati operativi devono restare leggibili anche quando il progetto cresce.</p><p>Il team può lavorare sulla stessa commessa senza perdere il dettaglio di ciò che è da ordinare, confermato, arrivato o pronto per il montaggio.</p></>} />
            <ScreenshotPlaceholder label="[SCREENSHOT — PRODOTTI DELLA COMMESSA]" caption="Usa quest’area per la tabella reale dei prodotti, con brand e diversi stati operativi." className="commesse-wide-shot commesse-product-shot" />
          </div>
        </section>

        <section className="commesse-section commesse-warm" id="avanzamento">
          <div className="commesse-wrap">
            <SectionHeading eyebrow="AVANZAMENTO" title="Dalla richiesta alla consegna, il percorso resta visibile." body={<><p>Uno stato condiviso aiuta il team a capire cosa è fermo, cosa è in movimento e quale attività deve essere preparata.</p><p>Il flusso è leggibile come parte della pagina, senza simulare una schermata del prodotto.</p></>} />
            <FlowStrip items={orderStatus} className="economic-flow order-flow" />
            <p className="commesse-supporting-line">Un linguaggio comune per coordinare fornitori, magazzino e montaggi.</p>
          </div>
        </section>

        <section className="commesse-section" id="tutto-sulla-commessa">
          <div className="commesse-wrap commesse-split-wide">
            <div>
              <SectionHeading eyebrow="TUTTO CIÒ CHE RIGUARDA LA COMMESSA" title="La commessa raccoglie tutto ciò che serve per portare a termine il lavoro." body={<><p>Prodotti, costi di servizio, documenti, note e assistenza fanno parte dello stesso contesto operativo.</p><p>La pagina spiega il valore di queste informazioni senza ricreare i tab o l’interfaccia reale di Totalone.</p></>} />
              <div className="commesse-context-list">{commesseContext.map((item) => <div key={item}><span className="commesse-dot" /><strong>{item}</strong></div>)}</div>
              <TextLink href="/gestione-progetti-arredamento/">Scopri la gestione progetti</TextLink>
            </div>
            <ScreenshotPlaceholder label="[SCREENSHOT — DETTAGLIO COMMESSA / TAB]" caption="Placeholder opzionale per una schermata reale di dettaglio." className="commesse-large-shot" />
          </div>
        </section>

        <section className="commesse-section commesse-sky">
          <div className="commesse-wrap">
            <SectionHeading eyebrow="CONTROLLO ECONOMICO" title="Dal preventivato al saldo, sai sempre dove sei." body={<><p>Una commessa diventa più gestibile quando il valore economico rimane collegato al lavoro operativo.</p><p>Totalone mantiene leggibili preventivato, finalizzato, venduto, acconti e saldo per aiutarti a decidere con più lucidità.</p></>} />
            <FlowStrip items={["PREVENTIVATO", "FINALIZZATO", "VENDUTO", "ACCONTI", "SALDO"]} className="economic-flow" />
            <div className="commesse-side-status"><span>DA FINALIZZARE</span><span>ACCONTO DA RICEVERE</span><p>Una lettura condivisa dei numeri evita di ricostruire la situazione tra fogli, email e documenti.</p></div>
          </div>
        </section>

        <section className="commesse-section commesse-why">
          <div className="commesse-wrap">
            <SectionHeading eyebrow="PERCHÉ TOTALONE" title="La commessa non è un numero. È il centro del lavoro." body={<><p>Nel settore dell’arredamento, vendita, incassi e operatività fanno parte dello stesso processo.</p><p>Totalone mantiene queste informazioni collegate e dà al team una visione chiara dal preventivo fino al montaggio.</p></>} />
            <div className="commesse-pillars">
              <article><span>01</span><h3>VISIBILE</h3><p>Sai immediatamente a che punto è ogni commessa.</p></article>
              <article><span>02</span><h3>ECONOMICA</h3><p>Preventivato, venduto, acconti e saldo restano sotto controllo.</p></article>
              <article><span>03</span><h3>COLLEGATA</h3><p>Prodotti, documenti e attività continuano nello stesso contesto.</p></article>
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
              <p>Scopri come Totalone può aiutarti a seguire trattative, preventivi, forniture, montaggi e incassi in un unico sistema costruito per il settore dell’arredamento.</p>
              <div className="commesse-actions"><DemoTrigger variant="light">Prenota una demo</DemoTrigger><a className="commesse-button outline" href="#top">Torna all’inizio <ChevronRight size={15} /></a></div>
              <p className="commesse-final-note">Una demo costruita sul modo in cui lavora il tuo showroom.</p>
            </div>
            <div className="commesse-final-mark" aria-hidden="true"><Check size={65} strokeWidth={1.1} /></div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}