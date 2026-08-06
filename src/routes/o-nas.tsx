import { createFileRoute } from "@tanstack/react-router";
import { Award, MapPin, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { OptimizedImage } from "@/components/site/OptimizedImage";
import portrait from "@/assets/about-portrait.jpg?optimize&as=picture";

const TITLE = "O nas — Dalkowski Piaseczno | 18+ lat doświadczenia";
const DESC = "Poznaj Barbarę Dalkowską i firmę Dalkowski — zarządzanie wspólnotami mieszkaniowymi i serwis kotłów gazowych c.o. w Piasecznie od 2006 roku. Licencja zawodowa nr 23367.";

export const Route = createFileRoute("/o-nas")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/o-nas" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/o-nas" }],
  }),
  component: ONas,
});

const wspolnoty = [
  "WM Brzozowy Park, ul. Ogrodowa 8, Józefosław",
  "WM Bielawska 24, Konstancin-Jeziorna",
  "WM Nadarzyńska 38, Piaseczno",
  "WM Valor Konstancin, Konstancin-Jeziorna",
  "WM Planety 20-26, Józefosław",
  "WM Okulickiego 30, Piaseczno",
  "WM Okulickiego 32, Piaseczno",
  "WM ul. Ogrodowa 15a, Józefosław",
  "WM ul. Świetlista, Józefosław",
  "Stowarzyszenie ul. Świetlista, Józefosław",
  "Nieruchomości ul. Planety 2 i Wilanowska 11, Józefosław",
];

function ONas() {
  return (
    <SiteLayout>
      <section className="bg-gradient-hero">
        <div className="container-page py-16 lg:py-24">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">O nas</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold max-w-3xl">
            Lokalne doświadczenie w zarządzaniu nieruchomościami od 2006 roku
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl">
            Firma Dalkowski to rodzinna marka z Piaseczna, która łączy administrację wspólnotami mieszkaniowymi z autoryzowanym serwisem kotłów gazowych centralnego ogrzewania.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid lg:grid-cols-[400px_1fr] gap-12">
          <div>
            <OptimizedImage picture={portrait} alt="Barbara Dalkowska — właścicielka firmy Dalkowski" width={1000} height={1200} className="rounded-2xl shadow-soft w-full h-auto object-cover" />
            <div className="mt-6 rounded-2xl border border-border p-5 bg-card">
              <div className="flex items-center gap-2 text-sm font-semibold"><Award className="h-4 w-4 text-primary" /> Licencja zawodowa nr 23367</div>
              <p className="text-xs text-muted-foreground mt-2">Polisa Odpowiedzialności Cywilnej Zarządcy Nieruchomości – 50 000 € (UNIQA).</p>
            </div>
          </div>

          <div className="prose-content">
            <h2 className="text-2xl sm:text-3xl font-bold">Barbara Dalkowska — właścicielka</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Moje doświadczenie w zarządzaniu Wspólnotą sięga 2004 roku, kiedy zostałam członkiem Zarządu Wspólnoty Mieszkaniowej „Staszica 42" w Piasecznie — 8 budynków, łącznie 121 lokali. Doświadczenie jakie tam zdobyłam to prawdziwa szkoła zarządzania.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Budynki były w upadłości deweloperskiej, brakowało finansowania na media i utrzymanie nieruchomości. Poprzez zmianę organizacji pracy, negocjacje z dostawcami i osobiste zaangażowanie udało się uporządkować finanse wspólnoty oraz znaleźć środki na niezbędne remonty, m.in. dachów i balkonów.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Na co dzień stawiam na bezpośredni kontakt, przejrzystą sprawozdawczość i szybkie reagowanie na zgłoszenia mieszkańców. Zależy mi, żeby każdy właściciel wiedział, na co idą pieniądze wspólnoty i w jakim stanie jest jego budynek.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Uważam, że <strong className="text-foreground">każda nieruchomość ma odmienną specyfikę</strong> — dlatego docelowy model administrowania zawsze wypracowuję wspólnie z mieszkańcami i Członkami Wspólnoty, których zdanie i oczekiwania są dla mnie kluczowe.
            </p>

            <h3 className="mt-10 text-xl font-bold flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Obecnie administrujemy</h3>
            <ul className="mt-4 grid sm:grid-cols-2 gap-2">
              {wspolnoty.map((w) => (
                <li key={w} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {w}</li>
              ))}
            </ul>

            <h3 className="mt-10 text-xl font-bold">Technika grzewcza</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              W 2020 roku rozszerzyliśmy działalność o serwis i instalację kotłów gazowych centralnego ogrzewania. Nasi specjaliści mają wieloletnie doświadczenie i autoryzację jednego z wiodących producentów — <strong className="text-foreground">De Dietrich</strong>. Specjalizujemy się wyłącznie w kotłach De Dietrich — dzięki temu znamy je od podszewki.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
