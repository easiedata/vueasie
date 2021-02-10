<template>
  <div class="easie-form-input-wrapper e-d-flex e-align-items-center e-bg-white e-w-100" :class="{'focus': active, 'error_input': show_error}">
    <template v-if="icon">
      <i  class="easie-form-input-icon e-mx-2 " :class="icon"></i>
    </template>
    <span @click="$refs.input_ref.focus()" class="easie-form-input-label" :class="{'show-label':show_label}">
      {{ placeholder }}
    </span>
    <input
      v-if="input_type=='normal'"
      ref="input_ref"
      @input="$emit('input', val)"
      v-model="val"
      class="e-w-100 e-ml-2"
      @focus="focus"
      @blur="blur"
      :type="type"
      style="outline: none !important;"
      />
      <input
        v-if="input_type=='number'"
        :oninput="number_input(value)"
        ref="input_ref"
        @input="$emit('input', Number(val))"
        v-model="val"
        class="e-w-100 e-ml-2"
        @focus="focus"
        @blur="blur"
        :type="type"
        style="outline: none !important;"
        />
  </div>
</template>

<script>
  export default {
    name: 'easie-form-input',
    props:{
      value:{required:true},
      icon:{default: ''},
      placeholder:{default: ''},
      type: {default: ''},
      error_msg:{default: ''}
    },
    data() {
      return {
        val: this.get_v(),
        active: false,
        show_error: this.error_msg!=''
      }
    },
    computed:{
      input_type(){
        if(this.type=='number'){
          return 'number';
        }
        return 'normal';
      },
      show_label(){
        if(this.active){
          return true;
        }
        if(this.val || this.val === 0){
          return true
        }
        return false;
      }
    },
    methods:{
      number_input(value){
        try{
          value = Number(value.replace(/[^0-9]/, ''));
        }
        catch(err){
          return;
        }

      },
      get_v(){
        if(this.type == 'number'){
          try{
            return Number(this.value.replace(/[^0-9]/g, ''));
          }
          catch(err){
            return this.value
          }

        }
        else{
          return this.value
        }
      },
      focus(){
        this.active = true;
        if(this.error_msg){
          this.show_error = true;
        }
      },
      blur(){
        this.active = false;
        this.show_error = false;
      },
    },
    watch:{
      value(){
        this.val = this.get_v()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/styles.scss";

  .easie-form-input-icon {
    align-self: center;
    color: rgba(0, 0, 0, 0.5);
    font-size: 20px;
    font-weight: bold;
  }

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
    border: 1px solid $primary;
  }

  .easie-form-input-wrapper.focus *{
    color: $primary;
  }

  .easie-form-input-label {
    z-index:1;
    font-size: 0.9rem !important;
    color:rgba(0, 0, 0, 0.4);
    display:block;
    left:39px;
    top:36px;
    position:absolute;
    text-align:left;
    transform:matrix(1, 0, 0, 1, -3, -30.6);
    transition-delay:0s;
    transition-duration:0.2s;
    transition-property:all;
    transition-timing-function:ease;
  }

  .easie-form-input-label.show-label{
    top: 0px;
    left:12px;
  }

</style>