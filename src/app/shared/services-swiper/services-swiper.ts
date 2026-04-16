import { Component, OnDestroy, afterNextRender, signal } from '@angular/core';

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
export class ServicesSwiper implements OnDestroy {
  private readonly slideRevealDelayMs = 220;
  private firstSlideImageLoaded = false;
  private secondSlideImageLoaded = false;
  private secondSlideRevealTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    afterNextRender(() => {
      this.initSwiper();
    });
  }

  swiper = signal<Swiper | undefined>(undefined);
  firstSlideVisible = signal<boolean>(false);
  secondSlideVisible = signal<boolean>(false);
  swiperID: string = 'services';
  services = SERVICES;

  initSwiper(): void {
    this.swiper.set(
      new Swiper(`#${this.swiperID}`, {
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
