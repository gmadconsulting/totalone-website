import { company } from "./company";

export type LeadInput = {
  name: string;
  email: string;
  company?: string;
  message?: string;
};

export type LeadResult =
  /** Inviato davvero all'endpoint (risposta 2xx). */
  | { status: "sent" }
  /** Nessun endpoint: è stato aperto il client di posta con il messaggio precompilato. */
  | { status: "mailto"; email: string }
  /** Invio non riuscito o nessun canale configurato. */
  | { status: "error"; reason: "network" | "unconfigured" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Validazione semplice di un indirizzo email. */
export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

/**
 * Endpoint per i lead (compatibile Formspree: POST JSON, risposta 2xx = ok).
 * Si imposta con la variabile d'ambiente `VITE_LEAD_ENDPOINT` in fase di build.
 */
export function leadEndpoint(): string | undefined {
  const value = (import.meta.env.VITE_LEAD_ENDPOINT as string | undefined)?.trim();
  return value ? value : undefined;
}

/**
 * Invia una richiesta demo. Non restituisce mai "sent" se l'invio non è
 * avvenuto davvero.
 */
export async function submitLead(input: LeadInput): Promise<LeadResult> {
  const page = typeof window !== "undefined" ? window.location.pathname + window.location.search : "";
  const payload = {
    name: input.name.trim(),
    email: input.email.trim(),
    company: input.company?.trim() || "",
    message: input.message?.trim() || "",
    page,
    _subject: "Richiesta demo dal sito Totalone",
  };

  const endpoint = leadEndpoint();
  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      return res.ok ? { status: "sent" } : { status: "error", reason: "network" };
    } catch {
      return { status: "error", reason: "network" };
    }
  }

  if (company.contactEmail) {
    const body = [
      `Nome: ${payload.name}`,
      `Email: ${payload.email}`,
      payload.company && `Azienda / showroom: ${payload.company}`,
      payload.message && `Messaggio: ${payload.message}`,
      `Pagina: ${payload.page}`,
    ]
      .filter(Boolean)
      .join("\n");
    const href = `mailto:${company.contactEmail}?subject=${encodeURIComponent(payload._subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    return { status: "mailto", email: company.contactEmail };
  }

  return { status: "error", reason: "unconfigured" };
}
