import { Component } from '@angular/core';
import { Footer } from "../footer/footer";
import { Header } from "../header/header";

@Component({
  selector: 'app-layout',
  imports: [Footer, Header],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {

}
