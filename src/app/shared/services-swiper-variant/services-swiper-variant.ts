import { Component, afterNextRender, signal } from '@angular/core';

import { SERVICES } from '@app/core/constants';

import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

import { ServiceCard } from '../service-card/service-card';

@Component({
  selector: 'app-services-swiper-variant',
  imports: [ServiceCard],
  templateUrl: './services-swiper-variant.html',
  styleUrl: './services-swiper-variant.scss',
})
export class ServicesSwiperVariant {
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
        spaceBetween: 16,
        navigation: {
          nextEl: '#next',
          prevEl: '#prev',
        },
        modules: [Autoplay],
        autoplay: {
          delay: 5000,
          pauseOnMouseEnter: true,
        },
        breakpoints: {
          750: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 20,
          },
          1000: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 33,
          },
          1400: {
            slidesPerView: 4,
            slidesPerGroup: 1,
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
