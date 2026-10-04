import { defineField, defineType } from "sanity";

export const priceItem = defineType({
  name: "priceItem",
  title: "Pozycja cennika",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Usługa", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "price",
      title: "Cena",
      description: "np. „350 zł netto” albo „wycena indywidualna”",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "note", title: "Opis", type: "text", rows: 3 }),
    defineField({ name: "order", title: "Kolejność", type: "number", initialValue: 100 }),
  ],
  orderings: [{ title: "Kolejność", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "price" } },
});
