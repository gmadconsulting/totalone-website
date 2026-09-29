import { useEffect, type ReactNode } from "react";
import { ArrowDown, ArrowRight, Check, ChevronRight } from "lucide-react";
import { MarketingShell } from "../totalone-site-architecture/_shared/MarketingShell";
import "./MagazzinoProductPage.css";

const SEO_TITLE = "Gestione Magazzino per Arredatori e Showroom | Totalone";
const META_DESCRIPTION = "Gestisci magazzino, arrivi previsti, prodotti, colli e documenti logistici con Totalone. Il software di magazzino pensato per showroom e negozi di arredamento.";

function DemoTrigger({ children, variant = "" }: { children: ReactNode; variant?: string }) {
  const openDemo = () => document.querySelector<HTMLButtonElement>(".to-header-actions .to-button")?.click();
  return <button className={`mag-button ${variant}`} onClick={openDemo}>{children}<ArrowRight size={15} /></button>;
}

function Eyebrow({ children, tone = "" }: { children: ReactNode; tone?: string }) {
  return <span className={`mag-eyebrow ${tone}`}>{children}</span>;
}

function SectionHeading({ eyebrow, title, body, tone = "" }: { eyebrow: string; title: string; body?: ReactNode; tone?: string }) {
  return (
    <div className="mag-heading">
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {body && <div className={`mag-lead ${tone === "dark" ? "mag-dark-copy" : ""}`}>{body}</div>}
    </div>
  );
}

function ScreenshotPlaceholder({ label, caption, className = "" }: { label: string; caption?: string; className?: string }) {
  return (
    <figure className={`mag-shot ${className}`}>
      <div className="mag-shot-frame" role="img" aria-label={label}>
        <div className="mag-placeholder-copy"><span>{label}</span><small>Spazio riservato allo screenshot reale Totalone</small></div>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function TagList({ items, className = "" }: { items: string[]; className?: string }) {
  return <div className={`mag-tags ${className}`}>{items.map((item) => <span key={item}>{item}</span>)}</div>;
}

function FlowStrip({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`mag-flow ${className}`} aria-label="Flusso della logistica">
      {items.map((item, index) => <span className="mag-flow-item" key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}{index < items.length - 1 && <i aria-hidden="true">→</i>}</span>)}
    </div>
  );
}

function ConnectedFlow() {
  const items = ["ORDINE", "ARRIVO PREVISTO", "RICEZIONE", "MAGAZZINO", "MONTAGGIO"];
  return <div className="mag-connected-flow" aria-label="Dal ordine al montaggio">{items.map((item, index) => <div className="mag-connected-node" key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < items.length - 1 && <i aria-hidden="true">→</i>}</div>)}</div>;
}

