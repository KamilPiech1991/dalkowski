# Dalkowski — strona internetowa

Strona firmy Dalkowski (zarządzanie nieruchomościami, konserwacja i technika grzewcza),
zbudowana w [Astro](https://astro.build) + Tailwind CSS 4. Generowana statycznie — wynik
builda (`dist/`) można wrzucić na dowolny hosting (Netlify, Cloudflare Pages, Vercel, zwykły
serwer).

## Uruchomienie

Wymagany Node.js 22.12+.

```sh
npm install
npm run dev        # serwer deweloperski: http://localhost:4321
npm run build      # build produkcyjny do dist/
npm run preview    # podgląd builda
npm run check      # sprawdzenie typów i plików .astro
```

## Struktura

```
src/
  pages/            # każda podstrona = plik .astro (routing po nazwie pliku)
    index.astro             → /
    o-nas.astro             → /o-nas
    uslugi/index.astro      → /uslugi
    uslugi/*.astro          → /uslugi/...
    galeria.astro           → /galeria
    kontakt.astro           → /kontakt
    sitemap.xml.ts, robots.txt.ts
  layouts/BaseLayout.astro  # <head>, meta SEO/OG, JSON-LD, nagłówek i stopka
  components/               # Header, Footer, Img, PageHero, Breadcrumb
  data/site.ts              # telefony, e-maile, menu, sitemap, dane firmy (JSON-LD)
  assets/                   # zdjęcia optymalizowane przez Astro (AVIF/WebP)
  assets/lovable/           # zdjęcia przeniesione z Lovable (patrz niżej)
  styles.css                # kolory marki i style globalne (Tailwind)
public/                     # pliki serwowane 1:1 (np. llms.txt)
```

Dane kontaktowe i menu zmienia się w jednym miejscu: `src/data/site.ts`.

## Adres strony (SEO)

Canonical, `og:url`, `sitemap.xml` i `robots.txt` budowane są z adresu ustawionego w
`astro.config.mjs`. Domyślnie to `https://dalkowski.lovable.app` — przy wdrożeniu na własną
domenę ustaw zmienną środowiskową, np.:

```sh
SITE_URL=https://www.twoja-domena.pl npm run build
```

## Zdjęcia z Lovable

Część zdjęć (logo, zdjęcia wspólnot, portret, kocioł De Dietrich) była wgrana do Lovable —
w repo są tylko manifesty `src/assets/lovable/*.asset.json`, a pliki leżą na serwerze Lovable.
Dopóki ich nie pobierzesz, strona linkuje do nich na `dalkowski.lovable.app`.

Aby przenieść je do repo (zalecane przed wyłączeniem projektu w Lovable):

```sh
npm run assets:fetch
git add src/assets/lovable && git commit -m "Pobierz zdjęcia z Lovable"
```

Po pobraniu Astro automatycznie zacznie je optymalizować (AVIF/WebP, responsywne rozmiary).
