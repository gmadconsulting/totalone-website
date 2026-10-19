import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight, Check, ClipboardList, FileText, FolderOpen, History, Mail, Package, StickyNote, Truck, Wrench } from "lucide-react";
import { MarketingShell } from "../totalone-site-architecture/_shared/MarketingShell";
import { CountUp, Reveal, SpotlightCard, Stagger, StaggerItem, WordReveal, tpEase, useLoopSteps } from "@/components/totalone/motion-kit";
import { AppWindow, uiFont } from "@/components/totalone/app-ui";
import { ConversioneFlow } from "@/components/totalone/app-screens";
import { AccontiScreen, SchedinaCompleta } from "@/components/totalone/pages/commesse/CommesseScreens";
import { ArrowLink, Chips, DemoButton, PerspectiveMockup, SectionHead, panelTone, wrap } from "@/components/totalone/pages/commesse/CommesseKit";
import { routes } from "@/components/totalone/site/siteRoutes";
import { ProcessoStrip } from "@/components/totalone/site/ProcessoStrip";
import { useSeo } from "@/components/totalone/site/useSeo";

const caption = "mt-5 text-center text-xs font-semibold text-[#557090]";

/* ------------------------------------------------------------------ */
/* 1 · HERO — la Schedina nasce dal preventivo convertito               */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(116deg,#082c68_0%,#0d56bf_54%,#1387ee_100%)] pb-20 pt-28 text-white sm:pb-28 sm:pt-36">
      <motion.div aria-hidden className="absolute -right-20 top-10 h-[420px] w-[420px] rounded-full bg-[#75d7ff]/30 blur-3xl" animate={{ x: [0, -60, 0], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div aria-hidden className="absolute -left-28 top-[380px] h-[420px] w-[420px] rounded-full bg-[#f36b4d]/20 blur-3xl" animate={{ x: [0, 50, 0], y: [0, -30, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
      <div className={`relative ${wrap}`}>
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#cfe6ff]">
          <a href={routes.home} className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Home</a>
          <span aria-hidden>/</span>
          <span aria-current="page" className="text-white">Gestione commesse</span>
        </nav>
        <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
          <div>
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: tpEase }} className="inline-flex items-center gap-2 rounded-full border border-[#8ecbff] bg-[#5abaff]/20 px-3.5 py-2 text-xs font-bold tracking-[0.08em] text-[#eff8ff]">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9fe0ff] opacity-75 motion-reduce:animate-none" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#9fe0ff]" /></span>
              GESTIONE COMMESSE
            </motion.span>
            <h1 className="mt-7 max-w-3xl text-[clamp(2.8rem,6.4vw,5.8rem)] font-bold leading-[.93] tracking-[-0.075em]">
              <WordReveal text="Il preventivo è accettato." />
              <br />
              <WordReveal text="La commessa è già pronta." className="text-[#9fe0ff]" delay={0.25} />
            </h1>
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: tpEase, delay: 0.45 }}>
            <p className="max-w-xl text-lg leading-8 text-[#e5f3ff]">
              Quando converti il preventivo, Totalone crea in automatico la trattativa e la <b className="text-white">Schedina cliente</b>: prodotti, prezzi e margini sono già dentro, senza ricopiare nulla. Da lì segui ordini, fatture, documenti e pagamenti fino alla consegna.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <DemoButton light />
              <a href="#schedina-cliente" className="group inline-flex items-center gap-2 px-2 text-sm font-bold text-white hover:text-[#d0e8ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Cosa c’è nella Schedina <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        </div>

        <div aria-hidden="true">
          <PerspectiveMockup className="mx-auto mt-16 max-w-[1080px] sm:mt-20">
            <ConversioneFlow />
          </PerspectiveMockup>
        </div>
        <p className="mt-6 text-center text-xs font-semibold text-[#cfe6ff]">Preventivo convertito → trattativa → Schedina cliente. Schermate dimostrative, dati di esempio.</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2 · PANORAMICA — la Schedina cliente, il fascicolo della commessa     */
/* ------------------------------------------------------------------ */

function Panoramica() {
  const tabs = ["Prodotti", "Costi di servizio", "Documenti", "Note", "Assistenza"];
  const facts = [
    ["Cliente", "Casa Bianchi"],
    ["Showroom", "Milano Centro"],
    ["Venditore", "Giulia Ferri"],
    ["Stato", "Finalizzato"],
    ["Prodotti", "4"],
    ["Colli", "23"],
  ];
  return (
    <section className="bg-[#fbfdff] py-24 sm:py-32" id="schedina-cliente">
      <div className={wrap}>
        <div className="grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-end lg:gap-20">
          <SectionHead tag="LA SCHEDINA CLIENTE" title="Una scheda per commessa." accent="Tutto quello che è stato venduto." />
          <Reveal delay={0.1}>
            <div className="max-w-md space-y-4 text-base leading-7 text-[#557090] sm:text-lg sm:leading-8">
              <p>La Schedina cliente è il fascicolo della commessa. In testa trovi il riepilogo economico, sotto la tabella dei prodotti con il loro stato di ordine e fattura.</p>
              <p>Accanto ai prodotti ci sono le schede per servizi, documenti, note e assistenza: chi la apre ha il quadro completo, senza chiedere in giro.</p>
            </div>
          </Reveal>
        </div>
        <Reveal y={40} className="mt-12">
          <div aria-hidden="true" className={`rounded-[36px] p-3 sm:p-5 ${panelTone.blue}`}>
            <AppWindow active="schedine" title="Schedina" className="h-[440px] sm:h-[500px]">
              <SchedinaCompleta />
            </AppWindow>
          </div>
          <p className={caption}>Schermate dimostrative, dati di esempio.</p>
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#557090]">Le schede della Schedina</p>
            <Chips items={tabs} />
          </div>
          <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3" style={uiFont}>
            {facts.map(([k, v]) => (
              <div key={k} className="rounded-[14px] border border-[#e4eef8] bg-white px-3.5 py-2.5">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#557090]">{k}</dt>
                <dd className="mt-0.5 truncate text-[13px] font-semibold text-[#0F172A]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3 · PRODOTTO PER PRODOTTO — stato ordine e fattura                   */
/* ------------------------------------------------------------------ */

const ordineStati = ["Da ordinare", "Ordinato", "Arrivato"] as const;
const lanes = [
  { name: "Cucina", brand: "Linea Cucine", start: 2, fattura: 1 },
  { name: "Top in quarzo", brand: "Pietra & Co", start: 1, fattura: 2 },
  { name: "Elettrodomestici", brand: "Casa Elettro", start: 1, fattura: 3 },
  { name: "Lampade sospese", brand: "Luce & Co", start: 0, fattura: 3 },
];

function ProdottoPerProdotto() {
  const [ref, step] = useLoopSteps(3, 1800);
  return (
    <section className="bg-[#fffaf7] py-24 sm:py-32" id="stati">
      <div className={`${wrap} grid items-start gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-16`}>
        <div>
          <SectionHead
            tag="PRODOTTO PER PRODOTTO"
            tone="amber"
            title="Ogni prodotto ha il suo stato."
            body={
              <>
                <p>Una cucina, il top, gli elettrodomestici e le lampade arrivano da fornitori diversi e in momenti diversi. Nella Schedina ogni riga ha due stati chiari:</p>
                <p><b className="text-[#102744]">Ordine</b>: Da ordinare, Ordinato, Arrivato.<br /><b className="text-[#102744]">Fattura</b>: Mancante o Ricevuta.</p>
                <p>I prodotti con margine sotto soglia sono bordati in giallo e contati nel riquadro “Margine basso”.</p>
              </>
            }
          />
          <div className="mt-8"><ArrowLink href={routes.magazzino}>Arrivi, colli e ubicazione: Magazzino e logistica</ArrowLink></div>
        </div>
        <Reveal y={40}>
          <div ref={ref} aria-hidden="true" className="rounded-[32px] border border-[#f3dcb4] bg-white p-5 shadow-[0_24px_60px_rgba(16,39,68,.06)] sm:p-8" style={uiFont}>
            <div className="hidden grid-cols-[1.2fr_repeat(3,1fr)_.9fr] gap-2 pb-3 sm:grid">
              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#557090]">Prodotto</span>
              {ordineStati.map((s) => <span key={s} className="text-center text-[10px] font-bold uppercase tracking-[0.1em] text-[#8a4f0f]">{s}</span>)}
              <span className="text-center text-[10px] font-bold uppercase tracking-[0.1em] text-[#557090]">Fattura</span>
            </div>
            <div className="space-y-3">
              {lanes.map((lane) => {
                const pos = Math.min(ordineStati.length - 1, lane.start + step);
                const ricevuta = step >= lane.fattura;
                return (
                  <div key={lane.name} className="grid items-center gap-2 sm:grid-cols-[1.2fr_repeat(3,1fr)_.9fr]">
                    <div className="flex items-center justify-between gap-2 sm:block">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#557090]">{lane.brand}</p>
                        <p className="text-sm font-bold text-[#102744]">{lane.name}</p>
                      </div>
                      <span className="text-[11px] font-bold text-[#8a4f0f] sm:hidden">{ordineStati[pos]} · {ricevuta ? "Ricevuta" : "Mancante"}</span>
                    </div>
                    {ordineStati.map((s, i) => (
                      <div key={s} className="relative hidden h-9 rounded-[12px] bg-[#f6eee3] sm:block">
                        <motion.div className="absolute inset-0 rounded-[12px]" initial={false} animate={{ backgroundColor: i < pos ? "#fde3b8" : i === pos ? "#cf4a2b" : "rgba(0,0,0,0)" }} transition={{ duration: 0.5, ease: tpEase }} />
                        {i === pos && <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white"><Check className="mr-1 h-3 w-3" />{s}</span>}
                      </div>
                    ))}
                    <div className="hidden justify-center sm:flex">
                      <AnimatePresence mode="wait">
                        <motion.span key={String(ricevuta)} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${ricevuta ? "text-[#047857] ring-[#a7f3d0]" : "text-[#b91c1c] ring-[#fecaca]"}`}>
                          {ricevuta ? "Ricevuta" : "Mancante"}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <div className="h-2 rounded-full bg-[#f6eee3] sm:hidden"><motion.div className="h-2 rounded-full bg-[#cf4a2b]" initial={false} animate={{ width: `${((pos + 1) / 3) * 100}%` }} /></div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4 · MARGINI — sintesi con link all'approfondimento                    */
/* ------------------------------------------------------------------ */

function Margini() {
  return (
    <section className="bg-[#eff7ff] py-24 sm:py-28" id="margini">
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20`}>
        <div>
          <SectionHead
            tag="MARGINI"
            tone="green"
            title="Il margine si vede prima della consegna."
            body={
              <>
                <p>Prezzi finali e costi d’acquisto arrivano dal preventivo. La Schedina calcola il margine di ogni prodotto e lo somma nel riepilogo: acquistato più margine generato è uguale al venduto.</p>
                <p>Se un prodotto è sotto soglia lo vedi subito, mentre la commessa è ancora aperta.</p>
              </>
            }
          />
          <div className="mt-8"><ArrowLink href={routes.margini}>Come si legge il margine, riga per riga</ArrowLink></div>
        </div>
        <Reveal y={30} delay={0.08}>
          <div className="rounded-[32px] border border-[#cfe1f4] bg-white p-6 shadow-[0_30px_80px_rgba(16,39,68,.10)] sm:p-9" style={uiFont}>
            <p className="text-[12px] text-[#557090]"><b className="text-[#0F172A]">Schedina cliente</b> · Casa Bianchi · importi IVA incl.</p>
            <div className="mt-5 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-end gap-2 rounded-[22px] bg-[#F8FAFC] p-4 sm:gap-4 sm:p-6">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#557090]">Acquistato</p>
                <p className="mt-1 whitespace-nowrap text-lg font-bold tracking-[-0.03em] text-[#0F172A] sm:text-3xl">€ <CountUp to={19200} /></p>
              </div>
              <span className="pb-1 text-lg text-[#94A3B8] sm:text-2xl" aria-hidden>+</span>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#047857]">Margine</p>
                <p className="mt-1 whitespace-nowrap text-lg font-bold tracking-[-0.03em] text-[#047857] sm:text-3xl">€ <CountUp to={7090} /></p>
              </div>
              <span className="pb-1 text-lg text-[#94A3B8] sm:text-2xl" aria-hidden>=</span>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#557090]">Venduto</p>
                <p className="mt-1 whitespace-nowrap text-lg font-bold tracking-[-0.03em] text-[#0F172A] sm:text-3xl">€ <CountUp to={26290} /></p>
              </div>
            </div>
            <p className="mt-4 text-center text-xs font-semibold text-[#557090]">Dati di esempio. 2 prodotti su 4 sotto la soglia di margine.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5 · ACCONTI E SALDO                                                  */
/* ------------------------------------------------------------------ */

function Pagamenti() {
  return (
    <section className="bg-[#fbfdff] py-24 sm:py-32" id="pagamenti">
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1.2fr_.8fr] lg:gap-16`}>
        <Reveal y={40} className="lg:order-1">
          <div aria-hidden="true" className={`rounded-[36px] p-3 sm:p-5 ${panelTone.green}`}>
            <AppWindow active="totalone" title="Totalone showroom" className="h-[420px] sm:h-[470px]">
              <AccontiScreen />
            </AppWindow>
          </div>
          <p className={caption}>Dettaglio trattativa: un acconto registrato aggiorna il saldo. Dati di esempio.</p>
        </Reveal>
        <div className="lg:order-2">
          <SectionHead
            tag="ACCONTI E SALDO"
            tone="green"
            title="Sai sempre quanto resta da incassare."
            body={
              <>
                <p>Gli acconti si registrano sulla trattativa nata dal preventivo, con data e importo. Totalone ricalcola il saldo residuo e lo mostra accanto al venduto.</p>
                <p>Casa Bianchi: venduto € 26.290, acconto € 14.000, restano € 12.290 da pagare.</p>
              </>
            }
          />
          <div className="mt-8"><ArrowLink href={routes.trattative}>Come funziona la trattativa</ArrowLink></div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6 · SERVIZI, DOCUMENTI, NOTE                                         */
/* ------------------------------------------------------------------ */

function IconStack({ items }: { items: [string, typeof Truck][] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(([label, Icon]) => (
        <span key={label} className="inline-flex items-center gap-2 rounded-[14px] bg-[#eff7ff] px-3 py-2 text-xs font-bold text-[#0b55c6]">
          <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden /> {label}
        </span>
      ))}
    </div>
  );
}

function Card({ tag, title, children, visual }: { tag: string; title: string; children: ReactNode; visual: ReactNode }) {
  return (
    <StaggerItem>
      <SpotlightCard className="h-full rounded-[28px] border border-[#e4eef8] bg-white p-7 shadow-[0_1px_4px_rgba(2,8,23,.04)] sm:p-8">
        <article className="flex h-full flex-col">
          <span className="text-[11px] font-bold tracking-[.12em] text-[#0b55c6]">{tag}</span>
          <h3 className="mt-3 text-2xl font-bold leading-[1.05] tracking-[-0.045em] text-[#102744]">{title}</h3>
          <div className="mt-3 space-y-2 text-[15px] leading-7 text-[#557090]">{children}</div>
          <div className="mt-auto pt-6">{visual}</div>
        </article>
      </SpotlightCard>
    </StaggerItem>
  );
}

function Contesto() {
  return (
    <section className="bg-[#f4f9ff] py-24 sm:py-32">
      <div className={wrap}>
        <SectionHead tag="OLTRE AI PRODOTTI" tone="coral" title="Servizi, documenti e note nella stessa scheda." />
        <Stagger className="mt-12 grid gap-4 lg:grid-cols-3" gap={0.1}>
          <Card tag="COSTI DI SERVIZIO" title="Trasporto e lavorazioni contano." visual={<IconStack items={[["Trasporto", Truck], ["Smontaggio", Wrench], ["Imballaggi", Package], ["Altri servizi", ClipboardList]]} />}>
            <p>I servizi venduti con la commessa hanno la loro scheda nella Schedina, così entrano nel conto insieme ai prodotti.</p>
          </Card>
          <Card tag="DOCUMENTI" title="Contratto e planimetria a portata di mano." visual={<IconStack items={[["Contratti", FileText], ["Planimetrie", FolderOpen], ["Comunicazioni", Mail]]} />}>
            <p>I file della commessa si allegano alla Schedina: chi prepara l’ordine o il montaggio li trova nello stesso punto.</p>
          </Card>
          <Card tag="NOTE E STORICO" title="Il contesto non resta in una testa sola." visual={<IconStack items={[["Note interne", StickyNote], ["Storico", History]]} />}>
            <p>Accordi presi con il cliente, richieste particolari, cosa è già stato fatto: tutto scritto sulla commessa.</p>
          </Card>
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 7 · PASSO SUCCESSIVO                                                 */
/* ------------------------------------------------------------------ */

function PassoSuccessivo() {
  const after = [
    { href: routes.magazzino, tag: "PASSO SUCCESSIVO", title: "Magazzino e logistica", body: "I prodotti ordinati diventano arrivi previsti, colli e ubicazioni." },
    { href: routes.montaggi, tag: "POI", title: "Montaggi", body: "La commessa arriva in calendario con cliente, prodotti e indirizzo." },
    { href: routes.assistenza, tag: "DOPO LA CONSEGNA", title: "Assistenza e post-vendita", body: "Ogni richiesta resta collegata al cliente e al prodotto della Schedina." },
  ];
  return (
    <section className="bg-[#fbfdff] py-20 sm:py-24">
      <div className={wrap}>
        <Stagger className="grid gap-4 md:grid-cols-3" gap={0.08}>
          {after.map((a, i) => (
            <StaggerItem key={a.href}>
              <a href={a.href} className={`group flex h-full flex-col rounded-[28px] p-7 transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1769d5] ${i === 0 ? "bg-[#082c68] text-white shadow-[0_24px_60px_rgba(8,44,104,.22)]" : "border border-[#e4eef8] bg-white text-[#102744]"}`}>
                <span className={`text-[11px] font-bold tracking-[0.12em] ${i === 0 ? "text-[#9fe0ff]" : "text-[#0b55c6]"}`}>{a.tag}</span>
                <strong className="mt-4 text-2xl font-bold tracking-[-0.04em]">{a.title}</strong>
                <span className={`mt-2 text-sm leading-6 ${i === 0 ? "text-[#d5ebff]" : "text-[#557090]"}`}>{a.body}</span>
                <ArrowRight className={`mt-6 h-4 w-4 transition-transform group-hover:translate-x-1 ${i === 0 ? "text-white" : "text-[#cf4a2b]"}`} aria-hidden />
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PAGINA                                                              */
/* ------------------------------------------------------------------ */

export function CommesseProductPage() {
  useSeo({
    title: "Gestione commesse per negozi di arredamento",
    description: "Con Totalone la Schedina cliente nasce dal preventivo convertito: prodotti, margini, stato ordine e fattura, documenti, acconti e saldo di ogni commessa di arredamento.",
    path: routes.commesse,
  });

  return (
    <MarketingShell active="commesse" overlayHeader>
      <main id="top" className="overflow-x-clip bg-[#fbfdff] text-[#102744] [&_[id]]:scroll-mt-24" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <Hero />
        <Panoramica />
        <ProdottoPerProdotto />
        <Margini />
        <Pagamenti />
        <Contesto />
        <PassoSuccessivo />
        <ProcessoStrip current="commesse" />
      </main>
    </MarketingShell>
  );
}
