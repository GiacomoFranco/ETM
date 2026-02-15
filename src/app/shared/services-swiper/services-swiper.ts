import { Component, afterNextRender, signal } from '@angular/core';

import { SERVICES } from '@app/core/constants';

import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

import { ServiceCard } from '../service-card/service-card';

@Component({
  selector: 'app-services-swiper',
  imports: [ServiceCard],
  templateUrl: './services-swiper.html',
  styleUrl: './services-swiper.scss',
})
export class ServicesSwiper {
  constructor() {
    afterNextRender(() => {
      this.initSwiper();
    });
  }

  swiper = signal<Swiper | undefined>(undefined);
  swiperID: string = 'services';
  services = SERVICES;

  initSwiper(): void {
    this.swiper.set(
      new Swiper(`#${this.swiperID}`, {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 10,
        loop: true,
        // modules: [Autoplay],
        // autoplay: {
        //   delay: 5000,
        //   pauseOnMouseEnter: true,
        // },
        breakpoints: {
          1150: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 33,
          },
        },
      }),
    );
  }

  navigateToNextGroup() {
    this.swiper()?.slideNext();
  }

  navigateToPrevGroup() {
    this.swiper()?.slidePrev();
  }
}
