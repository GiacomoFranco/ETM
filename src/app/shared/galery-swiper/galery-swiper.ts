import { Component, afterNextRender, input, signal } from '@angular/core';

import { GALLERY_IMAGES } from '@app/core/constants';
import { GaleryPreview } from '@app/shared';

import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

@Component({
  selector: 'app-galery-swiper',
  imports: [GaleryPreview],
  templateUrl: './galery-swiper.html',
  styleUrl: './galery-swiper.scss',
})
export class GalerySwiper {
  constructor() {
    afterNextRender(() => {
      this.initSwiper();
    });
  }

  swiperID = input.required<string>();
  swiper = signal<Swiper | undefined>(undefined);
  images = GALLERY_IMAGES;
  isPreviewOpen = signal(false);
  activeIndex = signal(0);

  openPreview(imageIndex: number): void {
    this.activeIndex.set(imageIndex);
    this.isPreviewOpen.set(true);
  }

  closePreview(): void {
    this.isPreviewOpen.set(false);
  }

  onPreviewIndexChange(index: number): void {
    this.activeIndex.set(index);
  }

  initSwiper(): void {
    this.swiper.set(
      new Swiper(`#${this.swiperID()}`, {
        slidesPerView: 1,
        spaceBetween: 27,
        modules: [Autoplay],
        loop: true,
        autoplay: {
          delay: 0,
          pauseOnMouseEnter: true,
        },
        speed: 30000,
        breakpoints: {
          850: {
            slidesPerView: 2,
            spaceBetween: 27,
          },
          1600: {
            slidesPerView: 3,
            spaceBetween: 27,
          },
          2500: {
            slidesPerView: 4,
            spaceBetween: 27,
          },
        },
      }),
    );
  }
}
