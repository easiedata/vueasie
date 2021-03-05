<template>
  <div class="e-w-100" style="position:relative">
    <div v-if="mount_ind" class="e-d-flex " style="overflow-x: auto;">
      <template v-for="(group, i) in group_list">
        <indicator
          v-if="group.name in group_list_values"
          :key="'indicator'+'_'+i+'_'+mount_ind"
          :group_index="i"
          :group_list="group_list"
          :group_list_values="group_list_values">

        </indicator>
      </template>
    </div>
    <div v-if="edit_mode" class="e-d-flex e-justify-content-end e-mt-4">
      <button @click="disp_ref.easie_tools_modal=true" class="e-btn e-btn-outline-secondary">
        Editar
        <font-awesome-icon icon="wrench"></font-awesome-icon>
      </button>
      <button
        v-if="edit_mode" @click="$emit('save_component', {'component_key':component_key, item_data:{
            group_list:group_list,
            item_meta: item_meta,
            filter_list: {}
          }
          })" class="e-ml-2 e-btn e-btn-outline-secondary \">
        Salvar
        <font-awesome-icon icon="save"></font-awesome-icon>
      </button>
    </div>
    <div>
      <easie-item-tools
        @input="get_group_list_values"
        v-if="disp_ref.easie_tools_modal"
        @close="close_modal"
        v-model="item_meta"
        :c_type="'indicator'"
      ></easie-item-tools>
    </div>
  </div>
</template>

<script>

  import { default_group_meta, default_data_meta, default_item_meta } from './meta/meta'
  import indicator from './indicator.vue';
  import easieItemTools from '../easie_item_tools/easie_item_tools.vue';

  export default {
    name: 'easie-indicator',
    components:{
      'indicator': indicator,
      'easie-item-tools': easieItemTools
    },
    props: {
      edit_mode: { default: true },
      component_key: { default: '' },
      values_function: {
        type: Function,
        default: function() {
          this.group_list_values = {}
        }
      },
      value: {
        type: Object,
        default: function() {
          return {
            group_list: [],
            item_meta: {},
            filter_list: []
          };
        }
      }
    },
    data(){
      return {
        item_meta: this.recursive_merge(this.value.item_meta, {...default_item_meta}),
        group_list: this.value.group_list,
        group_list_values: {},
        mount_ind: 0,
        disp_ref: {
          easie_tools_modal: false,
        },
      }
    },
    mounted(){
      if(this.group_list.length){
        this.get_group_list_values();
      }
    },
    methods:{
      new_params(group_list=false, item_meta=false){
        this.mount_ind = false;
        if(group_list != false){
          this.group_list = group_list;
        }

        if(item_meta != false){
          this.item_meta = item_meta
        }
        this.get_group_list_values()
      },
      load_group_list_defaults(){
        this.group_list = this.group_list.map(group =>{
          group['item_meta'] = this.recursive_merge(group['item_meta'], {...default_group_meta});
          group['data_list'] = group['data_list'].map(data=>{
            data['item_meta'] = this.recursive_merge(data['item_meta'], {...default_data_meta});
            return data;
          })
          return group
        })
      },
      get_group_list_values(){
        this.mount_ind = false;
        let loading = this.$loading.show({
          container: this.$el,
        });
        this.values_function(this, () => { loading.hide() }, () => {
          this.load_group_list_defaults();
          this.mount_ind = true;
          this.$emit('upd_group_list', this.group_list);
        });
      },
      reload(){
        this.get_group_list_values();
      },
      close_modal(modal_ref) {
        this.disp_ref[modal_ref] = false;
      },
      recursive_merge(upd_json, ref_json){
        let merged_json = {}
        let object_constructor = ({}).constructor;
        for (let key in upd_json){
            let val = upd_json[key];
            if(val!==null){
                if(val.constructor == object_constructor && ref_json.hasOwnProperty(key)){
                    val = this.recursive_merge(upd_json[key], ref_json[key]);
                }
            }

            merged_json[key] = val;
        }

        for(let key in ref_json){
            let val = ref_json[key]
            if(upd_json.hasOwnProperty(key)){
                continue
            }
            merged_json[key] = val;
        }
        return merged_json;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/styles.scss";
</style>