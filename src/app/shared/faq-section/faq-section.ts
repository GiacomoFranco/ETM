import { Component } from '@angular/core';

import { Divider } from '../divider/divider';
import { SingleQuestion } from '../single-question/single-question';

@Component({
  selector: 'app-faq-section',
  imports: [Divider, SingleQuestion],
  templateUrl: './faq-section.html',
  styleUrl: './faq-section.scss',
})
export class FaqSection {}
