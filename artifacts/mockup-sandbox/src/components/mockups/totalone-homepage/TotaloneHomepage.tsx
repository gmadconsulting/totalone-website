import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Archive,
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  ChevronDown,
  ClipboardList,
  FileText,
  Hammer,
  Handshake,
  Headphones,
  ListChecks,
  MapPin,
  Receipt,
  Route,
  Sparkles,
  Store,
  Truck,
  UserPlus,
  UsersRound,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { MarketingShell, openDemo } from "../totalone-site-architecture/_shared/MarketingShell";
import { Reveal, SpotlightCard, Stagger, StaggerItem, WordReveal, tpEase, useLoopSteps } from "@/components/totalone/motion-kit";
import { AppWindow, TpAvatar, TpChip, uiFont } from "@/components/totalone/app-ui";
import {
  ArriviScreen,
  AssistenzeScreen,
  ConversioneFlow,
  HeroDashboardScreen,
  IngressiScreen,
  MagazzinoScreen,
  MontaggiScreen,
  PerformanceScreen,
  PipelineScreen,
  PreventivatoreScreen,
  PreventiviListScreen,
  RapportiniScreen,
  SchedinaCliente,
  TasksScreen,
  VenditeScreen,
} from "@/components/totalone/app-screens";
import { routes } from "@/components/totalone/site/siteRoutes";
import { useSeo } from "@/components/totalone/site/useSeo";

const SEO = {
  title: "Gestionale per negozi di arredamento e mobilifici | Totalone",
  description:
    "Totalone è il gestionale per negozi di arredamento, showroom e mobilifici: CRM, preventivi di cucine e arredi, commesse, magazzino, montaggi e assistenza in un unico sistema.",
  jsonLd: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.thetotalone.com/#organization",
        name: "Totalone",
        url: "https://www.thetotalone.com/",
      },
      {
        "@type": "WebSite",
        "@id": "https://www.thetotalone.com/#website",
        url: "https://www.thetotalone.com/",
        name: "Totalone",
        inLanguage: "it-IT",
        publisher: { "@id": "https://www.thetotalone.com/#organization" },
      },
      {
        "@type": "SoftwareApplication",
        name: "Totalone",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: "https://www.thetotalone.com/",
        description:
          "Gestionale per negozi di arredamento, showroom e mobilifici: CRM, preventivi, commesse, magazzino, montaggi e assistenza.",
        publisher: { "@id": "https://www.thetotalone.com/#organization" },
      },
    ],
  },
};

const focusBlue = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1769d5]";

/* ------------------------------------------------------------------ */
/* Contenuti                                                           */
/* ------------------------------------------------------------------ */

/** Le tappe della timeline "una sola commessa", nell'ordine del glossario. */
type FlowStep = {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  where: string;
  links: { label: string; href: string }[];
  icon: LucideIcon;
  screen: (props: { className?: string }) => ReactNode;
  nav: string;
  tab: string;
  auto?: boolean;
  ownWindow?: boolean;
};

const flowSteps: FlowStep[] = [
  {
    eyebrow: "Ingresso",
    title: "Il cliente entra in showroom.",
    body: "Chi accoglie registra l'ingresso in pochi secondi: showroom, orario, venditore e cosa sta cercando.",
    bullets: ["Ingresso con showroom, orario e venditore", "Note di interesse pronte per il follow-up", "Un clic per trasformarlo in lead"],
    where: "CRM › Ingressi showroom",
    links: [{ label: "Scopri il CRM", href: routes.crm }],
    icon: Store,
    screen: IngressiScreen,
    nav: "crm.ingressi",
    tab: "Ingressi",
  },
  {
    eyebrow: "Lead",
    title: "Il lead avanza nella pipeline.",
    body: "Contatto iniziale, qualifica, appuntamento, preventivo: ogni lead ha la sua colonna, con il valore sempre visibile al team.",
    bullets: ["Una colonna per ogni fase", "Valore del lead e documenti a colpo d'occhio", "Smart list per filtrare il lavoro"],
    where: "CRM › Pipeline",
    links: [{ label: "Scopri il CRM", href: routes.crm }],
    icon: UserPlus,
    screen: PipelineScreen,
    nav: "crm.pipeline",
    tab: "Pipeline CRM",
  },
  {
    eyebrow: "Preventivo",
    title: "Si prepara il preventivo.",
    body: "Cucine, sistemi, arredamento e montaggio nello stesso preventivatore, con totali, IVA e versioni sempre allineati.",
    bullets: ["Sezioni per cucine, sistemi e arredamento", "IVA e versioni del preventivo", "Anteprima PDF impaginata con il tuo marchio"],
    where: "Preventivi › Preventivatore",
    links: [{ label: "Scopri i Preventivi", href: routes.preventivi }],
    icon: FileText,
    screen: PreventivatoreScreen,
    nav: "preventivi",
    tab: "Preventivatore",
  },
  {
    eyebrow: "Conversione automatica",
    title: "Il cliente accetta. Trattativa e Schedina cliente nascono da sole.",
    body: "Quando il preventivo viene convertito, Totalone crea in automatico la trattativa, con preventivato, venduto, acconti e saldo, e la Schedina cliente: il fascicolo della commessa, con tutti i prodotti del preventivo.",
    bullets: ["Il preventivo passa a Convertito", "La trattativa è pronta per acconti e saldo", "La Schedina cliente raccoglie prodotti, margini, fattura e ordine"],
    where: "Preventivi › Convertito",
    links: [
      { label: "Scopri la Schedina cliente", href: routes.commesse },
      { label: "Come si segue la trattativa", href: routes.trattative },
    ],
    icon: Sparkles,
    screen: ConversioneFlow,
    nav: "preventivi",
    tab: "Preventivi",
    auto: true,
    ownWindow: true,
  },
  {
    eyebrow: "Ordini e arrivi",
    title: "Sai cosa arriva, e dove si trova.",
    body: "Gli arrivi previsti si riempiono sul calendario. Quando la merce entra in magazzino, colli, ubicazione e stato restano collegati al cliente.",
    bullets: ["Arrivi previsti sul calendario", "Colli, ubicazione e stato per prodotto", "Storico DDT e distinte sempre a portata"],
    where: "Magazzino › Magazzino",
    links: [{ label: "Scopri Magazzino e logistica", href: routes.magazzino }],
    icon: Archive,
    screen: MagazzinoScreen,
    nav: "magazzino.magazzino",
    tab: "Magazzino",
  },
  {
    eyebrow: "Montaggio",
    title: "Dal magazzino a casa del cliente.",
    body: "I montaggi vanno in calendario, con il cliente e la squadra, e si leggono anche sulla mappa. A fine lavoro il rapportino, con note e foto, chiude la giornata.",
    bullets: ["Vista calendario, mappa e prodotti", "Filtro tra i miei montaggi e tutti", "Rapportino di fine lavoro pronto da stampare"],
    where: "Montaggi › Montaggi",
    links: [{ label: "Scopri i Montaggi", href: routes.montaggi }],
    icon: Hammer,
    screen: MontaggiScreen,
    nav: "montaggi.montaggi",
    tab: "Montaggi",
  },
  {
    eyebrow: "Assistenza",
    title: "La relazione continua.",
    body: "Le richieste dopo la consegna diventano assistenze legate a cliente e prodotti, con lo stato sempre leggibile: da gestire, in gestione, risolta.",
    bullets: ["Assistenze per cliente e per prodotto", "Avanzamento e stato a colpo d'occhio", "Nessuna segnalazione persa nel rumore"],
    where: "Assistenze",
    links: [{ label: "Scopri Assistenza e post-vendita", href: routes.assistenza }],
    icon: Wrench,
    screen: AssistenzeScreen,
    nav: "assistenze",
    tab: "Assistenze",
  },
];

