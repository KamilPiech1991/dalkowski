import type { ImageMetadata } from "astro";

/**
 * Część zdjęć była wgrana do Lovable i leży na ich serwerze — w repo jest tylko
 * manifest `*.asset.json`. Gdy obok manifestu leży pobrany plik (np.
 * `src/assets/lovable/photo-7150.jpg`, patrz `npm run assets:fetch`), używamy go
 * lokalnie i Astro go optymalizuje (AVIF/WebP). W przeciwnym razie linkujemy
 * do oryginału na serwerze Lovable.
 */
const LOVABLE_ORIGIN = "https://dalkowski.lovable.app";

type AssetManifest = { url: string; original_filename: string };

const manifests = import.meta.glob<AssetManifest>("/src/assets/lovable/*.asset.json", {
  eager: true,
  import: "default",
});

const downloaded = import.meta.glob<ImageMetadata>(
  "/src/assets/lovable/*.{jpg,jpeg,png,webp,avif}",
  { eager: true, import: "default" },
);

export type ImageSource = ImageMetadata | string;

export function lovableImage(name: string): ImageSource {
  const local = downloaded[`/src/assets/lovable/${name}`];
  if (local) return local;
  const manifest = manifests[`/src/assets/lovable/${name}.asset.json`];
  if (!manifest) throw new Error(`Brak obrazu Lovable: ${name}`);
  return LOVABLE_ORIGIN + manifest.url;
}

export function imageUrl(src: ImageSource): string {
  return typeof src === "string" ? src : src.src;
}
