<template>
  <div ref="my_echart" :style="c_style"></div>
</template>

<script>
  import * as echarts from 'echarts';
  export default {
    name: 'easie-echart',
    props: {
      echarts_json: { required: true, type: Object },
      upd_chart_size: { default: 0 },
      height: { default: '300px' },
      geo_json_map:{required:false}
    },
    data() {
      return {
        myChart: {}
      };
    },
    mounted() {
      this.myChart = echarts.init(this.$refs.my_echart, 'easie-custom-1');

      if(this.geo_json_map){
        echarts.registerMap('map', this.geo_json_map, {})
      }

      this.myChart.setOption(this.echarts_json);
      let v_self = this;
      this.myChart.on('click', function (params) {
        if(params.seriesType == 'pie'){
          let group = params.seriesName;
          let data = params.name;
          v_self.$emit('clicked_series', {group: group, data: data});
          return;
        }
        if(params.componentType == 'series'){
          let group = params.name;
          let data = params.seriesName;
          v_self.$emit('clicked_series', {group: group, data: data});
          return;
        }
      });


      $(window).on('resize', function() {
        v_self.myChart.resize();
      });
    },
    watch: {
      upd_chart_size: function() {
        this.myChart.resize();
      },
      height(){
        this.myChart.resize();
      }
    },
    computed: {
      c_style: function() {
        return `height:${this.height}; width: 100%;`;
      }
    }
  };
</script>