// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Docelowy adres strony — używany w canonical, og:url, sitemap.xml i robots.txt.
// Ustaw zmienną SITE_URL przy buildzie, gdy strona trafi na własną domenę.
const site = process.env.SITE_URL ?? "https://dalkowski.lovable.app";

export default defineConfig({
  site,
  trailingSlash: "never",
  build: {
    format: "file",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
