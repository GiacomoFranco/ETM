import { Component, input } from '@angular/core';

import { Divider } from '../divider/divider';
import { GalerySwiper } from '../galery-swiper/galery-swiper';

@Component({
  selector: 'app-galery-section',
  imports: [Divider, GalerySwiper],
  templateUrl: './galery-section.html',
  styleUrl: './galery-section.scss',
})
export class GalerySection {
  variant = input<string>('default');
}
