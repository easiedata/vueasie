import Vue from 'vue';

// easie
import easie_pnotify from './plugins/pnotify/index';
import global_methods from './plugins/global_methods/index';
import * as easieComponents from './components';

// external stuff
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faAngleUp, faAngleDown, faChevronDown, faSave, faWrench, faChartLine, faChartBar, faChartPie, faComment, faSuperscript } from '@fortawesome/free-solid-svg-icons';
import VTooltip from 'v-tooltip';


Vue.use(VTooltip);

Vue.use(easie_pnotify);
Vue.use(global_methods);

Vue.component('font-awesome-icon', FontAwesomeIcon)

library.add(faAngleDown, faAngleUp, faChevronDown, faSave, faWrench, faChartLine, faChartBar, faChartPie, faComment, faSuperscript);

let easiedata = Vue => {
    Object.values(easieComponents).forEach((easieComponent) => {

    Vue.use(easieComponent)
  })

}

export default easiedata;

export { default as easieAppContainer } from './components/easie_app_container/easie_app_container.vue';
export { default as easieChart } from './components/easie_chart/easie_chart.vue';
export { default as easieCheckbox } from './components/easie_checkbox/easie_checkbox.vue';
export { default as easieDefaultMeta } from './components/easie_default_meta/easie_default_meta.vue';
export { default as easieFormInput } from './components/easie_form_input/easie_form_input.vue';
export { default as easieHr } from './components/easie_hr/easie_hr.vue';
export { default as easieIndicator } from './components/easie_indicator/easie_indicator.vue';
export { default as easieItemTools } from './components/easie_item_tools/easie_item_tools.vue';
export { default as easieMap } from './components/easie_map/easie_map.vue';
export { default as easieModal } from './components/easie_modal/easie_modal.vue';
export { default as easieRadio } from './components/easie_radio/easie_radio.vue';
export { default as easieRadioList } from './components/easie_radio_list/easie_radio_list.vue';
export { default as easieSelect } from './components/easie_select/easie_select.vue';
export { default as easieSketchColor } from './components/easie_sketch_color/easie_sketch_color.vue';
export { default as easieSwitch } from './components/easie_switch/easie_switch.vue';
export { default as easieTab } from './components/easie_tabs/easie_tab.vue';
export { default as easieTopTabs } from './components/easie_tabs/easie_top_tabs.vue';
export { default as easieTextarea } from './components/easie_textarea/easie_textarea.vue';
export { default as tooltipLabel } from './components/tooltip_label/tooltip_label.vue';

