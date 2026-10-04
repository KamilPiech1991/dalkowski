import type { APIRoute } from "astro";
import { link } from "@/lib/url";
import { getSiteSettings } from "@/lib/sanity";

// Opis strony dla asystentów AI (https://llmstxt.org) — linki uwzględniają podkatalog strony.
export const GET: APIRoute = async () => {
  const { phones, emails, address, licenseNumber } = await getSiteSettings();
  return new Response(
    `# Dalkowski — Zarządzanie Nieruchomościami i Technika Grzewcza

> Rodzinna firma z Piaseczna (od 2006 r.) świadząca usługi zarządzania wspólnotami mieszkaniowymi oraz autoryzowany serwis kotłów gazowych centralnego ogrzewania marki De Dietrich.

Obszar działania: Piaseczno, Konstancin-Jeziorna, Józefosław, Warszawa i okolice.
Właścicielka: Barbara Dalkowska — licencja zawodowa zarządcy nr ${licenseNumber}, polisa OC 50 000 €.
Kontakt: ${phones.office.label} (biuro — umawianie wizyt, wszystkie usługi), ${phones.management.label} (zarządzanie nieruchomościami), ${phones.technical.label} (technika grzewcza, hydraulika, elektryka, złota rączka), ${emails.office} (biuro/administracja), ${emails.management} (zarządzanie), ${emails.technical} (kotły gazowe, konserwacja).
Adres: ${address.street}, ${address.postalCode} ${address.city}.

## Strony

- [Strona główna](${link("/")}): przegląd firmy, dwa filary działalności, kontakt awaryjny.
- [O nas](${link("/o-nas")}): historia firmy, Barbara Dalkowska, lista zarządzanych wspólnot, licencja zawodowa.
- [Usługi](${link("/uslugi")}): rozdzielnik do dwóch głównych usług.
- [Zarządzanie nieruchomościami](${link("/uslugi/zarzadzanie-nieruchomosciami")}): pełny zakres obsługi administracyjnej, księgowej i technicznej wspólnot.
- [Konserwacja nieruchomości](${link("/uslugi/konserwacja-nieruchomosci")}): usługa dodatkowa — hydraulika, elektryka, drobne prace budowlane, złota rączka, dostępność 24/7.
- [Technika grzewcza](${link("/uslugi/technika-grzewcza")}): serwis, przeglądy, instalacja kotłów gazowych, cennik, autoryzacja De Dietrich.
- [Galeria](${link("/galeria")}): zdjęcia zarządzanych osiedli i realizacji serwisowych.
- [Kontakt](${link("/kontakt")}): telefony, adresy e-mail, adres biura, godziny pracy, formularz z obowiązkowym wyborem tematu (Kotły gazowe / Administracja / Konserwacja techniczna).
`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
};
