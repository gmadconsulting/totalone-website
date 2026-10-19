import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { MarketingShell } from "../totalone-site-architecture/_shared/MarketingShell";
import { CountUp, Reveal, Stagger, StaggerItem, WordReveal, tpEase, useLoopSteps } from "@/components/totalone/motion-kit";
import { AppWindow, uiFont } from "@/components/totalone/app-ui";
import { SchedinaCompleta } from "@/components/totalone/pages/commesse/CommesseScreens";
import { ArrowLink, DemoButton, PerspectiveMockup, SectionHead, panelTone, wrap } from "@/components/totalone/pages/commesse/CommesseKit";
import { routes } from "@/components/totalone/site/siteRoutes";
import { ProcessoStrip } from "@/components/totalone/site/ProcessoStrip";
import { useSeo } from "@/components/totalone/site/useSeo";

/* ------------------------------------------------------------------ */
/* 1 · HERO                                                            */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(116deg,#082c68_0%,#0d56bf_54%,#1387ee_100%)] pb-20 pt-28 text-white sm:pb-28 sm:pt-36">
      <motion.div aria-hidden className="absolute -right-20 top-10 h-[420px] w-[420px] rounded-full bg-[#75d7ff]/30 blur-3xl" animate={{ x: [0, -60, 0], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div aria-hidden className="absolute -left-28 top-[380px] h-[420px] w-[420px] rounded-full bg-[#34d399]/15 blur-3xl" animate={{ x: [0, 50, 0], y: [0, -30, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
      <div className={`relative ${wrap}`}>
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#cfe6ff]">
          <a href={routes.home} className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Home</a>
          <span aria-hidden>/</span>
          <a href={routes.commesse} className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Gestione commesse</a>
          <span aria-hidden>/</span>
          <span aria-current="page" className="text-white">Margini di commessa</span>
        </nav>
        <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
          <div>
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: tpEase }} className="inline-flex items-center gap-2 rounded-full border border-[#8ecbff] bg-[#5abaff]/20 px-3.5 py-2 text-xs font-bold tracking-[0.08em] text-[#eff8ff]">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6ee7b7] opacity-75 motion-reduce:animate-none" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#6ee7b7]" /></span>
              MARGINI DI COMMESSA
            </motion.span>
            <h1 className="mt-7 max-w-3xl text-[clamp(2.8rem,6.4vw,5.8rem)] font-bold leading-[.93] tracking-[-0.075em]">
              <WordReveal text="Quanto guadagni" />
              <br />
              <WordReveal text="su ogni prodotto venduto." className="text-[#9fe0ff]" delay={0.25} />
            </h1>
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: tpEase, delay: 0.45 }}>
            <p className="max-w-xl text-lg leading-8 text-[#e5f3ff]">Un approfondimento sulla Schedina cliente: come Totalone calcola il margine di ogni riga, lo somma nel riepilogo della commessa e segnala i prodotti venduti sotto soglia.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <DemoButton light />
              <a href={routes.commesse} className="group inline-flex items-center gap-2 px-2 text-sm font-bold text-white hover:text-[#d0e8ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" /> Torna a Gestione commesse
              </a>
            </div>
          </motion.div>
        </div>

        <div aria-hidden="true">
          <PerspectiveMockup className="mx-auto mt-16 max-w-[1120px] sm:mt-20">
            <AppWindow active="schedine" title="Schedina" className="h-[440px] sm:h-[500px] lg:h-[540px]">
              <SchedinaCompleta variant="margini" />
            </AppWindow>
          </PerspectiveMockup>
        </div>
        <p className="mt-6 text-center text-xs font-semibold text-[#cfe6ff]">Schermate dimostrative, dati di esempio.</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2 · UNA RIGA — listino → sconto → finale → acquisto → margine         */
/* ------------------------------------------------------------------ */

function RigaAnatomia() {
  const lines: { label: string; value: ReactNode; tone?: string }[] = [
    { label: "Listino (IVA incl.)", value: <>€ <CountUp to={26285} /></> },
    { label: "Sconto", value: "−30,69%", tone: "text-[#b91c1c]" },
    { label: "Finale (IVA incl.)", value: <>€ <CountUp to={18218} /></>, tone: "text-[#c2410c]" },
    { label: "Acquisto (IVA incl.)", value: <>€ <CountUp to={12880} /></> },
  ];
  return (
    <div className="rounded-[32px] border border-[#cfe1f4] bg-white p-6 shadow-[0_30px_80px_rgba(16,39,68,.10)] sm:p-8" style={uiFont}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#557090]">Linea Cucine</p>
          <p className="text-lg font-bold tracking-[-0.02em] text-[#0F172A]">Cucina</p>
        </div>
        <span className="rounded-full bg-[#F1F5F9] px-3 py-1 text-[11px] font-semibold text-[#475569]">Qty 1</span>
      </div>
      <div className="mt-5 divide-y divide-[#EEF2F6]">
        {lines.map((l, i) => (
          <motion.div key={l.label} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.12, duration: 0.5, ease: tpEase }} className="flex items-center justify-between py-3">
            <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#557090]">{l.label}</span>
            <span className={`text-base font-semibold ${l.tone ?? "text-[#0F172A]"}`}>{l.value}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-[18px] bg-[#ECFDF5] px-4 py-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#047857]">Margine (finale − acquisto) / finale</span>
        <span className="flex items-center gap-2 text-2xl font-bold tracking-[-0.03em] text-[#047857]">
          <CountUp to={29.3} decimals={1} suffix="%" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" aria-hidden />
        </span>
      </div>
      <p className="mt-4 text-center text-[11px] text-[#557090]">Una riga della tabella Prodotti. Dati di esempio.</p>
    </div>
  );
}

function Riga() {
  return (
    <section className="bg-[#fbfdff] py-24 sm:py-32" id="come-si-calcola">
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20`}>
        <SectionHead
          tag="COME SI CALCOLA"
          tone="green"
          title="Una riga alla volta."
          body={
            <>
              <p>Ogni prodotto della Schedina porta con sé listino, sconto e prezzo finale dal preventivo convertito. Basta il costo d’acquisto del fornitore e Totalone calcola il margine della riga.</p>
              <p>Accanto al valore compare un pallino: verde se il margine è sopra la soglia, arancione se è sotto.</p>
            </>
          }
        />
        <Reveal y={40} delay={0.08}>
          <div className={`rounded-[40px] p-4 sm:p-7 ${panelTone.green}`}>
            <RigaAnatomia />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3 · IL RIEPILOGO — acquistato + margine = venduto, margine basso      */
/* ------------------------------------------------------------------ */

function Riepilogo() {
  const [ref, step] = useLoopSteps(3, 1900);
  const rows: [string, string, string, boolean][] = [
    ["Linea Cucine", "Cucina", "29,3%", false],
    ["Pietra & Co", "Top in quarzo", "30,0%", false],
    ["Casa Elettro", "Elettrodomestici", "20,0%", true],
    ["Luce & Co", "Lampade sospese", "12,5%", true],
  ];
  return (
    <section className="bg-[#fffaf7] py-24 sm:py-32" id="riepilogo">
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-16`}>
        <Reveal y={40}>
          <div ref={ref} aria-hidden="true" className={`rounded-[40px] p-4 sm:p-7 ${panelTone.amber}`}>
            <div className="relative rounded-[30px] bg-white p-5 pt-8 shadow-[0_30px_80px_rgba(16,39,68,.12)] sm:p-8 sm:pt-10" style={uiFont}>
              <span className="absolute -top-3 left-6 rounded-full bg-[#2563EB] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">● Importi IVA incl.</span>
              <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-start gap-2 sm:gap-4">
                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#557090] sm:text-[11px]">Acquistato</p>
                  <p className="mt-1 whitespace-nowrap text-lg font-bold tracking-[-0.03em] text-[#0F172A] sm:text-3xl">€ <CountUp to={19200} /></p>
                </div>
                <span className="pt-5 text-[#94A3B8] sm:text-xl">+</span>
                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#047857] sm:text-[11px]">Margine generato</p>
                  <p className="mt-1 whitespace-nowrap text-lg font-bold tracking-[-0.03em] text-[#047857] sm:text-3xl">€ <CountUp to={7090} /></p>
                </div>
                <span className="pt-5 text-[#94A3B8] sm:text-xl">=</span>
                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#557090] sm:text-[11px]">Venduto</p>
                  <p className="mt-1 whitespace-nowrap text-lg font-bold tracking-[-0.03em] text-[#0F172A] sm:text-3xl">€ <CountUp to={26290} /></p>
                </div>
              </div>
              <p className="mt-2 text-[11px] text-[#047857]">27,0% sul venduto · media dei margini di riga 23,0%</p>
              <div className="mt-5 grid gap-2">
                {rows.map(([b, t, m, low]) => (
                  <motion.div
                    key={t}
                    animate={{ backgroundColor: step === 2 && low ? "#FEFCE8" : "#FFFFFF", opacity: step === 2 && !low ? 0.5 : 1 }}
                    transition={{ duration: 0.4 }}
                    className={`flex items-center justify-between rounded-[14px] border border-[#EEF2F6] border-l-[3px] px-4 py-2.5 ${low ? "border-l-[#FACC15]" : "border-l-transparent"}`}
                  >
                    <span>
                      <span className="block text-[9px] font-medium uppercase tracking-[0.1em] text-[#557090]">{b}</span>
                      <span className="block text-sm font-semibold text-[#0F172A]">{t}</span>
                    </span>
                    <motion.span animate={{ scale: step === 1 ? 1.1 : 1 }} className={`flex items-center gap-1.5 text-sm font-semibold ${low ? "text-[#c2410c]" : "text-[#047857]"}`}>
                      {m}
                      <span className={`h-2 w-2 rounded-full ${low ? "bg-[#F59E0B]" : "bg-[#10B981]"}`} />
                    </motion.span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                animate={{ scale: step === 2 ? 1.05 : 1, boxShadow: step === 2 ? "0 0 0 4px rgba(250,204,21,.35)" : "0 0 0 0 rgba(250,204,21,0)" }}
                className="mx-auto mt-5 w-fit rounded-[14px] border border-[#FDE68A] bg-[#FEFCE8] px-4 py-2 text-center"
              >
                <p className="flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#92400e]"><AlertTriangle className="h-3 w-3" /> Margine basso</p>
                <p className="text-sm font-bold text-[#92400e]">2 prodotti</p>
              </motion.div>
            </div>
          </div>
          <p className="mt-5 text-center text-xs font-semibold text-[#557090]">Il riepilogo in testa alla Schedina di Casa Bianchi. Dati di esempio.</p>
        </Reveal>
        <div>
          <SectionHead
            tag="IL RIEPILOGO"
            tone="amber"
            title="La commessa in tre numeri."
            body={
              <>
                <p>In testa alla Schedina: acquistato, margine generato e venduto. I tre valori si aggiornano quando aggiungi un prodotto o correggi un costo.</p>
                <p>Il riquadro “Margine basso” conta i prodotti sotto soglia; nella tabella sono bordati in giallo, così sai quali rivedere con il fornitore o con il venditore.</p>
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4 · DOMANDE FREQUENTI                                               */
/* ------------------------------------------------------------------ */

function Domande() {
  const faq: [string, ReactNode][] = [
    ["Posso leggere gli importi IVA esclusa?", "Sì. Un interruttore nella tabella prodotti porta riepilogo e righe da IVA inclusa a IVA esclusa."],
    ["Da dove arrivano listino, sconto e prezzo finale?", "Dal preventivo: quando lo converti, le righe passano nella Schedina cliente senza essere ricopiate."],
    ["I servizi entrano nel conto?", "Trasporto, smontaggio e altri servizi hanno la loro scheda “Costi di servizio” nella stessa Schedina."],
    [
      "Dove vedo i margini di tutte le commesse insieme?",
      <>Le letture per periodo, showroom e venditore sono in <a href={routes.controllo} className="font-semibold text-[#0b55c6] underline decoration-[#9fc4ee] underline-offset-4 hover:text-[#b93f23]">Controllo e performance</a>.</>,
    ],
  ];
  return (
    <section className="bg-[#eff7ff] py-24 sm:py-28" id="domande">
      <div className={`${wrap} max-w-[960px]`}>
        <SectionHead tag="DOMANDE FREQUENTI" title="Margini: cosa chiedono di solito." />
        <Stagger className="mt-10 grid gap-3" gap={0.06}>
          {faq.map(([q, a]) => (
            <StaggerItem key={q}>
              <div className="rounded-[22px] border border-[#cfe1f4] bg-white p-5 sm:p-6">
                <h3 className="text-lg font-bold tracking-[-0.03em] text-[#102744]">{q}</h3>
                <p className="mt-2 text-[15px] leading-7 text-[#557090]">{a}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5 · RITORNO A COMMESSE                                              */
/* ------------------------------------------------------------------ */

function Ritorno() {
  return (
    <section className="bg-[#fbfdff] py-20 sm:py-24">
      <div className={`${wrap} grid gap-4 md:grid-cols-2`}>
        <a href={routes.commesse} className="group flex flex-col rounded-[28px] bg-[#082c68] p-7 text-white shadow-[0_24px_60px_rgba(8,44,104,.22)] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1769d5] sm:p-9">
          <span className="text-[11px] font-bold tracking-[0.12em] text-[#9fe0ff]">TORNA ALLA PAGINA</span>
          <strong className="mt-4 text-3xl font-bold tracking-[-0.05em]">Gestione commesse</strong>
          <span className="mt-2 text-sm leading-6 text-[#d5ebff]">La Schedina cliente completa: stati di ordine e fattura, acconti, servizi e documenti.</span>
          <ArrowLeft className="mt-6 h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden />
        </a>
        <div className="flex flex-col justify-center rounded-[28px] border border-[#e4eef8] bg-white p-7 sm:p-9">
          <span className="text-[11px] font-bold tracking-[0.12em] text-[#0b55c6]">PASSO SUCCESSIVO</span>
          <strong className="mt-4 text-2xl font-bold tracking-[-0.04em] text-[#102744]">Dai prodotti ordinati agli arrivi in magazzino.</strong>
          <div className="mt-5"><ArrowLink href={routes.magazzino}>Magazzino e logistica</ArrowLink></div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PAGINA                                                              */
/* ------------------------------------------------------------------ */

export function CommesseMarginiFocus() {
  useSeo({
    title: "Margini di commessa per showroom di arredamento",
    description: "Come Totalone calcola il margine di ogni prodotto nella Schedina cliente: listino, sconto, prezzo finale, acquisto, riepilogo della commessa e segnalazione del margine basso.",
    path: routes.margini,
  });

  return (
    <MarketingShell active="commesse" overlayHeader>
      <main id="top" className="overflow-x-clip bg-[#fbfdff] text-[#102744] [&_[id]]:scroll-mt-24" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <Hero />
        <Riga />
        <Riepilogo />
        <Domande />
        <Ritorno />
        <ProcessoStrip current="commesse" />
      </main>
    </MarketingShell>
  );
}
