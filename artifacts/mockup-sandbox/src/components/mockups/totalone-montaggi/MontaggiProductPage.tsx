import { useEffect, type ReactNode } from "react";
import { ArrowDown, ArrowRight, CalendarDays, Check, ChevronRight, ClipboardCheck, FileText, Paperclip, Search } from "lucide-react";
import { MarketingShell } from "../totalone-site-architecture/_shared/MarketingShell";
import "./MontaggiProductPage.css";

const SEO_TITLE = "Gestione Montaggi per Arredatori e Showroom | Totalone";
const META_DESCRIPTION = "Pianifica i montaggi e raccogli i rapportini di fine lavori con Totalone. Il software per la gestione dei montaggi di showroom e negozi di arredamento.";

function DemoTrigger({ children, variant = "" }: { children: ReactNode; variant?: string }) {
  const openDemo = () => document.querySelector<HTMLButtonElement>(".to-header-actions .to-button")?.click();
  return <button className={`montaggi-button ${variant}`} onClick={openDemo}>{children}<ArrowRight size={15} /></button>;
}

function Eyebrow({ children, tone = "" }: { children: ReactNode; tone?: string }) {
  return <span className={`montaggi-eyebrow ${tone}`}>{children}</span>;
}

function SectionHeading({ eyebrow, title, body, tone = "" }: { eyebrow: string; title: string; body?: ReactNode; tone?: string }) {
  return (
    <div className="montaggi-heading">
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {body && <div className={`montaggi-lead ${tone === "dark" ? "montaggi-deep-copy" : ""}`}>{body}</div>}
    </div>
  );
}

