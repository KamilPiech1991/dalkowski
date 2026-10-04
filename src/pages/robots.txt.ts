import type { APIRoute } from "astro";
import { link } from "@/lib/url";

export const GET: APIRoute = ({ site }) =>
  new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${new URL(link("/sitemap.xml"), site).href}\n`,
    {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    },
  );
