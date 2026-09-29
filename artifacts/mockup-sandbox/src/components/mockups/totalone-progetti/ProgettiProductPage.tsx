import { useEffect, type ReactNode } from "react";
import { ArrowDown, ArrowRight, Check, ChevronRight } from "lucide-react";
import { MarketingShell } from "../totalone-site-architecture/_shared/MarketingShell";
import "./ProgettiProductPage.css";

const SEO_TITLE = "Gestione Progetti per Arredatori e Showroom | Totalone";
const META_DESCRIPTION = "Organizza progetti, attività, scadenze e team con Totalone. Il software per gestire il lavoro di negozi, showroom e aziende di arredamento.";

function DemoTrigger({ children, variant = "" }: { children: ReactNode; variant?: string }) {
  const openDemo = () => {
    document.querySelector<HTMLButtonElement>(".to-header-actions .to-button")?.click();
  };

  return <button className={`progetti-button ${variant}`} onClick={openDemo}>{children}<ArrowRight size={15} /></button>;
}

function Eyebrow({ children, tone = "" }: { children: ReactNode; tone?: string }) {
  return <span className={`progetti-eyebrow ${tone}`}>{children}</span>;
}

function SectionHeading({ eyebrow, title, body, tone = "" }: { eyebrow: string; title: string; body?: ReactNode; tone?: string }) {
  return (
    <div className="progetti-heading">
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {body && <div className={`progetti-lead ${tone === "dark" ? "progetti-deep-copy" : ""}`}>{body}</div>}
    </div>
  );
}

