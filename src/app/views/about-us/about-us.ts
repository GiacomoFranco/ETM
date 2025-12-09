import { Component } from '@angular/core';
import { GeneralBanner } from "@app/shared/general-banner/general-banner";

@Component({
  selector: 'app-about-us',
  imports: [GeneralBanner],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class AboutUs {}
