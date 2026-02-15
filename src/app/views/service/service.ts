import { Component } from '@angular/core';

import { ServicesSection } from '@app/shared';
import { GalerySection } from '@app/shared/galery-section/galery-section';

import { ServiceBanner } from './service-banner/service-banner';
import { ServiceContent } from './service-content/service-content';

@Component({
  selector: 'app-service',
  imports: [ServiceBanner, ServiceContent, ServicesSection, GalerySection],
  templateUrl: './service.html',
  styleUrl: './service.scss',
})
export class Service {}
