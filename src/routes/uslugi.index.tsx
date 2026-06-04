import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Flame, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

const TITLE = "Usługi — Zarządzanie Nieruchomościami i Technika Grzewcza | Dalkowski";
const DESC = "Pełen zakres usług firmy Dalkowski: zarządzanie wspólnotami mieszkaniowymi w Piasecznie oraz serwis i instalacja pieców centralnego ogrzewania.";

export const Route = createFileRoute("/uslugi/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/uslugi" },
    ],
    links: [{ rel: "canonical", href: "/uslugi" }],
  }),
  component: UslugiIndex,
});

function UslugiIndex() {
  return (
    <SiteLayout>
      <section className="bg-gradient-hero">
        <div className="container-page py-16 lg:py-24">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Nasze usługi</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold max-w-3xl">Dwa obszary działalności, jeden zaufany partner</h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl">
            Wybierz usługę, której potrzebujesz — kompleksowa administracja wspólnoty mieszkaniowej lub profesjonalny serwis pieca centralnego ogrzewania.
          </p>
        </div>
      </section>

      <section className="container-page py-16 grid md:grid-cols-2 gap-6">
        {[
          { to: "/uslugi/zarzadzanie-nieruchomosciami", icon: Building2, title: "Zarządzanie nieruchomościami", desc: "Obsługa administracyjna, księgowa i techniczna wspólnot mieszkaniowych w Piasecznie, Konstancinie i Józefosławiu." },
          { to: "/uslugi/technika-grzewcza", icon: Flame, title: "Technika grzewcza", desc: "Serwis, instalacja i przeglądy pieców c.o. Autoryzowany serwis De Dietrich. Naprawimy każdy piec." },
        ].map((s) => (
          <Link key={s.to} to={s.to} className="group rounded-3xl border border-border bg-card p-10 hover:shadow-soft hover:border-primary/30 transition-all">
            <div className="rounded-2xl bg-primary-soft p-4 w-fit"><s.icon className="h-8 w-8 text-primary" /></div>
            <h2 className="mt-5 text-2xl font-bold">{s.title}</h2>
            <p className="mt-3 text-muted-foreground">{s.desc}</p>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
              Przejdź do oferty <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </section>
    </SiteLayout>
  );
}
