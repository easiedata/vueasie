import easieCheckbox from './easie_checkbox/easie_checkbox.vue';
import easieFormInput from './easie_form_input/easie_form_input.vue';
import easieHr from './easie_hr/easie_hr.vue';
import easieModal from './easie_modal/easie_modal.vue';
import easieRadio from './easie_radio/easie_radio.vue';
import easieRadioList from './easie_radio_list/easie_radio_list.vue';
import easieSelect from './easie_select/easie_select.vue';
import easieSketchColor from './easie_sketch_color/easie_sketch_color.vue';
import easieSwitch from './easie_switch/easie_switch.vue';
import easieTab from './easie_tabs/easie_tab.vue';
import easieTopTabs from './easie_tabs/easie_top_tabs.vue';
import easieTextArea from './easie_textarea/easie_textarea.vue';
import tooltipLabel from './tooltip_label/tooltip_label.vue';


export default Vue => {
  Vue.component(easieCheckbox.name, easieCheckbox)
  Vue.component(easieFormInput.name, easieFormInput)
  Vue.component(easieHr.name, easieHr)
  Vue.component(easieModal.name, easieModal)
  Vue.component(easieRadio.name, easieRadio)
  Vue.component(easieRadioList.name, easieRadioList)
  Vue.component(easieSelect.name, easieSelect)
  Vue.component(easieSketchColor.name, easieSketchColor)
  Vue.component(easieSwitch.name, easieSwitch)
  Vue.component(easieTab.name, easieTab)
  Vue.component(easieTopTabs.name, easieTopTabs)
  Vue.component(easieTextArea.name, easieTextArea)
  Vue.component(tooltipLabel.name, tooltipLabel)
}

