import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardList, Calculator, Wrench, CheckCircle2, Phone } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { OptimizedImage } from "@/components/site/OptimizedImage";
import hero from "@/assets/hero-buildings.jpg?optimize&as=picture";
import g1 from "@/assets/gallery-1.jpg?optimize&as=picture";
import g2 from "@/assets/gallery-2.jpg?optimize&as=picture";
import g4 from "@/assets/gallery-4.jpg?optimize&as=picture";
import p7150 from "@/assets/photo-7150.jpg.asset.json";
import p7159 from "@/assets/photo-7159.jpg.asset.json";
import p7165 from "@/assets/photo-7165.jpg.asset.json";
import p1260 from "@/assets/photo-1260.jpg.asset.json";
import p2762 from "@/assets/photo-2762.jpg.asset.json";

const TITLE = "Zarządzanie Nieruchomościami Piaseczno — Wspólnoty Mieszkaniowe | Dalkowski";
const DESC = "Profesjonalne zarządzanie i administrowanie wspólnotami mieszkaniowymi w Piasecznie, Konstancinie-Jeziornej i Józefosławiu. Obsługa administracyjna, księgowa i techniczna. Licencja nr 23367.";

export const Route = createFileRoute("/uslugi/zarzadzanie-nieruchomosciami")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "zarządzanie nieruchomościami Piaseczno, administrator wspólnoty Konstancin, zarządca nieruchomości Józefosław, obsługa wspólnoty mieszkaniowej" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/uslugi/zarzadzanie-nieruchomosciami" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/uslugi/zarzadzanie-nieruchomosciami" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Zarządzanie nieruchomościami",
        provider: { "@type": "LocalBusiness", name: "Dalkowski", telephone: "+48793720760" },
        areaServed: ["Piaseczno", "Konstancin-Jeziorna", "Józefosław"],
        description: DESC,
      }),
    }],
  }),
  component: Zarzadzanie,
});

const sections = [
  {
    icon: ClipboardList,
    title: "Obsługa administracyjna",
    items: [
      "Znany z imienia i nazwiska administrator dostępny pod telefonem całą dobę",
      "Prowadzenie formalno-prawnej dokumentacji nieruchomości wraz z archiwum",
      "Przygotowywanie umów o dostawy, prace i usługi w imieniu Wspólnoty",
      "Prowadzenie wykazu właścicieli lokali i ich najemców",
      "Reprezentowanie Wspólnoty przed organami administracji rządowej i samorządowej",
      "Przygotowanie, zwoływanie i obsługa zebrań Wspólnoty",
      "Przygotowanie projektów uchwał i głosowanie w trybie indywidualnym",
      "Opracowanie planów remontów i planu zarządzania nieruchomością",
    ],
  },
  {
    icon: Calculator,
    title: "Obsługa księgowa",
    items: [
      "Naliczanie i rozliczanie zaliczek wynikających z planu gospodarczego",
      "Prowadzenie ewidencji przychodów i kosztów Wspólnoty",
      "Sporządzanie rocznego sprawozdania finansowego",
      "Obsługa rachunków bankowych Wspólnoty i terminowość płatności",
      "Rozliczenia mediów: woda, c.o., ścieki, wywóz nieczystości",
      "Windykacja należności w postępowaniu sądowym",
    ],
  },
  {
    icon: Wrench,
    title: "Obsługa techniczna",
    items: [
      "Prowadzenie książki obiektu budowlanego zgodnie z Prawem budowlanym",
      "Okresowe przeglądy nieruchomości i instalacji przez wyspecjalizowane organy",
      "Nadzór nad utrzymaniem czystości pomieszczeń wspólnych i terenu",
      "Zapewnienie dostaw mediów dla nieruchomości",
      "Organizacja usuwania awarii i ich skutków",
      "Konserwacje hydrauliczne: instalacje sanitarne, udrażnianie kanalizacji, mycie myjką 120 bar",
      "Konserwacje elektryczne: przeglądy, pomiary, naprawy, montaż instalacji odgromowych",
      "Prace ogólnobudowlane: regulacja drzwi, naprawy ślusarskie, mycie pojemników na odpady",
    ],
  },
];

