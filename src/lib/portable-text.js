// Minimalny Portable Text (format tekstu sformatowanego w Sanity): akapity z pogrubieniem
// i kursywą. Wspólny dla strony (render do HTML podczas builda) i skryptu seed
// (studio/scripts/build-seed.mjs), który zamienia domyślne treści na bloki Sanity.

/**
 * @typedef {{ _type: "span"; _key?: string; text: string; marks?: string[] }} Span
 * @typedef {{ _type: "block"; _key?: string; style?: string; children: Span[]; markDefs?: unknown[] }} Block
 */

/**
 * Akapity zapisane jako tekst z `**pogrubieniem**` → bloki Portable Text.
 * @param {string[]} paragraphs
 * @param {string} [keyPrefix]
 * @returns {Block[]}
 */
export function stringsToBlocks(paragraphs, keyPrefix = "p") {
  return paragraphs.map((text, i) => ({
    _type: "block",
    _key: `${keyPrefix}${i}`,
    style: "normal",
    markDefs: [],
    children: text
      .split(/(\*\*[^*]+\*\*)/)
      .filter(Boolean)
      .map((part, j) => {
        const bold = part.startsWith("**") && part.endsWith("**");
        return {
          _type: "span",
          _key: `${keyPrefix}${i}s${j}`,
          text: bold ? part.slice(2, -2) : part,
          marks: bold ? ["strong"] : [],
        };
      }),
  }));
}

/** @param {string} s */
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const MARK_TAGS = /** @type {Record<string, string>} */ ({ strong: "strong", em: "em" });

/**
 * Bloki Portable Text → HTML (`<p>` na akapit). Obsługiwane tylko pogrubienie i kursywa;
 * pozostałe elementy są pomijane.
 * @param {Block[]} blocks
 * @returns {string}
 */
export function blocksToHtml(blocks) {
  return blocks
    .filter((b) => b && b._type === "block")
    .map((b) => {
      const inner = (b.children ?? [])
        .map((span) => {
          let html = escapeHtml(span.text ?? "").replace(/\n/g, "<br>");
          for (const mark of span.marks ?? []) {
            const tag = MARK_TAGS[mark];
            if (tag) html = `<${tag}>${html}</${tag}>`;
          }
          return html;
        })
        .join("");
      return inner.trim() ? `<p>${inner}</p>` : "";
    })
    .join("");
}
