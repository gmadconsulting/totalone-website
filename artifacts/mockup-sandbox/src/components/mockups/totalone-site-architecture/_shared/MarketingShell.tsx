import { useState, type ReactNode } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import "../_group.css";

const productGroups = [
  {
    label: "VENDITE",
    links: [
      ["CRM", "/__mockup/preview/totalone-crm/CrmProductPage"],
      ["Gestione trattative", "/gestione-trattative-arredamento/"],
      ["Preventivi", "/__mockup/preview/totalone-preventivi/PreventiviProductPage"],
    ],
  },
  {
    label: "OPERATIVITÀ",
    links: [
      ["Gestione progetti", "/__mockup/preview/totalone-progetti/ProgettiProductPage"],
      ["Gestione commesse", "/__mockup/preview/totalone-commesse/CommesseProductPage"],
      ["Magazzino e logistica", "/gestione-magazzino-arredamento/"],
      ["Montaggi", "/gestione-montaggi-arredamento/"],
      ["Assistenza e post-vendita", "/post-vendita-arredamento/"],
    ],
  },
  {
    label: "CONTROLLO",
    links: [["Controllo e performance", "/__mockup/preview/totalone-controllo/ControlloPerformanceProductPage"]],
  },
];

const navLinks = [
  ["Soluzioni", "/soluzioni/negozi-showroom-arredamento/"],
  ["Perché Totalone", "/perche-totalone/"],
  ["Risorse", "/__mockup/preview/totalone-risorse/RisorseArchitecturePage"],
];

function DemoModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="to-modal-backdrop" role="dialog" aria-modal="true" aria-label="Prenota una demo">
      <div className="to-modal">
        <button className="to-modal-close" onClick={onClose} aria-label="Chiudi"><X size={18} /></button>
        {!sent ? (
          <>
            <span className="to-eyebrow coral">Parliamo del tuo lavoro</span>
            <h2>Partiamo da una tua commessa.</h2>
            <p>Raccontaci come lavorate oggi. Ti mostriamo dove Totalone può restituire tempo e controllo al tuo team.</p>
            <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
              <input required placeholder="Nome e cognome" />
              <input required type="email" placeholder="Email aziendale" />
              <button className="to-button" type="submit">Richiedi il contatto <ArrowRight size={15} /></button>
            </form>
          </>
        ) : (
          <div style={{ padding: "24px 0 6px", textAlign: "center" }}>
            <span className="to-eyebrow">Richiesta ricevuta</span>
            <h2>Ci sentiamo presto.</h2>
            <p>Ti ricontatteremo per capire insieme da quale parte del lavoro partire.</p>
            <button className="to-button secondary" onClick={onClose}>Torna alla pagina</button>
          </div>
        )}
      </div>
    </div>
  );
}

