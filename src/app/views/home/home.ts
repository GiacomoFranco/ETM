import { Component } from '@angular/core';

import { SecondBanner } from "./second-banner/second-banner";
import { ServicesSection, ClientsCarrousel} from '@shared';
import { Banner } from './banner/banner';
import { Reviews } from "./reviews/reviews";
import { Viewcase } from "./viewcase/viewcase";
import { FaqSection } from "@app/shared/faq-section/faq-section";
import { GalerySection } from "@app/shared/galery-section/galery-section";
import { Locations } from "./locations/locations";
import { CarBanner } from "@app/shared/car-banner/car-banner";

@Component({
  selector: 'app-home',
  imports: [Banner, ServicesSection, SecondBanner, ClientsCarrousel, Reviews, Viewcase, FaqSection, GalerySection, Locations, CarBanner],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
