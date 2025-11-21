import { Component, computed, input } from '@angular/core';

import { Colors, IconName } from '@app/core/models';
import { ColorsEnum } from '@core/enums';

@Component({
  selector: 'app-icon',
  imports: [],
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
})
export class Icon {
  name = input<IconName>('navigation');
  colorName = input<Colors>('MainGray');
  color = computed(() => ColorsEnum[this.colorName()]);
}
