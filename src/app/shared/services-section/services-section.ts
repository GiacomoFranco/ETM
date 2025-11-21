import { Component, viewChild } from '@angular/core';

import { Divider } from '../divider/divider';
import { ServicesSwiper } from '../services-swiper/services-swiper';

@Component({
  selector: 'app-services-section',
  imports: [ServicesSwiper, Divider],
  templateUrl: './services-section.html',
  styleUrl: './services-section.scss',
})
export class ServicesSection {
  swiperServicesComponent = viewChild<ServicesSwiper>(ServicesSwiper);

  navigate(direction: string): void {
    direction === 'next'
      ? this.swiperServicesComponent()!.navigateToNextGroup()
      : this.swiperServicesComponent()!.navigateToPrevGroup();
  }
}
