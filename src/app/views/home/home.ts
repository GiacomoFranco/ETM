import { Component } from '@angular/core';

import { ServicesSection } from "@app/shared";
import { Banner } from './banner/banner';
import { SecondBanner } from "./second-banner/second-banner";

@Component({
  selector: 'app-home',
  imports: [Banner, ServicesSection, SecondBanner],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
