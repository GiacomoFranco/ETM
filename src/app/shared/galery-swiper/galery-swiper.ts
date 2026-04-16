import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, PLATFORM_ID, inject, input, signal } from '@angular/core';

import { GALLERY_IMAGES } from '@app/core/constants';
import { FeaturedImagesService } from '@app/core/services/featured-images.service';
import { GaleryPreview } from '@app/shared';

import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

@Component({
  selector: 'app-galery-swiper',
  imports: [GaleryPreview],
  templateUrl: './galery-swiper.html',
  styleUrl: './galery-swiper.scss',
})
export class GalerySwiper implements AfterViewInit {
  private readonly featuredImagesService = inject(FeaturedImagesService);
  private readonly platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFeaturedImages();
    }
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

  private loadFeaturedImages(): void {
    this.featuredImagesService.getFeaturedImages().subscribe((images) => {
      this.images = images;
      setTimeout(() => this.initSwiper(), 100);
    });
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
