// Jednorazowe porządki w Sanity po usunięciu zdjęć ze strony (src/data/removed-photos.json):
// podmienia je na stronach na zdjęcia domyślne z src/data/pages.json i usuwa z galerii.
// Uruchamiana przez workflow „Sanity: zamiana zdjęć” (wymaga SANITY_AUTH_TOKEN z uprawnieniem
// Editor). DRY_RUN=1 tylko wypisuje planowane zmiany.
//
// Strona i tak pomija usunięte zdjęcia przy budowaniu (src/lib/sanity.ts), więc ten skrypt
// nie jest warunkiem poprawnej strony — dzięki niemu panel Studio pokazuje to samo co strona.
// Zmienia tylko miejsca, w których nadal stoi usunięte zdjęcie (jeśli ktoś podmienił je już
// w Studio, zostaje nietknięte), więc ponowne uruchomienie niczego nie psuje.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(here, "../../src/data");
const assetsDir = path.resolve(here, "../../src/assets");
const readJson = (file) => JSON.parse(readFileSync(path.join(dataDir, file), "utf8"));

const removed = readJson("removed-photos.json").photos;
const pages = readJson("pages.json");

/** Które usunięte zdjęcie na której stronie zastępuje zdjęcie domyślne z pages.json (`at`). */
export const REPLACEMENTS = [
  { doc: "homePage", from: "hero-buildings.jpg", at: "hero.image" },
  { doc: "homePage", from: "heating-boiler.jpg", at: "whyUs.image" },

  { doc: "managementPage", from: "hero-buildings.jpg", at: "hero.image" },
  { doc: "managementPage", from: "photo-7165.jpg", at: "references.images.1" },
  { doc: "managementPage", from: "gallery-1.jpg", at: "references.images.2" },
  { doc: "managementPage", from: "gallery-4.jpg", at: "references.images.3" },
  { doc: "managementPage", from: "gallery-2.jpg", at: "sections.0.image" },

  { doc: "maintenancePage", from: "konserwacja-hero.jpg", at: "hero.image" },
  { doc: "maintenancePage", from: "gallery-1.jpg", at: "sections.0.image" },
  { doc: "maintenancePage", from: "gallery-3.jpg", at: "sections.1.image" },
  { doc: "maintenancePage", from: "gallery-5.jpg", at: "sections.2.image" },

  { doc: "heatingPage", from: "de-dietrich-kociol.png", at: "hero.image" },
  { doc: "heatingPage", from: "gallery-3.jpg", at: "services.0.image" },
  { doc: "heatingPage", from: "heating-boiler.jpg", at: "services.1.image" },
  { doc: "heatingPage", from: "gallery-6.jpg", at: "services.2.image" },
  { doc: "heatingPage", from: "gallery-5.jpg", at: "quality.image" },
];

const isObject = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
const sha1Of = (file) => {
  const entry = removed.find((p) => p.file === file);
  if (!entry) throw new Error(`Brak ${file} w removed-photos.json`);
  return entry.sha1;
};
const assetRef = (image) => image?.asset?._ref ?? image?.asset?._id ?? "";
const isRemoved = (image) => removed.some((p) => assetRef(image).startsWith(`image-${p.sha1}-`));

/** Zdjęcie domyślne ze strony (`pages.json`) wskazane ścieżką `at`. */
function defaultPhoto(doc, at) {
  const photo = at.split(".").reduce((node, key) => node?.[key], pages[doc]);
  if (!photo?.image || !photo?.alt) throw new Error(`pages.json: brak zdjęcia ${doc} → ${at}`);
  return photo;
}

/** Wszystkie miejsca w dokumencie, gdzie stoi zdjęcie z assetem o podanym skrócie SHA-1. */
export function findImages(value, sha1, base = "") {
  if (Array.isArray(value)) {
    return value.flatMap((item, i) =>
      findImages(item, sha1, `${base}[${item?._key ? `_key=="${item._key}"` : i}]`),
    );
  }
  if (!isObject(value)) return [];
  if (isObject(value.image) && assetRef(value.image).startsWith(`image-${sha1}-`)) return [base];
  return Object.entries(value)
    .filter(([key]) => !key.startsWith("_"))
    .flatMap(([key, v]) => findImages(v, sha1, base ? `${base}.${key}` : key));
}

