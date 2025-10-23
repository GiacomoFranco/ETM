import { Component } from '@angular/core';
import { Button } from "@app/shared";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-second-banner',
  imports: [Button, RouterLink],
  templateUrl: './second-banner.html',
  styleUrl: './second-banner.scss'
})
export class SecondBanner {

}
