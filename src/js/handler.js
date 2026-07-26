import { refs } from "./refs.js";

refs.menuOpen.addEventListener("click", toggleBurgerMenu);

refs.menuClose.addEventListener("click", toggleBurgerMenu);

document.addEventListener("keydown", closeModalKeydown);




function toggleBurgerMenu() {
  refs.mobileMenu.classList.toggle("is-open");
};

function closeModalKeydown(e) {
  if (e.key === "Escape") {
    if (refs.mobileMenu.classList.contains("mobile-menu", "is-open")) {
      refs.mobileMenu.classList.remove("is-open");
    }
  }
};