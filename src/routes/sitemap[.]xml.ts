import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

const paths = [
  { path: "/", priority: "1.0", changefreq: "weekly" as const },
  { path: "/o-nas", priority: "0.8", changefreq: "monthly" as const },
  { path: "/uslugi", priority: "0.8", changefreq: "monthly" as const },
  { path: "/uslugi/zarzadzanie-nieruchomosciami", priority: "0.9", changefreq: "monthly" as const },
  { path: "/uslugi/konserwacja-nieruchomosci", priority: "0.9", changefreq: "monthly" as const },
  { path: "/uslugi/technika-grzewcza", priority: "0.9", changefreq: "monthly" as const },
  { path: "/galeria", priority: "0.6", changefreq: "monthly" as const },
  { path: "/kontakt", priority: "0.7", changefreq: "yearly" as const },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = paths.map((e) => `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`);
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
