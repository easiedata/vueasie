<template>
  <easie-modal @close="$emit('close', 'edit_data')" width="85%">
    <template slot="header">
      <font-awesome-icon class="mr-2" icon="database"></font-awesome-icon>
      Editar Dado
    </template>
    <div>
      <easie-top-tabs>
        <easie-tab key="structure" name="Estrutura" :selected="true">
          <slot name="data_structure"></slot>
        </easie-tab>
        <template
          v-for="(c_order, name, index) in meta_settings[mode]['data']['c_order']" >
          <easie-tab
            :key="index+' '+ name"
            :name="meta_settings[mode]['data']['key_ref'][name]"
            >
            <easie-default-meta
              @new_item_meta="new_item_meta"
              :meta_key="name"
              :item_meta= "initial_data.item_meta"
              :c_order="c_order"
              :c_data="meta_settings[mode]['data']['c_data']">
            </easie-default-meta>
          </easie-tab>
        </template>
        <easie-tab key="events" name="Ao Clicar" v-if="show_events_tab">
          <slot name="data_events"></slot>
        </easie-tab>
      </easie-top-tabs>
    </div>
  </easie-modal>
</template>

<script>
  import easieModal from '../../easie_modal/easie_modal.vue';
  import easieTab from '../../easie_tabs/easie_tab.vue';
  import easieTopTabs from '../../easie_tabs/easie_top_tabs.vue';
  import easieDefaultMeta from '../../easie_default_meta/easie_default_meta.vue';
  import { meta_settings } from '../../easie_default_meta/default_meta.js';

  export default {
    name: 'edit_data_modal',
    components:{
      'easie-modal': easieModal,
      'easie-tab':easieTab,
      'easie-top-tabs':easieTopTabs,
      'easie-default-meta':easieDefaultMeta
    },
    props:{
      mode:{required:true},
      initial_data:{required: true},
      initial_group:{required:true},
      group_list:{required:true},
      show_events_tab:{default:false}
    },
    data(){
      return{
        meta_settings: {...meta_settings},
        default_item_meta: {
          indicator: [],
          chart: [],
          map:[],
          filter:[]
        }
      }
    },
    methods:{
      new_item_meta(d){
        this.$emit('new_item_meta', d)
      }
    }
  }
</script>