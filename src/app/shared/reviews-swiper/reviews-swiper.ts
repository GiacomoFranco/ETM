import { Component, afterNextRender, input, signal } from '@angular/core';

import { REVIEWS } from '@app/core/constants';

import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

import { ReviewCard } from '../review-card/review-card';

@Component({
  selector: 'app-reviews-swiper',
  imports: [ReviewCard],
  templateUrl: './reviews-swiper.html',
  styleUrl: './reviews-swiper.scss',
})
export class ReviewsSwiper {
  constructor() {
    afterNextRender(() => {
      this.initSwiper();
    });
  }

  swiperID = input.required<string>();
  swiper = signal<Swiper | undefined>(undefined);
  reversedDirection = input<boolean>(false);
  reviews = REVIEWS;

  initSwiper(): void {
    this.swiper.set(
      new Swiper(`#${this.swiperID()}`, {
        slidesPerView: 1,
        spaceBetween: 27,
        modules: [Autoplay],
        loop: true,
        autoplay: {
          delay: 0,
          reverseDirection: this.reversedDirection(),
          pauseOnMouseEnter: true,
        },
        speed: 60000,
        breakpoints: {
          1120: {
            slidesPerView: 2,
            spaceBetween: 27,
          },
          1600: {
            slidesPerView: 3,
            spaceBetween: 27,
          },
        },
      }),
    );
  }
}
