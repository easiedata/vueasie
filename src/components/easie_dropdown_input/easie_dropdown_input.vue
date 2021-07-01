<template>
  <div class="easie-dropdown-input-div">
    <div ref="toggle">
      <easie-form-input 
        ref="input_element"
        v-model="sel_val"
        @focus="open=true"
        @blur="onBlur"
        @keydown.enter="enter"
        @keydown.down="down"
        @keydown.up="up"
        @input="change"
      ></easie-form-input>
    </div>
    <ul 
      v-append-to-body
      v-if="openSuggestion"
      class="easie-dropdown-input-menu"
      ref="ul_element"  
      :key="reload_options"  
      >
      <li
        v-for="(suggestion, index) in matches" 
        @click="suggestionClick(index)"
        @mouseover="current=index"
        :key="index"
        :class="{'active': isActive(index)}"
        >
        {{ suggestion }}
      </li>
    </ul>
  </div>
</template>

<script>
  import easieFormInput from '../easie_form_input/easie_form_input.vue';
  import appendToBody from 'vue-select/src/directives/appendToBody';

  export default {
    components:{
      easieFormInput
    },
    name: 'easie-dropdown-input',
    data() {
      return {
        sel_val: this.value,
        open: false,
        current: 0,
        reload_options: 0
      }
    },
    directives: {appendToBody},
    props: {
      suggestions: {
        type: Array,
        required: true
      },
      value: {
        required: false,
      },
      appendToBody: {
        type: Boolean,
        default: true
      },
      calculatePosition: {
        type: Function,
        default(dropdownList, component, {width, top, left}) {
          dropdownList.style.top = top;
          dropdownList.style.left = left;
          dropdownList.style.width = width;
        }
      }
    },
    computed: {
      matches() {
        return this.suggestions.filter((str) => {
          return str.toLowerCase().lastIndexOf(this.sel_val.toLowerCase(), 0) === 0;
        });
      },
      openSuggestion() {
        return this.matches.length != 0 && this.open === true;
      }
    },
    methods: {
      onBlur(){
        setTimeout(()=> this.open=false, 10);
      },
      onMousedown() {
        this.mousedown = true
      },
      onMouseUp() {
        this.mousedown = false
      },
      enter() {
        this.sel_val = this.matches[this.current];
        this.open = false;
      },
      up() {
        if(this.current > 0)
          this.current--;
      },
      down() {
        if(this.current < this.matches.length - 1)
          this.current++;
      },
      isActive(index) {
        return index === this.current;
      },
      change() {
        if (this.open == false) {
          this.open = true;
          this.current = 0;
        }
      },
      suggestionClick(index) {
        this.sel_val = this.matches[index];
        this.open = false;
      },
    },
    watch:{
      value(){
        this.sel_val = this.value
      },
      sel_val(){
        this.$emit('input', this.sel_val)
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables.scss";
  
  .easie-dropdown-input-div {
    position: relative;
    font-family: inherit;
  }
  .easie-dropdown-input-div, .easie-dropdown-input-div * {
    box-sizing: border-box;
  }

  .easie-dropdown-input-menu  {
    display: block;
    box-sizing: border-box;
    position: absolute;

    z-index: 1000;
    padding: 5px 0;
    margin: 0;
    width: 100%;
    max-height: 350px;
    overflow-y: auto;
    box-shadow:  0px 3px 6px 0px #333;
    border: 1px solid rgba(60, 60, 60, 0.26);
    border-top-style: none;
    border-radius: 0 0  4px  4px;
    text-align: left;
    list-style: none;
    background: #fff;
  }
  .easie-dropdown-input-menu  li{
    line-height: 1.42857143; /* Normalize line height */
    display: block;
    padding: 3px 20px;
    clear: both;
    color: #333; /* Overrides most CSS frameworks */
    white-space: nowrap;

    &:hover {
      cursor: pointer;
      background: #2486be;
      color:#fff;
    }

  }
  .easie-dropdown-input-menu  li.active{
    background: #2486be;
    color:#fff;
  }
</style>
