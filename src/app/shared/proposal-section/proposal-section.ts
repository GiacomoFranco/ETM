import { Component } from '@angular/core';
import { ClientsCarrousel } from "../clients-carrousel/clients-carrousel";
import { Metric } from "../metric/metric";
import { SingleQuestion } from "../single-question/single-question";

@Component({
  selector: 'app-proposal-section',
  imports: [ClientsCarrousel, Metric, SingleQuestion],
  templateUrl: './proposal-section.html',
  styleUrl: './proposal-section.scss'
})
export class ProposalSection {

}
