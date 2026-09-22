import { ArrowRight, BookOpen, ChevronDown, ChevronRight, Clock3, List, Quote } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { MarketingShell } from "../totalone-site-architecture/_shared/MarketingShell";
import { blogArticleById, type ArticleSection, type BlogArticleData } from "./blogContent";
import "./BlogArticle.css";

const previewRoot = "/__mockup/preview/totalone-blog/";
const previewComponents: Record<string, string> = {
  "software-gestionale-negozio-arredamento": "SoftwareGestionaleNegozioArredamentoArticle",
  "gestionale-per-arredatori": "GestionalePerArredatoriArticle",
  "software-preventivi-arredamento": "SoftwarePreventiviArredamentoArticle",
  "gestione-commesse-arredamento": "GestioneCommesseArredamentoArticle",
  "crm-negozio-arredamento": "CrmNegozioArredamentoArticle",
  "gestire-ingressi-showroom": "GestireIngressiShowroomArticle",
  "gestione-magazzino-arredamento": "GestioneMagazzinoArredamentoArticle",
  "gestione-montaggi-arredamento": "GestioneMontaggiArredamentoArticle",
  "gestione-post-vendita-arredamento": "GestionePostVenditaArredamentoArticle",
  "excel-vs-gestionale-arredamento": "ExcelVsGestionaleArredamentoArticle",
};

function PreviewLink({ id, children }: { id: string; children: ReactNode }) {
  return <a href={`${previewRoot}${previewComponents[id] ?? id}`}>{children}</a>;
}

function readTime(article: BlogArticleData) {
  const words = [...article.intro, ...article.sections.flatMap((section) => [
    ...(section.paragraphs ?? []),
    ...(section.bullets ?? []),
    ...(section.numbered ?? []),
  ])].join(" ").trim().split(/\s+/).length;
  return Math.max(4, Math.round(words / 190));
}

function ArticleSchema({ article }: { article: BlogArticleData }) {
  useEffect(() => {
    const canonical = `https://totalone.it${article.route}`;
    document.title = article.seoTitle;
    const upsertMeta = (selector: string, attrs: Record<string, string>) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement("meta");
        document.head.appendChild(element);
      }
      Object.entries(attrs).forEach(([key, value]) => element?.setAttribute(key, value));
      return element;
    };
    const description = upsertMeta('meta[name="description"]', { name: "description", content: article.metaDescription });
    const ogTitle = upsertMeta('meta[property="og:title"]', { property: "og:title", content: article.seoTitle });
    const ogDescription = upsertMeta('meta[property="og:description"]', { property: "og:description", content: article.metaDescription });
    const canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]') ?? document.head.appendChild(document.createElement("link"));
    canonicalLink.setAttribute("rel", "canonical");
    canonicalLink.setAttribute("href", canonical);
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.dataset.totaloneArticle = article.id;
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.h1,
      description: article.metaDescription,
      mainEntityOfPage: canonical,
      articleSection: article.category,
      publisher: { "@type": "Organization", name: "Totalone" },
    });
    document.head.appendChild(schema);
    return () => {
      description.remove();
      ogTitle.remove();
      ogDescription.remove();
      schema.remove();
    };
  }, [article]);
  return null;
}

function FlowDiagram({ items }: { items: string[] }) {
  return <div className="blog-flow" aria-label="Percorso del processo">{items.map((item, index) => <span key={item}><strong>{item}</strong>{index < items.length - 1 && <i>→</i>}</span>)}</div>;
}

