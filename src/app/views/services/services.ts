import { Component } from '@angular/core';
import { GeneralBanner } from "@app/shared/general-banner/general-banner";
import { ServicesSection } from "@app/shared";
import { ProposalSection } from "@app/shared/proposal-section/proposal-section";

@Component({
  selector: 'app-services',
  imports: [GeneralBanner, ServicesSection, ProposalSection],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {}