/** Aree prodotto: schermate complementari a quelle della timeline. */
type Area = {
  id: string;
  label: string;
  title: string;
  body: string;
  icon: LucideIcon;
  href: string;
  linkLabel: string;
  nav: string;
  tab: string;
  screen: () => ReactNode;
};

const areas: Area[] = [
  {
    id: "preventivi",
    label: "Preventivi",
    title: "Tutti i preventivi, con il loro stato.",
    body: "Versioni, totale e stato di ogni proposta in un elenco unico: sai cosa è ancora in bozza e cosa è stato convertito.",
    icon: FileText,
    href: routes.preventivi,
    linkLabel: "Scopri i Preventivi",
    nav: "preventivi",
    tab: "Preventivi",
    screen: PreventiviListScreen,
  },
  {
    id: "trattative",
    label: "Gestione trattative",
    title: "Preventivato, venduto, incassato.",
    body: "Ogni trattativa nasce da un preventivo convertito: acconti, saldo e stato, da In trattativa a Finalizzato, per cliente, venditore e showroom.",
    icon: Handshake,
    href: routes.trattative,
    linkLabel: "Scopri la Gestione trattative",
    nav: "totalone",
    tab: "Totalone showroom",
    screen: VenditeScreen,
  },
  {
    id: "commesse",
    label: "Gestione commesse",
    title: "La Schedina cliente è il fascicolo della commessa.",
    body: "Prodotti, margini, fattura, ordine, colli, documenti e note in un'unica scheda, condivisa da vendita, ufficio e montaggio.",
    icon: ClipboardList,
    href: routes.commesse,
    linkLabel: "Scopri la Gestione commesse",
    nav: "schedine",
    tab: "Schedina Cliente",
    screen: () => <SchedinaCliente rows={3} />,
  },
  {
    id: "progetti",
    label: "Gestione progetti",
    title: "Il lavoro da fare, con un responsabile.",
    body: "Task, priorità e scadenze nello stesso spazio, così ogni attività ha un contesto e una persona che se ne occupa.",
    icon: ListChecks,
    href: routes.progetti,
    linkLabel: "Scopri la Gestione progetti",
    nav: "tasks.task",
    tab: "Tasks",
    screen: TasksScreen,
  },
  {
    id: "arrivi",
    label: "Magazzino e logistica",
    title: "Gli arrivi del mese, prodotto per prodotto.",
    body: "Ogni arrivo previsto porta con sé il prodotto e il cliente a cui appartiene, così la logistica segue il venduto.",
    icon: Truck,
    href: routes.magazzino,
    linkLabel: "Scopri Magazzino e logistica",
    nav: "magazzino.arrivi",
    tab: "Arrivi previsti",
    screen: ArriviScreen,
  },
  {
    id: "rapportini",
    label: "Montaggi",
    title: "Quello che è stato fatto resta scritto.",
    body: "Giornate di lavoro con note e foto e un rapportino di fine lavoro: l'ufficio sa com'è andata senza dover chiedere.",
    icon: Route,
    href: routes.montaggi,
    linkLabel: "Scopri i Montaggi",
    nav: "montaggi.rapportini",
    tab: "Rapportini",
    screen: RapportiniScreen,
  },
];

const heroTrustSignals = [
  ["PER L'ARREDAMENTO", "Negozi, showroom e gruppi con più sedi."],
  ["DALL'INGRESSO ALL'ASSISTENZA", "Vendita, consegna e montaggio nello stesso sistema."],
  ["IN MANO TUA", "Utenti, sedi e configurazioni li gestisci tu."],
] as const;

/* ------------------------------------------------------------------ */
/* Primitive                                                           */
/* ------------------------------------------------------------------ */

