import { ArrowRight, ArrowUpRight, BookOpen, Check, ChevronDown, Clock3, Layers3, Lightbulb, Link2 } from "lucide-react";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { MarketingShell, openDemo } from "../totalone-site-architecture/_shared/MarketingShell";
import { routes, SITE_URL } from "@/components/totalone/site/siteRoutes";
import { useSeo } from "@/components/totalone/site/useSeo";
import { Reveal, Stagger, StaggerItem, WordReveal, tpEase } from "@/components/totalone/motion-kit";
import { PillButton, PillLink, RelatedFeatureBox, Tag, articleHref, focusRing, readTime } from "@/components/totalone/pages/blog/blogShared";
import { blogArticleById, type ArticleSection, type BlogArticleData } from "./blogContent";

/** Title, description, canonical e JSON-LD dell'articolo (dominio da SITE_URL). */
function useArticleSeo(article: BlogArticleData) {
  const jsonLd = useMemo(() => {
    const url = `${SITE_URL}${article.route}`;
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline: article.h1,
          description: article.metaDescription,
          url,
          mainEntityOfPage: url,
          articleSection: article.category,
          inLanguage: "it-IT",
          publisher: { "@type": "Organization", name: "Totalone", url: `${SITE_URL}/` },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Risorse", item: `${SITE_URL}${routes.risorse}` },
            { "@type": "ListItem", position: 3, name: article.category, item: `${SITE_URL}${article.categoryRoute}` },
            { "@type": "ListItem", position: 4, name: article.h1, item: url },
          ],
        },
      ],
    };
  }, [article]);
  useSeo({ title: article.seoTitle, description: article.metaDescription, path: article.route, jsonLd });
}

/* ------------------------------------------------------------------ */
/* Corpo delle sezioni                                                 */
/* ------------------------------------------------------------------ */

