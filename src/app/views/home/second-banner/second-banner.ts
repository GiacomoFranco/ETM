import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Button } from '@shared';

@Component({
  selector: 'app-second-banner',
  imports: [Button, RouterLink],
  templateUrl: './second-banner.html',
  styleUrl: './second-banner.scss',
})
export class SecondBanner {}
