import { ArrowRight } from "lucide-react";
import { MarketingShell, ShellButton } from "@/components/mockups/totalone-site-architecture/_shared/MarketingShell";
import { productNav, routes } from "./siteRoutes";
import { useSeo } from "./useSeo";

/** Pagina 404 del sito pubblico (noindex, senza canonical). */
export default function NotFound() {
  useSeo({
    title: "Pagina non trovata",
    description: "La pagina che cercavi non esiste o è stata spostata.",
    path: typeof window !== "undefined" ? window.location.pathname : "/",
    noindex: true,
    canonical: false,
  });

  return (
    <MarketingShell overlayHeader>
      <section className="relative overflow-hidden bg-[linear-gradient(116deg,#082c68_0%,#0d56bf_60%,#1162d6_100%)] pb-20 pt-32 text-white sm:pb-24 sm:pt-40">
        <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#cfe8ff]">Errore 404</p>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.5rem,6vw,4.8rem)] font-bold leading-[1] tracking-[-0.06em] [text-wrap:balance]">Questa pagina non esiste.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#f0f7ff]">Il link potrebbe essere vecchio o contenere un errore. Riparti dalla home o scegli un'area del prodotto qui sotto.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ShellButton href={routes.home} light>Torna alla home</ShellButton>
            <ShellButton href={routes.risorse} ghost>Vai alle risorse</ShellButton>
          </div>
        </div>
      </section>
      <section className="bg-[#fbfdff] py-16 sm:py-20" aria-labelledby="notfound-prodotto">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <h2 id="notfound-prodotto" className="text-3xl font-bold tracking-[-0.05em] text-[#102744] sm:text-4xl">Il prodotto</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {productNav.map((group) => (
              <div key={group.verb} className="rounded-[24px] border border-[#dbe8f5] bg-white p-5">
                <p className="text-sm font-bold uppercase tracking-[0.1em] text-[#0b55c6]">{group.verb}</p>
                <ul className="mt-3 space-y-1">
                  {group.links.map((l) => (
                    <li key={l.key}>
                      <a href={routes[l.key]} className="group flex items-center justify-between rounded-[12px] px-3 py-2 text-[14px] font-semibold text-[#245b96] hover:bg-[#eef5fd] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769d5]">
                        {l.label}
                        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
