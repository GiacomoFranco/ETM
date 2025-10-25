import { afterNextRender, Component, signal } from '@angular/core';

import { SERVICES } from '@app/core/constants';
import { Autoplay } from 'swiper/modules';
import Swiper from 'swiper';

@Component({
  selector: 'app-services-swiper',
  imports: [],
  templateUrl: './services-swiper.html',
  styleUrl: './services-swiper.scss',
})
export class ServicesSwiper {
  constructor() {
    afterNextRender(() => {
      this.initSwiper();
    });
  }

  swiper= signal<Swiper | undefined>(undefined);
  swiperID: string = 'services';
  // allowControls: boolean;
  services = SERVICES;

  initSwiper(): void {
    this.swiper.set(new Swiper(`#${this.swiperID}`, {
      loop: true,
      modules: [Autoplay],
      slidesPerView: 1,
      slidesPerGroup: 2,
      spaceBetween: 35,
      autoplay: {
        delay: 0,
      },
      speed: 90000,
      breakpoints: {
        800: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        1470: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
      },
    }));
  }
}
