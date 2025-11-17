import { afterNextRender, Component, input, signal } from '@angular/core';
import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

@Component({
  selector: 'app-galery-swiper',
  imports: [],
  templateUrl: './galery-swiper.html',
  styleUrl: './galery-swiper.scss',
})
export class GalerySwiper {
  constructor() {
    afterNextRender(() => {
      this.initSwiper();
    });
  }

  swiperID = input.required<string>();
  swiper = signal<Swiper | undefined>(undefined);
  // reviews = REVIEWS;

  initSwiper(): void {
    this.swiper.set(
      new Swiper(`#${this.swiperID()}`, {
        slidesPerView: 1,
        spaceBetween: 27,
        modules: [Autoplay],
        loop: true,
        autoplay: {
          delay: 0,
          pauseOnMouseEnter: true,
        },
        speed: 30000,
        breakpoints: {
          850: {
            slidesPerView: 2,
            spaceBetween: 27,
          },
          1600: {
            slidesPerView: 3,
            spaceBetween: 27,
          },
          2500: {
            slidesPerView: 4,
            spaceBetween: 27,
          },
        },
      })
    );
  }
}
