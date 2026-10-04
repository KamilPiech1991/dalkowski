import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Ustawienia strony",
  type: "document",
  fields: [
    defineField({
      name: "phones",
      title: "Telefony",
      type: "object",
      fields: [
        defineField({
          name: "office",
          title: "Biuro",
          type: "string",
          validation: (r) => r.required(),
        }),
        defineField({ name: "management", title: "Zarządzanie nieruchomościami", type: "string" }),
        defineField({
          name: "technical",
          title: "Technika grzewcza / konserwacja",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "emails",
      title: "Adresy e-mail",
      type: "object",
      fields: [
        defineField({
          name: "office",
          title: "Biuro",
          type: "string",
          validation: (r) => r.required().email(),
        }),
        defineField({
          name: "management",
          title: "Zarządzanie nieruchomościami",
          type: "string",
          validation: (r) => r.email(),
        }),
        defineField({
          name: "technical",
          title: "Technika grzewcza / konserwacja",
          type: "string",
          validation: (r) => r.email(),
        }),
      ],
    }),
    defineField({
      name: "address",
      title: "Adres biura",
      type: "object",
      fields: [
        defineField({ name: "street", title: "Ulica", type: "string" }),
        defineField({ name: "postalCode", title: "Kod pocztowy", type: "string" }),
        defineField({ name: "city", title: "Miejscowość", type: "string" }),
      ],
    }),
    defineField({ name: "openingHours", title: "Godziny pracy", type: "string" }),
    defineField({ name: "licenseNumber", title: "Numer licencji zawodowej", type: "string" }),
    defineField({ name: "nip", title: "NIP", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Ustawienia strony" }) },
});
