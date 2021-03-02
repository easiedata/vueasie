<template>
  <label class="easie-checkbox-label hover-text-easie">
    <input
      ref="easie_checkbox"
      class="easie-checkbox-input"
      type="checkbox"
      @change="on_input($event)" />
    <span class="easie-checkbox-span"></span>
  </label>
</template>

<script>
  export default {
    name: 'easie-checkbox',
    props:{
      value:{required:true},
      opt:{required:true}
    },
    mounted(){
      this.get_checked()
    },
    methods:{
      on_input(event){
        if(event.target.checked){
          this.$emit('added', this.opt);
          this.$emit('input', [...this.value, this.opt]);
        }
        else{
          this.$emit('removed', this.opt);
          this.$emit('input', this.value.filter(v=> v!=this.opt));
        }
      },
      get_checked(){
        if(this.value.indexOf(this.opt)>=0){
          this.$refs.easie_checkbox.checked = true;
        }
        else {
          this.$refs.easie_checkbox.checked = false;
        }
      }
    },
    watch:{
      value(){
        this.get_checked()
      }
    }
  };
</script>

<style lang="scss" >
  @import "../../assets/scss/styles.scss";

  .easie-checkbox-label {
    position: relative;
    cursor: pointer;
  }
  .easie-checkbox-label:hover {
    color:$primary !important;
  }
  // #bdc1c6;
  .easie-checkbox-span {
    width: 1.4em !important;
    height: 1.4em !important;
    border: 1px solid #bdc1c6;
    background: #fff;
    display: inline-block;
    border-radius: 4px;
    outline: 0;
    transition: background 175ms cubic-bezier(0.1, 0.1, 0.25, 1);
    //transition: all linear 0.3s;
    &:after {
      content: "";
      position: absolute;
      top: 2px;
      left: 7px;
      width: 8px;
      height: 15px;
      border-style: solid;
      border-color: #fff;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      visibility: hidden;
    }
  }
  .easie-checkbox-input {
    display: none;
    &:checked ~ span {
      background: $primary;
      border: 1px solid $primary;
      &:after {
        visibility: visible;
      }
    }
  }
</style>