<template>
  <span @click="check" class="e-d-flex e-justify-content-center easie-radio-input" :class="{active:opt==value}">
    <!-- <span v-show="opt==value" class="easie-checkmark"></span> -->
    <input  @input="check" type="radio" :name="name" :value="opt"/>
  </span>
</template>

<script>
  export default {
    name: 'easie-radio',
    props:{
      value: {required:true},
      name: {required:true},
      opt:{required:true}
    },
    methods:{
      check(){
        this.$emit('input', this.opt);
      },
    }
  }
</script>

<style lang="scss">
  .easie-radio-input input{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 100;
    opacity: 0;
    cursor: pointer;
  }
  .easie-radio-input {
    align-self:center;
    border: 2px solid rgba(105, 105, 105, 0.6);
    border-radius:50%;
    border-radius:50%;
    cursor:pointer;
    width: 16px;
    height: 16px;
    margin: 0;
    padding: 0;
    border-radius: 50%;
    position: relative;
    z-index: 10;
  }

  .easie-radio-input.active {
    background-image: radial-gradient(white, white,rgba(36, 134, 190, 0.8), rgba(36, 134, 190, 0.8), rgba(36, 134, 190, 0.8), rgba(36, 134, 190, 1), rgba(36, 134, 190, 1), rgba(36, 134, 190, 1));
  }

</style>