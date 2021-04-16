<template>
  <easie-modal @close="$emit('close', 'edit_structure')" width="85%">
    <template slot="header">
      <font-awesome-icon class="mr-2" icon="database"></font-awesome-icon>
      Editar Estrutura
    </template>
    <div>
      <easie-top-tabs>
        <easie-tab name="Adicionar Dado" :selected="true">
          <slot name="add_data"></slot>
        </easie-tab>
        <easie-tab v-if="group_list.length" name="Grupos">
          <slot name="group_order"></slot>
        </easie-tab>
        <easie-tab v-if="group_list.length" name="Avançado">
          <slot name="advanced"></slot>
        </easie-tab>
      </easie-top-tabs>
    </div>
  </easie-modal>
</template>

<script>
  import easieModal from '../../easie_modal/easie_modal.vue';
  import easieTab from '../../easie_tabs/easie_tab.vue';
  import easieTopTabs from '../../easie_tabs/easie_top_tabs.vue';

  export default {
    name: 'edit_structure_modal',
    components:{
      'easie-modal': easieModal,
      'easie-tab':easieTab,
      'easie-top-tabs':easieTopTabs
    },
    props:{
      group_list:{required:true}
    }
  }
</script>