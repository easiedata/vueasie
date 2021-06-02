import Vue from 'vue';

// easie
import easie_pnotify from './plugins/pnotify/index';
import global_methods from './plugins/global_methods/index';
import * as easieComponents from './components';

// external stuff
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faAngleUp, faAngleDown, faCaretDown, faChevronDown, faSave, faWrench, faChartLine, faChartBar,
    faChartPie, faComment, faSuperscript, faDatabase, faEdit, faTrash, faAngleDoubleLeft,
    faAngleDoubleRight, faTimes, faPlay, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { faJs } from '@fortawesome/free-brands-svg-icons'

import VTooltip from 'v-tooltip';


Vue.use(VTooltip, {defaultBoundariesElement: document.body});

Vue.use(easie_pnotify);
Vue.use(global_methods);

Vue.component('font-awesome-icon', FontAwesomeIcon)

library.add(
    faAngleDown, faAngleUp, faCaretDown, faChevronDown, faSave, faWrench, faChartLine, faChartBar, faChartPie, faComment,
    faSuperscript, faDatabase, faEdit, faTrash, faAngleDoubleLeft, faAngleDoubleRight, faTimes, faJs, faPlay, faInfoCircle);

let easiedata = Vue => {
    Object.values(easieComponents).forEach((easieComponent) => {
        Vue.use(easieComponent);
    })

}

export default easiedata;

export { default as easieAce } from './components/easie_ace/easie_ace.vue';
export { default as easieAppContainer } from './components/easie_app_container/easie_app_container.vue';

export { default as easieCheckbox } from './components/easie_checkbox/easie_checkbox.vue';
export { default as easieFormInput } from './components/easie_form_input/easie_form_input.vue';
export { default as easieHr } from './components/easie_hr/easie_hr.vue';

export { default as easieModal } from './components/easie_modal/easie_modal.vue';
export { default as easieRadio } from './components/easie_radio/easie_radio.vue';
export { default as easieRadioList } from './components/easie_radio_list/easie_radio_list.vue';
export { default as easieSelect } from './components/easie_select/easie_select.vue';
export { default as easieTreeSelect } from './components/easie_tree_select/easie_tree_select.vue';
export { default as easieSketchColor } from './components/easie_sketch_color/easie_sketch_color.vue';
export { default as easieSwitch } from './components/easie_switch/easie_switch.vue';
export { default as easieTab } from './components/easie_tabs/easie_tab.vue';
export { default as easieTopTabs } from './components/easie_tabs/easie_top_tabs.vue';
export { default as easieTextarea } from './components/easie_textarea/easie_textarea.vue';
export { default as tooltipLabel } from './components/tooltip_label/tooltip_label.vue';




