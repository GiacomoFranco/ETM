import { Component, signal } from '@angular/core';

import { GALLERY_IMAGES } from '@app/core/constants';
import { GaleryPreview } from '@app/shared';

import { GaleryFilters } from '../galery-filters/galery-filters';

@Component({
  selector: 'app-galery-grid',
  imports: [GaleryFilters, GaleryPreview],
  templateUrl: './galery-grid.html',
  styleUrl: './galery-grid.scss',
})
export class GaleryGrid {
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
}
