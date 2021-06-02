<template>
  <div class="easie-select" :class="{'active':active}">
    <v-select
      class="e-bg-white e-w-100"
      ref="v_select"
      @input="$emit('input', sel_val)"
      @search="on_search"

      v-model="sel_val"
      :options="sel_options"
      :append-to-body="true"


      :placeholder="placeholder"
      :clearable="clearable"
      :searchable="searchable"
      :filterable="filterable"
      :multiple="multiple"

      :label="label"
      :reduce="reduce"
      >
      <template #open-indicator="{ attributes }">
        <span class="easie-select-open-icon" v-bind="attributes">
          <font-awesome-icon class="easie-select-open-icon-arrow" icon="caret-down"></font-awesome-icon>
        </span>
      </template>
      <template slot="no-options">
        Opção não Encontrada...
      </template>
    </v-select>
  </div>
</template>

<script>
  import vSelect from 'vue-select';

  export default {
    name: 'easie-select',
    components:{
      vSelect
    },
    props:{
      value:{required:true},
      options:{required:false},
      placeholder:{required:false},
      icon:{required:false},
      multiple:{default: false},
      clearable:{default:false},
      searchable:{default: false},
      filterable:{default: true},
      search_options:{default: false},
      label:{default: 'label'},
      reduce: {
        type: Function,
        default: option => option,
      }
    },
    data(){
      return {
        sel_options: this.options,
        active:false,
        sel_val: this.value,
      }
    },
    methods:{
      on_search(search, loading){
        if(search.length && this.$is_function(this.search_options)){
          if (this.timeout){ clearTimeout(this.timeout)}
          this.timeout = setTimeout(() => {
            this.search_options(this, search, loading);
          }, 400);
        }
      }
    },
    mounted(){
      this.$el.querySelector('input.vs__search').addEventListener('focus', () => {
        this.active = true;
      });
      this.$el.querySelector('input.vs__search').addEventListener('focusout', () => {
        this.active = false;
      });

      if(this.icon){
        let icon_el = document.createElement('i');
        icon_el.setAttribute('class', this.icon + ' easie-select-icon mx-2');
        this.$refs.v_select.$refs.selectedOptions.prepend(icon_el);
      }

      if(this.$is_function(this.search_options)){
        this.search_options(this, '', ()=> {})
      }
      
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
  @import "node_modules/vue-select/src/scss/vue-select.scss";
  @import "../../assets/scss/variables.scss";

  .easie-select {
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: flex-start;
    width:100%;
  }


  .easie-select-icon {
    margin-top:3fpx;
    align-self: center;
    color:rgba(0,0,0, .5);
    font-size:20px;
    font-weight: bold;
  }

  // active
  .easie-select.active *{
    color: $primary !important;
  }

  .easie-select.active .vs--single {
    box-shadow: 0px 3px 10px 0px rgba(0,0,0, .15)
  }


  .easie-select.active .vs__dropdown-toggle {
    border-color: $primary !important;
  }


  .easie-select-open-icon {
    font-size: 15px;
    margin-right: 3px;
    margin-bottom: 3px;
    cursor: pointer;
    color:rgba(0, 0, 0, 0.2);
  }

  .easie-select-open-icon:hover {
    color:rgba(0, 0, 0, 0.8);
  }


  /*vs stuff*/
  .vs__selected-options {
    padding:0px;
    flex-wrap: nowrap;
    overflow: hidden;
  }

  .vs__dropdown-option--highlight {
    background-color: $primary !important;
    color: #fff;
  }

  .vs__search::placeholder {
    color: rgba(0, 0, 0, 0.4);
    font-size: 14px;
    font-weight:bold;
  }

  .vs__selected {
    color:inherit!important;
  }


  .vs__search {
    align-self: baseline;
  }
</style>
