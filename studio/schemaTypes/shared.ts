import { defineArrayMember, defineField, defineType } from "sanity";

/** Meta tagi strony (wyniki Google, podgląd linku). */
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł strony (meta title)",
      description: "Tytuł w karcie przeglądarki i w wynikach Google.",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Opis strony (meta description)",
      description: "Krótki opis pod tytułem w wynikach Google (najlepiej do ok. 160 znaków).",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "keywords",
      title: "Słowa kluczowe",
      description: "Oddzielone przecinkami.",
      type: "string",
    }),
  ],
});

/** Zdjęcie z opisem (alt). */
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Zdjęcie",
  type: "object",
  fields: [
    defineField({ name: "image", title: "Zdjęcie", type: "image", options: { hotspot: true } }),
    defineField({
      name: "alt",
      title: "Opis zdjęcia",
      description: "Czytany przez Google oraz czytniki ekranu.",
      type: "string",
      validation: (r) =>
        r.custom((alt, ctx) => {
          const parent = ctx.parent as { image?: { asset?: unknown } } | undefined;
          return parent?.image?.asset && !alt ? "Dodaj opis zdjęcia." : true;
        }),
    }),
  ],
  preview: { select: { title: "alt", media: "image" } },
});

/** Tekst z akapitami, pogrubieniem i kursywą. */
export const richText = defineType({
  name: "richText",
  title: "Tekst sformatowany",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [{ title: "Akapit", value: "normal" }],
      lists: [],
      marks: {
        decorators: [
          { title: "Pogrubienie", value: "strong" },
          { title: "Kursywa", value: "em" },
        ],
        annotations: [],
      },
    }),
  ],
});
