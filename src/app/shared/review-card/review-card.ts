import { Component, input } from '@angular/core';

import { Rating } from '../rating/rating';

@Component({
  selector: 'app-review-card',
  imports: [Rating],
  templateUrl: './review-card.html',
  styleUrl: './review-card.scss',
})
export class ReviewCard {
  clientName = input<string>('');
  clientImage = input<string>('');
  clientRole = input<string>('');
  rating = input<number>(0);
  review = input<string>('');
}
