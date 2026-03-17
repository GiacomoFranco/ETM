import { Component, inject } from '@angular/core';

import { catchError, of } from 'rxjs';

import { FaqsService } from '@core/services/faqs.service';

import { FAQS } from '../../core/constants';
import { Divider } from '../divider/divider';
import { SingleQuestion } from '../single-question/single-question';

@Component({
  selector: 'app-faq-section',
  imports: [Divider, SingleQuestion],
  templateUrl: './faq-section.html',
  styleUrl: './faq-section.scss',
})
export class FaqSection {
  private readonly faqsService = inject(FaqsService);

  faqs = FAQS;

  firstColumnFaqs = this.faqs.slice(0, 4);
  secondColumnFaqs = this.faqs.slice(4);

  constructor() {
    this.loadFaqs();
  }

  private loadFaqs(): void {
    this.faqsService
      .getGeneralQuestions()
      .pipe(catchError(() => of(FAQS)))
      .subscribe((faqs) => {
        this.faqs = faqs;
        this.firstColumnFaqs = this.faqs.slice(0, 4);
        this.secondColumnFaqs = this.faqs.slice(4);
      });
  }
}
