import { defineField, defineType } from "sanity";

export const community = defineType({
  name: "community",
  title: "Administrowana wspólnota",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nazwa i adres",
      description: "np. WM Tenisowa 1, Józefosław",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Kolejność", type: "number", initialValue: 100 }),
  ],
  orderings: [{ title: "Kolejność", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name" } },
});
