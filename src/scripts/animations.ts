import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/*
 * Animacje GSAP — wyłącznie dodatek. Treść jest w HTML i widać ją bez JavaScriptu.
 * Klasę `anim` na <html> ustawia skrypt w <head> (tylko gdy użytkownik nie prosi
 * o ograniczenie ruchu); dopiero wtedy CSS ukrywa elementy przed animacją
 * (src/styles.css, sekcja „Animacje GSAP”).
 *
 * Znaczniki w HTML:
 *   [data-hero]           sekcja otwierająca: tytuł słowo po słowie i kolejne elementy od razu po wejściu
 *   [data-hero-image]     zdjęcie w sekcji otwierającej — rozwija się z ramki
 *   [data-float]          karta wskakująca na zdjęcie i delikatnie unosząca się
 *   [data-reveal]         element wjeżdża od dołu, gdy pojawi się na ekranie
 *   [data-reveal-group]   dzieci elementu wjeżdżają kolejno
 *   [data-reveal-image]   zdjęcie odsłania się „kurtyną” z lekkim przybliżeniem
 *   [data-count]          liczba odlicza od zera (np. „18+”, „15”)
 *   h2 w <main>           nagłówki sekcji wjeżdżają słowo po słowie
 */

const root = document.documentElement;

if (root.classList.contains("anim")) {
  root.classList.add("anim-ready");
  try {
    init();
  } catch (error) {
    // Coś poszło nie tak — pokaż wszystko bez animacji.
    root.classList.remove("anim");
    console.error(error);
  }
}

function init() {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "power3.out", duration: 0.8 });

  const all = (selector: string, scope: ParentNode = document) =>
    Array.from(scope.querySelectorAll<HTMLElement>(selector));
  const outsideHero = (el: Element) => !el.closest("[data-hero]");

  /**
   * Odsłania elementy ukryte przez CSS. Na czas animacji wyłącza przejścia CSS (karty mają
   * `transition-all` dla efektów hover), a po niej czyści style inline i oznacza element
   * klasą `revealed`, żeby hover działał jak dawniej.
   */
  function reveal(targets: Element[], vars: gsap.TweenVars = {}) {
    return gsap.to(targets, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      stagger: 0.08,
      overwrite: true,
      ...vars,
      onStart: () => targets.forEach((el) => ((el as HTMLElement).style.transition = "none")),
      onComplete: () => {
        targets.forEach((el) => el.classList.add("revealed"));
        gsap.set(targets, { clearProps: "all" });
      },
    });
  }

  /** Nagłówek rozbity na słowa, każde wysuwa się spod maski. */
  function splitWords(heading: HTMLElement) {
    const split = SplitText.create(heading, {
      type: "words",
      mask: "words",
      wordsClass: "split-word",
      aria: "auto",
    });
    gsap.set(heading, { visibility: "visible" });
    return split.words;
  }

  /** Liczba z przyrostkiem (np. „18+”) odlicza od zera; inne teksty („24/7”) zostają. */
  function countUp(el: HTMLElement, delay = 0) {
    const match = el.textContent?.trim().match(/^(\d+)(\D*)$/);
    if (!match) return;
    const [, digits, suffix] = match;
    const value = { n: 0 };
    el.textContent = `0${suffix}`;
    gsap.to(value, {
      n: Number(digits),
      duration: 1.6,
      delay,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = `${Math.round(value.n)}${suffix}`;
      },
    });
  }

  // ---- Sekcja otwierająca: animacja od razu po wejściu na stronę ----
  all("[data-hero]").forEach((hero) => {
    const tl = gsap.timeline({ delay: 0.1 });

    const title = hero.querySelector<HTMLElement>("h1");
    if (title) tl.from(splitWords(title), { yPercent: 110, duration: 0.9, stagger: 0.06 });

    const image = hero.querySelector("[data-hero-image]");
    if (image) {
      tl.fromTo(
        image,
        { clipPath: "inset(12% 12% 12% 12% round 1.5rem)", scale: 1.04 },
        {
          clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
          scale: 1,
          duration: 1.4,
          ease: "expo.out",
          onComplete: () => {
            image.classList.add("revealed");
            gsap.set(image, { clearProps: "clipPath,transform" });
          },
        },
        0,
      );
    }

    const items = all("[data-reveal]", hero);
    if (items.length) tl.add(reveal(items), "-=0.5");

    const floating = hero.querySelector<HTMLElement>("[data-float]");
    if (floating) {
      tl.to(
        floating,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          ease: "back.out(1.6)",
          onComplete: () => {
            floating.classList.add("revealed");
            // Delikatne „unoszenie się” karty.
            gsap.to(floating, { y: -8, duration: 2.4, ease: "sine.inOut", repeat: -1, yoyo: true });
          },
        },
        "-=0.4",
      );
    }

    all("[data-count]", hero).forEach((el, i) => countUp(el, 0.6 + i * 0.1));
  });

  // Elementy poniżej tworzone w kolejności występowania na stronie (ważne dla ScrollTrigger).

  // ---- Nagłówki sekcji ----
  all("main h2")
    .filter(outsideHero)
    .forEach((heading) => {
      const scrollTrigger = { trigger: heading, start: "top 90%", once: true };
      // Nagłówki z ikoną wjeżdżają w całości (ikony nie dzielimy na słowa).
      if (heading.querySelector("svg")) {
        gsap.fromTo(heading, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, scrollTrigger });
        return;
      }
      gsap.from(splitWords(heading), { yPercent: 110, stagger: 0.05, scrollTrigger });
    });

  // ---- Pojedyncze elementy ----
  ScrollTrigger.batch(all("[data-reveal]").filter(outsideHero), {
    start: "top 90%",
    once: true,
    onEnter: (batch) => reveal(batch, { stagger: 0.1 }),
  });

  // ---- Grupy: karty, listy, kafelki ----
  all("[data-reveal-group]")
    .filter(outsideHero)
    .forEach((group) => {
      ScrollTrigger.batch(Array.from(group.children), {
        start: "top 92%",
        once: true,
        onEnter: (batch) => reveal(batch),
      });
    });

  // ---- Zdjęcia ----
  all("[data-reveal-image]")
    .filter(outsideHero)
    .forEach((wrapper) => {
      const img = wrapper.querySelector("img");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrapper, start: "top 85%", once: true },
        onComplete: () => {
          wrapper.classList.add("revealed");
          gsap.set(img ? [wrapper, img] : wrapper, { clearProps: "clipPath,transform" });
        },
      });
      tl.to(wrapper, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.inOut" });
      if (img) tl.from(img, { scale: 1.15, duration: 1.6, ease: "expo.out" }, 0.2);
    });

  // ---- Liczniki poza sekcją otwierającą ----
  all("[data-count]")
    .filter(outsideHero)
    .forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () => countUp(el),
      });
    });

  // ---- Pasek postępu przewijania i cień nagłówka ----
  const progress = document.querySelector("[data-scroll-progress]");
  if (progress) {
    gsap.to(progress, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });
  }
  const header = document.querySelector("[data-header]");
  if (header) {
    ScrollTrigger.create({
      start: 40,
      end: "max",
      toggleClass: { targets: header, className: "is-scrolled" },
    });
  }

  // Zdjęcia i fonty zmieniają wysokość strony — przelicz punkty startowe.
  window.addEventListener("load", () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
