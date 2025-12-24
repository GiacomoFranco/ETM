import { Component, input } from '@angular/core';

@Component({
  selector: 'app-single-filter',
  imports: [],
  templateUrl: './single-filter.html',
  styleUrl: './single-filter.scss'
})
export class SingleFilter {
  filter = input('filter');
}
