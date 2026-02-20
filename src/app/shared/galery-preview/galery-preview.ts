import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';

import { GalleryImages } from '@app/core/models';

import { Icon } from '../icon/icon';

@Component({
  selector: 'app-galery-preview',
  imports: [Icon],
  templateUrl: './galery-preview.html',
  styleUrl: './galery-preview.scss',
})
export class GaleryPreview implements OnChanges, OnDestroy {
  @Input() images: GalleryImages = [];
  @Input() isOpen = false;
  @Input() activeIndex = 0;

  @Output() closed = new EventEmitter<void>();
  @Output() activeIndexChange = new EventEmitter<number>();

  private readonly swipeThreshold = 50;
  private dragStartX: number | null = null;
  private wheelLocked = false;

  private get hasBrowserDocument(): boolean {
    return typeof document !== 'undefined' && !!document.body;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.hasBrowserDocument) {
      document.body.style.overflow = this.isOpen ? 'hidden' : '';
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.isOpen) {
      return;
    }

    if (event.key === 'Escape') {
      this.closePreview();
      return;
    }

    if (event.key === 'ArrowRight') {
      this.nextImage();
      return;
    }

    if (event.key === 'ArrowLeft') {
      this.previousImage();
    }
  }

  closePreview(): void {
    this.closed.emit();
  }

  nextImage(): void {
    if (!this.images.length) {
      return;
    }

    const nextIndex = (this.activeIndex + 1) % this.images.length;
    this.activeIndexChange.emit(nextIndex);
  }

  previousImage(): void {
    if (!this.images.length) {
      return;
    }

    const previousIndex = (this.activeIndex - 1 + this.images.length) % this.images.length;
    this.activeIndexChange.emit(previousIndex);
  }

  onPreviewWheel(event: WheelEvent): void {
    event.preventDefault();

    if (this.wheelLocked) {
      return;
    }

    this.wheelLocked = true;
    event.deltaY > 0 ? this.nextImage() : this.previousImage();

    setTimeout(() => {
      this.wheelLocked = false;
    }, 220);
  }

  onPointerDown(event: PointerEvent): void {
    this.dragStartX = event.clientX;
  }

  onPointerUp(event: PointerEvent): void {
    if (this.dragStartX === null) {
      return;
    }

    const deltaX = event.clientX - this.dragStartX;
    this.dragStartX = null;

    if (Math.abs(deltaX) < this.swipeThreshold) {
      return;
    }

    deltaX < 0 ? this.nextImage() : this.previousImage();
  }

  ngOnDestroy(): void {
    if (this.hasBrowserDocument) {
      document.body.style.overflow = '';
    }
  }
}