function ScreenshotPlaceholder({ label, caption, className = "" }: { label: string; caption?: string; className?: string }) {
  return (
    <figure className={`progetti-shot ${className}`}>
      <div className="progetti-shot-frame" role="img" aria-label={label}>
        <div>
          <span>{label}</span>
          <small>Spazio riservato allo screenshot reale Totalone</small>
        </div>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function TagList({ items, className = "" }: { items: string[]; className?: string }) {
  return <div className={`progetti-tag-list ${className}`}>{items.map((item) => <span key={item}>{item}</span>)}</div>;
}

function FlowStrip({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`progetti-flow ${className}`} aria-label="Flusso di lavoro del progetto">
      {items.map((item, index) => (
        <span className={`progetti-flow-item ${className.includes("card") ? "card" : ""}`} key={item}>
          <b>{String(index + 1).padStart(2, "0")}</b>{item}
          {index < items.length - 1 && <i aria-hidden="true">→</i>}
        </span>
      ))}
    </div>
  );
}

function ProgettiFlow() {
  const items = ["CREA IL PROGETTO", "COINVOLGI IL TEAM", "CREA I TASK", "ASSEGNA PRIORITÀ", "IMPOSTA LE SCADENZE", "SEGUI L’AVANZAMENTO", "COMPLETA"];
  return (
    <div className="progetti-flow-long" aria-label="Dal progetto al completamento">
      {items.map((item, index) => (
        <div className="progetti-flow-node" key={item}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{item}</strong>
        </div>
      ))}
    </div>
  );
}

export function ProgettiProductPage() {
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
    <MarketingShell active="Gestione progetti">
      <main className="progetti-page" id="top">
        <section className="progetti-hero">
          <div className="progetti-orb one" aria-hidden="true" />
          <div className="progetti-orb two" aria-hidden="true" />
          <div className="progetti-wrap">
            <div className="progetti-breadcrumb"><a href="/">Home</a><span>/</span><span>Gestione progetti</span></div>
            <div className="progetti-hero-grid">
              <div className="progetti-hero-copy">
                <Eyebrow>GESTIONE PROGETTI</Eyebrow>
                <h1>Ogni progetto.<br /><span>Ogni attività.</span><br />Tutto organizzato.</h1>
                <p>Organizza progetti, assegna attività al team, controlla scadenze e avanzamento e mantieni le informazioni di lavoro nello stesso spazio.</p>
                <div className="progetti-actions">
                  <DemoTrigger>Prenota una demo</DemoTrigger>
                  <a className="progetti-button outline" href="#concept">Scopri come funziona <ArrowDown size={15} /></a>
                </div>
                <p className="progetti-micro">Per showroom, negozi di arredamento e team che lavorano su più progetti contemporaneamente.</p>
              </div>
              <ScreenshotPlaceholder label="[SCREENSHOT — PANORAMICA PROGETTI]" className="progetti-hero-shot" />
            </div>
          </div>
        </section>

        <section className="progetti-section warm" id="concept">
          <div className="progetti-wrap">
            <div className="progetti-intro-grid">
              <SectionHeading eyebrow="UN POSTO PER ORGANIZZARE IL LAVORO" title="Dal progetto alle singole cose da fare." />
              <div className="progetti-copy">
                <p>Un progetto non è una lista di messaggi, appunti e scadenze sparse.</p>
                <p>Totalone permette di creare uno spazio dedicato a ogni progetto, coinvolgere le persone giuste e trasformare il lavoro da svolgere in attività concrete e tracciabili.</p>
              </div>
            </div>
            <div className="progetti-concept" aria-label="Dal progetto all'avanzamento">
              {["PROGETTO", "TEAM", "TASK", "SCADENZE", "AVANZAMENTO"].map((item, index) => (
                <div className="progetti-concept-node" key={item}>{item}<small>{String(index + 1).padStart(2, "0")}</small></div>
              ))}
            </div>
            <p className="progetti-quote">“Il team sa cosa deve fare, per quale progetto e a che punto è il lavoro.”</p>
          </div>
        </section>

        <section className="progetti-section" id="progetti">
          <div className="progetti-wrap progetti-copy-only">
            <div>
              <SectionHeading
                eyebrow="PROGETTI"
                title="Tutti i progetti attivi, a colpo d’occhio."
                body={<><p>Visualizza i progetti dell’azienda in un’unica panoramica e trova rapidamente quello su cui devi lavorare.</p><p>Ogni progetto mantiene insieme le persone coinvolte, le attività e il relativo avanzamento.</p></>}
              />
              <TagList items={["Nome progetto", "Persone coinvolte", "Numero di task", "Percentuale di completamento", "Valore associato", "Scadenza"]} />
              <p className="progetti-small-label">Viste e filtri disponibili</p>
              <TagList items={["Griglia", "Calendario", "Archivio", "Showroom", "Utenti", "I miei progetti", "Più recenti"]} className="blue" />
            </div>
          </div>
        </section>

        <section className="progetti-section connected">
          <div className="progetti-wrap progetti-split reverse">
            <div>
              <SectionHeading
                eyebrow="UNO SPAZIO CONDIVISO"
                title="Tutto ciò che riguarda un progetto rimane collegato."
                body={<><p>Crea un progetto per organizzare un lavoro interno, un’attività dello showroom o un’iniziativa che coinvolge più persone.</p><p>Il progetto diventa il contenitore delle attività del team e permette di seguirne l’avanzamento nel tempo.</p></>}
              />
              <p className="progetti-small-label">Esempi di lavoro, non categorie rigide</p>
              <TagList items={["Progetti cliente", "Attività showroom", "Logistica", "Opening", "Follow-up", "Formazione"]} className="warm" />
            </div>
            <div className="progetti-flow progetti-flow-item-wrap">
              <div className="progetti-flow-item card">PROGETTO</div>
              <div className="progetti-flow-item card">PERSONE</div>
              <div className="progetti-flow-item card">ATTIVITÀ</div>
              <div className="progetti-flow-item card">AVANZAMENTO</div>
            </div>
          </div>
        </section>

        <section className="progetti-section sky">
          <div className="progetti-wrap progetti-split wide">
            <div>
              <SectionHeading
                eyebrow="TASK MANAGEMENT"
                title="Trasforma ogni progetto in attività concrete."
                body={<><p>Crea task, collegali al progetto corretto e assegna priorità e scadenze.</p><p>In questo modo ogni persona può capire immediatamente cosa deve essere fatto e il lavoro non rimane disperso tra messaggi, email e appunti.</p></>}
              />
              <TagList items={["KANBAN", "LISTA", "CALENDARIO"]} className="blue" />
            </div>
            <ScreenshotPlaceholder label="[SCREENSHOT — TASK KANBAN]" caption="Le attività del progetto, nella vista reale del prodotto." className="progetti-shot large" />
          </div>
        </section>

        <section className="progetti-section warm">
          <div className="progetti-wrap">
            <SectionHeading eyebrow="AVANZAMENTO" title="Sai sempre cosa è fermo, cosa è in corso e cosa è stato completato." />
            <FlowStrip items={["DA FARE", "IN CORSO", "COMPLETATO"]} className="card" />
            <div className="progetti-quote">“Apri Totalone. Vedi cosa c’è da fare.”</div>
            <div className="progetti-copy"><p>Le attività vengono organizzate per stato, così il team può concentrarsi immediatamente su ciò che richiede attenzione.</p><p>Totalone rende visibile l’avanzamento senza dover ricostruire ogni volta la situazione del progetto.</p></div>
          </div>
        </section>

        <section className="progetti-section">
          <div className="progetti-wrap progetti-split">
            <div>
              <SectionHeading
                eyebrow="PRIORITÀ"
                title="Non tutte le attività hanno la stessa urgenza."
                body={<p>Organizza il lavoro indicando priorità e scadenze, così il team può distinguere ciò che richiede attenzione immediata dalle attività meno urgenti.</p>}
              />
              <div className="progetti-filter-row"><span className="progetti-filter">ALTA</span><span className="progetti-filter">MEDIA</span><span className="progetti-filter">BASSA</span><span className="progetti-filter">+ SCADENZA</span></div>
            </div>
            <div className="progetti-progress" aria-label="Esempio concettuale di avanzamento progetto">
              <div><small>12 TASK</small><div className="progetti-progress-track"><span /></div><small>8 COMPLETATI</small></div>
              <strong>67%</strong>
            </div>
          </div>
        </section>

        <section className="progetti-section connected">
          <div className="progetti-wrap progetti-split">
            <div>
              <SectionHeading
                eyebrow="TEAM"
                title="Ogni attività ha le persone giuste."
                body={<><p>Organizza i progetti coinvolgendo i membri del team e mantieni chiaro chi sta lavorando su cosa.</p><p>I filtri per utenti, showroom e “I miei progetti” aiutano ogni persona a concentrarsi sulle attività che la riguardano.</p></>}
              />
              <p className="progetti-highlight">“Meno domande su chi deve fare cosa.”</p>
            </div>
            <div className="progetti-flow" aria-label="Assegnazione del lavoro">
              <span className="progetti-flow-item card">PROGETTO</span><span className="progetti-flow-item card">PERSONE</span><span className="progetti-flow-item card">TASK</span>
            </div>
          </div>
        </section>

        <section className="progetti-section sky">
          <div className="progetti-wrap progetti-copy-only">
            <div>
              <SectionHeading
                eyebrow="AVANZAMENTO"
                title="Non limitarti a creare task. Guarda il progetto avanzare."
                body={<p>Totalone mostra il rapporto tra attività completate e attività totali, permettendo di comprendere rapidamente lo stato di avanzamento del progetto.</p>}
              />
              <div className="progetti-progress"><div><small>12 TASK</small><div className="progetti-progress-track"><span /></div><small>8 COMPLETATI</small></div><strong>67%</strong></div>
            </div>
          </div>
        </section>

        <section className="progetti-section">
          <div className="progetti-wrap progetti-split wide">
            <div>
              <SectionHeading eyebrow="TEMPO" title="Progetti e attività anche nel tempo." body={<p>Passa dalla panoramica dei progetti alla vista calendario per leggere il lavoro anche attraverso scadenze e pianificazione temporale.</p>} />
              <TagList items={["Progetti", "Attività", "Scadenze", "Pianificazione"]} />
            </div>
            <ScreenshotPlaceholder label="[SCREENSHOT — CALENDARIO PROGETTI]" caption="Leggi il lavoro anche attraverso il calendario." className="progetti-shot large" />
          </div>
        </section>

        <section className="progetti-section warm">
          <div className="progetti-wrap progetti-copy-only">
            <div>
              <SectionHeading
                eyebrow="WHITE PAPER"
                title="Ogni showroom può avere il suo spazio di lavoro condiviso."
                body={<><p>Totalone include un White Paper dedicato allo showroom: uno spazio in cui raccogliere informazioni, appunti e contenuti operativi utili al team.</p><p>Scrivi e struttura il documento direttamente all’interno di Totalone, mantenendo le informazioni importanti accessibili nello stesso ambiente di lavoro.</p></>}
              />
              <TagList items={["Editor di testo", "Formattazione", "Contenuti organizzati", "Selezione showroom", "Salvataggio", "Copia del contenuto", "Download nei documenti"]} className="warm" />
            </div>
          </div>
        </section>

        <section className="progetti-section sky">
          <div className="progetti-wrap">
            <SectionHeading eyebrow="UN FLUSSO SEMPLICE" title="Organizza il lavoro senza complicarlo." body={<p>Dal quadro generale alla singola attività, ogni livello rimane collegato.</p>} />
            <ProgettiFlow />
          </div>
        </section>

        <section className="progetti-section">
          <div className="progetti-wrap">
            <SectionHeading
              eyebrow="ORGANIZZAZIONE"
              title="Funziona per una persona. Funziona per tutta l’azienda."
              body={<><p>Filtra progetti e attività per showroom e utenti oppure concentrati esclusivamente sui progetti che ti riguardano.</p><p>Quando aumentano persone, sedi e attività, la struttura del lavoro rimane leggibile.</p></>}
            />
            <div className="progetti-filter-row"><span className="progetti-filter">SHOWROOM</span><span className="progetti-filter">UTENTI</span><span className="progetti-filter">I MIEI PROGETTI</span></div>
          </div>
        </section>

        <section className="progetti-section connected">
          <div className="progetti-wrap progetti-copy-only">
            <div>
              <SectionHeading eyebrow="STORICO" title="I progetti conclusi non devono occupare il lavoro di oggi." body={<><p>Archivia i progetti completati mantenendo la vista principale concentrata sulle attività ancora operative.</p><p>Il lavoro corrente rimane pulito senza perdere lo storico dei progetti precedenti.</p></>} />
            </div>
          </div>
        </section>

        <section className="progetti-section warm">
          <div className="progetti-wrap">
            <SectionHeading eyebrow="MENO DISPERSIONE" title="Il lavoro non dovrebbe vivere tra WhatsApp, email e memoria." />
            <div className="progetti-comparison">
              <div><span>LAVORO DISPERSO</span><ul>{["Messaggi", "Email", "Appunti", "File separati", "Scadenze ricordate a voce", "Attività senza un responsabile chiaro"].map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div className="positive"><span>CON TOTALONE</span><ul>{["Progetti", "Team", "Task", "Priorità", "Scadenze", "Avanzamento", "White Paper"].map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></div>
            </div>
            <p className="progetti-highlight">“Un unico posto per capire cosa stiamo facendo e cosa dobbiamo fare dopo.”</p>
          </div>
        </section>

        <section className="progetti-section connected">
          <div className="progetti-wrap">
            <SectionHeading eyebrow="NON È UN TOOL ISOLATO" title="La gestione del lavoro vive dentro Totalone." body={<p>Progetti e task fanno parte dello stesso ambiente in cui il team gestisce clienti, vendite, commesse e operatività.</p>} />
            <div className="progetti-ecosystem">
              {[
                ["CRM", "Gestisci clienti e contatti.", "/__mockup/preview/totalone-crm/CrmProductPage"],
                ["GESTIONE TRATTATIVE", "Segui le opportunità commerciali.", "/gestione-trattative-arredamento/"],
                ["PREVENTIVI", "Costruisci le offerte.", "/__mockup/preview/totalone-preventivi/PreventiviProductPage"],
                ["GESTIONE COMMESSE", "Segui ciò che è stato venduto.", "/__mockup/preview/totalone-commesse/CommesseProductPage"],
                ["GESTIONE PROGETTI", "Organizza il lavoro da fare.", "#top"],
              ].map(([title, body, href], index) => (
                <a className={`progetti-ecosystem-item ${title === "GESTIONE PROGETTI" ? "active" : ""}`} href={href} key={title}>
                  <span>0{index + 1}</span><strong>{title}</strong><small>{body}</small><ArrowRight size={15} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="progetti-section">
          <div className="progetti-wrap">
            <SectionHeading eyebrow="DUE STRUMENTI, DUE OBIETTIVI" title="La commessa segue ciò che hai venduto. Il progetto organizza ciò che devi fare." />
            <div className="progetti-comparison">
              <div><span>GESTIONE COMMESSE</span><ul>{["Segue la commessa cliente.", "Prodotti.", "Ordini.", "Arrivi.", "Documenti.", "Pagamenti.", "Montaggio.", "Assistenza."].map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div className="positive"><span>GESTIONE PROGETTI</span><ul>{["Organizza il lavoro.", "Progetti.", "Persone.", "Task.", "Priorità.", "Scadenze.", "Avanzamento.", "Informazioni condivise."].map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></div>
            </div>
            <p className="progetti-highlight">“Due livelli diversi, nello stesso sistema.”</p>
          </div>
        </section>

        <section className="progetti-section sky progetti-seo">
          <div className="progetti-wrap">
            <Eyebrow tone="dark">GESTIONE PROGETTI ARREDAMENTO</Eyebrow>
            <h2>Software per la gestione dei progetti nell’arredamento.</h2>
            <div className="progetti-seo-copy">
              <p>Totalone aiuta showroom, negozi e aziende di arredamento a organizzare progetti, task, persone e scadenze in un unico ambiente.</p>
              <p>Dalla panoramica dei progetti alle singole attività, il team può vedere cosa deve essere fatto, seguire l’avanzamento e mantenere il lavoro organizzato anche quando aumentano persone, showroom e progetti. Una gestione progetti arredamento pensata per chi cerca un software gestione progetti arredamento e un gestionale per arredatori, con la gestione task showroom e l’organizzazione showroom nello stesso sistema.</p>
            </div>
          </div>
        </section>

        <section className="progetti-final">
          <div className="progetti-wrap progetti-final-grid">
            <div>
              <Eyebrow>GESTIONE PROGETTI TOTALONE</Eyebrow>
              <h2>Dai al team un unico posto in cui organizzare il lavoro.</h2>
              <p>Scopri come Totalone può aiutarti a trasformare progetti, attività e scadenze in un flusso di lavoro condiviso.</p>
              <div className="progetti-actions">
                <DemoTrigger variant="light">Prenota una demo</DemoTrigger>
                <a className="progetti-button outline" href="/gestionale-arredamento/">Scopri tutte le funzionalità <ChevronRight size={15} /></a>
              </div>
              <p className="progetti-final-note">Una demo costruita sul modo in cui lavora il tuo showroom.</p>
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}