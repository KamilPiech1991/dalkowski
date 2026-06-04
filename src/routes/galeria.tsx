import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import hero from "@/assets/hero-buildings.jpg";
import boiler from "@/assets/heating-boiler.jpg";

const TITLE = "Galeria — Zarządzane Wspólnoty i Realizacje | Dalkowski";
const DESC = "Zobacz zdjęcia z zarządzanych przez nas wspólnot mieszkaniowych w Piasecznie, Konstancinie-Jeziornej i Józefosławiu oraz realizacje instalacji pieców c.o.";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/galeria" },
      { property: "og:image", content: hero },
    ],
    links: [{ rel: "canonical", href: "/galeria" }],
  }),
  component: Galeria,
});

const items = [
  { src: g1, alt: "Osiedle mieszkaniowe — widok z lotu ptaka, zarządzane przez Dalkowski" },
  { src: g2, alt: "Wejście do budynku wspólnoty mieszkaniowej z zadbaną zielenią" },
  { src: g4, alt: "Plac zabaw na osiedlu zarządzanym przez Dalkowski w Józefosławiu" },
  { src: hero, alt: "Wewnętrzny dziedziniec wspólnoty mieszkaniowej w Piasecznie" },
  { src: g5, alt: "Elewacja budynku po termomodernizacji" },
  { src: g3, alt: "Serwisant Dalkowski Technika Grzewcza podczas przeglądu pieca" },
  { src: boiler, alt: "Instalacja nowego pieca gazowego w domu jednorodzinnym" },
  { src: g6, alt: "Nowoczesny kocioł kondensacyjny zamontowany przez Dalkowski" },
];

function Galeria() {
  return (
    <SiteLayout>
      <section className="bg-gradient-hero">
        <div className="container-page py-16 lg:py-24">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Galeria</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold max-w-3xl">Nasze wspólnoty i realizacje</h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl">
            Wybrane zdjęcia z osiedli i budynków, które administrujemy, oraz przykładowe realizacje z zakresu techniki grzewczej.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <figure key={i} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <img
                src={it.src}
                alt={it.alt}
                loading="lazy"
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <figcaption className="p-4 text-xs text-muted-foreground">{it.alt}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
