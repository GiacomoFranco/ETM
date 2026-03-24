import {
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  QueryList,
  ViewChild,
  ViewChildren,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';

import { Subscription } from 'rxjs';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { TIMELINE_MILESTONES } from './timeline.constant';
import { TimelineMilestone } from './timeline.model';

@Component({
  selector: 'app-timeline',
  imports: [],
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss',
})
export class Timeline {
  @ViewChild('pinRef') pinRef?: ElementRef<HTMLElement>;
  @ViewChild('trackRef') trackRef?: ElementRef<HTMLElement>;
  @ViewChildren('dotRef') dotRefs?: QueryList<ElementRef<HTMLElement>>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = typeof window !== 'undefined';
  private scrollTrigger: ScrollTrigger | undefined;
  private resizeTimeout: ReturnType<typeof setTimeout> | undefined;
  private dotRefsChangeSub: Subscription | undefined;

  readonly milestones: TimelineMilestone[] = TIMELINE_MILESTONES;

  readonly activeIndex = signal(0);
  readonly dotCenterPercents = signal<number[]>([]);
  readonly visiblePoints = signal(this.getVisiblePoints(this.getViewportWidth()));
  readonly activeMilestone = computed(() => this.milestones[this.activeIndex()]);
  readonly progressWidth = computed(() => {
    const centers = this.dotCenterPercents();
    if (!centers.length) {
      return 0;
    }

    const maxIndex = centers.length - 1;
    const safeIndex = Math.min(Math.max(this.activeIndex(), 0), maxIndex);
    return centers[safeIndex] ?? 0;
  });

  constructor() {
    if (this.isBrowser) {
      gsap.registerPlugin(ScrollTrigger);
    }

    afterNextRender(() => {
      this.createTimelineScroll();
      this.updateDotCenters();
      this.dotRefsChangeSub = this.dotRefs?.changes.subscribe(() => this.updateDotCenters());
    });

    this.destroyRef.onDestroy(() => {
      this.destroyTimelineScroll();
      this.dotRefsChangeSub?.unsubscribe();
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }
    });
  }

  isPointVisible(index: number): boolean {
    if (this.visiblePoints() >= this.milestones.length) {
      return true;
    }

    const currentIndex = this.activeIndex();
    return index >= currentIndex && index < currentIndex + this.visiblePoints();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (!this.isBrowser) {
      return;
    }

    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.resizeTimeout = setTimeout(() => {
      this.visiblePoints.set(this.getVisiblePoints(this.getViewportWidth()));
      this.createTimelineScroll();
      this.updateDotCenters();
    }, 120);
  }

  private createTimelineScroll(): void {
    if (!this.isBrowser) {
      return;
    }

    const pinElement = this.pinRef?.nativeElement;
    const totalSteps = this.milestones.length - 1;

    if (!pinElement || totalSteps < 1) {
      return;
    }

    this.destroyTimelineScroll();

    this.scrollTrigger = ScrollTrigger.create({
      trigger: pinElement,
      markers: false,
      start: '-135px top',
      end: `+=${this.getPixelsPerStep() * totalSteps}`,
      pin: pinElement,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 0.25,
      snap: {
        snapTo: 1 / totalSteps,
        duration: { min: 0.08, max: 0.25 },
        ease: 'power1.inOut',
      },
      onUpdate: (self) => {
        this.activeIndex.set(Math.round(self.progress * totalSteps));
      },
    });

    ScrollTrigger.refresh();
    this.updateDotCenters();
  }

  private updateDotCenters(): void {
    if (!this.isBrowser) {
      return;
    }

    const trackElement = this.trackRef?.nativeElement;
    const dots = this.dotRefs?.toArray() ?? [];

    if (!trackElement || !dots.length) {
      return;
    }

    requestAnimationFrame(() => {
      const trackRect = trackElement.getBoundingClientRect();
      if (!trackRect.width) {
        return;
      }

      const centers = dots.map((dotRef) => {
        const dotRect = dotRef.nativeElement.getBoundingClientRect();
        const centerX = dotRect.left + dotRect.width / 2;
        const percent = ((centerX - trackRect.left) / trackRect.width) * 100;
        return Math.min(Math.max(percent, 0), 100);
      });

      this.dotCenterPercents.set(centers);
    });
  }

  private destroyTimelineScroll(): void {
    if (!this.scrollTrigger) {
      return;
    }

    this.scrollTrigger.kill();
    this.scrollTrigger = undefined;
  }

  private getVisiblePoints(width: number): number {
    if (width <= 600) {
      return 3;
    }

    if (width <= 900) {
      return 4;
    }

    if (width <= 1200) {
      return 5;
    }

    return this.milestones.length;
  }

  private getPixelsPerStep(): number {
    const width = this.getViewportWidth();

    if (width <= 600) {
      return 260;
    }

    if (width <= 1024) {
      return 300;
    }

    return 360;
  }

  private getViewportWidth(): number {
    if (!this.isBrowser) {
      return 1440;
    }

    return window.innerWidth;
  }
}
