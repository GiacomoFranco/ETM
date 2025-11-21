import { Component, afterRenderEffect, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { Button } from '@app/shared';
import { Icon } from '@app/shared/icon/icon';

@Component({
  selector: 'app-header',
  imports: [Button, RouterLink, Icon, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor() {
    afterRenderEffect(() => {
      this.openedMenu()
        ? document?.body.classList.add('no-scroll')
        : document?.body.classList.remove('no-scroll');
    });
  }

  openedMenu = signal<boolean>(false);

  toggleMenu() {
    this.openedMenu.update((value) => !value);
  }
}
