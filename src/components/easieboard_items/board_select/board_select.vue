<template>
  <div>
    <div class="e-d-flex">
      <template v-for="(group, i) in group_list" >
        <item-select
          @new_state="new_state({...$event, index:i})"
          :group_item_meta="group.item_meta"
          :group_rule="group.rule"
          :group_name="group.name"
          :options="group.data_list.map(d=> {return {value: d.name, label:d.name, rule:d.rule}})"
          :key="group.name+'_'+reload_select">
        </item-select>
      </template>
    </div>
    <div v-if="edit_mode" class="d-flex justify-content-end mt-4">
      <button 
        v-if="edit_mode" 
        class="ml-2 btn btn-outline-secondary"
        @click="$emit('save_component', {
          'component_key': component_key, 
          item_data:{
            group_list:group_list,
            item_meta: item_meta
          }})"> Salvar 
          <i class="fa fa-save"></i>
      </button>
    </div>
  </div>
</template>

<script>
  import  itemSelect from './item_select.vue';

  const default_group_meta = {
    label: {
      'color': '#696969',
      'font-size': '18px',
      'font-weight': 'bold',
      'font-family': 'sans-serif'
    },
    val: '',
    select_bind:{
      searchable: false,
      clearable: false,
      multiple: false
    }
  }

  export default {
    name: 'board-select',
    components:{
      itemSelect
    },
    props: {
      save_item: { default: true },
      edit_mode: { default: true },
      component_key: { default: '' },
      values_function: {
        required:false
      },
      value: {
        type: Object,
        default: function() {
          return {
            group_list: [],
            item_meta: {},
            filter_list: []
          }
        }
      }
    },
    data(){
      return {
        rules: {},
        values: {},
        item_meta: {},
        group_list: this.value.group_list,
        reload_select: 0, 
        val: ''
      }
    },
    mounted(){
      this.init();
    },
    methods:{
      init(){
        this.group_list = this.value.group_list;
        if(this.group_list.length){
          this.load_group_list_defaults()
          this.reload_select ++;
        }
      },
      load_group_list_defaults(){
        this.group_list = this.group_list.map(group =>{
          group['item_meta'] = this.$recursive_merge(group['item_meta'], {...default_group_meta});
          return group
        });
        this.$emit('upd_group_list', this.group_list);
      },
      resize(){},
      reload(){},
      new_state(data){
        this.group_list[data.index].item_meta = data.item_meta;
        this.$emit('upd_group_list', this.group_list);
        this.rules[data.index] = data.rule;
        this.values[data.index] = data.value;
        this.$emit('new_state', {
          values: this.values,
          rule: Object.values(this.rules).join(' AND '),
          component_key: this.component_key
        })
      },
      new_filter(){},
    }
  }
</script>