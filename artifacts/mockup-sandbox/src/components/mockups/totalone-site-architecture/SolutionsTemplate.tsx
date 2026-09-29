import { ArrowRight, Building2, GitBranch, Map, UsersRound } from "lucide-react";
import { MarketingShell, SeoMetaPanel } from "./_shared/MarketingShell";

const solutions = [
  ["Negozi e showroom", "Più chiarezza tra sala vendita, progettazione e consegna.", "/soluzioni/negozi-showroom-arredamento/", UsersRound],
  ["Aziende in crescita", "Un modo di lavorare che cresce senza aggiungere passaggi invisibili.", "/soluzioni/aziende-arredamento-in-crescita/", GitBranch],
  ["Multi-showroom", "Stesso linguaggio operativo, anche quando i punti vendita aumentano.", "/soluzioni/multi-showroom-arredamento/", Map],
  ["Gruppi strutturati", "Una visione comune tra sedi, team e responsabilità diverse.", "/soluzioni/gruppi-arredamento/", Building2],
] as const;

const solutionPages = {
  "negozi-showroom-arredamento": {
    active: "Negozi e showroom",
    title: "Totalone per negozi e showroom di arredamento",
    description: "Quando il lavoro passa tra vendita, progettazione e consegna, la chiarezza organizzativa diventa un vantaggio concreto.",
  },
  "aziende-arredamento-in-crescita": {
    active: "Aziende in crescita",
    title: "Un gestionale per aziende di arredamento in crescita",
    description: "Aumentano clienti, commesse e persone coinvolte: un processo condiviso aiuta a crescere senza aggiungere passaggi invisibili.",
  },
  "multi-showroom-arredamento": {
    active: "Multi-showroom",
    title: "Più showroom. Un solo modo di lavorare.",
    description: "Collega sedi, team e responsabilità mantenendo una visione comune del lavoro e dei passaggi operativi.",
  },
  "gruppi-arredamento": {
    active: "Gruppi strutturati",
    title: "Una visione operativa condivisa per gruppi di arredamento",
    description: "Coordina sedi e ruoli diversi con un linguaggio comune tra vendita, operatività e consegna.",
  },
} as const;

export function SolutionsTemplate() {
  const slug = window.location.pathname.split("/").filter(Boolean).pop() ?? "";
  const page = solutionPages[slug as keyof typeof solutionPages] ?? solutionPages["negozi-showroom-arredamento"];
  const pageUrl = `/soluzioni/${slug in solutionPages ? slug : "negozi-showroom-arredamento"}/`;

  return <MarketingShell active={page.active} eyebrow="SOLUZIONI · ORGANIZZAZIONE" title={page.title} description={page.description}>
    <main>
      <section className="to-section"><div className="to-wrap"><div className="to-split-grid-wide"><div><span className="to-eyebrow coral">IL CONTESTO</span><h2 className="to-section-title">Il cliente vede uno showroom. Tu devi coordinare un’azienda intera.</h2></div><div><p className="to-section-lead" style={{ marginTop: 0 }}>La soluzione non parte da una lista di funzioni. Parte dai passaggi che oggi dipendono dalla memoria di una persona, da una chat o da un foglio condiviso.</p><div className="to-meta-grid"><div className="to-meta-item"><span>Vendita</span><strong>Relazioni e trattative con contesto</strong></div><div className="to-meta-item"><span>Operatività</span><strong>Commesse e responsabilità leggibili</strong></div><div className="to-meta-item"><span>Crescita</span><strong>Un metodo che resta condiviso</strong></div></div></div></div></div></section>
      <section className="to-section sky"><div className="to-wrap"><span className="to-eyebrow">IL VIAGGIO OPERATIVO</span><h2 className="to-section-title">Dalla promessa al lavoro consegnato.</h2><div className="to-grid-3"><div className="to-card"><span className="to-card-kicker">VENDERE</span><h3>La relazione non si perde</h3><p>CRM, trattative e preventivi parlano la stessa lingua e consegnano il contesto al team.</p><a href="/crm-arredamento/">Scopri l’area vendite <ArrowRight size={13} /></a></div><div className="to-card"><span className="to-card-kicker">GESTIRE</span><h3>La commessa diventa il centro</h3><p>Progetti, scadenze, forniture e persone si muovono intorno a una storia condivisa.</p><a href="/gestione-commesse-arredamento/">Scopri l’area operativa <ArrowRight size={13} /></a></div><div className="to-card"><span className="to-card-kicker">CONSEGNARE</span><h3>Il finale è preparato prima</h3><p>Magazzino, montaggi e post-vendita chiudono il cerchio senza cambiare sistema.</p><a href="/gestione-montaggi-arredamento/">Segui il ciclo <ArrowRight size={13} /></a></div></div></div></section>
      <section className="to-section warm"><div className="to-wrap"><span className="to-eyebrow gold">ALTRI CONTESTI</span><h2 className="to-section-title">La stessa base, esigenze diverse.</h2><p className="to-section-lead">Queste pagine aiutano ogni azienda a riconoscersi nella propria fase organizzativa, senza duplicare il catalogo prodotto.</p><div className="to-link-list">{solutions.slice(1).map(([label, body, href, Icon]) => <a className="to-link-row" key={href} href={href}><span style={{ display: "flex", alignItems: "center", gap: 11 }}><Icon size={18} color="#0b55c6" /><span><strong style={{ display: "block" }}>{label}</strong><small style={{ color: "#557090", fontWeight: 500 }}>{body}</small></span></span><ArrowRight size={15} /></a>)}</div></div></section>
      <section className="to-section"><div className="to-wrap"><div className="to-card" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, alignItems: "center", background: "#082c68", color: "white", border: 0 }}><div><span className="to-eyebrow">IL RISULTATO</span><h2 style={{ margin: "17px 0 0", maxWidth: 520, fontSize: "clamp(34px, 5vw, 58px)", lineHeight: .95, letterSpacing: "-.065em" }}>Più persone coinvolte. Meno informazioni da ricostruire.</h2></div><div><p style={{ color: "#d5ebff", fontSize: 14, lineHeight: 1.7 }}>La soluzione diventa un modo di lavorare: leggibile per chi vende, utile per chi coordina, concreto per chi consegna.</p><a className="to-button light" href="/gestionale-arredamento/">Vedi il gestionale <ArrowRight size={15} /></a></div></div></div></section>
      <section className="to-section"><div className="to-wrap"><span className="to-eyebrow">SEO · TEMPLATE</span><h2 className="to-section-title">Una pagina per un problema organizzativo preciso.</h2><SeoMetaPanel url={pageUrl} title={page.title} description={page.description} /></div></section>
    </main>
  </MarketingShell>;
}