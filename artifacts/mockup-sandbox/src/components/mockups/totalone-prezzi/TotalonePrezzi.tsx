import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  Check,
  ChevronDown,
  X,
} from "lucide-react";

const formatEuro = (value: number) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(value)));

function Logo() {
  return (
    <a href="/__mockup/preview/totalone-homepage/TotaloneHomepage" className="flex items-center gap-2.5 text-[#102744]">
      <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[#102744] text-white">
        <span className="h-3.5 w-3.5 rounded-full border-2 border-current" />
      </span>
      <span className="text-[18px] font-bold tracking-[-0.06em]">totalone</span>
    </a>
  );
}

function Field({
  label,
  hint,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between gap-3 text-sm font-bold text-[#183858]">
        {label}
        <span className="text-[10px] font-bold uppercase tracking-[.12em] text-[#7b91a8]">{hint}</span>
      </span>
      <span className="mt-3 flex items-center gap-3 rounded-[11px] border border-[#c8dcf3] bg-white px-4 py-3 focus-within:border-[#1769d5] focus-within:ring-2 focus-within:ring-[#1769d5]/15">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value) || min)}
          className="w-full bg-transparent text-lg font-bold text-[#102744] outline-none"
        />
        <span className="shrink-0 text-xs font-semibold text-[#7b91a8]">{hint}</span>
      </span>
    </label>
  );
}

function QuoteDialog({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#061a38]/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Richiedi un preventivo">
      <div className="relative w-full max-w-lg rounded-[20px] bg-[#fbfdff] p-6 shadow-2xl sm:p-9">
        <button onClick={onClose} className="absolute right-5 top-5 rounded-full p-2 text-[#557090] hover:bg-[#eaf3ff]" aria-label="Chiudi">
          <X className="h-5 w-5" />
        </button>
        {!sent ? (
          <>
            <span className="inline-flex rounded-full bg-[#dcecff] px-3 py-1.5 text-xs font-bold text-[#0b55c6]">CONFIGURAZIONE SU MISURA</span>
            <h2 className="mt-5 max-w-sm text-4xl font-bold leading-[1.02] tracking-[-0.06em] text-[#102744]">Parliamo della tua azienda.</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#557090]">Raccontaci struttura, showroom e modo di lavorare. Ti prepariamo un preventivo basato sulla configurazione reale, non su un listino generico.</p>
            <div className="mt-7 grid gap-3">
              <input className="rounded-[10px] border border-[#c8dcf3] bg-white px-4 py-3 text-sm outline-none placeholder:text-[#8aa3bd] focus:border-[#1769d5]" placeholder="Nome e cognome" />
              <input className="rounded-[10px] border border-[#c8dcf3] bg-white px-4 py-3 text-sm outline-none placeholder:text-[#8aa3bd] focus:border-[#1769d5]" placeholder="Email aziendale" type="email" />
              <input className="rounded-[10px] border border-[#c8dcf3] bg-white px-4 py-3 text-sm outline-none placeholder:text-[#8aa3bd] focus:border-[#1769d5]" placeholder="Azienda / showroom" />
              <button onClick={() => setSent(true)} className="mt-2 inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#f36b4d] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#ff8668]">
                Richiedi il preventivo <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#dcecff] text-[#1769d5]"><Check className="h-6 w-6" /></div>
            <h2 className="mt-5 text-4xl font-bold tracking-[-0.06em] text-[#102744]">Richiesta ricevuta.</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#557090]">Ti ricontatteremo per costruire insieme la configurazione più adatta alla tua azienda.</p>
            <button onClick={onClose} className="mt-7 rounded-[10px] border border-[#1769d5] px-5 py-3 text-sm font-bold text-[#0b55c6] hover:bg-[#eaf3ff]">Torna alla pagina</button>
          </div>
        )}
      </div>
    </div>
  );
}