function Button({ children, onClick, light = false }: { children: ReactNode; onClick: () => void; light?: boolean }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-bold transition-colors duration-200 ${
        light
          ? "bg-white text-[#0b4fbd] shadow-[0_10px_28px_rgba(4,43,102,.22)] hover:bg-[#e9f3ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          : "bg-[#cf4a2b] text-white shadow-[0_10px_24px_rgba(173,57,35,.22)] hover:bg-[#b93f23] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cf4a2b]"
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </motion.button>
  );
}

function Tag({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "coral" | "amber" | "dark" }) {
  const tones = {
    blue: "bg-[#dcecff] text-[#0b55c6]",
    coral: "bg-[#ffdcd2] text-[#a33a22]",
    amber: "bg-[#fff2dd] text-[#8a4f0f]",
    dark: "bg-[#2b75cb] text-[#e8f5ff]",
  };
  return (
    <Reveal y={10}>
      <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${tones[tone]}`}>{children}</span>
    </Reveal>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className={`group inline-flex items-center gap-1.5 text-sm font-bold text-[#0b55c6] hover:text-[#b93f23] ${focusBlue}`}>
      {children} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* HERO                                                                */
/* ------------------------------------------------------------------ */

function HeroProduct() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.88, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, 0]);

  return (
    <figure className="mx-auto mt-16 max-w-[1120px] sm:mt-20">
      <div ref={ref} className="relative [perspective:1600px]">
        <motion.div style={{ rotateX, scale, y, transformOrigin: "center top" }} className="relative">
          <HeroDashboardScreen className="h-[430px] sm:h-[500px] lg:h-[560px]" />
          <div aria-hidden="true">
            <FloatingNote className="-left-6 top-24 hidden lg:flex" delay={1.2} float={10}>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#fff2dd] text-[#8a4f0f]"><UserPlus className="h-4 w-4" /></span>
              <span><b className="block text-[12px] text-[#102744]">Nuovo ingresso</b><span className="text-[11px] text-[#557090]">Casa Bianchi · assegnato a Giulia Ferri</span></span>
            </FloatingNote>
            <FloatingNote className="-right-8 bottom-28 hidden lg:flex" delay={1.6} float={-12}>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#D1FAE5] text-[#047857]"><Hammer className="h-4 w-4" /></span>
              <span><b className="block text-[12px] text-[#102744]">Montaggio confermato</b><span className="text-[11px] text-[#557090]">Casa Bianchi · Squadra A</span></span>
            </FloatingNote>
          </div>
        </motion.div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-[10%] -bottom-10 h-24 rounded-[100%] bg-[#04214f]/40 blur-3xl" />
      </div>
      <figcaption className="relative mt-14 text-center text-xs font-semibold text-[#c9e2fb]">Schermate dimostrative, dati di esempio.</figcaption>
    </figure>
  );
}

function FloatingNote({ children, className, delay, float }: { children: ReactNode; className: string; delay: number; float: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: reduce ? 0 : [0, float, 0] }}
      transition={{ opacity: { delay, duration: 0.6 }, scale: { delay, duration: 0.6, ease: tpEase }, y: { delay, duration: 6, repeat: Infinity, ease: "easeInOut" } }}
      className={`absolute z-20 items-center gap-3 rounded-[18px] bg-white/95 py-3 pl-3 pr-5 shadow-[0_18px_44px_rgba(4,30,80,.28)] ring-1 ring-white backdrop-blur ${className}`}
      style={uiFont}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* PROBLEMA → SOLUZIONE — gli strumenti sparsi convergono in Totalone  */
/* ------------------------------------------------------------------ */

const scattered = [
  { label: "Excel", x: -300, y: -120, r: -8 },
  { label: "WhatsApp", x: 260, y: -150, r: 6 },
  { label: "Email", x: -340, y: 90, r: 5 },
  { label: "Agenda", x: 320, y: 110, r: -6 },
  { label: "Post-it", x: -120, y: 190, r: 9 },
  { label: "Memoria", x: 120, y: -210, r: -4 },
  { label: "Telefonate", x: 150, y: 200, r: 4 },
  { label: "Cartelle", x: -180, y: -230, r: -10 },
];

function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const coreScale = useTransform(p, [0.35, 0.75], [0.6, 1]);
  const coreOpacity = useTransform(p, [0.35, 0.6], [0, 1]);
  const textA = useTransform(p, [0, 0.3, 0.45], [1, 1, 0]);
  const textB = useTransform(p, [0.55, 0.75], [0, 1]);

  return (
    <section ref={ref} className="relative h-[220vh] bg-[#fffaf7]" id="come-funziona" aria-labelledby="problema-title">
      <div className="sticky top-0 flex h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 pb-4 pt-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,#ffe7df_0%,transparent_55%)]" />
        <div aria-hidden="true" className="relative grid h-[min(300px,36vh)] w-full max-w-[1000px] place-items-center">
          {scattered.map((c, i) => (
            <ScatteredChip key={c.label} chip={c} progress={p} index={i} />
          ))}
          <motion.div style={{ scale: coreScale, opacity: coreOpacity }} className="relative z-10 w-[min(300px,80vw)] rounded-[26px] bg-white p-4 shadow-[0_30px_80px_rgba(16,39,68,.18)] ring-1 ring-[#cfe1f4]">
            <div className="flex items-center gap-2.5 text-[#102744]">
              <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[#102744] text-white"><span className="h-3.5 w-3.5 rounded-full border-2 border-current" /></span>
              <span className="text-[18px] font-bold tracking-[-0.06em]">totalone</span>
              <span className="ml-auto"><TpChip kind="final">Tutto collegato</TpChip></span>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-1.5" style={uiFont}>
              {[UsersRound, FileText, ClipboardList, Truck, Hammer, Headphones, BarChart3, ListChecks].map((Icon, i) => (
                <div key={i} className="grid aspect-square place-items-center rounded-[12px] bg-[#f4f9ff] text-[#1769d5]">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="relative mt-6 h-[250px] w-full max-w-3xl text-center sm:h-[260px]">
          <motion.div style={{ opacity: textA }} className="absolute inset-0">
            <span className="inline-flex rounded-full bg-[#ffdcd2] px-3 py-1.5 text-xs font-bold text-[#a33a22]">IL PROBLEMA</span>
            <h2 id="problema-title" className="mx-auto mt-4 max-w-2xl text-4xl font-bold leading-[.97] tracking-[-0.065em] text-[#102744] sm:text-6xl">La tua azienda non può dipendere dalla memoria di una persona.</h2>
          </motion.div>
          <motion.div style={{ opacity: textB }} className="absolute inset-0">
            <span className="inline-flex rounded-full bg-[#dcecff] px-3 py-1.5 text-xs font-bold text-[#0b55c6]">LA SOLUZIONE</span>
            <p className="mx-auto mt-4 max-w-2xl text-4xl font-bold leading-[.97] tracking-[-0.065em] text-[#102744] sm:text-6xl">Un solo posto. Lo stesso modo di lavorare.</p>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#557090]">Quando le informazioni sono sparse, ogni passaggio chiede una rincorsa. Con Totalone appartengono all'azienda, non alle singole persone, e il lavoro continua anche quando cambiano ruoli e giornate.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ScatteredChip({ chip, progress, index }: { chip: (typeof scattered)[number]; progress: MotionValue<number>; index: number }) {
  const [vw, setVw] = useState(1200);
  const [vh, setVh] = useState(900);
  const reduce = useReducedMotion();
  useEffect(() => {
    const update = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const k = vw < 640 ? 0.45 : 1;
  const ky = Math.min(300, vh * 0.36) / 420;
  const x = useTransform(progress, [0, 0.55], [chip.x * k, 0]);
  const y = useTransform(progress, [0, 0.55], [chip.y * ky, 0]);
  const rotate = useTransform(progress, [0, 0.55], [chip.r, 0]);
  const opacity = useTransform(progress, [0.4, 0.58], [1, 0]);
  const scale = useTransform(progress, [0, 0.55], [1, 0.5]);
  return (
    <motion.div style={{ x, y, rotate, opacity, scale }} className="absolute z-0">
      <motion.span
        animate={reduce ? undefined : { y: [0, index % 2 ? 8 : -8, 0] }}
        transition={{ duration: 4 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
        className="inline-flex rounded-full border border-[#f1c2b6] bg-white px-4 py-2.5 text-sm font-semibold text-[#a33a22] shadow-[0_10px_24px_rgba(195,77,53,.12)]"
      >
        {chip.label}
      </motion.span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* PER CHI — da uno showroom a un gruppo                               */
/* ------------------------------------------------------------------ */

function PerChiSection() {
  const stages = [
    ["01", "1 showroom", "Un linguaggio comune per tutto il team, dal primo giorno.", 1],
    ["02", "Team in crescita", "Più persone, responsabilità più leggibili.", 3],
    ["03", "Più showroom", "Lo stesso modo di lavorare in ogni punto vendita.", 6],
    ["04", "Gruppo", "Una visione condivisa mentre l'azienda si allarga.", 12],
  ] as const;
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(120deg,#082652,#0b4fae)] py-24 text-white sm:py-32" id="per-chi" aria-labelledby="per-chi-title">
      <motion.div aria-hidden="true" className="absolute -right-32 top-10 h-[500px] w-[500px] rounded-full bg-[#1387ee]/30 blur-3xl" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_.75fr] lg:items-end">
          <div>
            <Tag tone="dark">PER CHI</Tag>
            <h2 id="per-chi-title" className="mt-6 max-w-4xl text-5xl font-bold leading-[.94] tracking-[-0.065em] sm:text-7xl">
              <WordReveal text="Per chi vende arredamento." />
              <br />
              <WordReveal text="Da uno showroom a un gruppo." className="text-[#9fe0ff]" delay={0.2} />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md text-base leading-7 text-[#d5ebff]">Vendere arredamento vuol dire seguire progetti che durano mesi: misure, versioni, forniture, consegne, montaggi. Totalone segue questo lavoro, con uno showroom come con dieci.</p>
          </Reveal>
        </div>
        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.1}>
          {stages.map(([num, title, body, count]) => (
            <StaggerItem key={num}>
              <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className="group h-full rounded-[28px] border border-white/15 bg-white/[0.07] p-7 backdrop-blur-sm transition-colors hover:bg-white/[0.12]">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold text-[#9fe0ff]">{num}</span>
                  <div className="grid grid-cols-4 gap-1" aria-hidden="true">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.span key={i} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.04, type: "spring", stiffness: 400, damping: 18 }} className={`h-2 w-2 rounded-[3px] ${i < count ? "bg-[#9fe0ff]" : "bg-white/10"}`} />
                    ))}
                  </div>
                </div>
                <h3 className="mt-12 text-2xl font-bold tracking-[-0.04em]">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#d5ebff]">{body}</p>
                <Building2 aria-hidden="true" className="mt-6 h-5 w-5 text-white/30 transition-colors group-hover:text-[#9fe0ff]" />
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* UNA SOLA COMMESSA — timeline verticale illustrata                   */
/* ------------------------------------------------------------------ */

const panelTones = [
  "bg-[radial-gradient(circle_at_20%_10%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#dcecff,#c9e1ff)]",
  "bg-[radial-gradient(circle_at_80%_10%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#ffe9e1,#ffd9cc)]",
  "bg-[radial-gradient(circle_at_20%_90%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#fff2dd,#ffe4b8)]",
  "bg-[radial-gradient(circle_at_80%_90%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#e3f6ec,#cdeedd)]",
];

function CommessaTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 55%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="relative overflow-hidden bg-[#f4f9ff] py-24 sm:py-32" id="flusso" aria-labelledby="flusso-title">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Tag tone="amber">LA COMMESSA</Tag>
          <h2 id="flusso-title" className="mt-6 text-5xl font-bold leading-[.95] tracking-[-0.065em] text-[#102744] sm:text-7xl">
            <WordReveal text="Una sola commessa." />
            <br />
            <WordReveal text="Tutta la sua storia." className="text-[#0b55c6]" delay={0.2} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#557090]">Dal cliente che entra in showroom all'ultima assistenza: segui una vendita di Casa Bianchi attraverso Totalone, schermata per schermata.</p>
          </Reveal>
        </div>

        {/* Indice delle tappe */}
        <Stagger className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-2" gap={0.04}>
          {flowSteps.map((s, i) => (
            <StaggerItem key={s.eyebrow}>
              <a
                href={`#flusso-${i + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(`flusso-${i + 1}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className={`group inline-flex items-center gap-2 rounded-full border border-[#cfe1f4] bg-white px-3.5 py-2 text-xs font-bold text-[#245b96] transition-all hover:-translate-y-0.5 hover:border-[#1769d5] hover:shadow-[0_8px_20px_rgba(23,105,213,.12)] ${focusBlue}`}
              >
                <span className="font-mono text-[10px] text-[#557090]">0{i + 1}</span>
                <s.icon aria-hidden="true" className="h-3.5 w-3.5 text-[#f36b4d]" />
                {s.eyebrow}
              </a>
            </StaggerItem>
          ))}
        </Stagger>

        <div ref={ref} className="relative mt-16 sm:mt-24">
          <div aria-hidden="true" className="absolute bottom-0 left-[19px] top-0 w-[2px] rounded-full bg-[#d6e6f6] lg:left-1/2 lg:-translate-x-1/2">
            <motion.div style={{ scaleY: fill }} className="h-full w-full origin-top rounded-full bg-[linear-gradient(#1769d5,#f36b4d)]" />
          </div>
          {flowSteps.map((s, i) => (
            <TimelineStep key={s.eyebrow} step={s} index={i} />
          ))}
        </div>
        <p className="mt-2 text-center text-xs font-semibold text-[#557090]">Schermate dimostrative, dati di esempio.</p>

        <Reveal y={30}>
          <div className="relative mx-auto mt-10 max-w-3xl rounded-[32px] bg-white p-8 text-center shadow-[0_24px_60px_rgba(16,39,68,.08)] ring-1 ring-[#e4eef8] sm:p-12">
            <span aria-hidden="true" className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#ffdcd2] text-[#a33a22]"><Check className="h-5 w-5" /></span>
            <h3 className="mt-5 text-3xl font-bold leading-[1] tracking-[-0.055em] text-[#102744] sm:text-5xl">Un solo filo, dall'ingresso all'assistenza.</h3>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#557090]">Ogni persona del team lavora sulla stessa vendita, senza ricostruire nulla. Ti mostriamo il flusso partendo da una tua commessa.</p>
            <div className="mt-7 flex justify-center"><Button onClick={openDemo}>Prenota una demo</Button></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TimelineStep({ step, index }: { step: FlowStep; index: number }) {
  const flip = index % 2 === 1;
  const nodeRef = useRef<HTMLDivElement>(null);
  const reached = useInView(nodeRef, { once: true, margin: "0px 0px -45% 0px" });
  const Screen = step.screen;
  const Icon = step.icon;
  const auto = !!step.auto;

  return (
    <div id={`flusso-${index + 1}`} className="relative grid items-center gap-8 py-12 pl-14 sm:py-16 lg:grid-cols-2 lg:gap-24 lg:pl-0">
      {/* Nodo sulla linea */}
      <div ref={nodeRef} aria-hidden="true" className="absolute left-0 top-12 z-10 sm:top-16 lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
        <motion.div
          animate={reached ? { scale: 1, backgroundColor: auto ? "#7c3aed" : "#1769d5", color: "#ffffff" } : { scale: 0.85, backgroundColor: "#ffffff", color: "#557090" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative grid h-10 w-10 place-items-center rounded-full shadow-[0_0_0_6px_#f4f9ff] ring-1 ring-[#cfe1f4]"
        >
          <Icon className="h-4 w-4" />
          {reached && <motion.span className="absolute inset-0 rounded-full border-2 border-[#1769d5]" initial={{ scale: 1, opacity: 0.6 }} animate={{ scale: 1.9, opacity: 0 }} transition={{ duration: 1.2 }} />}
        </motion.div>
      </div>

      <Reveal className={flip ? "lg:order-2" : ""}>
        <div className="max-w-md">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="font-mono text-5xl font-bold tracking-[-0.06em] text-[#d6e6f6] sm:text-6xl">0{index + 1}</span>
            {auto && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f3e8ff] px-3 py-1.5 text-[11px] font-bold text-[#6d28d9]">
                <Sparkles aria-hidden="true" className="h-3.5 w-3.5" /> Automatico
              </span>
            )}
          </div>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-[#a33a22]">{step.eyebrow}</p>
          <h3 className="mt-3 text-3xl font-bold leading-[1.02] tracking-[-0.055em] text-[#102744] sm:text-[2.6rem]">{step.title}</h3>
          <p className="mt-4 text-base leading-7 text-[#557090]">{step.body}</p>
          <ul className="mt-6 space-y-2.5">
            {step.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm font-semibold text-[#245b96]">
                <span aria-hidden="true" className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#dcecff] text-[#1769d5]"><Check className="h-3 w-3" /></span>
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#cfe1f4] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#557090]">
              <Route aria-hidden="true" className="h-3.5 w-3.5 text-[#1769d5]" /> {step.where}
            </span>
            {step.links.map((l) => (
              <TextLink key={l.href} href={l.href}>{l.label}</TextLink>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal y={40} delay={0.08} className={flip ? "lg:order-1" : ""}>
        <div className={`relative rounded-[36px] p-3 sm:p-5 ${panelTones[index % panelTones.length]}`}>
          {step.ownWindow ? (
            <div role="img" aria-label="Schermate dimostrative: il preventivo convertito crea la trattativa e la Schedina cliente">
              <div aria-hidden="true"><Screen /></div>
            </div>
          ) : (
            <AppWindow active={step.nav} title={step.tab} className="h-[400px] sm:h-[460px]">
              <Screen />
            </AppWindow>
          )}
        </div>
      </Reveal>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* AREE PRODOTTO — tab con autoplay, schermate complementari           */
/* ------------------------------------------------------------------ */

function AreasSection() {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20%" });
  const reduce = useReducedMotion();
  const area = areas[active];
  const Screen = area.screen;
  const ActiveIcon = area.icon;
  const paused = hover || !inView || !!reduce;

  return (
    <section className="bg-[#fbfdff] py-24 sm:py-32" id="aree" aria-labelledby="aree-title">
      <div ref={ref} className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Tag>DENTRO IL PRODOTTO</Tag>
            <h2 id="aree-title" className="mt-6 max-w-3xl text-5xl font-bold leading-[.95] tracking-[-0.065em] text-[#102744] sm:text-7xl"><WordReveal text="Ogni area ha il suo lavoro." /></h2>
          </div>
          <Reveal delay={0.1}><p className="max-w-sm text-sm leading-6 text-[#557090]">Oltre al flusso, le viste che il team usa ogni giorno. Ogni area ha una pagina dedicata che la racconta nel dettaglio.</p></Reveal>
        </div>

        <div className="-mx-5 mt-10 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0">
          <div className="flex w-max gap-2 rounded-full bg-[#eef5fd] p-1.5" role="tablist" aria-label="Aree di Totalone">
            {areas.map((a, i) => {
              const Icon = a.icon;
              const on = i === active;
              return (
                <button
                  key={a.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="aree-panel"
                  onClick={() => setActive(i)}
                  className={`relative inline-flex items-center gap-2 overflow-hidden rounded-full px-4 py-2.5 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769d5] ${on ? "text-[#0b55c6]" : "text-[#557090] hover:text-[#0b55c6]"}`}
                >
                  {on && <motion.span layoutId="area-pill" className="absolute inset-0 rounded-full bg-white shadow-[0_2px_10px_rgba(16,39,68,.10)]" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                  <Icon aria-hidden="true" className="relative h-4 w-4" strokeWidth={1.9} />
                  <span className="relative whitespace-nowrap">{a.label}</span>
                  {on && !reduce && (
                    <span
                      key={`${a.id}-bar`}
                      aria-hidden="true"
                      onAnimationEnd={() => setActive((v) => (v + 1) % areas.length)}
                      className="absolute bottom-1 left-4 right-4 h-[2px] origin-left rounded-full bg-[#1769d5]/70 [animation:tp-progress_7s_linear_forwards]"
                      style={{ animationPlayState: paused ? "paused" : "running" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div id="aree-panel" role="tabpanel" className="mt-8 grid items-center gap-10 lg:grid-cols-[.4fr_.6fr] lg:gap-14" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocus={() => setHover(true)} onBlur={() => setHover(false)}>
          <AnimatePresence mode="wait">
            <motion.div key={area.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease: tpEase }}>
              <div aria-hidden="true" className="mb-6 grid h-12 w-12 place-items-center rounded-[16px] bg-[#ffdcd2] text-[#a33a22]"><ActiveIcon className="h-5 w-5" /></div>
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#0b55c6]">{area.label}</p>
              <h3 className="mt-4 max-w-xl text-4xl font-bold leading-[1] tracking-[-0.06em] text-[#102744] sm:text-5xl">{area.title}</h3>
              <p className="mt-5 max-w-md text-base leading-7 text-[#557090]">{area.body}</p>
              <div className="mt-8"><TextLink href={area.href}>{area.linkLabel}</TextLink></div>
            </motion.div>
          </AnimatePresence>
          <div className="relative">
            <div aria-hidden="true" className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[linear-gradient(135deg,#dcecff,#fff2ea)]" />
            <AppWindow active={area.nav} title={area.tab} className="relative h-[400px] sm:h-[440px]">
              <AnimatePresence initial={false}>
                <motion.div key={area.id} className="absolute inset-3" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.01 }} transition={{ duration: 0.4, ease: tpEase }}>
                  <Screen />
                </motion.div>
              </AnimatePresence>
            </AppWindow>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CONTROLLO                                                           */
/* ------------------------------------------------------------------ */

function ControlSection() {
  return (
    <section className="overflow-hidden bg-[#eff7ff] py-24 sm:py-32" aria-labelledby="controllo-title">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:gap-16">
          <div>
            <Tag>CONTROLLO DEL BUSINESS</Tag>
            <h2 id="controllo-title" className="mt-6 max-w-xl text-5xl font-bold leading-[.94] tracking-[-0.065em] text-[#102744] sm:text-6xl"><WordReveal text="Capire cosa sta succedendo, prima di decidere." /></h2>
            <Reveal delay={0.1}><p className="mt-7 max-w-lg text-base leading-7 text-[#557090]">Vendite, commesse, pagamenti, costi e marginalità letti insieme, per showroom e per venditore. Un quadro più chiaro per intervenire dove serve.</p></Reveal>
            <Stagger className="mt-8 flex flex-wrap gap-2" gap={0.05}>
              {["Vendite", "Commesse", "Pagamenti", "Costi", "Marginalità", "Performance"].map((item) => <StaggerItem key={item}><span className="inline-block rounded-full border border-[#bcd7f1] bg-white px-3.5 py-2 text-xs font-semibold text-[#245b96]">{item}</span></StaggerItem>)}
            </Stagger>
            <div className="mt-8"><TextLink href={routes.controllo}>Scopri Controllo e performance</TextLink></div>
          </div>
          <Reveal y={40}>
            <AppWindow active="analytics" title="Analytics" className="h-[420px] sm:h-[460px]">
              <PerformanceScreen />
            </AppWindow>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* AUTONOMIA + FAQ                                                     */
/* ------------------------------------------------------------------ */

function BentoTeam() {
  const [ref, step] = useLoopSteps(4, 1600);
  const people = [["GF", "Giulia Ferri", "Vendite"], ["LG", "Luca Gallo", "Progetti"], ["DN", "Davide Neri", "Admin"], ["SR", "Sara Rinaldi", "Nuova · Showroom"]];
  return (
    <div ref={ref} aria-hidden="true" className="mt-5 space-y-1.5" style={uiFont}>
      <AnimatePresence initial={false}>
        {people.slice(0, step === 3 ? 4 : 3).map(([i, n, r], k) => (
          <motion.div key={i} layout initial={{ opacity: 0, x: -16, height: 0 }} animate={{ opacity: 1, x: 0, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.45, ease: tpEase }} className={`flex items-center gap-2.5 rounded-[14px] px-3 py-2 ${k === 3 ? "bg-[#eff6ff] ring-1 ring-[#bfdbfe]" : "bg-[#f8fafc]"}`}>
            <TpAvatar initials={i} size={26} tone={k} />
            <span className="text-[12px] font-semibold text-[#0F172A]">{n}</span>
            <span className="ml-auto text-[11px] text-[#557090]">{r}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function BentoShowrooms() {
  const [ref, step] = useLoopSteps(4, 1500);
  const pins = [
    { name: "Milano Centro", x: "30%", y: "40%" },
    { name: "Como", x: "26%", y: "78%" },
    { name: "Lugano", x: "60%", y: "26%" },
    { name: "Bergamo", x: "78%", y: "66%" },
  ];
  return (
    <div ref={ref} aria-hidden="true" className="relative mt-5 h-[150px] overflow-hidden rounded-[20px] bg-[#f4f9ff]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 150" preserveAspectRatio="none">
        <path d="M90 60 L78 117 M90 60 L180 39 M90 60 L234 99" fill="none" stroke="#bcd7f1" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>
      {pins.map((p, i) => (
        <AnimatePresence key={p.name}>
          {i <= step && (
            <motion.div initial={{ opacity: 0, y: -14, scale: 0.6 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 380, damping: 18 }} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: p.x, top: p.y }}>
              <div className="flex flex-col items-center">
                <span className="whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-[#102744] shadow">{p.name}</span>
                <MapPin className={`mt-0.5 h-5 w-5 ${i === step ? "text-[#f36b4d]" : "text-[#1769d5]"}`} fill="currentColor" stroke="white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </div>
  );
}

function BentoEdit() {
  const [ref, step] = useLoopSteps(2, 2600);
  const value = step === 0 ? "Showroom Como" : "Showroom Como Centro";
  return (
    <div ref={ref} aria-hidden="true" className="mt-5 rounded-[20px] bg-[#f8fafc] p-4" style={uiFont}>
      <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#557090]">Nome sede</p>
      <div className="mt-1.5 flex h-10 items-center rounded-[8px] border border-[#E2E8F0] bg-white px-3 text-[13px] ring-2 ring-[#0F172A]/80">
        <AnimatePresence mode="wait">
          <motion.span key={value} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }}>
            {value}
          </motion.span>
        </AnimatePresence>
        <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="ml-0.5 h-4 w-px bg-[#0F172A]" />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.span key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-[11px] font-semibold text-[#047857]"><Check className="h-3.5 w-3.5" /> Salvato</motion.span>
          ) : (
            <motion.span key="wait" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[11px] text-[#557090]">Modifica in corso…</motion.span>
          )}
        </AnimatePresence>
        <span className="inline-flex h-8 items-center rounded-full bg-[#2563EB] px-3 text-[12px] font-medium text-white">Salva</span>
      </div>
    </div>
  );
}

const faqs: [string, ReactNode][] = [
  ["Per chi è Totalone?", "Per negozi, showroom e gruppi dell'arredamento, da una sola sede a più showroom. Segue la vendita dall'ingresso in showroom fino al montaggio e all'assistenza."],
  ["Posso portare in Totalone i dati che uso oggi?", "Sì, se ne parla in fase di avvio: valutiamo insieme quali dati portare, per esempio clienti e anagrafiche, e come farlo senza fermare il lavoro."],
  ["Quanto tempo serve per partire?", "Dipende da quante sedi e persone coinvolgi e da quali dati vuoi portare. Lo definiamo insieme durante la demo, partendo dal modo in cui lavorate oggi."],
  ["Se assumo una persona o apro uno showroom devo chiamarvi?", "No. Utenti, sedi e struttura dell'organizzazione si gestiscono direttamente dalla piattaforma, senza richiedere ogni volta un intervento tecnico."],
  ["Devo pagare per modificare utenti, nomi o informazioni?", "No. Le normali modifiche amministrative che fai direttamente dalla piattaforma non prevedono costi di intervento."],
  [
    "Quanto costa?",
    <>
      Dipende dalla struttura della tua azienda. Nella pagina{" "}
      <a href={routes.prezzi} className={`font-semibold text-[#0b55c6] underline decoration-[#9fc4ee] underline-offset-4 hover:text-[#b93f23] ${focusBlue}`}>Prezzi</a>{" "}
      trovi come si compone il prezzo e un calcolatore per stimare il valore del tempo recuperato.
    </>,
  ],
];

function AutonomyFaqSection() {
  const cards = [
    ["NUOVO DIPENDENTE", "Aggiungi e gestisci autonomamente le persone del tuo team.", <BentoTeam key="t" />],
    ["NUOVO SHOWROOM", "Gestisci direttamente le sedi e la struttura della tua organizzazione.", <BentoShowrooms key="s" />],
    ["MODIFICHE QUOTIDIANE", "Aggiorna nomi, informazioni e configurazioni dalla piattaforma.", <BentoEdit key="e" />],
  ] as const;
  return (
    <section className="bg-[#fbfdff] py-24 sm:py-32" id="autonomia" aria-labelledby="autonomia-title">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end lg:gap-20">
          <div>
            <Tag>AUTONOMIA</Tag>
            <h2 id="autonomia-title" className="mt-6 max-w-2xl text-5xl font-bold leading-[.95] tracking-[-0.065em] text-[#102744] sm:text-7xl"><WordReveal text="La tua azienda cambia. Non devi chiamarci ogni volta." /></h2>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md text-lg leading-8 text-[#254b72]">Nuove persone, nuovi showroom, nomi da aggiornare: le normali attività amministrative le gestisci direttamente da Totalone.</p>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-4 md:grid-cols-3">
          {cards.map(([label, text, visual]) => (
            <StaggerItem key={label}>
              <SpotlightCard className="h-full rounded-[28px] border border-[#e4eef8] bg-white p-6 shadow-[0_1px_4px_rgba(2,8,23,.04)] transition-shadow hover:shadow-[0_24px_60px_rgba(16,39,68,.10)]">
                <span className="text-[10px] font-bold tracking-[.1em] text-[#0b55c6]">{label}</span>
                <p className="mt-3 text-lg font-bold leading-6 tracking-[-0.02em] text-[#102744]">{text}</p>
                {visual}
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mx-auto mt-20 max-w-[900px]" id="faq">
          <h3 className="text-3xl font-bold leading-[1] tracking-[-0.055em] text-[#102744] sm:text-5xl">Domande frequenti</h3>
          <div className="mt-8 grid gap-3">
            {faqs.map(([question, answer], i) => (
              <Reveal key={question} delay={i * 0.04} y={14}><FaqItem question={question} answer={answer} /></Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqItem({ question, answer }: { question: string; answer: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = `faq-${question.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <div className={`rounded-[22px] border transition-colors ${open ? "border-[#bcd7f1] bg-white shadow-[0_10px_30px_rgba(16,39,68,.06)]" : "border-[#e4eef8] bg-white/60 hover:bg-white"}`}>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls={id} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-bold text-[#245b96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769d5]">
        {question}
        <motion.span aria-hidden="true" animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25, ease: tpEase }} className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#eff7ff] text-xl leading-none text-[#1769d5]">+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div id={id} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: tpEase }} className="overflow-hidden">
            <p className="max-w-2xl px-6 pb-6 text-sm leading-6 text-[#557090]">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PAGINA                                                              */
/* ------------------------------------------------------------------ */

export function TotaloneHomepage() {
  useSeo({ ...SEO, path: routes.home });

  const scrollTo = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", href);
  };

  useEffect(() => {
    // `/demo` o `?demo=1`: apre la modale dello shell (dopo che lo shell ha registrato l'ascoltatore).
    const wantsDemo = new URLSearchParams(window.location.search).get("demo") === "1" || /\/demo\/?$/.test(window.location.pathname);
    const timer = wantsDemo ? window.setTimeout(openDemo, 0) : undefined;

    const targetId = window.location.hash.slice(1);
    const frame = targetId ? window.requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ block: "start" })) : undefined;
    return () => {
      if (timer) window.clearTimeout(timer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <MarketingShell active="home" overlayHeader>
      <main id="top" className="overflow-x-clip bg-[#fbfdff] text-[#102744]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {/* HERO */}
        <section className="relative overflow-hidden bg-[linear-gradient(116deg,#082c68_0%,#0d56bf_54%,#1387ee_100%)] pb-20 pt-32 text-white sm:pb-28 sm:pt-40">
          <motion.div aria-hidden="true" className="absolute -right-20 top-20 h-[420px] w-[420px] rounded-full bg-[#75d7ff]/30 blur-3xl" animate={{ x: [0, -60, 0], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div aria-hidden="true" className="absolute -left-28 top-[420px] h-[420px] w-[420px] rounded-full bg-[#f36b4d]/20 blur-3xl" animate={{ x: [0, 50, 0], y: [0, -30, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
          <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
            <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
              <div>
                <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: tpEase }} className="inline-flex items-center gap-2 rounded-full border border-[#8ecbff] bg-[#5abaff]/20 px-3.5 py-2 text-xs font-bold tracking-[0.08em] text-[#eff8ff]">
                  <span aria-hidden="true" className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9fe0ff] opacity-75 motion-reduce:animate-none" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#9fe0ff]" /></span>
                  IL SISTEMA OPERATIVO PER L'ARREDAMENTO
                </motion.span>
                <h1 className="mt-7 max-w-3xl text-[clamp(3rem,7vw,6.4rem)] font-bold leading-[.93] tracking-[-0.075em]">
                  <WordReveal text="Il gestionale per l’arredamento." />
                  <br />
                  <WordReveal text="Tutto in un unico posto." className="text-[#9fe0ff]" delay={0.3} />
                </h1>
              </div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: tpEase, delay: 0.5 }}>
                <p className="max-w-xl text-lg leading-8 text-[#e5f3ff]">Clienti, preventivi, commesse, consegne, montaggi e assistenza. Totalone riunisce in un unico sistema il lavoro di negozi, showroom e gruppi con più sedi.</p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button onClick={openDemo} light>Prenota una demo</Button>
                  <a href="#come-funziona" onClick={(e) => scrollTo(e, "#come-funziona")} className="group inline-flex items-center gap-2 px-2 text-sm font-bold text-white hover:text-[#d0e8ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                    Scopri come funziona <ChevronDown aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                  </a>
                </div>
              </motion.div>
            </div>
            <HeroProduct />
            <Stagger className="mt-12 grid gap-6 text-xs text-[#d3ebff] sm:grid-cols-3" gap={0.1}>
              {heroTrustSignals.map(([title, body]) => (
                <StaggerItem key={title} className="flex items-start gap-3 border-t border-white/15 pt-5">
                  <span aria-hidden="true" className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10"><Check className="h-3.5 w-3.5 text-[#9fe0ff]" /></span>
                  <span><strong className="block text-[10px] font-bold tracking-[0.06em] text-white">{title}</strong><span className="mt-1 block text-sm font-semibold leading-5 text-[#d3ebff]">{body}</span></span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <ProblemSection />
        <PerChiSection />
        <CommessaTimeline />
        <AreasSection />
        <ControlSection />
        <AutonomyFaqSection />
      </main>
    </MarketingShell>
  );
}

