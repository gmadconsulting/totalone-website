import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/totalone/motion-kit";
import { productNav, routes, type RouteKey } from "./siteRoutes";

/**
 * Fascia "processo" condivisa: sostituisce i blocchi di coda ripetuti nelle
 * pagine prodotto (Un unico flusso, Ecosistema, Perché Totalone…). Mostra i
 * 4 verbi con i moduli, evidenzia la pagina corrente e porta alle altre.
 */
export function ProcessoStrip({ current, title = "Ogni area è un passaggio dello stesso flusso." }: { current?: RouteKey; title?: string }) {
  return (
    <section className="bg-[#f4f9ff] py-20 sm:py-24" aria-labelledby="processo-title">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <Reveal y={14}>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0b55c6]">Il processo Totalone</p>
          <h2 id="processo-title" className="mt-3 max-w-2xl text-3xl font-bold leading-[1] tracking-[-0.055em] text-[#102744] sm:text-5xl">{title}</h2>
        </Reveal>
        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {productNav.map((group, i) => (
            <li key={group.verb} className="rounded-[26px] border border-[#dbe8f5] bg-white p-5">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#dcecff] font-mono text-[11px] font-bold text-[#0b55c6]">{i + 1}</span>
                <span className="text-sm font-bold uppercase tracking-[0.1em] text-[#102744]">{group.verb}</span>
              </div>
              <p className="mt-2 text-[13px] leading-5 text-[#557090]">{group.description}</p>
              <ul className="mt-4 space-y-1">
                {group.links.map((l) => {
                  const here = l.key === current;
                  return (
                    <li key={l.key}>
                      <a
                        href={routes[l.key]}
                        aria-current={here ? "page" : undefined}
                        className={`group flex items-center justify-between rounded-[12px] px-3 py-2 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769d5] ${here ? "bg-[#0b55c6] text-white" : "text-[#245b96] hover:bg-[#eef5fd]"}`}
                      >
                        {l.label}
                        {!here && <ArrowRight className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-x-0.5" />}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
