/**
 * Primitivi UI del gestionale Totalone, ricostruiti dagli screen reali
 * dell'app e dal design pack Peverelli (tokens.css, recipes.css, components/*).
 * Servono a disegnare schermate animate del prodotto dentro il sito.
 */
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Archive,
  BarChart3,
  Bell,
  Calculator,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  FileText,
  Hammer,
  LogOut,
  MessageCircle,
  PanelLeft,
  Receipt,
  Settings,
  Sparkles,
  SquareCheck,
  TrendingUp,
  Users,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const uiFont = { fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" };
export const docFont = { fontFamily: "Outfit, 'Helvetica Neue', Helvetica, sans-serif" };

/** Label uppercase con tracking largo, come nelle sezioni dell'app. */
export function TpLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[7.5px] font-medium uppercase tracking-[0.16em] text-[#64748B] ${className}`}>{children}</p>;
}

/** Card bianca dell'app: raggio largo, bordo appena visibile, ombra 6%. */
export function TpCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[14px] border border-[#EEF2F6] bg-white shadow-[0_1px_4px_0_rgba(2,8,23,.05)] ${className}`}>{children}</div>;
}

export type ChipKind = "final" | "tratt" | "pagare" | "perso" | "gold" | "saldato" | "neutral" | "media" | "alta" | "convertito" | "open";

const chipStyles: Record<ChipKind, string> = {
  final: "bg-[#D1FAE5] text-[#047857]",
  saldato: "bg-[#ECFDF5] text-[#047857] ring-1 ring-[#A7F3D0]",
  tratt: "bg-[#3B82F6] text-white",
  pagare: "bg-[#FFF7ED] text-[#EA580C] ring-1 ring-[#FED7AA]",
  perso: "bg-[#FEE2E2] text-[#B91C1C]",
  gold: "bg-[#F7ECD3] text-[#8A6A2A]",
  neutral: "bg-[#F1F5F9] text-[#475569]",
  media: "bg-[#FFF7ED] text-[#EA580C] ring-1 ring-[#FED7AA]",
  alta: "bg-[#FEF2F2] text-[#DC2626] ring-1 ring-[#FECACA]",
  convertito: "bg-[#F3E8FF] text-[#7C3AED]",
  open: "bg-white text-[#334155] ring-1 ring-[#E2E8F0]",
};

/** Pillola di stato. Al cambio di `kind` entra con una piccola molla. */
export function TpChip({ kind, children, dot }: { kind: ChipKind; children: ReactNode; dot?: string }) {
  return (
    <motion.span
      key={kind}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      className={`inline-flex h-[16px] items-center gap-1 whitespace-nowrap rounded-full px-1.5 text-[7.5px] font-semibold ${chipStyles[kind]}`}
    >
      {dot && <span className="h-1 w-1 rounded-full" style={{ background: dot }} />}
      {children}
    </motion.span>
  );
}

/** Avatar iniziali: blu brand trasparente (avatarColors.ts). */
export function TpAvatar({ initials, size = 22, tone = 0 }: { initials: string; size?: number; tone?: number }) {
  const bgs = ["rgba(59,130,246,.12)", "rgba(59,130,246,.16)", "rgba(59,130,246,.20)", "rgba(59,130,246,.10)"];
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full font-semibold text-[#3B82F6]/80"
      style={{ width: size, height: size, fontSize: size * 0.36, background: bgs[tone % bgs.length] }}
    >
      {initials}
    </span>
  );
}

/** CTA blu a pillola dell'app (“+ Nuovo task”, “Nuovo rapportino”…). */
export function TpPill({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex h-[22px] items-center gap-1 rounded-full bg-[#3B82F6] px-2.5 text-[8.5px] font-medium text-white shadow-[0_4px_10px_rgba(59,130,246,.25)] ${className}`}>
      {children}
    </span>
  );
}

/** Bottone secondario bianco con bordo (“Archivio”, “Filtri”…). */
export function TpGhost({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex h-[22px] items-center gap-1 rounded-full border border-[#E2E8F0] bg-white px-2.5 text-[8.5px] font-medium text-[#0F172A] ${className}`}>
      {children}
    </span>
  );
}

/** Barra di ricerca a pillola. */
export function TpSearch({ placeholder, className = "" }: { placeholder: string; className?: string }) {
  return (
    <span className={`flex h-[22px] items-center gap-1.5 rounded-full border border-[#EEF2F6] bg-white px-2.5 text-[8.5px] text-[#94A3B8] ${className}`}>
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
      {placeholder}
    </span>
  );
}

/** Intestazione di pagina: icona in cerchio azzurro, titolo, sottotitolo, azioni. */
export function TpPageHeader({
  icon: Icon,
  title,
  subtitle,
  actions,
  eyebrow,
}: {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="flex items-start gap-2">
      {Icon && (
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#EFF6FF] text-[#3B82F6]">
          <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
        </span>
      )}
      <div className="min-w-0">
        {eyebrow && <TpLabel className="mb-0.5">{eyebrow}</TpLabel>}
        <p className="text-[12.5px] font-semibold leading-tight tracking-[-0.02em] text-[#020817]">{title}</p>
        {subtitle && <p className="mt-0.5 truncate text-[8.5px] text-[#64748B]">{subtitle}</p>}
      </div>
      {actions && <div className="ml-auto flex shrink-0 items-center gap-1.5">{actions}</div>}
    </div>
  );
}

export function TpKpi({
  label,
  value,
  hint,
  icon: Icon,
  iconTone = "slate",
  highlight = false,
  valueClass = "",
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon?: LucideIcon;
  iconTone?: "slate" | "emerald" | "blue" | "orange" | "purple" | "red";
  highlight?: boolean;
  valueClass?: string;
}) {
  const tones = {
    slate: "bg-[#F1F5F9] text-[#94A3B8]",
    emerald: "bg-[#ECFDF5] text-[#10B981]",
    blue: "bg-[#EFF6FF] text-[#3B82F6]",
    orange: "bg-[#FFF7ED] text-[#F97316]",
    purple: "bg-[#F5F3FF] text-[#8B5CF6]",
    red: "bg-[#FEF2F2] text-[#EF4444]",
  };
  return (
    <motion.div
      animate={highlight ? { boxShadow: ["0 0 0 0 rgba(59,130,246,0)", "0 0 0 3px rgba(59,130,246,.35)", "0 0 0 0 rgba(59,130,246,0)"] } : {}}
      transition={{ duration: 1.2 }}
      className="min-w-0 rounded-[14px] border border-[#EEF2F6] bg-white p-2.5 shadow-[0_1px_4px_0_rgba(2,8,23,.05)]"
    >
      {Icon && (
        <span className={`mb-2 grid h-5 w-5 place-items-center rounded-[6px] ${tones[iconTone]}`}>
          <Icon className="h-3 w-3" strokeWidth={1.75} />
        </span>
      )}
      <TpLabel className="truncate">{label}</TpLabel>
      <p className={`mt-1 truncate text-[15px] font-bold leading-none tracking-[-0.03em] text-[#020817] ${valueClass}`}>{value}</p>
      {hint && <p className="mt-1 truncate text-[8px] text-[#94A3B8]">{hint}</p>}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Sidebar reale dell'app                                              */
/* ------------------------------------------------------------------ */

type NavItem = { key: string; label: string; icon: LucideIcon; sub?: [string, string][] };

const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: "Vendite",
    items: [
      { key: "analytics", label: "Analytics", icon: TrendingUp },
      { key: "totalone", label: "Totalone", icon: BarChart3 },
      { key: "schedine", label: "Schedine", icon: FileText },
      {
        key: "crm",
        label: "CRM",
        icon: Users,
        sub: [
          ["crm.crm", "CRM"],
          ["crm.ingressi", "Ingressi Showroom"],
          ["crm.contatti", "Contatti Aziendali"],
          ["crm.pipeline", "Pipeline"],
          ["crm.automation", "Automation"],
        ],
      },
      { key: "conversazioni", label: "Conversazioni", icon: MessageCircle },
      { key: "appuntamenti", label: "Appuntamenti", icon: CalendarDays },
      { key: "preventivi", label: "Preventivi", icon: Calculator },
    ],
  },
  {
    label: "Logistica",
    items: [
      { key: "magazzino", label: "Magazzino", icon: Archive, sub: [["magazzino.magazzino", "Magazzino"], ["magazzino.arrivi", "Arrivi previsti"]] },
      { key: "montaggi", label: "Montaggi", icon: Hammer, sub: [["montaggi.montaggi", "Montaggi"], ["montaggi.rapportini", "Rapportini"]] },
      { key: "assistenze", label: "Assistenze", icon: Wrench },
    ],
  },
  {
    label: "Business",
    items: [
      { key: "tasks", label: "Tasks", icon: SquareCheck, sub: [["tasks.dashboard", "Dashboard"], ["tasks.task", "Task"], ["tasks.progetti", "Progetti"], ["tasks.whitepaper", "White paper"]] },
      { key: "actionplan", label: "Action Plan", icon: Sparkles },
      { key: "finance", label: "Finance", icon: Wallet },
      { key: "fatturazione", label: "Fatturazione", icon: Receipt },
    ],
  },
];

/**
 * Finestra applicazione: chrome browser + sidebar reale (gruppi Vendite,
 * Logistica, Business, sotto-voci aperte solo per la sezione attiva) +
 * header con tab della pagina e campanella notifiche.
 * `active` accetta "crm.pipeline", "assistenze", "tasks.task"…
 */
export function AppWindow({
  active,
  title,
  children,
  className = "",
  notifications = 50,
  ariaLabel,
}: {
  active: string;
  title: string;
  children: ReactNode;
  className?: string;
  notifications?: number;
  /** Descrizione per i lettori di schermo; il contenuto del mockup è decorativo (aria-hidden). */
  ariaLabel?: string;
}) {
  const [parent] = active.split(".");
  return (
    <div
      role="img"
      aria-label={ariaLabel ?? `Schermata dimostrativa di Totalone: ${title}, con dati di esempio`}
      className={`overflow-hidden rounded-[22px] bg-white text-left text-[#020817] shadow-[0_40px_100px_-20px_rgba(4,30,80,.45),0_0_0_1px_rgba(255,255,255,.4)] ${className}`}
      style={uiFont}
    >
      <div aria-hidden="true" className="contents">
      <div className="flex h-7 items-center gap-1.5 border-b border-[#E2E8F0] bg-[#F8FAFC] px-3">
        <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
        <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
        <span className="h-2 w-2 rounded-full bg-[#28C840]" />
        <span className="mx-auto rounded-md bg-white px-6 py-[3px] text-[8.5px] font-medium text-[#64748B] ring-1 ring-[#E2E8F0]">app.thetotalone.com</span>
      </div>
      <div className="flex h-[calc(100%-28px)]">
        <aside className="relative hidden w-[138px] shrink-0 flex-col border-r border-[#EEF0F3] bg-[#FAFAFA] sm:flex">
          <div className="px-3 pb-1.5 pt-3">
            <p className="text-[13px] font-bold leading-none tracking-[-0.03em] text-[#1E293B]">Totalone</p>
            <p className="mt-0.5 text-[6.5px] text-[#64748B]">Il tuo showroom</p>
          </div>
          <nav className="min-h-0 flex-1 overflow-hidden px-1.5 pb-14">
            {navGroups.map((g) => (
              <div key={g.label} className="mt-1.5">
                <p className="mb-0.5 px-1.5 text-[6.5px] font-medium uppercase tracking-[0.18em] text-[#64748B]">{g.label}</p>
                {g.items.map((item) => {
                  const isParent = parent === item.key;
                  const open = isParent && item.sub;
                  const exact = active === item.key;
                  return (
                    <div key={item.key}>
                      <div className={`relative flex h-[18px] items-center gap-1.5 rounded-[6px] px-1.5 text-[8.5px] ${isParent ? "font-semibold text-[#0F172A]" : "text-[#27272A]"}`}>
                        <span className={`absolute inset-0 rounded-[6px] bg-[#F1F2F4] transition-opacity duration-300 ${exact ? "opacity-100" : "opacity-0"}`} />
                        <item.icon className={`relative h-[11px] w-[11px] ${isParent ? "text-[#3B82F6]" : "text-[#52525B]"}`} strokeWidth={1.75} />
                        <span className="relative">{item.label}</span>
                        {item.sub && (open ? <ChevronDown className="relative ml-auto h-2.5 w-2.5 text-[#64748B]" /> : <ChevronRight className="relative ml-auto h-2.5 w-2.5 text-[#64748B]" />)}
                      </div>
                      {open && (
                        <div className="ml-[11px] border-l border-[#E5E7EB] pl-1">
                          {item.sub!.map(([k, l]) => (
                            <div key={k} className={`relative flex h-[16px] items-center rounded-[5px] px-1.5 text-[7.5px] ${active === k ? "font-medium text-[#2563EB]" : "text-[#3F3F46]"}`}>
                              <span className={`absolute inset-0 rounded-[5px] bg-[#E8F0FE] transition-opacity duration-300 ${active === k ? "opacity-100" : "opacity-0"}`} />
                              <span className="relative">{l}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </nav>
          <div className="absolute inset-x-0 bottom-0 border-t border-[#EEF0F3] bg-[#FAFAFA] px-2 py-1.5">
            <div className="flex items-center gap-1.5">
              <TpAvatar initials="SD" size={16} />
              <div className="min-w-0">
                <p className="truncate text-[7.5px] font-semibold text-[#0F172A]">Showroom Demo</p>
                <p className="truncate text-[6.5px] text-[#64748B]">Admin</p>
              </div>
            </div>
            <div className="mt-1 flex items-center gap-1 text-[7px] text-[#64748B]">
              <Settings className="h-2.5 w-2.5" /> Impostazioni <LogOut className="ml-auto h-2.5 w-2.5" />
            </div>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col bg-[#F7F8FA]">
          <header className="flex h-[30px] shrink-0 items-center gap-2 border-b border-[#EEF0F3] bg-white px-3">
            <PanelLeft className="h-3 w-3 text-[#334155]" strokeWidth={1.75} />
            <span className="rounded-[6px] border border-[#E2E8F0] px-2 py-[2px] text-[8.5px] font-medium">{title}</span>
            <div className="relative ml-auto">
              <Bell className="h-3.5 w-3.5 text-[#475569]" strokeWidth={1.75} />
              {notifications > 0 && (
                <motion.span
                  key={notifications}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-2 -top-1.5 grid h-3 min-w-3 place-items-center rounded-full bg-[#EF4444] px-[3px] text-[6.5px] font-bold text-white"
                >
                  {notifications}
                </motion.span>
              )}
            </div>
          </header>
          <div className="@container relative min-h-0 flex-1 overflow-hidden px-3 pb-3 pt-3">{children}</div>
        </div>
      </div>
      </div>
    </div>
  );
}

/** Tasto flottante AI del gestionale (in basso a destra). */
export function AiFab() {
  return (
    <span className="absolute bottom-3 right-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-[#3B82F6] text-white shadow-[0_8px_20px_rgba(59,130,246,.45)]">
      <Sparkles className="h-3.5 w-3.5" />
    </span>
  );
}

/** Cursore finto che si sposta sui punti della demo. */
export function FakeCursor({ x, y, click = false }: { x: string; y: string; click?: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute z-30"
      animate={{ left: x, top: y }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg width="16" height="18" viewBox="0 0 16 18" className="drop-shadow-[0_2px_3px_rgba(0,0,0,.3)]">
        <path d="M1 1l5.5 15 2.2-6.3L15 7.5z" fill="#0F172A" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
      {click && (
        <motion.span
          key={`${x}-${y}`}
          className="absolute -left-2 -top-2 h-5 w-5 rounded-full border-2 border-[#3B82F6]"
          initial={{ scale: 0.3, opacity: 1 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        />
      )}
    </motion.div>
  );
}
