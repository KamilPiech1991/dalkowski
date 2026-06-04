import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, AlertTriangle } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

const TITLE = "Kontakt — Dalkowski Piaseczno | Zarządzanie i Serwis Pieców";
const DESC = "Skontaktuj się z firmą Dalkowski w Piasecznie. Tel. +48 793 720 760 (biuro), +48 732 820 870 (awarie 24/7). ul. Armii Krajowej 2, 05-500 Piaseczno.";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/kontakt" },
    ],
    links: [{ rel: "canonical", href: "/kontakt" }],
  }),
  component: Kontakt,
});

function Kontakt() {
  return (
    <SiteLayout>
      <section className="bg-gradient-hero">
        <div className="container-page py-16 lg:py-24">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Kontakt</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold">Porozmawiajmy</h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
            Jeśli potrzebują Państwo dodatkowych wyjaśnień, służymy pomocą. Proszę dzwonić lub pisać na adres e-mail.
          </p>
        </div>
      </section>

      <section className="container-page py-16 grid lg:grid-cols-2 gap-10">
        <div className="space-y-5">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold flex items-center gap-2"><Phone className="h-5 w-5 text-primary" /> Biuro / zarządzanie</h2>
            <div className="mt-3 space-y-1 text-sm">
              <a href="tel:+48793720760" className="block font-semibold text-foreground hover:text-primary">+48 793 720 760</a>
              <a href="mailto:barbaradalkowska@gmail.com" className="block text-muted-foreground hover:text-primary">barbaradalkowska@gmail.com</a>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-primary" /> Dział techniczny — awarie</h2>
            <p className="text-xs text-muted-foreground mt-2">W sprawach zgłoszeń problemów lub awarii prosimy o kontakt z działem technicznym (całą dobę).</p>
            <div className="mt-3 space-y-1 text-sm">
              <a href="tel:+48732820870" className="block font-semibold text-foreground hover:text-primary">+48 732 820 870</a>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold flex items-center gap-2"><Phone className="h-5 w-5 text-primary" /> Technika grzewcza</h2>
            <div className="mt-3 space-y-1 text-sm">
              <a href="tel:+48792040540" className="block font-semibold text-foreground hover:text-primary">+48 792 040 540</a>
              <a href="mailto:serwis@technika-grzewcza-dalkowski.pl" className="block text-muted-foreground hover:text-primary">serwis@technika-grzewcza-dalkowski.pl</a>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Adres</h2>
            <address className="not-italic mt-3 text-sm text-muted-foreground">
              ul. Armii Krajowej 2<br />05-500 Piaseczno<br />Polska
            </address>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /> Godziny pracy</h2>
            <p className="mt-3 text-sm text-muted-foreground">Poniedziałek – Piątek: <strong className="text-foreground">10:00 – 17:00</strong></p>
            <p className="text-sm text-muted-foreground">Awarie pieców c.o.: <strong className="text-foreground">całą dobę</strong></p>
          </div>
        </div>

        <form
          className="rounded-2xl border border-border bg-card p-7 h-fit"
          onSubmit={(e) => {
            e.preventDefault();
            const f = e.currentTarget as HTMLFormElement;
            const fd = new FormData(f);
            const subject = `Wiadomość ze strony — ${fd.get("name") || "kontakt"}`;
            const body = `Imię: ${fd.get("name")}\nEmail: ${fd.get("email")}\n\n${fd.get("message")}`;
            window.location.href = `mailto:barbaradalkowska@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          }}
        >
          <h2 className="text-2xl font-bold">Napisz do nas</h2>
          <p className="text-sm text-muted-foreground mt-1">Odpowiemy w ciągu dnia roboczego.</p>
          <div className="mt-5 space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground" htmlFor="name">Imię i nazwisko</label>
              <input id="name" name="name" required className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground" htmlFor="email">E-mail</label>
              <input id="email" name="email" type="email" required className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground" htmlFor="message">Treść wiadomości</label>
              <textarea id="message" name="message" rows={6} required className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
            <button type="submit" className="w-full rounded-full bg-primary text-primary-foreground py-3 text-sm font-semibold hover:opacity-90">Wyślij wiadomość</button>
          </div>
        </form>
      </section>
    </SiteLayout>
  );
}
