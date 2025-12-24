import { Component } from '@angular/core';
import { GaleryGrid } from '@app/shared/galery-grid/galery-grid';
import { GeneralBanner } from "@app/shared/general-banner/general-banner";
import { ServicesSection } from "@app/shared";

@Component({
  selector: 'app-galery',
  imports: [GeneralBanner, GaleryGrid, ServicesSection],
  templateUrl: './galery.html',
  styleUrl: './galery.scss',
})
export class Galery {}
