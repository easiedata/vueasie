<template>
  <div class="e-register-form-group-textarea">
    <span :class="c_class" class="input-wrapper e-d-flex e-align-items-center ">
      <template v-if="icon!=''">
        <i  class="e-mx-2" :class="icon"></i>
      </template>
      <textarea
        @focus="focus"
        @blur="blur"
        class="e-w-100 e-ml-2"
        v-model="i_val"
        :rows="rows"
        :type="type"
        :placeholder="placeholder"
        style="outline: none !important;">
      </textarea>
    </span>
    <template v-if="obs!=''">
      <small class="e-form-text e-text-muted">{{ obs }}</small>
    </template>
  </div>
</template>

<script>
    export default {
      name: 'easieTextarea',
      props:{
        value: {required:true},
        icon: {default:''},
        a_class: {default: ''},
        obs: {default: ''},
        placeholder: {default: ''},
        type: {default: ''},
        rows:{default:4}
      },
      data() {
        return {
          i_val: this.value,
          c_class: ''
        }
      },
      methods:{
        focus(){
          this.c_class = 'focus';
        },
        blur(){
          this.c_class = '';
        }
      },
      watch:{
        value(){
          this.i_val = this.value;
        },
        i_val(){
          this.$emit('input', this.i_val);
        },
        a_class(){
          this.c_class = this.a_class;
        }
      }

    }
</script>

<style lang="scss">
  @import "../../assets/scss/variables.scss";
  
  .e-register-form-group-textarea .input-wrapper {
    border: 1px solid lightgray;
    color: lightgray;
  }

  .e-register-form-group-textarea .focus {
      border: 1px solid $primary;
      color: $primary;
  }

  .e-register-form-group-textarea .e-error {
      border: 1px solid red;
      color: red;
  }

  .e-register-form-group-textarea .input-wrapper * {
      border: none;
  }


</style>