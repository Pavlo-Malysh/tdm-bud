import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const mq = window.matchMedia("(max-width:767.98px)");
let portfolioSwiper = null;

function togglePortfolioSwiper() {
  if (mq.matches && !portfolioSwiper) {
    portfolioSwiper = new Swiper(".portfolio-swiper", {
      modules: [Pagination],
      slidesPerView: 1.15,
      centeredSlides: true,
      spaceBetween: 12,
      loop: true,
      autoHeight: true,
      pagination: {
        el: ".portfolio-pagination",
        type: "bullets",
        clickable: true,
      }
    })
  } else if (!mq.matches && portfolioSwiper) {
    portfolioSwiper.destroy(true, true);
    portfolioSwiper = null;
  }
}

togglePortfolioSwiper();

mq.addEventListener("change", togglePortfolioSwiper);

