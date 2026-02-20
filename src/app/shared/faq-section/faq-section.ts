import { Component } from '@angular/core';

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
  faqs = FAQS;

  firstColumnFaqs = this.faqs.slice(0, 4);
  secondColumnFaqs = this.faqs.slice(4);
}
