import { Component, HostListener, signal } from '@angular/core';

import { Footer } from './footer/footer';
import { Header } from './header/header';
import { WhatsappRedirection } from "@app/shared/whatsapp-redirection/whatsapp-redirection";

@Component({
  selector: 'app-layout',
  imports: [Footer, Header, WhatsappRedirection],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  scrollTop = signal(0);
  hideNav = signal(false);
  navbarBackgroundOffset = 150;
  navbarBackground = signal(false);

  @HostListener('window:scroll', ['$event'])
  onScroll(_event: Event) {
    const scrollPosition =
      window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const isScrollingDown = scrollPosition > this.scrollTop();
    this.hideNav.set(isScrollingDown);

    this.scrollTop.set(scrollPosition);

    if (scrollPosition > this.navbarBackgroundOffset) {
      this.navbarBackground.set(true);
    } else {
      this.navbarBackground.set(false);
    }
  }
}
