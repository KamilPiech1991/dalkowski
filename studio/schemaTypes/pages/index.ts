import { hero, items, longText, page, photo, photos, points, rich, section, text } from "./fields";

/*
 * Strony serwisu — po jednym dokumencie (singleton) na stronę. Nazwy pól odpowiadają
 * kluczom w src/data/pages.json (tam są też treści domyślne).
 */

const titleAndDescription = [text("title", "Tytuł"), longText("description", "Opis")];

export const homePage = page("homePage", "Strona główna", [
  hero([
    text("badge", "Plakietka nad tytułem"),
    text("title", "Tytuł (początek)"),
    text("titleHighlight", "Tytuł (wyróżniona końcówka)", "Wyświetlana w kolorze firmowym."),
    longText("lead", "Wstęp"),
    text("primaryButton", "Przycisk główny (do kontaktu)"),
    text("secondaryButton", "Przycisk drugi (do usług)"),
    items(
      "stats",
      "Liczby",
      "Liczba",
      [text("value", "Wartość"), text("label", "Podpis")],
      "label",
    ),
    photo("image", "Zdjęcie"),
    text("badgeCardTitle", "Karta na zdjęciu — tytuł"),
    text("badgeCardText", "Karta na zdjęciu — tekst"),
  ]),
  section("pillars", "Sekcja „Co dla Ciebie zrobimy”", [
    text("eyebrow", "Nadtytuł"),
    text("title", "Tytuł"),
    longText("intro", "Wstęp"),
    section("management", "Karta: zarządzanie nieruchomościami", [
      ...titleAndDescription,
      points("points", "Punkty"),
    ]),
    section("heating", "Karta: technika grzewcza", [
      ...titleAndDescription,
      points("points", "Punkty"),
    ]),
  ]),
  section("whyUs", "Sekcja „Dlaczego my”", [
    text("eyebrow", "Nadtytuł"),
    text("title", "Tytuł"),
    longText("text", "Tekst"),
    photo("image", "Zdjęcie"),
    items("features", "Zalety", "Zaleta", titleAndDescription),
  ]),
  section("cta", "Sekcja kontaktowa na dole", [text("title", "Tytuł"), longText("text", "Tekst")]),
]);

export const aboutPage = page("aboutPage", "O nas", [
  hero([text("eyebrow", "Nadtytuł"), text("title", "Tytuł"), longText("lead", "Wstęp")]),
  photo("portrait", "Zdjęcie właścicielki"),
  section("licenseBox", "Ramka z licencją", [text("title", "Tytuł"), longText("text", "Tekst")]),
  section("owner", "O właścicielce", [text("title", "Tytuł"), rich("body", "Tekst")]),
  text(
    "communitiesTitle",
    "Tytuł listy wspólnot",
    "Same wspólnoty edytuje się w „Administrowane wspólnoty”.",
  ),
  section("heating", "Technika grzewcza", [text("title", "Tytuł"), rich("body", "Tekst")]),
]);

export const servicesPage = page("servicesPage", "Usługi", [
  hero([text("eyebrow", "Nadtytuł"), text("title", "Tytuł"), longText("lead", "Wstęp")]),
  section("management", "Karta: zarządzanie nieruchomościami", titleAndDescription),
  section("maintenance", "Karta: konserwacja nieruchomości", titleAndDescription),
  section("heating", "Karta: technika grzewcza", titleAndDescription),
]);

export const managementPage = page("managementPage", "Zarządzanie nieruchomościami", [
  hero([text("title", "Tytuł"), rich("lead", "Wstęp"), photo("image", "Zdjęcie")]),
  section("references", "Referencje", [
    text("eyebrow", "Nadtytuł"),
    text("title", "Tytuł"),
    photos("images", "Zdjęcia"),
  ]),
  items("sections", "Zakresy obsługi", "Zakres", [
    text("title", "Tytuł"),
    photo("image", "Zdjęcie"),
    points("points", "Punkty"),
  ]),
  section("cta", "Sekcja kontaktowa na dole", [
    text("title", "Tytuł"),
    longText("text", "Tekst"),
    photo("image", "Zdjęcie"),
  ]),
]);

export const maintenancePage = page("maintenancePage", "Konserwacja nieruchomości", [
  hero([
    text("eyebrow", "Nadtytuł"),
    text("title", "Tytuł"),
    rich("lead", "Wstęp"),
    points("badges", "Wyróżniki pod przyciskami"),
    photo("image", "Zdjęcie"),
  ]),
  section("intro", "Wprowadzenie", [text("title", "Tytuł"), longText("text", "Tekst")]),
  items("sections", "Rodzaje usług", "Usługa", [
    text("title", "Tytuł"),
    longText("intro", "Wstęp"),
    photo("image", "Zdjęcie"),
    points("points", "Punkty"),
  ]),
  section("cta", "Sekcja kontaktowa na dole", [text("title", "Tytuł"), longText("text", "Tekst")]),
]);

export const heatingPage = page("heatingPage", "Technika grzewcza", [
  hero([text("title", "Tytuł"), rich("lead", "Wstęp"), photo("image", "Zdjęcie")]),
  items("services", "Usługi", "Usługa", [...titleAndDescription, photo("image", "Zdjęcie")]),
  section("authorization", "Autoryzacja", [
    text("eyebrow", "Nadtytuł"),
    text("title", "Tytuł"),
    longText("text", "Tekst"),
    points("brands", "Marki"),
  ]),
  section("quality", "Deklaracja jakości", [
    text("eyebrow", "Nadtytuł"),
    text("title", "Tytuł"),
    photo("image", "Zdjęcie"),
    points("points", "Zasady"),
  ]),
  text(
    "pricingTitle",
    "Tytuł cennika",
    "Pozycje cennika edytuje się w „Cennik — technika grzewcza”.",
  ),
]);

export const contactPage = page("contactPage", "Kontakt", [
  hero([text("eyebrow", "Nadtytuł"), text("title", "Tytuł"), longText("lead", "Wstęp")]),
  section("office", "Karta: biuro", [text("title", "Tytuł"), longText("note", "Opis")]),
  section("management", "Karta: zarządzanie nieruchomościami", [
    text("title", "Tytuł"),
    longText("note", "Opis"),
  ]),
  section("technical", "Karta: kotły gazowe, hydraulika, elektryka", [
    text("title", "Tytuł"),
    longText("note", "Opis"),
  ]),
  section("form", "Formularz", [text("title", "Tytuł"), text("subtitle", "Podtytuł")]),
]);

export const galleryPage = page("galleryPage", "Galeria (strona)", [
  hero([text("eyebrow", "Nadtytuł"), text("title", "Tytuł"), longText("lead", "Wstęp")]),
  text("workTitle", "Tytuł sekcji „praca”"),
  text("referencesTitle", "Tytuł sekcji „realizacje”"),
]);

export const pageTypes = [
  homePage,
  aboutPage,
  servicesPage,
  managementPage,
  maintenancePage,
  heatingPage,
  contactPage,
  galleryPage,
];
