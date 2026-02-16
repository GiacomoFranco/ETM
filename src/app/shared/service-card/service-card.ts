import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Service } from '@app/core/models';

@Component({
  selector: 'app-service-card',
  imports: [RouterLink],
  templateUrl: './service-card.html',
  styleUrl: './service-card.scss',
})
export class ServiceCard {
  service = input.required<Service>();
  imageOrientation = input<'horizontal' | 'vertical'>('horizontal');
}
