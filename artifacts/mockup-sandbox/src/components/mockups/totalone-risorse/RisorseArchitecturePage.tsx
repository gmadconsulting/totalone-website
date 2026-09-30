import { ArrowRight, BookOpen, Boxes, ChevronRight, FileText, Layers3 } from "lucide-react";
import { MarketingShell } from "../totalone-site-architecture/_shared/MarketingShell";
import "./RisorseArchitecturePage.css";

const appPath = (path: string) => path.startsWith("/__mockup/") ? path : `${import.meta.env.BASE_URL.replace(/\/$/, "")}/preview${path}`;

type TopicCluster = {
  label: string;
  slug: string;
  h1: string;
  topics: string[];
  destination: string;
  destinationLabel: string;
};

type GuideDefinition = {
  number: string;
  slug: string;
  title: string;
  h1: string;
  chapters: string[];
  cta: string;
  link: string;
};

const topicClusters: TopicCluster[] = [
  { label: "Gestione showroom", slug: "/blog/gestione-showroom", h1: "Gestione di negozi e showroom di arredamento", topics: ["organizzazione showroom", "digitalizzazione", "software gestionale", "processi", "multi-showroom", "organizzazione aziendale"], destination: "/perche-totalone", destinationLabel: "Perché Totalone" },
  { label: "Vendite & CRM", slug: "/blog/vendite-crm", h1: "Vendite e CRM per showroom di arredamento", topics: ["clienti", "lead", "ingressi showroom", "trattative", "pipeline", "follow-up", "conversione"], destination: "/crm-per-arredatori", destinationLabel: "CRM per arredatori" },
  { label: "Preventivi", slug: "/blog/preventivi", h1: "Preventivi per negozi e showroom di arredamento", topics: ["creazione preventivi", "preventivi cucine", "revisioni", "presentazione offerte", "organizzazione preventivi", "conversione preventivo → vendita"], destination: "/preventivi-arredatori", destinationLabel: "Preventivi" },
  { label: "Commesse & Progetti", slug: "/blog/commesse-progetti", h1: "Gestione di commesse e progetti nell’arredamento", topics: ["gestione commesse", "organizzazione progetti", "attività", "controllo commessa", "coordinamento team", "avanzamento"], destination: "/__mockup/preview/totalone-commesse/CommesseProductPage", destinationLabel: "Gestione commesse" },
  { label: "Logistica & Magazzino", slug: "/blog/logistica-magazzino", h1: "Logistica e magazzino per negozi di arredamento", topics: ["arrivi", "magazzino", "prodotti", "colli", "consegne", "logistica"], destination: "/gestione-magazzino-arredamento/", destinationLabel: "Magazzino e logistica" },
  { label: "Montaggi & Post-vendita", slug: "/blog/montaggi-post-vendita", h1: "Montaggi e post-vendita nell’arredamento", topics: ["pianificazione montaggi", "calendario montaggi", "rapportini", "assistenza", "prodotti in assistenza", "post-vendita"], destination: "/gestione-montaggi-arredamento/", destinationLabel: "Montaggi" },
  { label: "Controllo & Performance", slug: "/blog/controllo-performance", h1: "Controllo e performance per showroom di arredamento", topics: ["KPI", "vendite", "conversioni", "performance venditori", "performance showroom", "controllo aziendale"], destination: "/controllo-performance-arredamento", destinationLabel: "Controllo e performance" },
];

