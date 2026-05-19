import { NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Service } from '@app/core/models';

@Component({
  selector: 'app-service-card',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './service-card.html',
  styleUrl: './service-card.scss',
})
export class ServiceCard {
  service = input.required<Service>();
  imageOrientation = input<'horizontal' | 'vertical'>('horizontal');
  imageLoaded = output<void>();

  onImageLoad(): void {
    this.imageLoaded.emit();
  }
}
