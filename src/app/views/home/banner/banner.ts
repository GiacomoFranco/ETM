import {
  Component,
  DestroyRef,
  ElementRef,
  ViewChild,
  afterNextRender,
  inject,
} from '@angular/core';

import { Button } from '@shared';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-banner',
  imports: [Button],
  templateUrl: './banner.html',
  styleUrl: './banner.scss',
})
export class Banner {
  @ViewChild('bannerRef') bannerRef?: ElementRef<HTMLElement>;
  @ViewChild('backgroundRef') backgroundRef?: ElementRef<HTMLElement>;
  @ViewChild('welderRef') welderRef?: ElementRef<HTMLElement>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = typeof window !== 'undefined';
  private parallaxTrigger: ScrollTrigger | undefined;
  private introTween: gsap.core.Tween | undefined;
  private readonly motionState = {
    progress: 0,
    introOffset: 120,
    backgroundIntroScale: 1.12,
  };

  constructor() {
    if (this.isBrowser) {
      gsap.registerPlugin(ScrollTrigger);
    }

    afterNextRender(() => {
      this.createScrollParallax();
    });

    this.destroyRef.onDestroy(() => {
      this.destroyScrollParallax();
    });
  }

  private createScrollParallax(): void {
    if (!this.isBrowser) {
      return;
    }

    const bannerElement = this.bannerRef?.nativeElement;
    const backgroundLayer = this.backgroundRef?.nativeElement;
    const welderLayer = this.welderRef?.nativeElement;

    if (!bannerElement || !backgroundLayer || !welderLayer) {
      return;
    }

    this.destroyScrollParallax();

    this.motionState.progress = 0;
    this.motionState.introOffset = 120;
    this.motionState.backgroundIntroScale = 1.12;
    this.applyLayerTransforms(backgroundLayer, welderLayer);

    this.introTween = gsap.to(this.motionState, {
      introOffset: 0,
      backgroundIntroScale: 1,
      duration: 1,
      ease: 'power3.out',
      onUpdate: () => {
        this.applyLayerTransforms(backgroundLayer, welderLayer);
      },
    });

    this.parallaxTrigger = ScrollTrigger.create({
      trigger: bannerElement,
      start: 'top top',
      end: '80% top',
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        this.motionState.progress = self.progress;
        this.applyLayerTransforms(backgroundLayer, welderLayer);
      },
    });

    ScrollTrigger.refresh();
  }

  private destroyScrollParallax(): void {
    this.introTween?.kill();
    this.introTween = undefined;

    this.parallaxTrigger?.kill();
    this.parallaxTrigger = undefined;

    this.motionState.progress = 0;
    this.motionState.introOffset = 0;
    this.motionState.backgroundIntroScale = 1;

    const backgroundLayer = this.backgroundRef?.nativeElement;
    const welderLayer = this.welderRef?.nativeElement;

    if (backgroundLayer) {
      backgroundLayer.style.transform = 'translate3d(0, 0, 0)';
    }

    if (welderLayer) {
      welderLayer.style.transform = 'translate3d(0, 0, 0)';
    }
  }

  private applyLayerTransforms(backgroundLayer: HTMLElement, welderLayer: HTMLElement): void {
    const backgroundScale =
      this.motionState.backgroundIntroScale + 0.06 * this.motionState.progress;
    const welderY = this.motionState.introOffset + 200 * this.motionState.progress;

    backgroundLayer.style.transform = `translate3d(0, 0, 0) scale(${backgroundScale})`;
    welderLayer.style.transform = `translate3d(0, ${welderY}px, 0)`;
  }
}
