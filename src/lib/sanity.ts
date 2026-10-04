import { createClient, type SanityClient } from "@sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import type { ImageMetadata } from "astro";
import content from "@/data/content.json";
import { SANITY_DATASET, SANITY_PROJECT_ID } from "@/data/sanity";
import { image } from "@/lib/images";

/*
 * Treści z Sanity są pobierane wyłącznie podczas budowania strony — przeglądarka dostaje
 * gotowy HTML, bez JavaScriptu. Po publikacji zmian w Sanity strona przebudowuje się sama
 * (webhook → GitHub Actions, patrz README).
 */

const projectId = import.meta.env.SANITY_PROJECT_ID || SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET || SANITY_DATASET;

export const sanityEnabled = Boolean(projectId);

const client: SanityClient | null = sanityEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2025-01-01",
      useCdn: false,
      perspective: "published",
    })
  : null;

const imageBuilder = sanityEnabled ? createImageUrlBuilder({ projectId, dataset }) : null;

/** Zapytanie z pamięcią podręczną na czas jednego builda (te same dane na wielu stronach). */
const cache = new Map<string, Promise<unknown>>();
function query<T>(groq: string): Promise<T> {
  if (!client) throw new Error("Sanity nie jest skonfigurowane");
  if (!cache.has(groq)) cache.set(groq, client.fetch<T>(groq));
  return cache.get(groq) as Promise<T>;
}

// ---------- Ustawienia strony ----------

type Phone = { href: string; label: string };

export type SiteSettings = {
  phones: { office: Phone; management: Phone; technical: Phone };
  emails: { office: string; management: string; technical: string };
  address: { street: string; postalCode: string; city: string };
  openingHours: string;
  licenseNumber: string;
  nip: string;
};

type RawSettings = typeof content.settings;

function phone(label: string): Phone {
  const digits = label.replace(/[^\d+]/g, "");
  const intl = digits.startsWith("+") ? digits : `+48${digits}`;
  return { href: `tel:${intl}`, label };
}

function toSettings(raw: RawSettings): SiteSettings {
  return {
    phones: {
      office: phone(raw.phones.office),
      management: phone(raw.phones.management),
      technical: phone(raw.phones.technical),
    },
    emails: raw.emails,
    address: raw.address,
    openingHours: raw.openingHours,
    licenseNumber: raw.licenseNumber,
    nip: raw.nip,
  };
}

/** Puste pola w Sanity zastępujemy wartościami domyślnymi, żeby strona nigdy nie miała dziur. */
function withDefaults<T extends object>(defaults: T, value: Partial<T> | null | undefined): T {
  const out = { ...defaults } as Record<string, unknown>;
  for (const [key, v] of Object.entries(value ?? {})) {
    const d = (defaults as Record<string, unknown>)[key];
    if (v === null || v === undefined || v === "") continue;
    out[key] = d && typeof d === "object" && typeof v === "object" ? withDefaults(d, v) : v;
  }
  return out as T;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!sanityEnabled) return toSettings(content.settings);
  const raw = await query<Partial<RawSettings> | null>(
    `*[_id == "siteSettings"][0]{phones, emails, address, openingHours, licenseNumber, nip}`,
  );
  return toSettings(withDefaults(content.settings, raw));
}

// ---------- Listy ----------

export async function getCommunities(): Promise<string[]> {
  if (!sanityEnabled) return content.communities;
  return query<string[]>(
    `*[_type == "community" && defined(name)] | order(order asc, name asc).name`,
  );
}

export type PriceItem = { name: string; price: string; note?: string };

export async function getPricing(): Promise<PriceItem[]> {
  if (!sanityEnabled) return content.pricing;
  return query<PriceItem[]>(`*[_type == "priceItem"] | order(order asc){name, price, note}`);
}

// ---------- Galeria ----------

export type GalleryCategory = "praca" | "realizacje";

/** Zdjęcie z Sanity (CDN) albo lokalne (src/assets, optymalizowane przez Astro). */
export type GalleryPhoto =
  | { kind: "sanity"; alt: string; src: string; srcset: string; width: number; height: number }
  | { kind: "local"; alt: string; src: ImageMetadata };

type RawGalleryImage = {
  alt: string;
  category: GalleryCategory;
  image: SanityImageSource & {
    asset?: { metadata?: { dimensions?: { width: number; height: number } } };
  };
};

const WIDTHS = [480, 800, 1200, 1600];

function sanityPhoto(raw: RawGalleryImage): GalleryPhoto {
  const dims = raw.image.asset?.metadata?.dimensions ?? { width: 1600, height: 1200 };
  const url = (w: number) =>
    imageBuilder!.image(raw.image).width(w).fit("max").auto("format").quality(72).url();
  const widths = WIDTHS.filter((w) => w < dims.width).concat(Math.min(dims.width, 1600));
  return {
    kind: "sanity",
    alt: raw.alt,
    src: url(1200),
    srcset: [...new Set(widths)].map((w) => `${url(w)} ${w}w`).join(", "),
    width: dims.width,
    height: dims.height,
  };
}

export async function getGallery(category: GalleryCategory): Promise<GalleryPhoto[]> {
  if (!sanityEnabled) {
    return content.gallery
      .filter((g) => g.category === category)
      .map((g) => ({ kind: "local", alt: g.alt, src: image(g.file) }));
  }
  const raw = await query<RawGalleryImage[]>(
    `*[_type == "galleryImage" && defined(image.asset)] | order(order asc){
      alt, category, image{..., asset->{_id, metadata{dimensions}}}
    }`,
  );
  return raw.filter((r) => r.category === category).map(sanityPhoto);
}
