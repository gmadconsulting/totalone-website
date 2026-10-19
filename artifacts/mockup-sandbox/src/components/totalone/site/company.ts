/**
 * Dati societari mostrati nel footer e usati dal modulo demo.
 * Vanno compilati con i dati reali prima della pubblicazione:
 * NON inventare valori. I campi vuoti vengono semplicemente omessi
 * (la riga legale mostra solo "© anno Totalone").
 */
export const company = {
  /** Nome commerciale. */
  brand: "Totalone",
  /** Ragione sociale completa, es. "Totalone S.r.l." */
  legalName: "",
  /** Partita IVA, es. "01234567890" (senza prefisso "P.IVA"). */
  vatNumber: "",
  /** Sede legale, es. "Via …, 00000 Città (XX)". */
  address: "",
  /** Email per le richieste demo (usata come fallback `mailto:` se manca l'endpoint). */
  contactEmail: "",
} as const;

/** Riga legale del footer: "© 2026 Totalone S.r.l. · P.IVA … · sede". */
export function legalLine(year = new Date().getFullYear()): string {
  const parts = [`© ${year} ${company.legalName || company.brand}`];
  if (company.vatNumber) parts.push(`P.IVA ${company.vatNumber}`);
  if (company.address) parts.push(company.address);
  return parts.join(" · ");
}
