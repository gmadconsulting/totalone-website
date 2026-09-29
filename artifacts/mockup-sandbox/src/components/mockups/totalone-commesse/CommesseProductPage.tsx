import { useEffect, type ReactNode } from "react";
import { ArrowDown, ArrowRight, Check, ChevronRight } from "lucide-react";
import { MarketingShell } from "../totalone-site-architecture/_shared/MarketingShell";
import "./CommesseProductPage.css";
import "./CommesseProductPageExtra.css";

const orderStatus = ["DA ORDINARE", "CONFERMATO", "ORDINATO", "ARRIVATO", "IN MAGAZZINO", "PROGRAMMATO"];
const overviewFields = ["Cliente", "Venditore", "Showroom", "Contratto", "Stato", "Schedine"];
const detailFields = ["Cliente", "Anno", "Località", "Venditore", "Stato della commessa", "Valore acquistato", "Valore venduto", "Numero prodotti", "Numero colli"];
const productFields = ["Brand", "Prodotto", "Quantità", "Listino", "Sconto", "Prezzo finale", "Stato fattura", "Stato ordine", "Magazzino", "Colli", "Allegati"];

function DemoTrigger({ children, variant = "" }: { children: ReactNode; variant?: string }) {
  const openDemo = () => {
    document.querySelector<HTMLButtonElement>(".to-header-actions .to-button")?.click();
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

function ScreenshotPlaceholder({ label, caption, className = "" }: { label: string; caption?: string; className?: string }) {
  return (
    <figure className={`commesse-shot ${className}`}>
      <div className="commesse-shot-frame" role="img" aria-label={label}>
        <div className="commesse-placeholder-copy">
          <span>{label}</span>
          <small>Spazio riservato allo screenshot reale Totalone</small>
        </div>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function FlowStrip({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`commesse-flow-strip ${className}`} aria-label="Flusso della commessa">
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

function TagList({ items, className = "" }: { items: string[]; className?: string }) {
  return <div className={`commesse-tag-list ${className}`}>{items.map((item) => <span key={item}>{item}</span>)}</div>;
}

function ConnectedWorkflow() {
  const items = [
    ["TRATTATIVA", "L’opportunità commerciale."],
    ["PREVENTIVO", "La proposta."],
    ["VENDITA", "Ciò che è stato scelto."],
    ["COMMESSA", "Il centro operativo."],
    ["ORDINI", "Ciò che deve arrivare."],
    ["MAGAZZINO", "Ciò che è disponibile."],
    ["MONTAGGIO", "Ciò che deve essere installato."],
    ["ASSISTENZA", "Ciò che continua dopo."],
  ];

  return (
    <div className="commesse-workflow" aria-label="Flusso Totalone dalla vendita al post-vendita">
      {items.map(([title, body], index) => (
        <div className="commesse-workflow-node" key={title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{title}</strong>
          <small>{body}</small>
          {index < items.length - 1 && <i aria-hidden="true">→</i>}
        </div>
      ))}
    </div>
  );
}

export function CommesseProductPage() {
  useEffect(() => {
    document.title = "Gestione Commesse per Arredatori e Showroom | Totalone";
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = "Gestisci commesse, prodotti, ordini, documenti, pagamenti e avanzamento con Totalone. Il software per la gestione delle commesse di negozi e showroom di arredamento.";
  }, []);

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
                <h1>Tutta la commessa.<br /><span>In un unico posto.</span></h1>
                <p>Dalla vendita alla consegna, Totalone raccoglie prodotti, ordini, documenti, pagamenti, servizi e avanzamento della commessa in un’unica Schedina Cliente.</p>
                <div className="commesse-actions">
                  <DemoTrigger>Prenota una demo</DemoTrigger>
                  <a className="commesse-button outline" href="#schedina-cliente">Scopri come funziona <ArrowDown size={15} /></a>
                </div>
                <p className="commesse-micro">Pensato per showroom, negozi di arredamento e realtà multi-store.</p>
              </div>
              <ScreenshotPlaceholder label="[SCREENSHOT — DETTAGLIO SCHEDINA CLIENTE]" caption="Inserisci qui lo screenshot reale della Schedina Cliente." className="commesse-hero-shot" />
            </div>
          </div>
        </section>

        <section className="commesse-section commesse-warm" id="schedina-cliente">
          <div className="commesse-wrap">
            <div className="commesse-intro-grid">
              <SectionHeading eyebrow="LA SCHEDINA CLIENTE" title="Una commessa non è solo un ordine." />
              <div className="commesse-copy">
                <p>Una commessa di arredamento può contenere decine di prodotti, brand diversi, ordini effettuati in momenti differenti, documenti, pagamenti, consegne e attività operative.</p>
                <p>Totalone riunisce tutto nella Schedina Cliente: il punto di riferimento operativo della commessa.</p>
              </div>
            </div>
            <div className="commesse-concept">
              <div className="commesse-concept-items">
                {["CLIENTE", "PRODOTTI", "ORDINI", "DOCUMENTI", "PAGAMENTI", "SERVIZI"].map((item) => <span key={item}>{item}</span>)}
              </div>
              <div className="commesse-concept-arrow">↓</div>
              <strong>UNA SOLA COMMESSA</strong>
            </div>
            <p className="commesse-supporting-line">“Una sola scheda per sapere cosa hai venduto, cosa deve essere ordinato, cosa è arrivato e cosa deve ancora succedere.”</p>
          </div>
        </section>

        <section className="commesse-section" id="tutte-le-commesse">
          <div className="commesse-wrap commesse-copy-only">
            <div>
              <SectionHeading eyebrow="PANORAMICA" title="Tutte le commesse. Una sola vista." body={<><p>Consulta tutte le Schedine Cliente dello showroom e trova rapidamente la commessa che stai cercando.</p><p>Per ogni commessa puoi avere immediatamente il contesto principale senza aprire file, email o strumenti diversi.</p></>} />
              <TagList items={overviewFields} />
              <p className="commesse-small-label">Organizza la vista per</p>
              <TagList items={["Anno", "Showroom", "Venditore", "Stato"]} className="muted-tags" />
              <p className="commesse-small-label">Stati visibili</p>
              <TagList items={["Ordinato", "Da ordinare", "Arrivato"]} className="state-tags" />
            </div>
          </div>
        </section>

        <section className="commesse-section commesse-connected" id="singola-commessa">
          <div className="commesse-wrap commesse-copy-only">
            <div>
              <SectionHeading eyebrow="DETTAGLIO COMMESSA" title="Apri una commessa e ritrovi tutto il suo contesto." body={<><p>La Schedina Cliente raccoglie le informazioni commerciali e operative legate alla commessa e le mantiene accessibili nello stesso ambiente.</p><p>Cliente, venditore, stato, prodotti e informazioni economiche rimangono collegati mentre il progetto avanza.</p></>} />
              <TagList items={detailFields} className="warm-tags" />
            </div>
          </div>
        </section>

        <section className="commesse-section commesse-sky commesse-product-section" id="prodotto-per-prodotto">
          <div className="commesse-wrap">
            <SectionHeading eyebrow="PRODOTTO PER PRODOTTO" title="Sai a che punto è ogni elemento della commessa." body={<><p>Una singola commessa può contenere decine di prodotti di brand diversi, ciascuno con tempi e stati differenti.</p><p>Totalone permette di seguirli individualmente senza perdere la visione complessiva della commessa.</p></>} />
            <TagList items={productFields} className="product-tags" />
            <ScreenshotPlaceholder label="[SCREENSHOT — PRODOTTI DELLA SCHEDINA]" caption="Inserisci qui lo screenshot reale della tabella prodotti." className="commesse-wide-shot commesse-product-shot" />
            <p className="commesse-highlight">“Decine di prodotti diversi. Una sola commessa da seguire.”</p>
          </div>
        </section>

        <section className="commesse-section commesse-warm" id="avanzamento">
          <div className="commesse-wrap">
            <SectionHeading eyebrow="AVANZAMENTO" title="Ogni prodotto può essere in una fase diversa." body={<><p>All’interno della stessa commessa alcuni prodotti possono essere ancora da ordinare, altri già confermati, altri arrivati o già disponibili in magazzino.</p><p>Totalone rende questa differenza immediatamente visibile.</p></>} />
            <FlowStrip items={orderStatus} className="economic-flow order-flow" />
            <div className="commesse-state-notes"><span>IN CORSO</span><span>ASSISTENZA</span><p>Non tutti i prodotti seguono necessariamente la stessa sequenza: ogni elemento può avere il proprio stato.</p></div>
            <p className="commesse-highlight">“Non devi chiedere a qualcuno a che punto è un prodotto. Lo vedi.”</p>
          </div>
        </section>

        <section className="commesse-section commesse-sky">
          <div className="commesse-wrap">
            <SectionHeading eyebrow="TUTTO COLLEGATO" title="Dal valore della vendita all’avanzamento operativo." body={<><p>La commessa non vive soltanto nella logistica.</p><p>Totalone mantiene nello stesso contesto le informazioni economiche della vendita e ciò che sta succedendo ai singoli prodotti.</p></>} />
            <FlowStrip items={["VENDUTO", "PRODOTTI", "ORDINI", "MAGAZZINO", "COLLI"]} className="economic-flow" />
          </div>
        </section>

        <section className="commesse-section" id="pagamenti">
          <div className="commesse-wrap commesse-split-wide">
            <div>
              <SectionHeading eyebrow="ACCONTI E SALDO" title="Anche i pagamenti rimangono collegati alla commessa." body={<><p>Registra gli acconti ricevuti dal cliente e mantieni visibile la situazione economica della commessa.</p><p>Totalone collega i pagamenti alla relativa Schedina Cliente e calcola il saldo residuo sulla base del totale e degli acconti registrati.</p></>} />
              <FlowStrip items={["ACCONTI RICEVUTI", "PAGAMENTI REGISTRATI", "SALDO RESIDUO"]} className="economic-flow" />
            </div>
            <ScreenshotPlaceholder label="[SCREENSHOT — ACCONTI E PAGAMENTI COMMESSA]" caption="Placeholder per lo screenshot reale dei pagamenti." />
          </div>
        </section>

        <section className="commesse-section commesse-connected" id="servizi">
          <div className="commesse-wrap commesse-copy-only">
            <div>
              <SectionHeading eyebrow="OLTRE AI PRODOTTI" title="Anche i servizi fanno parte della commessa." body={<><p>Una vendita di arredamento non è composta soltanto dai prodotti.</p><p>Trasporto, smontaggio, imballaggi speciali e altri servizi possono essere associati direttamente alla Schedina Cliente, mantenendo anche queste attività all’interno del contesto della commessa.</p></>} />
              <TagList items={["Trasporto", "Smontaggio", "Imballaggi speciali", "Altri servizi"]} className="service-tags" />
            </div>
          </div>
        </section>

        <section className="commesse-section commesse-sky" id="documenti">
          <div className="commesse-wrap commesse-copy-only">
            <div>
              <SectionHeading eyebrow="DOCUMENTI" title="I documenti restano dove servono." body={<><p>Contratti, planimetrie, comunicazioni e altri documenti possono essere associati alla commessa e organizzati nello stesso contesto operativo.</p><p>Il team non deve ricostruire ogni volta la documentazione tra cartelle, email e strumenti diversi.</p></>} />
              <TagList items={["Contratti", "Planimetrie", "Comunicazioni"]} className="document-tags" />
            </div>
          </div>
        </section>

        <section className="commesse-section commesse-warm">
          <div className="commesse-wrap">
            <SectionHeading eyebrow="CONTESTO CONDIVISO" title="Le informazioni non rimangono nella testa di una persona." body={<><p>Note interne e storico delle attività aiutano il team a mantenere il contesto della commessa accessibile nel tempo.</p><p>Chi apre la Schedina Cliente può ritrovare le informazioni operative senza dover ricostruire ogni passaggio attraverso conversazioni separate.</p></>} />
            <div className="commesse-note-history">
              <article><span>01</span><strong>NOTE</strong><p>Informazioni operative collegate alla commessa.</p></article>
              <article><span>02</span><strong>STORICO</strong><p>Continuità delle attività nel tempo.</p></article>
            </div>
          </div>
        </section>

        <section className="commesse-section">
          <div className="commesse-wrap commesse-copy-only">
            <div>
              <SectionHeading eyebrow="FINO AL MONTAGGIO" title="La commessa continua fino a quando il lavoro non è concluso." body={<><p>La Schedina Cliente mantiene anche le informazioni necessarie per collegare la commessa alla fase di montaggio.</p><p>Data prevista e informazioni operative rimangono associate al progetto, mantenendo continuità tra ciò che è stato venduto e ciò che deve essere installato.</p></>} />
              <FlowStrip items={["COMMESSA", "PRODOTTI", "ARRIVO", "MONTAGGIO"]} className="economic-flow" />
              <TextLink href="/gestione-montaggi-arredamento/">Scopri la gestione Montaggi</TextLink>
            </div>
          </div>
        </section>

        <section className="commesse-section commesse-connected">
          <div className="commesse-wrap commesse-split">
            <div>
              <SectionHeading eyebrow="ANCHE DOPO LA CONSEGNA" title="La storia della commessa non scompare dopo il montaggio." body={<><p>Se un prodotto richiede assistenza, la segnalazione rimane collegata al cliente, alla Schedina Cliente e al prodotto interessato.</p><p>In questo modo il post-vendita continua a partire dallo stesso contesto della commessa.</p></>} />
              <FlowStrip items={["CLIENTE", "COMMESSA", "PRODOTTO", "ASSISTENZA"]} className="economic-flow" />
              <TextLink href="/post-vendita-arredamento/">Scopri Assistenza e post-vendita</TextLink>
            </div>
            <div className="commesse-assistance-note"><span>POST-VENDITA</span><p>Il contesto della commessa rimane collegato anche dopo la consegna.</p></div>
          </div>
        </section>

        <section className="commesse-section commesse-sky">
          <div className="commesse-wrap">
            <div className="commesse-centered-heading">
              <SectionHeading eyebrow="UN UNICO FLUSSO" title="Dalla vendita al post-vendita." body={<p>La Schedina Cliente è il punto in cui ciò che è stato venduto diventa operativo. Prodotti, ordini, documenti e attività continuano nello stesso ecosistema senza perdere il collegamento con il cliente.</p>} />
            </div>
            <ConnectedWorkflow />
          </div>
        </section>

        <section className="commesse-section commesse-warm">
          <div className="commesse-wrap">
            <SectionHeading eyebrow="MENO INFORMAZIONI SPARSE" title="Meno tempo a cercare. Più controllo sulla commessa." />
            <div className="commesse-comparison">
              <div><span>SENZA UN SISTEMA CONDIVISO</span><ul>{["Excel", "Email", "Cartelle", "Messaggi", "Telefonate", "Informazioni distribuite tra persone diverse"].map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div><span>CON TOTALONE</span><ul>{["Una Schedina Cliente", "Prodotti collegati", "Stati visibili", "Documenti associati", "Pagamenti collegati", "Informazioni condivise"].map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></div>
            </div>
            <p className="commesse-highlight">“L’informazione resta dove serve: dentro la commessa.”</p>
          </div>
        </section>

        <section className="commesse-section">
          <div className="commesse-wrap commesse-copy-only">
            <div>
              <SectionHeading eyebrow="PER CHI GESTISCE PIÙ SEDI" title="Le commesse restano organizzate anche quando l’azienda cresce." body={<p>Filtra e consulta le Schedine Cliente per showroom, venditore, anno e stato. Dalla singola sede alla visione complessiva dell’azienda, Totalone mantiene le commesse nello stesso sistema.</p>} />
            </div>
          </div>
        </section>

        <section className="commesse-section commesse-connected">
          <div className="commesse-wrap">
            <SectionHeading eyebrow="TOTALONE" title="La commessa è collegata a tutto il resto." body={<p>Gestione Commesse fa parte dello stesso flusso Totalone che accompagna il cliente dalla prima opportunità fino al post-vendita.</p>} />
            <div className="commesse-ecosystem">
              {[
                ["CRM", "Il cliente entra nel sistema.", "/__mockup/preview/totalone-crm/CrmProductPage"],
                ["GESTIONE TRATTATIVE", "Segui l’opportunità commerciale.", "/__mockup/preview/totalone-trattative/GestioneTrattative"],
                ["PREVENTIVI", "Costruisci la proposta.", "/__mockup/preview/totalone-preventivi/PreventiviProductPage"],
                ["GESTIONE COMMESSE", "Gestisci ciò che hai venduto.", "#top"],
                ["MAGAZZINO E LOGISTICA", "Segui ciò che arriva.", "/gestione-magazzino-arredamento/"],
                ["MONTAGGI", "Organizza l’installazione.", "/gestione-montaggi-arredamento/"],
                ["ASSISTENZA E POST-VENDITA", "Continua a seguire il cliente.", "/post-vendita-arredamento/"],
              ].map(([title, body, href], index) => <a className={`commesse-ecosystem-item ${title === "GESTIONE COMMESSE" ? "active" : ""}`} href={href} key={title}><span>0{index + 1}</span><strong>{title}</strong><small>{body}</small><ArrowRight size={15} /></a>)}
            </div>
          </div>
        </section>

        <section className="commesse-section commesse-why">
          <div className="commesse-wrap">
            <SectionHeading eyebrow="PERCHÉ TOTALONE" title="Costruito intorno a come funziona davvero una commessa di arredamento." body={<><p>Nel settore dell’arredamento, una vendita può trasformarsi in mesi di ordini, consegne, documenti, pagamenti e attività operative.</p><p>Totalone mantiene tutto collegato alla stessa commessa, dando alle persone coinvolte un unico punto da cui partire.</p></>} />
            <div className="commesse-pillars">
              <article><span>01</span><h3>VISIBILE</h3><p>Sai cosa sta succedendo nella commessa.</p></article>
              <article><span>02</span><h3>COLLEGATO</h3><p>Prodotti, ordini, documenti, pagamenti e attività rimangono nello stesso contesto.</p></article>
              <article><span>03</span><h3>CONDIVISO</h3><p>Le informazioni non dipendono dalla memoria della singola persona.</p></article>
            </div>
          </div>
        </section>

        <section className="commesse-section commesse-seo-section">
          <div className="commesse-wrap">
            <Eyebrow>GESTIONE COMMESSE ARREDAMENTO</Eyebrow>
            <h2>Software per la gestione delle commesse di arredamento.</h2>
            <div className="commesse-seo-copy"><p>Totalone è un gestionale per arredatori e showroom che permette di organizzare e seguire le commesse dalla vendita alle fasi operative.</p><p>Ogni Schedina Cliente mantiene collegati prodotti, ordini, documenti, pagamenti, servizi e informazioni sul montaggio, offrendo al team una visione condivisa dell’avanzamento della commessa.</p></div>
          </div>
        </section>

        <section className="commesse-final">
          <div className="commesse-wrap commesse-final-grid">
            <div>
              <Eyebrow>GESTIONE COMMESSE TOTALONE</Eyebrow>
              <h2>Tutto quello che succede dopo la vendita, finalmente nello stesso posto.</h2>
              <p>Scopri come Totalone può aiutare il tuo showroom a seguire prodotti, ordini, documenti, pagamenti e attività di ogni commessa.</p>
              <div className="commesse-actions"><DemoTrigger variant="light">Prenota una demo</DemoTrigger><a className="commesse-button outline" href="/gestionale-arredamento/">Scopri tutte le funzionalità <ChevronRight size={15} /></a></div>
              <p className="commesse-final-note">Una demo costruita sul modo in cui lavora il tuo showroom.</p>
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}