import { defineField, defineType } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Zdjęcie w galerii",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Zdjęcie",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "alt",
      title: "Opis zdjęcia",
      description: "Wyświetlany pod zdjęciem i czytany przez Google oraz czytniki ekranu.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Sekcja galerii",
      type: "string",
      options: {
        list: [
          { title: "Z naszej codziennej pracy", value: "praca" },
          { title: "Realizacje i obiekty referencyjne", value: "realizacje" },
        ],
        layout: "radio",
      },
      initialValue: "praca",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Kolejność",
      description: "Mniejsza liczba = wyżej w galerii.",
      type: "number",
      initialValue: 100,
    }),
  ],
  orderings: [{ title: "Kolejność", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "alt", media: "image", subtitle: "category" } },
});
