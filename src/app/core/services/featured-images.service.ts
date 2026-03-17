import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { GalleryImages, TGalleryResponse } from '@core/models';

import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeaturedImagesService {
  private readonly baseUrl = '/etm-api/wp-json/api/v1';
  private readonly httpClient = inject(HttpClient);

  getFeaturedImages(): Observable<GalleryImages> {
    return this.httpClient
      .get<TGalleryResponse>(`${this.baseUrl}/featured-images`)
      .pipe(
        map((images) =>
          images.map((image) => ({
            src: image.url,
            alt: image.alt || image.title || 'Imagen destacada ETM',
          })),
        ),
      );
  }
}
