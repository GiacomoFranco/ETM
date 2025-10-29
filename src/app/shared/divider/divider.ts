import { afterNextRender, Component, input, output } from '@angular/core';

import { Button } from '../button/button';
// import { gsap } from "gsap";

@Component({
  selector: 'app-divider',
  imports: [Button],
  templateUrl: './divider.html',
  styleUrl: './divider.scss',
})
export class Divider {
  // constructor() {
  //   afterNextRender(() => {
  //     gsap.fromTo(
  //       '.loading-bar__inner',
  //       { width: '0px' },
  //       {
  //         width: '100%',
  //         duration: 5,
  //         repeat: -1,
  //         ease: 'power3.out',
  //       }
  //     );
  //   })
  // }

  variant = input<'white' | 'black'>('white');
  title = input<string>('Divider');
  redirection = input<string | null>(null);
  buttonText = input<string>('Redirección');

  navigationEmitter = output<string>();

  emitNavigationEvent(direction: string): void {
    this.navigationEmitter.emit(direction);
  }
}
