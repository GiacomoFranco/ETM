import { Component } from '@angular/core';
import { GeneralBanner } from "@app/shared/general-banner/general-banner";
import { Pillars } from "./pillars/pillars";
import { ClientsCarrousel } from "@app/shared";
import { MisionVision } from "./mision-vision/mision-vision";
import { GalerySection } from "@app/shared/galery-section/galery-section";

@Component({
  selector: 'app-about-us',
  imports: [GeneralBanner, Pillars, ClientsCarrousel, MisionVision, GalerySection],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class AboutUs {}
