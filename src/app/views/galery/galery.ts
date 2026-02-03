import { Component } from '@angular/core';

import { ServicesSection } from '@app/shared';
import { GaleryGrid } from '@app/shared/galery-grid/galery-grid';
import { GeneralBanner } from '@app/shared/general-banner/general-banner';

@Component({
  selector: 'app-galery',
  imports: [GeneralBanner, GaleryGrid, ServicesSection],
  templateUrl: './galery.html',
  styleUrl: './galery.scss',
})
export class Galery {}
