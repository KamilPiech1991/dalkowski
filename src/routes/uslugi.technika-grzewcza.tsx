import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle, Calendar, ShoppingCart, ShieldCheck, Phone, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { OptimizedImage } from "@/components/site/OptimizedImage";
import boiler from "@/assets/heating-boiler.jpg?optimize&as=picture";
import g3 from "@/assets/gallery-3.jpg?optimize&as=picture";
import g6 from "@/assets/gallery-6.jpg?optimize&as=picture";
import g5 from "@/assets/gallery-5.jpg?optimize&as=picture";
import ddBoiler from "@/assets/de-dietrich-kociol.png.asset.json";

const TITLE = "Autoryzowany Serwis De Dietrich Piaseczno — Przeglądy, Naprawy, Montaż | Dalkowski";
const DESC = "Autoryzowany serwis kotłów gazowych De Dietrich w Piasecznie i okolicach. Przeglądy okresowe, naprawy awaryjne, instalacja i wymiana kotłów gazowych. Umawiamy się na dogodne godziny.";

export const Route = createFileRoute("/uslugi/technika-grzewcza")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "autoryzowany serwis De Dietrich Piaseczno, serwis kotłów gazowych De Dietrich, przegląd kotła gazowego, naprawa kotła De Dietrich, instalacja kotła gazowego Piaseczno" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/uslugi/technika-grzewcza" },
      { property: "og:image", content: boiler.img.src },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/uslugi/technika-grzewcza" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Autoryzowany serwis kotłów gazowych De Dietrich",
        provider: { "@type": "LocalBusiness", name: "Dalkowski Technika Grzewcza", telephone: "+48730704502" },
        areaServed: ["Piaseczno", "Konstancin-Jeziorna", "Józefosław", "Warszawa"],
        description: DESC,
        offers: [
          { "@type": "Offer", name: "Przegląd okresowy kotła gazowego De Dietrich", price: "350", priceCurrency: "PLN", description: "Cena netto" },
          { "@type": "Offer", name: "Naprawa awaryjna kotła gazowego", priceCurrency: "PLN", description: "Wycena indywidualna — zakres i koszt zależą od usterki" },
          { "@type": "Offer", name: "Montaż kotła gazowego", priceCurrency: "PLN", description: "Wycena indywidualna" },
        ],

      }),
    }],
  }),
  component: Technika,
});

const services = [
  { icon: AlertCircle, title: "Awarie", img: g3, alt: "Serwisant Dalkowski podczas naprawy awaryjnej kotła gazowego De Dietrich", desc: "W przypadku awarii diagnozujemy problem i naprawiamy kocioł zgodnie z procedurami producenta. Klient zawsze otrzymuje pełną informację o diagnozie i wymienianych częściach. Każda naprawa objęta gwarancją na piśmie." },
  { icon: Calendar, title: "Przeglądy i konserwacje", img: boiler, alt: "Coroczny przegląd kotła gazowego centralnego ogrzewania De Dietrich", desc: "Regularne, coroczne przeglądy to bezpieczeństwo Twojego domu i oszczędność. Regularna konserwacja to większa żywotność kotła i niższe rachunki za gaz." },
  { icon: ShoppingCart, title: "Sprzedaż i instalacja", img: g6, alt: "Nowoczesny kocioł kondensacyjny De Dietrich", desc: "Jako autoryzowany partner De Dietrich prowadzimy sprzedaż i profesjonalny montaż kotłów gazowych tej marki. Dobieramy moc i model do potrzeb budynku oraz zapewniamy pełne wsparcie gwarancyjne." },
];

const marki = ["De Dietrich"];

const gwarancje = [
  "Na wykonane usługi zawsze udzielamy gwarancji na piśmie",
  "Klient zawsze może liczyć na poradę telefoniczną przy naprawie lub serwisie",
  "Nasi serwisanci nigdy nie chodzą w brudnych butach po mieszkaniu klienta",
  "Dotrzymujemy umów i zawsze mamy własne narzędzia",
  'Nie boimy się wziąć udziału w programie „Usterka…”',
];

