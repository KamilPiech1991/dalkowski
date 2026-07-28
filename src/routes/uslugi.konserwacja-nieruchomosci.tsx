import { createFileRoute, Link } from "@tanstack/react-router";
import { Droplets, Zap, Hammer, Clock, CheckCircle2, Phone, ShieldCheck, Wrench } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { OptimizedImage } from "@/components/site/OptimizedImage";
import hero from "@/assets/konserwacja-hero.jpg?optimize&as=picture";
import g1 from "@/assets/gallery-1.jpg?optimize&as=picture";
import g3 from "@/assets/gallery-3.jpg?optimize&as=picture";
import g5 from "@/assets/gallery-5.jpg?optimize&as=picture";

const TITLE = "Konserwacja Nieruchomości Piaseczno — Hydraulik, Elektryk, Złota Rączka 24/7 | Dalkowski";
const DESC = "Konserwacja techniczna wspólnot i budynków w Piasecznie: hydraulika, elektryka, drobne prace budowlane i usługi złotej rączki. Dostępność 24/7 dla klientów obsługiwanych administracyjnie.";

export const Route = createFileRoute("/uslugi/konserwacja-nieruchomosci")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "konserwacja nieruchomości Piaseczno, hydraulik wspólnota, elektryk Piaseczno, złota rączka, drobne prace budowlane, awarie 24/7" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/uslugi/konserwacja-nieruchomosci" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/uslugi/konserwacja-nieruchomosci" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Konserwacja nieruchomości",
        provider: { "@type": "LocalBusiness", name: "Dalkowski", telephone: "+48793720760" },
        areaServed: ["Piaseczno", "Konstancin-Jeziorna", "Józefosław", "Warszawa"],
        description: DESC,
        hoursAvailable: "Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59",
      }),
    }],
  }),
  component: Konserwacja,
});

const sections = [
  {
    icon: Droplets,
    title: "Usługi hydrauliczne",
    intro: "Kompleksowa hydraulika w mieszkaniach i częściach wspólnych budynku — od drobnych napraw po wymianę instalacji.",
    items: [
      "Naprawa i wymiana baterii, spłuczek, syfonów i zaworów",
      "Udrażnianie odpływów, pionów kanalizacyjnych i rur",
      "Wymiana grzejników, głowic termostatycznych i odpowietrzników",
      "Lokalizacja i usuwanie wycieków w instalacjach wodnych i c.o.",
      "Montaż i wymiana wodomierzy oraz zaworów podpionowych",
      "Naprawa hydroforów, pomp obiegowych i węzłów cieplnych",
    ],
  },
  {
    icon: Zap,
    title: "Usługi elektryczne",
    intro: "Bezpieczne naprawy i modernizacje instalacji elektrycznych — z zachowaniem wszystkich norm i pomiarami odbiorczymi.",
    items: [
      "Naprawa i wymiana gniazdek, włączników, opraw i puszek",
      "Wymiana bezpieczników, zabezpieczeń różnicowoprądowych i tablic",
      "Diagnostyka zaników napięcia i zwarć w instalacji",
      "Wymiana oświetlenia klatek schodowych na LED",
      "Montaż czujników ruchu, domofonów i oświetlenia awaryjnego",
      "Okresowe pomiary elektryczne wymagane prawem budowlanym",
    ],
  },
  {
    icon: Hammer,
    title: "Złota rączka i drobne prace budowlane",
    intro: "Prace wykończeniowe i konserwacyjne w mieszkaniach, częściach wspólnych i wokół budynku.",
    items: [
      "Naprawa i regulacja drzwi, okien, zamków oraz klamek",
      "Uzupełnianie fug, silikonów, drobne prace glazurnicze",
      "Malowanie klatek schodowych, korytarzy i pomieszczeń wspólnych",
      "Montaż półek, karniszy, luster, tablic informacyjnych",
      "Naprawa balustrad, poręczy, ławek i infrastruktury osiedla",
      "Drobne prace ślusarskie i stolarskie na zgłoszenie mieszkańca",
    ],
  },
];

function Konserwacja() {
  return (
    <SiteLayout>
      <section className="bg-gradient-hero">
        <div className="container-page py-16 lg:py-24 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Usługa dodatkowa</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold leading-tight">
              Konserwacja nieruchomości — hydraulik, elektryk i złota rączka pod jednym numerem
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Poza standardową administracją wspólnoty oferujemy pełną konserwację techniczną budynku i lokali. Dla klientów, którzy wybiorą tę opcję, jesteśmy dostępni <strong>24 godziny na dobę, 7 dni w tygodniu</strong> — również w weekendy i święta.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="tel:+48732820870" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
                <Phone className="h-4 w-4" /> Zgłoś awarię: +48 732 820 870
              </a>
              <Link to="/kontakt" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold hover:border-primary transition-colors">
                Zapytaj o ofertę
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Dostępność 24/7</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Wykwalifikowana ekipa</span>
              <span className="inline-flex items-center gap-2"><Wrench className="h-4 w-4 text-primary" /> Własny sprzęt i materiały</span>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-soft">
            <OptimizedImage picture={hero} alt="Konserwator z narzędziami w budynku mieszkalnym" width={1600} height={1000} priority className="w-full h-auto" />
          </div>
        </div>
      </section>

      <section className="container-page py-16 lg:py-20">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Konserwacja to opcja dodatkowa — bo nie każdy zarządca ją oferuje</h2>
          <p className="mt-4 text-muted-foreground">
            Standardowe zarządzanie wspólnotą kończy się na organizowaniu wykonawców z zewnątrz. My idziemy dalej — jeśli klient chce, przejmujemy również bieżącą konserwację techniczną budynku i lokali. Dzięki temu drobne awarie usuwamy w ciągu godzin, a nie dni, bez czekania na dostępność firm zewnętrznych i bez pośredników w rozliczeniach.
          </p>
        </div>
      </section>

      {sections.map((s, i) => (
        <section key={s.title} className={i % 2 === 0 ? "bg-secondary/40" : ""}>
          <div className="container-page py-16 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <div className="rounded-2xl bg-primary-soft p-4 w-fit"><s.icon className="h-8 w-8 text-primary" /></div>
              <h2 className="mt-5 text-3xl font-extrabold">{s.title}</h2>
              <p className="mt-3 text-muted-foreground">{s.intro}</p>
              <ul className="mt-6 space-y-3">
                {s.items.map((it) => (
                  <li key={it} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{it}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`rounded-3xl overflow-hidden shadow-soft ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <OptimizedImage picture={[g1, g3, g5][i]} alt={s.title} width={1600} height={1067} className="w-full h-auto" />
            </div>
          </div>
        </section>
      ))}

      <section className="container-page py-16 lg:py-20">
        <div className="rounded-3xl bg-primary text-primary-foreground p-10 lg:p-14 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold">Awaria w środku nocy? Dzwoń — odbieramy.</h2>
            <p className="mt-4 opacity-90">
              Dla wspólnot, które wybiorą pakiet z konserwacją, uruchamiamy dyżurny numer dostępny 24/7. Pęknięta rura, brak prądu na klatce, zablokowany zamek — reagujemy od razu i informujemy zarząd o wykonanych pracach.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a href="tel:+48732820870" className="inline-flex items-center justify-center gap-2 rounded-full bg-background text-foreground px-6 py-3 text-sm font-semibold hover:opacity-90">
              <Phone className="h-4 w-4" /> +48 732 820 870
            </a>
            <Link to="/uslugi/zarzadzanie-nieruchomosciami" className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold hover:bg-primary-foreground/10">
              Zobacz pakiet zarządzania
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
