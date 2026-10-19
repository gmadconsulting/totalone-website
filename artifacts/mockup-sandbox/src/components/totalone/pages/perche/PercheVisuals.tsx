/**
 * Illustrazioni della pagina "Perché Totalone".
 * Schemi astratti (nessuna interfaccia): convergenza delle aree e
 * sequenza delle fasi del flusso, nell'ordine del glossario.
 */
import { motion, useReducedMotion } from "framer-motion";
import { tpEase, useLoopSteps } from "@/components/totalone/motion-kit";

/* ------------------------------------------------------------------ */
/* HERO — le aree convergono in un unico sistema                      */
/* ------------------------------------------------------------------ */

const convergenceLabels = ["CRM", "PREVENTIVI", "TRATTATIVE", "COMMESSE", "MAGAZZINO", "MONTAGGI", "ASSISTENZA"];

export function ConvergenceVisual() {
  const reduce = useReducedMotion();
  const points = convergenceLabels.map((label, i) => {
    const a = (i / convergenceLabels.length) * Math.PI * 2 - Math.PI / 2;
    return { label, x: 50 + Math.cos(a) * 40, y: 50 + Math.sin(a) * 40 };
  });

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]" role="img" aria-label="Le aree di Totalone convergono in un unico sistema">
      <motion.div aria-hidden className="absolute inset-[14%] rounded-full border border-white/15" animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} />
      <div aria-hidden className="absolute inset-[30%] rounded-full bg-[#9fe0ff]/15 blur-2xl" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden>
        {points.map((p, i) => (
          <g key={p.label}>
            <motion.line
              x1={p.x}
              y1={p.y}
              x2={50}
              y2={50}
              stroke="rgba(159,224,255,.6)"
              strokeWidth={0.45}
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.4 + i * 0.12, ease: tpEase }}
            />
            {!reduce && (
              <motion.circle
                r={0.9}
                fill="#9fe0ff"
                initial={{ cx: p.x, cy: p.y, opacity: 0 }}
                animate={{ cx: [p.x, 50], cy: [p.y, 50], opacity: [0, 1, 0] }}
                transition={{ duration: 2.2, delay: 1.4 + i * 0.37, repeat: Infinity, repeatDelay: 0.6, ease: "easeIn" }}
              />
            )}
          </g>
        ))}
      </svg>
      {points.map((p, i) => (
        <motion.span
          key={p.label}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: tpEase }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          <motion.span
            animate={reduce ? undefined : { y: [0, i % 2 ? 5 : -5, 0] }}
            transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex whitespace-nowrap rounded-full border border-white/25 bg-white/10 px-2.5 py-1.5 text-[10px] font-bold tracking-[0.08em] text-white backdrop-blur-md sm:px-3 sm:text-[11px]"
          >
            {p.label}
          </motion.span>
        </motion.span>
      ))}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.9, ease: tpEase }}
        className="absolute left-1/2 top-1/2 w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-[26px] bg-white p-4 text-center text-[#102744] shadow-[0_30px_80px_rgba(2,20,60,.45)] sm:p-5"
      >
        <span className="block text-[9px] font-bold tracking-[0.14em] text-[#557090] sm:text-[10px]">UN UNICO</span>
        <strong className="mt-1 block text-xl font-bold tracking-[-0.06em] sm:text-3xl">totalone</strong>
        <small className="mt-1 block text-[9px] leading-tight text-[#557090] sm:text-[11px]">un modo condiviso di lavorare</small>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CICLO DI VITA — le fasi si accendono una dopo l'altra              */
/* ------------------------------------------------------------------ */

export function LifecycleRail({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  const [ref, step] = useLoopSteps(items.length + 2, 1000, !reduce);
  const lit = reduce ? items.length - 1 : Math.min(step, items.length - 1);
  return (
    <div ref={ref}>
      <div className="relative hidden h-[2px] rounded-full bg-white/15 lg:block">
        <motion.div className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,#9fe0ff,#f36b4d)]" animate={{ width: `${((lit + 0.5) / items.length) * 100}%` }} transition={{ duration: 0.7, ease: tpEase }} />
      </div>
      <ol aria-label="Le fasi del flusso Totalone, in ordine" className="mt-0 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:mt-6 lg:grid-cols-8">
        {items.map((item, i) => {
          const on = i <= lit;
          return (
            <li key={item}>
              <motion.div
                animate={{ backgroundColor: on ? "rgba(255,255,255,.14)" : "rgba(255,255,255,.04)", borderColor: on ? "rgba(159,224,255,.55)" : "rgba(255,255,255,.12)" }}
                transition={{ duration: 0.5 }}
                className="h-full rounded-[20px] border px-4 py-4"
              >
                <span className={`font-mono text-[11px] font-bold transition-colors duration-500 ${on ? "text-[#9fe0ff]" : "text-white/60"}`}>{String(i + 1).padStart(2, "0")}</span>
                <strong className={`mt-2 block text-[13px] font-bold tracking-[0.04em] transition-colors duration-500 ${on ? "text-white" : "text-white/70"}`}>{item}</strong>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
