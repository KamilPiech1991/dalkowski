import { defineArrayMember, defineField, defineType, type FieldDefinition } from "sanity";

/*
 * Klocki do budowy stron. Każde pole jest opcjonalne: puste pole na stronie zastępuje
 * domyślna treść z src/data/pages.json, więc nic nie zniknie przez przypadek.
 */

export const text = (name: string, title: string, description?: string) =>
  defineField({ name, title, description, type: "string" });

export const longText = (name: string, title: string, description?: string) =>
  defineField({ name, title, description, type: "text", rows: 3 });

export const rich = (name: string, title: string) => defineField({ name, title, type: "richText" });

export const photo = (name: string, title: string) =>
  defineField({ name, title, type: "imageWithAlt" });

export const points = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [defineArrayMember({ type: "string" })],
  });

export const section = (name: string, title: string, fields: FieldDefinition[]) =>
  defineField({ name, title, type: "object", options: { collapsible: true }, fields });

/** Lista zdjęć — każde musi mieć wgrany plik. */
export const photos = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [
      defineArrayMember({
        type: "imageWithAlt",
        validation: (r) =>
          r.custom((v: { image?: { asset?: unknown } } | undefined) =>
            v?.image?.asset ? true : "Wgraj zdjęcie albo usuń ten element.",
          ),
      }),
    ],
  });

/** Lista elementów (np. kart) o podanych polach. */
export const items = (
  name: string,
  title: string,
  itemTitle: string,
  fields: FieldDefinition[],
  previewField = "title",
) =>
  defineField({
    name,
    title,
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        name: "item",
        title: itemTitle,
        fields,
        preview: { select: { title: previewField } },
      }),
    ],
  });

/** Dokument-strona (singleton) z zakładkami „Treść” i „SEO”. */
export const page = (name: string, title: string, fields: FieldDefinition[]) =>
  defineType({
    name,
    title,
    type: "document",
    groups: [
      { name: "content", title: "Treść", default: true },
      { name: "seo", title: "SEO" },
    ],
    fields: [
      ...fields.map((f) => ({ ...f, group: "content" })),
      defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
    ],
    preview: { prepare: () => ({ title }) },
  });

export const hero = (fields: FieldDefinition[]) => section("hero", "Nagłówek strony", fields);
