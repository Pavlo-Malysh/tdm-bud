import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getProjectById } from "./projects-api.js";
import { refs } from "./refs.js";

refs.menuOpen.addEventListener("click", openMenu);
refs.menuClose.addEventListener("click", closeMenu);
refs.mobileMenu.addEventListener("click", closeOnBackdrop);
refs.mobileNavLinks.addEventListener("click", closeOnNavLink);
document.addEventListener("keydown", closeOnEscape);
refs.portfolioList.addEventListener("click", openPortfolioCard);
refs.faqListBtn.addEventListener("click", toggleFAQcard);
document.addEventListener("click", openModalOnTrigger);
refs.closeModalBtn.addEventListener("click", closeModal);
refs.modal.addEventListener("click", closeModalOnBackdrop);
refs.projectList.addEventListener("click", openProjectPhotos);

const lightboxes = {};

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
    closeModal();
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

function toggleFAQcard(e) {
  const item = e.target.closest("li");
  const list = e.currentTarget;
  const prevItem = list.querySelector(".is-open")


  if (!item) return;
  if (prevItem) {
    prevItem.classList.remove("is-open");
  }

  item.classList.add("is-open");

  if (prevItem === item) {
    prevItem.classList.remove("is-open");
  }
}


function openModal() {
  refs.modal.classList.add("is-open");
  document.body.classList.add("is-modal-open");
};

function openModalOnTrigger(e) {
  if (e.target.closest("[data-modal-open]")) {
    closeMenu();
    openModal();
  }
};

export function closeModal() {
  refs.modal.classList.remove("is-open");
  document.body.classList.remove("is-modal-open");
};


function closeModalOnBackdrop(e) {
  if (e.target === refs.modal) {
    closeModal();
  }
};



async function openProjectPhotos(e) {
  const btn = e.target.closest(".js-photos-btn")
  if (!btn) return;

  const card = e.target.closest("li");
  const id = card.id;

  if (lightboxes[id]) {
    lightboxes[id].open();
    return;
  }

  try {
    const photos = await getProjectById(id);

    const box = card.querySelector(".photos-box");
    box.innerHTML = photos.map((photo) => `<a href="${photo.url}"></a>`).join("");

    lightboxes[id] = new SimpleLightbox(`[id="${id}"] .photos-box a`);
    lightboxes[id].open();

  } catch (error) {
    console.log(error.message);

  }



}

