import type { APIRoute } from "astro";
import { SITEMAP } from "@/data/site";
import { link } from "@/lib/url";

export const GET: APIRoute = ({ site }) => {
  const urls = SITEMAP.map(
    (e) =>
      `  <url>\n    <loc>${new URL(link(e.path), site).href}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
};
