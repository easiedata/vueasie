<template>
  <label
    ref="label"
    v-click-outside="hide"
    @click="click"
    @mouseover="mouse_over"
    @mouseleave="mouse_out"
    v-tooltip="{
      placement: 'top-start',
      delay: { show: 100, hide: 100 },
      content:value,
      show: show_tooltip,
      trigger: 'manual'
    }"   class="easie-overflow-class" :class="{'on-overflow':is_overflowing}">
    <slot></slot>
    {{ value }}
  </label>
</template>

<script>
  import ClickOutside from 'vue-click-outside'

  export default {
    name: 'tooltip-label',
    directives: {
      ClickOutside
    },
    props:{
      value:{default:''},
      trigger:{default:'hover'}
    },
    data(){
      return {
        is_overflowing: false,
        trigger_tooltip: false
      }
    },
    computed:{
      show_tooltip(){
        if(this.trigger_tooltip && this.is_overflowing){
          return true;
        }
        else{
          return false;
        }
      }
    },
    mounted(){
      this.$nextTick(() => {
        this.get_is_overflowing()
      })
    },
    methods:{
      get_is_overflowing() {
        let el = this.$refs.label;
        let cur_overflow = el.style.overflow;
        if ( !cur_overflow || cur_overflow === "visible" ){
          el.style.overflow = "hidden";
        }
        let is_overflowing = (el.clientWidth < el.scrollWidth) || (el.clientHeight < el.scrollHeight);
        el.style.overflow = cur_overflow;
        this.is_overflowing = is_overflowing;
      },
      mouse_over(){
        if(this.trigger=='hover'){
          this.get_is_overflowing()
          this.trigger_tooltip = true;
        }
      },
      mouse_out(){
        if(this.trigger=='hover'){
          this.trigger_tooltip = false;
        }
      },
      click(){
        if(this.trigger=='click'){
          this.trigger_tooltip = !this.trigger_tooltip;
        }
      },
      hide(){
        if(this.trigger=='click'){
          this.trigger_tooltip = false;
        }
      }
    },
    watch:{
      value(){
        this.get_is_overflowing()
      }
    }
  }
</script>

<style lang="scss">
    @import "../../assets/scss/styles.scss";
</style>
<style lang="scss">
  @import '../../assets/css/easie_styles/tooltip_over.scss';
  @import "../../assets/scss/variables.scss";

  .easie-overflow-class {
    white-space: nowrap;
    align-self:center;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .easie-overflow-class.on-overflow {
    cursor:pointer !important;
  }
  .easie-overflow-class.on-overflow:hover {
    color:$primary;
  }


</style>
