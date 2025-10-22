import { Component, computed, input } from '@angular/core';

import { ButtonVariant, ButtonVariantName } from '@app/core/models';
import { BUTTON_VARIANTS } from '@app/core/constants';
import { IconName } from '@app/core/models';
import { Icon } from "../icon/icon";

@Component({
  selector: 'app-button',
  imports: [Icon],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  icon = input<null | IconName>(null);
  text = input<null | string>(null);
  link = input<null | string>(null);
  variant = input<ButtonVariantName>('BlackOutline');
  buttonStyle = computed<ButtonVariant>(() => BUTTON_VARIANTS[this.variant()]);
}
