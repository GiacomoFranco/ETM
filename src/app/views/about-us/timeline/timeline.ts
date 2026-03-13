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

interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
}

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

  readonly milestones: TimelineMilestone[] = [
    {
      year: '2022',
      title: 'Consolidación de nuestra sede ubicada en la ciudad de Cartagena.',
      description:
        'A lo largo de nuestra trayectoria, hemos consolidado un servicio basado en la calidad, la confianza y la experiencia, ofreciendo mantenimiento, reparación y fabricación a la medida. Nos enfocamos en optimizar el rendimiento y prolongar la vida útil de su maquinaria con soluciones confiables y materiales de la más alta calidad.',
    },
    {
      year: '2023',
      title: 'Fortalecimos nuestros procesos de mantenimiento especializado.',
      description:
        'Incorporamos mejores prácticas técnicas para aumentar la eficiencia operativa y reducir tiempos de parada, garantizando resultados consistentes en cada servicio.',
    },
    {
      year: '2024',
      title: 'Ampliamos capacidades en reparación y fabricación a medida.',
      description:
        'Desarrollamos soluciones personalizadas para distintos sectores industriales, manteniendo altos estándares de calidad y precisión en cada proyecto.',
    },
    {
      year: '2025',
      title: 'Elevamos nuestros estándares de control y calidad de materiales.',
      description:
        'Reforzamos criterios de selección e inspección para entregar componentes y servicios más confiables, duraderos y alineados con las necesidades de nuestros clientes.',
    },
    {
      year: '2026',
      title: 'Impulsamos una etapa de crecimiento con enfoque en confianza y servicio.',
      description:
        'Seguimos proyectando nuestra trayectoria con compromiso, acompañamiento técnico y soluciones integrales que prolongan la vida útil de la maquinaria.',
    },
  ];

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