export function TotalonePrezzi() {
  const [team, setTeam] = useState(8);
  const [hoursSaved, setHoursSaved] = useState(3);
  const [hourValue, setHourValue] = useState(32);
  const [projects, setProjects] = useState(14);
  const [averageMargin, setAverageMargin] = useState(1250);
  const [opportunityRate, setOpportunityRate] = useState(5);
  const [annualInvestment, setAnnualInvestment] = useState(0);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const result = useMemo(() => {
    const monthlyTimeValue = team * hoursSaved * hourValue * 4.3;
    const annualTimeValue = monthlyTimeValue * 12;
    const annualOpportunityValue = projects * averageMargin * (opportunityRate / 100) * 12;
    const annualBenefit = annualTimeValue + annualOpportunityValue;
    const roi = annualInvestment > 0 ? ((annualBenefit - annualInvestment) / annualInvestment) * 100 : null;
    const paybackMonths = annualInvestment > 0 && annualBenefit > 0 ? annualInvestment / (annualBenefit / 12) : null;
    return { annualTimeValue, annualOpportunityValue, annualBenefit, roi, paybackMonths };
  }, [annualInvestment, averageMargin, hourValue, hoursSaved, opportunityRate, projects, team]);

  return (
    <main className="min-h-[100dvh] bg-[#f4f9ff] text-[#102744]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <header className="border-b border-[#d9e8f6] bg-[#fbfdff]">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <Logo />
          <a href="/__mockup/preview/totalone-homepage/TotaloneHomepage" className="inline-flex items-center gap-2 text-sm font-bold text-[#245b96] hover:text-[#0b55c6]"><ArrowLeft className="h-4 w-4" /> Torna al sito</a>
        </div>
      </header>

      <section className="overflow-hidden bg-[linear-gradient(116deg,#082c68_0%,#0d56bf_57%,#1387ee_100%)] py-20 text-white sm:py-28">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-[#8ecbff] bg-[#5abaff]/20 px-3.5 py-2 text-xs font-bold tracking-[0.08em] text-[#eff8ff]">PREZZI · RITORNO SULL’INVESTIMENTO</span>
            <h1 className="mt-7 max-w-4xl text-[clamp(3rem,7vw,6.6rem)] font-bold leading-[.92] tracking-[-0.075em]">Il prezzo si costruisce sulla tua azienda.<br /><span className="text-[#9fe0ff]">Il ritorno, sulla tua operatività.</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#e5f3ff]">Totalone non ha un listino uguale per tutti. Qui puoi stimare il possibile valore recuperato quando informazioni, persone e commesse lavorano nello stesso sistema.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfdff] py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-start lg:gap-20">
            <div className="lg:sticky lg:top-8">
              <span className="inline-flex rounded-full bg-[#ffdcd2] px-3 py-1.5 text-xs font-bold text-[#c34d35]">CALCOLO INDICATIVO</span>
              <h2 className="mt-6 max-w-xl text-5xl font-bold leading-[.95] tracking-[-0.065em] sm:text-6xl">Quanto valore può tornare al tuo team?</h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-[#557090]">Il calcolo non assegna un prezzo a Totalone. Traduce in valore alcune leve operative: tempo recuperato, persone coinvolte e opportunità che il team può seguire meglio.</p>
              <div className="mt-8 rounded-[16px] border border-[#cfe1f4] bg-[#eef7ff] p-5">
                <div className="flex items-start gap-3"><Calculator className="mt-0.5 h-5 w-5 shrink-0 text-[#1769d5]" /><p className="text-sm leading-6 text-[#245b96]"><strong className="text-[#102744]">Il canone resta custom.</strong> Il preventivo finale viene costruito sulla configurazione concordata con la tua azienda.</p></div>
              </div>
            </div>

            <div className="rounded-[22px] border border-[#c4dcef] bg-[#eaf4ff] p-5 shadow-[0_20px_50px_rgba(7,62,137,.10)] sm:p-8">
              <div className="rounded-[17px] bg-white p-6 sm:p-8">
                <div className="flex items-start justify-between gap-5 border-b border-[#e1edf8] pb-6">
                  <div><p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#0b55c6]">LA TUA SITUAZIONE</p><h3 className="mt-2 text-2xl font-bold tracking-[-0.045em] text-[#102744]">Costruiamo un esempio</h3></div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[11px] bg-[#dcecff] text-[#1769d5]"><Calculator className="h-5 w-5" /></span>
                </div>
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <Field label="Persone coinvolte" hint="persone" value={team} min={1} max={100} onChange={setTeam} />
                  <Field label="Ore recuperate" hint="ore / settimana" value={hoursSaved} min={0} max={20} step={0.5} onChange={setHoursSaved} />
                  <Field label="Valore medio di un’ora" hint="€/ora" value={hourValue} min={10} max={250} onChange={setHourValue} />
                  <Field label="Commesse seguite" hint="al mese" value={projects} min={1} max={200} onChange={setProjects} />
                  <Field label="Margine medio" hint="€/commessa" value={averageMargin} min={0} max={100000} step={50} onChange={setAverageMargin} />
                  <Field label="Opportunità recuperate" hint="% prudenziale" value={opportunityRate} min={0} max={30} step={1} onChange={setOpportunityRate} />
                </div>
                <div className="mt-7 rounded-[15px] bg-[#082c68] p-6 text-white">
                  <div className="flex items-end justify-between gap-5"><div><p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#9fe0ff]">POSSIBILE VALORE ANNUO</p><p className="mt-2 text-xs text-[#d5ebff]">tempo + opportunità recuperate</p></div><strong className="text-4xl tracking-[-0.06em]">{formatEuro(result.annualBenefit)}</strong></div>
                  <div className="mt-6 grid gap-3 border-t border-[#3f78bd] pt-5 text-sm text-[#d5ebff]"><div className="flex justify-between gap-4"><span>Valore del tempo recuperato</span><strong className="text-white">{formatEuro(result.annualTimeValue)}</strong></div><div className="flex justify-between gap-4"><span>Valore opportunità recuperate</span><strong className="text-white">{formatEuro(result.annualOpportunityValue)}</strong></div></div>
                </div>
                <details className="mt-6 border-t border-[#e1edf8] pt-5"><summary className="flex cursor-pointer items-center justify-between text-sm font-bold text-[#245b96]">Inserisci il canone del tuo preventivo per approfondire <ChevronDown className="h-4 w-4" /></summary><div className="mt-4"><Field label="Investimento annuo concordato" hint="€/anno" value={annualInvestment} min={0} max={1000000} step={100} onChange={setAnnualInvestment} />{result.roi !== null && <div className="mt-5 grid gap-3 rounded-[12px] bg-[#f1f8ff] p-4 sm:grid-cols-2"><div><span className="text-[10px] font-bold uppercase tracking-[.1em] text-[#7b91a8]">ROI POTENZIALE</span><strong className="mt-1 block text-2xl text-[#0b55c6]">{result.roi.toFixed(0)}%</strong></div><div><span className="text-[10px] font-bold uppercase tracking-[.1em] text-[#7b91a8]">RITORNO STIMATO</span><strong className="mt-1 block text-2xl text-[#0b55c6]">{result.paybackMonths?.toFixed(1)} mesi</strong></div></div>}</div></details>
                <p className="mt-6 text-[11px] leading-5 text-[#8296ad]">È un modello orientativo, non una promessa di risultato. Le ipotesi vanno verificate sui tuoi dati reali e il prezzo di Totalone viene definito solo con un preventivo personalizzato.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#cfe1f4] bg-[#fffaf7] py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1000px] gap-10 px-5 sm:grid-cols-[.8fr_1.2fr] sm:px-8 lg:px-10">
          <div><span className="inline-flex rounded-full bg-[#dcecff] px-3 py-1.5 text-xs font-bold text-[#0b55c6]">LA PROPOSTA</span><h2 className="mt-5 text-4xl font-bold leading-[.95] tracking-[-0.06em] text-[#102744] sm:text-5xl">Niente listino generico.</h2></div>
          <div><p className="text-xl leading-8 text-[#254b72]">Il prezzo di Totalone viene definito sulla configurazione reale della tua azienda.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{["Struttura e showroom", "Persone e ruoli", "Moduli e processi", "Esigenze operative"].map((item) => <div key={item} className="flex items-center gap-3 rounded-[11px] border border-[#cfe1f4] bg-white px-4 py-3 text-sm font-bold text-[#245b96]"><Check className="h-4 w-4 text-[#1769d5]" />{item}</div>)}</div><button onClick={() => setQuoteOpen(true)} className="mt-8 inline-flex items-center gap-2 rounded-[10px] bg-[#f36b4d] px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(173,57,35,.2)] hover:bg-[#ff8668]">Richiedi il tuo preventivo <ArrowRight className="h-4 w-4" /></button></div>
        </div>
      </section>

      <footer className="bg-[#f4f9ff] py-10"><div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-4 px-5 text-xs font-semibold text-[#557090] sm:flex-row sm:px-8 lg:px-10"><span>© Totalone — il sistema operativo per l’arredamento</span><span>Prezzi personalizzati. Valore misurabile.</span></div></footer>
      {quoteOpen && <QuoteDialog onClose={() => setQuoteOpen(false)} />}
    </main>
  );
}