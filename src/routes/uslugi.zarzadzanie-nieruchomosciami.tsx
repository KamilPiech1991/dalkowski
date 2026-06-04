import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardList, Calculator, Wrench, CheckCircle2, Phone } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

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
        <div className="container-page py-16 lg:py-24">
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
      </section>

      <section className="container-page py-16 grid gap-8">
        {sections.map((s) => (
          <article key={s.title} className="rounded-3xl border border-border bg-card p-8 sm:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="rounded-2xl bg-primary-soft p-3"><s.icon className="h-7 w-7 text-primary" /></div>
              <h2 className="text-2xl sm:text-3xl font-bold">{s.title}</h2>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {s.items.map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {i}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="container-page pb-20">
        <div className="rounded-3xl bg-gradient-brand p-10 sm:p-14 text-primary-foreground text-center shadow-soft">
          <h2 className="text-2xl sm:text-3xl font-bold">Rozważasz zmianę zarządcy?</h2>
          <p className="mt-3 text-primary-foreground/85 max-w-2xl mx-auto">Umów rozmowę — z chęcią poznamy specyfikę Twojej wspólnoty i przedstawimy ofertę dopasowaną do jej potrzeb.</p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <a href="tel:+48793720760" className="inline-flex items-center gap-2 rounded-full bg-background text-primary px-6 py-3 text-sm font-semibold"><Phone className="h-4 w-4" /> +48 793 720 760</a>
            <Link to="/kontakt" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold hover:bg-primary-foreground/10">Napisz do nas</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
