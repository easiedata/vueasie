import Vue from 'vue';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faAngleUp, faAngleDown, faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import easie_pnotify from '../src/plugins/pnotify/index.js';
// external stuff
import VTooltip from 'v-tooltip';
import Vueasie from '@';

import "@/assets/scss/styles.scss";

Vue.use(VTooltip);
Vue.use(Vueasie);
Vue.use(easie_pnotify);

library.add(faAngleDown, faAngleUp, faTimes, faChevronDown);

Vue.component('font-awesome-icon', FontAwesomeIcon)


new Vue({
  render: h => h(App),
}).$mount('#app')