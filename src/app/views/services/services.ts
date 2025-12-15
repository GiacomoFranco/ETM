import { Component } from '@angular/core';
import { GeneralBanner } from "@app/shared/general-banner/general-banner";
import { ServicesSection } from "@app/shared";
import { ProposalSection } from "@app/shared/proposal-section/proposal-section";
import { GalerySection } from "@app/shared/galery-section/galery-section";
import { CarBanner } from "@app/shared/car-banner/car-banner";

@Component({
  selector: 'app-services',
  imports: [GeneralBanner, ServicesSection, ProposalSection, GalerySection, CarBanner],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {}
