import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, FileText, Mail, Scale, ShieldCheck } from "lucide-react";
import { WordReveal, tpEase } from "@/components/totalone/motion-kit";
import { MarketingShell } from "../totalone-site-architecture/_shared/MarketingShell";
import { useSeo } from "@/components/totalone/site/useSeo";
import { routes } from "@/components/totalone/site/siteRoutes";

/**
 * Informativa privacy del sito Totalone (art. 13 Reg. UE 2016/679).
 *
 * I dati del titolare vanno compilati QUI. Finché un campo è vuoto la pagina
 * lo evidenzia in giallo e mostra un avviso di bozza in testa: non pubblicare
 * in produzione con campi vuoti. Il testo descrive i trattamenti effettivi del
 * sito (form demo, log dell'hosting, font Google): se se ne aggiungono altri
 * (analytics, newsletter, chat, pixel…) l'informativa va aggiornata.
 */
const titolare = {
  ragioneSociale: "", // es. "Totalone S.r.l."
  sedeLegale: "", // es. "Via …, CAP Città (Provincia), Italia"
  partitaIva: "", // es. "IT01234567890"
  registroImprese: "", // es. "REA MI-1234567" (facoltativo)
  emailPrivacy: "", // es. "privacy@thetotalone.com"
  pec: "", // es. "totalone@pec.it" (facoltativo)
  /** Lasciare null se il DPO non è stato nominato (art. 37 GDPR). */
  dpo: null as null | { nome: string; email: string },
  /** Strumento che riceve le richieste del form demo (CRM, email, ecc.). */
  strumentoContatti: "", // es. "HubSpot Inc. (CRM)", "Google Workspace (email)"
  ultimoAggiornamento: "16 ottobre 2026",
};

const sections = [
  ["titolare", "Titolare del trattamento"],
  ["ambito", "Ambito dell'informativa"],
  ["dati", "Dati trattati"],
  ["finalita", "Finalità e basi giuridiche"],
  ["conferimento", "Natura del conferimento"],
  ["modalita", "Modalità e sicurezza"],
  ["destinatari", "Destinatari"],
  ["trasferimenti", "Trasferimenti fuori dallo SEE"],
  ["conservazione", "Conservazione"],
  ["cookie", "Cookie e tecnologie simili"],
  ["diritti", "I tuoi diritti"],
  ["reclamo", "Reclamo all'autorità"],
  ["svizzera", "Utenti in Svizzera"],
  ["altro", "Minori e decisioni automatizzate"],
  ["modifiche", "Modifiche all'informativa"],
] as const;

/** Valore del titolare, oppure segnaposto evidenziato se mancante. */
function Fill({ value, label }: { value?: string | null; label: string }) {
  if (value) return <>{value}</>;
  return <mark className="rounded-[6px] bg-[#fef3c7] px-1.5 py-0.5 font-semibold text-[#92400e] ring-1 ring-[#fcd34d]">[da completare: {label}]</mark>;
}

