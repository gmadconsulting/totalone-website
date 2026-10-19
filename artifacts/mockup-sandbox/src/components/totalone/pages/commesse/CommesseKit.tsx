/**
 * Piccoli elementi di impaginazione condivisi dalle pagine "Gestione commesse"
 * e "Margini di commessa" (stile della nuova homepage).
 */
import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Reveal, WordReveal, tpEase } from "@/components/totalone/motion-kit";
import { uiFont } from "@/components/totalone/app-ui";

/** Apre la modale demo del MarketingShell (bottone nell'header). */
import { openDemo } from "@/components/mockups/totalone-site-architecture/_shared/MarketingShell";
export const openShellDemo = openDemo;

export function Tag({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "coral" | "amber" | "dark" | "green" }) {
  const tones = {
    blue: "bg-[#dcecff] text-[#0b55c6]",
    coral: "bg-[#ffdcd2] text-[#a33a22]",
    amber: "bg-[#fff2dd] text-[#8a4f0f]",
    dark: "bg-[#2b75cb] text-[#e8f5ff]",
    green: "bg-[#dcf5e8] text-[#047857]",
  };
  return (
    <Reveal y={10}>
      <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold tracking-[0.04em] ${tones[tone]}`}>{children}</span>
    </Reveal>
  );
}

export function DemoButton({ children = "Prenota una demo", light = false }: { children?: ReactNode; light?: boolean }) {
  return (
    <motion.button
      type="button"
      onClick={openShellDemo}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-bold transition-colors duration-200 ${
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

export function GhostLink({ href, children, dark = false }: { href: string; children: ReactNode; dark?: boolean }) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${
        dark
          ? "border-white/40 text-white hover:bg-white/10 focus-visible:outline-white"
          : "border-[#a8c9ec] bg-white text-[#0b55c6] hover:bg-[#eaf4ff] focus-visible:outline-[#1769d5]"
      }`}
    >
      {children}
    </a>
  );
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#0b55c6] hover:text-[#b93f23] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1769d5]">
      {children} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

export const wrap = "mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10";
export const h2Class = "text-[2.6rem] font-bold leading-[.95] tracking-[-0.065em] text-[#102744] sm:text-6xl lg:text-[4.2rem]";

/** Titolo di sezione: tag + H2 con WordReveal (+ parte accentata) + testo. */
export function SectionHead({
  tag,
  tone = "blue",
  title,
  accent,
  body,
  center = false,
  dark = false,
  className = "",
}: {
  tag: string;
  tone?: "blue" | "coral" | "amber" | "dark" | "green";
  title: string;
  accent?: string;
  body?: ReactNode;
  center?: boolean;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <Tag tone={tone}>{tag}</Tag>
      <h2 className={`mt-6 ${h2Class} ${dark ? "!text-white" : ""}`}>
        <WordReveal text={title} />
        {accent && (
          <>
            <br />
            <WordReveal text={accent} className={dark ? "text-[#9fe0ff]" : "text-[#0b55c6]"} delay={0.2} />
          </>
        )}
      </h2>
      {body && (
        <Reveal delay={0.1}>
          <div className={`mt-6 space-y-3 text-base leading-7 sm:text-lg sm:leading-8 ${dark ? "text-[#d5ebff]" : "text-[#557090]"} ${center ? "mx-auto max-w-2xl" : "max-w-xl"}`}>{body}</div>
        </Reveal>
      )}
    </div>
  );
}

/** Pillole statiche (campi, stati, filtri). */
export function Chips({ items, tone = "blue" }: { items: readonly string[]; tone?: "blue" | "coral" | "amber" | "white" }) {
  const tones = {
    blue: "border-[#cfe1f4] bg-white text-[#245b96]",
    coral: "border-[#f6c9bd] bg-white text-[#a33a22]",
    amber: "border-[#f3dcb4] bg-[#fffaf0] text-[#8a4f0f]",
    white: "border-white/25 bg-white/10 text-white",
  };
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <motion.span
          key={item}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: tpEase, delay: i * 0.04 }}
          className={`inline-flex rounded-full border px-3.5 py-2 text-xs font-semibold ${tones[tone]}`}
        >
          {item}
        </motion.span>
      ))}
    </div>
  );
}

/** Mockup che si raddrizza in prospettiva mentre entra in viewport (come l'hero della homepage). */
export function PerspectiveMockup({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, 0]);
  return (
    <div ref={ref} className={`relative [perspective:1600px] ${className}`}>
      <motion.div style={{ rotateX, scale, y, transformOrigin: "center top" }} className="relative">
        {children}
      </motion.div>
    </div>
  );
}

/** Etichetta fluttuante sopra un mockup (solo desktop). */
export function FloatingNote({ children, className, delay = 1, float = 10 }: { children: ReactNode; className: string; delay?: number; float?: number }) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: [0, float, 0] }}
      transition={{ opacity: { delay, duration: 0.6 }, scale: { delay, duration: 0.6, ease: tpEase }, y: { delay, duration: 6, repeat: Infinity, ease: "easeInOut" } }}
      className={`absolute z-20 items-center gap-3 rounded-[18px] bg-white/95 py-3 pl-3 pr-5 shadow-[0_18px_44px_rgba(4,30,80,.28)] ring-1 ring-white backdrop-blur ${className}`}
      style={uiFont}
    >
      {children}
    </motion.div>
  );
}

/** Pannello colorato che fa da "passe-partout" ai mockup. */
export const panelTone = {
  blue: "bg-[radial-gradient(circle_at_20%_10%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#dcecff,#c9e1ff)]",
  coral: "bg-[radial-gradient(circle_at_80%_10%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#ffe9e1,#ffd9cc)]",
  amber: "bg-[radial-gradient(circle_at_20%_90%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#fff2dd,#ffe4b8)]",
  green: "bg-[radial-gradient(circle_at_80%_90%,#ffffff_0%,transparent_45%),linear-gradient(135deg,#e3f6ec,#cdeedd)]",
} as const;
