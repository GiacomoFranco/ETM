import {
  Component,
  ElementRef,
  afterNextRender,
  effect,
  input,
  signal,
  viewChild,
} from '@angular/core';

import { Icon } from '../icon/icon';

@Component({
  selector: 'app-single-question',
  imports: [Icon],
  templateUrl: './single-question.html',
  styleUrl: './single-question.scss',
})
export class SingleQuestion {
  constructor() {
    afterNextRender(() => {
      this.isActive() ? this.openQuestion() : null;
    });

    effect(() => {
      this.toggleStatus() ? this.isActive.set(true) : this.isActive.set(false);
    });
  }

  question = input<string>('¿Ofrecen servicio a domicilio o en carretera?');
  answer = input<string>(
    'Ofrecemos un portafolio integral de servicios orientados al mantenimiento, reparación y fabricación de soluciones a la medida. Contamos con amplia experiencia en reparaciones de suspensión, chasis, carrocerías y furgones, así como en proyectos de transformación de acero y estructuras personalizadas.',
  );

  whiteVariant = input<boolean>(false);
  toggleStatus = input<boolean>(false);
  isActive = signal<boolean>(false);
  panel = viewChild<ElementRef>('panel');

  toggleQuestion() {
    this.isActive.set(!this.isActive());
    this.openQuestion();
  }

  openQuestion() {
    const element = this.panel()!.nativeElement;
    const maxHeightValue = parseInt(element.style.maxHeight.replace('px', ''));
    element.style.maxHeight =
      maxHeightValue > 0 ? (element.style.maxHeight = '0px') : element.scrollHeight + 'px';
  }
}
