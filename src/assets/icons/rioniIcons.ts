import { h } from 'vue';
import type { IconSet, IconProps } from 'vuetify';
import checkOn from './checkOn.vue';
import checkOff from './checkOff.vue';
import arrowRightWhite from './arrowRightWhite.vue';
import arrowRightWhiteB from './arrowRightWhiteB.vue';
import formCheckOff from './formCheckOff.vue';
import formCheckOn from './formCheckOn.vue';

const customSvgNameToComponent: any = {
  checkOn,
  checkOff,
  arrowRightWhite,
  arrowRightWhiteB,
  formCheckOff,
  formCheckOn
};

const rioniIcons: IconSet = {
  component: (props: IconProps) => h(customSvgNameToComponent[props.icon])
};

export { rioniIcons /* aliases */ };