function SectionBody({ section }: { section: ArticleSection }) {
  return (
    <>
      {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
      {section.numbered && <ol>{section.numbered.map((item) => <li key={item}>{item}</li>)}</ol>}
      {section.flow && <FlowDiagram items={section.flow} />}
      {section.comparison && <div className="blog-comparison"><div><strong>{section.comparison.leftTitle}</strong><ul>{section.comparison.left.map((item) => <li key={item}>{item}</li>)}</ul></div><div><strong>{section.comparison.rightTitle}</strong><ul>{section.comparison.right.map((item) => <li key={item}>{item}</li>)}</ul></div></div>}
      {section.callout && <aside className="blog-callout"><Quote size={18} /><div><span>{section.callout.label}</span><p>{section.callout.text}</p></div></aside>}
    </>
  );
}

function RelatedArticles({ article }: { article: BlogArticleData }) {
  return <section className="blog-related" aria-labelledby="related-title"><div className="blog-content-width"><span className="blog-kicker">Continua a leggere</span><h2 id="related-title">Altri approfondimenti utili</h2><div className="blog-related-list">{article.related.slice(0, 3).map((id) => { const related = blogArticleById[id]; return <PreviewLink id={id} key={id}><article><span>{related.category}</span><h3>{related.h1}</h3><p>{related.metaDescription}</p><ChevronRight size={17} /></article></PreviewLink>; })}</div></div></section>;
}

export function BlogArticle({ article }: { article: BlogArticleData }) {
  const [tocOpen, setTocOpen] = useState(false);
  const sections = useMemo(() => article.sections.map((section, index) => ({ ...section, id: `section-${index + 1}` })), [article]);
  return (
    <MarketingShell active="Risorse">
      <ArticleSchema article={article} />
      <main className="blog-article">
        <header className="blog-article-header">
          <div className="to-wrap">
            <nav className="blog-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/risorse/">Risorse</a><span>/</span><a href={article.categoryRoute}>{article.category}</a><span>/</span><strong>{article.h1}</strong></nav>
            <div className="blog-header-grid">
              <div className="blog-header-copy">
                <span className="blog-kicker">{article.category}</span>
                <h1>{article.h1}</h1>
                <div className="blog-intro">{article.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                <div className="blog-meta"><span><Clock3 size={15} />{readTime(article)} min di lettura</span><span><BookOpen size={15} />Approfondimento Totalone</span></div>
              </div>
              <div className="blog-header-note"><span>SEO editoriale</span><strong>{article.primaryKeyword}</strong><p>Un contenuto pratico per chi lavora ogni giorno in negozi e showroom di arredamento.</p></div>
            </div>
          </div>
        </header>
        <div className="to-wrap blog-layout">
          <aside className="blog-toc">
            <div className="blog-toc-desktop"><span><List size={15} />In questa guida</span>{sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.heading}</a>)}</div>
            <details open={tocOpen} onToggle={(event) => setTocOpen(event.currentTarget.open)} className="blog-toc-mobile"><summary>In questa guida <ChevronDown size={16} /></summary><div>{sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.heading}</a>)}</div></details>
          </aside>
          <article className="blog-content">
            <div className="blog-guide-link"><span>Guida correlata</span><a href={article.guide.href}>{article.guide.label}<ArrowRight size={15} /></a></div>
            {sections.map((section) => <section className="blog-section" id={section.id} key={section.id}><h2>{section.heading}</h2><SectionBody section={section} /></section>)}
            <section className="blog-context-cta"><span className="blog-kicker">Collegamento Totalone</span><h2>Porta questo processo nel lavoro quotidiano.</h2><p>Scopri la pagina prodotto collegata a questo approfondimento e verifica il flusso con un caso reale del tuo showroom.</p><a className="to-button" href={article.product.href}>{article.product.label} <ArrowRight size={15} /></a></section>
          </article>
        </div>
        <RelatedArticles article={article} />
        <section className="blog-final-cta"><div className="to-wrap"><div><span className="blog-kicker">TOTALONE</span><h2>{article.finalCta.heading}</h2><p>{article.finalCta.text}</p></div><div className="blog-final-actions"><a className="to-button light" href={article.finalCta.primaryHref}>{article.finalCta.primaryLabel} <ArrowRight size={15} /></a><a className="to-button secondary" href={article.finalCta.secondaryHref}>{article.finalCta.secondaryLabel} <ArrowRight size={15} /></a></div></div></section>
      </main>
    </MarketingShell>
  );
}