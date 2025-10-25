import { Component } from '@angular/core';
import { NavigationDivider } from '../navigation-divider/navigation-divider';
import { ServicesSwiper } from "../services-swiper/services-swiper";

@Component({
  selector: 'app-services-section',
  imports: [NavigationDivider, ServicesSwiper],
  templateUrl: './services-section.html',
  styleUrl: './services-section.scss',
})
export class ServicesSection {}
