import { ArrowRight, BookOpen, ChevronRight, FileText, Search } from "lucide-react";
import { useState } from "react";
import { MarketingShell } from "./_shared/MarketingShell";

import { blogArticles, blogCategories } from "../totalone-blog/blogContent";

const sitePath = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, "")}/preview${path}`;

export function ResourcesHub() {
  const [filter, setFilter] = useState("Tutti");
  const visibleArticles = filter === "Tutti" ? blogArticles : blogArticles.filter((article) => article.category === filter);
  return <MarketingShell active="Risorse" eyebrow="RISORSE · IDEE OPERATIVE" title="Domande reali, risposte utili per il lavoro dell’arredamento" description="Un hub editoriale per capire meglio commesse, showroom, consegne e controllo. Ogni contenuto riporta al punto del sistema che può aiutarti a fare il passo successivo.">
    <main>
      <section className="to-section"><div className="to-wrap"><div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 24, flexWrap: "wrap" }}><div><span className="to-eyebrow coral">BLOG · 10 APPROFONDIMENTI</span><h2 className="to-section-title">Non contenuti generici. Passaggi di lavoro.</h2></div><div className="to-card" style={{ display: "flex", alignItems: "center", gap: 9, padding: "11px 14px", minWidth: 230 }}><Search size={15} color="#557090" /><span style={{ color: "#8aa3bd", fontSize: 12 }}>Archivio editoriale Totalone</span></div></div><div className="to-filter-row">{blogCategories.map((item) => <button className={`to-filter ${filter === item ? "active" : ""}`} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="to-grid-3">{visibleArticles.map((article) => <article className="to-card to-resource-card" key={article.id}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span className="to-card-kicker">{article.category}</span><BookOpen size={17} color="#0b55c6" /></div><h3>{article.h1}</h3><p>{article.metaDescription}</p><div className="to-card-footer"><span>Approfondimento · {article.primaryKeyword}</span><a href={sitePath(article.route)} aria-label={`Leggi ${article.h1}`}><ChevronRight size={15} /></a></div></article>)}</div></div></section>
       <section className="to-section sky"><div className="to-wrap"><div className="to-split-grid-wide"><div><span className="to-eyebrow">CONTINUA A ESPLORARE</span><h2 className="to-section-title">Porta questi spunti nel tuo showroom.</h2></div><div><p className="to-section-lead" style={{ marginTop: 0 }}>Scopri come organizzare commesse, vendite e consegne con processi più chiari per il tuo team.</p><div className="to-link-list"><a className="to-link-row" href="/gestionale-arredamento/"><span><FileText size={15} style={{ verticalAlign: "middle", marginRight: 8 }} />Scopri il gestionale Totalone</span><ArrowRight size={15} /></a><a className="to-link-row" href="/soluzioni/aziende-arredamento-in-crescita/"><span><FileText size={15} style={{ verticalAlign: "middle", marginRight: 8 }} />Trova la soluzione per la tua azienda</span><ArrowRight size={15} /></a></div></div></div></div></section>
    </main>
  </MarketingShell>;
}