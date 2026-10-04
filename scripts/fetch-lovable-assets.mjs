// Pobiera zdjęcia wgrane wcześniej do Lovable (w repo są tylko manifesty
// `src/assets/lovable/*.asset.json`) i zapisuje je obok manifestów. Po pobraniu
// Astro zacznie je optymalizować lokalnie (AVIF/WebP) zamiast linkować do Lovable.
//
// Użycie: npm run assets:fetch   (opcjonalnie: LOVABLE_ORIGIN=https://... npm run assets:fetch)
import { readdir, readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";

const origin = process.env.LOVABLE_ORIGIN ?? "https://dalkowski.lovable.app";
const dir = path.resolve("src/assets/lovable");

const manifests = (await readdir(dir)).filter((f) => f.endsWith(".asset.json"));
let failed = 0;

for (const file of manifests) {
  const target = path.join(dir, file.replace(/\.asset\.json$/, ""));
  try {
    await access(target);
    console.log(`= ${path.basename(target)} (już jest)`);
    continue;
  } catch {}

  const { url } = JSON.parse(await readFile(path.join(dir, file), "utf8"));
  try {
    const res = await fetch(origin + url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(target, Buffer.from(await res.arrayBuffer()));
    console.log(`+ ${path.basename(target)}`);
  } catch (err) {
    failed++;
    console.error(`! ${path.basename(target)}: ${err.message}`);
  }
}

if (failed) {
  console.error(`\nNie udało się pobrać ${failed} plików.`);
  process.exit(1);
}
