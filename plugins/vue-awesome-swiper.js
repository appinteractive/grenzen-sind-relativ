import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { Swiper, Navigation, Pagination, Autoplay } from 'swiper'

// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

// Install modules
Swiper.use([Navigation, Pagination, Autoplay]);


