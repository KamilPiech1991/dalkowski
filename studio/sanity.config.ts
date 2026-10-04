import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { plPLLocale } from "@sanity/locale-pl-pl";
import { projectId, dataset } from "./env";
import { schemaTypes, SINGLETONS } from "./schemaTypes";
import { structure } from "./structure";

export default defineConfig({
  name: "dalkowski",
  title: "Dalkowski — CMS",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool(), plPLLocale()],
  schema: {
    types: schemaTypes,
    // Ustawienia strony to jeden dokument — nie da się utworzyć drugiego.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      SINGLETONS.includes(schemaType)
        ? actions.filter(
            ({ action }) => action && ["publish", "discardChanges", "restore"].includes(action),
          )
        : actions,
  },
});
