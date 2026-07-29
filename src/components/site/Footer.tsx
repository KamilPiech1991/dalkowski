import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import logoAsset from "@/assets/logo-dalkowski.png.asset.json";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/60">
      <div className="container-page py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={logoAsset.url} alt="Dalkowski" className="h-12 w-auto mb-4" width={160} height={48} />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Profesjonalne zarządzanie nieruchomościami oraz serwis pieców centralnego ogrzewania.
            Piaseczno i okolice. Działamy od 2006 roku.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Nawigacja</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
            <li><Link to="/o-nas" className="text-muted-foreground hover:text-primary">O nas</Link></li>
            <li><Link to="/uslugi/zarzadzanie-nieruchomosciami" className="text-muted-foreground hover:text-primary">Zarządzanie nieruchomościami</Link></li>
            <li><Link to="/uslugi/konserwacja-nieruchomosci" className="text-muted-foreground hover:text-primary">Konserwacja nieruchomości</Link></li>
            <li><Link to="/uslugi/technika-grzewcza" className="text-muted-foreground hover:text-primary">Technika grzewcza</Link></li>
            <li><Link to="/galeria" className="text-muted-foreground hover:text-primary">Galeria</Link></li>
            <li><Link to="/kontakt" className="text-muted-foreground hover:text-primary">Kontakt</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Kontakt</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-primary" /> ul. Armii Krajowej 2, 05-500 Piaseczno</li>
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-primary" /> <a href="tel:+48793720760" className="hover:text-primary">+48 793 720 760</a></li>
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-primary" /> <a href="tel:+48732820870" className="hover:text-primary">+48 732 820 870 (awarie)</a></li>
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 text-primary" /> <a href="mailto:barbaradalkowska@gmail.com" className="hover:text-primary">barbaradalkowska@gmail.com</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Godziny pracy</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><Clock className="h-4 w-4 mt-0.5 text-primary" /> Pon. – Pt. 10:00 – 17:00</li>
            <li className="pl-6">Awarie w zarządzanych wspólnotach – 24/7</li>
            <li className="pl-6 text-xs pt-2">Licencja zawodowa nr 23367</li>
            <li className="pl-6 text-xs">NIP 821-137-87-39</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page py-6 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Dalkowski – Zarządzanie Nieruchomościami & Technika Grzewcza. Wszelkie prawa zastrzeżone.</p>
          <p>Piaseczno · Konstancin-Jeziorna · Józefosław</p>
        </div>
      </div>
    </footer>
  );
}
