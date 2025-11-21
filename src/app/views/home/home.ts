import { Component } from '@angular/core';

import { CarBanner } from '@app/shared/car-banner/car-banner';
import { FaqSection } from '@app/shared/faq-section/faq-section';
import { GalerySection } from '@app/shared/galery-section/galery-section';
import { ProposalSection } from '@app/shared/proposal-section/proposal-section';
import { ServicesSection } from '@shared';

import { Banner } from './banner/banner';
import { Locations } from './locations/locations';
import { Reviews } from './reviews/reviews';
import { SecondBanner } from './second-banner/second-banner';
import { Viewcase } from './viewcase/viewcase';

@Component({
  selector: 'app-home',
  imports: [
    Banner,
    ServicesSection,
    SecondBanner,
    Reviews,
    Viewcase,
    FaqSection,
    GalerySection,
    Locations,
    CarBanner,
    ProposalSection,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
