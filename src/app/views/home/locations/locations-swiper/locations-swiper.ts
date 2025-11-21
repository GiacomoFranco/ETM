import { Component, afterNextRender, signal } from '@angular/core';

import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

import { LocationCard } from './location-card/location-card';

@Component({
  selector: 'app-locations-swiper',
  imports: [LocationCard],
  templateUrl: './locations-swiper.html',
  styleUrl: './locations-swiper.scss',
})
export class LocationsSwiper {
  constructor() {
    afterNextRender(() => {
      this.initSwiper();
    });
  }

  swiper = signal<Swiper | undefined>(undefined);
  swiperID: string = 'locations';
  // locations = LOCATIONS;

  initSwiper(): void {
    this.swiper.set(
      new Swiper(`#${this.swiperID}`, {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 29,
        loop: true,
        modules: [Autoplay],
        autoplay: {
          delay: 5000,
          pauseOnMouseEnter: true,
        },
        breakpoints: {
          800: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 33,
          },
          1200: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 33,
          },
          1700: {
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
