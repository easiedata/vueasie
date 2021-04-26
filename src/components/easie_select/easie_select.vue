<template>
  <div class="easie-select" :class="{'active':active}">
    <span class="easie-select-label" :class="{'show-label':show_label}">
      {{ placeholder }}
    </span>
    <v-select
      class="e-bg-white e-w-100"
      ref="v_select"
      @input="$emit('input', sel_val)"
      @search="onSearch"

      v-model="sel_val"
      :options="sel_options"
      :append-to-body="true"

      :clearable="clearable"
      :searchable="searchable"
      :filterable="filterable"
      :multiple="multiple"

      :label="label"
      :reduce="reduce"
      >
      <template #open-indicator="{ attributes }">
        <span class="easie-select-open-icon" v-bind="attributes">
          <font-awesome-icon icon="chevron-down"></font-awesome-icon>
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
    computed:{
      show_label(){
        if(this.active){
          return true;
        }
        if(this.sel_val || this.sel_val === 0){
          return true
        }
        return false;
      }
    },
    methods:{
      onSearch(search, loading){
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

  .easie-select-label {
    z-index:1;
    font-size: 0.9rem !important;
    color:rgba(0, 0, 0, 0.4);
    display:block;
    left:43px;
    top:36px;
    position:absolute;
    text-align:left;
    transform:matrix(1, 0, 0, 1, -3, -30.6);
    transition-delay:0s;
    transition-duration:0.2s;
    transition-property:all;
    transition-timing-function:ease;
  }


  .easie-select-label.show-label{
    top: 0px;
    left:12px;
  }

  .easie-select-icon {
    margin-top:3px;
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
    color:rgba(0, 0, 0, 0.4);
  }


  /*vs stuff*/
  .vs__selected-options{
    padding:0px;
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
