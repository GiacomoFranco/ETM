import { Component } from '@angular/core';

import { ServicesSection } from "@app/shared";
import { Banner } from './banner/banner';
import { SecondBanner } from "./second-banner/second-banner";
import { ClientsCarrousel } from "@app/shared/clients-carrousel/clients-carrousel";

@Component({
  selector: 'app-home',
  imports: [Banner, ServicesSection, SecondBanner, ClientsCarrousel],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
