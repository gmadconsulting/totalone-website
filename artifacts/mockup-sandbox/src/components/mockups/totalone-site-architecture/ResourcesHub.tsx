import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen, Calculator, ClipboardList, Clock3, FileText, Handshake, Hammer, PackageCheck, Store, type LucideIcon } from "lucide-react";
import { Reveal, WordReveal, tpEase } from "@/components/totalone/motion-kit";
import { routes } from "@/components/totalone/site/siteRoutes";
import { useSeo } from "@/components/totalone/site/useSeo";
import { readTime } from "@/components/totalone/pages/blog/blogShared";
import { MarketingShell, ShellButton, ShellTag } from "./_shared/MarketingShell";

import { blogArticles, blogCategoryList } from "../totalone-blog/blogContent";

type Category = (typeof blogCategoryList)[number];

/** Categoria dal percorso: `/blog/<categoria>` (con o senza slash finale). `null` = tutte. */
function categoryFromPath(pathname: string): Category | null {
  const match = pathname.replace(/\/+$/, "").match(/\/blog\/([a-z-]+)$/);
  return (match && blogCategoryList.find((category) => category.slug === match[1])) || null;
}

/** Aggiorna l'URL solo quando la pagina è servita sui percorsi pubblici (non nella preview della sandbox). */
const onPublicBlogPath = () => /^\/blog(\/|$)/.test(window.location.pathname);

const categoryIcons: Record<string, LucideIcon> = {
  "Gestione showroom": Store,
  "Vendite e CRM": Handshake,
  Preventivi: FileText,
  "Commesse e progetti": ClipboardList,
  "Logistica e magazzino": PackageCheck,
  "Montaggi e post-vendita": Hammer,
};

