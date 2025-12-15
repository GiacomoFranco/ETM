import { Component, input, viewChild } from '@angular/core';

import { Divider } from '../divider/divider';
import { ServicesSwiperVariant } from '../services-swiper-variant/services-swiper-variant';
import { ServicesSwiper } from '../services-swiper/services-swiper';

@Component({
  selector: 'app-services-section',
  imports: [ServicesSwiper, ServicesSwiperVariant, Divider],
  templateUrl: './services-section.html',
  styleUrl: './services-section.scss',
})
export class ServicesSection {
  variant = input<string>('default');
  swiperServicesComponent = viewChild<ServicesSwiper>(ServicesSwiper);
  swiperServicesVariantComponent = viewChild<ServicesSwiperVariant>(ServicesSwiperVariant);

  navigate(direction: string): void {
    if (this.variant() === 'default') {
      direction === 'next'
        ? this.swiperServicesComponent()!.navigateToNextGroup()
        : this.swiperServicesComponent()!.navigateToPrevGroup();
    } else {
      direction === 'next'
        ? this.swiperServicesVariantComponent()!.navigateToNextGroup()
        : this.swiperServicesVariantComponent()!.navigateToPrevGroup();
    }
  }
}
