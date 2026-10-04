import type { APIRoute } from "astro";
import { link } from "@/lib/url";

// Opis strony dla asystentów AI (https://llmstxt.org) — linki uwzględniają podkatalog strony.
export const GET: APIRoute = () =>
  new Response(
    `# Dalkowski — Zarządzanie Nieruchomościami i Technika Grzewcza

> Rodzinna firma z Piaseczna (od 2006 r.) świadząca usługi zarządzania wspólnotami mieszkaniowymi oraz autoryzowany serwis kotłów gazowych centralnego ogrzewania marki De Dietrich.

Obszar działania: Piaseczno, Konstancin-Jeziorna, Józefosław, Warszawa i okolice.
Właścicielka: Barbara Dalkowska — licencja zawodowa zarządcy nr 23367, polisa OC 50 000 €.
Kontakt: +48 574 988 293 (biuro — umawianie wizyt, wszystkie usługi), +48 793 720 760 (zarządzanie nieruchomościami), +48 730 704 502 (technika grzewcza, hydraulika, elektryka, złota rączka), adm.dalkowski@gmail.com (biuro/administracja), barbaradalkowska@gmail.com (zarządzanie), dalkowskiroman@gmail.com (kotły gazowe, konserwacja).
Adres: ul. Armii Krajowej 2, 05-500 Piaseczno.

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
