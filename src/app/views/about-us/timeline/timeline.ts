import {
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  ViewChild,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';

import { scheduleIdleTask } from '@app/core/services/schedule-idle-task.util';

import { gsap } from 'gsap';
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
  @ViewChild('headerRef') headerRef?: ElementRef<HTMLElement>;
  @ViewChild('pointsRef') pointsRef?: ElementRef<HTMLElement>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = typeof window !== 'undefined';
  private scrollTrigger: ScrollTrigger | undefined;
  private layoutResizeObserver: ResizeObserver | undefined;
  private resizeTimeout: ReturnType<typeof setTimeout> | undefined;
  private layoutWidth = 0;
  private layoutGap = 0;
  private layoutPadding = 0;

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
      scheduleIdleTask(() => {
        this.setupLayoutObserver();
        this.createTimelineScroll();
      });
    });

    this.destroyRef.onDestroy(() => {
      this.destroyTimelineScroll();
      this.layoutResizeObserver?.disconnect();
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
  }

  private setupLayoutObserver(): void {
    if (!this.isBrowser) {
      return;
    }

    const headerElement = this.headerRef?.nativeElement;
    const pointsElement = this.pointsRef?.nativeElement;

    if (!headerElement || !pointsElement) {
      return;
    }

    this.layoutResizeObserver?.disconnect();
    this.layoutResizeObserver = new ResizeObserver(([entry]) => {
      this.layoutWidth = entry.contentRect.width;

      const headerStyles = getComputedStyle(headerElement);
      const pointsStyles = getComputedStyle(pointsElement);
      const dotWidth = this.parseRemValue(headerStyles.getPropertyValue('--dot-width'));
      const activeDotWidth = this.parseRemValue(
        headerStyles.getPropertyValue('--active-dot-width'),
      );
      this.layoutGap = parseFloat(pointsStyles.columnGap || pointsStyles.gap || '0');
      this.layoutPadding = Math.max((activeDotWidth - dotWidth) / 2, 0);

      this.updateDotCenters();
    });

    this.layoutResizeObserver.observe(headerElement);
  }

  private updateDotCenters(): void {
    if (!this.isBrowser || !this.layoutWidth) {
      return;
    }

    const totalPoints = this.milestones.length;
    if (!totalPoints) {
      return;
    }

    const totalWidth = this.layoutWidth + this.layoutPadding * 2;
    const itemWidth = (this.layoutWidth - this.layoutGap * (totalPoints - 1)) / totalPoints;

    if (
      !Number.isFinite(totalWidth) ||
      totalWidth <= 0 ||
      !Number.isFinite(itemWidth) ||
      itemWidth <= 0
    ) {
      return;
    }

    const centers = Array.from({ length: totalPoints }, (_, index) => {
      const centerX = this.layoutPadding + index * (itemWidth + this.layoutGap) + itemWidth / 2;
      const percent = (centerX / totalWidth) * 100;
      return Math.min(Math.max(percent, 0), 100);
    });

    this.dotCenterPercents.set(centers);
  }

  private parseRemValue(value: string): number {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return 0;
    }

    if (trimmedValue.endsWith('rem')) {
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      return parseFloat(trimmedValue) * rootFontSize;
    }

    return parseFloat(trimmedValue);
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
