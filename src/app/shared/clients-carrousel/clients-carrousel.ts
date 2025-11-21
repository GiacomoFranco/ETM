import { Component } from '@angular/core';

import { CUSTOMERS } from '@app/core/constants/customers.constant';
import { Customers } from '@app/core/models';

@Component({
  selector: 'app-clients-carrousel',
  imports: [],
  templateUrl: './clients-carrousel.html',
  styleUrl: './clients-carrousel.scss',
})
export class ClientsCarrousel {
  clients: Customers = CUSTOMERS;
}
