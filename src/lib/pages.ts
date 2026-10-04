import pages from "@/data/pages.json";
import { blocksToHtml, stringsToBlocks } from "@/lib/portable-text.js";
import {
  hasSanityAsset,
  localPhoto,
  query,
  sanityEnabled,
  sanityPhoto,
  type Photo,
} from "@/lib/sanity";

/*
 * Treści podstron. Każda strona to osobny dokument (singleton) w Sanity o _id równym kluczowi
 * z src/data/pages.json. Puste pola w Sanity — albo brak dokumentu — są uzupełniane domyślną
 * treścią z pages.json, więc strona nigdy nie ma dziur.
 *
 * Konwencje w pages.json:
 *   { "_rich": ["akapit z **pogrubieniem**", …] }  → tekst sformatowany (HTML)
 *   { "image": "plik.jpg", "alt": "…" }             → zdjęcie (Photo)
 */

type Pages = typeof pages;
export type PageKey = keyof Pages;

type RichDefault = { _rich: string[] };
type ImageDefault = { image: string; alt: string };

/** Typ treści po scaleniu: tekst sformatowany → HTML, zdjęcie → Photo. */
export type Resolved<T> = T extends RichDefault
  ? string
  : T extends ImageDefault
    ? Photo
    : T extends readonly (infer U)[]
      ? Resolved<U>[]
      : T extends object
        ? { [K in keyof T]: Resolved<T[K]> }
        : T;

export type PageContent<K extends PageKey> = Resolved<Pages[K]>;

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);
const isRich = (v: unknown): v is RichDefault => isObject(v) && Array.isArray(v._rich);
const isImage = (v: unknown): v is ImageDefault =>
  isObject(v) && typeof v.image === "string" && typeof v.alt === "string";
const filled = (v: unknown) => (typeof v === "string" ? v.trim() !== "" : v != null);

function resolve(def: unknown, value: unknown): unknown {
  if (isRich(def)) {
    const blocks = Array.isArray(value) && value.length ? value : stringsToBlocks(def._rich);
    return blocksToHtml(blocks);
  }
  if (isImage(def)) {
    const v = isObject(value) ? value : {};
    const alt = filled(v.alt) ? String(v.alt) : def.alt;
    return hasSanityAsset(v.image) ? sanityPhoto(v.image, alt) : localPhoto(def.image, alt);
  }
  if (Array.isArray(def)) {
    if (!Array.isArray(value) || value.length === 0) return def.map((d) => resolve(d, undefined));
    // Elementy dodane w Sanity ponad domyślną listę dostają domyślny kształt pierwszego elementu.
    return value
      .map((item, i) => resolve(def[i] ?? def[0], item))
      .filter((item) => (typeof item === "string" ? item.trim() !== "" : true));
  }
  if (isObject(def)) {
    const v = isObject(value) ? value : {};
    return Object.fromEntries(Object.entries(def).map(([k, d]) => [k, resolve(d, v[k])]));
  }
  return filled(value) ? value : def;
}

/** Treść strony: dokument z Sanity scalony z domyślną treścią z pages.json. */
export async function getPage<K extends PageKey>(key: K): Promise<PageContent<K>> {
  const doc = (await sanityEnabled())
    ? await query<Record<string, unknown> | null>(`*[_id == "${key}"][0]`)
    : null;
  return resolve(pages[key], doc) as PageContent<K>;
}
