import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Building2, Flame, Phone, Shield, Clock, CheckCircle2, ArrowRight, Wrench, Calculator } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { OptimizedImage } from "@/components/site/OptimizedImage";
import hero from "@/assets/hero-buildings.jpg?optimize&as=picture";
import boiler from "@/assets/heating-boiler.jpg?optimize&as=picture";

const TITLE = "Dalkowski Piaseczno — Zarządzanie Nieruchomościami i Serwis Pieców";
const DESC = "Profesjonalne zarządzanie wspólnotami mieszkaniowymi oraz serwis i instalacja pieców c.o. w Piasecznie, Konstancinie-Jeziornej i Józefosławiu. Doświadczenie od 2006 roku.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "zarządzanie nieruchomościami Piaseczno, administrowanie wspólnot, serwis pieców co Piaseczno, instalacja pieców De Dietrich, Dalkowski" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: hero.img.src, fetchpriority: "high" },
    ],
  }),
  component: Index,
});

function Index() {
  const heroImgRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = heroImgRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        // progress: 0 when section enters bottom, 1 when leaves top
        const progress = 1 - (rect.top + rect.height / 2) / (vh + rect.height / 2);
        setOffset(Math.max(-1, Math.min(1, progress)) * 60);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container-page grid lg:grid-cols-12 gap-12 items-center py-20 lg:py-28">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
              <Shield className="h-3.5 w-3.5" /> Doświadczenie od 2006 roku
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.05]">
              Twoja nieruchomość <br />
              w <span className="text-primary">dobrych rękach</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Kompleksowe zarządzanie wspólnotami mieszkaniowymi i profesjonalny serwis pieców centralnego ogrzewania w Piasecznie i okolicach.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/kontakt" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 shadow-soft">
                Skontaktuj się z nami <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/uslugi" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:border-primary hover:text-primary">
                Nasze usługi
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              <div><div className="text-3xl font-bold text-primary">18+</div><div className="text-xs text-muted-foreground mt-1">lat doświadczenia</div></div>
              <div><div className="text-3xl font-bold text-primary">11</div><div className="text-xs text-muted-foreground mt-1">obsługiwanych wspólnot</div></div>
              <div><div className="text-3xl font-bold text-primary">24/7</div><div className="text-xs text-muted-foreground mt-1">awarie w zarządzanych wspólnotach</div></div>
            </div>
          </div>
          <div className="lg:col-span-7 relative">
            <div
              ref={heroImgRef}
              className="relative rounded-3xl overflow-hidden shadow-soft aspect-[4/3] lg:aspect-[5/4] lg:h-[640px] lg:w-[115%] lg:-mr-[15%]"
            >
              <OptimizedImage
                picture={hero}
                alt="Nowoczesne budynki mieszkalne zarządzane przez Dalkowski w Piasecznie"
                width={1600}
                height={1000}
                priority
                className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover will-change-transform"
                style={{ transform: `translate3d(0, ${offset}px, 0)` }}
              />
            </div>
            <div className="hidden md:block absolute -bottom-6 -left-6 bg-background rounded-2xl shadow-card p-5 border border-border max-w-xs z-10">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary-soft p-2.5"><Shield className="h-5 w-5 text-primary" /></div>
                <div>
                  <div className="text-sm font-semibold">Polisa OC 50 000 €</div>
                  <div className="text-xs text-muted-foreground">Licencja zawodowa nr 23367</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* TWO PILLARS */}
      <section className="container-page py-20">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Dwa filary, jedna firma</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold">Co dla Ciebie zrobimy</h2>
          <p className="mt-4 text-muted-foreground">Od administracji budynkiem po szybki serwis pieca — wszystko w jednym miejscu.</p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <article className="group rounded-3xl border border-border bg-card p-8 hover:shadow-soft hover:border-primary/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-2xl bg-primary-soft p-3"><Building2 className="h-7 w-7 text-primary" /></div>
              <h3 className="text-2xl font-bold">Zarządzanie nieruchomościami</h3>
            </div>
            <p className="text-muted-foreground mb-5">
              Pełna obsługa administracyjna, księgowa i techniczna wspólnot mieszkaniowych. Administrator dostępny pod telefonem całą dobę.
            </p>
            <ul className="space-y-2 mb-6">
              {["Obsługa administracyjna i prawna", "Księgowość wspólnoty i rozliczenia mediów", "Nadzór techniczny i konserwacje", "Reprezentacja wspólnoty przed urzędami"].map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {t}</li>
              ))}
            </ul>
            <Link to="/uslugi/zarzadzanie-nieruchomosciami" className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
              Dowiedz się więcej <ArrowRight className="h-4 w-4" />
            </Link>
          </article>

          <article className="group rounded-3xl border border-border bg-card p-8 hover:shadow-soft hover:border-primary/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-2xl bg-primary-soft p-3"><Flame className="h-7 w-7 text-primary" /></div>
              <h3 className="text-2xl font-bold">Technika grzewcza</h3>
            </div>
            <p className="text-muted-foreground mb-5">
              Autoryzowany serwis pieców De Dietrich — przeglądy, naprawy i instalacje kotłów gazowych. Umawiamy wizyty na dogodne godziny.
            </p>
            <ul className="space-y-2 mb-6">
              {["Naprawy awaryjne — szybki dojazd", "Coroczne przeglądy i konserwacje", "Sprzedaż i montaż nowych pieców", "Gwarancja na piśmie na każdą usługę"].map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {t}</li>
              ))}
            </ul>
            <Link to="/uslugi/technika-grzewcza" className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
              Dowiedz się więcej <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-secondary/50 py-20">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <OptimizedImage picture={boiler} alt="Profesjonalny serwis pieca gazowego — Dalkowski Technika Grzewcza" width={1400} height={1000} className="rounded-2xl shadow-soft w-full h-auto object-cover" />
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Dlaczego my</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold">Lokalna firma rodzinna z misją</h2>
              <p className="mt-4 text-muted-foreground">
                Działamy w Piasecznie i okolicach od 2006 roku. Łączymy zarządzanie wspólnotami z własnym działem technicznym — dzięki temu nasze osiedla otrzymują szybką, fachową obsługę awarii i przeglądów.
              </p>
              <div className="mt-8 grid sm:grid-cols-2 gap-5">
                {[
                  { icon: Shield, t: "Pełna polisa OC", d: "Ubezpieczenie zawodowe 50 000 €" },
                  { icon: Clock, t: "Reakcja 24/7", d: "Awaria? Dzwonisz — przyjeżdżamy." },
                  { icon: Wrench, t: "Własny dział techniczny", d: "Bez podwykonawców z drugiej ręki." },
                  { icon: Calculator, t: "Przejrzysta księgowość", d: "Roczne sprawozdania i pełna dokumentacja." },
                ].map((f) => (
                  <div key={f.t} className="flex gap-3">
                    <div className="rounded-xl bg-primary-soft h-10 w-10 flex items-center justify-center shrink-0"><f.icon className="h-5 w-5 text-primary" /></div>
                    <div>
                      <div className="font-semibold text-sm">{f.t}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{f.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20">
        <div className="rounded-3xl bg-gradient-brand px-8 sm:px-14 py-14 text-center text-primary-foreground shadow-soft">
          <h2 className="text-3xl sm:text-4xl font-bold">Potrzebujesz pomocy z nieruchomością lub piecem?</h2>
          <p className="mt-4 text-primary-foreground/85 max-w-2xl mx-auto">
            Zadzwoń lub napisz — odpowiemy w ciągu dnia roboczego. Awarie w zarządzanych przez nas wspólnotach obsługujemy całą dobę.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <a href="tel:+48793720760" className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-primary hover:opacity-90">
              <Phone className="h-4 w-4" /> +48 793 720 760
            </a>
            <Link to="/kontakt" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10">
              Formularz kontaktowy
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
