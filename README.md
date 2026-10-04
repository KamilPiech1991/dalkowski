# Dalkowski — strona internetowa

Strona firmy Dalkowski (zarządzanie nieruchomościami, konserwacja i technika grzewcza),
zbudowana w [Astro](https://astro.build) + Tailwind CSS 4. Strona jest w pełni statyczna:
czysty HTML i CSS, **bez JavaScriptu w przeglądarce** (menu mobilne to `<details>`, paralaksa w
hero to animacja CSS sterowana scrollem, formularz kontaktowy to zwykły formularz `mailto:`).

**Adres strony (tymczasowo, GitHub Pages):** https://kamilpiech1991.github.io/dalkowski/

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
    sitemap.xml.ts, robots.txt.ts, llms.txt.ts
  layouts/BaseLayout.astro  # <head>, meta SEO/OG, JSON-LD, nagłówek i stopka
  components/               # Header, Footer, Logo, Img, PageHero, Breadcrumb
  data/site.ts              # telefony, e-maile, menu, sitemap, dane firmy (JSON-LD)
  assets/                   # wszystkie zdjęcia i logo (Astro generuje AVIF/WebP)
  styles.css                # kolory marki i style globalne (Tailwind)
public/                     # pliki serwowane 1:1 (og-image.png)
```

Dane kontaktowe i menu zmienia się w jednym miejscu: `src/data/site.ts`.

### Dodawanie zdjęć

Wrzuć plik do `src/assets/` i użyj go w stronie:

```astro
---
import Img from "@/components/Img.astro";
import { image } from "@/lib/images";
---

<Img src={image("nowe-zdjecie.jpg")} alt="Opis zdjęcia" class="rounded-2xl" />
```

Astro samo przygotuje wersje AVIF/WebP w kilku rozmiarach.

## Linki wewnętrzne

Strona na GitHub Pages działa w podkatalogu `/dalkowski/`, dlatego linki wewnętrzne zawsze
buduje się helperem `link()` — wtedy działają też po przeniesieniu na własną domenę:

```astro
---
import { link } from "@/lib/url";
---

<a href={link("/kontakt")}>Kontakt</a>
```

## Wdrożenie

### GitHub Pages (obecnie)

Workflow `.github/workflows/deploy.yml` buduje stronę i publikuje ją na GitHub Pages po każdym
pushu do `main`. Jednorazowo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

### Własny serwer (docelowo)

Zbuduj stronę z adresem docelowej domeny i wgraj zawartość `dist/` na serwer (np. do
`public_html`). Każda podstrona to katalog z `index.html`, więc nie trzeba konfigurować
przekierowań.

```sh
SITE_URL=https://www.twoja-domena.pl BASE_PATH=/ npm run build
```
