import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronRight, Mail, Menu, Send, X } from "lucide-react";
import { Reveal, WordReveal, tpEase } from "@/components/totalone/motion-kit";
import { APP_URL, isRouteKey, productNav, routeLabels, routes, type RouteKey } from "@/components/totalone/site/siteRoutes";
import { company, legalLine } from "@/components/totalone/site/company";
import { isValidEmail, submitLead } from "@/components/totalone/site/lead";
import "../_group.css";

/* ------------------------------------------------------------------ */
/* Navigazione: tutto da `routes` / `productNav`                       */
/* ------------------------------------------------------------------ */

/** Voci di primo livello dopo "Prodotto". */
const navItems: { key: RouteKey; label: string }[] = [
  { key: "perche", label: "Perché Totalone" },
  { key: "prezzi", label: "Prezzi" },
  { key: "risorse", label: "Risorse" },
];

/** Sotto-link mostrati sotto una voce del mega-menu. */
const subLinks: Partial<Record<RouteKey, { key: RouteKey; label: string }[]>> = {
  commesse: [{ key: "margini", label: "Margini di commessa" }],
};

const productKeys = new Set<RouteKey>([
  ...productNav.flatMap((g) => g.links.map((l) => l.key)),
  ...Object.values(subLinks).flatMap((list) => (list ?? []).map((l) => l.key)),
]);

/**
 * Gruppi del prodotto nel vecchio formato `[etichetta, href]`.
 * @deprecated usare `productNav` da `@/components/totalone/site/siteRoutes`.
 */
export const productGroups = productNav.map((g) => ({
  label: g.verb.toUpperCase(),
  links: g.links.map((l) => [l.label, routes[l.key]] as const),
}));

const norm = (value: string) => value.toLowerCase().replace(/\s+/g, " ").trim();

/**
 * `active` accetta una chiave di `routes` ("crm", "commesse"…) oppure, per
 * compatibilità, le vecchie etichette libere ("CRM per arredatori",
 * "Assistenza e Post-vendita", "Risorse"…).
 */
function resolveActive(active?: string): RouteKey | undefined {
  if (!active) return undefined;
  if (isRouteKey(active)) return active;
  const a = norm(active);
  if (a.startsWith("margini")) return "margini";
  const entries = Object.entries(routeLabels) as [RouteKey, string][];
  for (const [key, label] of entries) {
    const l = norm(label);
    if (a === l || a.startsWith(`${l} `)) return key;
  }
  return undefined;
}

/* ------------------------------------------------------------------ */
/* Demo: apribile da qualsiasi pagina                                  */
/* ------------------------------------------------------------------ */

const DEMO_EVENT = "totalone:open-demo";
/** Apre la modale "Prenota una demo" dello shell da qualunque punto della pagina. */
export function openDemo() {
  window.dispatchEvent(new CustomEvent(DEMO_EVENT));
}

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";
const focusRingBlue = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769d5]";

/* ------------------------------------------------------------------ */
/* Primitive di stile condivise (esportate per le pagine)              */
/* ------------------------------------------------------------------ */

export function Logo({ dark = false, href = routes.home }: { dark?: boolean; href?: string }) {
  return (
    <a href={href} className={`flex items-center gap-2.5 rounded-[10px] ${dark ? "text-[#102744]" : "text-white"} ${dark ? focusRingBlue : focusRing}`} aria-label="Totalone — home">
      <span className={`grid h-8 w-8 place-items-center rounded-[10px] ${dark ? "bg-[#102744] text-white" : "bg-white text-[#0b55c6]"}`}>
        <span className="h-3.5 w-3.5 rounded-full border-2 border-current" />
      </span>
      <span className="text-[18px] font-bold tracking-[-0.06em]">totalone</span>
    </a>
  );
}

