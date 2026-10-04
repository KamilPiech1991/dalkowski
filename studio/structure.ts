import type { StructureResolver } from "sanity/structure";
import { PAGES } from "./schemaTypes";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Treści")
    .items([
      S.listItem()
        .title("Strony")
        .id("pages")
        .child(
          S.list()
            .title("Strony")
            .items(
              PAGES.map(({ name, title }) =>
                S.listItem()
                  .title(title)
                  .id(name)
                  .child(S.document().schemaType(name).documentId(name).title(title)),
              ),
            ),
        ),
      S.listItem()
        .title("Ustawienia strony")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.documentTypeListItem("galleryImage").title("Galeria"),
      S.documentTypeListItem("community").title("Administrowane wspólnoty"),
      S.documentTypeListItem("priceItem").title("Cennik — technika grzewcza"),
    ]);
