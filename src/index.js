import * as easieComponents from './components';
import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faAngleUp, faAngleDown, faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import VTooltip from 'v-tooltip';


Vue.use(VTooltip);
Vue.component('font-awesome-icon', FontAwesomeIcon)

library.add(faAngleDown, faAngleUp, faTimes, faChevronDown);

let easiedata = Vue => {
    console.log(easieComponents);
    Object.values(easieComponents).forEach((easieComponent) => {

    Vue.use(easieComponent)
  })

}

export default easiedata;

export { default as easieCheckbox } from './components/easie_checkbox/easie_checkbox.vue';
export { default as easieFormInput } from './components/easie_form_input/easie_form_input.vue';
export { default as easieHr } from './components/easie_hr/easie_hr.vue';
export { default as easieModal } from './components/easie_modal/easie_modal.vue';
export { default as easieRadio } from './components/easie_radio/easie_radio.vue';
export { default as easieRadioList } from './components/easie_radio_list/easie_radio_list.vue';
export { default as easieSelect } from './components/easie_select/easie_select.vue';
export { default as easieSketchColor } from './components/easie_sketch_color/easie_sketch_color.vue';
export { default as easieSwitch } from './components/easie_switch/easie_switch.vue';
export { default as easieTab } from './components/easie_tabs/easie_tab.vue';
export { default as easieTopTabs } from './components/easie_tabs/easie_top_tabs.vue';
export { default as easieTextArea } from './components/easie_textarea/easie_textarea.vue';
export { default as tooltipLabel } from './components/tooltip_label/tooltip_label.vue';