export function ShellTag({ children, tone = "blue", reveal = true }: { children: ReactNode; tone?: "blue" | "coral" | "amber" | "dark" | "glass"; reveal?: boolean }) {
  const tones = {
    blue: "bg-[#dcecff] text-[#0b55c6]",
    coral: "bg-[#ffdcd2] text-[#a33a22]",
    amber: "bg-[#fff2dd] text-[#8a4f0f]",
    dark: "bg-[#2b75cb] text-[#e8f5ff]",
    glass: "border border-[#8ecbff] bg-[#5abaff]/20 text-[#eff8ff]",
  };
  const tag = <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.06em] ${tones[tone]}`}>{children}</span>;
  return reveal ? <Reveal y={10}>{tag}</Reveal> : tag;
}

export function ShellButton({ children, onClick, href, light = false, ghost = false, icon = true }: { children: ReactNode; onClick?: () => void; href?: string; light?: boolean; ghost?: boolean; icon?: boolean }) {
  const cls = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-bold transition-colors duration-200 ${
    ghost
      ? "border border-[#77b9f1] text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      : light
        ? "bg-white text-[#0b4fbd] shadow-[0_10px_28px_rgba(4,43,102,.22)] hover:bg-[#e9f3ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        : "bg-[#cf4a2b] text-white shadow-[0_10px_24px_rgba(173,57,35,.22)] hover:bg-[#b93f23] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cf4a2b]"
  }`;
  const content = <>{children}{icon && <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />}</>;
  const motionProps = { whileHover: { y: -2 }, whileTap: { scale: 0.97 }, transition: { type: "spring" as const, stiffness: 400, damping: 25 } };
  if (href) return <motion.a href={href} className={cls} {...motionProps}>{content}</motion.a>;
  return <motion.button type="button" onClick={onClick ?? openDemo} className={cls} {...motionProps}>{content}</motion.button>;
}

/* ------------------------------------------------------------------ */
/* Modale demo (unica per tutto il sito)                               */
/* ------------------------------------------------------------------ */

type FieldErrors = { name?: string; email?: string };
type Outcome = { kind: "sent"; email: string } | { kind: "mailto"; email: string };

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

