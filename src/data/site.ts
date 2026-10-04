export const SITE_NAME = "Dalkowski";
export const BUSINESS_NAME = "Dalkowski – Zarządzanie Nieruchomościami i Technika Grzewcza";

export const PHONES = {
  office: { href: "tel:+48574988293", label: "+48 574 988 293" },
  management: { href: "tel:+48793720760", label: "+48 793 720 760" },
  technical: { href: "tel:+48730704502", label: "+48 730 704 502" },
} as const;

export const EMAILS = {
  office: "adm.dalkowski@gmail.com",
  management: "barbaradalkowska@gmail.com",
  technical: "dalkowskiroman@gmail.com",
} as const;

export const DEFAULT_OG_IMAGE = "/og-image.png";

export type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

export const NAV: NavItem[] = [
  { href: "/", label: "Strona główna" },
  { href: "/o-nas", label: "O nas" },
  {
    href: "/uslugi",
    label: "Usługi",
    children: [
      { href: "/uslugi/zarzadzanie-nieruchomosciami", label: "Zarządzanie nieruchomościami" },
      { href: "/uslugi/konserwacja-nieruchomosci", label: "Konserwacja nieruchomości" },
      { href: "/uslugi/technika-grzewcza", label: "Technika grzewcza" },
    ],
  },
  { href: "/galeria", label: "Galeria" },
  { href: "/kontakt", label: "Kontakt" },
];

export const SITEMAP: { path: string; priority: string; changefreq: string }[] = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/o-nas", priority: "0.8", changefreq: "monthly" },
  { path: "/uslugi", priority: "0.8", changefreq: "monthly" },
  { path: "/uslugi/zarzadzanie-nieruchomosciami", priority: "0.9", changefreq: "monthly" },
  { path: "/uslugi/konserwacja-nieruchomosci", priority: "0.9", changefreq: "monthly" },
  { path: "/uslugi/technika-grzewcza", priority: "0.9", changefreq: "monthly" },
  { path: "/galeria", priority: "0.6", changefreq: "monthly" },
  { path: "/kontakt", priority: "0.7", changefreq: "yearly" },
];

export const LOCAL_BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BUSINESS_NAME,
  telephone: "+48574988293",
  email: EMAILS.office,
  address: {
    "@type": "PostalAddress",
    streetAddress: "ul. Armii Krajowej 2",
    addressLocality: "Piaseczno",
    postalCode: "05-500",
    addressCountry: "PL",
  },
  areaServed: ["Piaseczno", "Konstancin-Jeziorna", "Józefosław", "Warszawa"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "17:00",
    },
  ],
  founder: "Barbara Dalkowska",
  foundingDate: "2006",
};
