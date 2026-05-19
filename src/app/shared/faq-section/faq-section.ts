import { Component, inject, signal } from '@angular/core';

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

  faqs = signal(FAQS);
  loading = signal(true);

  firstColumnFaqs = this.faqs().slice(0, 4);
  secondColumnFaqs = this.faqs().slice(4);

  ngOnInit() {
    this.loadFaqs();
  }

  constructor() {}

  private loadFaqs(): void {
    this.faqsService
      .getGeneralQuestions()
      .pipe(catchError(() => of(FAQS)))
      .subscribe((faqs) => {
        this.faqs.set(faqs);
        this.loading.set(false);
        this.firstColumnFaqs = this.faqs().slice(0, 4);
        this.secondColumnFaqs = this.faqs().slice(4);
      });
  }
}
