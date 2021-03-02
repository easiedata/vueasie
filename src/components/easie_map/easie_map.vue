<template>
  <div ref="component_wrapper" style="height:100%; position:relative">
    <div>
      <easie-echart
        v-if="reload_chart>0"
        @clicked_series="easiedata_clicked"
        :key="reload_chart"
        :echarts_json="echarts_json"
        :geo_json_map="map"
        :upd_chart_size="upd_chart_size"
        :height="chart_height"
        >
      </easie-echart>
    </div>
    <div v-if="edit_mode" class="e-d-flex e-justify-content-end e-mt-4">
      <button @click="disp_ref.easie_tools_modal=true" class="e-btn e-btn-outline-secondary">
        Editar
        <font-awesome-icon icon="wrench" />
      </button>
      <button
        @click="$emit('save_component', {
          'component_key':component_key,
            item_data:{
              group_list:group_list,
              item_meta: item_meta,
              filter_list: {}
            }
          })" class="e-ml-2 e-btn e-btn-outline-secondary">
        Salvar
        <font-awesome-icon icon="save"/>
      </button>
    </div>

    <!-- Modals -->
    <div>
      <easie-item-tools
        @input="get_group_list_values"
        v-if="disp_ref.easie_tools_modal"
        @close="close_modal"
        v-model="item_meta"
        :c_type="'map'"
      ></easie-item-tools>
    </div>
  </div>
</template>

<script>
  import easie_echart from '../easie_echart/easie_echart.vue';
  import easie_item_tools from '../easie_item_tools/easie_item_tools.vue';
  import { brazil_chart_group_ref, brazil_chart_group_ref_back, default_group_meta, default_echarts_json, default_item_meta } from './easiedata_meta/meta'

  export default {
    name: 'easie-map',
    components:{
      'easie-echart': easie_echart,
      'easie-item-tools': easie_item_tools
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
        disp_ref: {
          easie_tools_modal: false,
        },
        group_list: this.value.group_list,
        item_meta: this.recursive_merge(this.value.item_meta, {...default_item_meta}),
        group_list_values: {},
        echarts_json: {
          ...default_echarts_json
        },
        map: {},
        reload_chart: 0,
        upd_chart_size: 0,
        chart_height: '0px'
      }
    },
    computed:{
      group_options(){
        return this.group_list.map(group =>{
          return group.name;
        })
      }
    },
    mounted(){
      if (!this.edit_mode || this.group_list_values.length) {
        this.get_group_list_values()
      }
    },
    methods:{
      mount_echarts_json(){
        this.echarts_json['title'] = this.item_meta.title;
        this.echarts_json['visualMap'] = this.item_meta.visualMap;

        let chart_groups = Object.keys(this.group_list_values)
        if(this.group_list.length==0 || chart_groups.length==0){
          this.echarts_json['series'] = [{
            name: series_name,
            type: 'map',
            map: 'map',
            data: [],
            aspectScale: 0.95
          }]
          return;
        }
        let first_group = chart_groups[0];
        let series_name = Object.keys(this.group_list_values[first_group])[0];

        let first_val = this.group_list_values[first_group][series_name];
        let min = first_val;
        let max = first_val;


        let series_data = this.group_list.map(group => {
          group['item_meta'] = this.recursive_merge(group['item_meta'], {...default_group_meta});
          if (!(group.name in this.group_list_values)){
            return {}
          }
          if(!(series_name in this.group_list_values[group.name])){
            return {}
          }
          let val = this.group_list_values[group.name][series_name];
          if(min > val){
            min = val;
          }
          if(max < val){
            max = val;
          }

          return {
            name: brazil_chart_group_ref[group.name],
            value:val,
            ...group['item_meta']
          }
        })

        this.echarts_json['series'] = [{
          name: series_name,
          type: 'map',
          map: 'map',
          data: series_data,
          aspectScale: 0.95
        }]
        this.echarts_json.visualMap.min = min;
        this.echarts_json.visualMap.max = max;

      },
      get_group_list_values(){
        let loading = this.$loading.show({
          container: this.$el,
        });
        this.values_function(this, () => { loading.hide() }, () => {
          this.mount_echarts_json();
          this.$emit('upd_group_list', this.group_list);
          this.reload_chart ++;
          this.resize();
        });
      },
      new_params(group_list=false, item_meta=false){
        if(group_list != false){
          this.group_list = group_list;
        }

        if(item_meta != false){
          this.item_meta = item_meta
        }
        this.get_group_list_values()
      },
      easiedata_clicked(data){
        let group_index = this.group_options.indexOf(brazil_chart_group_ref_back[data['group']]);
        let data_options = this.group_list[group_index].data_list.map(data=>{
          return data.name;
        })
        let data_index = data_options.indexOf(data['data'])
        let data_event = this.group_list[group_index].data_list[data_index].events;
        if('click' in data_event){
          if(data_event['click'].length){
            let rules = [];
            let group = this.group_list[group_index];
            if(group.rule.length){
              rules.push(group.rule);
            }
            let data = this.group_list[group_index].data_list[data_index];
            if(data.rule.length){
              rules.push(data.rule);
            }
            let rule = '(' + rules.join(' AND ') + ')';
            let emit_data = {
              'type': 'show_board',
              data: {
                board_name: data_event['click'],
                apply_rule: rule,
                title: [data_event['click'], brazil_chart_group_ref[group.name], data.name].join(' ')

              }
            }
            this.trigger_event(emit_data);
            return;
          }
        }
        let group_event = this.group_list[group_index].events;
        if('click' in group_event){
          if(group_event['click'].length){
            let group = this.group_list[group_index];
            this.trigger_event({
              'type': 'show_board',
              data: {
                board_name: group_event['click'],
                apply_rule: group.rule,
                title: [group_event['click'], brazil_chart_group_ref[group.name]].join(' ')
              }
            })
            return;
          }
        }
      },
      trigger_event(data){
        this.$emit('trigger_event', data);
      },
      resize(){
        let edit_height = 0;
        let c_height = this.$refs.component_wrapper.clientHeight;
        if(this.edit_mode){
          edit_height = 30;
          if(c_height == 0){
            c_height = 550;
          }
        }
        this.chart_height = (c_height-10-edit_height) + 'px';
        this.upd_chart_size ++;
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