function Technika() {
  return (
    <SiteLayout>
      <section className="bg-gradient-hero">
        <div className="container-page py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <nav className="text-xs text-muted-foreground mb-4" aria-label="Breadcrumb">
              <Link to="/uslugi" className="hover:text-primary">Usługi</Link> / <span className="text-foreground">Technika grzewcza</span>
            </nav>
            <h1 className="text-4xl sm:text-5xl font-extrabold">Autoryzowany serwis kotłów gazowych De Dietrich</h1>
            <p className="mt-5 text-lg text-muted-foreground">
              <strong className="text-foreground">Specjalizujemy się w kotłach De Dietrich.</strong> Przeglądy, naprawy awaryjne oraz sprzedaż i montaż nowych urządzeń w Piasecznie i okolicach. Dla klientów indywidualnych umawiamy wizyty na dogodne godziny.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="tel:+48730704502" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold shadow-soft">
                <Phone className="h-4 w-4" /> Serwis: +48 730 704 502
              </a>
              <a href="tel:+48574988293" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold hover:border-primary transition-colors">
                <Phone className="h-4 w-4 text-primary" /> Biuro: +48 574 988 293
              </a>
            </div>
          </div>
          <OptimizedImage picture={ddBoiler.url} alt="Kocioł gazowy kondensacyjny De Dietrich zamontowany w kuchni" width={768} height={692} className="rounded-2xl shadow-soft w-full h-auto object-cover" priority />
        </div>
      </section>

      <section className="container-page py-16 grid md:grid-cols-3 gap-6">
        {services.map((s) => (
          <article key={s.title} className="rounded-3xl border border-border bg-card overflow-hidden flex flex-col">
            <OptimizedImage picture={s.img} alt={s.alt} className="w-full h-48 object-cover" />
            <div className="p-7">
              <div className="rounded-2xl bg-primary-soft p-3 w-fit"><s.icon className="h-6 w-6 text-primary" /></div>
              <h2 className="mt-5 text-xl font-bold">{s.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-secondary/50 py-16">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Autoryzacja</span>
            <h2 className="mt-3 text-3xl font-bold">Autoryzowany serwis De Dietrich</h2>
            <p className="mt-3 text-muted-foreground">Jako autoryzowany partner De Dietrich znamy te kotły od podszewki. Realizujemy przeglądy, naprawy i instalacje zgodnie ze standardami producenta, zachowując gwarancję i pełną dokumentację serwisową.</p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {marki.map((m) => (
              <span key={m} className="rounded-full bg-background border border-border px-5 py-2.5 text-sm font-semibold text-foreground/80">{m}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 grid lg:grid-cols-2 gap-10">
        <div>
          <OptimizedImage picture={g5} alt="Elewacja budynku po pracach instalacyjnych — Dalkowski Technika Grzewcza" className="rounded-3xl shadow-card w-full h-72 object-cover mb-8" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Deklaracja jakości</span>
          <h2 className="mt-3 text-3xl font-bold flex items-center gap-2"><ShieldCheck className="h-7 w-7 text-primary" /> Nasze zasady</h2>
          <ul className="mt-6 space-y-3">
            {gwarancje.map((g) => (
              <li key={g} className="flex items-start gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {g}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold">Cennik przykładowych usług</h2>
          <div className="mt-6 space-y-5">
            <div className="border-b border-border pb-4">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-semibold">Przegląd okresowy kotła gazowego</h3>
                <span className="text-primary font-bold whitespace-nowrap">350 zł netto</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Kocioł gazowy wiszący lub stojący. Przy 5 przeglądach jednego dnia na tym samym osiedlu — rabat 20% (280 zł netto / przegląd).</p>
            </div>
            <div className="border-b border-border pb-4">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-semibold">Montaż nowego kotła gazowego</h3>
                <span className="text-primary font-bold whitespace-nowrap">wycena indywidualna</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Koszt zależy od modelu kotła, stanu instalacji i warunków montażu — wycenę przygotowujemy po oględzinach.</p>
            </div>
            <div>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-semibold">Naprawa awaryjna</h3>
                <span className="text-primary font-bold whitespace-nowrap">wycena indywidualna</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Kosztu naprawy nie da się przewidzieć z góry — w zależności od usterki i części może to być 150 zł, jak i 2500 zł. Po diagnozie zawsze podajemy cenę do akceptacji przed rozpoczęciem prac.</p>
            </div>
          </div>

        </div>
      </section>
    </SiteLayout>
  );
}
