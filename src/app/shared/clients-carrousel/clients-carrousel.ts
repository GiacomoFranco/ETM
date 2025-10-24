import { afterNextRender, Component } from '@angular/core';

import { CUSTOMERS } from '@app/core/constants/customers.constant';
import { Customers } from '@app/core/models';
import { Autoplay } from 'swiper/modules';
import Swiper from 'swiper';


@Component({
  selector: 'app-clients-carrousel',
  imports: [],
  templateUrl: './clients-carrousel.html',
  styleUrl: './clients-carrousel.scss',
})
export class ClientsCarrousel {
  clients: Customers = CUSTOMERS;
}
