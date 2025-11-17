import { Component } from '@angular/core';

import { SecondBanner } from "./second-banner/second-banner";
import { ServicesSection} from '@shared';
import { Banner } from './banner/banner';
import { Reviews } from "./reviews/reviews";
import { Viewcase } from "./viewcase/viewcase";
import { FaqSection } from "@app/shared/faq-section/faq-section";
import { GalerySection } from "@app/shared/galery-section/galery-section";
import { Locations } from "./locations/locations";
import { CarBanner } from "@app/shared/car-banner/car-banner";
import { ProposalSection } from "@app/shared/proposal-section/proposal-section";

@Component({
  selector: 'app-home',
  imports: [Banner, ServicesSection, SecondBanner, Reviews, Viewcase, FaqSection, GalerySection, Locations, CarBanner, ProposalSection],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
