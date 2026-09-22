import { useEffect, type ReactNode } from "react";
import { ArrowDown, ArrowRight, Check, ChevronRight } from "lucide-react";
import { MarketingShell } from "../totalone-site-architecture/_shared/MarketingShell";
import "./CommesseMarginiFocus.css";

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <span className={`margin-eyebrow ${dark ? "dark" : ""}`}>{children}</span>;
}

function ScreenshotPlaceholder({ label }: { label: string }) {
  return (
    <figure className="margin-shot">
      <div className="margin-shot-frame" role="img" aria-label={label}>
        <div>
          <span>{label}</span>
          <small>Spazio riservato allo screenshot reale Totalone</small>
        </div>
      </div>
    </figure>
  );
}

function DemoTrigger({ children, light = false }: { children: ReactNode; light?: boolean }) {
  const openDemo = () => document.querySelector<HTMLButtonElement>(".to-header-actions .to-button")?.click();
  return <button className={`margin-button ${light ? "light" : ""}`} onClick={openDemo}>{children}<ArrowRight size={15} /></button>;
}

function MarginRow({ number, title, body }: { number: string; title: string; body: string }) {
  return (
    <article className="margin-row">
      <span>{number}</span>
      <div><strong>{title}</strong><p>{body}</p></div>
    </article>
  );
}

export function CommesseMarginiFocus() {
  useEffect(() => {
    document.title = "Controllo dei Margini nella Commessa | Totalone";
  }, []);

  return (
    <MarketingShell active="Gestione commesse">
      <main className="margin-page">
        <section className="margin-hero">
          <div className="margin-orb" aria-hidden="true" />
          <div className="margin-wrap">
            <div className="margin-breadcrumb"><a href="/">Home</a><span>/</span><a href="/__mockup/preview/totalone-commesse/CommesseProductPage">Gestione commesse</a><span>/</span><span>Controllo margini</span></div>
            <div className="margin-hero-grid">
              <div>
                <Eyebrow dark>CONTROLLO DEI MARGINI</Eyebrow>
                <h1>Il margine resta dentro la commessa.</h1>
                <p>Leggi il rapporto tra ciò che hai venduto, i costi collegati e il lavoro che resta da seguire, partendo dalla stessa Schedina Cliente.</p>
                <div className="margin-actions"><DemoTrigger>Prenota una demo</DemoTrigger><a className="margin-button outline" href="#lettura-economica">Scopri come funziona <ArrowDown size={15} /></a></div>
                <span className="margin-micro">Un controllo più chiaro, senza separare numeri e operatività.</span>
              </div>
              <ScreenshotPlaceholder label="[SCREENSHOT — CONTROLLO MARGINI COMMESSA]" />
            </div>
          </div>
        </section>

        <section className="margin-section margin-warm" id="lettura-economica">
          <div className="margin-wrap">
            <div className="margin-intro-grid">
              <div><Eyebrow>LA SCHEDINA CLIENTE</Eyebrow><h2>Il valore della commessa non vive da solo.</h2></div>
              <div className="margin-copy"><p>La Schedina Cliente tiene vicini il valore venduto, i prodotti, gli sconti e i costi di servizio.</p><p>Così il team può leggere la commessa con il suo contesto economico, senza ricostruirlo tra fogli, email e strumenti diversi.</p></div>
            </div>
            <div className="margin-equation">
              <span>VENDUTO</span><i>+</i><span>PRODOTTI</span><i>+</i><span>SCONTI</span><i>+</i><span>COSTI DI SERVIZIO</span><b>→</b><strong>LETTURA ECONOMICA DELLA COMMESSA</strong>
            </div>
          </div>
        </section>

        <section className="margin-section">
          <div className="margin-wrap margin-split">
            <div>
              <Eyebrow>CONTROLLO DENTRO LA COMMESSA</Eyebrow>
              <h2>Non guardi solo quanto hai venduto. Capisci cosa stai gestendo.</h2>
              <p className="margin-lead">Prodotti, quantità, listino, sconto, prezzo finale e costi collegati restano riferimenti della stessa commessa.</p>
              <div className="margin-tags">{["Prodotti", "Quantità", "Listino", "Sconto", "Prezzo finale", "Costi di servizio"].map((item) => <span key={item}>{item}</span>)}</div>
            </div>
            <div className="margin-list"><MarginRow number="01" title="Valore venduto" body="Il valore commerciale rimane legato alla Schedina Cliente." /><MarginRow number="02" title="Costi collegati" body="I servizi della commessa restano nello stesso contesto operativo." /><MarginRow number="03" title="Margine da leggere" body="Il team può mettere in relazione numeri e attività prima di decidere." /></div>
          </div>
        </section>

        <section className="margin-section margin-sky">
          <div className="margin-wrap">
            <div className="margin-centered"><Eyebrow>UNA VISIONE CONDIVISA</Eyebrow><h2>Dal quadro generale alla singola commessa.</h2><p>Il controllo dei margini parte da informazioni che le persone possono ritrovare e leggere nello stesso punto.</p></div>
            <div className="margin-pillars"><div><span>01</span><strong>VEDI</strong><p>Il valore della commessa e ciò che la compone.</p></div><div><span>02</span><strong>COLLEGA</strong><p>Prodotti, sconti e costi di servizio al contesto corretto.</p></div><div><span>03</span><strong>DECIDI</strong><p>Intervieni con una lettura condivisa del lavoro.</p></div></div>
          </div>
        </section>

        <section className="margin-section">
          <div className="margin-wrap margin-split">
            <ScreenshotPlaceholder label="[SCREENSHOT — VISTA ECONOMICA DELLA COMMESSA]" />
            <div><Eyebrow>VISUAL DEL PRODOTTO</Eyebrow><h2>Un unico punto per leggere ciò che succede.</h2><p className="margin-lead">Qui sarà inserita la schermata reale Totalone dedicata al controllo economico della commessa. Nessuna tabella simulata: solo il contesto pronto per lo screenshot definitivo.</p><a className="margin-text-link" href="/__mockup/preview/totalone-commesse/CommesseProductPage">Torna alla Gestione Commesse <ArrowRight size={15} /></a></div>
          </div>
        </section>

        <section className="margin-section margin-deep">
          <div className="margin-wrap">
            <div className="margin-centered"><Eyebrow dark>PERCHÉ RESTA NELLA COMMESSA</Eyebrow><h2>Il controllo economico non deve staccarsi dall’operatività.</h2><p>Quando il valore resta collegato alla Schedina Cliente, la conversazione parte dallo stesso contesto usato per prodotti, ordini, pagamenti e servizi.</p></div>
            <div className="margin-checklist"><div><Check size={16} />Valore venduto collegato</div><div><Check size={16} />Sconti e prezzi nel contesto</div><div><Check size={16} />Costi di servizio visibili</div><div><Check size={16} />Informazioni condivise</div></div>
          </div>
        </section>

        <section className="margin-final">
          <div className="margin-wrap">
            <Eyebrow dark>GESTIONE COMMESSE TOTALONE</Eyebrow>
            <h2>Una commessa più leggibile, dall’incasso al margine.</h2>
            <p>Scopri come Totalone collega il lavoro operativo e la lettura economica della commessa nello stesso sistema.</p>
            <div className="margin-actions"><DemoTrigger light>Prenota una demo</DemoTrigger><a className="margin-button outline" href="/__mockup/preview/totalone-commesse/CommesseProductPage">Scopri la Gestione Commesse <ChevronRight size={15} /></a></div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}