import { NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  PLATFORM_ID,
  inject,
  input,
  signal,
} from '@angular/core';

import { catchError, of } from 'rxjs';

import { GALLERY_IMAGES } from '@app/core/constants';
import { FeaturedImagesService } from '@app/core/services/featured-images.service';
import { GaleryPreview } from '@app/shared';

import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

@Component({
  selector: 'app-galery-swiper',
  imports: [GaleryPreview, NgOptimizedImage],
  templateUrl: './galery-swiper.html',
  styleUrl: './galery-swiper.scss',
})
export class GalerySwiper implements OnInit {
  private readonly featuredImagesService = inject(FeaturedImagesService);
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFeaturedImages();
    }
  }

  swiperID = input.required<string>();
  swiper = signal<Swiper | undefined>(undefined);
  images = GALLERY_IMAGES;
  isPreviewOpen = signal(false);
  activeIndex = signal(0);
  loading = signal(true);

  imageLoaded(event: Event) {
    const target = event.target as HTMLImageElement;
    const parentNode = target.parentNode as HTMLImageElement;

    parentNode.classList.add('visible');
  }

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
    this.featuredImagesService
      .getFeaturedImages()
      .pipe(catchError(() => of(GALLERY_IMAGES)))
      .subscribe((images) => {
        this.images = images;
        this.loading.set(false);

        setTimeout(() => {
          this.initSwiper();
        }, 0);
      });
  }

  initSwiper(retries = 3): void {
    const root = document.getElementById(this.swiperID());
    const wrapper = root?.querySelector('.swiper-wrapper');

    if (!root || !wrapper) {
      if (retries > 0) requestAnimationFrame(() => this.initSwiper(retries - 1));
      return;
    }

    this.swiper()?.destroy(true, true);

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
