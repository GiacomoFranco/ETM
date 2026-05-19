import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, map } from 'rxjs';

import { Faqs, TGeneralQuestionsResponse } from '@core/models';

import { resolveApiBaseUrl } from './api-base-url.util';

@Injectable({
  providedIn: 'root',
})
export class FaqsService {
  private readonly baseUrl = resolveApiBaseUrl();
  private readonly httpClient = inject(HttpClient);

  getGeneralQuestions(): Observable<Faqs> {
    return this.httpClient
      .get<TGeneralQuestionsResponse>(`${this.baseUrl}/general-questions`)
      .pipe(map((faqs) => faqs.map(({ question, answer }) => ({ question, answer }))));
  }
}
