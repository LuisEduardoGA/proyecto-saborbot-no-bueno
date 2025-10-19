// lib/i18n/translate.ts
import { INGREDIENTS_EN_ES, MEASURE_EN_ES, TEXT_REPLACEMENTS } from "./glossary";

function normalize(s?: string | null) {
  return (s ?? "").toLowerCase().trim();
}

// Ordena frases largas primero (mejor para títulos/ingredientes compuestos)
const PHRASE_KEYS = Object.keys(INGREDIENTS_EN_ES).sort((a, b) => b.length - a.length);

export function translateIngredient(name: string): string {
  const raw = name || "";
  const key = normalize(raw);

  // 1) Reemplazo por frases (longest-first)
  let out = ` ${key} `;
  for (const k of PHRASE_KEYS) {
    const pattern = new RegExp(`(?<![a-z])${k}(?![a-z])`, "gi");
    if (pattern.test(out)) out = out.replace(pattern, INGREDIENTS_EN_ES[k]);
  }
  out = out.trim();

  // 2) Singular/plural simple si no cambió
  if (out === key) {
    const singular = key
      .replace(/(ies|ses|xes|zes|ches|shes)$/i, (s) => (s.toLowerCase() === "ies" ? "y" : s.slice(0, -2)))
      .replace(/s$/i, "");
    if (INGREDIENTS_EN_ES[singular]) out = INGREDIENTS_EN_ES[singular];
  }

  // 3) Tokeniza si sigue igual
  if (out === key) {
    const tokens = key.split(/[\s,/-]+/g).filter(Boolean).map(tok => INGREDIENTS_EN_ES[tok] ?? tok);
    out = tokens.join(" ");
  }

  const pretty = out.replace(/\s+/g, " ").trim();
  return pretty || raw;
}

export function translateMeasure(measure?: string | null): string | undefined {
  if (!measure) return undefined;
  let out = measure;
  for (const [en, es] of Object.entries(MEASURE_EN_ES)) {
    const re = new RegExp(`\\b${en}\\b`, "gi");
    out = out.replace(re, es);
  }
  out = out.replace(/\b(inch|inches)\b/gi, "pulgadas");
  out = out.replace(/\bcm\b/gi, "cm");
  return out;
}

export function translateTextBlock(en?: string | null): string | undefined {
  if (!en) return undefined;
  let out = en;
  for (const [re, repl] of TEXT_REPLACEMENTS) out = out.replace(re, repl);
  return out;
}

export function translateTitle(en?: string | null): string | undefined {
  if (!en) return undefined;
  let out = translateTextBlock(en) ?? en;
  let tmp = ` ${normalize(out)} `;
  for (const k of PHRASE_KEYS) {
    const re = new RegExp(`(?<![a-z])${k}(?![a-z])`, "gi");
    if (re.test(tmp)) tmp = tmp.replace(re, INGREDIENTS_EN_ES[k]);
  }
  // capitalización básica
  tmp = tmp.trim().replace(/\b([a-záéíóúñ])(\S*)/g, (m, a, b) => a.toUpperCase() + b);
  return tmp;
}
