<template>
  <div 
    class="easie-form-input-wrapper e-d-flex e-align-items-center e-bg-white e-w-100" 
    :class="{'focus': active}">
    <input
      ref="input_ref"
      @input="on_input"
      @focus="focus"
      @blur="blur"
      v-inputmask="i_mask"
      v-model="val"
      class="e-w-100 e-ml-2"
      :type="input_type"
      style="outline: none !important;"
/>
  </div>
</template>

<script>
  import Inputmask from 'inputmask';
  export default {
    name: 'easieFormInput',
    directives:{
      inputmask:{
        bind(el, binding){
          if(Object.keys(binding.value).length){
            Inputmask(binding.value).mask(el)
          } 
        }
      }
    },
    props:{
      value:{required:true},
      placeholder:{default: ''},
      type: {default: ''},
      i_mask:{default: ()=> {return {}}}
    },
    data() {
      return {
        val: this.get_value(this.value),
        active: false,
      }
    },
    computed:{
      input_type(){
        let easie_types = ['number', 'date', 'text', 'time']
        if(easie_types.indexOf(this.type)>=0){
          return 'search';
        }
        else {
          return this.type;
        }
      }
    },
    methods:{
      get_value(value){
        if(value.length==0){
          return value;
        }
        if(this.type == 'number'){
          value = (value[0]=='-' ? '-' : '') + value.toString().replace(/[^0-9\.,]/g, '')
          
        }
        return value;
      },
      on_input(){
        this.val = this.get_value(this.val)
        this.$emit('input', this.val);
      },
      focus(){
        this.active = true;
      },
      blur(){
        this.active = false;
      },
    },
    watch:{
      value(){
        this.val = this.get_value(this.value);
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables.scss";
   .easie-form-input-wrapper{
    cursor:pointer;
    position:relative;
    height:41px;
    border: 1px solid rgba(60, 60, 60, 0.26);
    border-radius: 4px;
  }

  .easie-form-input-wrapper.error_input {
    color:rgb(242, 19, 93);
    border-color: rgb(242, 19, 93);
  }
  .easie-form-input-wrapper.error_input * {
    color:rgb(242, 19, 93);
  }

  .easie-form-input-wrapper *{
    cursor:pointer;
  }

  .easie-form-input-wrapper input {
    border: none;
    color:rgb(20, 67, 82);
  }

  .easie-form-input-wrapper.focus{
    border: 1px solid #2486be;
  }

  .easie-form-input-wrapper.focus *{
    color: #2486be;
  }

</style>