function Zarzadzanie() {
  return (
    <SiteLayout>
      <section className="bg-gradient-hero">
        <div className="container-page py-16 lg:py-24 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <nav className="text-xs text-muted-foreground mb-4" aria-label="Breadcrumb">
              <Link to="/uslugi" className="hover:text-primary">Usługi</Link> / <span className="text-foreground">Zarządzanie nieruchomościami</span>
            </nav>
            <h1 className="text-4xl sm:text-5xl font-extrabold max-w-3xl">Zarządzanie nieruchomościami w Piasecznie i okolicach</h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-3xl">
              Podstawowym zakresem naszej działalności jest <strong className="text-foreground">zarządzanie i administrowanie nieruchomościami</strong> powierzonymi. Doświadczenie w tym zakresie zdobywamy od 2006 roku.
            </p>
            <p className="mt-4 text-muted-foreground max-w-3xl">
              Bardzo zależy nam na całkowitym zadowoleniu naszych klientów w zakresie utrzymania nieruchomości i czerpania z niej pożytków, co przyczynia się do minimalizacji kosztów utrzymania części wspólnych oraz infrastruktury otaczającej Wspólnotę.
            </p>
          </div>
          <div className="lg:col-span-5">
            <OptimizedImage
              picture={hero}
              alt="Nowoczesna wspólnota mieszkaniowa zarządzana przez Dalkowski"
              priority
              width={1600}
              height={1200}
              className="rounded-3xl shadow-soft w-full h-80 lg:h-[420px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* GALLERY STRIP — referencyjne obiekty */}
      <section className="container-page pt-16">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Referencje</span>
          <h2 className="mt-3 text-3xl font-bold">Wspólnoty, którymi się opiekujemy</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { src: p7150.url, alt: "Elewacja zarządzanej wspólnoty mieszkaniowej z balkonami" },
            { src: p7165.url, alt: "Nowoczesny budynek wspólnoty z lokalami usługowymi w Józefosławiu" },
            { src: g1.img.src, alt: "Osiedle mieszkaniowe — widok z góry" },
            { src: g4.img.src, alt: "Plac zabaw na osiedlu w Józefosławiu" },
          ].map((it, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card shadow-card group">
              <OptimizedImage
                picture={it.src}
                alt={it.alt}
                className="w-full h-44 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-16 grid gap-8">
        {sections.map((s, idx) => {
          const imgFor = [g2.img.src, p2762.url, p1260.url][idx];
          const imgAlt = [
            "Administrator wspólnoty Dalkowski przy wejściu do budynku",
            "Biuro Dalkowski — zarządzanie wspólnotami w Piasecznie",
            "Samochód firmowy Dalkowski przy obiekcie wspólnoty",
          ][idx];
          return (
            <article key={s.title} className="rounded-3xl border border-border bg-card overflow-hidden">
              <div className="grid lg:grid-cols-12">
                <div className={`lg:col-span-4 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                  <OptimizedImage
                    picture={imgFor}
                    alt={imgAlt}
                    className="w-full h-56 lg:h-full object-cover"
                  />
                </div>
                <div className="lg:col-span-8 p-8 sm:p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="rounded-2xl bg-primary-soft p-3"><s.icon className="h-7 w-7 text-primary" /></div>
                    <h2 className="text-2xl sm:text-3xl font-bold">{s.title}</h2>
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                    {s.items.map((i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {i}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* CTA with image background context */}
      <section className="container-page pb-20">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 rounded-3xl overflow-hidden shadow-card">
            <OptimizedImage
              picture={p7159.url}
              alt="Samochód serwisowy Dalkowski — administracja i konserwacja wspólnot"
              className="w-full h-72 lg:h-full object-cover"
            />
          </div>
          <div className="lg:col-span-7 rounded-3xl bg-gradient-brand p-10 sm:p-14 text-primary-foreground shadow-soft flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl font-bold">Rozważasz zmianę zarządcy?</h2>
            <p className="mt-3 text-primary-foreground/85">Umów rozmowę — z chęcią poznamy specyfikę Twojej wspólnoty i przedstawimy ofertę dopasowaną do jej potrzeb.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="tel:+48793720760" className="inline-flex items-center gap-2 rounded-full bg-background text-primary px-6 py-3 text-sm font-semibold"><Phone className="h-4 w-4" /> +48 793 720 760</a>
              <a href="tel:+48574988293" className="inline-flex items-center gap-2 rounded-full bg-background text-primary px-6 py-3 text-sm font-semibold"><Phone className="h-4 w-4" /> +48 574 988 293</a>
              <Link to="/kontakt" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold hover:bg-primary-foreground/10">Napisz do nas</Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
