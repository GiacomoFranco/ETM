import { Component } from '@angular/core';

import { FaqSection } from '@app/shared/faq-section/faq-section';
import { GeneralBanner } from '@app/shared/general-banner/general-banner';

import { ContactForm } from './contact-form/contact-form';

@Component({
  selector: 'app-contact',
  imports: [GeneralBanner, ContactForm, FaqSection],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {}