function ScreenshotPlaceholder({ label, caption, className = "" }: { label: string; caption?: string; className?: string }) {
  return (
    <figure className={`montaggi-shot ${className}`}>
      <div className="montaggi-shot-frame" role="img" aria-label={label}>
        <div className="montaggi-shot-copy">
          <span>{label}</span>
          <small>Spazio riservato allo screenshot reale Totalone</small>
        </div>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function Flow({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`montaggi-flow ${className}`} aria-label="Flusso operativo del montaggio">
      {items.map((item, index) => (
        <div className="montaggi-flow-item" key={item}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{item}</strong>
          {index < items.length - 1 && <i aria-hidden="true">→</i>}
        </div>
      ))}
    </div>
  );
}

function PillList({ items, tone = "" }: { items: string[]; tone?: string }) {
  return <div className={`montaggi-pills ${tone}`}>{items.map((item) => <span key={item}>{item}</span>)}</div>;
}

export function MontaggiProductPage() {
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
    <MarketingShell active="Montaggi">
      <main className="montaggi-page" id="top">
        <section className="montaggi-hero">
          <div className="montaggi-orb one" aria-hidden="true" />
          <div className="montaggi-orb two" aria-hidden="true" />
          <div className="montaggi-wrap">
            <div className="montaggi-breadcrumb"><a href="/">Home</a><span>/</span><span>Gestione montaggi</span></div>
            <div className="montaggi-hero-grid">
              <div className="montaggi-hero-copy">
                <Eyebrow>GESTIONE MONTAGGI</Eyebrow>
                <h1>Dal calendario al fine lavori,<br /><span>ogni montaggio</span><br />sotto controllo.</h1>
                <p>Pianifica i montaggi, visualizza gli interventi previsti e raccogli i rapportini di fine lavori in un unico sistema collegato alle attività del tuo showroom.</p>
                <div className="montaggi-actions">
                  <DemoTrigger>Prenota una demo</DemoTrigger>
                  <a className="montaggi-button outline" href="#pianificazione">Scopri come funziona <ArrowDown size={15} /></a>
                </div>
                <p className="montaggi-micro">Pensato per showroom, negozi di arredamento e team di installazione.</p>
              </div>
              <ScreenshotPlaceholder label="[SCREENSHOT — CALENDARIO MONTAGGI PREVISTI]" className="montaggi-hero-shot" />
            </div>
          </div>
        </section>

        <section className="montaggi-section warm" id="pianificazione">
          <div className="montaggi-wrap">
            <div className="montaggi-intro-grid">
              <SectionHeading eyebrow="DALLA PIANIFICAZIONE AL CANTIERE" title="Il montaggio non dovrebbe iniziare da un foglio Excel e finire in una chat." />
              <div className="montaggi-copy">
                <p>La fase di montaggio è uno dei momenti più delicati di una commessa di arredamento.</p>
                <p>Date, clienti, interventi e informazioni di fine lavori devono rimanere accessibili anche quando il lavoro esce dallo showroom.</p>
                <p>Totalone riunisce pianificazione e rapportini nello stesso flusso, così il team sa cosa deve essere montato e mantiene traccia di ciò che è successo.</p>
              </div>
            </div>
            <div className="montaggi-benefits">
              <article><CalendarDays size={20} /><Eyebrow tone="coral">PIANIFICA</Eyebrow><p>Visualizza i montaggi previsti direttamente a calendario.</p></article>
              <article><ClipboardCheck size={20} /><Eyebrow tone="coral">COORDINA</Eyebrow><p>Sai quali clienti hanno un montaggio programmato e quando.</p></article>
              <article><FileText size={20} /><Eyebrow tone="coral">DOCUMENTA</Eyebrow><p>A fine lavori, il rapportino mantiene traccia dell’intervento effettuato.</p></article>
            </div>
          </div>
        </section>

        <section className="montaggi-section sky">
          <div className="montaggi-wrap">
            <SectionHeading eyebrow="PIANIFICAZIONE" title="Guarda i prossimi montaggi direttamente a calendario." body={<><p>Totalone organizza i montaggi previsti in una vista temporale semplice da leggere.</p><p>In pochi secondi puoi capire quali clienti hanno un intervento programmato, in quale giorno e come sono distribuiti i montaggi nel corso del mese.</p></>} />
            <ScreenshotPlaceholder label="[SCREENSHOT — MONTAGGI PREVISTI]" caption="Una vista immediata dei montaggi programmati nel tempo." className="montaggi-shot-wide" />
          </div>
        </section>

        <section className="montaggi-section">
          <div className="montaggi-wrap">
            <SectionHeading eyebrow="UNA VISIONE CHIARA" title="Sai cosa è previsto oggi, questa settimana e nelle prossime." body={<p>La vista calendario rende leggibile la distribuzione dei montaggi e aiuta il team a mantenere una visione condivisa degli interventi programmati.</p>} />
            <Flow items={["OGGI", "QUESTA SETTIMANA", "PROSSIMI MONTAGGI"]} className="soft" />
            <p className="montaggi-quote">“Dal calendario generale al singolo cliente, senza ricostruire la pianificazione tra strumenti diversi.”</p>
          </div>
        </section>

        <section className="montaggi-section connected">
          <div className="montaggi-wrap montaggi-split">
            <div>
              <SectionHeading eyebrow="OGNI MONTAGGIO HA UN CLIENTE" title="Non pianifichi semplicemente una data." body={<><p>Ogni montaggio appartiene a un cliente e fa parte di un processo iniziato molto prima dell’intervento.</p><p>Totalone mantiene il contesto visibile anche nella fase operativa, evitando che la pianificazione diventi una lista di appuntamenti scollegati dal resto del lavoro.</p></>} />
              <Flow items={["CLIENTE", "COMMESSA", "MONTAGGIO"]} className="compact" />
              <p className="montaggi-highlight">“Il montaggio continua la storia della commessa.”</p>
            </div>
            <div className="montaggi-context-note"><span>CONTESTO OPERATIVO</span><strong>Una data ha valore quando sai<br />a quale lavoro appartiene.</strong></div>
          </div>
        </section>

        <section className="montaggi-section">
          <div className="montaggi-wrap montaggi-split reverse">
            <div>
              <SectionHeading eyebrow="DAL MAGAZZINO AL MONTAGGIO" title="Quando i prodotti sono pronti, il lavoro continua." body={<><p>La logistica e il montaggio fanno parte dello stesso percorso operativo.</p><p>Totalone mantiene questi processi nello stesso ecosistema, riducendo la frammentazione tra ciò che viene gestito in magazzino e ciò che deve essere installato.</p></>} />
              <Flow items={["PRODOTTI", "MAGAZZINO", "MONTAGGIO"]} className="compact" />
              <a className="montaggi-inline-link" href="/__mockup/preview/totalone-magazzino/MagazzinoProductPage">Scopri Magazzino e Logistica <ChevronRight size={16} /></a>
            </div>
            <div className="montaggi-path-visual"><div><span>01</span><strong>PRODOTTI</strong></div><div><span>02</span><strong>MAGAZZINO</strong></div><div className="active"><span>03</span><strong>MONTAGGIO</strong></div></div>
          </div>
        </section>

        <section className="montaggi-section warm montaggi-rapportini">
          <div className="montaggi-wrap">
            <SectionHeading eyebrow="FINE LAVORI" title="Il montaggio finisce. Le informazioni rimangono." body={<><p>Al termine dell’intervento puoi creare un rapportino di montaggio e mantenere traccia di ciò che è stato fatto.</p><p>Cliente, data, autore, note e documentazione dell’intervento rimangono raccolti nello stesso ambiente e possono essere consultati successivamente.</p></>} />
            <ScreenshotPlaceholder label="[SCREENSHOT — RAPPORTINI DI MONTAGGIO]" caption="Ogni intervento lascia una traccia consultabile." className="montaggi-shot-wide strong" />
          </div>
        </section>

        <section className="montaggi-section">
          <div className="montaggi-wrap montaggi-split">
            <div>
              <SectionHeading eyebrow="DOCUMENTAZIONE" title="Scrivi cosa è successo. E ritrovalo quando serve." body={<p>Il rapportino permette di raccogliere le informazioni di fine lavori direttamente dopo l’intervento.</p>} />
              <PillList items={["Cliente", "Data", "Autore", "Note dell’intervento", "Foto, quando presenti"]} />
            </div>
            <div className="montaggi-equation" aria-label="Composizione del rapportino">
              <div><ClipboardCheck size={19} /><strong>INTERVENTO</strong></div><b>+</b><div><FileText size={19} /><strong>NOTE</strong></div><b>+</b><div><Paperclip size={19} /><strong>FOTO</strong></div><b>=</b><div className="result"><strong>STORICO DEL<br />MONTAGGIO</strong></div>
            </div>
          </div>
        </section>

        <section className="montaggi-section sky">
          <div className="montaggi-wrap montaggi-split reverse">
            <div>
              <SectionHeading eyebrow="QUELLO CHE È SUCCESSO, DOCUMENTATO" title="Una nota oggi può evitare una ricerca domani." body={<><p>A fine lavori puoi descrivere ciò che è stato eseguito e allegare fotografie quando necessario.</p><p>Questo conserva il contesto dell’intervento e rende più semplice recuperare le informazioni anche a distanza di tempo.</p></>} />
              <PillList items={["Montaggio completato", "Lavorazioni eseguite", "Eventuali osservazioni", "Informazioni utili per attività successive"]} tone="blue" />
            </div>
            <div className="montaggi-notes-visual"><div className="montaggi-note-line"><span>NOTE DELL’INTERVENTO</span><i /></div><div className="montaggi-note-line short"><span>DOCUMENTAZIONE</span><i /></div><div className="montaggi-note-footer"><Paperclip size={16} /> Foto, quando presenti</div></div>
          </div>
        </section>

        <section className="montaggi-section">
          <div className="montaggi-wrap montaggi-text-feature">
            <div>
              <SectionHeading eyebrow="STORICO" title="I rapportini non spariscono in una cartella." body={<p>Consulta i rapportini già creati e recupera rapidamente le informazioni relative agli interventi precedenti.</p>} />
              <p className="montaggi-copy montaggi-search-copy">La ricerca permette di trovare un rapportino utilizzando informazioni come cliente, autore o note, mentre il filtro temporale aiuta a restringere il periodo da analizzare.</p>
              <PillList items={["Ricerca", "Cliente", "Autore", "Note", "Periodo"]} />
            </div>
          </div>
        </section>

        <section className="montaggi-section connected">
          <div className="montaggi-wrap montaggi-split reverse">
            <div>
              <SectionHeading eyebrow="IL PROCESSO CONTINUA" title="Se dopo il montaggio serve intervenire, il contesto è già lì." body={<><p>Il fine lavori non significa necessariamente la fine della relazione con il cliente.</p><p>Mantenere uno storico dell’intervento aiuta il team a conservare informazioni utili anche nelle fasi successive della commessa.</p></>} />
              <Flow items={["MONTAGGIO", "RAPPORTINO", "ASSISTENZA"]} className="compact" />
              <a className="montaggi-inline-link" href="/post-vendita-arredamento/">Scopri la gestione Assistenze <ChevronRight size={16} /></a>
            </div>
            <div className="montaggi-after-note"><span>DOPO IL FINE LAVORI</span><strong>Il contesto resta<br />nello stesso posto.</strong></div>
          </div>
        </section>

        <section className="montaggi-section dark">
          <div className="montaggi-wrap">
            <SectionHeading eyebrow="UN UNICO FLUSSO" title="Prima pianifichi. Poi monti. Infine documenti." tone="dark" body={<p>Le informazioni accompagnano il lavoro dalla programmazione dell’intervento fino alla documentazione di ciò che è stato eseguito.</p>} />
            <Flow items={["MONTAGGIO PREVISTO", "PIANIFICAZIONE", "INTERVENTO", "RAPPORTINO", "STORICO"]} className="dark-flow" />
          </div>
        </section>

        <section className="montaggi-section warm">
          <div className="montaggi-wrap">
            <SectionHeading eyebrow="MENO PASSAGGI" title="Meno informazioni disperse tra ufficio e montaggio." />
            <div className="montaggi-comparison">
              <div><span>PRIMA DI TOTALONE</span><ul>{["Calendari separati", "Fogli Excel", "Messaggi", "Foto nelle chat", "Note sparse", "Rapportini difficili da recuperare"].map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div className="positive"><span>CON TOTALONE</span><ul>{["Montaggi previsti", "Calendario", "Clienti", "Rapportini", "Note", "Foto", "Storico"].map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></div>
            </div>
            <p className="montaggi-quote">“Pianificazione e fine lavori rimangono nello stesso sistema.”</p>
          </div>
        </section>

        <section className="montaggi-section">
          <div className="montaggi-wrap">
            <SectionHeading eyebrow="PERCHÉ TOTALONE" title="Il montaggio fa parte della commessa." body={<><p>Per un negozio di arredamento il lavoro non termina quando il prodotto viene venduto.</p><p>La consegna e il montaggio sono parte dell’esperienza del cliente e devono rimanere collegati al resto del processo.</p><p>Totalone porta anche questa fase nello stesso ecosistema utilizzato dal team.</p></>} />
            <div className="montaggi-pillars">
              <article><Eyebrow tone="coral">PIANIFICATO</Eyebrow><h3>Vedi il prossimo passo.</h3><p>I prossimi montaggi sono visibili nel calendario.</p></article>
              <article><Eyebrow tone="coral">DOCUMENTATO</Eyebrow><h3>Conserva ciò che è successo.</h3><p>Note e fotografie mantengono traccia dell’intervento.</p></article>
              <article><Eyebrow tone="coral">COLLEGATO</Eyebrow><h3>Continua la storia.</h3><p>Il montaggio continua il processo iniziato con cliente e commessa.</p></article>
            </div>
          </div>
        </section>

        <section className="montaggi-section connected">
          <div className="montaggi-wrap">
            <SectionHeading eyebrow="TOTALONE" title="Dal primo contatto al fine lavori." body={<p>Ogni fase continua nello stesso ecosistema, senza trasformarsi ogni volta in un nuovo file o in uno strumento separato.</p>} />
            <div className="montaggi-ecosystem">
              {[
                ["CRM", "Gestisci clienti e contatti.", "/__mockup/preview/totalone-crm/CrmProductPage"],
                ["TRATTATIVA", "Segui le opportunità commerciali.", "/gestione-trattative-arredamento/"],
                ["PREVENTIVO", "Costruisci le offerte.", "/__mockup/preview/totalone-preventivi/PreventiviProductPage"],
                ["COMMESSA", "Segui ciò che è stato venduto.", "/__mockup/preview/totalone-commesse/CommesseProductPage"],
                ["MAGAZZINO", "Segui prodotti e arrivi.", "/__mockup/preview/totalone-magazzino/MagazzinoProductPage"],
                ["MONTAGGIO", "Pianifica e documenta.", "#top"],
                ["ASSISTENZA", "Continua a seguire il cliente.", "/post-vendita-arredamento/"],
              ].map(([title, body, href], index) => <a className={`montaggi-ecosystem-item ${title === "MONTAGGIO" ? "active" : ""}`} href={href} key={title}><span>0{index + 1}</span><strong>{title}</strong><small>{body}</small><ArrowRight size={15} /></a>)}
            </div>
          </div>
        </section>

        <section className="montaggi-section sky montaggi-seo">
          <div className="montaggi-wrap">
            <Eyebrow tone="dark">GESTIONE MONTAGGI ARREDAMENTO</Eyebrow>
            <h2>Software per la gestione dei montaggi nell’arredamento.</h2>
            <div className="montaggi-seo-copy">
              <p>Totalone è un gestionale per arredatori e showroom che permette di pianificare i montaggi e raccogliere i rapportini di fine lavori nello stesso ambiente utilizzato per gestire il resto della commessa.</p>
              <p>La vista calendario rende immediatamente visibili gli interventi programmati, mentre i rapportini permettono di mantenere uno storico delle attività svolte, delle note e della documentazione disponibile: gestione montaggi arredamento, software montaggi arredamento, pianificazione montaggi mobili e rapportini montaggio nello stesso software showroom arredamento.</p>
            </div>
          </div>
        </section>

        <section className="montaggi-final">
          <div className="montaggi-wrap montaggi-final-grid">
            <div>
              <Eyebrow>MONTAGGI TOTALONE</Eyebrow>
              <h2>Dal prossimo montaggio al fine lavori, tutto nello stesso posto.</h2>
              <p>Scopri come Totalone può aiutarti a pianificare gli interventi e mantenere uno storico chiaro del lavoro svolto.</p>
              <div className="montaggi-actions"><DemoTrigger variant="light">Prenota una demo</DemoTrigger><a className="montaggi-button outline" href="/gestionale-arredamento/">Scopri tutte le funzionalità <ChevronRight size={15} /></a></div>
              <p className="montaggi-final-note">Una demo costruita sul modo in cui lavora il tuo showroom.</p>
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}