// Buduje seed.ndjson z obecnych treści strony (src/data/content.json) i zdjęć z src/assets/.
// Import: `sanity dataset import seed.ndjson production --missing` — dokumenty, które już
// istnieją w Sanity (te same _id), są pomijane, więc ponowne uruchomienie niczego nie nadpisze.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const content = JSON.parse(readFileSync(path.join(root, "src/data/content.json"), "utf8"));

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
    image: {
      _type: "image",
      _sanityAsset: `image@file://${path.join(root, "src/assets", g.file)}`,
    },
  })),
];

writeFileSync(
  path.join(here, "../seed.ndjson"),
  docs.map((d) => JSON.stringify(d)).join("\n") + "\n",
);
console.log(`seed.ndjson: ${docs.length} dokumentów`);