function Section({ id, n, title, children }: { id: string; n: number; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-[#e4eef8] pt-10 first:border-0 first:pt-0">
      {/* Testo legale sempre visibile (stampa, SEO, lettori di schermo): nessuna animazione d'ingresso. */}
      <p className="font-mono text-xs font-bold text-[#8aa3bd]">{String(n).padStart(2, "0")}</p>
      <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#102744] sm:text-[1.9rem]">{title}</h2>
      <div className="mt-5 space-y-4 text-[15.5px] leading-7 text-[#3f5f80]">{children}</div>
    </section>
  );
}

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-[20px] border border-[#e4eef8] bg-white">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="bg-[#f4f9ff] text-[11px] font-bold uppercase tracking-[0.1em] text-[#557090]">
          <tr>{head.map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-[#eef4fa] align-top text-[#3f5f80]">
          {rows.map((r, i) => (
            <tr key={i}>{r.map((c, j) => <td key={j} className={`px-4 py-3 leading-6 ${j === 0 ? "font-semibold text-[#102744]" : ""}`}>{c}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Strong = ({ children }: { children: ReactNode }) => <strong className="font-semibold text-[#102744]">{children}</strong>;

export function PrivacyPolicyPage() {
  const [active, setActive] = useState<string>(sections[0][0]);
  const missing = [titolare.ragioneSociale, titolare.sedeLegale, titolare.partitaIva, titolare.emailPrivacy, titolare.strumentoContatti].some((v) => !v);
  const email = titolare.emailPrivacy;
  useSeo({ title: "Privacy policy", description: "Informativa sul trattamento dei dati personali del sito Totalone ai sensi dell'art. 13 del Regolamento (UE) 2016/679.", path: routes.privacy });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <MarketingShell active="privacy" eyebrow="INFORMATIVA PRIVACY" overlayHeader>
      <main className="text-[#102744]">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[linear-gradient(116deg,#082c68_0%,#0d56bf_54%,#1387ee_100%)] pb-20 pt-32 text-white sm:pb-24 sm:pt-40">
          <motion.div aria-hidden className="absolute -right-20 top-10 h-[360px] w-[360px] rounded-full bg-[#75d7ff]/25 blur-3xl" animate={{ x: [0, -40, 0], y: [0, 24, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
          <div className="relative mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-10">
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: tpEase }} className="inline-flex items-center gap-2 rounded-full border border-[#8ecbff] bg-[#5abaff]/20 px-3.5 py-2 text-xs font-bold tracking-[0.08em] text-[#eff8ff]">
              <ShieldCheck className="h-3.5 w-3.5" /> PRIVACY POLICY
            </motion.span>
            <h1 className="mt-6 max-w-3xl text-[clamp(2.6rem,6vw,4.8rem)] font-bold leading-[.95] tracking-[-0.07em]">
              <WordReveal text="Informativa sul trattamento dei dati personali" />
            </h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: tpEase, delay: 0.3 }} className="mt-6 max-w-2xl text-lg leading-8 text-[#e5f3ff]">
              Ai sensi dell'art. 13 del Regolamento (UE) 2016/679 («GDPR») e del D.Lgs. 196/2003 («Codice privacy»), come modificato dal D.Lgs. 101/2018, per chi visita il sito Totalone o ci contatta tramite i suoi moduli.
            </motion.p>
            <p className="mt-6 text-sm font-semibold text-[#cfe6ff]">Ultimo aggiornamento: {titolare.ultimoAggiornamento}</p>
          </div>
        </section>

        <section className="bg-[#fbfdff] py-16 sm:py-24">
          <div className="mx-auto grid max-w-[1100px] gap-12 px-5 sm:px-8 lg:grid-cols-[240px_1fr] lg:gap-16 lg:px-10">
            {/* INDICE */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#557090]">In questa pagina</p>
              <nav aria-label="Indice dell'informativa" className="mt-4">
                <ol className="space-y-1 border-l border-[#dbe8f5]">
                  {sections.map(([id, label], i) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        className={`-ml-px block border-l-2 py-1.5 pl-4 text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769d5] ${active === id ? "border-[#1769d5] font-bold text-[#0b55c6]" : "border-transparent font-semibold text-[#6b86a3] hover:text-[#0b55c6]"}`}
                      >
                        <span className="mr-2 font-mono text-[10px] text-[#9fb5cc]">{String(i + 1).padStart(2, "0")}</span>
                        {label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className="mt-8 hidden rounded-[22px] border border-[#e4eef8] bg-white p-5 lg:block">
                <Mail className="h-5 w-5 text-[#1769d5]" />
                <p className="mt-3 text-sm font-bold text-[#102744]">Domande sui tuoi dati?</p>
                <p className="mt-1 text-[13px] leading-5 text-[#557090]">Scrivici a <Fill value={email} label="email privacy" />.</p>
              </div>
            </aside>

            <article className="min-w-0 space-y-12">
              {missing && (
                <div role="note" className="flex gap-3 rounded-[20px] border border-[#fcd34d] bg-[#fffbeb] p-5 text-sm leading-6 text-[#92400e]">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                  <p><strong>Bozza.</strong> Completa i campi evidenziati (dati del titolare e fornitori) in <code className="rounded bg-white/70 px-1">PrivacyPolicyPage.tsx</code> e falla validare dal tuo consulente legale prima della pubblicazione.</p>
                </div>
              )}

              <Section id="titolare" n={1} title="Titolare del trattamento">
                <p>Il titolare del trattamento è <Strong><Fill value={titolare.ragioneSociale} label="ragione sociale" /></Strong>, con sede legale in <Fill value={titolare.sedeLegale} label="sede legale" />, P.IVA <Fill value={titolare.partitaIva} label="partita IVA" />{titolare.registroImprese ? <>, {titolare.registroImprese}</> : null} (di seguito «Totalone», «noi»).</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[18px] border border-[#e4eef8] bg-white p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#557090]">Contatto privacy</p>
                    <p className="mt-1 font-semibold text-[#102744]"><Fill value={email} label="email privacy" /></p>
                    {titolare.pec && <p className="mt-1 text-sm">PEC: {titolare.pec}</p>}
                  </div>
                  <div className="rounded-[18px] border border-[#e4eef8] bg-white p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#557090]">Responsabile della protezione dei dati (DPO)</p>
                    <p className="mt-1 font-semibold text-[#102744]">{titolare.dpo ? <>{titolare.dpo.nome} · {titolare.dpo.email}</> : "Non nominato: per ogni richiesta usa il contatto privacy."}</p>
                  </div>
                </div>
              </Section>

              <Section id="ambito" n={2} title="Ambito dell'informativa">
                <p>Questa informativa riguarda i dati personali trattati attraverso il sito web Totalone (pagine pubbliche, blog, guide e moduli di contatto) e le comunicazioni che ne derivano.</p>
                <p>Non riguarda i dati che i clienti inseriscono nella piattaforma gestionale Totalone (anagrafiche dei loro clienti, preventivi, commesse, documenti). Per quei dati il titolare del trattamento è il cliente; il loro trattamento è regolato dal contratto di servizio e dall'accordo sul trattamento dei dati ai sensi dell'art. 28 GDPR, consegnati al momento dell'attivazione.</p>
                <p>Il sito può contenere link a siti di terzi: per i trattamenti svolti su quei siti valgono le rispettive informative.</p>
              </Section>

              <Section id="dati" n={3} title="Dati trattati">
                <p><Strong>a) Dati di navigazione.</Strong> I sistemi che fanno funzionare il sito acquisiscono, come parte normale del funzionamento dei protocolli di Internet, alcuni dati tecnici: indirizzo IP, data e ora della richiesta, pagina richiesta, codice di risposta, browser e sistema operativo, pagina di provenienza. Non servono a identificarti, ma potrebbero permetterlo se associati ad altri dati. Sono usati per far funzionare il sito, garantirne la sicurezza e accertare eventuali illeciti.</p>
                <p><Strong>b) Dati che ci fornisci tramite i moduli.</Strong> Quando chiedi una demo o un preventivo ci comunichi nome e cognome, indirizzo email aziendale e, in alcuni moduli, il nome della tua azienda o showroom. Se ci scrivi via email, trattiamo anche l'indirizzo e i dati contenuti nel messaggio. Ti chiediamo di non inserire dati non necessari e, in particolare, categorie particolari di dati (art. 9 GDPR).</p>
                <p><Strong>c) Dati raccolti tramite servizi di terzi incorporati.</Strong> Per mostrare i caratteri tipografici il sito carica i font dai server di Google Fonts: il tuo browser comunica a Google il tuo indirizzo IP e i dati tecnici della richiesta (vedi sezioni 7 e 8).</p>
              </Section>

              <Section id="finalita" n={4} title="Finalità e basi giuridiche">
                <Table
                  head={["Finalità", "Dati", "Base giuridica"]}
                  rows={[
                    ["Funzionamento, manutenzione e sicurezza del sito", "Dati di navigazione", "Legittimo interesse a offrire un sito sicuro e funzionante (art. 6.1.f GDPR)"],
                    ["Visualizzazione dei caratteri tipografici", "Indirizzo IP, dati tecnici", "Legittimo interesse a una presentazione coerente del sito (art. 6.1.f GDPR)"],
                    ["Risposta alla richiesta di demo, preventivo o informazioni e successivi contatti su quella richiesta", "Dati dei moduli, email", "Esecuzione di misure precontrattuali adottate su tua richiesta (art. 6.1.b GDPR)"],
                    ["Gestione del rapporto contrattuale, se diventi cliente", "Dati di contatto e di fatturazione", "Esecuzione del contratto (art. 6.1.b) e obblighi di legge (art. 6.1.c GDPR)"],
                    ["Adempimento di obblighi di legge, regolamento o ordini delle autorità", "Dati necessari all'adempimento", "Obbligo legale (art. 6.1.c GDPR)"],
                    ["Accertamento, esercizio o difesa di un diritto in sede giudiziaria", "Dati pertinenti", "Legittimo interesse (art. 6.1.f GDPR)"],
                  ]}
                />
                <p>Non usiamo i dati dei moduli per inviarti newsletter o comunicazioni promozionali non collegate alla tua richiesta. Se in futuro ti proporremo comunicazioni di marketing, lo faremo solo con il tuo consenso specifico (art. 6.1.a GDPR), che potrai revocare in qualsiasi momento.</p>
                <p>Quando il trattamento si basa sul legittimo interesse, abbiamo valutato che non prevalgono i tuoi interessi, diritti e libertà. Puoi chiedere informazioni su questa valutazione e opporti al trattamento (sezione 11).</p>
              </Section>

              <Section id="conferimento" n={5} title="Natura del conferimento">
                <p>Il conferimento dei dati nei moduli è facoltativo, ma i campi indicati come obbligatori sono necessari per rispondere: senza di essi non possiamo dare seguito alla richiesta. I dati di navigazione sono necessari per l'uso del sito.</p>
              </Section>

              <Section id="modalita" n={6} title="Modalità e sicurezza">
                <p>I dati sono trattati con strumenti elettronici, secondo i principi di liceità, correttezza, trasparenza, minimizzazione e limitazione della conservazione (art. 5 GDPR), da persone autorizzate e istruite (art. 29 GDPR e art. 2-quaterdecies Codice privacy).</p>
                <p>Adottiamo misure tecniche e organizzative adeguate al rischio (art. 32 GDPR), tra cui connessioni cifrate HTTPS, accesso ai dati limitato a chi ne ha bisogno e scelta di fornitori che offrono garanzie adeguate.</p>
              </Section>

              <Section id="destinatari" n={7} title="Destinatari">
                <p>I dati non sono diffusi. Possono essere comunicati, nei limiti necessari alle finalità indicate, a:</p>
                <Table
                  head={["Destinatario", "Ruolo", "Attività"]}
                  rows={[
                    ["Vercel Inc. (USA)", "Responsabile del trattamento (art. 28 GDPR)", "Hosting del sito e registrazione dei dati di navigazione"],
                    ["Google LLC / Google Ireland Ltd.", "Fornitore del servizio Google Fonts", "Distribuzione dei caratteri tipografici"],
                    [<Fill value={titolare.strumentoContatti} label="strumento che riceve i moduli (CRM / email)" />, "Responsabile del trattamento (art. 28 GDPR)", "Ricezione e gestione delle richieste inviate dai moduli"],
                    ["Consulenti e professionisti (es. legali, fiscali)", "Responsabili o titolari autonomi", "Assistenza e adempimenti, se necessario"],
                    ["Autorità pubbliche e giudiziarie", "Titolari autonomi", "Solo quando previsto dalla legge"],
                  ]}
                />
                <p>Il personale di Totalone autorizzato al trattamento accede ai dati solo per le finalità indicate. L'elenco aggiornato dei responsabili del trattamento è disponibile su richiesta.</p>
              </Section>

              <Section id="trasferimenti" n={8} title="Trasferimenti fuori dallo Spazio economico europeo">
                <p>Alcuni fornitori (Vercel Inc. e Google LLC) hanno sede negli Stati Uniti o possono trattare dati negli Stati Uniti. Il trasferimento avviene sulla base della decisione di adeguatezza della Commissione europea relativa all'EU-U.S. Data Privacy Framework (Decisione di esecuzione (UE) 2023/1795 del 10 luglio 2023), per i fornitori certificati, e in ogni caso sulla base delle clausole contrattuali tipo approvate dalla Commissione (Decisione di esecuzione (UE) 2021/914), ai sensi degli artt. 45 e 46 GDPR.</p>
                <p>Puoi chiedere informazioni sulle garanzie adottate e ottenerne copia scrivendo a <Fill value={email} label="email privacy" />.</p>
              </Section>

              <Section id="conservazione" n={9} title="Conservazione">
                <Table
                  head={["Dati", "Per quanto tempo"]}
                  rows={[
                    ["Dati di navigazione (log dell'hosting)", "Per il periodo previsto dal fornitore di hosting, in genere pochi giorni o settimane, salvo esigenze di accertamento di illeciti"],
                    ["Richieste di demo o informazioni non seguite da un contratto", "Fino a 24 mesi dall'ultimo contatto, poi cancellate o anonimizzate"],
                    ["Dati relativi a un contratto", "Per la durata del rapporto e, per documenti contabili e fiscali, per 10 anni dalla loro data (art. 2220 c.c.)"],
                    ["Dati usati per la difesa di un diritto", "Fino alla definizione del contenzioso e per i termini di prescrizione"],
                  ]}
                />
                <p>Al termine dei periodi indicati i dati sono cancellati o resi anonimi in modo irreversibile.</p>
              </Section>

              <Section id="cookie" n={10} title="Cookie e tecnologie simili">
                <p>Il sito non utilizza cookie di profilazione, cookie di terze parti per finalità di marketing né strumenti di analisi statistica. Non installiamo cookie sul tuo dispositivo; possono essere usati soltanto strumenti tecnici strettamente necessari al funzionamento del sito, per i quali non è richiesto il consenso (art. 122 Codice privacy e Linee guida del Garante del 10 giugno 2021).</p>
                <p>Se in futuro introdurremo cookie o strumenti non tecnici, ti chiederemo prima il consenso tramite un banner e aggiorneremo questa informativa.</p>
              </Section>

              <Section id="diritti" n={11} title="I tuoi diritti">
                <p>Nei casi e nei limiti previsti dagli artt. 15-22 GDPR hai diritto di:</p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {[
                    ["Accesso", "sapere se trattiamo tuoi dati e riceverne copia (art. 15)"],
                    ["Rettifica", "correggere o integrare dati inesatti o incompleti (art. 16)"],
                    ["Cancellazione", "ottenere la cancellazione dei dati (art. 17)"],
                    ["Limitazione", "chiedere di limitare il trattamento (art. 18)"],
                    ["Portabilità", "ricevere i dati che ci hai fornito in formato strutturato (art. 20)"],
                    ["Opposizione", "opporti ai trattamenti basati sul legittimo interesse (art. 21)"],
                  ].map(([t, d]) => (
                    <li key={t} className="rounded-[16px] border border-[#e4eef8] bg-white p-4 text-sm leading-6">
                      <Strong>{t}</Strong> — {d}
                    </li>
                  ))}
                </ul>
                <p>Se un trattamento si basa sul consenso, puoi revocarlo in qualsiasi momento senza pregiudicare la liceità del trattamento svolto prima della revoca (art. 7.3 GDPR).</p>
                <p>Per esercitare i diritti scrivi a <Strong><Fill value={email} label="email privacy" /></Strong>. Rispondiamo senza ingiustificato ritardo e comunque entro un mese dalla richiesta, termine prorogabile di due mesi nei casi più complessi, informandoti del motivo (art. 12.3 GDPR). Potremmo chiederti informazioni utili a verificare la tua identità.</p>
              </Section>

              <Section id="reclamo" n={12} title="Reclamo all'autorità di controllo">
                <p>Se ritieni che il trattamento violi la normativa, puoi proporre reclamo al Garante per la protezione dei dati personali (art. 77 GDPR) o all'autorità dello Stato membro in cui risiedi, lavori o in cui è avvenuta la presunta violazione, oppure agire in sede giudiziaria (art. 79 GDPR).</p>
                <div className="flex items-start gap-3 rounded-[18px] border border-[#e4eef8] bg-white p-4 text-sm leading-6">
                  <Scale className="mt-0.5 h-5 w-5 shrink-0 text-[#1769d5]" />
                  <p><Strong>Garante per la protezione dei dati personali</Strong><br />Piazza Venezia 11, 00187 Roma · <a className="font-semibold text-[#0b55c6] underline underline-offset-2" href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">www.garanteprivacy.it</a></p>
                </div>
              </Section>

              <Section id="svizzera" n={13} title="Utenti in Svizzera">
                <p>Per le persone che si trovano in Svizzera si applica anche la Legge federale sulla protezione dei dati (LPD) in vigore dal 1° settembre 2023. I diritti descritti nella sezione 11 possono essere esercitati con le stesse modalità. Per i trasferimenti verso gli Stati Uniti valgono le garanzie del Swiss-U.S. Data Privacy Framework o clausole contrattuali riconosciute. È possibile rivolgersi all'Incaricato federale della protezione dei dati e della trasparenza (IFPDT), Berna.</p>
              </Section>

              <Section id="altro" n={14} title="Minori e decisioni automatizzate">
                <p>Il sito e i servizi Totalone sono rivolti a imprese e professionisti e non sono destinati a minori di 18 anni. Non raccogliamo consapevolmente dati di minori.</p>
                <p>Non adottiamo decisioni basate unicamente su trattamenti automatizzati, compresa la profilazione, che producano effetti giuridici o incidano in modo analogo sulla tua persona (art. 22 GDPR).</p>
              </Section>

              <Section id="modifiche" n={15} title="Modifiche all'informativa">
                <p>Possiamo aggiornare questa informativa per adeguarla a modifiche normative o ai trattamenti svolti. La versione in vigore è sempre pubblicata in questa pagina con la data di ultimo aggiornamento; in caso di modifiche sostanziali ne daremo evidenza sul sito.</p>
                <p className="flex items-center gap-2 text-sm font-semibold text-[#557090]"><FileText className="h-4 w-4" /> Ultimo aggiornamento: {titolare.ultimoAggiornamento}</p>
              </Section>
            </article>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}

export default PrivacyPolicyPage;
