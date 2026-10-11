import type { Social } from "@/content/schemas";

/** "2024-25" → "2024–25" (en dash, as the rest of the site writes academic years). */
export function batchYear(id: string): string {
  return id.replace("-", "–");
}

/** Labelled links for a person. Empty email is omitted: never show a guessed address. */
export function personSocials(p: { email?: string; linkedin?: string; github?: string }): Social[] {
  const out: Social[] = [];
  if (p.email)
    out.push({ id: "email", label: "Email", handle: p.email, href: `mailto:${p.email}` });
  if (p.linkedin)
    out.push({ id: "linkedin", label: "LinkedIn", handle: "LinkedIn", href: p.linkedin });
  if (p.github) out.push({ id: "github", label: "GitHub", handle: "GitHub", href: p.github });
  return out;
}
