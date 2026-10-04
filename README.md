# Dalkowski — strona internetowa

Strona firmy Dalkowski (zarządzanie nieruchomościami, konserwacja i technika grzewcza),
zbudowana w [Astro](https://astro.build) + Tailwind CSS 4. Strona jest w pełni statyczna:
czysty HTML i CSS, **bez JavaScriptu w przeglądarce** (menu mobilne to `<details>`, paralaksa w
hero to animacja CSS sterowana scrollem, formularz kontaktowy to zwykły formularz `mailto:`).

**Adres strony:** https://dalkowski.pages.dev (Cloudflare Pages — patrz „Wdrożenie”).

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
  components/               # Header, Footer, Logo, Img, PageHero, Breadcrumb
  data/site.ts              # telefony, e-maile, menu, sitemap, dane firmy (JSON-LD)
  assets/                   # wszystkie zdjęcia i logo (Astro generuje AVIF/WebP)
  styles.css                # kolory marki i style globalne (Tailwind)
public/                     # pliki serwowane 1:1 (llms.txt, og-image.png, _headers)
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

## Wdrożenie (Cloudflare Pages)

Strona jest publikowana na **Cloudflare Pages** (darmowy plan, działa z prywatnym repo,
automatyczne wdrożenie po każdym pushu do `main` i podgląd dla każdego PR).

Jednorazowa konfiguracja w panelu Cloudflare:

1. **Workers & Pages → Create → Pages → Connect to Git** i wybierz repo `KamilPiech1991/dalkowski`.
2. Nazwa projektu: `dalkowski` → adres strony: **https://dalkowski.pages.dev**.
3. Ustawienia builda:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Production branch: `main`
4. **Save and Deploy.**

Jeśli nazwa `dalkowski` byłaby zajęta, Cloudflare doda przyrostek (np. `dalkowski-abc.pages.dev`) —
wtedy w **Settings → Variables** ustaw `SITE_URL` na ten adres, żeby canonical i sitemap były
poprawne.

### Własna domena

W projekcie Cloudflare Pages: **Custom domains → Set up a custom domain** (np. `dalkowski.pl`),
a następnie ustaw zmienną `SITE_URL=https://dalkowski.pl` (albo zmień domyślny adres w
`astro.config.mjs`).
