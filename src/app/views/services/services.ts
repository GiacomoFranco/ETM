import { Component } from '@angular/core';
import { GeneralBanner } from "@app/shared/general-banner/general-banner";

@Component({
  selector: 'app-services',
  imports: [GeneralBanner],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {}
