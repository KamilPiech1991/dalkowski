// Buduje seed.ndjson z obecnych treści strony (src/data/content.json, src/data/pages.json)
// i zdjęć z src/assets/.
// Import: `sanity dataset import seed.ndjson production --missing` — dokumenty, które już
// istnieją w Sanity (te same _id), są pomijane, więc ponowne uruchomienie niczego nie nadpisze.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { stringsToBlocks } from "../../src/lib/portable-text.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const readJson = (file) => JSON.parse(readFileSync(path.join(root, "src/data", file), "utf8"));
const content = readJson("content.json");
const pages = readJson("pages.json");

const asset = (file) => ({
  _type: "image",
  _sanityAsset: `image@file://${path.join(root, "src/assets", file)}`,
});

const isObject = (v) => typeof v === "object" && v !== null && !Array.isArray(v);

/**
 * Domyślna treść strony (konwencje z src/lib/pages.ts) → pola dokumentu Sanity:
 * `{ _rich: [...] }` → bloki Portable Text, `{ image, alt }` → imageWithAlt z wgranym plikiem,
 * elementy list dostają `_key`, puste teksty są pomijane.
 */
function toSanity(value, key) {
  if (Array.isArray(value)) {
    return value.map((item, i) => {
      if (!isObject(item)) return item;
      const converted = toSanity(item, `${key}${i}`);
      return { _type: converted._type ?? "item", _key: `${key}${i}`, ...converted };
    });
  }
  if (!isObject(value)) return value;
  if (Array.isArray(value._rich)) return stringsToBlocks(value._rich, key);
  if (typeof value.image === "string") {
    return { _type: "imageWithAlt", image: asset(value.image), alt: value.alt };
  }
  return Object.fromEntries(
    Object.entries(value)
      .filter(([, v]) => v !== "")
      .map(([k, v]) => [k, toSanity(v, `${key}-${k}`.replace(/[^a-zA-Z0-9-]/g, ""))]),
  );
}

const slug = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

const docs = [
  { _id: "siteSettings", _type: "siteSettings", ...content.settings },
  ...content.communities.map((name, i) => ({
    _id: `community-${slug(name)}`,
    _type: "community",
    name,
    order: (i + 1) * 10,
  })),
  ...content.pricing.map((p, i) => ({
    _id: `priceItem-${slug(p.name)}`,
    _type: "priceItem",
    ...p,
    order: (i + 1) * 10,
  })),
  ...content.gallery.map((g, i) => ({
    _id: `galleryImage-${slug(g.file)}`,
    _type: "galleryImage",
    alt: g.alt,
    category: g.category,
    order: (i + 1) * 10,
    image: asset(g.file),
  })),
  ...Object.entries(pages).map(([name, page]) => ({
    _id: name,
    _type: name,
    ...toSanity(page, name),
  })),
];

writeFileSync(
  path.join(here, "../seed.ndjson"),
  docs.map((d) => JSON.stringify(d)).join("\n") + "\n",
);
console.log(`seed.ndjson: ${docs.length} dokumentów`);
