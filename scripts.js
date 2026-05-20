const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector("#site-menu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

const carousels = document.querySelectorAll("[data-carousel-root]");

for (const carousel of carousels) {
  const viewport = carousel.querySelector("[data-carousel-viewport]");
  const track = carousel.querySelector("[data-carousel-track]");
  const prev = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");

  if (!(viewport instanceof HTMLElement) || !(track instanceof HTMLElement) || !(prev instanceof HTMLButtonElement) || !(next instanceof HTMLButtonElement)) {
    continue;
  }

  const getStep = () => {
    const slide = track.querySelector(".carousel-slide");
    if (!(slide instanceof HTMLElement)) return 0;

    const gap = Number.parseFloat(getComputedStyle(track).gap || "0");
    const fullSlide = slide.getBoundingClientRect().width + gap;
    const visibleSlides = Math.max(1, Math.round((viewport.clientWidth + gap) / fullSlide));
    return visibleSlides * fullSlide;
  };

  const updateButtons = () => {
    const maxScroll = track.scrollWidth - viewport.clientWidth;
    const current = track.scrollLeft;
    prev.disabled = current <= 4;
    next.disabled = current >= maxScroll - 4;
  };

  prev.addEventListener("click", () => {
    track.scrollBy({ left: -getStep(), behavior: "smooth" });
  });

  next.addEventListener("click", () => {
    track.scrollBy({ left: getStep(), behavior: "smooth" });
  });

  track.addEventListener("scroll", updateButtons, { passive: true });
  window.addEventListener("resize", updateButtons);
  window.addEventListener("load", updateButtons, { once: true });
  updateButtons();
}
