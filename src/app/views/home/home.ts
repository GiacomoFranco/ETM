import { Component } from '@angular/core';

import { SecondBanner } from "./second-banner/second-banner";
import { ServicesSection, ClientsCarrousel} from '@shared';
import { Banner } from './banner/banner';
import { Reviews } from "./reviews/reviews";
import { Viewcase } from "./viewcase/viewcase";

@Component({
  selector: 'app-home',
  imports: [Banner, ServicesSection, SecondBanner, ClientsCarrousel, Reviews, Viewcase],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