export function MarketingShell({ children, active = "", eyebrow = "ARCHITETTURA TOTALONE", title, description, primaryLabel = "Prenota una demo" }: { children: ReactNode; active?: string; eyebrow?: string; title?: string; description?: string; primaryLabel?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="totalone-architecture">
      <header className="to-header">
        <div className="to-wrap to-header-inner">
          <a className="to-logo" href="/"><span className="to-logo-mark" />totalone</a>
          <nav className="to-main-nav" aria-label="Navigazione principale">
            <button className="to-nav-button" onClick={() => setProductOpen((value) => !value)} aria-expanded={productOpen}>Prodotto <ChevronDown size={14} /></button>
            {navLinks.map(([label, href]) => <a className="to-nav-button" key={href} href={href}>{label}</a>)}
            <a className="to-nav-button" href="/prezzi/">Prezzi</a>
          </nav>
          <div className="to-header-actions" style={{ display: "flex", alignItems: "center", gap: 13 }}>
            <a className="to-nav-button" href="/login/">Login</a>
            <button className="to-button light" onClick={() => setDemoOpen(true)}>Prenota una demo <ArrowRight size={14} /></button>
          </div>
          <button className="to-mobile-trigger" onClick={() => setMobileOpen((value) => !value)} aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"} aria-expanded={mobileOpen}>{mobileOpen ? <X size={19} /> : <Menu size={19} />}</button>
          {productOpen && <div className="to-mega" onMouseLeave={() => setProductOpen(false)}>
            <div className="to-mega-intro"><span className="to-eyebrow">IL PRODOTTO</span><h2>Un modo condiviso di lavorare.</h2><p>Dal primo contatto al controllo del business, ogni passaggio resta collegato.</p><a className="to-mega-link" href="/gestionale-arredamento/">Scopri il gestionale <ArrowRight size={14} /></a></div>
            <div className="to-mega-groups">{productGroups.map((group) => <div className="to-mega-group" key={group.label}><h3>{group.label}</h3>{group.links.map(([label, href]) => <a className="to-mega-link" href={href} key={href}>{label}<ArrowRight size={13} /></a>)}</div>)}</div>
          </div>}
        </div>
        {mobileOpen && <div className="to-mobile-panel to-wrap">
          <button onClick={() => setProductOpen((value) => !value)} aria-expanded={productOpen}>Prodotto <ChevronDown size={15} /></button>
          {productOpen && <div className="to-mega" style={{ margin: 0 }}><div className="to-mega-groups">{productGroups.map((group) => <div className="to-mega-group" key={group.label}><h3>{group.label}</h3>{group.links.map(([label, href]) => <a className="to-mega-link" href={href} key={href}>{label}<ArrowRight size={13} /></a>)}</div>)}</div></div>}
          {navLinks.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
          <a href="/prezzi/">Prezzi</a><a href="/login/">Login</a>
          <button className="to-button" onClick={() => { setDemoOpen(true); setMobileOpen(false); }}>Prenota una demo <ArrowRight size={14} /></button>
        </div>}
      </header>
      {title ? <section className="to-hero"><span className="to-orb" /><div className="to-wrap"><div className="to-breadcrumb"><a href="/">Home</a><span>/</span><span>{active || eyebrow}</span></div><div className="to-hero-content"><div><span className="to-eyebrow">{eyebrow}</span><h1>{title}</h1>{description && <p>{description}</p>}<div className="to-hero-actions"><button className="to-button" onClick={() => setDemoOpen(true)}>{primaryLabel} <ArrowRight size={15} /></button><a className="to-button secondary" href="/gestionale-arredamento/">Vedi l'architettura <ArrowRight size={15} /></a></div></div><div className="to-placeholder"><div className="to-placeholder-inner"><div className="to-placeholder-icon" /><strong>[VISUAL FUTURO PRODOTTO]</strong><span>Placeholder neutro per screenshot reale</span></div></div></div></div></section> : null}
      {children}
      <footer className="to-footer">
        <div className="to-wrap"><div className="to-footer-cta"><div><span className="to-eyebrow coral">IL PROSSIMO PASSO</span><h2>Partiamo da una tua commessa.</h2><p>Non una demo generica. Vediamo insieme come Totalone può inserirsi nel modo in cui lavori oggi.</p></div><button className="to-button light" onClick={() => setDemoOpen(true)}>Prenota una demo <ArrowRight size={15} /></button></div><div className="to-footer-bottom"><span>© Totalone — il sistema operativo per l'arredamento</span><span>VENDERE → GESTIRE → CONSEGNARE → CONTROLLARE</span></div></div>
      </footer>
      {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}
    </div>
  );
}

export function SeoMetaPanel({ url, title, description }: { url: string; title: string; description: string }) {
  return <div className="to-meta-grid" aria-label="Placeholder metadata SEO">
    <div className="to-meta-item"><span>URL + H1</span><strong>{url}<br />{title}</strong></div>
    <div className="to-meta-item"><span>Title + description</span><strong>{title} · meta description da finalizzare</strong></div>
    <div className="to-meta-item"><span>Canonical + Open Graph</span><strong>Canonical: {url}<br />OG: titolo, descrizione e visual reali</strong></div>
  </div>;
}

export { productGroups };