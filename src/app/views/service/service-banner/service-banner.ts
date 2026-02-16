import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs';

import { SERVICES } from '@app/core/constants';
import { Service } from '@app/core/models';

@Component({
  selector: 'app-service-banner',
  imports: [],
  templateUrl: './service-banner.html',
  styleUrl: './service-banner.scss',
})
export class ServiceBanner {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly slug = toSignal(
    this.activatedRoute.paramMap.pipe(map((params) => params.get('service') ?? '')),
    { initialValue: '' },
  );

  protected readonly service = computed<Service>(() => {
    const serviceBySlug = SERVICES.find((item) => item.slug === this.slug());

    return serviceBySlug ?? SERVICES[0];
  });
}
