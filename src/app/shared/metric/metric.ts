import { Component, input } from '@angular/core';

@Component({
  selector: 'app-metric',
  imports: [],
  templateUrl: './metric.html',
  styleUrl: './metric.scss',
})
export class Metric {
  metric = input<string>('');
  metricText = input<string>('');
  variant = input<string>('default');
}
