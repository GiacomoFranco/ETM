import { Component, inject, signal } from '@angular/core';

import { catchError, of } from 'rxjs';

import { GALLERY_IMAGES } from '@app/core/constants';
import { GalleryService } from '@app/core/services/gallery.service';
import { GaleryPreview } from '@app/shared';

import { GaleryFilters } from '../galery-filters/galery-filters';

@Component({
  selector: 'app-galery-grid',
  imports: [GaleryFilters, GaleryPreview],
  templateUrl: './galery-grid.html',
  styleUrl: './galery-grid.scss',
})
export class GaleryGrid {
  private readonly galleryService = inject(GalleryService);

  images = GALLERY_IMAGES;

  isPreviewOpen = signal(false);
  activeIndex = signal(0);

  constructor() {
    this.loadGalleryImages();
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

  private loadGalleryImages(): void {
    this.galleryService
      .getGalleryImages()
      .pipe(catchError(() => of(GALLERY_IMAGES)))
      .subscribe((images) => {
        this.images = images;
      });
  }
}