export function MagazzinoProductPage() {
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
    <MarketingShell active="Magazzino e logistica">
      <main className="mag-page" id="top">
        <section className="mag-hero">
          <div className="mag-orb one" aria-hidden="true" />
          <div className="mag-orb two" aria-hidden="true" />
          <div className="mag-wrap">
            <div className="mag-breadcrumb"><a href="/">Home</a><span>/</span><span>Magazzino e logistica</span></div>
            <div className="mag-hero-grid">
              <div className="mag-hero-copy">
                <Eyebrow>MAGAZZINO E LOGISTICA</Eyebrow>
                <h1>Sai cosa arriva.<br /><span>Sai dove si trova.</span></h1>
                <p>Segui prodotti, arrivi e colli dal momento dell’ordine fino al magazzino, mantenendo ogni elemento collegato al cliente e alla relativa commessa.</p>
                <div className="mag-actions"><DemoTrigger>Prenota una demo</DemoTrigger><a className="mag-button outline" href="#logistica">Scopri come funziona <ArrowDown size={15} /></a></div>
                <p className="mag-micro">Pensato per la logistica di showroom e negozi di arredamento.</p>
              </div>
              <ScreenshotPlaceholder label="[SCREENSHOT — MAGAZZINO LOGISTICO]" className="mag-hero-shot" />
            </div>
          </div>
        </section>

        <section className="mag-section warm" id="logistica">
          <div className="mag-wrap">
            <div className="mag-intro-grid"><SectionHeading eyebrow="UNA LOGISTICA PIÙ LEGGIBILE" title="Ogni prodotto ha una destinazione. E una storia." /><div className="mag-copy"><p>In una commessa di arredamento, i prodotti raramente arrivano tutti insieme.</p><p>Brand diversi, ordini diversi, date diverse e decine di colli possono rendere difficile capire cosa è realmente disponibile.</p><p>Totalone mantiene la logistica collegata alla vendita, così ogni prodotto conserva il proprio contesto.</p></div></div>
            <FlowStrip items={["CLIENTE", "COMMESSA", "PRODOTTO", "ARRIVO", "MAGAZZINO"]} className="mag-flow-box" />
            <p className="mag-quote">“Non gestisci semplicemente merce. Gestisci prodotti che appartengono a clienti e commesse precise.”</p>
          </div>
        </section>

        <section className="mag-section" id="magazzino">
          <div className="mag-wrap">
            <SectionHeading eyebrow="TUTTO IL MAGAZZINO" title="Tutto quello che passa dal magazzino, in una sola vista." body={<><p>Consulta i prodotti gestiti dalla logistica e trova rapidamente ciò che stai cercando.</p><p>Totalone mantiene visibili le informazioni necessarie per riconoscere ogni elemento e capire a quale cliente appartiene e a che punto si trova.</p></>} />
            <TagList items={["Cliente", "Sede / Magazzino", "Brand", "Prodotto", "Quantità", "Stato", "Colli", "Prezzo"]} />
            <ScreenshotPlaceholder label="[SCREENSHOT — TABELLA MAGAZZINO]" caption="Dal cliente al singolo prodotto, senza perdere il contesto della commessa." className="mag-wide-shot" />
          </div>
        </section>

        <section className="mag-section sky">
          <div className="mag-wrap mag-text-feature">
            <div><SectionHeading eyebrow="TROVA SUBITO QUELLO CHE CERCHI" title="Cerca per cliente, brand o prodotto." body={<><p>Quando il numero di commesse cresce, trovare rapidamente un elemento diventa fondamentale.</p><p>Totalone permette di cercare tra i prodotti e restringere la vista in base alle informazioni disponibili nel magazzino.</p></>} /><TagList items={["Ricerca cliente", "Brand", "Prodotto", "Stato", "Filtri", "Magazzino selezionato"]} className="blue" /></div>
          </div>
        </section>

        <section className="mag-section warm">
          <div className="mag-wrap">
            <SectionHeading eyebrow="STATO DEI PRODOTTI" title="Ogni prodotto può essere in una fase diversa." body={<><p>Una stessa commessa può contenere prodotti ordinati, altri già arrivati e altri ancora in lavorazione.</p><p>Totalone rende lo stato del singolo elemento immediatamente visibile, così il team può capire cosa sta succedendo senza ricostruire la situazione manualmente.</p></>} />
            <TagList items={["CONFERMATO", "ORDINATO", "ARRIVATO", "PROGRAMMATO", "IN CORSO", "ASSISTENZA"]} className="status" />
            <p className="mag-quote">“Lo stato appartiene al prodotto, non soltanto alla commessa.”</p>
          </div>
        </section>

        <section className="mag-section sky">
          <div className="mag-wrap">
            <SectionHeading eyebrow="ARRIVI PREVISTI" title="Guarda cosa sta arrivando, prima che arrivi." body={<><p>La vista calendario permette di leggere gli arrivi previsti nel tempo e capire quali prodotti sono attesi nei diversi giorni.</p><p>Invece di ricostruire le consegne tra email, conferme d’ordine e appunti, il team ha una visione temporale condivisa degli arrivi.</p></>} />
            <ScreenshotPlaceholder label="[SCREENSHOT — CALENDARIO ARRIVI PREVISTI]" caption="Il magazzino non vede soltanto cosa c’è. Vede anche cosa sta arrivando." className="mag-calendar-shot" />
          </div>
        </section>

        <section className="mag-section">
          <div className="mag-wrap mag-split">
            <div><SectionHeading eyebrow="PIANIFICAZIONE" title="Dalla settimana al singolo prodotto." body={<p>La vista degli arrivi aiuta a distribuire nel tempo ciò che deve essere ricevuto e rende più semplice capire quando più prodotti o commesse convergono sugli stessi giorni.</p>} /></div>
            <FlowStrip items={["OGGI", "PROSSIMI ARRIVI", "RICEZIONE", "MAGAZZINO"]} className="mag-flow-box" />
          </div>
        </section>

        <section className="mag-section connected">
          <div className="mag-wrap mag-split">
            <div><SectionHeading eyebrow="COLLI" title="Un prodotto può essere uno. I colli molti di più." body={<><p>Nel settore dell’arredamento sapere che un prodotto è arrivato non è sempre sufficiente.</p><p>Totalone mantiene visibile anche il numero di colli associati agli elementi della commessa, aiutando il team a verificare con maggiore chiarezza ciò che viene movimentato.</p></>} /></div>
            <div className="mag-colli"><span>PRODOTTO</span><b>↓</b><div><i>1</i><i>2</i><i>3</i><i>4</i><small>… COLLI</small></div><p>Più controllo su ciò che entra fisicamente in magazzino.</p></div>
          </div>
        </section>

        <section className="mag-section">
          <div className="mag-wrap mag-text-feature">
            <div><SectionHeading eyebrow="PIÙ MAGAZZINI" title="Sai anche dove si trova." body={<><p>Quando l’azienda lavora con più sedi o magazzini, la posizione diventa parte dell’informazione.</p><p>Totalone permette di lavorare sulla vista del magazzino selezionato e mantenere chiaro dove sono gestiti i diversi prodotti.</p></>} /><TagList items={["Magazzino selezionato", "Prodotti collegati", "Vista della sede"]} /></div>
          </div>
        </section>

        <section className="mag-section sky">
          <div className="mag-wrap mag-text-feature">
            <div><SectionHeading eyebrow="MOVIMENTI" title="Segui i movimenti, non soltanto la situazione attuale." body={<><p>La sezione Transazioni permette di affiancare alla vista del magazzino una lettura dei movimenti registrati.</p><p>Questo aiuta a mantenere maggiore continuità tra ciò che entra, ciò che viene gestito e la situazione corrente del magazzino.</p></>} /></div>
          </div>
        </section>

        <section className="mag-section warm">
          <div className="mag-wrap mag-concise"><SectionHeading eyebrow="DUE PROSPETTIVE" title="La logistica e il controllo possono richiedere viste diverse." body={<p>Totalone distingue la vista del Magazzino logistico dalla vista del Magazzino contabile, mantenendo le diverse esigenze di lettura all’interno dello stesso ambiente.</p>} /><div className="mag-two-views"><span>MAGAZZINO LOGISTICO</span><b>↔</b><span>MAGAZZINO CONTABILE</span></div></div>
        </section>

        <section className="mag-section">
          <div className="mag-wrap mag-text-feature">
            <div><SectionHeading eyebrow="DOCUMENTI LOGISTICI" title="Anche lo storico rimane accessibile." body={<p>Totalone mantiene accesso alle informazioni e ai documenti collegati alle attività di magazzino, evitando che lo storico operativo venga disperso.</p>} /><TagList items={["Archivio", "Storico DDT", "Storico distinte"]} /></div>
          </div>
        </section>

        <section className="mag-section connected">
          <div className="mag-wrap mag-split">
            <div><SectionHeading eyebrow="DAL VENDUTO AL FISICO" title="Il magazzino non parte da zero." body={<><p>I prodotti gestiti dalla logistica arrivano da ciò che è già stato venduto e organizzato nella commessa.</p><p>Questo permette di mantenere continuità tra cliente, prodotto e operatività, senza ricreare manualmente le stesse informazioni in un software separato.</p></>} /><FlowStrip items={["COMMESSA", "PRODOTTI", "ORDINI", "ARRIVI", "MAGAZZINO"]} className="mag-flow-box" /><a className="mag-text-link" href="/__mockup/preview/totalone-commesse/CommesseProductPage">Scopri la Gestione Commesse <ArrowRight size={15} /></a></div><div className="mag-context-card"><span>CONTINUITÀ</span><strong>Ciò che hai venduto continua a essere lo stesso prodotto anche quando entra in magazzino.</strong></div>
          </div>
        </section>

        <section className="mag-section">
          <div className="mag-wrap mag-split reverse">
            <div><SectionHeading eyebrow="IL PASSAGGIO SUCCESSIVO" title="Quando tutto è pronto, il lavoro passa al montaggio." body={<p>L’arrivo in magazzino non è la fine del processo. Totalone mantiene la logistica nello stesso ecosistema della gestione operativa, permettendo al team di proseguire verso la fase di montaggio senza perdere il contesto della commessa.</p>} /><FlowStrip items={["PRODOTTI", "MAGAZZINO", "MONTAGGIO"]} className="mag-flow-box" /><a className="mag-text-link" href="/gestione-montaggi-arredamento/">Scopri la gestione Montaggi <ArrowRight size={15} /></a></div><div className="mag-next-step"><span>IL PASSO SUCCESSIVO</span><strong>Prodotti pronti.<br />Contesto intatto.</strong></div>
          </div>
        </section>

        <section className="mag-section sky">
          <div className="mag-wrap"><div className="mag-centered"><SectionHeading eyebrow="UN UNICO FLUSSO" title="Dall’ordine all’installazione." body={<p>Ogni fase mantiene il collegamento con il prodotto, il cliente e la commessa a cui appartiene.</p>} /></div><ConnectedFlow /></div>
        </section>

        <section className="mag-section warm">
          <div className="mag-wrap"><SectionHeading eyebrow="MENO INFORMAZIONI SPARSE" title="Il magazzino non dovrebbe dipendere da fogli, email e memoria." /><div className="mag-comparison"><div><span>INFORMAZIONI SPARSE</span><ul>{["Fogli Excel", "Email dei fornitori", "Liste separate", "Appunti", "Telefonate", "Date da ricordare"].map((item) => <li key={item}>{item}</li>)}</ul></div><div className="positive"><span>CON TOTALONE</span><ul>{["Prodotti", "Clienti", "Stati", "Arrivi previsti", "Colli", "Magazzini", "Storico"].map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></div></div><p className="mag-quote">“Un unico posto per capire cosa deve arrivare, cosa è arrivato e dove si trova.”</p></div>
        </section>

        <section className="mag-section mag-why">
          <div className="mag-wrap"><SectionHeading eyebrow="PERCHÉ TOTALONE" title="Un magazzino costruito intorno alle commesse di arredamento." tone="dark" body={<><p>La logistica di un negozio di arredamento non funziona come quella di un normale e-commerce.</p><p>Ogni prodotto appartiene a un cliente, a una commessa e a un processo che continua fino alla consegna e al montaggio.</p><p>Totalone mantiene questi collegamenti anche quando la vendita diventa logistica.</p></>} /><div className="mag-pillars"><article><span>01</span><h3>VISIBILE</h3><p>Sai cosa è arrivato e cosa deve ancora arrivare.</p></article><article><span>02</span><h3>COLLEGATO</h3><p>Ogni prodotto mantiene il collegamento con cliente e commessa.</p></article><article><span>03</span><h3>PIANIFICATO</h3><p>Gli arrivi previsti diventano visibili nel tempo.</p></article></div></div>
        </section>

        <section className="mag-section connected">
          <div className="mag-wrap"><SectionHeading eyebrow="TOTALONE" title="Il magazzino è una fase del processo, non un software isolato." body={<p>Dal prodotto venduto fino al post-vendita, le informazioni continuano nello stesso ecosistema.</p>} /><div className="mag-ecosystem"><a href="/__mockup/preview/totalone-commesse/CommesseProductPage"><span>01</span><strong>GESTIONE COMMESSE</strong><small>Ciò che è stato venduto.</small><ArrowRight size={15} /></a><div className="active"><span>02</span><strong>MAGAZZINO E LOGISTICA</strong><small>Ciò che deve arrivare e dove si trova.</small><ArrowRight size={15} /></div><a href="/gestione-montaggi-arredamento/"><span>03</span><strong>MONTAGGI</strong><small>Ciò che deve essere installato.</small><ArrowRight size={15} /></a><a href="/post-vendita-arredamento/"><span>04</span><strong>ASSISTENZA</strong><small>Ciò che continua dopo.</small><ArrowRight size={15} /></a></div></div>
        </section>

        <section className="mag-section sky mag-seo">
          <div className="mag-wrap"><Eyebrow tone="dark">GESTIONE MAGAZZINO ARREDAMENTO</Eyebrow><h2>Software per la gestione del magazzino nell’arredamento.</h2><div className="mag-seo-copy"><p>Totalone è un gestionale per arredatori e showroom che permette di organizzare prodotti, arrivi, colli e informazioni di magazzino mantenendoli collegati alle relative commesse.</p><p>La vista del magazzino e il calendario degli arrivi previsti aiutano il team a sapere cosa deve arrivare, cosa è già disponibile e dove si trovano i prodotti durante il processo logistico. Una gestione magazzino arredamento pensata per chi cerca un software magazzino arredamento, un gestionale per arredatori e una gestione logistica arredamento più leggibile.</p></div></div>
        </section>

        <section className="mag-final">
          <div className="mag-wrap"><Eyebrow>MAGAZZINO TOTALONE</Eyebrow><h2>Dal prossimo arrivo al montaggio, sai sempre dove sei.</h2><p>Scopri come Totalone può aiutarti a collegare prodotti, commesse, arrivi e magazzino in un unico flusso costruito per il settore dell’arredamento.</p><div className="mag-actions"><DemoTrigger variant="light">Prenota una demo</DemoTrigger><a className="mag-button outline" href="/gestionale-arredamento/">Scopri tutte le funzionalità <ChevronRight size={15} /></a></div><p className="mag-final-note">Una demo costruita sul modo in cui lavora il tuo showroom.</p></div>
        </section>
      </main>
    </MarketingShell>
  );
}