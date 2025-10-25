import { Component } from '@angular/core';

import { SecondBanner } from "./second-banner/second-banner";
import { ServicesSection, ClientsCarrousel} from '@shared';
import { Banner } from './banner/banner';

@Component({
  selector: 'app-home',
  imports: [Banner, ServicesSection, SecondBanner, ClientsCarrousel],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
