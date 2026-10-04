// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Adres, pod którym strona jest opublikowana — używany w canonical, og:url, sitemap.xml i
// robots.txt. Domyślnie GitHub Pages (https://kamilpiech1991.github.io/dalkowski/).
// Po przeniesieniu na własny serwer zbuduj stronę z np.:
//   SITE_URL=https://www.twoja-domena.pl BASE_PATH=/ npm run build
const site = process.env.SITE_URL ?? "https://kamilpiech1991.github.io";
const base = process.env.BASE_PATH ?? "/dalkowski";

export default defineConfig({
  site,
  base,
  trailingSlash: "always",
  build: {
    // Każda podstrona to katalog z index.html (/o-nas/index.html) — działa bez dodatkowej
    // konfiguracji na GitHub Pages, Apache, nginx i każdym innym hostingu plików.
    format: "directory",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
