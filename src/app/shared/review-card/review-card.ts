import { Component } from '@angular/core';

import { Rating } from '../rating/rating';

@Component({
  selector: 'app-review-card',
  imports: [Rating],
  templateUrl: './review-card.html',
  styleUrl: './review-card.scss',
})
export class ReviewCard {}
