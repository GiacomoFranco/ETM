import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, map } from 'rxjs';

import { GalleryImages, TGalleryResponse } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class FeaturedImagesService {
  private readonly baseUrl = 'https://admin.etmsas.com/wp-json/api/v1';
  private readonly httpClient = inject(HttpClient);

  getFeaturedImages(): Observable<GalleryImages> {
    return this.httpClient.get<TGalleryResponse>(`${this.baseUrl}/featured-images`).pipe(
      map((images) =>
        images.map((image) => ({
          src: image.url,
          alt: image.alt || image.title || 'Imagen destacada ETM',
        })),
      ),
    );
  }
}
