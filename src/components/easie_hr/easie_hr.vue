<template>
  <span @click="$emit('input', !value)" class="easie-hr e-d-flex e-align-items-center e-mb-2">
    <label class="e-mr-2">#</label>
    <div v-for="label in hr_label_list" :key="label">
      <label class="e-mr-1">{{label}}</label>
    </div>
    <hr class="e-w-100 e-px-3 e-m-0 e-mx-3">
    <font-awesome-icon :icon="active_icon"
    ></font-awesome-icon>
  </span>
</template>

<script>
  export default {
    name: 'easie-hr',
    props:{
      value:{required:true},
      hr_label:{default:['']}
    },
    data(){
      return{
        hr_label_list: this.hr_label.split(" ")
      }
    },
    computed:{
      active_icon(){
        if(this.value){
          return 'angle-up';
        }
        return 'angle-down';
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables.scss";
  .easie-hr {
      cursor:pointer;
      font-size: 16px;
  }

  .easie-hr *{
      cursor:pointer;
  }

  .easie-hr label {
      font-weight:600;
  }

  .easie-hr hr{
      border-top: 1px solid rgba(0,0,0,.1);
      cursor:pointer;
  }

  .easie-hr:hover hr{
      border-top: 1px solid rgba(36,134,190, 0.2);
  }

  .easie-hr:hover label{
      color: $primary;
  }
  .easie-hr:hover svg{
      color: $primary;
  }
</style>