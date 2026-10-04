/** Ścieżka strony bez `.html` i końcowego `/` (przy `build.format: "file"`). */
export function cleanPath(pathname: string): string {
  return pathname.replace(/(\/index)?\.html$/, "").replace(/\/$/, "") || "/";
}
