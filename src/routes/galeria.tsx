import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { OptimizedImage } from "@/components/site/OptimizedImage";
import g1 from "@/assets/gallery-1.jpg?optimize&as=picture";
import g2 from "@/assets/gallery-2.jpg?optimize&as=picture";
import g3 from "@/assets/gallery-3.jpg?optimize&as=picture";
import g4 from "@/assets/gallery-4.jpg?optimize&as=picture";
import g5 from "@/assets/gallery-5.jpg?optimize&as=picture";
import g6 from "@/assets/gallery-6.jpg?optimize&as=picture";
import hero from "@/assets/hero-buildings.jpg?optimize&as=picture";
import boiler from "@/assets/heating-boiler.jpg?optimize&as=picture";
import p7150 from "@/assets/photo-7150.jpg.asset.json";
import p7159 from "@/assets/photo-7159.jpg.asset.json";
import p7165 from "@/assets/photo-7165.jpg.asset.json";
import p1260 from "@/assets/photo-1260.jpg.asset.json";
import p2762 from "@/assets/photo-2762.jpg.asset.json";
import p2766 from "@/assets/photo-2766.jpg.asset.json";
import p2769 from "@/assets/photo-2769.jpg.asset.json";
import p2773 from "@/assets/photo-2773.jpg.asset.json";
import ddBoiler from "@/assets/de-dietrich-kociol.png.asset.json";
import n52 from "@/assets/photo-1000055852.jpg.asset.json";
import n54 from "@/assets/photo-1000055854.jpg.asset.json";
import n57 from "@/assets/photo-1000055857.jpg.asset.json";
import n58 from "@/assets/photo-1000055858.jpg.asset.json";
import n62 from "@/assets/photo-1000055862.jpg.asset.json";
import n67 from "@/assets/photo-1000055867.jpg.asset.json";
import n72 from "@/assets/photo-1000055872.jpg.asset.json";
import n73 from "@/assets/photo-1000055873.jpg.asset.json";
import n74 from "@/assets/photo-1000055874.jpg.asset.json";

const TITLE = "Galeria — Zarządzane Wspólnoty i Realizacje | Dalkowski";
const DESC = "Zobacz zdjęcia z zarządzanych przez nas wspólnot mieszkaniowych w Piasecznie, Warszawie, Konstancinie-Jeziornej i Józefosławiu oraz realizacje instalacji kotłów gazowych";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/galeria" },
      { property: "og:image", content: hero.img.src },
    ],
    links: [{ rel: "canonical", href: "/galeria" }],
  }),
  component: Galeria,
});

type Photo = { src: string; alt: string };

const realPhotos: Photo[] = [
  { src: p7150.url, alt: "Zarządzana wspólnota mieszkaniowa — elewacja budynku z balkonami i zadbaną zielenią" },
  { src: p7159.url, alt: "Samochód serwisowy Dalkowski — administracja nieruchomości, księgowość, konserwacja" },
  { src: p7165.url, alt: "Nowoczesny budynek wspólnoty mieszkaniowej z lokalami usługowymi w Józefosławiu" },
  { src: p1260.url, alt: "Samochód firmy Dalkowski przy budynku przy ul. Świetlistej w Józefosławiu" },
  { src: p2762.url, alt: "Biuro Dalkowski — zarządzanie wspólnotami mieszkaniowymi w Piasecznie" },
  { src: p2766.url, alt: "Recepcja w biurowcu — siedziba firmy Dalkowski Zarządzanie Nieruchomościami" },
  { src: p2769.url, alt: "Flota samochodów firmowych Dalkowski przed siedzibą firmy" },
  { src: p2773.url, alt: "Budynek biurowy — siedziba firmy Dalkowski w Piasecznie" },
];

const stockPhotos: Photo[] = [
  { src: ddBoiler.url, alt: "Kocioł gazowy kondensacyjny De Dietrich zamontowany w kuchni" },
  { src: g1.img.src, alt: "Osiedle mieszkaniowe — widok z lotu ptaka" },
  { src: g2.img.src, alt: "Wejście do budynku wspólnoty z zadbaną zielenią" },
  { src: g4.img.src, alt: "Plac zabaw na osiedlu w Józefosławiu" },
  { src: hero.img.src, alt: "Wewnętrzny dziedziniec wspólnoty w Piasecznie" },
  { src: g5.img.src, alt: "Elewacja budynku po termomodernizacji" },
  { src: g3.img.src, alt: "Serwisant Dalkowski Technika Grzewcza podczas przeglądu kotła" },
  { src: boiler.img.src, alt: "Instalacja nowego kotła gazowego" },
  { src: g6.img.src, alt: "Nowoczesny kocioł kondensacyjny" },
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
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">Z naszej codziennej pracy</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {realPhotos.map((it, i) => (
            <figure key={i} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <OptimizedImage
                picture={it.src}
                alt={it.alt}
                width={1920}
                height={1280}
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <figcaption className="p-4 text-xs text-muted-foreground">{it.alt}</figcaption>
            </figure>
          ))}
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold mt-16 mb-8">Realizacje i obiekty referencyjne</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stockPhotos.map((it, i) => (
            <figure key={i} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <OptimizedImage
                picture={it.src}
                alt={it.alt}
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
