import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, map } from 'rxjs';

import { Reviews, TReviewsResponse } from '@core/models';

import { resolveApiBaseUrl } from './api-base-url.util';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private readonly baseUrl = resolveApiBaseUrl();
  private readonly httpClient = inject(HttpClient);

  getReviews(): Observable<Reviews> {
    return this.httpClient.get<TReviewsResponse>(`${this.baseUrl}/reviews`).pipe(
      map((reviews) =>
        reviews.map(({ client, client_position, client_review, rating, photo }) => ({
          client: {
            name: client,
            role: client_position,
            image: photo[0]?.url || '/images/user.svg',
          },
          rating,
          review: client_review,
        })),
      ),
    );
  }
}
