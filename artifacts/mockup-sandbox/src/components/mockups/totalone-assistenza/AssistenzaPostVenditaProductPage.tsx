import { useEffect, type ReactNode } from "react";
import { ArrowDown, ArrowRight, Check, ChevronRight } from "lucide-react";
import { MarketingShell } from "../totalone-site-architecture/_shared/MarketingShell";
import "./AssistenzaPostVenditaProductPage.css";

const SEO_TITLE = "Assistenza e Post-vendita per Arredatori e Showroom | Totalone";
const META_DESCRIPTION = "Gestisci assistenze, prodotti, stati e arrivi previsti con Totalone. Il software post-vendita pensato per negozi e showroom di arredamento.";

function DemoTrigger({ children, variant = "" }: { children: ReactNode; variant?: string }) {
  const openDemo = () => {
    document.querySelector<HTMLButtonElement>(".to-header-actions .to-button")?.click();
  };

  return <button className={`assistenza-button ${variant}`} onClick={openDemo}>{children}<ArrowRight size={15} /></button>;
}

function Eyebrow({ children, tone = "" }: { children: ReactNode; tone?: string }) {
  return <span className={`assistenza-eyebrow ${tone}`}>{children}</span>;
}

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: ReactNode }) {
  return (
    <div className="assistenza-heading">
      <Eyebrow tone="dark">{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {body && <div className="assistenza-lead">{body}</div>}
    </div>
  );
}

function ScreenshotPlaceholder({ label, caption, className = "" }: { label: string; caption?: string; className?: string }) {
  return (
    <figure className={`assistenza-shot ${className}`}>
      <div className="assistenza-shot-frame" role="img" aria-label={label}>
        <div>
          <span>{label}</span>
          <small>Spazio riservato allo screenshot reale Totalone</small>
        </div>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function TagList({ items, warm = false }: { items: string[]; warm?: boolean }) {
  return <div className={`assistenza-tags ${warm ? "warm" : ""}`}>{items.map((item) => <span key={item}>{item}</span>)}</div>;
}

function Flow({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`assistenza-flow ${className}`} aria-label="Flusso assistenza Totalone">
      {items.map((item, index) => (
        <div className="assistenza-flow-item" key={item}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{item}</strong>
          {index < items.length - 1 && <i aria-hidden="true">→</i>}
        </div>
      ))}
    </div>
  );
}

function Comparison({ positive }: { positive: string[] }) {
  return (
    <div className="assistenza-comparison">
      <div>
        <span>SENZA UN SISTEMA CONDIVISO</span>
        <ul>{["Email", "Messaggi", "Foto", "Documenti", "Fogli Excel", "Informazioni da ricostruire"].map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
      <div className="positive">
        <span>CON TOTALONE</span>
        <ul>{positive.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul>
      </div>
    </div>
  );
}

export function AssistenzaPostVenditaProductPage() {
  useEffect(() => {
    document.title = SEO_TITLE;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = META_DESCRIPTION;
  }, []);

  return (
    <MarketingShell active="Assistenza e Post-vendita">
      <main className="assistenza-page" id="top">
        <section className="assistenza-hero">
          <div className="assistenza-orb one" aria-hidden="true" />
          <div className="assistenza-orb two" aria-hidden="true" />
          <div className="assistenza-wrap">
            <div className="assistenza-breadcrumb"><a href="/">Home</a><span>/</span><span>Assistenza e Post-vendita</span></div>
            <div className="assistenza-hero-grid">
              <div className="assistenza-hero-copy">
                <Eyebrow>ASSISTENZA E POST-VENDITA</Eyebrow>
                <h1>Il cliente resta seguito,<br /><span>anche dopo il montaggio.</span></h1>
                <p>Gestisci le assistenze post-vendita mantenendo collegati clienti, prodotti, stati, arrivi previsti e documenti. Tutto nello stesso sistema utilizzato dal tuo showroom.</p>
                <div className="assistenza-actions">
                  <DemoTrigger>Prenota una demo</DemoTrigger>
                  <a className="assistenza-button outline" href="#dopo-la-vendita">Scopri come funziona <ArrowDown size={15} /></a>
                </div>
                <p className="assistenza-micro">Pensato per showroom, negozi di arredamento e realtà multi-store.</p>
              </div>
              <ScreenshotPlaceholder label="[SCREENSHOT — PANORAMICA ASSISTENZE]" className="assistenza-hero-shot" />
            </div>
          </div>
        </section>

        <section className="assistenza-section warm" id="dopo-la-vendita">
          <div className="assistenza-wrap">
            <div className="assistenza-intro-grid">
              <SectionHeading eyebrow="DOPO LA VENDITA" title="L’assistenza non dovrebbe ricominciare da zero." />
              <div className="assistenza-copy">
                <p>Quando un cliente segnala un problema dopo la consegna o il montaggio, il team non dovrebbe dover ricostruire la situazione cercando informazioni tra email, messaggi, documenti e fogli separati.</p>
                <p>Totalone organizza il post-vendita intorno a ciò che conta davvero: il cliente e i prodotti coinvolti. Così ogni assistenza mantiene il proprio contesto e può essere seguita fino alla sua gestione.</p>
              </div>
            </div>
            <div className="assistenza-pillars">
              <article><span>CLIENTE</span><h3>Parti dalla relazione.</h3><p>Sai immediatamente quali clienti hanno assistenze aperte.</p></article>
              <article><span>PRODOTTI</span><h3>Vedi cosa è coinvolto.</h3><p>Ogni assistenza mantiene visibili i prodotti associati.</p></article>
              <article><span>STATO</span><h3>Capisci cosa richiede attenzione.</h3><p>Distingui ciò che è da gestire, in gestione o pronto.</p></article>
            </div>
          </div>
        </section>

        <section className="assistenza-section" id="panoramica">
          <div className="assistenza-wrap assistenza-split">
            <div>
              <SectionHeading eyebrow="UNA VISIONE COMPLETA" title="Tutte le assistenze. Senza perdere il contesto." body={<><p>La panoramica raccoglie i clienti con prodotti in assistenza e permette di capire immediatamente quante assistenze e quanti prodotti sono coinvolti.</p><p>La ricerca e i filtri aiutano il team a concentrarsi rapidamente sui casi che servono.</p></>} />
              <TagList items={["Cliente", "Venditore", "Assistenze", "Prodotti", "Stato", "Ricerca", "Filtri"]} />
            </div>
            <ScreenshotPlaceholder label="[SCREENSHOT — LISTA CLIENTI IN ASSISTENZA]" caption="Dal cliente alla singola assistenza, mantenendo sempre il contesto." className="assistenza-shot-large" />
          </div>
        </section>

        <section className="assistenza-section sky">
          <div className="assistenza-wrap">
            <SectionHeading eyebrow="COSA RICHIEDE ATTENZIONE" title="Sai subito cosa devi ancora gestire." body={<p>Non tutte le assistenze sono nello stesso momento del loro percorso. Totalone distingue visivamente i diversi stati, permettendo al team di capire rapidamente dove concentrare l’attenzione.</p>} />
            <Flow items={["DA GESTIRE", "IN GESTIONE", "PRONTE"]} className="status-flow" />
            <p className="assistenza-highlight">“Una lettura immediata del lavoro ancora aperto e di quello che sta avanzando.”</p>
          </div>
        </section>

        <section className="assistenza-section connected">
          <div className="assistenza-wrap">
            <SectionHeading eyebrow="NON UN TICKET GENERICO" title="Sai esattamente quali prodotti sono coinvolti." body={<><p>Nel settore dell’arredamento, sapere che un cliente ha un’assistenza aperta non basta.</p><p>Devi sapere su quale prodotto intervenire, di quale brand si tratta e quali informazioni sono collegate a quel caso.</p><p>Totalone porta il post-vendita fino al livello del singolo prodotto.</p></>} />
            <Flow items={["CLIENTE", "ASSISTENZA", "PRODOTTI"]} className="concept-flow" />
            <p className="assistenza-quote">“Il problema non è scollegato dalla commessa: ha un cliente e prodotti precisi.”</p>
          </div>
        </section>

        <section className="assistenza-section">
          <div className="assistenza-wrap assistenza-split reverse">
            <div>
              <SectionHeading eyebrow="IL CONTESTO IN UNA SCHERMATA" title="Apri l’assistenza e trovi i prodotti coinvolti." body={<><p>Nel dettaglio della singola assistenza puoi visualizzare i prodotti associati e le informazioni necessarie per seguirne l’evoluzione.</p><p>Cliente, responsabile, prodotti, brand, arrivo previsto, data e stato rimangono raccolti nello stesso ambiente.</p></>} />
              <TagList items={["Cliente", "Responsabile", "Prodotto", "Brand / Colore", "Arrivo previsto", "Data", "Stato", "Documenti"]} />
            </div>
            <ScreenshotPlaceholder label="[SCREENSHOT — DETTAGLIO SCHEDINA ASSISTENZA]" caption="Il contesto della singola assistenza, nello stesso spazio di lavoro." className="assistenza-shot-large" />
          </div>
        </section>

        <section className="assistenza-section warm">
          <div className="assistenza-wrap assistenza-text-feature">
            <div>
              <SectionHeading eyebrow="CONTROLLO PER PRODOTTO" title="Un’assistenza può coinvolgere più prodotti. Ognuno segue il proprio percorso." body={<><p>All’interno della stessa assistenza puoi distinguere i diversi prodotti coinvolti e mantenere visibili le informazioni relative a ciascuno.</p><p>Questo evita di trattare un intervento complesso come un unico blocco indistinto.</p></>} />
              <TagList items={["Prodotto", "Brand / Colore", "Arrivo previsto", "Stato", "Azioni"]} warm />
            </div>
          </div>
        </section>

        <section className="assistenza-section sky">
          <div className="assistenza-wrap assistenza-text-feature">
            <div>
              <SectionHeading eyebrow="TEMPI" title="Sai cosa stai aspettando." body={<p>Quando la gestione di un’assistenza dipende dall’arrivo di un prodotto o di un componente, la data prevista deve essere facile da trovare. Totalone mantiene visibili gli arrivi previsti anche all’interno del flusso post-vendita.</p>} />
              <Flow items={["PRODOTTO", "ARRIVO PREVISTO", "ASSISTENZA"]} className="mini-flow" />
            </div>
          </div>
        </section>

        <section className="assistenza-section">
          <div className="assistenza-wrap assistenza-text-feature">
            <div>
              <SectionHeading eyebrow="TUTTO NEL SUO CONTESTO" title="I documenti rimangono collegati all’assistenza." body={<p>Evita di separare le informazioni operative dai documenti necessari per gestire il caso. La documentazione rimane associata alla singola assistenza, così il team può recuperarla dal punto in cui sta già lavorando.</p>} />
              <a className="assistenza-inline-link" href="#top">Documenti dell’assistenza <ChevronRight size={15} /></a>
            </div>
          </div>
        </section>

        <section className="assistenza-section warm">
          <div className="assistenza-wrap assistenza-text-feature">
            <div>
              <SectionHeading eyebrow="COSTI DI ASSISTENZA" title="Anche il post-vendita ha un costo." body={<p>All’interno della schedina di assistenza, Totalone prevede uno spazio dedicato ai costi. Le informazioni economiche dell’intervento rimangono collegate alla relativa assistenza, invece di essere gestite in strumenti separati.</p>} />
            </div>
          </div>
        </section>

        <section className="assistenza-section">
          <div className="assistenza-wrap">
            <SectionHeading eyebrow="TROVA SUBITO QUELLO CHE CERCHI" title="Da decine di assistenze al caso giusto, in pochi secondi." body={<p>Cerca per cliente, prodotto, brand o venditore e utilizza i filtri per restringere rapidamente la vista. Quando il numero di clienti cresce, trovare l’informazione giusta diventa parte del lavoro.</p>} />
            <TagList items={["CLIENTE", "PRODOTTO", "BRAND", "VENDITORE", "FILTRI AVANZATI"]} />
          </div>
        </section>

        <section className="assistenza-section connected">
          <div className="assistenza-wrap assistenza-text-feature">
            <div>
              <SectionHeading eyebrow="NON PERDERE LA STORIA" title="Chiudere un’assistenza non significa perdere le informazioni." body={<p>Le assistenze concluse possono essere separate dal lavoro operativo corrente mantenendo uno storico consultabile. La vista quotidiana rimane ordinata senza perdere il contesto dei casi precedenti.</p>} />
              <Flow items={["ASSISTENZE ATTIVE", "PRONTE", "ARCHIVIO"]} className="mini-flow" />
            </div>
          </div>
        </section>

        <section className="assistenza-section sky">
          <div className="assistenza-wrap assistenza-split reverse">
            <div>
              <SectionHeading eyebrow="CONTINUITÀ" title="Il post-vendita inizia dove il montaggio finisce." body={<p>Consegna e montaggio non rappresentano necessariamente l’ultimo passaggio della relazione con il cliente. Quando serve un intervento successivo, Totalone permette di continuare a gestire il lavoro nello stesso ecosistema.</p>} />
              <a className="assistenza-inline-link" href="/__mockup/preview/totalone-montaggi/MontaggiProductPage">Scopri la gestione Montaggi <ArrowRight size={15} /></a>
            </div>
            <Flow items={["MONTAGGIO", "ASSISTENZA", "RISOLUZIONE", "STORICO"]} className="vertical-card-flow" />
          </div>
        </section>

        <section className="assistenza-section warm">
          <div className="assistenza-wrap">
            <SectionHeading eyebrow="UN UNICO FLUSSO" title="Dalla segnalazione alla gestione dell’assistenza." body={<p>Ogni passaggio mantiene il collegamento con il cliente e con i prodotti coinvolti, evitando di ricostruire ogni volta informazioni già presenti nel sistema.</p>} />
            <Flow items={["CLIENTE", "ASSISTENZA", "PRODOTTI", "ARRIVI PREVISTI", "GESTIONE", "ARCHIVIO"]} className="long-flow" />
          </div>
        </section>

        <section className="assistenza-section">
          <div className="assistenza-wrap">
            <SectionHeading eyebrow="POST-VENDITA ORGANIZZATO" title="Meno tempo a ricostruire il problema. Più chiarezza su cosa fare." />
            <Comparison positive={["Cliente", "Assistenza", "Prodotti", "Stati", "Arrivi previsti", "Documenti", "Costi", "Storico"]} />
            <p className="assistenza-highlight">“Il post-vendita rimane parte della storia del cliente.”</p>
          </div>
        </section>

        <section className="assistenza-section deep">
          <div className="assistenza-wrap">
            <SectionHeading eyebrow="PERCHÉ TOTALONE" title="Vendere un arredo è solo una parte della relazione con il cliente." body={<p>Per uno showroom, il servizio continua anche dopo consegna e montaggio. Totalone porta l’assistenza nello stesso ecosistema utilizzato per seguire il cliente.</p>} />
            <div className="assistenza-pillars dark">
              <article><span>CONTESTO</span><h3>Cliente e prodotti</h3><p>Rimangono collegati all’assistenza.</p></article>
              <article><span>CONTROLLO</span><h3>Stati leggibili</h3><p>Sai cosa è da gestire, in gestione o pronto.</p></article>
              <article><span>CONTINUITÀ</span><h3>Un solo sistema</h3><p>Il post-vendita continua nello stesso ambiente.</p></article>
            </div>
          </div>
        </section>

        <section className="assistenza-section">
          <div className="assistenza-wrap">
            <SectionHeading eyebrow="UN PROCESSO, NON TANTI SOFTWARE" title="Dal primo contatto al post-vendita." body={<p>Totalone collega le diverse fasi del lavoro di uno showroom in un unico sistema, mantenendo continuità tra vendita, operatività e servizio al cliente.</p>} />
            <div className="assistenza-ecosystem">
              {[
                ["CRM", "Gestisci il cliente.", "/__mockup/preview/totalone-crm/CrmProductPage"],
                ["TRATTATIVA", "Segui l’opportunità.", "/gestione-trattative-arredamento/"],
                ["PREVENTIVO", "Costruisci l’offerta.", "/__mockup/preview/totalone-preventivi/PreventiviProductPage"],
                ["COMMESSA", "Segui ciò che hai venduto.", "/__mockup/preview/totalone-commesse/CommesseProductPage"],
                ["MAGAZZINO", "Segui arrivi e prodotti.", "/__mockup/preview/totalone-magazzino/MagazzinoProductPage"],
                ["MONTAGGIO", "Organizza l’intervento.", "/__mockup/preview/totalone-montaggi/MontaggiProductPage"],
                ["ASSISTENZA", "Continua la relazione.", "#top"],
              ].map(([title, body, href], index) => (
                <a className={`assistenza-ecosystem-item ${title === "ASSISTENZA" ? "active" : ""}`} href={href} key={title}>
                  <span>0{index + 1}</span><strong>{title}</strong><small>{body}</small><ArrowRight size={15} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="assistenza-section sky assistenza-seo">
          <div className="assistenza-wrap">
            <Eyebrow tone="dark">ASSISTENZA E POST-VENDITA ARREDAMENTO</Eyebrow>
            <h2>Software per la gestione dell’assistenza nel settore arredamento.</h2>
            <div className="assistenza-seo-copy">
              <p>Totalone è un gestionale per arredatori e showroom che permette di organizzare le attività di assistenza e post-vendita mantenendo collegati clienti e prodotti.</p>
              <p>Dalla panoramica delle assistenze al dettaglio dei prodotti coinvolti, Totalone aiuta il team a gestire stati, arrivi previsti, documenti e informazioni operative in un unico ambiente: gestione assistenza arredamento, software assistenza arredamento e gestione post vendita arredamento nello stesso sistema.</p>
            </div>
          </div>
        </section>

        <section className="assistenza-final">
          <div className="assistenza-wrap assistenza-final-grid">
            <div>
              <Eyebrow>ASSISTENZA TOTALONE</Eyebrow>
              <h2>Il rapporto con il cliente non finisce con la consegna.</h2>
              <p>Scopri come Totalone può aiutarti a organizzare il post-vendita e mantenere clienti, prodotti e assistenze nello stesso sistema.</p>
              <div className="assistenza-actions">
                <DemoTrigger variant="light">Prenota una demo</DemoTrigger>
                <a className="assistenza-button outline" href="/gestionale-arredamento/">Scopri tutte le funzionalità <ChevronRight size={15} /></a>
              </div>
              <p className="assistenza-final-note">Una demo costruita sul modo in cui lavora il tuo showroom.</p>
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}