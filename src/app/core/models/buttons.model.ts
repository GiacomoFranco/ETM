import { IconName } from "./icon.model"
import { Colors } from "./colors.model"

export type Button = {
  icon: null | IconName,
  text: null | string,
  link: null | string,
  variant: string
}

export type ButtonVariantName =
  | 'OrangeOutline'
  | 'WhiteOutline'
  | 'BlackOutline'
  | 'GrayOutline'
  | 'WhiteOrange'
  | 'Black'
  | 'White';

export type ButtonVariant = {
  iconColor: Colors;
  class: string;
};

export type ButtonVariants = {
  [key: string]: ButtonVariantName
}
