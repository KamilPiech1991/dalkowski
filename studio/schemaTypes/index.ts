import { siteSettings } from "./siteSettings";
import { galleryImage } from "./galleryImage";
import { community } from "./community";
import { priceItem } from "./priceItem";
import { imageWithAlt, richText, seo } from "./shared";
import { pageTypes } from "./pages";

export const schemaTypes = [
  seo,
  imageWithAlt,
  richText,
  siteSettings,
  ...pageTypes,
  galleryImage,
  community,
  priceItem,
];

/** Dokumenty występujące tylko raz (ustawienia i strony) — bez „Utwórz nowy” i „Usuń”. */
export const PAGES = pageTypes.map((t) => ({ name: t.name, title: t.title ?? t.name }));
export const SINGLETONS = ["siteSettings", ...PAGES.map((p) => p.name)];
