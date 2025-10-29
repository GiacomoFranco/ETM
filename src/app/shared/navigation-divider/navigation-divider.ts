import { afterNextRender, Component, input, output } from '@angular/core';

import { Button } from "../button/button";
// import { gsap } from "gsap";

@Component({
  selector: 'app-navigation-divider',
  imports: [Button],
  templateUrl: './navigation-divider.html',
  styleUrl: './navigation-divider.scss'
})
export class NavigationDivider {
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

  title = input<string>('Divider');
  navigationEmitter = output<string>()

  emitNavigationEvent(direction: string): void {
    this.navigationEmitter.emit(direction);
  }
}
