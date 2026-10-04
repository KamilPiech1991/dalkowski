import type { ImageMetadata } from "astro";

const images = import.meta.glob<ImageMetadata>("/src/assets/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

/** Zdjęcie z `src/assets/` po nazwie pliku, np. `image("photo-7150.jpg")`. */
export function image(name: string): ImageMetadata {
  const img = images[`/src/assets/${name}`];
  if (!img) throw new Error(`Brak zdjęcia src/assets/${name}`);
  return img;
}