const guides: GuideDefinition[] = [
  { number: "01", slug: "/guide/gestione-showroom-arredamento", title: "Gestione showroom", h1: "Guida completa alla gestione di uno showroom di arredamento", chapters: ["Come funziona uno showroom moderno", "Gestione dei clienti", "Organizzazione delle trattative", "Creazione dei preventivi", "Gestione delle commesse", "Post-vendita"], cta: "Esplora la gestione dello showroom", link: "/perche-totalone" },
  { number: "02", slug: "/guide/crm-per-arredatori", title: "CRM per arredatori", h1: "CRM per arredatori: guida alla gestione di clienti e trattative", chapters: ["Cos’è un CRM per arredatori", "Come organizzare i contatti", "Come registrare gli ingressi showroom", "Come gestire lead e opportunità", "Come organizzare la pipeline", "Follow-up e appuntamenti"], cta: "Scopri il CRM Totalone →", link: "/crm-per-arredatori" },
  { number: "03", slug: "/guide/preventivi-arredamento", title: "Preventivi arredamento", h1: "Preventivi per arredamento: guida completa", chapters: ["Come strutturare un preventivo di arredamento", "Prodotti e composizioni", "Specifiche e finiture", "Prezzi, quantità, sconti e IVA", "Gestire più versioni", "Dal preventivo alla commessa"], cta: "Scopri i Preventivi Totalone →", link: "/preventivi-arredatori" },
  { number: "04", slug: "/guide/gestione-commesse-arredamento", title: "Gestione commesse", h1: "Gestione commesse nell’arredamento: guida completa", chapters: ["Cos’è una commessa di arredamento", "Dal preventivo alla commessa", "Organizzare le informazioni", "Controllare lo stato della commessa", "Coordinare le attività", "Dalla commessa al montaggio"], cta: "Scopri Gestione commesse Totalone →", link: "/__mockup/preview/totalone-commesse/CommesseProductPage" },
  { number: "05", slug: "/guide/gestione-magazzino-arredamento", title: "Gestione magazzino", h1: "Gestione del magazzino nell’arredamento: guida pratica", chapters: ["Le particolarità del magazzino nell’arredamento", "Prodotti, clienti e commesse", "Gestire gli arrivi previsti", "Tracciare lo stato dei prodotti", "Gestire i colli", "Organizzare le consegne"], cta: "Scopri Magazzino e logistica Totalone →", link: "/gestione-magazzino-arredamento/" },
  { number: "06", slug: "/guide/digitalizzazione-negozio-arredamento", title: "Digitalizzazione negozio", h1: "Come digitalizzare un negozio di arredamento", chapters: ["Perché digitalizzare i processi", "Da Excel a un sistema condiviso", "Centralizzare clienti e contatti", "Digitalizzare i preventivi", "Gestire le commesse", "Misurare le performance"], cta: "Scopri perché Totalone →", link: "/perche-totalone" },
];

