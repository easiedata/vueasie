import easieAce from './easie_ace/easie_ace.vue';
import easieAppContainer from './easie_app_container/easie_app_container.vue';

import easieCheckbox from './easie_checkbox/easie_checkbox.vue';
import easieDefaultMeta from './easie_default_meta/easie_default_meta.vue';
import easieFormInput from './easie_form_input/easie_form_input.vue';
import easieHr from './easie_hr/easie_hr.vue';
import easieItemTools from './easie_item_tools/easie_item_tools.vue';
import easieModal from './easie_modal/easie_modal.vue';
import easieRadio from './easie_radio/easie_radio.vue';
import easieRadioList from './easie_radio_list/easie_radio_list.vue';
import easieSelect from './easie_select/easie_select.vue';
import easieSketchColor from './easie_sketch_color/easie_sketch_color.vue';
import easieSwitch from './easie_switch/easie_switch.vue';
import easieTab from './easie_tabs/easie_tab.vue';
import easieTopTabs from './easie_tabs/easie_top_tabs.vue';
import easieTextarea from './easie_textarea/easie_textarea.vue';
import itemDataStructure from './item_data_structure/item_data_structure.vue';
import tooltipLabel from './tooltip_label/tooltip_label.vue';

// easieboard Items
import boardSelect from './easieboard_items/board_select/board_select.vue';
import boardSlider from './easieboard_items/board_slider/board_slider.vue';
import easieChart from './easieboard_items/easie_chart/easie_chart.vue';
import easieMap from './easieboard_items/easie_map/easie_map.vue';
import easieIndicator from './easieboard_items/easie_indicator/easie_indicator.vue';


export default Vue => {

  Vue.component(easieAce.name, easieAce)
  Vue.component(easieAppContainer.name, easieAppContainer)
  
  Vue.component(easieCheckbox.name, easieCheckbox)
  Vue.component(easieDefaultMeta.name, easieDefaultMeta)
  Vue.component(easieFormInput.name, easieFormInput)
  Vue.component(easieHr.name, easieHr)
  
  Vue.component(easieItemTools.name, easieItemTools)
  
  Vue.component(easieModal.name, easieModal)
  Vue.component(easieRadio.name, easieRadio)
  Vue.component(easieRadioList.name, easieRadioList)
  Vue.component(easieSelect.name, easieSelect)
  Vue.component(easieSketchColor.name, easieSketchColor)
  Vue.component(easieSwitch.name, easieSwitch)
  Vue.component(easieTab.name, easieTab)
  Vue.component(easieTopTabs.name, easieTopTabs)
  Vue.component(easieTextarea.name, easieTextarea)
  Vue.component(itemDataStructure.name, itemDataStructure)
  Vue.component(tooltipLabel.name, tooltipLabel)
  // easieboard Items
  Vue.component(boardSelect.name, boardSelect)
  Vue.component(boardSlider.name, boardSlider)
  Vue.component(easieChart.name, easieChart)
  Vue.component(easieIndicator.name, easieIndicator)
  Vue.component(easieMap.name, easieMap)
}