/** Illustrazione editoriale: tre approfondimenti reali del blog impilati (nessuna UI dell'app). */
function ResourcesHeroVisual({ articles }: { articles: typeof blogArticles }) {
  const reduce = useReducedMotion();
  const picks = articles.slice(0, 3);
  return (
    <div className="relative mx-auto h-[340px] w-full max-w-[460px] sm:h-[380px]" aria-hidden>
      {picks.map((article, i) => {
        const Icon = categoryIcons[article.category] ?? BookOpen;
        return (
          <motion.div
            key={article.id}
            initial={reduce ? false : { opacity: 0, y: 40, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: [-5, 2, -1][i] }}
            transition={{ duration: 0.9, ease: tpEase, delay: 0.4 + i * 0.15 }}
            className="absolute left-0 right-0 mx-auto w-[86%] rounded-[26px] border border-white/20 bg-white p-6 text-[#102744] shadow-[0_30px_70px_rgba(4,30,80,.35)]"
            style={{ top: `${i * 56}px`, zIndex: i }}
          >
            <motion.div animate={reduce ? undefined : { y: [0, -6, 0] }} transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eff7ff] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.08em] text-[#0b55c6]"><Icon className="h-3 w-3" />{article.category}</span>
                <BookOpen className="h-4 w-4 text-[#f36b4d]" />
              </div>
              <p className="mt-4 line-clamp-2 text-lg font-bold leading-6 tracking-[-0.03em]">{article.h1}</p>
              <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#557090]">{article.metaDescription}</p>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

const hubTitle = "Domande reali, risposte utili per il lavoro dell’arredamento";
const hubDescription = "Articoli su showroom, vendite, preventivi, commesse, magazzino e montaggi. Ognuno spiega un passaggio del lavoro e come seguirlo meglio.";

export function ResourcesHub() {
  const [category, setCategory] = useState<Category | null>(() => categoryFromPath(window.location.pathname));

  useEffect(() => {
    const onPop = () => setCategory(categoryFromPath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useSeo(
    category
      ? { title: `${category.h1}: articoli`, description: category.description, path: category.route }
      : { title: "Risorse: articoli per showroom e negozi di arredamento", description: hubDescription, path: routes.risorse },
  );

  const visibleArticles = category ? blogArticles.filter((article) => article.category === category.label) : blogArticles;
  const countFor = (label: string | null) => (label ? blogArticles.filter((a) => a.category === label).length : blogArticles.length);
  const filters: { label: string; route: string; value: Category | null }[] = [
    { label: "Tutti", route: routes.risorse, value: null },
    ...blogCategoryList.map((c) => ({ label: c.label, route: c.route, value: c })),
  ];

  /** Filtro client-side; l'URL cambia in `/blog/<categoria>` così la pagina resta condivisibile. */
  const selectFilter = (event: MouseEvent<HTMLAnchorElement>, value: Category | null, route: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    setCategory(value);
    if (onPublicBlogPath()) window.history.pushState(null, "", `${route}#archivio`);
  };

  return (
    <MarketingShell
      active="risorse"
      eyebrow={category ? `RISORSE · ${category.label.toUpperCase()}` : "RISORSE"}
      title={category ? category.h1 : hubTitle}
      description={category ? category.description : hubDescription}
      heroVisual={<ResourcesHeroVisual key={category?.slug ?? "tutti"} articles={visibleArticles} />}
      secondaryCta={{ label: "Vai agli articoli", href: "#archivio" }}
    >
      <main className="text-[#102744]">
        <section id="archivio" className="scroll-mt-24 bg-[#fbfdff] py-20 sm:py-28">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <ShellTag tone="coral">{visibleArticles.length} {visibleArticles.length === 1 ? "ARTICOLO" : "ARTICOLI"}{category ? ` · ${category.label.toUpperCase()}` : ""}</ShellTag>
                <h2 className="mt-6 max-w-2xl text-[clamp(2.4rem,9vw,4.5rem)] font-bold leading-[.95] tracking-[-0.065em]"><WordReveal text="Non contenuti generici. Passaggi di lavoro." /></h2>
              </div>
            </div>

            <Reveal delay={0.05}>
              <nav className="mt-10 flex flex-wrap gap-2" aria-label="Categorie degli articoli">
                {filters.map((item) => {
                  const on = (category?.slug ?? null) === (item.value?.slug ?? null);
                  return (
                    <a
                      key={item.label}
                      href={item.route}
                      aria-current={on ? "page" : undefined}
                      onClick={(event) => selectFilter(event, item.value, item.route)}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769d5] ${on ? "border-[#0b55c6] bg-[#0b55c6] text-white shadow-[0_8px_20px_rgba(11,85,198,.25)]" : "border-[#cfe1f4] bg-white text-[#245b96] hover:border-[#1769d5]"}`}
                    >
                      {item.label}
                      <span className={`rounded-full px-1.5 py-px text-[10px] ${on ? "bg-white/20 text-white" : "bg-[#eff7ff] text-[#557090]"}`}>{countFor(item.value?.label ?? null)}</span>
                    </a>
                  );
                })}
              </nav>
            </Reveal>

            <motion.div layout className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence initial={false} mode="popLayout">
                {visibleArticles.map((article, i) => {
                  const Icon = categoryIcons[article.category] ?? BookOpen;
                  const featured = i === 0 && visibleArticles.length > 2;
                  return (
                    <motion.article
                      key={article.id}
                      layout
                      initial={{ opacity: 0, y: 18, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.45, ease: tpEase, delay: Math.min(i, 6) * 0.03 }}
                      className={`group relative flex flex-col overflow-hidden rounded-[28px] border p-6 transition-shadow hover:shadow-[0_24px_60px_rgba(16,39,68,.10)] sm:p-7 ${featured ? "border-transparent bg-[linear-gradient(135deg,#082c68,#0d56bf)] text-white md:col-span-2" : "border-[#e4eef8] bg-white shadow-[0_1px_4px_rgba(2,8,23,.04)]"}`}
                    >
                      {featured && <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#1387ee]/50 blur-3xl" />}
                      <div className="relative flex items-center justify-between gap-3">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.08em] ${featured ? "bg-white/15 text-[#9fe0ff]" : "bg-[#eff7ff] text-[#0b55c6]"}`}><Icon className="h-3 w-3" />{article.category}</span>
                        {featured && <span className="rounded-full bg-[#cf4a2b] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.08em] text-white">In evidenza</span>}
                      </div>
                      <h3 className={`relative mt-6 font-bold tracking-[-0.04em] ${featured ? "max-w-xl text-3xl leading-[1.02] sm:text-4xl" : "text-xl leading-6"}`}>{article.h1}</h3>
                      <p className={`relative mt-3 text-sm leading-6 ${featured ? "max-w-lg text-[#d5ebff]" : "text-[#557090]"}`}>{article.metaDescription}</p>
                      <div className={`mt-auto flex items-center justify-between gap-3 pt-7 text-[10px] font-bold uppercase tracking-[.06em] ${featured ? "text-[#c9e2fb]" : "text-[#557090]"}`}>
                        <span className="inline-flex min-w-0 items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" />{readTime(article)} min di lettura</span>
                        <a
                          href={article.route}
                          aria-label={`Leggi ${article.h1}`}
                          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all after:absolute after:inset-0 after:content-[''] group-hover:translate-x-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 ${featured ? "bg-white text-[#0b55c6] focus-visible:outline-white" : "bg-[#eff7ff] text-[#0b55c6] group-hover:bg-[#cf4a2b] group-hover:text-white focus-visible:outline-[#1769d5]"}`}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-[#cfe1f4] bg-[#eff7ff] py-20 sm:py-28">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-20">
              <div>
                <ShellTag>CONTINUA DA QUI</ShellTag>
                <h2 className="mt-6 max-w-xl text-[clamp(2.3rem,8vw,3.75rem)] font-bold leading-[.95] tracking-[-0.065em]"><WordReveal text="Porta questi spunti nel tuo showroom." /></h2>
              </div>
              <div>
                <Reveal><p className="max-w-lg text-base leading-7 text-[#557090]">Guarda come Totalone collega vendite, commesse e consegne, oppure stima quanto tempo può recuperare il tuo team.</p></Reveal>
                <div className="mt-8 grid gap-3">
                  {([["Perché Totalone", routes.perche, FileText], ["Stima il valore con il calcolatore", routes.calcolatore, Calculator]] as const).map(([label, href, Icon], i) => (
                    <Reveal key={href} delay={0.08 * i} y={14}>
                      <a href={href} className="group flex items-center justify-between gap-4 rounded-[22px] border border-[#cfe1f4] bg-white px-6 py-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(16,39,68,.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769d5]">
                        <span className="flex items-center gap-3 text-base font-bold text-[#245b96]"><span className="grid h-9 w-9 place-items-center rounded-[12px] bg-[#dcecff] text-[#0b55c6]"><Icon className="h-4 w-4" /></span>{label}</span>
                        <ArrowRight className="h-4 w-4 text-[#72a5d9] transition-transform group-hover:translate-x-1 group-hover:text-[#cf4a2b]" />
                      </a>
                    </Reveal>
                  ))}
                </div>
                <Reveal delay={0.2}><div className="mt-8"><ShellButton>Prenota una demo</ShellButton></div></Reveal>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
