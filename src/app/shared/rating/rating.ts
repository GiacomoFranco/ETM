import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-rating',
  imports: [],
  templateUrl: './rating.html',
  styleUrl: './rating.scss'
})
export class Rating {
  rating = input<number>(0);
  stars = computed(() => Array(Math.trunc(this.rating())).fill(0));
  partialStar = computed(() => this.rating() % 1);
}
