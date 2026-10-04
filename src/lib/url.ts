const BASE = import.meta.env.BASE_URL.replace(/\/?$/, "/");

/**
 * Link wewnętrzny z uwzględnieniem podkatalogu strony (`base` w astro.config.mjs),
 * np. `link("/o-nas")` → `/dalkowski/o-nas/` na GitHub Pages albo `/o-nas/` na własnej domenie.
 */
export function link(path: string): string {
  const p = path.replace(/^\//, "");
  const isFile = /\.[a-z0-9]+$/i.test(p);
  return BASE + (p && !isFile && !p.endsWith("/") ? `${p}/` : p);
}
