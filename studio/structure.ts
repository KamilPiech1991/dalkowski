import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Treści")
    .items([
      S.listItem()
        .title("Ustawienia strony")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.documentTypeListItem("galleryImage").title("Galeria"),
      S.documentTypeListItem("community").title("Administrowane wspólnoty"),
      S.documentTypeListItem("priceItem").title("Cennik — technika grzewcza"),
    ]);
