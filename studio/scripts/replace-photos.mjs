// Jednorazowa zmiana treści w Sanity: zamienia wybrane zdjęcia na stronach i usuwa je z galerii.
// Uruchamiana przez workflow „Sanity: zamiana zdjęć” (wymaga SANITY_AUTH_TOKEN z uprawnieniem
// Editor). DRY_RUN=1 tylko wypisuje planowane zmiany.
//
// Stare zdjęcia rozpoznajemy po skrócie SHA-1 pliku (Sanity zapisuje go w assecie), więc
// skrypt zmienia tylko te miejsca, w których nadal jest stare zdjęcie — jeśli ktoś podmienił
// je już w Studio, zostaje nietknięte. Ponowne uruchomienie niczego nie psuje.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.resolve(here, "../../src/assets");

/** Usunięte zdjęcia (pliki nie istnieją już w repozytorium — stąd zapisane skróty). */
export const OLD = {
  "heating-boiler.jpg": "620f7dc77774358e4efb6179f88fdfcc5457fdc1",
  "gallery-3.jpg": "8642cdc69a3af3a08ef0707ae139297d4a292e1f",
  "konserwacja-hero.jpg": "56488013998094c98f1d1739e3cbf4d2cc28578b",
  "photo-7165.jpg": "b97cf32a5ac4b7f3643056680c13343188acc25c",
};

/** Co na którą stronę wstawić w miejsce starego zdjęcia. */
export const REPLACEMENTS = [
  {
    doc: "homePage",
    from: "heating-boiler.jpg",
    to: "photo-1000055862.jpg",
    alt: "Obsługa techniczna Dalkowski — prace przy instalacji w węźle cieplnym budynku",
  },
  {
    doc: "heatingPage",
    from: "gallery-3.jpg",
    to: "photo-1000055872.jpg",
    alt: "Serwis instalacji hydraulicznej — wymiana odmulacza w kotłowni budynku",
  },
  {
    doc: "heatingPage",
    from: "heating-boiler.jpg",
    to: "photo-1000055867.jpg",
    alt: "Konserwator Dalkowski podczas przeglądu instalacji w kotłowni",
  },
  {
    doc: "maintenancePage",
    from: "konserwacja-hero.jpg",
    to: "photo-1000055867.jpg",
    alt: "Konserwator Dalkowski podczas przeglądu instalacji w kotłowni wspólnoty",
  },
  {
    doc: "maintenancePage",
    from: "gallery-3.jpg",
    to: "photo-1000055862.jpg",
    alt: "Obsługa techniczna Dalkowski — prace przy instalacji w węźle cieplnym budynku",
  },
  {
    doc: "managementPage",
    from: "photo-7165.jpg",
    to: "photo-1000055873.jpg",
    alt: "Wspólnota Nieruchomości Wilanowska 11A z lokalami usługowymi",
  },
];

const isObject = (v) => typeof v === "object" && v !== null && !Array.isArray(v);

/** Wszystkie miejsca w dokumencie, gdzie stoi zdjęcie z podanym assetem (ścieżki Sanity). */
export function findImages(value, assetId, base = "") {
  if (Array.isArray(value)) {
    return value.flatMap((item, i) =>
      findImages(item, assetId, `${base}[${item?._key ? `_key=="${item._key}"` : i}]`),
    );
  }
  if (!isObject(value)) return [];
  if (isObject(value.image) && value.image.asset?._ref === assetId) return [base];
  return Object.entries(value)
    .filter(([key]) => !key.startsWith("_"))
    .flatMap(([key, v]) => findImages(v, assetId, base ? `${base}.${key}` : key));
}

/**
 * Plan zmian (czysta funkcja — bez dostępu do sieci).
 * @param {Array<Record<string, any>>} docs strony (opublikowane i szkice) oraz zdjęcia galerii
 * @param {Record<string, string>} assetIdByFile identyfikatory assetów Sanity po nazwie pliku
 */
export function plan(docs, assetIdByFile) {
  const patches = [];
  const deletes = [];
  for (const doc of docs) {
    const baseId = doc._id.replace(/^drafts\./, "");
    if (doc._type === "galleryImage") {
      const old = Object.keys(OLD).find((f) => assetIdByFile[f] === doc.image?.asset?._ref);
      if (old) deletes.push({ id: doc._id, file: old });
      continue;
    }
    const set = {};
    for (const r of REPLACEMENTS.filter((r) => r.doc === baseId)) {
      const from = assetIdByFile[r.from];
      const to = assetIdByFile[r.to];
      if (!from || !to) continue;
      for (const p of findImages(doc, from)) {
        set[`${p}.image`] = { _type: "image", asset: { _type: "reference", _ref: to } };
        set[`${p}.alt`] = r.alt;
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

  // Identyfikatory assetów: stare po zapisanych skrótach, nowe po skrótach plików z repo
  // (brakujące nowe zdjęcia wgrywamy).
  const newFiles = [...new Set(REPLACEMENTS.map((r) => r.to))];
  const hashes = { ...OLD, ...Object.fromEntries(newFiles.map((f) => [f, sha1(f)])) };
  const found = await client.fetch(
    `*[_type == "sanity.imageAsset" && sha1hash in $h]{_id, sha1hash}`,
    { h: Object.values(hashes) },
  );
  const assetIdByFile = {};
  for (const [file, hash] of Object.entries(hashes)) {
    const asset = found.find((a) => a.sha1hash === hash);
    if (asset) assetIdByFile[file] = asset._id;
  }
  for (const file of newFiles) {
    if (assetIdByFile[file]) continue;
    if (dryRun) {
      assetIdByFile[file] = `image-(do wgrania)-${file}`;
      continue;
    }
    const asset = await client.assets.upload("image", readFileSync(path.join(assetsDir, file)), {
      filename: file,
    });
    assetIdByFile[file] = asset._id;
    console.log(`Wgrano ${file} → ${asset._id}`);
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
  for (const d of deletes) console.log(`Galeria: usuwam ${d.id} (${d.file})`);
  if (!patches.length && !deletes.length) {
    console.log("Nic do zmiany — stare zdjęcia nie występują już w Sanity.");
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