export function RisorseArchitecturePage() {
  return (
    <MarketingShell active="Risorse" eyebrow="RISORSE · ARCHITETTURA EDITORIALE" title="Risorse per gestire meglio il tuo showroom." description="Guide, approfondimenti e risorse per organizzare vendite, preventivi, commesse, logistica e operatività di negozi e showroom di arredamento.">
      <main className="risorse-architecture">
        <section className="to-section" aria-labelledby="hub-title">
          <div className="to-wrap">
            <div className="ra-intro-grid">
              <div className="ra-intro-copy">
                <span className="ra-kicker">Il punto di partenza</span>
                <h2 id="hub-title" className="ra-display">Un sistema editoriale che segue il lavoro.</h2>
                <p>Risorse è il livello informativo che accompagna chi gestisce un negozio o uno showroom: dalla domanda concreta, alla comprensione del processo, fino alla pagina prodotto più rilevante.</p>
              </div>
              <div className="ra-meta-stack" aria-label="Metadati della pagina Risorse">
                <div className="ra-meta-card"><span>SEO title</span><strong>Risorse per Showroom e Negozi di Arredamento | Totalone</strong></div>
                <div className="ra-meta-card"><span>Meta description</span><strong>Guide, approfondimenti e risorse per organizzare vendite, preventivi, commesse, logistica e operatività di negozi e showroom di arredamento.</strong></div>
                <div className="ra-meta-card"><span>URL canonico</span><strong>/risorse/</strong></div>
              </div>
            </div>
            <div className="ra-pillars">
              <article className="ra-pillar ra-pillar--featured">
                <div className="ra-pillar-icon"><BookOpen size={19} /></div>
                <h3>Approfondimenti dal mondo dell’arredamento</h3>
                <p>Strategie, processi e consigli pratici per organizzare meglio il lavoro quotidiano dello showroom.</p>
                <a className="ra-pillar-link" href={appPath("/blog/")}>Esplora il blog <ArrowRight size={14} /></a>
              </article>
              <article className="ra-pillar">
                <div className="ra-pillar-icon"><Layers3 size={19} /></div>
                <h3>Guide pratiche</h3>
                <p>Contenuti approfonditi dedicati ai processi più importanti di un’azienda di arredamento.</p>
                <a className="ra-pillar-link" href={appPath("/guide/")}>Scopri le guide <ArrowRight size={14} /></a>
              </article>
              <article className="ra-pillar">
                <div className="ra-pillar-icon"><Boxes size={19} /></div>
                <h3>Strumenti per il tuo showroom</h3>
                <p>Risorse pratiche per analizzare organizzazione, tempo e processi della tua azienda.</p>
                <a className="ra-pillar-link" href={appPath("/strumenti/roi/")}>Calcola il valore del tuo tempo <ArrowRight size={14} /></a>
              </article>
            </div>
          </div>
        </section>

        <section className="to-section sky" aria-labelledby="topics-title">
          <div className="to-wrap">
            <div className="ra-section-head">
              <div><span className="ra-kicker">Esplora per argomento</span><h2 id="topics-title" className="ra-display">Sette cluster. Un solo contesto.</h2></div>
              <p>Ogni cluster parte da un problema di lavoro riconoscibile, raccoglie articoli specifici e porta alla destinazione Totalone pertinente.</p>
            </div>
            <div className="ra-topic-layout">
              <nav className="ra-topic-list" aria-label="Cluster SEO del blog">
                {topicClusters.map((cluster, index) => <a className="ra-topic-row" href={appPath(cluster.slug)} key={cluster.slug}><span className="ra-topic-number">0{index + 1}</span><span><strong>{cluster.label}</strong><small>{cluster.h1}</small></span><ChevronRight size={16} /></a>)}
              </nav>
              <aside className="ra-topic-note">
                <span className="ra-kicker">Regola di collegamento</span>
                <h3>Imparare, capire, scegliere.</h3>
                <p>Il blog intercetta intenti informativi specifici. Le guide organizzano il processo. Le pagine prodotto restano il punto commerciale più forte.</p>
                <div className="ra-note-lines"><span>1 guida pillar primaria per articolo</span><span>1 pagina prodotto contestuale</span><span>2–4 articoli laterali rilevanti</span><span>1 CTA verso la demo</span></div>
              </aside>
            </div>
          </div>
        </section>

        <section className="to-section" aria-labelledby="blog-title">
          <div className="to-wrap">
            <div className="ra-section-head">
              <div><span className="ra-kicker">/blog</span><h2 id="blog-title" className="ra-display">Il blog risponde a domande precise.</h2></div>
              <p>Non una griglia di notizie: un’interfaccia editoriale per strategie, processi e strumenti del lavoro quotidiano.</p>
            </div>
            <div className="ra-blog-layout">
              <article className="ra-editorial-feature">
                <div className="ra-feature-mark" aria-label="Segnaposto editoriale senza immagine"><div className="ra-feature-mark-inner" /></div>
                <div className="ra-feature-content"><span className="ra-kicker">Articolo in evidenza · da pubblicare</span><h3>Come gestire una domanda reale dello showroom senza perdere il filo.</h3><p>Spazio riservato a un articolo pubblicato dal CMS. Nessuna data, autore o statistica viene mostrata prima che esista contenuto finito.</p><a className="ra-pillar-link" href={appPath("/blog/")}>Apri il blog hub <ArrowRight size={14} /></a></div>
              </article>
              <aside className="ra-editorial-side"><div><span className="ra-kicker" style={{ color: "#9fe0ff" }}>Guide highlights</span><h3>Dal singolo passaggio al metodo completo.</h3><p>Le guide approfondiscono i processi e collegano gli articoli alle pagine prodotto esistenti.</p></div><a className="ra-pillar-link" href={appPath("/guide/")}>Scopri le guide <ArrowRight size={14} /></a></aside>
            </div>
            <div className="ra-category-board">
                <div className="ra-category-board-header"><h3>Navigazione per categoria</h3><span>7 destinazioni editoriali</span></div>
              <div className="ra-category-chips">{topicClusters.map((cluster) => <a className="ra-category-chip" href={appPath(cluster.slug)} key={cluster.slug}>{cluster.label}</a>)}</div>
            </div>
          </div>
        </section>

        <section className="to-section" style={{ background: "#082c68" }} aria-labelledby="journey-title">
          <div className="to-wrap">
            <div className="ra-section-head">
              <div><span className="ra-kicker" style={{ color: "#9fe0ff" }}>Sistema di linking interno</span><h2 id="journey-title" className="ra-display" style={{ color: "white" }}>Ogni contenuto apre il passo successivo.</h2></div>
              <p style={{ color: "#cfe7ff" }}>Una gerarchia leggibile per utenti e motori di ricerca, senza collegamenti aggiunti solo per aumentare il conteggio.</p>
            </div>
            <div className="ra-journey" aria-label="Percorso di navigazione interno">
              {[["01", "Articolo", "Intento informativo specifico"], ["02", "Categoria", "Il tema di riferimento"], ["03", "Guida", "Il processo completo"], ["04", "Pagina prodotto", "La destinazione commerciale"], ["05", "Demo", "Il prossimo passo"]].map(([number, title, body]) => <div className="ra-journey-step" key={title}><span>{number}</span><strong>{title}</strong><small>{body}</small></div>)}
            </div>
            <div className="to-flow" aria-label="Esempio di percorso interno"><a href={appPath("/blog/vendite-crm/gestire-ingressi-showroom")}><FileText size={13} /> gestire-ingressi-showroom</a><i>→</i><a href={appPath("/guide/crm-per-arredatori")}><BookOpen size={13} /> CRM per arredatori</a><i>→</i><a href={appPath("/crm-per-arredatori")}>CRM Totalone</a><i>→</i><a href={appPath("/demo/")}>Prenota una demo</a></div>
          </div>
        </section>

        <section className="to-section sky" aria-labelledby="guides-title">
          <div className="to-wrap">
            <div className="ra-guide-intro">
              <div><span className="ra-kicker">/guide</span><h2 id="guides-title" className="ra-display">Guide per gestire e far crescere il tuo showroom.</h2></div>
              <p>Approfondimenti pratici sui processi che collegano vendite, operatività e controllo nel settore dell’arredamento. Più autorevoli del blog, strutturati per capitoli e con una destinazione prodotto esplicita.</p>
            </div>
            <div className="ra-guide-grid">
              {guides.map((guide) => <article className="ra-guide-card" key={guide.slug}><span className="ra-guide-index">{guide.number}</span><div><h3>{guide.title}</h3><code className="ra-route">{guide.slug}</code><div className="ra-chapter-preview">{guide.chapters.slice(0, 4).map((chapter) => <span key={chapter}>{chapter}</span>)}</div><a className="ra-guide-cta" href={appPath(guide.link)}>{guide.cta} <ArrowRight size={14} /></a></div></article>)}
            </div>
          </div>
        </section>

        <section className="to-section" style={{ background: "#082c68", color: "white" }} aria-labelledby="final-title">
          <div className="to-wrap">
            <div className="ra-final">
              <div><span className="ra-kicker" style={{ color: "#9fe0ff" }}>Il prossimo passo</span><h2 id="final-title" className="ra-display" style={{ color: "white" }}>Dalla domanda alla tua commessa.</h2><p>Le risorse aiutano a capire il processo. Totalone aiuta a portarlo nello stesso modo di lavorare.</p></div>
              <div className="ra-final-actions"><a className="to-button light" href={appPath("/demo/")}>Prenota una demo <ArrowRight size={15} /></a><a className="to-button secondary" href={appPath("/gestionale-arredamento/")}>Scopri il gestionale <ArrowRight size={15} /></a></div>
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}