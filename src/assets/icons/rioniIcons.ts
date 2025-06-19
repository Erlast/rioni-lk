import { h } from 'vue'
import type { IconSet, IconProps } from 'vuetify'
import checkOn from './checkOn.vue'
import checkOff from './checkOff.vue'
import arrowRightWhite from './arrowRightWhite.vue'
import arrowRightWhiteB from './arrowRightWhiteB.vue'

const customSvgNameToComponent: any = {
  checkOn,
  checkOff,
  arrowRightWhite,
  arrowRightWhiteB
}

const rioniIcons: IconSet = {
  component: (props: IconProps) => h(customSvgNameToComponent[props.icon])
}

export { rioniIcons /* aliases */ }
