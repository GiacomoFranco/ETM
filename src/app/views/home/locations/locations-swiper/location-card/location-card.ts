import { Component, input } from '@angular/core';

import { Icon } from '@app/shared/icon/icon';

@Component({
  selector: 'app-location-card',
  imports: [Icon],
  templateUrl: './location-card.html',
  styleUrl: './location-card.scss',
})
export class LocationCard {
  locationName = input<string>('Barranquilla – Atlántico');
  locationUrl = input<string>('');
  locationAddress = input<string>('Vía Galapa lote San José 4B # 3-5b -1');
  locationImage = input<string>('/images/locations/location-card-background.webp');
}
