import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, AlertTriangle } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

const TITLE = "Kontakt — Dalkowski Piaseczno | Zarządzanie i Serwis Kotłów Gazowych";
const DESC = "Skontaktuj się z firmą Dalkowski w Piasecznie i Warszawie. Tel. +48 574 988 293 (biuro), +48 793 720 760 (zarządzanie nieruchomościami), +48 730 704 502 (technika grzewcza, hydraulika, elektryka). ul. Armii Krajowej 2, 05-500 Piaseczno.";

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
            <h2 className="text-lg font-bold flex items-center gap-2"><Phone className="h-5 w-5 text-primary" /> Biuro — umawianie wizyt i zgłoszenia</h2>
            <p className="text-xs text-muted-foreground mt-2">Główny numer kontaktowy do wszystkich usług — zarządzanie, konserwacja i technika grzewcza.</p>
            <div className="mt-3 space-y-1 text-sm">
              <a href="tel:+48574988293" className="block font-semibold text-foreground hover:text-primary">+48 574 988 293</a>
              <a href="mailto:adm.dalkowski@gmail.com" className="block text-muted-foreground hover:text-primary">adm.dalkowski@gmail.com</a>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold flex items-center gap-2"><Phone className="h-5 w-5 text-primary" /> Zarządzanie nieruchomościami</h2>
            <p className="text-xs text-muted-foreground mt-2">Barbara Dalkowska — zarządca nieruchomości. Gdy numer jest zajęty, prosimy dzwonić do biura.</p>
            <div className="mt-3 space-y-1 text-sm">
              <a href="tel:+48793720760" className="block font-semibold text-foreground hover:text-primary">+48 793 720 760</a>
              <a href="tel:+48574988293" className="block text-muted-foreground hover:text-primary">+48 574 988 293 (biuro)</a>
              <a href="mailto:barbaradalkowska@gmail.com" className="block text-muted-foreground hover:text-primary">barbaradalkowska@gmail.com</a>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-primary" /> Kotły gazowe, hydraulika, elektryka</h2>
            <p className="text-xs text-muted-foreground mt-2">Pan Roman — serwis kotłów gazowych De Dietrich, usługi hydrauliczne, elektryczne i złota rączka. Całodobowa reakcja dotyczy wspólnot, dla których pełnimy funkcję administratora i/lub konserwatora; z klientami indywidualnymi umawiamy się na dogodne godziny.</p>
            <div className="mt-3 space-y-1 text-sm">
              <a href="tel:+48730704502" className="block font-semibold text-foreground hover:text-primary">+48 730 704 502</a>
              <a href="tel:+48574988293" className="block text-muted-foreground hover:text-primary">+48 574 988 293 (biuro)</a>
              <a href="mailto:dalkowskiroman@gmail.com" className="block text-muted-foreground hover:text-primary">dalkowskiroman@gmail.com</a>
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
            <p className="text-sm text-muted-foreground">Serwis kotłów gazowych: <strong className="text-foreground">wizyty w uzgodnionych godzinach</strong></p>
          </div>
        </div>

        <form
          className="rounded-2xl border border-border bg-card p-7 h-fit"
          onSubmit={(e) => {
            e.preventDefault();
            const f = e.currentTarget as HTMLFormElement;
            const fd = new FormData(f);
            const topic = String(fd.get("topic") || "");
            const subject = `[${topic}] Wiadomość ze strony — ${fd.get("name") || "kontakt"}`;
            const body = `Temat: ${topic}\nImię: ${fd.get("name")}\nEmail: ${fd.get("email")}\n\n${fd.get("message")}`;
            window.location.href = `mailto:adm.dalkowski@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          }}
        >
          <h2 className="text-2xl font-bold">Napisz do nas</h2>
          <p className="text-sm text-muted-foreground mt-1">Odpowiemy w ciągu dnia roboczego.</p>
          <div className="mt-5 space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground" htmlFor="topic">Temat kontaktu <span className="text-primary">*</span></label>
              <select id="topic" name="topic" required defaultValue="" className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40">
                <option value="" disabled>Wybierz temat…</option>
                <option value="Kotły gazowe">Kotły gazowe</option>
                <option value="Administracja">Administracja</option>
                <option value="Konserwacja techniczna">Konserwacja techniczna</option>
              </select>
              <p className="mt-1 text-xs text-muted-foreground">Dzięki temu wiadomość trafi od razu do właściwej osoby.</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground" htmlFor="name">Imię i nazwisko</label>
              <input id="name" name="name" required maxLength={100} className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground" htmlFor="email">E-mail</label>
              <input id="email" name="email" type="email" required maxLength={255} className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground" htmlFor="message">Treść wiadomości</label>
              <textarea id="message" name="message" rows={6} required maxLength={2000} className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </div>
            <button type="submit" className="w-full rounded-full bg-primary text-primary-foreground py-3 text-sm font-semibold hover:opacity-90">Wyślij wiadomość</button>
          </div>
        </form>

      </section>
    </SiteLayout>
  );
}
