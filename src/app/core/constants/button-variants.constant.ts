import { ButtonVariant } from '../models';

export const BUTTON_VARIANTS: Record<string, ButtonVariant> = {
  OrangeOutline: { class: 'orange-outline', iconColor: 'MainOrange' },
  WhiteOutline: { class: 'white-outline', iconColor: 'LightWhite' },
  BlackOutline: { class: 'black-outline', iconColor: 'MainBlack' },
  WhiteOrange: { class: 'white-orange', iconColor: 'MainOrange' },
  GrayOutline: { class: 'gray-outline', iconColor: 'DarkGray' },
  Black: { class: 'black', iconColor: 'LightWhite' },
  White: { class: 'white', iconColor: 'MainBlack' },
};
