import { refs } from "./refs.js";

refs.menuOpen.addEventListener("click", openMenu);
refs.menuClose.addEventListener("click", closeMenu);
refs.mobileMenu.addEventListener("click", closeOnBackdrop);
refs.mobileNavLinks.addEventListener("click", closeOnNavLink);
document.addEventListener("keydown", closeOnEscape);
refs.portfolioList.addEventListener("click", openPortfolioCard);

function openMenu() {
  refs.mobileMenu.classList.add("is-open");
  document.body.classList.add("is-menu-open");
  refs.menuOpen.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  refs.mobileMenu.classList.remove("is-open");
  document.body.classList.remove("is-menu-open");
  refs.menuOpen.setAttribute("aria-expanded", "false");
}

function closeOnBackdrop(e) {
  if (e.target === refs.mobileMenu) {
    closeMenu();
  }
}

function closeOnNavLink(e) {
  if (e.target.closest("a")) {
    closeMenu();
  }
}

function closeOnEscape(e) {
  if (e.key === "Escape") {
    closeMenu();
  }
}

function openPortfolioCard(e) {
  const card = e.target.closest("li")
  const list = e.currentTarget
  const prevCard = list.querySelector(".open")

  if (!card) return;
  if (prevCard) {
    prevCard.classList.remove("open")
  }


  card.classList.add("open");

  if (prevCard === card) {
    prevCard.classList.remove("open");
  }
}