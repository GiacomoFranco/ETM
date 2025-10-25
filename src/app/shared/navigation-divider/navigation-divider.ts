import { Component, input } from '@angular/core';
import { Button } from "../button/button";

@Component({
  selector: 'app-navigation-divider',
  imports: [Button],
  templateUrl: './navigation-divider.html',
  styleUrl: './navigation-divider.scss'
})
export class NavigationDivider {
  title = input<string>('Divider');
}