function DemoModal({ onClose }: { onClose: () => void }) {
  const uid = useId();
  const ids = {
    title: `${uid}-title`,
    desc: `${uid}-desc`,
    name: `${uid}-name`,
    email: `${uid}-email`,
    company: `${uid}-company`,
    message: `${uid}-message`,
    nameErr: `${uid}-name-err`,
    emailErr: `${uid}-email-err`,
    formErr: `${uid}-form-err`,
  };
  const panelRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  const [values, setValues] = useState({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<ReactNode>(null);
  const [sending, setSending] = useState(false);
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  // Focus iniziale, focus trap, Esc, blocco dello scroll, focus di ritorno.
  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    nameRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.getClientRects().length > 0);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;
      const outside = !panelRef.current.contains(current);
      if (event.shiftKey && (current === first || outside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (current === last || outside)) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => {
    if (outcome) resultRef.current?.focus();
  }, [outcome]);

  const update = (field: keyof typeof values) => (event: { target: { value: string } }) => {
    const value = event.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    if (field in errors) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (values.name.trim().length < 2) next.name = "Inserisci nome e cognome.";
    if (!values.email.trim()) next.email = "Inserisci la tua email aziendale.";
    else if (!isValidEmail(values.email)) next.email = "Controlla l'indirizzo email: sembra incompleto.";
    return next;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    setFormError(null);
    const next = validate();
    setErrors(next);
    if (next.name) { nameRef.current?.focus(); return; }
    if (next.email) { emailRef.current?.focus(); return; }

    setSending(true);
    const result = await submitLead(values);
    setSending(false);
    if (result.status === "sent") setOutcome({ kind: "sent", email: values.email.trim() });
    else if (result.status === "mailto") setOutcome({ kind: "mailto", email: result.email });
    else if (result.reason === "network") {
      setFormError(
        <>
          Non siamo riusciti a inviare la richiesta. Riprova tra qualche minuto
          {company.contactEmail ? <> oppure scrivici a <a className="font-bold underline underline-offset-2" href={`mailto:${company.contactEmail}`}>{company.contactEmail}</a></> : null}.
        </>,
      );
    } else {
      setFormError("Al momento il modulo di richiesta non è attivo e la tua richiesta non è stata inviata. Riprova più tardi.");
    }
  };

  const inputCls = (invalid?: boolean) =>
    `w-full rounded-[12px] border bg-white px-4 py-3 text-sm text-[#102744] outline-none placeholder:text-[#7890aa] focus:border-[#1769d5] focus-visible:ring-2 focus-visible:ring-[#1769d5]/25 ${invalid ? "border-[#b42318]" : "border-[#c8dcf3]"}`;
  const labelCls = "text-[13px] font-semibold text-[#102744]";
  const errCls = "text-[12px] font-semibold text-[#b42318]";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-[#061a38]/75 p-4 backdrop-blur-sm"
      onClick={() => closeRef.current()}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ids.title}
        aria-describedby={ids.desc}
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.3, ease: tpEase }}
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-lg rounded-[28px] bg-white p-6 text-[#102744] shadow-2xl sm:p-9"
      >
        <button type="button" onClick={() => closeRef.current()} className={`absolute right-5 top-5 rounded-full p-2 text-[#557090] hover:bg-[#eaf3ff] ${focusRingBlue}`} aria-label="Chiudi">
          <X aria-hidden="true" className="h-5 w-5" />
        </button>

        {!outcome ? (
          <div>
            <span className="inline-flex rounded-full bg-[#dcecff] px-3 py-1.5 text-xs font-bold text-[#0b55c6]">Parliamo del tuo showroom</span>
            <h2 id={ids.title} className="mt-5 max-w-sm pr-8 text-3xl font-bold leading-[1.02] tracking-[-0.06em] sm:text-4xl">Partiamo da una tua commessa.</h2>
            <p id={ids.desc} className="mt-4 max-w-md text-sm leading-6 text-[#557090]">Lasciaci i tuoi contatti: ti scriviamo per fissare una demo su un caso reale del tuo showroom.</p>
            <form className="mt-6 grid gap-4" onSubmit={onSubmit} noValidate aria-describedby={formError ? ids.formErr : undefined}>
              <div className="grid gap-1.5">
                <label htmlFor={ids.name} className={labelCls}>Nome e cognome <span aria-hidden="true" className="text-[#a33a22]">*</span></label>
                <input
                  ref={nameRef}
                  id={ids.name}
                  name="name"
                  autoComplete="name"
                  required
                  aria-required="true"
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? ids.nameErr : undefined}
                  value={values.name}
                  onChange={update("name")}
                  className={inputCls(!!errors.name)}
                />
                {errors.name && <p id={ids.nameErr} className={errCls}>{errors.name}</p>}
              </div>
              <div className="grid gap-1.5">
                <label htmlFor={ids.email} className={labelCls}>Email aziendale <span aria-hidden="true" className="text-[#a33a22]">*</span></label>
                <input
                  ref={emailRef}
                  id={ids.email}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? ids.emailErr : undefined}
                  value={values.email}
                  onChange={update("email")}
                  className={inputCls(!!errors.email)}
                />
                {errors.email && <p id={ids.emailErr} className={errCls}>{errors.email}</p>}
              </div>
              <div className="grid gap-1.5">
                <label htmlFor={ids.company} className={labelCls}>Azienda o showroom <span className="font-normal text-[#557090]">(facoltativo)</span></label>
                <input id={ids.company} name="company" autoComplete="organization" value={values.company} onChange={update("company")} className={inputCls()} />
              </div>
              <div className="grid gap-1.5">
                <label htmlFor={ids.message} className={labelCls}>Messaggio <span className="font-normal text-[#557090]">(facoltativo)</span></label>
                <textarea id={ids.message} name="message" rows={3} value={values.message} onChange={update("message")} placeholder="Es. quante sedi avete, cosa usate oggi" className={`${inputCls()} resize-y`} />
              </div>
              <p className="text-[12px] leading-5 text-[#557090]">
                I campi con * sono obbligatori. Useremo questi dati solo per ricontattarti sulla demo.{" "}
                <a href={routes.privacy} target="_blank" rel="noopener noreferrer" className={`font-semibold text-[#0b55c6] underline decoration-[#9fc4ee] underline-offset-2 hover:text-[#082c68] ${focusRingBlue}`}>
                  Informativa privacy<span className="sr-only"> (si apre in una nuova scheda)</span>
                </a>
              </p>
              <div aria-live="polite">
                {formError && <p id={ids.formErr} role="alert" className="rounded-[12px] bg-[#fdecea] px-4 py-3 text-[13px] leading-5 text-[#8a1c12]">{formError}</p>}
              </div>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#cf4a2b] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#b93f23] disabled:cursor-wait disabled:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cf4a2b]"
              >
                {sending ? "Invio in corso…" : "Richiedi la demo"} <Send aria-hidden="true" className="h-4 w-4" />
              </button>
            </form>
          </div>
        ) : (
          <div ref={resultRef} tabIndex={-1} className="py-6 text-center outline-none" role="status">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#dcecff] text-[#1769d5]">
              {outcome.kind === "sent" ? <Check aria-hidden="true" className="h-6 w-6" /> : <Mail aria-hidden="true" className="h-6 w-6" />}
            </div>
            {outcome.kind === "sent" ? (
              <>
                <h2 id={ids.title} className="mt-5 text-3xl font-bold tracking-[-0.06em] sm:text-4xl">Richiesta inviata.</h2>
                <p id={ids.desc} className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#557090]">Ti scriveremo a <b className="text-[#102744]">{outcome.email}</b> per fissare la demo.</p>
              </>
            ) : (
              <>
                <h2 id={ids.title} className="mt-5 text-3xl font-bold tracking-[-0.06em] sm:text-4xl">Completa l'invio dalla tua email.</h2>
                <p id={ids.desc} className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#557090]">
                  Abbiamo preparato il messaggio nel tuo programma di posta: premi Invia per completare la richiesta. Se non si è aperto, scrivici a{" "}
                  <a className="font-bold text-[#0b55c6] underline underline-offset-2" href={`mailto:${outcome.email}`}>{outcome.email}</a>.
                </p>
              </>
            )}
            <button type="button" onClick={() => closeRef.current()} className={`mt-7 rounded-full border border-[#1769d5] px-5 py-3 text-sm font-bold text-[#0b55c6] hover:bg-[#eaf3ff] ${focusRingBlue}`}>Torna alla pagina</button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* SHELL                                                               */
/* ------------------------------------------------------------------ */

export function MarketingShell({
  children,
  active = "",
  eyebrow,
  title,
  description,
  primaryLabel = "Prenota una demo",
  heroVisual,
  secondaryCta = null,
  overlayHeader = false,
  closingTitle = "Partiamo da una tua commessa.",
  closingText = "Non una demo generica. Vediamo insieme come Totalone può inserirsi nel modo in cui lavori oggi.",
}: {
  children: ReactNode;
  /** Chiave di `routes` della pagina (es. "crm"). Accetta anche le vecchie etichette. */
  active?: RouteKey | string;
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  /** Visual a destra nell'hero (solo se `title`). */
  heroVisual?: ReactNode;
  /** Link secondario nell'hero; di default nessuno. */
  secondaryCta?: { label: string; href: string } | null;
  /** Se `true` l'header fisso si sovrappone al contenuto (la pagina deve avere un hero scuro con padding-top ≥ 7rem). */
  overlayHeader?: boolean;
  /** Titolo del blocco CTA nel footer. */
  closingTitle?: string;
  closingText?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  const activeKey = resolveActive(active);
  const inProduct = activeKey ? productKeys.has(activeKey) : false;

  const showDemo = () => { setDemoOpen(true); setMenuOpen(false); setProductOpen(false); };

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("demo") === "1" || /^\/demo\/?$/.test(window.location.pathname)) setDemoOpen(true);
    const onDemo = () => showDemo();
    window.addEventListener(DEMO_EVENT, onDemo);
    return () => window.removeEventListener(DEMO_EVENT, onDemo);
  }, []);

  useEffect(() => {
    if (!productOpen && !menuOpen) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setProductOpen(false); setMenuOpen(false); } };
    const onClick = (event: PointerEvent) => { if (headerRef.current && !headerRef.current.contains(event.target as Node)) setProductOpen(false); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onClick);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("pointerdown", onClick); };
  }, [productOpen, menuOpen]);

  const navLink = "relative text-[13px] font-semibold transition-colors hover:text-white " + focusRing;
  const dot = <span aria-hidden="true" className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#f36b4d]" />;

  const crumbLabel = activeKey ? routeLabels[activeKey] : active && !isRouteKey(active) ? active : eyebrow;
  const crumbs: { label: string; href?: string }[] = [{ label: "Home", href: routes.home }];
  if (activeKey === "margini") crumbs.push({ label: routeLabels.commesse!, href: routes.commesse });
  if (crumbLabel) crumbs.push({ label: crumbLabel });

  const footerLink = `text-[13px] font-semibold text-[#245b96] transition-colors hover:text-[#a33a22] ${focusRingBlue}`;

  return (
    <div className="totalone-architecture overflow-x-clip">
      <a href="#contenuto" className="sr-only z-[80] rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0b55c6] focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Vai al contenuto</a>
      <motion.div aria-hidden="true" style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[#f36b4d]" />

      {/* Trigger legacy (compatibilità): alcune pagine aprivano la demo con
          document.querySelector(".to-header-actions .to-button").click().
          Metodo consigliato: importare `openDemo()` da questo file. */}
      <div className="to-header-actions" hidden>
        <button type="button" className="to-button" tabIndex={-1} aria-hidden="true" onClick={showDemo}>{primaryLabel}</button>
      </div>
      <div className="to-footer-cta" hidden>
        <button type="button" className="to-button" tabIndex={-1} aria-hidden="true" onClick={showDemo}>{primaryLabel}</button>
      </div>

      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5">
        <motion.div
          ref={headerRef}
          initial={false}
          animate={{
            maxWidth: scrolled ? 1060 : 1240,
            backgroundColor: scrolled || menuOpen ? "rgba(8,44,104,0.86)" : "rgba(8,44,104,0)",
            boxShadow: scrolled ? "0 12px 40px rgba(4,35,82,.28)" : "0 0 0 rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.45, ease: tpEase }}
          className={`relative mx-auto flex items-center justify-between gap-3 rounded-full border px-4 py-2.5 backdrop-blur-xl transition-colors sm:px-5 ${scrolled || menuOpen ? "border-white/15" : "border-transparent"}`}
        >
          <Logo />
          <nav className="hidden items-center gap-5 md:flex lg:gap-7" aria-label="Navigazione principale">
            <button
              type="button"
              onClick={() => setProductOpen((open) => !open)}
              aria-expanded={productOpen}
              aria-controls="shell-mega-menu"
              className={`inline-flex items-center gap-1 ${navLink} ${inProduct || productOpen ? "text-white" : "text-[#e6f1ff]"}`}
            >
              Prodotto <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition-transform duration-300 ${productOpen ? "rotate-180" : ""}`} />
              {inProduct && dot}
            </button>
            {navItems.map((item) => {
              const current = activeKey === item.key;
              return (
                <a key={item.key} href={routes[item.key]} aria-current={current ? "page" : undefined} className={`${navLink} ${current ? "text-white" : "text-[#e6f1ff]"}`}>
                  {item.label}
                  {current && dot}
                </a>
              );
            })}
            <a href={APP_URL} className={`${navLink} text-[#e6f1ff]`}>Accedi</a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <button type="button" onClick={showDemo} className={`rounded-full bg-white px-3.5 py-2 text-[12px] font-bold text-[#0b2f66] transition-transform hover:scale-[1.03] hover:bg-[#e9f3ff] sm:px-4 sm:py-2.5 sm:text-[13px] ${focusRing}`}>
              <span className="sm:hidden">Demo</span>
              <span className="hidden sm:inline">{primaryLabel}</span>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className={`grid h-10 w-10 place-items-center rounded-full border border-[#82bfff] text-white hover:bg-white/10 md:hidden ${focusRing}`}
              aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
              aria-expanded={menuOpen}
              aria-controls="shell-mobile-menu"
            >
              {menuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
            </button>
          </div>

          <AnimatePresence>
            {productOpen && (
              <motion.div
                id="shell-mega-menu"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.25, ease: tpEase }}
                className="absolute left-0 right-0 top-[calc(100%+10px)] hidden origin-top rounded-[28px] border border-[#cfe1f4] bg-[#fafdff] p-6 text-[#102744] shadow-[0_22px_60px_rgba(4,35,82,.24)] md:grid md:grid-cols-[.8fr_2.2fr] md:gap-6"
              >
                <div className="border-r border-[#cfe1f4] pr-6">
                  <span className="rounded-full bg-[#dcecff] px-3 py-1.5 text-[11px] font-bold tracking-[.1em] text-[#0b55c6]">IL PRODOTTO</span>
                  <p className="mt-4 text-2xl font-bold leading-[1] tracking-[-.05em] lg:text-3xl">Un modo condiviso di lavorare.</p>
                  <p className="mt-3 text-xs leading-5 text-[#557090]">Dal primo ingresso in showroom all'assistenza, ogni passaggio resta collegato.</p>
                  <a href={routes.perche} onClick={() => setProductOpen(false)} className={`group mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#0b55c6] hover:text-[#a33a22] ${focusRingBlue}`}>Perché Totalone <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></a>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {productNav.map((group) => (
                    <div key={group.verb} className="border-l border-[#cfe1f4] pl-3 first:border-l-0 first:pl-0">
                      <p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#0b55c6]">{group.verb}</p>
                      <ul className="mt-1">
                        {group.links.map((link) => {
                          const current = activeKey === link.key;
                          return (
                            <li key={link.key}>
                              <a href={routes[link.key]} aria-current={current ? "page" : undefined} onClick={() => setProductOpen(false)} className={`group flex items-center justify-between gap-1 rounded-md py-2 text-[12px] font-bold hover:text-[#a33a22] ${current ? "text-[#a33a22]" : "text-[#245b96]"} ${focusRingBlue}`}>
                                {link.label}<ChevronRight aria-hidden="true" className="h-3 w-3 shrink-0 transition-transform group-hover:translate-x-0.5" />
                              </a>
                              {subLinks[link.key]?.map((sub) => (
                                <a key={sub.key} href={routes[sub.key]} aria-current={activeKey === sub.key ? "page" : undefined} onClick={() => setProductOpen(false)} className={`-mt-1 block rounded-md py-1.5 pl-3 text-[12px] font-semibold hover:text-[#a33a22] ${activeKey === sub.key ? "text-[#a33a22]" : "text-[#557090]"} ${focusRingBlue}`}>
                                  {sub.label}
                                </a>
                              ))}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="shell-mobile-menu"
              aria-label="Menu mobile"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: tpEase }}
              className="mx-auto mt-2 max-h-[calc(100dvh-90px)] origin-top overflow-y-auto rounded-[24px] bg-[#0b3473] px-5 py-4 shadow-[0_20px_50px_rgba(4,35,82,.35)] md:hidden"
            >
              <button type="button" onClick={() => setMobileProductOpen((open) => !open)} aria-expanded={mobileProductOpen} aria-controls="shell-mobile-product" className="flex w-full items-center justify-between border-b border-[#3d78c4] py-3 text-left text-sm font-semibold text-[#e7f2ff] hover:text-white">
                Prodotto <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform duration-300 ${mobileProductOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {mobileProductOpen && (
                  <motion.div id="shell-mobile-product" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: tpEase }} className="overflow-hidden border-b border-[#3d78c4]">
                    <div className="pb-2">
                      {productNav.map((group) => (
                        <div key={group.verb} className="pt-3">
                          <p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#9fe0ff]">{group.verb}</p>
                          {group.links.flatMap((link) => [link, ...(subLinks[link.key] ?? [])]).map((link) => (
                            <a key={link.key} href={routes[link.key]} aria-current={activeKey === link.key ? "page" : undefined} onClick={() => setMenuOpen(false)} className={`block py-2 pl-2 text-[13px] font-semibold ${activeKey === link.key ? "text-[#ffb19f]" : "text-[#e7f2ff]"}`}>{link.label}</a>
                          ))}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {navItems.map((item) => (
                <a key={item.key} href={routes[item.key]} aria-current={activeKey === item.key ? "page" : undefined} onClick={() => setMenuOpen(false)} className={`block border-b border-[#3d78c4] py-3 text-sm font-semibold hover:text-white ${activeKey === item.key ? "text-white" : "text-[#e7f2ff]"}`}>{item.label}</a>
              ))}
              <a href={APP_URL} onClick={() => setMenuOpen(false)} className="block border-b border-[#3d78c4] py-3 text-sm font-semibold text-[#e7f2ff] hover:text-white">Accedi</a>
              <button type="button" onClick={showDemo} className="mt-4 w-full rounded-full bg-[#cf4a2b] px-4 py-3 text-left text-sm font-bold text-white hover:bg-[#b93f23] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{primaryLabel} <ArrowRight aria-hidden="true" className="ml-2 inline h-4 w-4" /></button>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {title ? (
        <section className="relative overflow-hidden bg-[linear-gradient(116deg,#082c68_0%,#0d56bf_60%,#1162d6_100%)] pb-20 pt-28 text-white sm:pb-28 sm:pt-36">
          <motion.div aria-hidden="true" className="absolute -right-20 top-16 hidden h-[420px] w-[420px] rounded-full bg-[#75d7ff]/25 blur-3xl lg:block" animate={{ x: [0, -60, 0], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
          <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
            {crumbs.length > 1 && (
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#e6f1ff]">
                  {crumbs.map((c, i) => (
                    <li key={c.label} className="flex items-center gap-2">
                      {i > 0 && <ChevronRight aria-hidden="true" className="h-3 w-3 opacity-70" />}
                      {i < crumbs.length - 1 && c.href ? <a href={c.href} className={`hover:text-white hover:underline ${focusRing}`}>{c.label}</a> : <span aria-current="page" className="text-white">{c.label}</span>}
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <div className={`mt-8 grid items-center gap-12 ${heroVisual ? "lg:grid-cols-[1.02fr_.98fr] lg:gap-14" : ""}`}>
              <div>
                {eyebrow && (
                  <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: tpEase }} className="inline-flex items-center gap-2 rounded-full border border-[#8ecbff] bg-[#5abaff]/20 px-3.5 py-2 text-xs font-bold tracking-[0.08em] text-[#eff8ff]">
                    <span aria-hidden="true" className="relative inline-flex h-2 w-2 rounded-full bg-[#9fe0ff]" />
                    {eyebrow}
                  </motion.span>
                )}
                <h1 className="mt-7 max-w-3xl text-[clamp(2.5rem,6vw,5.4rem)] font-bold leading-[1] tracking-[-0.055em] [text-wrap:balance] sm:leading-[.95] sm:tracking-[-0.07em]"><WordReveal text={title} /></h1>
                {description && <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: tpEase, delay: 0.35 }} className="mt-7 max-w-xl text-lg leading-8 text-[#f0f7ff]">{description}</motion.p>}
                <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: tpEase, delay: 0.5 }} className="mt-9 flex flex-wrap items-center gap-3">
                  <ShellButton onClick={showDemo} light>{primaryLabel}</ShellButton>
                  {secondaryCta && <ShellButton href={secondaryCta.href} ghost>{secondaryCta.label}</ShellButton>}
                </motion.div>
              </div>
              {heroVisual && (
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: tpEase, delay: 0.3 }} className="min-w-0">
                  {heroVisual}
                </motion.div>
              )}
            </div>
          </div>
        </section>
      ) : overlayHeader ? null : (
        <div aria-hidden="true" className="h-[72px] bg-[#082c68] sm:h-[76px]" />
      )}

      <div id="contenuto" tabIndex={-1} className="outline-none">
        {children}
      </div>

      <footer className="bg-[#eaf4ff] py-16 sm:py-20">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <Reveal y={30}>
            <div className="relative flex flex-col justify-between gap-10 overflow-hidden rounded-[32px] bg-[linear-gradient(120deg,#082652,#0b62ce)] p-7 text-white sm:p-12 lg:flex-row lg:items-end">
              <div aria-hidden="true" className="absolute -bottom-32 right-10 hidden h-80 w-80 rounded-full bg-[#f36b4d]/25 blur-3xl lg:block" />
              <div className="relative">
                <span className="inline-flex rounded-full bg-[#ffdcd2] px-3 py-1.5 text-xs font-bold text-[#a33a22]">IL PROSSIMO PASSO</span>
                <h2 className="mt-5 max-w-2xl text-4xl font-bold leading-[.98] tracking-[-0.06em] sm:text-6xl"><WordReveal text={closingTitle} /></h2>
                <p className="mt-5 max-w-lg text-sm leading-6 text-[#e3f1ff]">{closingText}</p>
              </div>
              <div className="relative"><ShellButton onClick={showDemo} light>{primaryLabel}</ShellButton></div>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-8 border-b border-[#cfe1f4] pb-10 sm:grid-cols-3 lg:grid-cols-5">
            <div className="col-span-2 sm:col-span-3 lg:col-span-5">
              <Logo dark />
            </div>
            {productNav.map((group) => (
              <div key={group.verb}>
                <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0b55c6]">{group.verb}</h2>
                <ul className="mt-3 grid gap-1.5">
                  {group.links.flatMap((link) => [link, ...(subLinks[link.key] ?? [])]).map((link) => (
                    <li key={link.key}><a href={routes[link.key]} className={footerLink}>{link.label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0b55c6]">Totalone</h2>
              <ul className="mt-3 grid gap-1.5">
                {navItems.map((item) => <li key={item.key}><a href={routes[item.key]} className={footerLink}>{item.label}</a></li>)}
                <li><button type="button" onClick={showDemo} className={`text-left ${footerLink}`}>{primaryLabel}</button></li>
                <li><a href={APP_URL} className={`inline-flex items-center gap-1 ${footerLink}`}>Accedi all'app <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /></a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 pt-8 text-xs font-semibold text-[#557090] sm:flex-row">
            <span>
              {legalLine()} · <a href={routes.privacy} className={`underline decoration-[#9fc4ee] underline-offset-4 hover:text-[#0b55c6] ${focusRingBlue}`}>Privacy policy</a>
            </span>
            <span aria-hidden="true">VENDERE → GESTIRE → CONSEGNARE → CONTROLLARE</span>
          </div>
        </div>
      </footer>

      <AnimatePresence>{demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}</AnimatePresence>
    </div>
  );
}
