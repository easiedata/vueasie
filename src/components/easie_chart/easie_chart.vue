<template>
  <div ref="component_wrapper" style="width: 100%; height:100%; position:relative">
    <easie-echart
      v-if="reload_chart>0"
      @clicked_series="easiedata_clicked"
      :key="reload_chart"
      :echarts_json="echarts_json"
      :upd_chart_size="upd_chart_size"
      :height="chart_height"
      >
    </easie-echart>
    <div>
      <chart-menu-tools
        ref="c_menu_tools"
        @save_chart="$emit('save_component', {'component_key':component_key, item_data:{
              group_list:group_list,
              item_meta:item_meta,
              filter_list:{}
            }})"
        @input="get_group_list_values"
        v-model="item_meta"
        :edit_mode="edit_mode"
        >
      </chart-menu-tools>
    </div>
  </div>
</template>

<script>
  import easie_echart from '../easie_echart/easie_echart.vue';
  import chart_menu_tools from './chart_menu_tools.vue';
  import { default_item_meta, default_chart_meta, default_echarts_json, default_toolbox, DEFAULT_DATA_COLORS } from './easiedata_meta/meta'

  export default {
    name: 'easie_chart',
    components:{
      'easie-echart': easie_echart,
      'chart-menu-tools': chart_menu_tools
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
          }
        }
      }
    },
    data(){
      return {
        group_list: this.value.group_list,
        item_meta: this.$recursive_merge(this.value.item_meta, {...default_chart_meta}),
        group_list_values: {},
        echarts_json: {...default_echarts_json },
        new_complete_data: 0,
        reload_chart: 0,
        upd_chart_size: 0,
        chart_height: '400px',
        easiedata_labels: {},
        easiedata_items: {},
        series_colors: {},
        colors_ref: {}
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
      if (this.group_list_values.length) {
        this.get_group_list_values()
      }
    },
    methods:{
      mount_item_configs(){
        this.colors_ref = {}
        for (let g in this.group_list){
          let group = this.group_list[g]
          this.easiedata_labels[group['name']] = {}
          this.easiedata_items[group['name']] = {}
          for (let d in group['data_list']){
            let data = group['data_list'][d]
            try{
                this.colors_ref[data['name']] = data['item_meta']['item']['itemStyle']['color']
            }
            catch (e){
              this.get_easie_color(data['name'])
              data['item_meta'] = {
                ...default_item_meta,
                'item':{
                  'itemStyle': {
                    'color': this.colors_ref[data['name']]
                  }
                }
              }
            }
            this.easiedata_labels[group['name']][data['name']] = data['item_meta']['label']
            this.easiedata_items[group['name']][data['name']] = data['item_meta']['item']
            this.series_colors[data['name']] = data['item_meta']['item']
          }
        }
      },
      mount_pie_chart_json(){
        this.echarts_json = {...default_echarts_json }
        let idx_groups = []
        let idx_subgroups = []
        for (let group in this.group_list_values){
          if (!idx_groups.includes(group) ){
            idx_groups.push(group)
          }
          for (let data in this.group_list_values[group]){
            if (!idx_subgroups.includes(data)) {
              idx_subgroups.push(data)
            }
          }
        }
        let centers = []
        for(let i in idx_groups){
          let center = this.strp([this.i_pos(i, idx_groups.length), 50])
          centers.push(center)
        }
        this.echarts_json['title'] = []
        let title = {
          'text': this.item_meta['chart_title'],
          'subtext': this.item_meta['chart_subtitle'],
          ...this.item_meta['title_style'],
        }
        this.echarts_json['title'].push(title)
        for(let group in idx_groups){
          let group_name = idx_groups[group]
          let group_title = {
            'text': group_name,
            'left': centers[group][0],
            'top': '74%',
            'textAlign': 'center'
          }
          this.echarts_json['title'].push(group_title);
        }

        this.echarts_json['series'] = []
        for (let group in idx_groups){
          let group_name = idx_groups[group]
          let item_group = {
            'name': group_name,
            'type': this.item_meta['chart_type'],
            'center': centers[group],
            'radius': [70, 90],
            'data': []
          }
          for (let subgroup in idx_subgroups){
            let data_name = idx_subgroups[subgroup]
            let value_data = this.group_list_values[group_name][data_name]
            let item_data = {
              'name': data_name,
              'value': value_data,
              'label': this.easiedata_labels[group_name][data_name],
              'labelLine': {
                'show': false
              },
              ...this.easiedata_items[group_name][data_name]
            }
            item_group['data'].push(item_data)
          }
          this.echarts_json['series'].push(item_group)
        }

        let toolbox = default_toolbox
        toolbox['feature']['saveAsImage']['name'] = [
        'easie', this.item_meta['chart_title'], 'img'].join('_')
        this.echarts_json['toolbox'] = toolbox

        this.echarts_json['tooltip'] = {
          'show': this.item_meta['t_tooltip']['show'],
          'trigger': 'item',
          'formatter': '{a} <br/>{b} : {c} ({d}%)'
        }

        this.echarts_json['legend'] = {
          ...this.item_meta['legend_style']
        }
      },
      mount_echarts_json(){
        this.echarts_json = {...default_echarts_json }
        let stack_type = ''
        if (this.item_meta['stack']) {
          stack_type = 'apply'
        }

        let idx_groups = []
        let idx_subgroups = []
        for (let group in this.group_list_values){
          if (!idx_groups.includes(group) ){
            idx_groups.push(group)
          }
          for (let data in this.group_list_values[group]){
            if (!idx_subgroups.includes(data)) {
              idx_subgroups.push(data)
            }
          }
        }

        this.echarts_json['series'] = []
        for (let subgroup in idx_subgroups){
          let data_name = idx_subgroups[subgroup]
          let item_data = {
            'name': data_name,
            'stack': this.item_meta['stack'],
            'type': this.item_meta['chart_type'],
            'data':[],
            'itemStyle': {}
          }
          for (let group in idx_groups){
            let group_name = idx_groups[group]
            let value_data = this.group_list_values[group_name][data_name]
            let item_group = {
              'name': group_name,
              'value': value_data,
              'label': default_item_meta['label'],
              ...this.easiedata_items[group_name][data_name]
            }
            item_data['data'].push(item_group)
          }
          item_data['itemStyle']={...this.series_colors[data_name]['itemStyle']}
          this.echarts_json['series'].push(item_data)
        }

        this.echarts_json['title'] = {
          'text': this.item_meta['chart_title'],
          'subtext': this.item_meta['chart_subtitle'],
          ...this.item_meta['title_style']
        }

        let toolbox = default_toolbox
        toolbox['feature']['saveAsImage']['name'] = [
        'easie', this.item_meta['chart_title'], 'img'].join('_')
        this.echarts_json['toolbox'] = toolbox

        this.echarts_json['tooltip']['show'] = this.item_meta['t_tooltip']['show']
        this.echarts_json['tooltip']['axisPointer']['label']['show'] = this.item_meta['t_tooltip']['axis_pointer']

        this.echarts_json['legend'] = {
          'data': idx_subgroups,
          ...this.item_meta['legend_style']
        }

        let axis = ['yAxis', 'xAxis']
        if (this.item_meta['inverted_axis']){
            axis = ['xAxis', 'yAxis']
        }
        this.echarts_json[axis[0]] =[{
          type: 'value',
          ...this.item_meta['value_axis_style']
        }]
        this.echarts_json[axis[1]] = [{
          type: 'category',
          'boundaryGap': (this.item_meta['chart_type'] == 'bar'),
          data: idx_groups,
          ...this.item_meta['category_axis_style']
        }]
      },
      i_pos(i, g_len){
        return parseInt(((100/g_len)/2) + i*(100/g_len))
      },
      strp(numbers){
        return [numbers[0].toString() + '%', numbers[1].toString() + '%']
      },
      getRandomRgb() {
        var num = Math.round(0xffffff * Math.random());
        var r = num >> 16;
        var g = num >> 8 & 255;
        var b = num & 255;
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
      },
      get_easie_color(name){
        if (!(name in this.colors_ref)) {
            var idx = Object.keys(this.colors_ref).length
            if (idx >= DEFAULT_DATA_COLORS.length){
              let list_color_ref = [this.colors_ref]
              let r_color = this.colors_ref[0]
              while(list_color_ref.some(e => this.colors_ref[e] == r_color)){
                r_color = this.getRandomRgb()
                this.colors_ref[name] = r_color
              }
            }
            else{
              this.colors_ref[name] = DEFAULT_DATA_COLORS[idx]
            }
        }
      },
      new_params(group_list=false, item_meta=false){
        if(group_list != false){
          this.group_list = group_list;
        }

        if(item_meta != false){
          this.item_meta = item_meta;
          // to review
          this.$refs.c_menu_tools.chart_meta = item_meta;
        }
        this.get_group_list_values()
      },
      get_group_list_values(){
        let loading = this.$loading.show({
          container: this.$el,
        });
        this.values_function(this, () => { loading.hide() }, () => {
          this.update_meta();
          this.$emit('upd_group_list', this.group_list);
        });
      },
      update_meta(){
        this.mount_item_configs()
        if(this.item_meta['chart_type'] == 'pie'){
          this.mount_pie_chart_json()
        }
        else {
          this.mount_echarts_json();
        }
        this.reload_chart++;
        this.resize();
      },
      easiedata_clicked(data){
        let group_index = this.group_options.indexOf(data['group']);
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
            let rule = rules.join(' AND ');
            let emit_data = {
              'type': 'show_board',
              data: {
                board_name: data_event['click'],
                apply_rule: rule,
                title: [data_event['click'], group.name, data.name].join(' ')

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
                title: [group_event['click'], group.name].join(' ')
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
          edit_height = 100;
          if(c_height == 0){
            c_height = 550;
          }
        }
        this.chart_height = (c_height-20-edit_height) + 'px';
        this.upd_chart_size ++;
      },
      reload(){
        this.get_group_list_values()
      }
    }
  }

</script>