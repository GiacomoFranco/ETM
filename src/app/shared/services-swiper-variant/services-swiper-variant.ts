import { isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';

import { SERVICES } from '@app/core/constants';

import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

import { ServiceCard } from '../service-card/service-card';

@Component({
  selector: 'app-services-swiper-variant',
  imports: [ServiceCard],
  templateUrl: './services-swiper-variant.html',
  styleUrl: './services-swiper-variant.scss',
})
export class ServicesSwiperVariant implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  swiper = signal<Swiper | undefined>(undefined);
  swiperID: string = 'services-variant';
  services = SERVICES;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initSwiper();
    }
  }

  ngOnDestroy(): void {
    this.swiper()?.destroy(true, true);
    this.swiper.set(undefined);
  }

  initSwiper(retries = 3): void {
    const root = document.getElementById(this.swiperID);
    const wrapper = root?.querySelector('.swiper-wrapper');

    if (!root || !wrapper) {
      if (retries > 0) {
        requestAnimationFrame(() => this.initSwiper(retries - 1));
      }
      return;
    }

    this.swiper()?.destroy(true, true);

    this.swiper.set(
      new Swiper(root, {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 16,
        navigation: {
          nextEl: '#next',
          prevEl: '#prev',
        },
        modules: [Autoplay],
        autoplay: {
          delay: 5000,
          pauseOnMouseEnter: true,
        },
        breakpoints: {
          750: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 20,
          },
          1000: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 33,
          },
          1400: {
            slidesPerView: 4,
            slidesPerGroup: 1,
            spaceBetween: 33,
          },
        },
      }),
    );
  }

  navigateToNextGroup() {
    this.swiper()?.slideNext();
  }

  navigateToPrevGroup() {
    this.swiper()?.slidePrev();
  }
}
