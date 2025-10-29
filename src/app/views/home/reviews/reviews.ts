import { Component } from '@angular/core';
import { Divider } from "@app/shared";
import { ReviewsSwiper } from "@app/shared/reviews-swiper/reviews-swiper";

@Component({
  selector: 'app-reviews',
  imports: [Divider, ReviewsSwiper],
  templateUrl: './reviews.html',
  styleUrl: './reviews.scss'
})
export class Reviews {

}
