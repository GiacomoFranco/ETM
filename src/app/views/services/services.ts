import { Component } from '@angular/core';

import { ServicesSection } from '@app/shared';
import { CarBanner } from '@app/shared/car-banner/car-banner';
import { GalerySection } from '@app/shared/galery-section/galery-section';
import { GeneralBanner } from '@app/shared/general-banner/general-banner';
import { ProposalSection } from '@app/shared/proposal-section/proposal-section';

@Component({
  selector: 'app-services',
  imports: [GeneralBanner, ServicesSection, ProposalSection, GalerySection, CarBanner],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {}
