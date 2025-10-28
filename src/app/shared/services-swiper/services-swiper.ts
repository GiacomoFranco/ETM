import { afterNextRender, ChangeDetectorRef, Component, inject, signal } from '@angular/core';

import { SERVICES } from '@app/core/constants';
import { Autoplay } from 'swiper/modules';
import Swiper from 'swiper';
import { ServiceCard } from "../service-card/service-card";

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

  cdr = inject(ChangeDetectorRef)
  swiper= signal<Swiper | undefined>(undefined);
  swiperID: string = 'services';
  // allowControls: boolean;
  services = SERVICES;

  initSwiper(): void {
    this.swiper.set(
      new Swiper(`#${this.swiperID}`, {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 10,
        modules: [Autoplay],
        autoplay: {
          delay: 5000,
        },
        breakpoints: {
          1150: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 33,
          },
        },
      })
    );
  }
}
