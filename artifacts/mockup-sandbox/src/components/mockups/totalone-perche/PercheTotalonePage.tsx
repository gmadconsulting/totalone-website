import { useEffect, type ReactNode } from "react";
import { ArrowDown, ArrowRight, Check, ChevronRight } from "lucide-react";
import { MarketingShell } from "../totalone-site-architecture/_shared/MarketingShell";
import "./PercheTotalonePage.css";

const SEO_TITLE = "Perché Totalone | Il Gestionale per Arredatori e Showroom";
const META_DESCRIPTION =
  "Scopri perché Totalone è diverso dai gestionali tradizionali. Un unico sistema pensato per organizzare vendite, commesse, logistica e post-vendita degli showroom di arredamento.";

type LinkItem = [string, string];

const lifecycle = [
  "CLIENTE",
  "TRATTATIVA",
  "PREVENTIVO",
  "COMMESSA",
  "MAGAZZINO",
  "MONTAGGIO",
  "ASSISTENZA",
];

const ecosystem: { label: string; items: LinkItem[] }[] = [
  {
    label: "VENDITE",
    items: [
      ["CRM", "/__mockup/preview/totalone-crm/CrmProductPage"],
      ["Gestione trattative", "/__mockup/preview/totalone-trattative/GestioneTrattative"],
      ["Preventivi", "/__mockup/preview/totalone-preventivi/PreventiviProductPage"],
    ],
  },
  {
    label: "OPERATIVITÀ",
    items: [
      ["Gestione progetti", "/__mockup/preview/totalone-progetti/ProgettiProductPage"],
      ["Gestione commesse", "/__mockup/preview/totalone-commesse/CommesseProductPage"],
      ["Magazzino e logistica", "/__mockup/preview/totalone-magazzino/MagazzinoProductPage"],
      ["Montaggi", "/__mockup/preview/totalone-montaggi/MontaggiProductPage"],
      ["Assistenza e post-vendita", "/__mockup/preview/totalone-assistenza/AssistenzaPostVenditaProductPage"],
    ],
  },
  {
    label: "CONTROLLO",
    items: [["Controllo e performance", "/controllo-gestione-arredamento/"]],
  },
];

function Eyebrow({ children, tone = "" }: { children: ReactNode; tone?: string }) {
  return <span className={`perche-eyebrow ${tone}`}>{children}</span>;
}

function DemoTrigger({ children, variant = "" }: { children: ReactNode; variant?: string }) {
  const openDemo = () => {
    document.querySelector<HTMLButtonElement>(".to-header-actions .to-button")?.click();
  };

  return (
    <button className={`perche-button ${variant}`} onClick={openDemo}>
      {children}
      <ArrowRight size={15} />
    </button>
  );
}

function SectionHeading({
  eyebrow,
  title,
  children,
  tone = "",
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  tone?: string;
}) {
  return (
    <div className={`perche-heading ${tone}`}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {children && <div className="perche-lead">{children}</div>}
    </div>
  );
}

function ConvergenceVisual() {
  const labels = ["CRM", "PREVENTIVI", "COMMESSE", "MAGAZZINO", "MONTAGGI", "ASSISTENZA"];
  return (
    <div className="perche-convergence" aria-label="Le aree di Totalone convergono in un unico sistema">
      <div className="perche-convergence-lines" aria-hidden="true">
        {labels.map((label) => <span key={label} />)}
      </div>
      <div className="perche-convergence-labels">
        {labels.map((label, index) => (
          <span key={label} className={`perche-convergence-label n${index + 1}`}>{label}</span>
        ))}
      </div>
      <div className="perche-convergence-core">
        <span>UN UNICO</span>
        <strong>TOTALONE</strong>
        <small>un modo condiviso di lavorare</small>
      </div>
    </div>
  );
}

function FragmentedTools() {
  return (
    <div className="perche-fragments" aria-label="Informazioni sparse tra strumenti diversi">
      {["CRM", "EXCEL", "EMAIL", "WHATSAPP", "DOCUMENTI", "CALENDARI"].map((item, index) => (
        <div className={`perche-fragment f${index + 1}`} key={item}>
          <span>{item}</span>
          {index < 5 && <i aria-hidden="true">↘</i>}
        </div>
      ))}
      <p>“Le informazioni esistono. Ma sono sparse.”</p>
    </div>
  );
}

