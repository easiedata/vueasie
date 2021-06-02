<template>
  <div>
    <treeselect
      @input="$emit('input', sel_val)"
      class="easie-tree-select" :class="{'active':active}"
      v-model="sel_val"
      :append-to-body="true"
      :disable-branch-nodes="true"
      :show-count="true"
      :clearable="clearable"
      :options="options">
    </treeselect>
  </div>
</template>


<script>
  import Treeselect from '@riophae/vue-treeselect';
  import '@riophae/vue-treeselect/dist/vue-treeselect.css';

  export default {
    components: { Treeselect },
    name: 'easie-tree-select',
    props:{
      value:{required:true},
      options:{required:false},
      clearable:{default:false},
    },
    data(){
      return {
        active: false,
        sel_val: this.value,
        sel_options: this.options,
      }
    },
    mounted(){
      this.$el.querySelector('input.vue-treeselect__input').addEventListener('focus', () => {
        this.active = true;
      });
      this.$el.querySelector('input.vue-treeselect__input').addEventListener('focusout', () => {
        this.active = false;
      });
  
    },
    watch:{
      value(){
        this.sel_val = this.value;
      },
      options(){
        this.sel_options = this.options
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables.scss";
  .easie-tree-select.active *{
    color: $primary !important;
  }
  .easie-tree-select.active .vue-treeselect__control{
    border-color: $primary !important;
  }
  .vue-treeselect__control {
    height:35px;
    border: 1px solid rgba(60, 60, 60, 0.26);
  }

  .vue-treeselect__menu-container{
    margin-top: 1px;
  }
  .vue-treeselect__input {
    cursor:pointer;
    position:relative;
    height:34px;
  }
</style>