function FlowDiagram({ items }: { items: string[] }) {
  return (
    <Stagger className="my-8 flex flex-wrap items-center gap-x-1.5 gap-y-2.5 rounded-[24px] border border-[#e4eef8] bg-white p-4 shadow-[0_10px_30px_rgba(16,39,68,.05)] sm:p-5" gap={0.08}>
      {items.map((item, index) => (
        <StaggerItem key={item} className="flex items-center gap-1.5">
          <span className={`rounded-full px-3.5 py-2 text-[13px] font-bold ${index === 0 || index === items.length - 1 ? "bg-[#0b55c6] text-white" : "bg-[#eff7ff] text-[#245b96]"}`}>{item}</span>
          {index < items.length - 1 && <ArrowRight aria-hidden className="h-3.5 w-3.5 text-[#8fb4dc]" />}
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function SectionBody({ section }: { section: ArticleSection }) {
  return (
    <>
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="mt-5 text-[17px] leading-[1.78] text-[#34506f]">{paragraph}</p>
      ))}
      {section.bullets && (
        <ul className="mt-6 grid gap-2.5">
          {section.bullets.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-[16px] bg-[#f4f9ff] px-4 py-3 text-[15.5px] font-medium leading-6 text-[#21405f]">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white text-[#1769d5] shadow-[0_2px_6px_rgba(16,39,68,.08)]"><Check className="h-3 w-3" strokeWidth={3} /></span>
              {item}
            </li>
          ))}
        </ul>
      )}
      {section.numbered && (
        <ol className="mt-6 grid gap-2">
          {section.numbered.map((item, index) => (
            <li key={item} className="flex items-start gap-4 border-b border-[#e4eef8] py-3.5 text-[16px] leading-6 text-[#21405f] last:border-0">
              <span className="font-mono text-sm font-bold text-[#cf4a2b]">{String(index + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ol>
      )}
      {section.flow && <FlowDiagram items={section.flow} />}
      {section.comparison && (
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[24px] border border-[#e4eef8] bg-white p-6">
            <strong className="text-sm font-bold uppercase tracking-[0.08em] text-[#557090]">{section.comparison.leftTitle}</strong>
            <ul className="mt-4 grid gap-2.5">{section.comparison.left.map((item) => <li key={item} className="flex gap-2.5 text-[15px] leading-6 text-[#557090]"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b8cbe0]" />{item}</li>)}</ul>
          </div>
          <div className="rounded-[24px] bg-[linear-gradient(140deg,#0b4fae,#1769d5)] p-6 text-white shadow-[0_18px_40px_rgba(11,85,198,.22)]">
            <strong className="text-sm font-bold uppercase tracking-[0.08em] text-[#9fe0ff]">{section.comparison.rightTitle}</strong>
            <ul className="mt-4 grid gap-2.5">{section.comparison.right.map((item) => <li key={item} className="flex gap-2.5 text-[15px] leading-6 text-[#e6f3ff]"><Check className="mt-1 h-4 w-4 shrink-0 text-[#9fe0ff]" />{item}</li>)}</ul>
          </div>
        </div>
      )}
      {section.callout && (
        <aside className={`mt-8 flex gap-4 rounded-[22px] border p-5 sm:p-6 ${section.callout.label === "Collegamento" ? "border-[#cfe1f4] bg-[#eff7ff]" : "border-[#ffd9cc] bg-[#fffaf7]"}`}>
          <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-[14px] bg-white shadow-[0_2px_8px_rgba(16,39,68,.06)] ${section.callout.label === "Collegamento" ? "text-[#1769d5]" : "text-[#f36b4d]"}`}>
            {section.callout.label === "Collegamento" ? <Link2 className="h-[18px] w-[18px]" /> : <Lightbulb className="h-[18px] w-[18px]" />}
          </span>
          <div>
            <span className={`text-[11px] font-bold uppercase tracking-[0.12em] ${section.callout.label === "Collegamento" ? "text-[#0b55c6]" : "text-[#c34d35]"}`}>{section.callout.label}</span>
            <p className="mt-1.5 text-[16px] font-semibold leading-[1.55] text-[#102744]">{section.callout.text}</p>
          </div>
        </aside>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Indice sticky con avanzamento                                       */
/* ------------------------------------------------------------------ */

type TocSection = ArticleSection & { id: string };

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    // Lettura diretta delle posizioni a ogni scroll (robusta anche se lo shell rimonta i nodi).
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = ids[0];
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ids]);
  return active;
}

function TocList({ sections, active, onNavigate }: { sections: TocSection[]; active: string; onNavigate?: () => void }) {
  return (
    <ol className="relative grid gap-0.5 border-l border-[#dbe8f5]">
      {sections.map((section, index) => {
        const isActive = section.id === active;
        return (
          <li key={section.id} className="relative">
            <span aria-hidden className={`absolute -left-px top-1.5 bottom-1.5 w-[2px] rounded-full transition-colors duration-300 ${isActive ? "bg-[#1769d5]" : "bg-transparent"}`} />
            <a href={`#${section.id}`} onClick={onNavigate} aria-current={isActive ? "location" : undefined} className={`group block rounded-r-[10px] py-1.5 pl-4 pr-2 ${focusRing}`}>
              <span className={`flex gap-2 text-[13px] leading-[1.4] transition-colors duration-300 ${isActive ? "font-bold text-[#0b55c6]" : "font-medium text-[#557090] group-hover:text-[#102744]"}`}>
                <span className="font-mono text-[11px] leading-[1.6] opacity-60">{String(index + 1).padStart(2, "0")}</span>
                {section.heading}
              </span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

function ProgressRing({ progress }: { progress: ReturnType<typeof useSpring> }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 -rotate-90" aria-hidden>
      <circle cx="12" cy="12" r="9" fill="none" stroke="#dbe8f5" strokeWidth="3" />
      <motion.circle cx="12" cy="12" r="9" fill="none" stroke="#f36b4d" strokeWidth="3" strokeLinecap="round" style={{ pathLength: progress }} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Articoli correlati                                                  */
/* ------------------------------------------------------------------ */

function RelatedArticles({ article }: { article: BlogArticleData }) {
  const reduce = useReducedMotion();
  return (
    <section className="bg-[#eff7ff] py-24 sm:py-28" aria-labelledby="related-title">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Tag>Continua a leggere</Tag>
            <h2 id="related-title" className="mt-5 text-4xl font-bold leading-[.95] tracking-[-0.06em] text-[#102744] sm:text-6xl"><WordReveal text="Altri approfondimenti utili" /></h2>
          </div>
          <a href={routes.risorse} className={`group inline-flex items-center gap-2 rounded-full ${focusRing}`}><span className="inline-flex items-center gap-2 text-sm font-bold text-[#0b55c6]">Tutte le risorse <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></a>
        </div>
        <Stagger className="mt-12 grid gap-4 md:grid-cols-3" gap={0.1}>
          {article.related.slice(0, 3).map((id, index) => {
            const related = blogArticleById[id];
            if (!related) return null;
            return (
              <StaggerItem key={id} className="h-full">
                <motion.a
                  href={articleHref(related)}
                  whileHover={reduce ? undefined : { y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className={`group flex h-full flex-col rounded-[28px] border border-[#d8e7f5] bg-white p-6 shadow-[0_2px_10px_rgba(16,39,68,.04)] transition-[box-shadow,border-color] duration-300 hover:border-[#a9cbef] hover:shadow-[0_24px_50px_rgba(16,39,68,.10)] sm:p-7 ${focusRing}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#eff7ff] px-3 py-1 text-[11px] font-bold text-[#0b55c6]">{related.category}</span>
                    <span className="font-mono text-xs font-bold text-[#a3b9d0]">0{index + 1}</span>
                  </div>
                  <h3 className="mt-6 text-[21px] font-bold leading-[1.15] tracking-[-0.035em] text-[#102744] transition-colors group-hover:text-[#0b55c6]">{related.h1}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#557090]">{related.metaDescription}</p>
                  <div className="mt-auto flex items-center justify-between pt-7">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-[#557090]"><Clock3 className="h-3.5 w-3.5" />{readTime(related)} min</span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#eff7ff] text-[#1769d5] transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#cf4a2b] group-hover:text-white"><ArrowUpRight className="h-4 w-4" /></span>
                  </div>
                </motion.a>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Template articolo                                                   */
/* ------------------------------------------------------------------ */

export function BlogArticle({ article }: { article: BlogArticleData }) {
  const [tocOpen, setTocOpen] = useState(false);
  const sections = useMemo<TocSection[]>(() => article.sections.map((section, index) => ({ ...section, id: `section-${index + 1}` })), [article]);
  const ids = useMemo(() => sections.map((section) => section.id), [sections]);
  const active = useActiveSection(ids);
  const bodyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: bodyRef, offset: ["start 0.2", "end 0.8"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const featureAfter = Math.max(0, Math.floor(sections.length / 2) - 1);
  const minutes = readTime(article);
  const [lead, ...restIntro] = article.intro;
  useArticleSeo(article);

  return (
    <MarketingShell active="risorse" overlayHeader>
      <main className="bg-[#fbfdff] text-[#102744]">
        {/* HERO */}
        <header className="relative overflow-hidden bg-[linear-gradient(116deg,#082c68_0%,#0d56bf_54%,#1387ee_100%)] pb-20 pt-28 text-white sm:pb-28 sm:pt-32">
          <motion.div aria-hidden className="absolute -right-40 -top-24 h-[520px] w-[520px] rounded-full bg-[#9fe0ff]/20 blur-3xl" animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
          <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-[#bcdcfb]">
                <li><a href={routes.home} className={`rounded ${focusRing}`}><span className="transition-colors hover:text-white">Home</span></a></li>
                <li aria-hidden>/</li>
                <li><a href={routes.risorse} className={`rounded ${focusRing}`}><span className="transition-colors hover:text-white">Risorse</span></a></li>
                <li aria-hidden>/</li>
                <li><a href={article.categoryRoute} className={`rounded ${focusRing}`}><span className="transition-colors hover:text-white">{article.category}</span></a></li>
                <li aria-hidden className="hidden sm:block">/</li>
                <li aria-current="page" className="hidden max-w-[360px] truncate text-white/80 sm:block">{article.h1}</li>
              </ol>
            </nav>
            <div className="grid gap-12 pt-12 sm:pt-20 lg:grid-cols-[1fr_340px] lg:items-end lg:gap-16">
              <div>
                <Tag tone="dark">{article.category}</Tag>
                <h1 className="mt-7 max-w-4xl text-[clamp(2.15rem,8.5vw,3.75rem)] font-bold leading-[.98] tracking-[-0.06em] lg:text-[68px]"><WordReveal text={article.h1} /></h1>
                <Reveal delay={0.15}>
                  <p className="mt-8 max-w-2xl text-lg leading-8 text-[#e2f1ff] sm:text-xl sm:leading-9">{lead}</p>
                </Reveal>
                <Reveal delay={0.25}>
                  <div className="mt-8 flex flex-wrap items-center gap-2.5 text-xs font-bold text-[#d5ebff]">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 ring-1 ring-white/15"><Clock3 className="h-3.5 w-3.5 text-[#9fe0ff]" />{minutes} min di lettura</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 ring-1 ring-white/15"><Layers3 className="h-3.5 w-3.5 text-[#9fe0ff]" />{sections.length} sezioni</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 ring-1 ring-white/15"><BookOpen className="h-3.5 w-3.5 text-[#9fe0ff]" />Approfondimento Totalone</span>
                  </div>
                </Reveal>
              </div>
              <Reveal delay={0.2} y={30} className="hidden lg:block">
                <div className="rounded-[28px] border border-white/15 bg-white/[0.08] p-6 backdrop-blur-md">
                  <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#9fe0ff]">In questo articolo</span>
                  <ol className="mt-4 grid gap-1">
                    {sections.slice(0, 5).map((section, index) => (
                      <li key={section.id}>
                        <a href={`#${section.id}`} className={`group flex gap-3 rounded-[12px] px-2 py-2 transition-colors hover:bg-white/10 ${focusRing}`}>
                          <span className="font-mono text-[11px] font-bold leading-5 text-[#9fe0ff]">{String(index + 1).padStart(2, "0")}</span>
                          <span className="text-[13px] font-semibold leading-5 text-white/90">{section.heading}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                  {sections.length > 5 && <p className="mt-2 px-2 text-xs font-semibold text-[#bcdcfb]">+ altre {sections.length - 5} sezioni</p>}
                </div>
              </Reveal>
            </div>
          </div>
        </header>

        {/* CORPO */}
        <div ref={bodyRef} className="mx-auto grid max-w-[1240px] gap-10 px-5 pb-24 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16 lg:px-10 xl:grid-cols-[280px_minmax(0,1fr)_120px]">
          <aside className="lg:sticky lg:top-28 lg:max-h-[calc(100dvh-8rem)] lg:self-start lg:overflow-y-auto lg:pb-6" aria-label="Indice dell'articolo">
            <div className="hidden lg:block">
              <div className="mb-4 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0b55c6]"><ProgressRing progress={progress} />Indice</div>
              <TocList sections={sections} active={active} />
            </div>
            <div className="rounded-[22px] border border-[#d8e7f5] bg-white shadow-[0_6px_20px_rgba(16,39,68,.05)] lg:hidden">
              <button type="button" onClick={() => setTocOpen((open) => !open)} aria-expanded={tocOpen} aria-controls="toc-mobile" className={`flex w-full items-center justify-between gap-3 px-5 py-4 text-left ${focusRing}`}>
                <span className="flex items-center gap-2.5 text-sm font-bold text-[#102744]"><ProgressRing progress={progress} />In questo articolo</span>
                <motion.span animate={{ rotate: tocOpen ? 180 : 0 }} transition={{ duration: 0.25, ease: tpEase }}><ChevronDown className="h-4 w-4 text-[#1769d5]" /></motion.span>
              </button>
              <motion.div id="toc-mobile" initial={false} animate={{ height: tocOpen ? "auto" : 0, opacity: tocOpen ? 1 : 0 }} transition={{ duration: 0.3, ease: tpEase }} className="overflow-hidden">
                <div className="px-5 pb-5"><TocList sections={sections} active={active} onNavigate={() => setTocOpen(false)} /></div>
              </motion.div>
            </div>
          </aside>

          <article className="min-w-0 max-w-[720px]">
            {restIntro.length > 0 && (
              <Reveal>
                <div className="border-l-[3px] border-[#f36b4d] pl-5 sm:pl-6">
                  {restIntro.map((paragraph) => <p key={paragraph} className="mt-4 text-[18px] leading-[1.75] text-[#21405f] first:mt-0">{paragraph}</p>)}
                </div>
              </Reveal>
            )}
            {sections.map((section, index) => (
              <Fragment key={section.id}>
                <section id={section.id} className="scroll-mt-28 pt-14 sm:pt-16" aria-labelledby={`${section.id}-title`}>
                  <Reveal y={18}>
                    <h2 id={`${section.id}-title`} className="text-[28px] font-bold leading-[1.08] tracking-[-0.045em] text-[#102744] sm:text-[36px]">{section.heading}</h2>
                  </Reveal>
                  <SectionBody section={section} />
                </section>
                {index === featureAfter && <RelatedFeatureBox article={article} />}
              </Fragment>
            ))}

            <Reveal y={24}>
              <section className="relative mt-16 overflow-hidden rounded-[32px] bg-[#fffaf7] p-7 ring-1 ring-[#ffe1d6] sm:p-10" aria-labelledby="context-cta-title">
                <motion.div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#f36b4d]/15 blur-3xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
                <div className="relative">
                  <Tag tone="coral">Collegamento Totalone</Tag>
                  <h2 id="context-cta-title" className="mt-5 max-w-lg text-3xl font-bold leading-[1.02] tracking-[-0.05em] text-[#102744] sm:text-[40px]">Porta questo processo nel lavoro quotidiano.</h2>
                  <p className="mt-4 max-w-lg text-[15px] leading-7 text-[#557090]">Scopri la pagina prodotto collegata a questo approfondimento e verifica il flusso con un caso reale del tuo showroom.</p>
                  <div className="mt-7"><PillLink href={article.product.href}>{article.product.label}</PillLink></div>
                </div>
              </section>
            </Reveal>
          </article>
        </div>

        <RelatedArticles article={article} />

        {/* CTA FINALE */}
        <section className="bg-[#fbfdff] py-20 sm:py-24" aria-labelledby="final-cta-title">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
            <Reveal y={30}>
              <div className="relative flex flex-col justify-between gap-10 overflow-hidden rounded-[32px] border border-[#cfe1f4] bg-[linear-gradient(135deg,#ffffff,#eaf4ff)] p-7 text-[#102744] sm:p-12 lg:flex-row lg:items-end">
                <motion.div aria-hidden className="absolute -bottom-32 right-10 h-80 w-80 rounded-full bg-[#9fe0ff]/40 blur-3xl" animate={{ x: [0, -60, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
                <div className="relative max-w-2xl">
                  <Tag>Totalone</Tag>
                  <h2 id="final-cta-title" className="mt-6 text-4xl font-bold leading-[.98] tracking-[-0.055em] sm:text-5xl">{article.finalCta.heading}</h2>
                  <p className="mt-5 max-w-lg text-[15px] leading-7 text-[#557090]">{article.finalCta.text}</p>
                </div>
                <div className="relative flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <PillButton onClick={openDemo}>Prenota una demo</PillButton>
                  <PillLink href={article.finalCta.primaryHref} variant="outline">{article.finalCta.primaryLabel}</PillLink>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
