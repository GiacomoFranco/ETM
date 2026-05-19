import { Component, afterNextRender, inject, input, signal } from '@angular/core';

import { catchError, of } from 'rxjs';

import { REVIEWS } from '@app/core/constants';
import { Reviews } from '@core/models';
import { ReviewsService } from '@core/services/reviews.service';

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
  private readonly reviewsService = inject(ReviewsService);
  loading = signal(true);

  constructor() {
    afterNextRender(() => {
      this.loadReviews();
    });
  }

  swiperID = input.required<string>();
  swiper = signal<Swiper | undefined>(undefined);
  reversedDirection = input<boolean>(false);
  reviews: Reviews = REVIEWS;

  initSwiper(retries = 3): void {
    const root = document.getElementById(this.swiperID());
    const wrapper = root?.querySelector('.swiper-wrapper');

    if (!root || !wrapper) {
      if (retries > 0) requestAnimationFrame(() => this.initSwiper(retries - 1));
      return;
    }

    this.swiper()?.destroy(true, true);

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

  private loadReviews(): void {
    this.reviewsService
      .getReviews()
      .pipe(catchError(() => of(REVIEWS)))
      .subscribe((reviews) => {
        this.reviews = reviews;
        this.loading.set(false);
        setTimeout(() => this.initSwiper(), 0);
      });
  }
}
