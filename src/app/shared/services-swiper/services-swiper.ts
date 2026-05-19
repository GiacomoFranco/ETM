import { isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';

import { SERVICES } from '@app/core/constants';

import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

import { ServiceCard } from '../service-card/service-card';

@Component({
  selector: 'app-services-swiper',
  imports: [ServiceCard],
  templateUrl: './services-swiper.html',
  styleUrl: './services-swiper.scss',
})
export class ServicesSwiper implements OnInit, OnDestroy {
  private readonly slideRevealDelayMs = 220;
  private readonly platformId = inject(PLATFORM_ID);
  private firstSlideImageLoaded = false;
  private secondSlideImageLoaded = false;
  private secondSlideRevealTimer: ReturnType<typeof setTimeout> | undefined;

  swiper = signal<Swiper | undefined>(undefined);
  firstSlideVisible = signal<boolean>(false);
  secondSlideVisible = signal<boolean>(false);
  swiperID: string = 'services-default';
  services = SERVICES;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initSwiper();
    }
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
        spaceBetween: 10,
        loop: true,
        modules: [Autoplay],
        autoplay: {
          delay: 5000,
          pauseOnMouseEnter: true,
        },
        breakpoints: {
          1150: {
            slidesPerView: 2,
            slidesPerGroup: 2,
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

  onCardImageLoaded(index: number): void {
    if (index === 0) {
      this.firstSlideImageLoaded = true;
      this.revealSlidesInSequence();
      return;
    }

    if (index === 1) {
      this.secondSlideImageLoaded = true;
      this.revealSlidesInSequence();
    }
  }

  isSlideVisible(index: number): boolean {
    if (index === 0) {
      return this.firstSlideVisible();
    }

    if (index === 1) {
      return this.secondSlideVisible();
    }

    return true;
  }

  ngOnDestroy(): void {
    if (this.secondSlideRevealTimer) {
      clearTimeout(this.secondSlideRevealTimer);
    }
    this.swiper()?.destroy(true, true);
    this.swiper.set(undefined);
  }

  private revealSlidesInSequence(): void {
    if (this.firstSlideImageLoaded && !this.firstSlideVisible()) {
      this.firstSlideVisible.set(true);
    }

    if (
      this.firstSlideVisible() &&
      this.secondSlideImageLoaded &&
      !this.secondSlideVisible() &&
      !this.secondSlideRevealTimer
    ) {
      this.secondSlideRevealTimer = setTimeout(() => {
        this.secondSlideVisible.set(true);
        this.secondSlideRevealTimer = undefined;
      }, this.slideRevealDelayMs);
    }
  }
}
