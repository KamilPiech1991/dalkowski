# Dalkowski — strona internetowa

Strona firmy Dalkowski (zarządzanie nieruchomościami, konserwacja i technika grzewcza),
zbudowana w [Astro](https://astro.build) + Tailwind CSS 4. Strona jest w pełni statyczna:
czysty HTML i CSS, **bez JavaScriptu w przeglądarce** (menu mobilne to `<details>`, paralaksa w
hero to animacja CSS sterowana scrollem, formularz kontaktowy to zwykły formularz `mailto:`).

**Adres strony (tymczasowo, GitHub Pages):** https://kamilpiech1991.github.io/dalkowski/
**Panel CMS (Sanity Studio):** https://dalkowski.sanity.studio (po skonfigurowaniu — patrz „Sanity CMS”)

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
  components/               # Header, Footer, Logo, Img, Photo, PageHero, Breadcrumb
  data/site.ts              # menu, sitemap, dane firmy (JSON-LD)
  data/content.json         # ustawienia, galeria, wspólnoty, cennik — domyślne treści CMS
  data/pages.json           # teksty, zdjęcia i SEO stron — domyślne treści CMS
  lib/pages.ts              # treść strony z Sanity scalona z pages.json
  lib/sanity.ts             # pobieranie treści z Sanity podczas builda
  assets/                   # wszystkie zdjęcia i logo (Astro generuje AVIF/WebP)
  styles.css                # kolory marki i style globalne (Tailwind)
public/                     # pliki serwowane 1:1 (og-image.png)
studio/                     # Sanity Studio — panel do edycji treści (osobny projekt npm)
  sanity.project.json       # ID projektu Sanity (wspólne dla Studio i strony)
```

Teksty i zdjęcia stron, dane kontaktowe, galerię, listę wspólnot i cennik edytuje się w Sanity
Studio. Menu jest w `src/data/site.ts`.

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

## Sanity CMS

Treści edytowalne w panelu:

- **Strony** — teksty, nagłówki, zdjęcia sekcji oraz SEO (meta title, description, słowa
  kluczowe) każdej strony: strona główna, O nas, Usługi, trzy podstrony usług, Kontakt i
  Galeria. Każda strona to jeden dokument z zakładkami „Treść” i „SEO”.
- **Ustawienia strony** — telefony, e-maile, adres, godziny pracy, licencja, NIP.
- **Galeria**, **administrowane wspólnoty** i **cennik techniki grzewczej**.

W kodzie zostały tylko drobne etykiety interfejsu (np. „Dowiedz się więcej”, „Zgłoś awarię:”,
okruszki nawigacji, pola formularza) i ikony.

**Puste pole = treść domyślna.** Jeśli pole strony w Sanity jest puste (albo dokumentu strony
jeszcze nie ma), strona pokazuje domyślną treść z `src/data/pages.json`. Pusty opis SEO na
stronie Kontakt jest składany automatycznie z aktualnych telefonów i adresu.

Strona pobiera treści z Sanity **tylko podczas budowania** — odwiedzający dostają gotowy HTML
bez JavaScriptu. Zdjęcia z galerii serwuje CDN Sanity (automatycznie w AVIF/WebP). Gdy
`projectId` w `studio/sanity.project.json` jest pusty albo dataset nie ma jeszcze treści, strona
korzysta z `src/data/content.json` i `src/data/pages.json`.

### Jednorazowa konfiguracja

1. ✅ Projekt Sanity: **`7sqj57dm`**, dataset `production` (wpisany w `studio/sanity.project.json`).
   Dataset musi być **publiczny** (sanity.io/manage → Datasets) — strona czyta treści bez tokenu.
2. W projekcie Sanity: **API → Tokens → Add API token** (uprawnienia: _Editor_). Dodaj go w
   GitHubie jako sekret **`SANITY_AUTH_TOKEN`** (Settings → Secrets and variables → Actions).
3. W GitHubie: **Actions → Sanity Studio → Run workflow**, zaznacz „Wgraj obecne treści…”.
   Workflow wgra obecne treści i zdjęcia do Sanity, opublikuje panel pod
   https://dalkowski.sanity.studio i przebuduje stronę. Dopóki dataset jest pusty, strona
   korzysta z `src/data/content.json`, więc nic nie znika w międzyczasie.
4. Automatyczna przebudowa strony po publikacji w CMS — w Sanity: **API → Webhooks → Create
   webhook**:
   - URL: `https://api.github.com/repos/KamilPiech1991/dalkowski/dispatches`
   - Trigger on: Create, Update, Delete; Filter:
     `_type in ["siteSettings", "galleryImage", "community", "priceItem", "homePage", "aboutPage", "servicesPage", "managementPage", "maintenancePage", "heatingPage", "contactPage", "galleryPage"]`
   - Projection: `{"event_type": "sanity-publish"}`
   - HTTP method: `POST`
   - HTTP headers: `Accept: application/vnd.github+json` oraz
     `Authorization: Bearer <token GitHub>` — token typu _fine-grained_ z dostępem tylko do
     tego repozytorium i uprawnieniem **Contents: Read and write**.

Po publikacji zmiany w Studio strona przebudowuje się sama w 2–3 minuty. Ręcznie:
**Actions → Publikacja na GitHub Pages → Run workflow**.

### Import treści stron

Teksty stron trafiły do Sanity później niż ustawienia i galeria. Żeby wgrać je do panelu,
uruchom ponownie **Actions → Sanity Studio → Run workflow** z zaznaczonym „Wgraj obecne
treści…”. Import używa `--missing`, więc dodaje tylko brakujące dokumenty — niczego, co już
jest w Sanity, nie nadpisze. Skrypt `studio/scripts/build-seed.mjs` bierze treści z
`src/data/content.json` i `src/data/pages.json`, a zdjęcia z `src/assets/`.

### Praca lokalna ze Studio

```sh
cd studio
npm install
npx sanity login
npm run dev        # http://localhost:3333
```
