import { Component, viewChild } from '@angular/core';

import { Divider } from '@app/shared';

import { LocationsSwiper } from './locations-swiper/locations-swiper';

@Component({
  selector: 'app-locations',
  imports: [Divider, LocationsSwiper],
  templateUrl: './locations.html',
  styleUrl: './locations.scss',
})
export class Locations {
  swiperLocationsComponent = viewChild<LocationsSwiper>(LocationsSwiper);

  navigate(direction: string): void {
    direction === 'next'
      ? this.swiperLocationsComponent()!.navigateToNextGroup()
      : this.swiperLocationsComponent()!.navigateToPrevGroup();
  }
}
