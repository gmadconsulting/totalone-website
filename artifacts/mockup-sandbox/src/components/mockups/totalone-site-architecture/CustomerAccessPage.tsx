import { ArrowLeft } from "lucide-react";
import { MarketingShell } from "./_shared/MarketingShell";

export function CustomerAccessPage() {
  return (
    <MarketingShell
      active="Area clienti"
      eyebrow="ACCESSO CLIENTI"
      title="Lavori già con Totalone?"
      description="L’area clienti è distinta dal sito pubblico e richiede l’accesso all’app Totalone."
    >
      <main>
        <section className="to-section">
          <div className="to-wrap">
            <div className="to-card" style={{ maxWidth: 760, margin: "0 auto", padding: 36 }}>
              <span className="to-eyebrow coral">AREA RISERVATA</span>
              <h2 className="to-section-title">L’accesso non è attivo in questa anteprima.</h2>
              <p className="to-section-lead">
                Questa anteprima contiene le pagine pubbliche di Totalone, non l’app clienti.
                Non inserire credenziali qui.
              </p>
              <a className="to-button" href="/">
                <ArrowLeft size={15} /> Torna al sito
              </a>
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}