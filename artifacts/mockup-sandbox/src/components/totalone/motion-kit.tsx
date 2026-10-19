import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/** Ease del gestionale (design pack): cubic-bezier(0.16, 1, 0.3, 1). */
export const tpEase = [0.16, 1, 0.3, 1] as const;

/** Fade + slide-up all'ingresso in viewport, come `.tp-page-enter`. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.8, ease: tpEase, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Contenitore che fa entrare i figli `StaggerItem` uno dopo l'altro. */
export function Stagger({
  children,
  className,
  gap = 0.07,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 22, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: tpEase } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Titolo che si compone parola per parola (stile Apple). */
export function WordReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-top">
          <motion.span
            className="inline-block"
            variants={{
              hidden: reduce ? { y: 0 } : { y: "105%" },
              show: { y: 0, transition: { duration: 0.75, ease: tpEase } },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Testo che si "accende" mentre scorri (Apple, pagine prodotto). */
export function ScrollLitText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <LitWord key={`${word}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </LitWord>
      ))}
    </p>
  );
}

function LitWord({
  children,
  progress,
  range,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

/** Numero che conta fino al valore quando entra in viewport. */
export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1.6,
  decimals = 0,
  className,
  play,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
  /** Se passato, controlla l'avvio al posto della viewport. */
  play?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const value = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  const shouldPlay = play ?? inView;

  useEffect(() => {
    if (!shouldPlay) {
      value.set(0);
      setDisplay(format(0, decimals));
      return;
    }
    const controls = animate(value, to, {
      duration,
      ease: tpEase,
      onUpdate: (v) => setDisplay(format(v, decimals)),
    });
    return () => controls.stop();
  }, [shouldPlay, to, duration, decimals, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function format(v: number, decimals: number) {
  return v.toLocaleString("it-IT", { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: "always" } as unknown as Intl.NumberFormatOptions);
}

/** Nastro infinito orizzontale. */
export function Marquee({ children, speed = 40, className }: { children: ReactNode; speed?: number; className?: string }) {
  return (
    <div className={`group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] ${className ?? ""}`}>
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className="flex shrink-0 items-center gap-3 pr-3 [animation:tp-marquee_var(--d)_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:[animation:none]"
          style={{ ["--d" as string]: `${speed}s` }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

/**
 * Scandisce gli step di un'animazione a loop, solo quando l'elemento è visibile.
 * Restituisce [ref, step].
 */
export function useLoopSteps(steps: number, interval = 1400, active = true) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15%" });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView || !active) return;
    if (reduce) {
      setStep(steps - 1);
      return;
    }
    const id = window.setInterval(() => setStep((s) => (s + 1) % steps), interval);
    return () => window.clearInterval(id);
  }, [inView, active, reduce, steps, interval]);

  return [ref, step, setStep] as const;
}

/** Card che si inclina leggermente seguendo il mouse (hover 3D morbido). */
export function TiltCard({ children, className, max = 6 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onMouseMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        animate(ry, px * max, { duration: 0.4, ease: tpEase });
        animate(rx, -py * max, { duration: 0.4, ease: tpEase });
      }}
      onMouseLeave={() => {
        animate(rx, 0, { duration: 0.6, ease: tpEase });
        animate(ry, 0, { duration: 0.6, ease: tpEase });
      }}
    >
      {children}
    </motion.div>
  );
}

/** Alone luminoso che segue il cursore dentro la card (Attio). */
export function SpotlightCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -400, y: -400 });
  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className ?? ""}`}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (r) setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseLeave={() => setPos({ x: -400, y: -400 })}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{ background: `radial-gradient(360px circle at ${pos.x}px ${pos.y}px, rgba(59,130,246,.10), transparent 60%)` }}
      />
      {children}
    </div>
  );
}