/**
 * Plan zmian (czysta funkcja — bez dostępu do sieci).
 * @param {Array<Record<string, any>>} docs strony (opublikowane i szkice) oraz zdjęcia galerii
 * @param {Record<string, string>} assetIdByFile identyfikatory assetów Sanity nowych zdjęć po nazwie pliku
 */
export function plan(docs, assetIdByFile) {
  const patches = [];
  const deletes = [];
  for (const doc of docs) {
    const baseId = doc._id.replace(/^drafts\./, "");
    if (doc._type === "galleryImage") {
      if (isRemoved(doc.image)) deletes.push({ id: doc._id });
      continue;
    }
    const set = {};
    for (const r of REPLACEMENTS.filter((r) => r.doc === baseId)) {
      const photo = defaultPhoto(r.doc, r.at);
      const to = assetIdByFile[photo.image];
      if (!to) continue;
      for (const p of findImages(doc, sha1Of(r.from))) {
        set[`${p}.image`] = { _type: "image", asset: { _type: "reference", _ref: to } };
        set[`${p}.alt`] = photo.alt;
      }
    }
    if (Object.keys(set).length) patches.push({ id: doc._id, rev: doc._rev, set });
  }
  return { patches, deletes };
}

const sha1 = (file) =>
  createHash("sha1")
    .update(readFileSync(path.join(assetsDir, file)))
    .digest("hex");

async function main() {
  const { createClient } = await import("@sanity/client");
  const { projectId, dataset } = JSON.parse(
    readFileSync(path.join(here, "../sanity.project.json"), "utf8"),
  );
  const token = process.env.SANITY_AUTH_TOKEN;
  if (!token) throw new Error("Brak SANITY_AUTH_TOKEN");
  const dryRun = process.env.DRY_RUN === "1";
  const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: "2025-01-01",
    useCdn: false,
    perspective: "raw",
  });

  // Nowe zdjęcia: jeśli ich asset już jest w Sanity (po skrócie SHA-1 pliku) — używamy go,
  // w przeciwnym razie wgrywamy plik z src/assets.
  const newFiles = [...new Set(REPLACEMENTS.map((r) => defaultPhoto(r.doc, r.at).image))];
  const hashes = Object.fromEntries(newFiles.map((f) => [f, sha1(f)]));
  const found = await client.fetch(
    `*[_type == "sanity.imageAsset" && sha1hash in $h]{_id, sha1hash}`,
    { h: Object.values(hashes) },
  );
  const assetIdByFile = {};
  for (const [file, hash] of Object.entries(hashes)) {
    const asset = found.find((a) => a.sha1hash === hash);
    if (asset) {
      assetIdByFile[file] = asset._id;
    } else if (dryRun) {
      assetIdByFile[file] = `image-(do wgrania)-${file}`;
    } else {
      const uploaded = await client.assets.upload(
        "image",
        readFileSync(path.join(assetsDir, file)),
        { filename: file },
      );
      assetIdByFile[file] = uploaded._id;
      console.log(`Wgrano ${file} → ${uploaded._id}`);
    }
  }

  const pageIds = [...new Set(REPLACEMENTS.map((r) => r.doc))];
  const docs = await client.fetch(`*[_id in $ids || _type == "galleryImage"]`, {
    ids: pageIds.flatMap((id) => [id, `drafts.${id}`]),
  });
  const { patches, deletes } = plan(docs, assetIdByFile);

  for (const p of patches) {
    for (const [field, value] of Object.entries(p.set)) {
      if (field.endsWith(".image")) console.log(`${p.id}: ${field} → ${value.asset._ref}`);
    }
  }
  for (const d of deletes) console.log(`Galeria: usuwam ${d.id}`);
  if (!patches.length && !deletes.length) {
    console.log("Nic do zmiany — usuniętych zdjęć nie ma już w Sanity.");
    return;
  }
  if (dryRun) {
    console.log("DRY_RUN — nic nie zapisano.");
    return;
  }
  const tx = client.transaction();
  for (const p of patches) tx.patch(p.id, (patch) => patch.ifRevisionId(p.rev).set(p.set));
  for (const d of deletes) tx.delete(d.id);
  await tx.commit();
  console.log(`Zapisano: ${patches.length} stron(y), usunięto ${deletes.length} zdjęć z galerii.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
