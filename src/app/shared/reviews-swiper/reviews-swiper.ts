import { afterNextRender, Component, signal } from '@angular/core';
import { REVIEWS } from '@app/core/constants';
import Swiper from 'swiper';

@Component({
  selector: 'app-reviews-swiper',
  imports: [],
  templateUrl: './reviews-swiper.html',
  styleUrl: './reviews-swiper.scss'
})
export class ReviewsSwiper {
  constructor() {
    afterNextRender(() => {
      this.initSwiper();
    })
  }

  swiperID: string = 'reviews'
  swiper = signal<Swiper | undefined>(undefined)
  reviews = REVIEWS;

  initSwiper(): void {
    this.swiper.set(new Swiper(`#${this.swiperID}`, {

    }))
  }
}
