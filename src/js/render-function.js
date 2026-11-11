import { getProjects } from "./projects-api.js";
import { refs } from "./refs.js";
import { initPortfolioSwiper } from "./swiper-portfolio.js";



async function createProjectList() {
  const projects = await getProjects();

  if (!projects || projects.length === 0) return;

  const markup = renderProjectsCards(projects);

  refs.projectList.insertAdjacentHTML("afterbegin", markup);

  initPortfolioSwiper();
};

createProjectList();

function renderProjectCard(obj) {
  const { _id, cover, description, title, photos } = obj;

  return `<li class="portfolio-list-item swiper-slide" id="${_id}">
          <button type="button" class="portfolio-icon-card-wrap js-photos-btn" >
            <svg class="portfolio-icon" width="16" height="16" aria-hidden="true">
              <use href="./sprite.svg#icon-photo-card"></use>
            </svg>
            <span class="portfolio-icon-text">1 / ${photos.length}</span>
          </button>
          <picture>
            <source media="(min-width:768px)" srcset="${cover.desktop}">
            <img src="${cover.mobile}" alt="${description}"
              width="343" height="245" loading="lazy" class="portfolio-img">
          </picture>

          <p class="portfolio-list-text">${title}</p>

           <div class="photos-box" hidden></div>
        </li>`
};


function renderProjectsCards(array) {
  return array.map(renderProjectCard).join("\n")
};

