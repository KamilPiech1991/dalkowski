import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import logoAsset from "@/assets/logo-dalkowski.png.asset.json";

const nav = [
  { to: "/", label: "Strona główna" },
  { to: "/o-nas", label: "O nas" },
  {
    to: "/uslugi",
    label: "Usługi",
    children: [
      { to: "/uslugi/zarzadzanie-nieruchomosciami", label: "Zarządzanie nieruchomościami" },
      { to: "/uslugi/konserwacja-nieruchomosci", label: "Konserwacja nieruchomości" },
      { to: "/uslugi/technika-grzewcza", label: "Technika grzewcza" },
    ],
  },
  { to: "/galeria", label: "Galeria" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-24 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3" aria-label="Dalkowski — strona główna">
          <img src={logoAsset.url} alt="Dalkowski" className="h-14 lg:h-16 w-auto" width={213} height={64} />
        </Link>


        <nav className="hidden lg:flex items-center gap-1" aria-label="Główna nawigacja">
          {nav.map((item) =>
            "children" in item && item.children ? (
              <div key={item.to} className="group relative">
                <Link
                  to={item.to}
                  className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  activeProps={{ className: "text-primary" }}
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4" />
                </Link>
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all absolute left-0 top-full pt-2 min-w-72">
                  <div className="rounded-xl border border-border bg-popover shadow-soft p-2">
                    {item.children.map((c) => (
                      <Link
                        key={c.to}
                        to={c.to}
                        className="block rounded-lg px-3 py-2.5 text-sm text-foreground/80 hover:bg-primary-soft hover:text-primary transition-colors"
                        activeProps={{ className: "bg-primary-soft text-primary" }}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                activeProps={{ className: "text-primary" }}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+48574988293"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Phone className="h-4 w-4" />
            +48 574 988 293
          </a>
        </div>

        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Otwórz menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-page py-4 flex flex-col gap-1">
            {nav.map((item) =>
              "children" in item && item.children ? (
                <div key={item.to}>
                  <button
                    onClick={() => setMobileSub((v) => !v)}
                    className="w-full flex items-center justify-between px-3 py-3 text-base font-medium text-foreground/90"
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobileSub ? "rotate-180" : ""}`} />
                  </button>
                  {mobileSub && (
                    <div className="pl-4 flex flex-col">
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="px-3 py-2 text-sm text-foreground/70 hover:text-primary"
                      >
                        Usługi — przegląd
                      </Link>
                      {item.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          onClick={() => setOpen(false)}
                          className="px-3 py-2 text-sm text-foreground/70 hover:text-primary"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 text-base font-medium text-foreground/90 hover:text-primary"
                >
                  {item.label}
                </Link>
              )
            )}
            <a
              href="tel:+48574988293"
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Phone className="h-4 w-4" />
              +48 574 988 293
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
