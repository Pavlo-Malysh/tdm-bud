import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const swiperReviews = new Swiper(".reviews-swiper", {
  modules: [Navigation, Pagination],
  slidesPerView: 1.15,
  centeredSlides: true,
  spaceBetween: 12,
  initialSlide: 1,

  pagination: {
    el: ".reviews-pagination",
    type: "bullets",
    clickable: true,
  },

  navigation: {
    prevEl: ".reviews-prev",
    nextEl: ".reviews-next",
  },

  breakpoints: {
    768: {
      slidesPerView: 1.8,
      centeredSlides: true,
      spaceBetween: 16,
    },
    1200: {
      slidesPerView: 3,
      centeredSlides: false,
      spaceBetween: 24,
    },
  },
});
