import { Component } from '@angular/core';

import { ClientsCarrousel } from '@app/shared';
import { GalerySection } from '@app/shared/galery-section/galery-section';
import { GeneralBanner } from '@app/shared/general-banner/general-banner';

import { MisionVision } from './mision-vision/mision-vision';
import { Pillars } from './pillars/pillars';

@Component({
  selector: 'app-about-us',
  imports: [GeneralBanner, Pillars, ClientsCarrousel, MisionVision, GalerySection],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class AboutUs {}
