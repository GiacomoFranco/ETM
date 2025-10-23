import { Component } from '@angular/core';

import { ServicesSection } from "@app/shared";
import { Banner } from './banner/banner';

@Component({
  selector: 'app-home',
  imports: [Banner, ServicesSection],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
