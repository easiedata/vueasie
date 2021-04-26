<template>
  <easie-modal @close="$emit('close', 'edit_group')" width="60%">
    <template slot="header">
      <font-awesome-icon class="mr-2" icon="database"></font-awesome-icon>
      Editar Grupo
    </template>
    <div>
      <easie-top-tabs>
        <easie-tab key="structure" name="Estrutura" :selected="true">
          <slot name="group_structure"></slot>
        </easie-tab>
        <template v-for="(c_order, name, index) in group_meta['c_order']" >
          <easie-tab
            :key="index+' '+ name"
            :name="group_meta['key_ref'][name]"
            >
            <easie-default-meta
              @new_item_meta="new_item_meta"
              :meta_key="name"
              :item_meta="initial_group.item_meta"
              :c_order="c_order"
              :c_data="group_meta['c_data']"
              :apply_ref_type="'group'">
            </easie-default-meta>
          </easie-tab>
        </template>
        <!-- <template v-for="(c, index) in default_item_meta[mode]" >
          <easie-tab
            :key="index+'_'+c.name"
            :name="c.name"
            >
            <component @new_item_meta="new_item_meta" :is="c.component" v-bind="{
              'item_meta':initial_group.item_meta
            }">
            </component>
          </easie-tab>
        </template> -->
        <easie-tab key="events" name="Ao Clicar" v-if="show_events_tab">
          <slot name="group_events"></slot>
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
  
  export default {
    name: 'edit_structure_modal',
    components:{
      'easie-modal': easieModal,
      'easie-tab':easieTab,
      'easie-top-tabs':easieTopTabs,
      'easie-default-meta':easieDefaultMeta
    },
    props:{
      initial_group:{required:true},
      show_events_tab:{default:false},
      group_meta:{required:true},
    },
    // data(){
    //   return {
    //     default_item_meta:{
    //       indicator: [],
    //       chart: [],
    //       map: [],
    //       filter: []
    //     }
    //   }
    // },
    methods:{
      new_item_meta(d){
        this.$emit('new_item_meta', d)
      },
    }
  }
</script>