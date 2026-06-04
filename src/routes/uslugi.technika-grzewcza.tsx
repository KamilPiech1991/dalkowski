import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle, Calendar, ShoppingCart, ShieldCheck, Phone, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { OptimizedImage } from "@/components/site/OptimizedImage";
import boiler from "@/assets/heating-boiler.jpg?optimize&as=picture";

const TITLE = "Serwis Pieców c.o. Piaseczno — Naprawy, Przeglądy, Instalacja | Dalkowski";
const DESC = "Autoryzowany serwis pieców De Dietrich oraz serwis wszystkich marek: Junkers, Vaillant, Bosch, Buderus, Termet. Naprawy awaryjne, przeglądy, montaż. Piaseczno i okolice.";

export const Route = createFileRoute("/uslugi/technika-grzewcza")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "serwis pieców co Piaseczno, naprawa pieca gazowego, autoryzowany serwis De Dietrich, przegląd pieca, instalacja kotła gazowego Piaseczno" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/uslugi/technika-grzewcza" },
      { property: "og:image", content: boiler },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/uslugi/technika-grzewcza" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Serwis pieców centralnego ogrzewania",
        provider: { "@type": "LocalBusiness", name: "Dalkowski Technika Grzewcza", telephone: "+48792040540" },
        areaServed: ["Piaseczno", "Konstancin-Jeziorna", "Józefosław", "Warszawa"],
        description: DESC,
        offers: [
          { "@type": "Offer", name: "Przegląd okresowy pieca c.o.", price: "250", priceCurrency: "PLN" },
          { "@type": "Offer", name: "Naprawa awaryjna (diagnoza i prosta naprawa)", price: "250", priceCurrency: "PLN" },
        ],
      }),
    }],
  }),
  component: Technika,
});

const services = [
  { icon: AlertCircle, title: "Awarie", desc: "W przypadku konieczności pilnej naprawy przyjeżdżamy tak szybko jak to możliwe. Zapewniamy części do naprawy. Klient zawsze otrzymuje pełną informację o diagnozie i wymienianych częściach. Każda naprawa objęta gwarancją na piśmie." },
  { icon: Calendar, title: "Przeglądy i konserwacje", desc: "Regularne, coroczne przeglądy to bezpieczeństwo Twojego domu i oszczędność. Regularna konserwacja to większa żywotność pieca i niższe rachunki za gaz. Z wyprzedzeniem przypominamy o terminie przeglądu." },
  { icon: ShoppingCart, title: "Sprzedaż i instalacja", desc: "Prowadzimy sprzedaż pieców marki De Dietrich — posiadamy autoryzację producenta. Instalujemy również piece innych marek zgodnie z preferencjami klienta." },
];

const marki = ["De Dietrich", "Junkers", "Vaillant", "Termet", "Beretta", "Bosch", "Buderus", "Duval"];

const gwarancje = [
  "Na wykonane usługi zawsze udzielamy gwarancji na piśmie",
  "Klient zawsze może liczyć na poradę telefoniczną przy naprawie lub serwisie",
  "Nasi serwisanci nigdy nie chodzą w brudnych butach po mieszkaniu klienta",
  "Z wyprzedzeniem telefonicznie przypominamy o serwisie rocznym",
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
            <h1 className="text-4xl sm:text-5xl font-extrabold">Serwis pieców centralnego ogrzewania</h1>
            <p className="mt-5 text-lg text-muted-foreground">
              <strong className="text-foreground">Naprawimy każdy piec.</strong> Serwisujemy, naprawiamy i instalujemy piece c.o. wszystkich popularnych marek. Autoryzowany serwis De Dietrich.
            </p>
            <a href="tel:+48732820870" className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold shadow-soft">
              <Phone className="h-4 w-4" /> Awaria? +48 732 820 870
            </a>
          </div>
          <img src={boiler} alt="Serwis pieca gazowego — Dalkowski Technika Grzewcza Piaseczno" width={1400} height={1000} className="rounded-2xl shadow-soft w-full h-auto object-cover" />
        </div>
      </section>

      <section className="container-page py-16 grid md:grid-cols-3 gap-6">
        {services.map((s) => (
          <article key={s.title} className="rounded-3xl border border-border bg-card p-7">
            <div className="rounded-2xl bg-primary-soft p-3 w-fit"><s.icon className="h-6 w-6 text-primary" /></div>
            <h2 className="mt-5 text-xl font-bold">{s.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </article>
        ))}
      </section>

      <section className="bg-secondary/50 py-16">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Serwisowane marki</span>
            <h2 className="mt-3 text-3xl font-bold">Serwisujemy wszystkie kotły</h2>
            <p className="mt-3 text-muted-foreground">Pracownicy firmy Dalkowski posiadają autoryzację jednego z wiodących producentów pieców c.o. — De Dietrich.</p>
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
                <h3 className="font-semibold">Przegląd okresowy pieca c.o.</h3>
                <span className="text-primary font-bold whitespace-nowrap">250 zł</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Kocioł gazowy wiszący lub stojący. Przy 5 przeglądach jednego dnia na tym samym osiedlu — rabat 20% (199 zł / przegląd).</p>
            </div>
            <div className="border-b border-border pb-4">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-semibold">Instalacja nowego pieca</h3>
                <span className="text-primary font-bold whitespace-nowrap">wycena</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Cena ustalana indywidualnie — zależy od modelu pieca i warunków instalacji.</p>
            </div>
            <div>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-semibold">Naprawa awaryjna</h3>
                <span className="text-primary font-bold whitespace-nowrap">od 250 zł</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Diagnoza + prosta naprawa podczas jednej wizyty + koszt części. Złożone naprawy — wycena do akceptacji. Po 17:00 i w dni wolne +50 zł.</p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
