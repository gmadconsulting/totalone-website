import { ArrowDown, ArrowRight, Check, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { MarketingShell } from "../totalone-site-architecture/_shared/MarketingShell";
import "./CrmProductPage.css";

const contactFeatures = ["Ricerca avanzata", "Smart List", "Tag", "Provenienza lead", "Informazioni di contatto", "Segmentazione"];
const showroomFeatures = ["Showroom", "Data e ora", "Venditore", "Provenienza", "Motivo della visita", "Collegamento al cliente"];
const flowSteps = ["Ingresso showroom", "Contatto CRM", "Conversazione", "Appuntamento", "Trattativa", "Preventivo", "Progetto"];

function Placeholder({ label, detail = "Spazio riservato allo screenshot reale del prodotto" }: { label: string; detail?: string }) {
  return (
    <div className="crm-placeholder" role="img" aria-label={`${label}. ${detail}`}>
      <div className="crm-placeholder-content">
        <div className="crm-placeholder-icon" aria-hidden="true" />
        <strong>{label}</strong>
        <span>{detail}</span>
      </div>
    </div>
  );
}

function DemoTrigger({ children, variant = "" }: { children: ReactNode; variant?: string }) {
  const openDemo = () => {
    const demoButton = document.querySelector<HTMLButtonElement>(".to-footer-cta .to-button");
    demoButton?.click();
  };
  return <button className={`crm-button ${variant}`} onClick={openDemo}>{children}<ArrowRight size={15} /></button>;
}

function FeaturePills({ items }: { items: string[] }) {
  return <div className="crm-feature-list">{items.map((item) => <span className="crm-feature" key={item}>{item}</span>)}</div>;
}

function SectionIntro({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return <div><span className="crm-eyebrow">{eyebrow}</span><h2 className="crm-title">{title}</h2>{body && <p className="crm-lead">{body}</p>}</div>;
}

export function CrmProductPage() {
  return (
    <MarketingShell active="CRM per arredatori">
      <main className="crm-page" id="top">
        <section className="crm-hero">
          <div className="crm-wrap crm-hero-inner">
            <div>
              <span className="crm-eyebrow">CRM PER ARREDATORI</span>
              <h1>Il CRM costruito per chi vende arredamento.</h1>
              <p className="crm-hero-copy">Dal primo ingresso in showroom alla trattativa commerciale, Totalone raccoglie clienti, visite, conversazioni e attività in un unico posto. Così il tuo team sa sempre chi seguire, cosa è successo e qual è il prossimo passo.</p>
              <div className="crm-hero-actions">
                <DemoTrigger>Prenota una demo</DemoTrigger>
                <a className="crm-button dark-secondary" href="#funzionalita">Scopri le funzionalità <ArrowDown size={15} /></a>
              </div>
              <p className="crm-micro">Pensato per showroom, negozi di arredamento e realtà multi-store.</p>
              <div className="crm-seo" aria-label="Metadati SEO della pagina">
                <div className="crm-seo-item"><span>URL</span><strong>/crm-per-arredatori</strong></div>
                <div className="crm-seo-item"><span>SEO title</span><strong>CRM per Arredatori e Negozi di Arredamento | Totalone</strong></div>
                <div className="crm-seo-item"><span>Meta description</span><strong>Gestisci clienti, ingressi showroom, lead, appuntamenti e trattative con Totalone, il CRM pensato per negozi e showroom di arredamento.</strong></div>
              </div>
            </div>
            <div className="crm-hero-visual">
              <Placeholder label="[SCREENSHOT REALE DA INSERIRE · CONTATTI CLIENTI]" detail="Visual principale: interfaccia Contatti Clienti, con tabella, ricerca e Smart List" />
            </div>
          </div>
        </section>

        <section className="crm-section warm" id="funzionalita">
          <div className="crm-wrap">
            <div className="crm-intro-grid">
              <SectionIntro eyebrow="PERCHÉ È DIVERSO" title="Non un CRM generico adattato all’arredamento." />
              <div>
                <p className="crm-lead">Vendere arredamento significa gestire molto più di un nome e un numero di telefono. Ci sono ingressi in showroom, richieste, appuntamenti, preventivi, follow-up e relazioni che possono durare mesi.</p>
                <p className="crm-lead">Totalone nasce dall’esperienza quotidiana nel settore dell’arredamento e collega queste informazioni in un unico flusso di lavoro.</p>
              </div>
            </div>
            <div className="crm-benefits">
              <article className="crm-benefit"><span className="crm-number">01</span><h3>Ogni contatto ha una storia</h3><p>Raccogli dati, provenienza, attività e informazioni commerciali senza disperderli tra Excel, email e appunti.</p></article>
              <article className="crm-benefit"><span className="crm-number">02</span><h3>Ogni opportunità ha un prossimo passo</h3><p>Sai quali clienti ricontattare, quali trattative stanno avanzando e quali richiedono attenzione.</p></article>
              <article className="crm-benefit"><span className="crm-number">03</span><h3>Tutto il team lavora sulle stesse informazioni</h3><p>Commerciali e showroom condividono una visione aggiornata del cliente.</p></article>
            </div>
          </div>
        </section>

        <section className="crm-section" id="contatti">
          <div className="crm-wrap crm-split">
            <div>
              <span className="crm-eyebrow">CONTATTI E LEAD</span>
              <h2>Tutti i tuoi clienti. Una sola vista.</h2>
              <p>Centralizza clienti e lead in un database condiviso e facilmente consultabile. Cerca rapidamente per nome, email, telefono o città e organizza i contatti in Smart List per avere sempre sotto controllo il pubblico che ti interessa.</p>
              <p>Dal nuovo lead al cliente storico, le informazioni restano accessibili al team e pronte per essere utilizzate nelle attività commerciali.</p>
              <FeaturePills items={contactFeatures} />
            </div>
            <figure>
              <Placeholder label="[SCREENSHOT REALE DA INSERIRE · CONTATTI CLIENTI]" detail="Contatti, Smart List, ricerca e tabella clienti" />
              <figcaption className="crm-visual-caption">Organizza centinaia di contatti senza perdere di vista quelli che contano.</figcaption>
            </figure>
          </div>
        </section>

        <section className="crm-section sky">
          <div className="crm-wrap crm-split reverse">
            <div>
              <span className="crm-eyebrow coral">INGRESSI SHOWROOM</span>
              <h2>Sai davvero chi entra nel tuo showroom?</h2>
              <p>Non tutte le visite diventano subito un contatto. Ma ogni ingresso racconta qualcosa.</p>
              <p>Con Totalone puoi registrare le visite nei tuoi showroom indicando cosa cercava il cliente, chi lo ha seguito, quando è entrato e da dove proviene. Anche quando il visitatore non vuole lasciare i propri dati.</p>
              <p>In questo modo quello che succede fisicamente in negozio non rimane più invisibile.</p>
              <FeaturePills items={showroomFeatures} />
              <a className="crm-text-link" href="/crm-per-arredatori/ingressi-showroom">Scopri la gestione ingressi showroom <ArrowRight size={15} /></a>
            </div>
            <div><Placeholder label="[SCREENSHOT REALE DA INSERIRE · INGRESSI SHOWROOM]" detail="Lista ingressi showroom con data, venditore, provenienza e motivo della visita" /></div>
          </div>
        </section>

        <section className="crm-section warm">
          <div className="crm-wrap">
            <SectionIntro eyebrow="SHOWROOM ANALYTICS" title="Trasforma gli ingressi in informazioni utili." body="Registrare le visite è solo l’inizio. Totalone trasforma i dati raccolti in una panoramica chiara dell’attività dei tuoi showroom. Confronta sedi, periodi e venditori. Analizza l’affluenza nel tempo e scopri quali showroom generano più traffico." />
            <div className="crm-kpi-row">
              {["Totale ingressi", "Trend", "Showroom", "Venditori"].map((item, index) => <div className="crm-kpi" key={item}><span>{item}</span><strong>{["247", "+18,4%", "4 sedi", "12"][index]}</strong><small>{index === 1 ? "rispetto al periodo precedente" : "concetto KPI"}</small></div>)}
            </div>
            <div className="crm-data-visual"><Placeholder label="[SCREENSHOT REALE DA INSERIRE · DASHBOARD INGRESSI]" detail="Dashboard con KPI, distribuzione ingressi per showroom, classifica venditori e affluenza settimanale" /></div>
          </div>
        </section>

        <section className="crm-section sky" id="trattative">
          <div className="crm-wrap">
            <div className="crm-pipeline-header">
              <div>
                <span className="crm-eyebrow">PIPELINE COMMERCIALE</span>
                <h2 className="crm-title">Dal primo contatto alla vendita.</h2>
                <p className="crm-lead">Visualizza tutte le opportunità commerciali e segui ogni cliente lungo il processo di vendita. Organizza le trattative per fase, assegna un valore alle opportunità e individua immediatamente quelle che richiedono un’azione. Da contatto iniziale a qualifica, appuntamento e preventivo: il team sa sempre dove si trova ogni trattativa.</p>
              </div>
              <a className="crm-button secondary" href="/gestione-trattative-arredamento/">Approfondisci la gestione trattative <ArrowRight size={15} /></a>
            </div>
            <div className="crm-stage-flow" aria-label="Fasi della pipeline commerciale">
              {["Contatto iniziale", "Qualifica", "Appuntamento", "Preventivo", "Chiusura"].map((stage, index) => <span key={stage}>{stage}</span>).flatMap((item, index, array) => index < array.length - 1 ? [item, <i aria-hidden="true" key={`arrow-${index}`}>→</i>] : [item])}
            </div>
            <div className="crm-pipeline-images">
              <figure className="crm-real-shot"><img src="/__mockup/images/crm-pipeline-overview.png" alt="Vista reale Totalone della pipeline trattative con KPI e opportunità commerciali" /><figcaption>Vista reale Totalone della pipeline trattative: KPI, fasi e opportunità commerciali.</figcaption></figure>
              <figure className="crm-real-shot"><img src="/__mockup/images/crm-pipeline-list.png" alt="Vista reale Totalone dell’elenco trattative con stato e valori" /><figcaption>Vista reale Totalone dell’elenco trattative con stato, valori e saldo.</figcaption></figure>
            </div>
          </div>
        </section>

        <section className="crm-section">
          <div className="crm-wrap crm-split">
            <div>
              <span className="crm-eyebrow coral">CONVERSAZIONI</span>
              <h2>Le conversazioni non restano separate dai clienti.</h2>
              <p>Centralizza le comunicazioni e collega le conversazioni al CRM.</p>
              <p>Quando arriva un nuovo contatto, puoi trasformarlo direttamente in un lead e iniziare a costruire il suo storico commerciale senza copiare manualmente informazioni da uno strumento all’altro.</p>
              <div className="crm-highlight">Una conversazione può diventare un’opportunità. In un click.</div>
            </div>
            <Placeholder label="[SCREENSHOT REALE DA INSERIRE · CONVERSAZIONI]" detail="Lista conversazioni con azione “Aggiungi al CRM”" />
          </div>
        </section>

        <section className="crm-section warm">
          <div className="crm-wrap crm-split reverse">
            <div>
              <span className="crm-eyebrow gold">AGENDA E APPUNTAMENTI</span>
              <h2>Clienti, appuntamenti e follow-up nello stesso flusso.</h2>
              <p>Organizza appuntamenti, incontri e attività commerciali in un calendario condiviso.</p>
              <p>Il team può vedere gli impegni, pianificare le prossime azioni e mantenere continuità nella relazione con il cliente senza affidarsi alla memoria personale del singolo venditore.</p>
            </div>
            <Placeholder label="[SCREENSHOT REALE DA INSERIRE · CALENDARIO]" detail="Calendario mensile Totalone con appuntamenti e attività commerciali" />
          </div>
        </section>

        <section className="crm-section sky">
          <div className="crm-wrap crm-split">
            <div>
              <span className="crm-eyebrow">NON SOLO CLIENTI</span>
              <h2>Anche la tua rete professionale, organizzata.</h2>
              <p>Un progetto di arredamento coinvolge clienti, fornitori, partner, trasportatori e molti altri interlocutori.</p>
              <p>Totalone permette di creare anagrafiche aziendali e associare i relativi contatti, così anche la rete professionale dello showroom rimane ordinata e accessibile.</p>
              <FeaturePills items={["Fornitori", "Partner", "Trasportatori", "Aziende", "Referenti"]} />
            </div>
            <Placeholder label="[SCREENSHOT REALE DA INSERIRE · CONTATTI AZIENDALI]" detail="Anagrafiche aziendali e relativi referenti" />
          </div>
        </section>

        <section className="crm-section">
          <div className="crm-wrap crm-split reverse">
            <div>
              <span className="crm-eyebrow coral">SEGMENTAZIONE E AUTOMATION</span>
              <h2>Il tuo database non deve essere solo un archivio.</h2>
              <p>Trasforma i dati raccolti dal CRM in azioni commerciali.</p>
              <p>Crea Smart List per segmentare i contatti e utilizza le liste per comunicazioni e campagne mirate. Puoi organizzare, ad esempio, clienti di uno specifico showroom, lead provenienti da una determinata fonte o gruppi di contatti con caratteristiche comuni.</p>
              <div className="crm-stage-flow"><span>Segmenta</span><i>→</i><span>Crea una lista</span><i>→</i><span>Comunica</span></div>
              <p className="crm-visual-caption">Più informazioni raccogli durante il lavoro quotidiano, più il tuo CRM diventa uno strumento utile per mantenere viva la relazione con clienti e prospect.</p>
            </div>
            <div className="crm-data-visual"><Placeholder label="[SCREENSHOT REALE DA INSERIRE · EMAIL MARKETING + SMART LIST]" detail="Email Marketing combinato con dettaglio Smart Lists" /></div>
          </div>
        </section>

        <section className="crm-section crm-flow-section">
          <div className="crm-wrap">
            <SectionIntro eyebrow="UN UNICO FLUSSO" title="Dal primo ingresso alla vendita, senza perdere informazioni." body="Totalone collega le diverse fasi del lavoro. Un’informazione inserita all’inizio del percorso continua ad accompagnare il cliente nelle fasi successive, riducendo passaggi manuali e informazioni disperse." />
            <div className="crm-flow-diagram" aria-label="Il flusso commerciale Totalone">
              {flowSteps.map((step, index) => <div className="crm-flow-node" key={step}><div className={index === 4 ? "active" : ""}><div><small>0{index + 1}</small><strong>{step}</strong></div></div>{index < flowSteps.length - 1 && <div className="crm-flow-connector" aria-hidden="true" />}</div>)}
            </div>
          </div>
        </section>

        <section className="crm-section ink" id="per-chi">
          <div className="crm-wrap">
            <span className="crm-eyebrow">PERCHÉ TOTALONE</span>
            <h2 className="crm-title">Un CRM nato dentro uno showroom, non dentro una software house.</h2>
            <p className="crm-lead">Totalone nasce dall’esperienza diretta nella gestione di showroom e progetti di arredamento.</p>
            <p className="crm-lead">Per questo il CRM non si limita a gestire contatti e opportunità: tiene conto di ciò che accade realmente nel settore, dagli ingressi fisici in negozio agli appuntamenti, fino alla trattativa e al preventivo.</p>
            <div className="crm-pillars">
              <article className="crm-pillar"><span>01 · VERTICALE</span><h3>VERTICALE</h3><p>Pensato intorno ai processi reali di chi vende arredamento.</p></article>
              <article className="crm-pillar"><span>02 · CONDIVISO</span><h3>CONDIVISO</h3><p>Le informazioni non appartengono al singolo venditore, ma diventano patrimonio dell’azienda.</p></article>
              <article className="crm-pillar"><span>03 · COLLEGATO</span><h3>COLLEGATO</h3><p>Il CRM è solo l’inizio: preventivi, progetti, commesse, logistica e controllo continuano nello stesso sistema.</p></article>
            </div>
          </div>
        </section>

        <section className="crm-section">
          <div className="crm-wrap crm-faq">
            <div><span className="crm-eyebrow gold">DOMANDE FREQUENTI</span><h2>Il CRM deve seguire il tuo modo di lavorare.</h2><div className="crm-links" aria-label="Approfondimenti Totalone"><a href="/gestionale-arredamento/">Gestionale arredamento <ExternalLink size={12} /></a><a href="/gestione-trattative-arredamento/">Gestione trattative <ExternalLink size={12} /></a><a href="/software-preventivi-arredamento/">Software preventivi <ExternalLink size={12} /></a><a href="/gestione-progetti-arredamento/">Gestione progetti <ExternalLink size={12} /></a><a href="/gestione-commesse-arredamento/">Gestione commesse <ExternalLink size={12} /></a></div></div>
            <div className="crm-faq-list">
              <details><summary>È pensato solo per chi ha un grande showroom?</summary><p>No. Totalone è pensato per negozi di arredamento, showroom e realtà multi-store: il flusso si adatta alla dimensione del team e al numero di sedi.</p></details>
              <details><summary>Posso collegare ingressi, lead e trattative?</summary><p>Sì. Il valore del CRM è proprio mantenere collegate le informazioni dal primo ingresso fino alle fasi commerciali successive.</p></details>
              <details><summary>Le informazioni restano condivise con il team?</summary><p>Sì. Clienti, attività, appuntamenti e opportunità diventano patrimonio dell’azienda, non della memoria del singolo venditore.</p></details>
              <details><summary>Da dove si parte per capire se Totalone è adatto?</summary><p>Da una demo costruita sul modo in cui lavora il tuo showroom: partiamo dal processo reale e dai passaggi che oggi vuoi rendere più chiari.</p></details>
            </div>
          </div>
        </section>

        <section className="crm-final">
          <div className="crm-wrap crm-final-inner">
            <div>
              <span className="crm-eyebrow">IL PROSSIMO PASSO</span>
              <h2>Scopri cosa succede quando tutto il tuo showroom lavora nello stesso posto.</h2>
              <p>Clienti, ingressi, conversazioni, appuntamenti e opportunità commerciali. Scopri come Totalone può organizzare il processo di vendita della tua azienda.</p>
              <div className="crm-final-actions"><DemoTrigger variant="light">Prenota una demo</DemoTrigger><a className="crm-button dark-secondary" href="#funzionalita">Scopri tutte le funzionalità <ArrowRight size={15} /></a></div>
              <p className="crm-final-note">Una demo costruita sul modo in cui lavora il tuo showroom.</p>
            </div>
            <div aria-hidden="true"><Check size={62} color="#9fe0ff" strokeWidth={1.2} /></div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}