function Lifecycle() {
  return (
    <div className="perche-lifecycle" aria-label="Ciclo di vita del cliente in Totalone">
      {lifecycle.map((item, index) => (
        <div className="perche-lifecycle-item" key={item}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{item}</strong>
          {index < lifecycle.length - 1 && <i aria-hidden="true">→</i>}
        </div>
      ))}
    </div>
  );
}

function Ecosystem() {
  return (
    <div className="perche-ecosystem">
      <div className="perche-ecosystem-center">
        <span>IL LAVORO DELLO SHOWROOM</span>
        <strong>TOTALONE</strong>
      </div>
      <div className="perche-ecosystem-groups">
        {ecosystem.map((group) => (
          <div className="perche-ecosystem-group" key={group.label}>
            <span className="perche-group-label">{group.label}</span>
            {group.items.map(([label, href]) => (
              <a className="perche-ecosystem-link" href={href} key={href}>
                {label}
                <ChevronRight size={14} />
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PercheTotalonePage() {
  useEffect(() => {
    document.title = SEO_TITLE;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = META_DESCRIPTION;
  }, []);

  return (
    <MarketingShell active="Perché Totalone">
      <main className="perche-page" id="top">
        <section className="perche-hero">
          <div className="perche-hero-grid perche-wrap">
            <div className="perche-hero-copy">
              <Eyebrow>PERCHÉ TOTALONE</Eyebrow>
              <h1>Il gestionale che parte dall’arredamento.<br /><span>Non dal software.</span></h1>
              <p>Totalone nasce dal modo in cui lavora davvero uno showroom: clienti, preventivi, commesse, ordini, consegne, montaggi e post-vendita fanno parte dello stesso processo.</p>
              <div className="perche-actions">
                <DemoTrigger>Prenota una demo</DemoTrigger>
                <a className="perche-button outline" href="#idea">Scopri Totalone <ArrowDown size={15} /></a>
              </div>
              <p className="perche-micro">Un unico sistema. Un unico modo di lavorare.</p>
            </div>
            <ConvergenceVisual />
          </div>
        </section>

        <section className="perche-section perche-warm">
          <div className="perche-wrap perche-split">
            <SectionHeading eyebrow="IL PROBLEMA NON È AVERE POCHI STRUMENTI" title="È avere informazioni che non si parlano.">
              <p>Un cliente entra in showroom. Poi arriva un preventivo. Una trattativa. Una commessa. Gli ordini. La merce. Il montaggio. Forse un’assistenza.</p>
              <p>Quando ogni fase vive in un file, una chat o un software diverso, il problema non è solo perdere tempo.</p>
              <p>È perdere il filo.</p>
            </SectionHeading>
            <FragmentedTools />
          </div>
        </section>

        <section className="perche-section perche-deep" id="idea">
          <div className="perche-wrap">
            <SectionHeading eyebrow="UN’IDEA SEMPLICE" title="E se tutto facesse parte dello stesso flusso?" tone="light">
              <p>Totalone collega le diverse fasi del lavoro in un unico sistema.</p>
              <p>Il cliente non scompare quando diventa una trattativa. La trattativa non riparte da zero quando diventa un preventivo. La vendita non si scollega dalla commessa. E la commessa continua attraverso logistica, montaggio e post-vendita.</p>
            </SectionHeading>
            <Lifecycle />
            <p className="perche-closing">Le informazioni avanzano insieme al lavoro.</p>
          </div>
        </section>

        <section className="perche-section perche-vertical">
          <div className="perche-wrap">
            <SectionHeading eyebrow="NATO PER L’ARREDAMENTO" title={<>Non abbiamo adattato un gestionale all’arredamento.<br /><em>Abbiamo fatto il contrario.</em></>} />
            <div className="perche-direction">
              <div className="perche-direction-row muted"><span>NON</span><strong>Software</strong><i>→</i><strong>adattato</strong><i>→</i><strong>arredamento</strong></div>
              <div className="perche-direction-row active"><span>MA</span><strong>Arredamento</strong><i>→</i><strong>processi reali</strong><i>→</i><strong>Totalone</strong></div>
            </div>
            <div className="perche-narrow-copy">
              <p>Totalone è stato costruito partendo dai processi reali di chi vende e gestisce arredamento.</p>
              <p>Per questo parla la lingua del settore: showroom, trattative, preventivi complessi, commesse, prodotti, arrivi, montaggi e assistenze.</p>
              <p>Non devi trasformare il tuo lavoro per farlo entrare nel software. È il software ad essere stato progettato intorno al tuo lavoro.</p>
            </div>
          </div>
        </section>

        <section className="perche-section perche-field">
          <div className="perche-wrap perche-field-grid">
            <div>
              <SectionHeading eyebrow="NATO SUL CAMPO" title="Prima di diventare un software, è stato un problema da risolvere.">
                <p>Totalone nasce dall’esperienza diretta nella gestione di showroom di arredamento.</p>
                <p>Non da un’ipotesi su come dovrebbe funzionare questo settore, ma dalla necessità quotidiana di coordinare clienti, vendite, commesse e attività operative.</p>
                <p>Il prodotto continua a evolversi intorno alle esigenze reali di chi lavora nell’arredamento.</p>
              </SectionHeading>
            </div>
            <blockquote>“Costruito da chi conosce il lavoro,<br /><span>per chi lo fa ogni giorno.</span>”</blockquote>
          </div>
        </section>

        <section className="perche-section perche-source">
          <div className="perche-wrap">
            <SectionHeading eyebrow="UN’UNICA FONTE DI INFORMAZIONI" title="Il dato viene inserito una volta. Poi continua a essere utile.">
              <p>Quando le informazioni sono collegate, ogni reparto non deve ricostruire ciò che è già successo prima.</p>
            </SectionHeading>
            <div className="perche-source-grid">
              <div className="perche-source-chain">
                {["COMMERCIALE", "COMMESSA", "LOGISTICA", "MONTAGGIO", "POST-VENDITA"].map((item, index) => (
                  <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < 4 && <i>↓</i>}</div>
                ))}
              </div>
              <div className="perche-source-aside">
                {["STESSO CLIENTE", "STESSE INFORMAZIONI", "STESSO SISTEMA"].map((item) => <span key={item}>{item}</span>)}
                <p>Il commerciale conosce il cliente. La commessa mantiene il contesto della vendita. La logistica, il montaggio e il post-vendita lavorano sulla stessa storia.</p>
              </div>
            </div>
            <p className="perche-closing blue">Meno passaggi di informazioni. Più continuità.</p>
          </div>
        </section>

        <section className="perche-section perche-shared">
          <div className="perche-wrap">
            <SectionHeading eyebrow="UN METODO CONDIVISO" title={<>Il vero vantaggio non è avere tutto in un software.<br /><em>È far lavorare tutti nello stesso modo.</em></>}>
              <p>Quando ogni persona organizza clienti, attività e commesse con strumenti diversi, la conoscenza rimane nelle persone.</p>
              <p>Totalone crea un processo condiviso: le informazioni diventano accessibili al team e il modo di lavorare non dipende più da file personali o procedure diverse.</p>
            </SectionHeading>
            <div className="perche-pillars">
              {[
                ["01", "CONDIVISO", "Le informazioni importanti non rimangono isolate."],
                ["02", "STRUTTURATO", "Ogni fase segue un processo riconoscibile."],
                ["03", "CONTINUO", "Il lavoro passa alla fase successiva senza ricominciare da zero."],
              ].map(([number, title, body]) => (
                <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="perche-section perche-deep perche-operating">
          <div className="perche-wrap">
            <SectionHeading eyebrow="PIÙ DI UN GESTIONALE" title="Un sistema operativo per il tuo showroom." tone="light">
              <p>Totalone non nasce per risolvere una singola attività. Collega il lavoro commerciale, operativo e gestionale in un unico ambiente.</p>
            </SectionHeading>
            <Ecosystem />
          </div>
        </section>

        <section className="perche-section perche-growth">
          <div className="perche-wrap">
            <SectionHeading eyebrow="DALLO SHOWROOM ALL’AZIENDA" title="Funziona quando sei piccolo. Diventa ancora più importante quando cresci.">
              <p>Più aumentano persone, clienti, commesse e sedi, più diventa difficile affidarsi a informazioni distribuite tra strumenti diversi.</p>
              <p>Totalone crea una struttura condivisa che può accompagnare l’azienda mentre cresce.</p>
            </SectionHeading>
            <div className="perche-growth-line">
              {["1 SHOWROOM", "PIÙ PERSONE", "PIÙ COMMESSE", "PIÙ SEDI", "UN SOLO SISTEMA"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < 4 && <i>→</i>}</div>)}
            </div>
            <p className="perche-closing blue">La complessità cresce. Il modo di lavorare rimane chiaro.</p>
          </div>
        </section>

        <section className="perche-section perche-warm">
          <div className="perche-wrap perche-time-grid">
            <SectionHeading eyebrow="IL TEMPO DEL TEAM" title="Il software dovrebbe togliere lavoro. Non crearne altro.">
              <p>Cercare informazioni. Aggiornare più file. Copiare gli stessi dati. Chiedere continuamente aggiornamenti. Ricostruire cosa è successo.</p>
              <p>Sono piccoli passaggi che, ripetuti ogni giorno da più persone, diventano ore di lavoro.</p>
            </SectionHeading>
            <div className="perche-time-composition">
              <span>TEMPO SPESO A:</span>
              {["cercare", "copiare", "aggiornare", "ricostruire", "chiedere"].map((item) => <strong key={item}>{item}</strong>)}
              <i>↓</i>
              <b>TEMPO DA RESTITUIRE AL TEAM</b>
              <a href="#final-cta">Calcola il valore del tempo che potresti recuperare <ArrowRight size={14} /></a>
            </div>
          </div>
        </section>

        <section className="perche-section perche-compare">
          <div className="perche-wrap">
            <SectionHeading eyebrow="DUE MODI DI LAVORARE" title="Stesse attività. Un’organizzazione completamente diversa." />
            <div className="perche-compare-grid">
              <div><span>STRUMENTI SEPARATI</span>{["Clienti in un sistema", "Preventivi in un altro", "Excel per il controllo", "Messaggi per gli aggiornamenti", "Documenti nelle cartelle", "Informazioni da ricostruire"].map((item) => <p key={item}><i>—</i>{item}</p>)}</div>
              <div className="positive"><span>TOTALONE</span>{["Un unico cliente", "Un unico flusso", "Informazioni collegate", "Processi condivisi", "Storia accessibile", "Controllo centralizzato"].map((item) => <p key={item}><Check size={15} />{item}</p>)}</div>
            </div>
            <p className="perche-compare-close">Non significa semplicemente avere meno software.<br /><strong>Significa avere meno frammentazione.</strong></p>
          </div>
        </section>

        <section className="perche-section perche-principles">
          <div className="perche-wrap">
            <SectionHeading eyebrow="PERCHÉ TOTALONE" title="Tre principi. Un solo sistema." tone="light" />
            <div className="perche-principles-grid">
              {[
                ["01", "VERTICALE", "Pensato intorno ai processi reali del settore arredamento."],
                ["02", "COLLEGATO", "Vendita, operatività e controllo fanno parte dello stesso flusso."],
                ["03", "CONDIVISO", "Persone e showroom lavorano sulle stesse informazioni."],
              ].map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}
            </div>
          </div>
        </section>

        <section className="perche-section perche-explore" id="ecosystem">
          <div className="perche-wrap">
            <SectionHeading eyebrow="SCOPRI TOTALONE" title="Un sistema. Tutto il lavoro dello showroom.">
              <p>Esplora le diverse aree di Totalone e scopri come ogni funzione si collega alle altre.</p>
            </SectionHeading>
            <Ecosystem />
          </div>
        </section>

        <section className="perche-statement">
          <div className="perche-wrap">
            <p>Il tuo showroom non lavora per moduli.<br /><span>Totalone nemmeno.</span></p>
            <small>Dal primo contatto con il cliente al post-vendita, ogni fase rimane parte dello stesso processo.</small>
          </div>
        </section>

        <section className="perche-final" id="final-cta">
          <div className="perche-wrap perche-final-inner">
            <div>
              <Eyebrow>SCOPRI TOTALONE</Eyebrow>
              <h2>Guarda cosa cambia quando tutto lavora insieme.</h2>
              <p>Prenota una demo e scopri come Totalone può adattarsi ai processi del tuo showroom.</p>
              <div className="perche-actions"><DemoTrigger variant="light">Prenota una demo</DemoTrigger><a className="perche-button outline" href="#ecosystem">Esplora il prodotto <ArrowRight size={15} /></a></div>
              <small>Una demo costruita sul modo in cui lavora la tua azienda.</small>
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}