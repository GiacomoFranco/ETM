import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, map } from 'rxjs';

import { Faqs, TGeneralQuestionsResponse } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class FaqsService {
  private readonly baseUrl = '/api/wp-json/api/v1';
  private readonly httpClient = inject(HttpClient);

  getGeneralQuestions(): Observable<Faqs> {
    return this.httpClient
      .get<TGeneralQuestionsResponse>(`${this.baseUrl}/general-questions`)
      .pipe(map((faqs) => faqs.map(({ question, answer }) => ({ question, answer }))));
  }
}
