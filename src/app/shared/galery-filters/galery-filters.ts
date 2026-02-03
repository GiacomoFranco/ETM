import { Component } from '@angular/core';

import { SingleFilter } from '../single-filter/single-filter';

@Component({
  selector: 'app-galery-filters',
  imports: [SingleFilter],
  templateUrl: './galery-filters.html',
  styleUrl: './galery-filters.scss',
})
export class GaleryFilters {}
